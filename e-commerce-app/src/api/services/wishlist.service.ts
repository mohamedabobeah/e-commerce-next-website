
import { ProductType } from "../types/product.type";
import { getMyToken } from "@/utilities";

interface WishlistResponse {
  status?: string;
  message?: string;
  data?: ProductType[];
}

// Get User Wishlist
export async function getWishlist(): Promise<ProductType[]> {
  try {
    const token = await getMyToken();

    if (!token) return [];

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "GET",
        headers: {
          token: token as string,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    const data: WishlistResponse = await res.json();

    return data.data ?? [];
  } catch (error) {
    console.log("Get Wishlist Error:", error);
    return [];
  }
}

// Add Product To Wishlist
export async function addToWishlist(
  productId: string
): Promise<WishlistResponse> {
  try {
    const token = await getMyToken();

    if (!token) {
      return {
        status: "error",
        message: "Please login first",
      };
    }

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "POST",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    console.log("Add To Wishlist Error:", error);

    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

// Remove Product From Wishlist
export async function removeFromWishlist(
  productId: string
): Promise<WishlistResponse> {
  try {
    const token = await getMyToken();

    if (!token) {
      return {
        status: "error",
        message: "Please login first",
      };
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      }
    );

    return await res.json();
  } catch (error) {
    console.log("Remove From Wishlist Error:", error);

    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}
