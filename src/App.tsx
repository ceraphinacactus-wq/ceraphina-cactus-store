import { Routes, Route, Link } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        style={{
          padding: 20,
          borderBottom: "1px solid #eee",
          display: "flex",
          gap: 20,
          background: "#ffffff",
        }}
      >
        <Link to="/" style={{ fontWeight: 700, color: "#1b7a3a" }}>
          Ceraphina Cactus
        </Link>
        <Link to="/shop">Shop</Link>
        <Link to="/care-guide">Care Guide</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div style={{ padding: 40 }}>{children}</div>
    </>
  );
}

function Home() {
  return (
    <Layout>
      <h1 style={{ color: "#1b7a3a" }}>Columnar Cactus</h1>
      <p>Clean storefront. Secure checkout powered by Square.</p>
      <Link
        to="/shop"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 16px",
          background: "#7a2cff",
          color: "white",
          borderRadius: 8,
          textDecoration: "none",
        }}
      >
        Enter Shop →
      </Link>
    </Layout>
  );
}

function Shop() {
  return (
    <Layout>
      <h2>Shop</h2>
      <p>Square catalog integration coming next.</p>
    </Layout>
  );
}

function CareGuide() {
  return (
    <Layout>
      <h2>Cactus Care Guide</h2>
      <p>Light, water, soil, temperature and hardening off guidance.</p>
    </Layout>
  );
}

function Contact() {
  return (
    <Layout>
      <h2>Contact</h2>
      <p>Contact form will be connected next.</p>
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/care-guide" element={<CareGuide />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}