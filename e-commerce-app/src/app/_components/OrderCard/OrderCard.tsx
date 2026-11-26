"use client";

import { useState } from "react";
import {
  LuBanknote,
  LuCalendar,
  LuChevronDown,
  LuChevronUp,
  LuCreditCard,
  LuMapPin,
} from "react-icons/lu";
import { OrderType } from "@/api/types/order.type";
import OrderDetails from "../OrderDetails/OrderDetails";

function getOrderStatus(order: OrderType) {
  if (order.isDelivered) {
    return { label: "Delivered", classes: "bg-green-50 text-green-600" };
  }

  if (order.isPaid) {
    return { label: "On the way", classes: "bg-blue-50 text-blue-600" };
  }

  return { label: "Processing", classes: "bg-orange-50 text-orange-500" };
}

export default function OrderCard({ order }: { order: OrderType }) {
  const [open, setOpen] = useState(false);

  const items = order.cartItems ?? [];
  const firstItem = items[0];
  const totalUnits = items.reduce((sum, item) => sum + item.count, 0);
  const extraItems = items.length - 1;
  const status = getOrderStatus(order);

  // fixed locale + UTC so the server and the browser print the same date
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white transition-colors ${
        open ? "border-green-300" : "border-gray-200"
      }`}
    >
      <div className="flex flex-wrap items-center gap-4 p-4">
        {/* Image + extra items badge */}
        <div className="relative size-16 shrink-0 rounded-lg border border-gray-100 bg-white p-1">
          {firstItem && (
            <img
              src={firstItem.product.imageCover}
              alt={firstItem.product.title}
              className="h-full w-full object-contain"
            />
          )}

          {extraItems > 0 && (
            <span className="absolute -end-2 -top-2 rounded-full bg-gray-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              +{extraItems}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.classes}`}
            >
              {status.label}
            </span>

            <span className="font-semibold text-gray-800"># {order.id}</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <LuCalendar />
              {date}
            </span>

            <span>
              {totalUnits} {totalUnits === 1 ? "item" : "items"}
            </span>

            {order.shippingAddress?.city && (
              <span className="flex items-center gap-1">
                <LuMapPin />
                {order.shippingAddress.city}
              </span>
            )}
          </div>

          <p className="mt-2 font-bold text-gray-900">
            {order.totalOrderPrice.toLocaleString("en-US")}{" "}
            <span className="text-xs font-normal text-gray-400">EGP</span>
          </p>
        </div>

        {/* Payment method + details button */}
        <div className="flex items-center gap-3">
          <span
            title={order.paymentMethodType === "cash" ? "Cash" : "Card"}
            className="flex size-9 items-center justify-center rounded-md bg-gray-100 text-gray-500"
          >
            {order.paymentMethodType === "cash" ? (
              <LuBanknote />
            ) : (
              <LuCreditCard />
            )}
          </span>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            className={`flex cursor-pointer items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition ${
              open
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {open ? "Hide" : "Details"}
            {open ? <LuChevronUp /> : <LuChevronDown />}
          </button>
        </div>
      </div>

      {open && <OrderDetails order={order} />}
    </div>
  );
}