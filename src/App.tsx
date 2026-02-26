import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import HomePage from "./features/home/HomePage"; // or wherever your home is
import ShopPage from "./features/shop/ShopPage";
import CareGuidePage from "./features/care/CareGuidePage";

// placeholders if you don’t have these yet
function Newsletter() {
  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2>Newsletter</h2>
      <p className="helper">Coming next.</p>
    </div>
  );
}
function Contact() {
  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2>Contact</h2>
      <p className="helper">Coming next.</p>
    </div>
  );
}
function Cart() {
  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2>Cart</h2>
      <p className="helper">Coming next.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Everything inside Layout gets the navbar/footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/care-guide" element={<CareGuidePage />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Optional fallback */}
      <Route
        path="*"
        element={
          <div className="container" style={{ padding: "24px 0" }}>
            <h2>Not Found</h2>
            <p className="helper">
              <a href="/">Go home</a>
            </p>
          </div>
        }
      />
    </Routes>
  );
}