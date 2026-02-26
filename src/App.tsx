import { Routes, Route, Link, NavLink } from "react-router-dom";
import { useCartStore } from "./features/cart/cart.store";

function Badge() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return <span className="badge">{count}</span>;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand">
            <span style={{ width: 28, height: 28, borderRadius: 10, background: "rgba(27,122,58,.12)", border: "1px solid rgba(27,122,58,.25)" }} />
            Ceraphina Cactus
          </Link>
          <nav className="nav-links" aria-label="Primary" style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/care-guide">Care Guide</NavLink>
            <NavLink to="/newsletter">Newsletter</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/cart" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              Cart <Badge />
            </NavLink>
          </nav>
        </div>
      </div>

      <main className="container">{children}</main>

      <footer className="footer">
        <div className="container" style={{ paddingTop: 0 }}>
          © {new Date().getFullYear()} Ceraphina Cactus • Square hosted checkout
        </div>
      </footer>
    </>
  );
}

function Home() {
  return (
    <Layout>
      <div className="card" style={{ padding: 24 }}>
        <h1 style={{ marginTop: 0 }}>Columnar cactus, clean storefront.</h1>
        <p className="helper">Secure checkout handled by Square hosted checkout.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn primary" to="/shop">Shop</Link>
          <Link className="btn ghost" to="/care-guide">Care Guide</Link>
        </div>
      </div>
    </Layout>
  );
}

function Shop() {
  return (
    <Layout>
      <h2 style={{ marginTop: 0 }}>Shop</h2>
      <p className="helper">Next: Square catalog fetch + product cards.</p>
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/catalog`)
    </Layout>
  );
}

function Product() {
  return (
    <Layout>
      <h2 style={{ marginTop: 0 }}>Product</h2>
      <p className="helper">Next: product detail + add to cart.</p>
    </Layout>
  );
}

function Cart() {
  const { items, removeItem, setQty, clear } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice.amount * i.quantity, 0);

  return (
    <Layout>
      <h2 style={{ marginTop: 0 }}>Cart</h2>
      {items.length === 0 ? (
        <div className="card" style={{ padding: 16 }}>
          <strong>Your cart is empty</strong>
          <p className="helper">Add a cactus and come back.</p>
          <Link className="btn primary" to="/shop">Shop</Link>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 16 }}>
          {items.map((i) => (
            <div key={i.variantId} className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <strong>{i.name}</strong>
                  <div className="helper">{i.variantName}</div>
                </div>
                <div style={{ fontWeight: 800 }}>${(i.unitPrice.amount / 100).toFixed(2)}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, gap: 12, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <label className="helper" style={{ margin: 0 }}>Qty</label>
                  <input className="input" style={{ width: 90 }} type="number" min={1} value={i.quantity}
                    onChange={(e) => setQty(i.variantId, Number(e.target.value || 1))} />
                </div>
                <button className="btn ghost" onClick={() => removeItem(i.variantId)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Subtotal</strong>
              <strong>${(subtotal / 100).toFixed(2)}</strong>
            </div>
            <p className="helper">Final price validated at checkout.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
              <button className="btn primary" disabled>Checkout (next)</button>
              <button className="btn ghost" onClick={clear}>Clear</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function CareGuide() {
  return (
    <Layout>
      <h2 style={{ marginTop: 0 }}>Cactus Care Guide</h2>
      <div className="card" style={{ padding: 16 }}>
        <ul>
          <li><strong>Light:</strong> brighten gradually; harden off outdoors 7–14 days.</li>
          <li><strong>Water:</strong> soak then dry fully before watering again.</li>
          <li><strong>Soil:</strong> fast-draining mix, pot with drainage holes.</li>
        </ul>
      </div>
    </Layout>
  );
}

function Newsletter() {
  return (
    <Layout>
      <h2 style={{ marginTop: 0 }}>Join Newsletter</h2>
      <div className="card" style={{ padding: 16 }}>
        <p className="helper">Hooking this to serverless next.</p>
      </div>
    </Layout>
  );
}

function Contact() {
  return (
    <Layout>
      <h2 style={{ marginTop: 0 }}>Contact</h2>
      <div className="card" style={{ padding: 16 }}>
        <p className="helper">Contact form hookup next.</p>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/care-guide" element={<CareGuide />} />
      <Route path="/newsletter" element={<Newsletter />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Layout><div className="card" style={{ padding: 16 }}><strong>Not found</strong></div></Layout>} />
    </Routes>
  );
}