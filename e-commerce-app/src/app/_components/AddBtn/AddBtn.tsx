
"use client";

import { addToCart } from "@/actions/cart.actions";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";

export default function AddBtn({
  classes,
  word,
  id,
}: {
  classes: string;
  word: string;
  id: string;
}) {   
  
  
 const { getUserCart } = useContext(CartContext);


  


  async function AddProduct() {
    // console.log("add");

    // call api ==>
    const res = await addToCart(id);

    if (res.status === "success") {
      toast.success(res.message, { position: "top-center", duration: 2000 }); 
        await getUserCart();
    } else {
      toast.error(res.message, { position: "top-center", duration: 2000 });
    }
  }

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          AddProduct();
        }}
        className={classes}
      >
        {word}
      </Button>
    </>
  );
}