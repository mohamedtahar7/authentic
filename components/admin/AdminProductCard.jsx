"use client";

import { useState, useTransition } from "react";
import { FiPackage, FiTrash2, FiEdit3, FiSave, FiX } from "react-icons/fi";
import { deleteProduct, updateProduct } from "@/actions/adminActions";

export default function AdminProductCard({ product }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [sizes, setSizes] = useState(
    product.sizes.map((s) => ({ size: s.size, quantity: s.quantity })),
  );

  const totalQuantity = sizes.reduce((acc, s) => acc + Number(s.quantity), 0);

  const handleSizeChange = (index, value) => {
    const updated = [...sizes];
    updated[index].quantity = value;
    setSizes(updated);
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateProduct(product._id, {
        name,
        price,
        sizes,
      });
      setIsEditing(false);
      window.location.reload();
    });
  };

  const handleDelete = () => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    startTransition(async () => {
      await deleteProduct(product._id);
      window.location.reload();
    });
  };

  return (
    <div className="relative border rounded-xl p-4 bg-white shadow-sm">
      {/* Out of stock badge */}
      {totalQuantity === 0 && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
          Out of stock
        </span>
      )}

      {/* Actions */}
      <div className="absolute top-3 right-3 flex gap-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} disabled={isPending}>
              <FiSave size={25} />
            </button>
            <button onClick={() => setIsEditing(false)}>
              <FiX size={25} />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>
              <FiEdit3 size={25} />
            </button>
            <button onClick={handleDelete} className="text-red-600">
              <FiTrash2 size={25} />
            </button>
          </>
        )}
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <FiPackage size={48} className="text-gray-400" />
        )}
      </div>

      {/* Name */}
      {isEditing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-2 py-1 w-full mb-2"
        />
      ) : (
        <h2 className="font-semibold text-lg">{product.name}</h2>
      )}

      {/* Price */}
      {isEditing ? (
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded px-2 py-1 w-full mb-3"
        />
      ) : (
        <p className="font-medium mb-2">{product.price} DZD</p>
      )}

      {/* Quantity */}
      <p className="text-sm font-medium mb-2">
        Total Quantity: {totalQuantity}
      </p>

      {/* Sizes */}
      <div className="space-y-1">
        {sizes.map((s, index) => (
          <div
            key={s.size}
            className="flex justify-between items-center bg-gray-50 px-2 py-1 rounded text-sm"
          >
            <span>Size {s.size}</span>
            {isEditing ? (
              <input
                type="number"
                min="0"
                value={s.quantity}
                onChange={(e) => handleSizeChange(index, e.target.value)}
                className="w-16 border rounded px-1"
              />
            ) : (
              <span>{s.quantity}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
