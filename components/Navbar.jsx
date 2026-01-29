"use client";

import { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "@/contexts/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { usePathname } from "next/navigation";
import CartItems from "./CartItems";
import Link from "next/link";

const categories = [
  { name: "Shirts", slug: "shirts" },
  { name: "Pants", slug: "pants" },
  { name: "Jackets", slug: "jackets" },
  { name: "Accessories", slug: "accessories" },
  { name: "Sweatshirts", slug: "sweatshirts" },
  { name: "Quarterzips", slug: "quarterzips" },
];

export default function Navbar() {
  const { cart, total, removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [activeCart, setActiveCart] = useState(false);

  // Navbar visibility on scroll
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const { itemAmount, clearCart } = useContext(CartContext);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50
      transition-transform duration-300 ease-out
      ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="https://i.postimg.cc/7YY3xQMz/logo-2.png"
              alt="Authentic Logo"
              className="h-8"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#hero" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link href="#categories" className="text-gray-700 hover:text-black">
              Shop
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-black flex items-center gap-1">
                Categories
                <span className="text-xs transition group-hover:rotate-180">
                  ▾
                </span>
              </button>

              <div className="absolute left-0 top-full mt-3 w-56 bg-white rounded-xl border border-gray-100 shadow-lg opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                <div className="py-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cart + Mobile */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveCart(true)}
              className="relative text-2xl cursor-pointer"
            >
              🛒
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemAmount}
              </span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl cursor-pointer"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4">
          <Link href="#hero" className="block text-gray-700">
            Home
          </Link>
          <Link href="#categories" className="block text-gray-700">
            Shop
          </Link>

          <button
            onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
            className="w-full text-left text-gray-700"
          >
            Categories
          </button>

          {mobileCategoriesOpen && (
            <div className="pl-4 space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block text-sm text-gray-600"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen bg-white w-full sm:w-[50vw] md:w-[40vw] lg:w-[35vw]
        transition-transform duration-300 z-50
        ${activeCart ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b">
          <h3 className="text-xl font-medium">Shopping Cart ({itemAmount})</h3>

          <div className="flex gap-4">
            <button onClick={clearCart} className="cursor-pointer">
              <FaTrashAlt size={22} />
            </button>
            <button
              onClick={() => setActiveCart(false)}
              className="cursor-pointer"
            >
              <HiArrowRight size={26} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <CartItems />
        </div>
      </div>
    </nav>
  );
}
