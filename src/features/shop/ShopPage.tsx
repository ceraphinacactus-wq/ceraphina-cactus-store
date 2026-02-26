import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCatalogProducts } from "./shop.api";
import { moneyToDisplay } from "./shop.utils";
import type { ShopProduct } from "./shop.types";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; products: ShopProduct[] };

export default function ShopPage() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const products = await fetchCatalogProducts();
        if (!alive) return;
        setState({ status: "success", products });
      } catch (e: any) {
        if (!alive) return;
        setState({
          status: "error",
          message: e?.message || "Failed to load catalog",
        });
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const content = useMemo(() => {
    if (state.status === "loading") {
      return <p className="helper">Loading products…</p>;
    }

    if (state.status === "error") {
      return (
        <div className="card" style={{ padding: 16 }}>
          <p className="error" style={{ marginTop: 0 }}>
            {state.message}
          </p>
          <p className="helper">
            Check that <code>VITE_API_BASE_URL</code> points to your Worker and
            that <code>/api/catalog</code> returns objects.
          </p>
        </div>
      );
    }

    if (state.products.length === 0) {
      return (
        <div className="card" style={{ padding: 16 }}>
          <p style={{ marginTop: 0, fontWeight: 800 }}>No products found</p>
          <p className="helper">
            Add items in Square Sandbox → Items &amp; Services → Item Library.
          </p>
        </div>
      );
    }

    return (
      <div className="grid products">
        {state.products.map((p) => {
          const v = p.defaultVariant;
          const price = v?.price?.amount ?? null;
          const currency = v?.price?.currency ?? "USD";

          return (
            <div className="card" key={p.id} style={{ padding: 14 }}>
              <div
                className="card"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 12,
                }}
              >
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    loading="lazy"
                    style={{ width: "100%", height: 180, objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: 180,
                      background: "var(--surface)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--muted)",
                      fontWeight: 700,
                    }}
                  >
                    No image
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 900, marginBottom: 4 }}>{p.name}</div>
                  <div className="helper" style={{ marginBottom: 10 }}>
                    {moneyToDisplay(price, currency)}
                  </div>
                </div>

                <Link className="btn ghost" to={`/product/${p.slug}`}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [state]);

  return (
    <div className="container">
      <h2 style={{ marginTop: 0 }}>Shop</h2>
      {content}
    </div>
  );
}