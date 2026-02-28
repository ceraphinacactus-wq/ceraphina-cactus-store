export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // Simple CORS (lock down later)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const squareBase = env.SQUARE_ENV === "production"
      ? "https://connect.squareup.com"
      : "https://connect.squareupsandbox.com";

    const squareHeaders = {
      Authorization: `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
      "Square-Version": env.SQUARE_VERSION ?? "2024-01-17",
      "Content-Type": "application/json",
    };

    // Health
    if (url.pathname === "/api/health") {
      return json({ ok: true, ts: new Date().toISOString() }, corsHeaders);
    }

    // Catalog (items)
    if (url.pathname === "/api/catalog") {
      const squareRes = await fetch(`${squareBase}/v2/catalog/list?types=ITEM`, {
        headers: squareHeaders,
      });

      const bodyText = await squareRes.text();
      return new Response(bodyText, {
        status: squareRes.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Checkout
    // Frontend POSTs: { lineItems: [{ name, quantity, catalogObjectId?, variationId?, basePriceMoney? }], successUrl, cancelUrl }
    if (url.pathname === "/api/checkout" && request.method === "POST") {
      const payload = await request.json().catch(() => null);

      if (!payload?.lineItems?.length) {
        return json({ error: "Missing lineItems" }, corsHeaders, 400);
      }

      // Location: easiest is store it as env var
      const locationId = env.SQUARE_LOCATION_ID;
      if (!locationId) {
        return json({ error: "Missing SQUARE_LOCATION_ID env var" }, corsHeaders, 500);
      }

      const successUrl = payload.successUrl || env.SUCCESS_URL;
      const cancelUrl = payload.cancelUrl || env.CANCEL_URL;

      if (!successUrl || !cancelUrl) {
        return json({ error: "Missing successUrl/cancelUrl (or SUCCESS_URL/CANCEL_URL env vars)" }, corsHeaders, 400);
      }

      // Build Square checkout payload
      // Prefer variationId (catalogObjectId) when you have it
      const lineItems = payload.lineItems.map((li: any) => {
        const item: any = {
          quantity: String(li.quantity ?? 1),
        };

        // If you pass variationId, use it (Square calls it catalog_object_id)
        if (li.variationId) {
          item.catalog_object_id = li.variationId;
        } else if (li.catalogObjectId) {
          item.catalog_object_id = li.catalogObjectId;
        } else {
          // Fallback: ad-hoc item
          item.name = li.name ?? "Item";
          if (li.basePriceMoney?.amount != null) {
            item.base_price_money = {
              amount: Number(li.basePriceMoney.amount),
              currency: li.basePriceMoney.currency ?? "USD",
            };
          }
        }

        return item;
      });

      const body = {
        idempotency_key: crypto.randomUUID(),
        order: {
          location_id: locationId,
          line_items: lineItems,
        },
        checkout_options: {
          redirect_url: successUrl,
          ask_for_shipping_address: true,
        },
        pre_populated_data: {},
      };

      const squareRes = await fetch(`${squareBase}/v2/online-checkout/payment-links`, {
        method: "POST",
        headers: squareHeaders,
        body: JSON.stringify(body),
      });

      const squareJson = await squareRes.json().catch(() => ({}));

      if (!squareRes.ok) {
        return json(
          { error: "Square checkout creation failed", details: squareJson },
          corsHeaders,
          squareRes.status
        );
      }

      // The url you redirect the shopper to:
      const checkoutUrl = squareJson?.payment_link?.url;
      return json({ checkoutUrl, raw: squareJson }, corsHeaders);
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};

function json(data: any, extraHeaders: Record<string, string>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...extraHeaders, "Content-Type": "application/json" },
  });
}