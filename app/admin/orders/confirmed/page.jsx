export const dynamic = "force-dynamic";
import { getConfirmedOrders } from "@/actions/adminActions";
import AdminOrderCard from "@/components/admin/AdminOrderCard";

export default async function AdminOrdersPage() {
  const orders = await getConfirmedOrders();

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Confirmed Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No confirmed orders.</p>
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
