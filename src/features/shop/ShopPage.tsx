import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../cart/cart.store";
import { fetchCatalog } from "../../services/catalog";
import type { UiProduct } from "./shop.types";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; products: UiProduct[] };

export default function ShopPage() {
  const addItem = useCartStore((s) => s.addItem);
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
  let alive = true;

  (async () => {
    try {
      const data = await fetchCatalog();

      // Worker returns Square raw catalog response: { objects: [...] }
      const objects = Array.isArray((data as any)?.objects) ? (data as any).objects : [];

      const items = objects.filter((o: any) => o?.type === "ITEM");

      const products: UiProduct[] = items.map((item: any) => {
        const v0 = item?.item_data?.variations?.[0];
        const vm = v0?.item_variation_data?.price_money;

        return {
          id: item.id,
          slug: (item?.item_data?.name || item.id)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
          name: item?.item_data?.name ?? "Untitled",
          description: item?.item_data?.description ?? "",
          images: [], // we’ll add images after
          variants: [
            {
              id: v0?.id ?? `${item.id}-v0`,
              name: v0?.item_variation_data?.name ?? "Default",
              price: vm ? { amount: vm.amount ?? 0, currency: vm.currency ?? "USD" } : undefined,
              available: true,
            },
          ],
          availabilityMessage: "",
        };
      });

      if (!alive) return;
      setState({ status: "ready", products });
    } catch (e: any) {
      if (!alive) return;
      setState({ status: "error", message: e?.message ?? "Failed to load products." });
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
          <p style={{ margin: 0, fontWeight: 700 }}>Couldn’t load catalog</p>
          <p className="helper" style={{ marginTop: 8 }}>
            {state.message}
          </p>
          <p className="helper" style={{ marginTop: 8 }}>
            Check Worker URL + Square token.
          </p>
        </div>
      );
    }

    if (state.products.length === 0) {
      return <p className="helper">No products found.</p>;
    }

    return (
      <div className="grid">
        {state.products.map((p) => {
          const v = p.variants?.[0];

          return (
            <div key={p.id} className="card">
              <div className="card-media">
                {p.images?.[0]?.url ? (
                  <img
                    src={p.images[0].url}
                    alt={p.images[0].alt || p.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="no-image">No image</div>
                )}
              </div>

              <div className="card-body">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div className="card-title">{p.name}</div>
                    <div className="card-price">
                      {v?.price ? `$${(v.price.amount / 100).toFixed(2)}` : "—"}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                    <button
                      className="btn"
                      disabled={!v}
                      onClick={() => {
                        if (!v) return;
                        addItem({
                            productId: p.id,
                            variantId: v.id,
                            name: p.name,
                            variantName: v.name,
                            unitPrice: {
                              amount: v.price?.amount ?? 0,
                              currency: v.price?.currency ?? "USD",
                            },
                            imageUrl: p.images?.[0]?.url,
                            quantity: 1,
});
                      }}
                    >
                      Add
                    </button>

                    <Link className="btn ghost" to={`/product/${p.slug}`}>
                      View
                    </Link>
                  </div>
                </div>

                {p.availabilityMessage ? (
                  <div className="helper" style={{ marginTop: 8 }}>
                    {p.availabilityMessage}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [state, addItem]);

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2>Shop</h2>
      {content}
    </div>
  );
}