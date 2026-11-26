"use server";

import { OrderType, ShippingAddress } from "@/api/types/order.type";
import { getMyToken, getMyUserId } from "@/utilities";

interface CashOrderResponse {
  status?: string;
  message?: string;
  data?: OrderType;
}

// Get the orders of the logged user
export async function getUserOrders(): Promise<OrderType[]> {
  try {
    const token = await getMyToken();
    const userId = await getMyUserId();

    if (!token || !userId) return [];

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        method: "GET",
        headers: { token: token as string },
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    // the api may return the array directly or inside data
    const orders = Array.isArray(data) ? data : (data.data ?? []);

    return orders as OrderType[];
  } catch (error) {
    
    return [];
  }
}

// Create a cash order from the cart (v2)
export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress
): Promise<CashOrderResponse> {
  try {
    const token = await getMyToken();

    if (!token) {
      return { status: "error", message: "Please login first" };
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          token: token as string,
          "content-type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );

    return await res.json();
  } catch (error) {
   
    return { status: "error", message: "Something went wrong" };
  }
}