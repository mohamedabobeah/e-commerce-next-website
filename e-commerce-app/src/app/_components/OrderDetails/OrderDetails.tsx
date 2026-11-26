import { LuMapPin, LuPackage, LuPhone, LuReceipt } from "react-icons/lu";
import { OrderType } from "@/api/types/order.type";

export default function OrderDetails({ order }: { order: OrderType }) {
  const items = order.cartItems ?? [];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.count, 0);
  const address = order.shippingAddress;

  return (
    <div className="border-t border-gray-100 bg-gray-50/50 p-4">
      {/* Order items */}
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <LuPackage className="text-green-600" />
        Order Items
      </h3>

      <div className="divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white">
        {items.map((item) => (
          <div key={item._id} className="flex items-center gap-3 p-3">
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="size-12 shrink-0 rounded-md border border-gray-100 bg-white object-contain"
            />

            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-medium text-gray-800">
                {item.product.title}
              </p>

              <p className="text-xs text-gray-500">
                {item.count} × {item.price.toLocaleString("en-US")} EGP
              </p>
            </div>

            <p className="text-sm font-semibold text-gray-900">
              {(item.count * item.price).toLocaleString("en-US")}{" "}
              <span className="text-xs font-normal text-gray-400">EGP</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* Delivery address */}
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
            <LuMapPin className="text-green-600" />
            Delivery Address
          </h3>

          <p className="text-sm font-medium text-gray-800">{address?.city}</p>
          <p className="mt-1 text-sm text-gray-500">{address?.details}</p>

          {address?.phone && (
            <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <LuPhone />
              {address.phone}
            </p>
          )}
        </div>

        {/* Order summary */}
        <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
            <LuReceipt className="text-yellow-600" />
            Order Summary
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString("en-US")} EGP</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>
                {order.shippingPrice
                  ? `${order.shippingPrice.toLocaleString("en-US")} EGP`
                  : "Free"}
              </span>
            </div>

            <div className="flex justify-between border-t border-yellow-200 pt-2 font-bold text-gray-900">
              <span>Total</span>
              <span>{order.totalOrderPrice.toLocaleString("en-US")} EGP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}