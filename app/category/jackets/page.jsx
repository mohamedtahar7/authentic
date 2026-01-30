"use client";

import { getAllProducts } from "@/actions/adminActions";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const pros = await getAllProducts();
        setProducts(pros);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const jackets = products.filter((product) => product.category === "Jackets");

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Page Title */}
      <div className="mb-10 mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Jackets</h1>
        <p className="text-gray-600 mt-2">
          Explore our collection of premium Jackets
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}

      {/* Products Grid */}
      {!loading && jackets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jackets.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && jackets.length === 0 && (
        <h1 className="text-center text-2xl font-medium">
          There are no products in this category
        </h1>
      )}
    </section>
  );
}
