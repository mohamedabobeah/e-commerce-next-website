"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";
import { LuArrowLeft } from "react-icons/lu";
import { ProductType } from "@/api/types/product.type";
import { removeFromWishlist } from "@/actions/wishlist.actions";
import { WishlistContext } from "@/context/WishlistContext";
import WishlistRow from "../WishlistRow/WishlistRow";

export default function WishlistView({
  initialProducts,
}: {
  initialProducts: ProductType[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const { refreshWishlist } = useContext(WishlistContext);

  async function handleRemove(productId: string) {
    const res = await removeFromWishlist(productId);

    if (res.status === "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });

      // remove the row now, then sync the ids (hearts + navbar number)
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      await refreshWishlist();
    } else {
      toast.error(res.message ?? "Something went wrong", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-xl text-red-500">
          <FaHeart />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-sm text-gray-500">
            {products.length} {products.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Table head (hidden on mobile) */}
          <div className="hidden gap-4 border-b border-gray-100 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-500 md:grid md:grid-cols-[3fr_1fr_1fr_2fr]">
            <span>Product</span>
            <span className="text-center">Price</span>
            <span className="text-center">Status</span>
            <span className="text-center">Actions</span>
          </div>

          {products.map((product) => (
            <WishlistRow
              key={product.id}
              product={product}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
            <FaHeart />
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            Your wishlist is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Save the products you like and find them here later.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-block rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Browse Products
          </Link>
        </div>
      )}

      <Link
        href="/shop"
        className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-green-600"
      >
        <LuArrowLeft />
        Continue Shopping
      </Link>
    </>
  );
}