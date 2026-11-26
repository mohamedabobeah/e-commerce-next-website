
"use client";

import { getLoggedUserCart } from "@/actions/cart.actions";
import { CartProduct } from "@/api/types/cart.type"; 
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react"; 

import { useSession } from "next-auth/react";

interface CartContextType {
  numberOfCartItems: number;
  setnumberOfCartItems: (num: number) => void;
  getUserCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  numberOfCartItems: 0,
  setnumberOfCartItems: () => {},
  getUserCart: async () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [numberOfCartItems, setnumberOfCartItems] = useState(0); 
  const { status } = useSession();

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();

      if (res.status === "success") {
        let sum = 0;

        res.data.products.forEach((object: CartProduct) => {
          sum += object.count;
        });

        setnumberOfCartItems(sum);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        
      }
    }
  }

  useEffect(() => {
  if (status === "authenticated") {
    getUserCart();
  } else if (status === "unauthenticated") {
    setnumberOfCartItems(0);
  }
}, [status]);

  return (
    <CartContext.Provider
      value={{ numberOfCartItems, setnumberOfCartItems, getUserCart }}
    >
      {children}
    </CartContext.Provider>
  );
}