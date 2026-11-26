"use server";

import { checkoutSchemaType } from "@/Schemas/checkout.schema";
import { getMyToken } from "@/utilities";

export async function onlinePayment(
  productId: string,
  url: string = process.env.NEXTAUTH_URL!,
  formValues: checkoutSchemaType,
) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("login first");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productId}?url=${url}`,
    {
      method: "POST",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    },
  );

  const data = await res.json();
  return data;
}