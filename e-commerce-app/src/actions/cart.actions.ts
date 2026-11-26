"use server";

import { getMyToken } from "@/utilities";

export async function addToCart(productId: string) {   

  try {
    const token = await getMyToken();

  // don't throw here: a thrown error shows the red error screen on the website
 if (!token) {
  return { status: "error", message: "please login first..." };
}

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "POST",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: productId }),
  });

  const data = await res.json();
  return data;
  }   

  catch(err) {
    return err
  }

   
  
}  








export async function getLoggedUserCart() {  

   
  const token = await getMyToken();

  
 if (!token) {
  return { status: "error", message: "please login first..." };
}

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "GET",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
    
  });

  const data = await res.json();
  return data;   
}  




export async function updateProductQuantity(productId: string, count: number) {  

   
  const token = await getMyToken();

  
 if (!token) {
  return { status: "error", message: "please login first..." };
}

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "PUT",
    headers: {
      token: token as string,
      "content-type": "application/json",
    }, 
    body: JSON.stringify( { count : count})
    
  });

  const data = await res.json();
  return data;
}   






export async function removeProductFromCart(productId: string) {  

   
  const token = await getMyToken();

  // don't throw here: a thrown error shows the red error screen on the website
 if (!token) {
  return { status: "error", message: "please login first..." };
}

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "content-type": "application/json",
    }, 
    
    
  });

  const data = await res.json();
  return data;
}  





export async function clearAllCartProducts() {  

   
  const token = await getMyToken();

  // don't throw here: a thrown error shows the red error screen on the website
 if (!token) {
  return { status: "error", message: "please login first..." };
}

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "content-type": "application/json",
    }, 
    
    
  });

  const data = await res.json();
  return data;
}   






export async function applyCouponToCart(couponName: string) {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "please login first..." };
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/applyCoupon`,
    {
      method: "PUT",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({ couponName: couponName }),
    }
  );

  const data = await res.json();
  return data;
}
