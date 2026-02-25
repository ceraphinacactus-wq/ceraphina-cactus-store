// worker/src/index.ts

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

type Env = {
  SQUARE_ACCESS_TOKEN: string;
};

// Change to production when going live:
// const SQUARE_BASE = "https://connect.squareup.com";
const SQUARE_BASE = "https://connect.squareupsandbox.com";

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...(init?.headers || {}),
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Health check
    if (url.pathname === "/api/health") {
      return json({ ok: true });
    }

    // Prove token works + shows which sandbox account/location
    if (url.pathname === "/api/locations" && request.method === "GET") {
      const res = await fetch(`${SQUARE_BASE}/v2/locations`, {
        headers: {
          Authorization: `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
          "Square-Version": "2024-01-17",
        },
      });

      const body = await res.text();
      return new Response(body, {
        status: res.status,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }

    // Catalog: use SEARCH (more reliable than list in sandbox)
    // Returns ITEM objects + related_objects (variations, images, categories)
    if (url.pathname === "/api/catalog" && request.method === "GET") {
      const res = await fetch(`${SQUARE_BASE}/v2/catalog/search`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
          "Square-Version": "2024-01-17",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          object_types: ["ITEM"],
          include_related_objects: true,
          // optional: limit: 100
        }),
      });

      const body = await res.text();
      return new Response(body, {
        status: res.status,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }

    // Default
    return json({ error: "Not Found" }, { status: 404 });
  },
};