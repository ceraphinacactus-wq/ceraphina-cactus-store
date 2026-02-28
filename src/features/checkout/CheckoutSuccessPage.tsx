export default function CheckoutSuccessPage() {
  return (
    <main className="container">
      <h1>Order started ✅</h1>
      <p>
        If you completed payment, Square will process it. You can return to the shop any time.
      </p>
      <a className="btn" href="/shop">Back to Shop</a>
    </main>
  );
}