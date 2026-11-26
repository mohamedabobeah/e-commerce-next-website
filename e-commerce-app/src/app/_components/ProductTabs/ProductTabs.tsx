"use client";

import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { LuCheck, LuPackage, LuStar, LuTruck } from "react-icons/lu";
import { ProductType } from "@/api/types/product.type";

type TabId = "details" | "reviews" | "shipping";

const keyFeatures = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
];

// the api sometimes returns a huge number for sold
function formatSold(sold: number) {
  if (!Number.isFinite(sold)) return "-";
  if (sold >= 1_000_000_000) return "1B+";

  return sold.toLocaleString("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
}

export default function ProductTabs({ product }: { product: ProductType }) {
  const [activeTab, setActiveTab] = useState<TabId>("details");

  const tabs = [
    { id: "details" as const, label: "Product Details", icon: LuPackage },
    {
      id: "reviews" as const,
      label: `Reviews (${product.ratingsQuantity})`,
      icon: LuStar,
    },
    { id: "shipping" as const, label: "Shipping & Returns", icon: LuTruck },
  ];

  const information = [
    { label: "Category", value: product.category?.name },
    { label: "Subcategory", value: product.subcategory?.[0]?.name },
    { label: "Brand", value: product.brand?.name },
    { label: "Items Sold", value: `${formatSold(product.sold)} sold` },
  ];

  const rating = Math.round(product.ratingsAverage);

  return (
    <section className="mt-14">
      {/* Tab buttons */}
      <div
        role="tablist"
        aria-label="Product information"
        className="flex gap-6 overflow-x-auto border-b border-gray-200"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`-mb-px flex shrink-0 cursor-pointer items-center gap-2 border-b-2 px-1 pb-3 text-sm font-medium transition ${
              activeTab === tab.id
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <tab.icon />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product details */}
      {activeTab === "details" && (
        <div
          role="tabpanel"
          id="panel-details"
          aria-labelledby="tab-details"
          className="py-6"
        >
          <h3 className="mb-2 font-semibold text-gray-900">
            About this Product
          </h3>

          <p className="text-gray-600">{product.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h4 className="mb-3 font-semibold text-gray-900">
                Product Information
              </h4>

              <dl className="space-y-2 text-sm">
                {information.map((item) => (
                  <div key={item.label} className="flex justify-between gap-4">
                    <dt className="text-gray-500">{item.label}</dt>
                    <dd className="text-end font-medium text-gray-800">
                      {item.value ?? "-"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h4 className="mb-3 font-semibold text-gray-900">Key Features</h4>

              <ul className="space-y-2 text-sm text-gray-700">
                {keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <LuCheck className="text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div
          role="tabpanel"
          id="panel-reviews"
          aria-labelledby="tab-reviews"
          className="py-6"
        >
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <span className="text-4xl font-bold text-gray-900">
              {product.ratingsAverage}
            </span>

            <div>
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) =>
                  star <= rating ? (
                    <FaStar key={star} />
                  ) : (
                    <FaRegStar key={star} />
                  )
                )}
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Based on {product.ratingsQuantity} reviews
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shipping & returns */}
      {activeTab === "shipping" && (
        <div
          role="tabpanel"
          id="panel-shipping"
          aria-labelledby="tab-shipping"
          className="space-y-5 py-6 text-sm text-gray-600"
        >
          <div>
            <h3 className="mb-1 font-semibold text-gray-900">Shipping</h3>
            <p>
              Free delivery on orders over 500 EGP. Orders are usually
              delivered within 2 to 5 business days.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-gray-900">Returns</h3>
            <p>
              You can return the product within 30 days of delivery if it is
              unused and in its original packaging, and we will refund your
              money.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}