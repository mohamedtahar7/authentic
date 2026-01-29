"use client";

import { useState } from "react";
import {
  FaBoxes,
  FaPlus,
  FaClipboardList,
  FaCheck,
  FaTruck,
} from "react-icons/fa";

const links = [
  { name: "All Products", icon: <FaBoxes />, href: "/admin/products" },
  { name: "Add A Product", icon: <FaPlus />, href: "/admin/add" },
  { name: "All Orders", icon: <FaClipboardList />, href: "/admin/orders" },
  {
    name: "Confirmed Orders",
    icon: <FaCheck />,
    href: "/admin/orders/confirmed",
  },
  { name: "Shipped Orders", icon: <FaTruck />, href: "/admin/orders/shipped" },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`
          fixed z-30 inset-y-0 left-0 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <a
          href="/"
          className="flex items-center justify-center h-16 border-b border-gray-200"
        >
          <img
            src="https://i.postimg.cc/7YY3xQMz/logo-2.png"
            alt="Admin Logo"
            className="h-10 w-auto"
          />
        </a>

        <nav className="mt-6 px-2 space-y-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 h-16">
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
