type Env = {
  SQUARE_ACCESS_TOKEN: string;
  SQUARE_LOCATION_ID: string;
  SQUARE_VERSION?: string;
  SUCCESS_URL?: string;
  CANCEL_URL?: string;
};

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function corsPreflight() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

function squareHeaders(env: Env) {
  return {
    Authorization: `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
    "Square-Version": env.SQUARE_VERSION ?? "2024-01-17",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return corsPreflight();

    try {
      // Health
      if (url.pathname === "/api/health") {
        return json({ ok: true, time: new Date().toISOString() });
      }

      // Catalog (Sandbox)
      if (url.pathname === "/api/catalog" && request.method === "GET") {
        const sq = await fetch(
          "https://connect.squareupsandbox.com/v2/catalog/list?types=ITEM",
          { headers: squareHeaders(env) }
        );
        const data = await sq.json();
        return json(data, sq.status);
      }

      // Locations (Sandbox)
      if (url.pathname === "/api/locations" && request.method === "GET") {
        const sq = await fetch("https://connect.squareupsandbox.com/v2/locations", {
          headers: squareHeaders(env),
        });
        const data = await sq.json();
        return json(data, sq.status);
      }

      // Checkout (Sandbox)
      if (url.pathname === "/api/checkout" && request.method === "POST") {
        const body = await request.json().catch(() => ({} as any));

        const items = Array.isArray(body.items) ? body.items : [];
        if (!items.length) return json({ error: "No items provided" }, 400);

        if (!env.SQUARE_LOCATION_ID || env.SQUARE_LOCATION_ID === "REPLACE_ME") {
          return json({ error: "Missing SQUARE_LOCATION_ID" }, 500);
        }

        const successUrl =
          body.successUrl || env.SUCCESS_URL || "http://localhost:5173/checkout/success";
        const cancelUrl = body.cancelUrl || env.CANCEL_URL || "http://localhost:5173/cart";

        // CreateCheckout expects line_items with name/quantity/base_price_money
        const line_items = items.map((it: any) => ({
          name: String(it.name ?? "Item"),
          quantity: String(it.quantity ?? 1),
          base_price_money: {
            amount: Number(it.unitPrice?.amount ?? it.price ?? 0),
            currency: String(it.unitPrice?.currency ?? "USD"),
          },
        }));

        const payload = {
          idempotency_key: crypto.randomUUID(),
          order: {
            location_id: env.SQUARE_LOCATION_ID,
            line_items,
          },
          redirect_url: successUrl,
          // optional: ask_for_shipping_address: true,
          // optional: merchant_support_email: "you@example.com",
          // NOTE: cancel_url isn't supported on all checkout flows;
          // we still pass it through body/env for future upgrades.
        };

        const sq = await fetch(
          `https://connect.squareupsandbox.com/v2/locations/${env.SQUARE_LOCATION_ID}/checkouts`,
          {
            method: "POST",
            headers: {
              ...squareHeaders(env),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await sq.json();

        if (!sq.ok) return json({ error: "Square error", data }, sq.status);

        const checkoutUrl = data?.checkout?.checkout_page_url;
        if (!checkoutUrl) return json({ error: "No checkout URL returned", data }, 500);

        return json({ checkoutUrl });
      }

      return json({ error: "Not Found" }, 404);
    } catch (err: any) {
      return json({ error: "Server error", detail: String(err?.message ?? err) }, 500);
    }
  },
};