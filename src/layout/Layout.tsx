// src/layout/Layout.tsx
import { Outlet, Link, NavLink } from "react-router-dom";
import { useCartStore } from "../features/cart/cart.store";

function CartBadge() {
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
            <span className="logo" aria-hidden="true" />
            Ceraphina Cactus
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/care-guide">Care Guide</NavLink>
            <NavLink to="/newsletter">Newsletter</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/cart" className="cart-link">
              Cart <CartBadge />
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Ceraphina Cactus • Secure checkout via Square
      </footer>
    </>
  );
}