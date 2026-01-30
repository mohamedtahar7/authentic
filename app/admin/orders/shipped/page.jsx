export const dynamic = "force-dynamic";
import { getShippedOrders } from "@/actions/adminActions";
import AdminOrderCard from "@/components/admin/AdminOrderCard";

export default async function AdminOrdersPage() {
  const orders = await getShippedOrders();

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Shipped Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No shipped orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <AdminOrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}
