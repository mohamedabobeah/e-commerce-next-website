"use client";

import { useState } from "react";
import Link from "next/link";
import { LuTrash2 } from "react-icons/lu";
import { ProductType } from "@/api/types/product.type";
import AddBtn from "../AddBtn/AddBtn";

export default function WishlistRow({
  product,
  onRemove,
}: {
  product: ProductType;
  onRemove: (productId: string) => Promise<void>;
}) {
  const [removing, setRemoving] = useState(false);

  const inStock = product.quantity > 0;

  async function handleRemove() {
    setRemoving(true);
    await onRemove(product.id);
    setRemoving(false);
  }

  return (
    <div className="grid items-center gap-4 border-b border-gray-100 px-4 py-4 last:border-b-0 md:grid-cols-[3fr_1fr_1fr_2fr]">
      {/* Product */}
      <Link
        href={`/productdetails/${product.id}`}
        className="flex items-center gap-4"
      >
        <img
          src={product.imageCover}
          alt={product.title}
          className="size-16 shrink-0 rounded-lg border bg-white object-contain"
        />

        <div className="min-w-0">
          <h2 className="line-clamp-2 text-sm font-medium text-gray-800">
            {product.title}
          </h2>

          <p className="mt-1 text-xs text-gray-500">{product.category?.name}</p>
        </div>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 text-sm md:flex-col md:gap-0 md:text-center">
        <span className="font-semibold text-gray-900">
          {(product.priceAfterDiscount ?? product.price).toLocaleString("en-US")} EGP
        </span>

        {product.priceAfterDiscount ? (
          <span className="text-xs text-gray-400 line-through">
            {product.price.toLocaleString("en-US")} EGP
          </span>
        ) : null}
      </div>

      {/* Status */}
      <div className="md:text-center">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
            inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:justify-center">
        <AddBtn
          classes="cursor-pointer rounded-md bg-green-600 px-4 text-sm font-medium text-white hover:bg-green-700"
          word="Add to Cart"
          id={product.id}
        />

        <button
          type="button"
          onClick={handleRemove}
          disabled={removing}
          aria-label="Remove from wishlist"
          className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LuTrash2 />
        </button>
      </div>
    </div>
  );
}