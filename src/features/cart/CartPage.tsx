import { useCartStore } from "./cart.store";

export default function CartPage() {
  const items = useCartStore((s) => s.items);

 async function handleCheckout() {
  const apiBase = import.meta.env.VITE_API_BASE_URL;

  // Build Square line items from cart
  const lineItems = items.map((it) => ({
    name: it.name,
    quantity: it.quantity,
    // IMPORTANT: pass Square variationId when you have it
    variationId: it.variantId,
    basePriceMoney: it.unitPrice, // fallback only
  }));

  const successUrl = `${window.location.origin}/checkout/success`;
  const cancelUrl = `${window.location.origin}/cart`;

  const res = await fetch(`${apiBase}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lineItems, successUrl, cancelUrl }),
  });

  const data = await res.json();

  if (!res.ok || !data.checkoutUrl) {
    alert("Checkout failed. Check console for details.");
    console.error("Checkout error:", data);
    return;
  }

  window.location.href = data.checkoutUrl;
}

  return (
    <main>
      <h1>Cart</h1>

      <pre>
        {JSON.stringify(items, null, 2)}
      </pre>

      {/* 👇 PUT BUTTON HERE */}
      <button className="btn" onClick={handleCheckout} disabled={!items.length}>
  Checkout with Square
</button>

    </main>
  );
}