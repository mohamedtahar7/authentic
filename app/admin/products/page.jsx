import { getAllProducts } from "@/actions/adminActions";
import AdminProductsGrid from "@/components/admin/AdminProductGrid";
export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <AdminProductsGrid products={products} />
    </div>
  );
}
