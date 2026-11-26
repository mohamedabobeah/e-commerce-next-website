import Link from "next/link";
import { LuPackage, LuShoppingBag } from "react-icons/lu";
import { getUserOrders } from "@/actions/orders.actions";
import OrderCard from "@/app/_components/OrderCard/OrderCard";

export default async function OrdersPage() {
  const orders = await getUserOrders();

  // newest order first
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-[90%] max-w-5xl py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800">My Orders</span>
        </nav>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-green-600 text-xl text-white">
              <LuPackage />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-sm text-gray-500">
                Track and manage your {sortedOrders.length}{" "}
                {sortedOrders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm font-medium text-green-600 transition hover:text-green-700"
          >
            <LuShoppingBag />
            Continue Shopping
          </Link>
        </div>

        {/* Orders */}
        {sortedOrders.length > 0 ? (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600">
              <LuPackage />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              When you place an order, you will find it here.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}