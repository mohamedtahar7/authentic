"use client";

import { useState, useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

export default function AddToCartSection({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    if (!selectedSize) return;

    addToCart(product, product._id, selectedSize);
  };

  return (
    <div className="mt-10 space-y-6">
      {/* Sizes */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Select size</p>

        <div className="flex flex-wrap gap-3">
          {product.sizes.map((s) => (
            <button
              key={s.size}
              onClick={() => setSelectedSize(s.size)}
              className={`px-5 py-2 rounded-full border text-sm transition
                ${
                  selectedSize === s.size
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
            >
              {s.size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to cart */}
      <button
        disabled={!selectedSize}
        onClick={handleAdd}
        className="w-full md:w-auto px-10 py-4 bg-black text-white rounded-full font-medium hover:opacity-90 transition disabled:opacity-40"
      >
        Add to cart
      </button>
    </div>
  );
}
