"use client";

import { useState, useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { createOrder } from "@/actions/adminActions";
import { toast, Toaster } from "sonner";

export default function CheckoutForm() {
  const { cart, total, clearCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientTel, setClientTel] = useState("");
  const [clientWilaya, setClientWilaya] = useState("");
  const [clientAdress, setClientAdress] = useState("");

  const handleSubmit = async (n, e, t, w, a, c) => {
    setLoading(true);
    const normalizedOrder = cart.map((item) => ({
      id: item.id, // ✅ REQUIRED
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description,
      images: item.images ?? [], // ✅ REQUIRED (array)
      size: item.size,
      amount: item.amount,
    }));
    await createOrder({
      clientName: n,
      clientEmail: e,
      clientTel: t,
      clientWilaya: w,
      clientAdress: a,
      clientOrder: normalizedOrder,
    });
    clearCart();
    setLoading(false);
    toast.success("Order Placed Successfully!");
  };
  console.log(cart);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(
          fullName,
          clientEmail,
          clientTel,
          clientWilaya,
          clientAdress,
          cart,
        );
      }}
      className="bg-white rounded-2xl p-8 shadow-sm space-y-6"
    >
      <Toaster richColors />
      <h2 className="text-xl font-medium">Shipping Information</h2>

      <input
        type="text"
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />
      <input
        type="email"
        placeholder="Email"
        value={clientEmail}
        onChange={(e) => setClientEmail(e.target.value)}
        required
        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
        type="tel"
        placeholder="Phone number"
        value={clientTel}
        onChange={(e) => setClientTel(e.target.value)}
        required
        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
        type="text"
        placeholder="Wilaya"
        value={clientWilaya}
        onChange={(e) => setClientWilaya(e.target.value)}
        required
        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <textarea
        placeholder="Full address"
        value={clientAdress}
        onChange={(e) => setClientAdress(e.target.value)}
        required
        rows={3}
        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white py-4 rounded-xl hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? "Placing order..." : "Confirm Order"}
      </button>
    </form>
  );
}
