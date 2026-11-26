"use client";

import { useContext, useState } from "react";
import type { MouseEvent } from "react";
import { LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "@/context/WishlistContext";

export default function WishlistBtn({
  productId,
  classes = "",
}: {
  productId: string;
  classes?: string;
}) {
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  const [pending, setPending] = useState(false);

  const active = isInWishlist(productId);

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    // the product card is inside a <Link>, so stop it from navigating
    e.preventDefault();
    e.stopPropagation();

    if (pending) return;

    setPending(true);
    await toggleWishlist(productId);
    setPending(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`flex size-9 cursor-pointer items-center justify-center rounded-full bg-white shadow transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60 ${classes}`}
    >
      {active ? (
        <FaHeart className="text-red-500" />
      ) : (
        <LuHeart className="text-gray-600" />
      )}
    </button>
  );
}