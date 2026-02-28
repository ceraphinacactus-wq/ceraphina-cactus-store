// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import HomePage from "./features/home/HomePage";
import ShopPage from "./features/shop/ShopPage";
import CareGuidePage from "./features/Care/CareGuidePage";
import NewsletterPage from "./features/newsletter/NewsletterPage.tsx";
import ContactPage from "./features/contact/ContactPage";
import CartPage from "./features/cart/CartPage";
import CheckoutSuccessPage from "./features/checkout/CheckoutSuccessPage";


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/care-guide" element={<CareGuidePage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<div>Not found</div>} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
      </Route>
    </Routes>
  );
}