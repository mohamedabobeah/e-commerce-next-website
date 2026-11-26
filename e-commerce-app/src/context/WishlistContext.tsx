"use client";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/actions/wishlist.actions";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface WishlistContextType {
  wishlistIds: string[];
  numberOfWishlistItems: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  numberOfWishlistItems: 0,
  isInWishlist: () => false,
  toggleWishlist: async () => {},
  refreshWishlist: async () => {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const { status } = useSession();

  // get the wishlist from the server and keep only the product ids
  async function refreshWishlist() {
    const products = await getWishlist();
    setWishlistIds(products.map((product) => product.id));
  }

  function isInWishlist(productId: string) {
    return wishlistIds.includes(productId);
  }

  async function toggleWishlist(productId: string) {
    if (status !== "authenticated") {
      toast.error("Please login first", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    const alreadyInWishlist = isInWishlist(productId);

    const res = alreadyInWishlist
      ? await removeFromWishlist(productId)
      : await addToWishlist(productId);

    if (res.status === "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 });

      // the api returns the ids of the products that are now in the wishlist
      if (Array.isArray(res.data)) {
        setWishlistIds(res.data);
      } else {
        await refreshWishlist();
      }
    } else {
      toast.error(res.message ?? "Something went wrong", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  // load after login, clear after logout
  useEffect(() => {
    if (status === "authenticated") {
      refreshWishlist();
    } else if (status === "unauthenticated") {
      setWishlistIds([]);
    }
  }, [status]);

  

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        numberOfWishlistItems: wishlistIds.length,
        isInWishlist,
        toggleWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}