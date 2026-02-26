import React from "react";
import { fetchCatalog, mapCatalogToProducts, formatPrice, UiProduct } from "../services/catalog";
import { Link } from "react-router-dom";

export default function Shop() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [products, setProducts] = React.useState<UiProduct[]>([]);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const resp = await fetchCatalog();
        const mapped = mapCatalogToProducts(resp);
        if (!alive) return;
        setProducts(mapped);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message || "Failed to load products.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <header style={{ marginBottom: 14 }}>
        <h1 className="h1">Shop</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Columnar cactus • Secure checkout powered by Square
        </p>
      </header>

      {/* Loading */}
      {loading && (
        <div className="card">
          <div className="cardBody">
            <p className="muted">Loading products…</p>
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="card" role="alert" aria-live="polite">
          <div className="cardBody">
            <p style={{ margin: 0 }}>
              <strong>Couldn’t load products.</strong>
            </p>
            <p className="muted" style={{ marginTop: 6 }}>
              {error}
            </p>
            <p className="muted" style={{ marginTop: 6 }}>
              Check your Vercel env var: <code>VITE_API_BASE_URL</code>
            </p>
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && products.length === 0 && (
        <div className="card">
          <div className="cardBody">
            <p style={{ margin: 0 }}>
              <strong>No products found.</strong>
            </p>
            <p className="muted" style={{ marginTop: 6 }}>
              Add items in Square Sandbox, then refresh.
            </p>
          </div>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && products.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.slug}`}
              className="card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="cardBody">
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: 12,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 10,
                  }}
                >
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span className="muted" style={{ fontSize: 13 }}>
                      No image yet
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <h2 className="h3" style={{ margin: 0 }}>
                      {p.name}
                    </h2>
                    {p.description ? (
                      <p className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
                        {p.description.length > 90 ? p.description.slice(0, 90) + "…" : p.description}
                      </p>
                    ) : null}
                  </div>

                  <div style={{ whiteSpace: "nowrap", fontWeight: 700 }}>
                    {formatPrice(p.priceCents, p.currency)}
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <span className="btn btnPrimary" style={{ display: "inline-flex" }}>
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}