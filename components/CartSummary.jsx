"use client";

import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

export default function CartSummary() {
  const { cart, total } = useContext(CartContext);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm h-fit">
      <h2 className="text-xl font-medium mb-6">Your Order</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500">
                {item.size} × {item.amount}
              </p>
            </div>

            <p>{item.price * item.amount}.00 DZD</p>
          </div>
        ))}
      </div>

      <div className="border-t mt-6 pt-4 flex justify-between font-semibold">
        <span>Total</span>
        <span>{total}.00 DZD</span>
      </div>
    </div>
  );
}
