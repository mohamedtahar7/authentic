import CartSummary from "@/components/CartSummary";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Form */}
          <CheckoutForm />

          {/* Right - Cart */}
          <CartSummary />
        </div>
      </div>
    </section>
  );
}
