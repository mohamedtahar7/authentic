"use client";

import Image from "next/image";
import { FaTrashAlt, FaBoxes } from "react-icons/fa";
import { deleteProduct } from "@/actions/adminActions";

export default function AdminProductCard({ product }) {
  const handleDelete = async () => {
    const confirmDelete = confirm(
      `Delete "${product.name}"? This action is irreversible.`,
    );
    if (!confirmDelete) return;

    await deleteProduct(product._id);
    location.reload();
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <div className="relative h-56 bg-gray-100">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}

        {/* Stock badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full text-xs">
          <FaBoxes />
          {product.quantity}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            {product.category}
          </p>
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="font-medium text-gray-900">{product.price}.00 DZD</p>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Sizes & quantities
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <span
                key={s._id}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
              >
                {s.size} · {s.quantity}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t flex justify-end">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition"
          >
            <FaTrashAlt />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
