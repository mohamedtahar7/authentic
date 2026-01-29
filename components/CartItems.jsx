"use client";

import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/contexts/CartContext";

export default function CartItems() {
  const { cart, total, removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  console.log(cart);

  return (
    <div className="flex flex-col h-full">
      {/* Items */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-10">
            Your cart is empty
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border rounded-xl p-3"
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                  {item.name}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {item.price.toLocaleString()} DZD
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseAmount(item.id)}
                    className="w-7 h-7 flex items-center justify-center border rounded-full text-sm hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="text-sm font-medium">{item.amount}</span>

                  <button
                    onClick={() => increaseAmount(item.id)}
                    className="w-7 h-7 flex items-center justify-center border rounded-full text-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-xs text-gray-400 hover:text-black transition"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="border-t pt-4 mt-4 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold">{total.toLocaleString()} DZD</span>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center bg-black text-white py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            Go to checkout
          </Link>
        </div>
      )}
    </div>
  );
}
