"use server";

import { ProductType } from "@/api/types/product.type";
import { getMyToken } from "@/utilities";

// add / remove return the ids of the products in the wishlist
interface WishlistActionResponse {
  status?: string;
  message?: string;
  data?: string[];
}

// Get User Wishlist (returns full product objects)
export async function getWishlist(): Promise<ProductType[]> {
  try {
    const token = await getMyToken();

    if (!token) return [];

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: { token: token as string },
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();

    return (data.data ?? []) as ProductType[];
  } catch (error) {
    
    return [];
  }
}

// Add Product To Wishlist
export async function addToWishlist(
  productId: string
): Promise<WishlistActionResponse> {
  try {
    const token = await getMyToken();

    if (!token) {
      return { status: "error", message: "Please login first" };
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    return await res.json();
  } catch (error) {
    
    return { status: "error", message: "Something went wrong" };
  }
}

// Remove Product From Wishlist
export async function removeFromWishlist(
  productId: string
): Promise<WishlistActionResponse> {
  try {
    const token = await getMyToken();

    if (!token) {
      return { status: "error", message: "Please login first" };
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: { token: token as string },
      }
    );

    return await res.json();
  } catch (error) {
    
    return { status: "error", message: "Something went wrong" };
  }
}