"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";
import {
  LuHeart,
  LuMinus,
  LuPlus,
  LuShare2,
  LuShoppingCart,
  LuZap,
} from "react-icons/lu";
import { ProductType } from "@/api/types/product.type";
import { addToCart, updateProductQuantity } from "@/actions/cart.actions";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";

interface CartItemResponse {
  count: number;
  product: string | { id?: string; _id?: string };
}

export default function ProductPurchase({ product }: { product: ProductType }) {
  const router = useRouter();
  const { getUserCart } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState<"cart" | "buy" | null>(null);

  const unitPrice = product.priceAfterDiscount ?? product.price;
  const inStock = product.quantity > 0;
  const inWishlist = isInWishlist(product.id);

  function changeQuantity(next: number) {
    const max = Math.max(product.quantity, 1);
    setQuantity(Math.min(Math.max(next, 1), max));
  }

  // add the product with the chosen quantity, then refresh the cart number
  async function addWithQuantity(): Promise<{ cartId?: string } | null> {
    const res = await addToCart(product.id);

    if (res.status !== "success") {
      toast.error(res.message ?? "Something went wrong", {
        position: "top-center",
        duration: 2000,
      });
      return null;
    }

    let cartId: string | undefined = res.cartId;

    // the api adds one piece for every call => set the right count
    if (quantity > 1) {
      const items: CartItemResponse[] = res.data?.products ?? [];

      const item = items.find((cartItem) =>
        typeof cartItem.product === "string"
          ? cartItem.product === product.id
          : (cartItem.product.id ?? cartItem.product._id) === product.id
      );

      const update = await updateProductQuantity(
        product.id,
        (item?.count ?? 1) + quantity - 1
      );

      if (update.status !== "success") {
        toast.error(update.message ?? "Could not update the quantity", {
          position: "top-center",
          duration: 2000,
        });
        return null;
      }

      cartId = update.cartId ?? cartId;
    }

    await getUserCart();
    return { cartId };
  }

  async function handleAddToCart() {
    setLoading("cart");
    const result = await addWithQuantity();
    setLoading(null);

    if (result) {
      toast.success("Product added to your cart", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  // add to the cart, then go straight to the checkout
  async function handleBuyNow() {
    setLoading("buy");
    const result = await addWithQuantity();
    setLoading(null);

    if (result?.cartId) {
      router.push(`/checkout/${result.cartId}`);
    } else if (result) {
      router.push("/cart");
    }
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Link copied to clipboard", {
        position: "top-center",
        duration: 2000,
      });
    } catch {
      toast.error("Could not copy the link", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <div className="space-y-5">
      {/* Quantity */}
      <div>
        <p className="mb-2 text-sm text-gray-600">Quantity</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button
              type="button"
              onClick={() => changeQuantity(quantity - 1)}
              disabled={quantity <= 1 || !inStock}
              aria-label="Decrease quantity"
              className="flex size-10 cursor-pointer items-center justify-center text-gray-600 transition hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <LuMinus />
            </button>

            <span className="w-12 text-center font-medium text-gray-800">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => changeQuantity(quantity + 1)}
              disabled={quantity >= product.quantity || !inStock}
              aria-label="Increase quantity"
              className="flex size-10 cursor-pointer items-center justify-center text-gray-600 transition hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <LuPlus />
            </button>
          </div>

          <span className="text-sm text-gray-500">
            {product.quantity} available
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-3">
        <span className="text-sm text-gray-600">Total Price:</span>

        <span className="text-xl font-bold text-green-600">
          {(unitPrice * quantity).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          EGP
        </span>
      </div>

      {/* Buttons */}
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock || loading !== null}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LuShoppingCart />
          {loading === "cart" ? "Adding..." : "Add to Cart"}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!inStock || loading !== null}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LuZap />
          {loading === "buy" ? "Please wait..." : "Buy Now"}
        </button>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 transition hover:border-green-600 hover:text-green-600"
        >
          {inWishlist ? (
            <FaHeart className="text-red-500" />
          ) : (
            <LuHeart />
          )}
          {inWishlist ? "In Wishlist" : "Add to Wishlist"}
        </button>

        <button
          type="button"
          onClick={handleShare}
          aria-label="Copy the link"
          className="flex size-12 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:border-green-600 hover:text-green-600"
        >
          <LuShare2 />
        </button>
      </div>
    </div>
  );
}