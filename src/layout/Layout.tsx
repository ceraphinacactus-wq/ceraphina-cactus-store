import { Outlet, Link, NavLink } from "react-router-dom";
import { useCartStore } from "../features/cart/cart.store";

function Badge() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return <span className="badge">{count}</span>;
}

export default function Layout() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand">
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 10,
                background: "linear-gradient(135deg, var(--primary), var(--accent))",
                display: "inline-block",
              }}
            />
            <span>Ceraphina Cactus</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/care-guide">Care Guide</NavLink>
            <NavLink to="/newsletter">Newsletter</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink
              to="/cart"
              style={{ display: "inline-flex", gap: 8, alignItems: "center" }}
            >
              Cart <Badge />
            </NavLink>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Ceraphina Cactus</span>
          <span className="helper">•</span>
          <span className="helper">Secure checkout via Square</span>
        </div>
      </footer>
    </>
  );
}