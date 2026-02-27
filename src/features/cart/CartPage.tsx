import { useCartStore } from "./cart.store";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  return (
    <section>
      <h1>Cart</h1>
      {items.length === 0 ? <p>Your cart is empty.</p> : <pre>{JSON.stringify(items, null, 2)}</pre>}
    </section>
  );
}