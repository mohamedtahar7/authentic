import { getProductById } from "@/actions/adminActions";
import AddToCartSection from "@/components/AddToCartSection";
import ProductImageSlider from "@/components/ProductImageSlider";

export default async function ProductPage({ params }) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image slider */}
        <ProductImageSlider images={product.images} name={product.name} />

        {/* Info */}
        <div>
          <span className="text-sm uppercase tracking-widest text-gray-500">
            {product.category}
          </span>

          <h1 className="mt-3 text-4xl font-semibold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-medium text-gray-900">
            {product.price}.00 DZD
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <AddToCartSection product={product} />
        </div>
      </div>
    </section>
  );
}
