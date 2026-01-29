"use client";
import { getAllProducts } from "@/actions/adminActions";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    const pros = await getAllProducts();
    setProducts(pros);
  };
  useEffect(() => {
    fetchProducts();
    setLoading(false);
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Page Title */}
      <div className="mb-10 mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Sweatshirts</h1>
        <p className="text-gray-600 mt-2">
          Explore our collection of premium Sweatshirts
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(
          (product) =>
            product.category === "Sweatshirts" && (
              <ProductCard key={product.id} product={product} />
            ),
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length === 0 && (
          <h1 className="text-center text-2xl font-medium">
            There's no new Products
          </h1>
        )}
      </div>
    </section>
  );
};

export default page;
