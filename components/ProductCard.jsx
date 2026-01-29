"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  const isOutOfStock = product.quantity === 0;
  const isLowStock = product.quantity > 0 && product.quantity < 5;

  return (
    <div className="group border border-gray-200 rounded-lg overflow-hidden bg-white relative">
      {/* Stock badge */}
      {isOutOfStock && (
        <span className="absolute top-3 left-3 z-10 bg-black text-white text-xs px-3 py-1 rounded-full">
          Out of stock
        </span>
      )}

      {isLowStock && (
        <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
          Only {product.quantity} left
        </span>
      )}

      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 
            ${!isOutOfStock ? "group-hover:scale-105" : "opacity-60"}`}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-900 font-medium text-lg">{product.name}</h3>

        <p className="text-gray-500 text-sm mt-1">{product.category}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-900 font-semibold">
            {product.price}.00 DZD
          </span>

          {/* View Product */}
          <Link
            href={`/product/${product._id}`}
            className="text-sm px-4 py-2 border border-gray-900 text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
