"use client";

import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiMail,
  FiTrash2,
  FiCheck,
  FiTruck,
} from "react-icons/fi";
import { TbTruckReturn } from "react-icons/tb";
import { useState } from "react";
import {
  confirmOrder,
  shipOrder,
  deleteOrder,
  returnOrder,
} from "@/actions/adminActions";

export default function AdminOrderCard({ order, refreshOrders }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await confirmOrder(order._id);
    refreshOrders?.();
    setLoading(false);
  };

  const handleShip = async () => {
    setLoading(true);
    await shipOrder(order._id);
    refreshOrders?.();
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    if (confirm("Are you sure you want to delete this order?")) {
      await deleteOrder(order._id);
      refreshOrders?.();
    }
    setLoading(false);
  };
  const handleReturn = async () => {
    setLoading(true);
    if (confirm("Are you sure you want to return this order?")) {
      await returnOrder(order._id);
      refreshOrders?.();
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Order #{order._id.slice(-6)}</h2>

        <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
          {order.orderState}
        </span>
      </div>

      {/* Client info */}
      <div className="grid sm:grid-cols-2 gap-3 text-sm mb-6">
        <p className="flex items-center gap-2">
          <FiUser /> {order.clientName}
        </p>
        <p className="flex items-center gap-2">
          <FiPhone /> {order.clientTel}
        </p>
        <p className="flex items-center gap-2">
          <FiMail /> {order.clientEmail}
        </p>
        <p className="flex items-center gap-2">
          <FiMapPin /> {order.clientWilaya}, {order.clientAdress}
        </p>
      </div>

      {/* Ordered products */}
      <div className="space-y-4">
        {order.clientOrder.map((item) => (
          <div
            key={item.id + item.size}
            className="flex gap-4 border rounded-xl p-3"
          >
            {/* Image */}
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              {item.images?.[0] ? (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No image
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.category}</p>

              <div className="text-sm mt-1 flex flex-wrap gap-3">
                <span>Qty: {item.amount}</span>
                {item.size && <span>Size: {item.size}</span>}
                <span>{item.price} DZD</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-4">
        Placed on {new Date(order.createdAt).toLocaleString()}
      </p>

      {/* Action buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {order.orderState === "pending" && (
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:opacity-90 disabled:opacity-40 flex items-center gap-1"
          >
            <FiCheck /> Confirm
          </button>
        )}

        {order.orderState === "confirmed" && (
          <button
            onClick={handleShip}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90 disabled:opacity-40 flex items-center gap-1"
          >
            <FiTruck /> Ship
          </button>
        )}
        {order.orderState === "shipped" && (
          <button
            onClick={handleReturn}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90 disabled:opacity-40 flex items-center gap-1"
          >
            <TbTruckReturn /> Return
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-90 disabled:opacity-40 flex items-center gap-1"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
}
