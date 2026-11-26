
"use client";

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { applyCouponToCart, clearAllCartProducts, getLoggedUserCart, removeProductFromCart, updateProductQuantity } from "@/actions/cart.actions";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa6";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";

interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
  };
}

interface CartData {
  products: CartProduct[];
  totalCartPrice: number;
}

export default function Cart() {
  const [productsDetails, setProductsDetails] =
    useState<CartData | null>(null); 


    const [disabledUpdate, setdisabledUpdate] = useState(false)

  const [isLoading, setIsLoading] = useState(true); 
  const [updateLoading, setupdateLoading] = useState(false); 
  const [currentId, setcurrentId] = useState<null | string>(null); 
  const [removeDisabled, setremoveDisabled] = useState(false)  
  const [couponName, setCouponName] = useState(""); 
const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext); 
const [cartId, setcartId] = useState("");

  async function getUserCart() {
  try {
    const res = await getLoggedUserCart();

    console.log("Full Cart Response:", res);

    console.log("Products Count:", res.data.products.length);

    console.table(
      res.data.products.map((item: CartProduct) => ({
        Product: item.product.title,
        Quantity: item.count,
        Price: item.price,
        Total: item.count * item.price,
      }))
    );

    if (res.status === "success") {
      setProductsDetails(res.data); 
      setcartId(res.cartId);
    }
  } catch (error) {
    console.log("Cart Error:", error);
  } finally {
    setIsLoading(false);
  }
} 


async function updateProduct(id: string, newCount: number, sign: string)  { 

  setdisabledUpdate(true); 
  setupdateLoading(true); 
  setcurrentId(id);
  const res = await updateProductQuantity(id, newCount); 
  console.log(res); 
  if(res.status === "success")  {
    toast.success(res.message, { position: "top-center", duration: 2000})  
    setProductsDetails(res.data) 
    setdisabledUpdate(false); 
    setupdateLoading(false); 
    if (sign === "+")  {
      setnumberOfCartItems(numberOfCartItems + 1)
    }  

    else  {  

      setnumberOfCartItems(numberOfCartItems - 1)

    }

  } 
  else { 

    toast.error(res.message, { position: "top-center", duration: 2000}) 
    setdisabledUpdate(false); 
    setupdateLoading(false);

  }
}   


async function removeProduct(productId: string, count: number) {   

  setremoveDisabled(true);

  const res = await removeProductFromCart(productId) 
  console.log(res); 
  if(res.status === "success") {
    toast.success(res.message, { position: "top-center", duration: 2000})   
    setProductsDetails(res.data); 
    setnumberOfCartItems(numberOfCartItems - count) 
    setremoveDisabled(false);
  } 

  else {  

    toast.error(res.message, { position: "top-center", duration: 2000})  
    setremoveDisabled(false);

  }

}   

async function removeAllProducts()  {
  const res = await clearAllCartProducts()  
  console.log(res)  

  if (res.status === "success")   {    

    toast.success(res.message, { position: "top-center", duration: 2000})   
    setProductsDetails(res.data) 
    setnumberOfCartItems(0);  




  }          

  else  { 

     toast.error(res.message, { position: "top-center", duration: 2000})  

  }
}  




async function applyCoupon() {
  if (!couponName.trim()) {
    toast.error("Please enter coupon code", {
      position: "top-center",
      duration: 2000,
    });
    return;
  }

  const res = await applyCouponToCart(couponName);

  console.log("Apply Coupon Response:", res);

  if (res.status === "success") {
    toast.success(res.message, {
      position: "top-center",
      duration: 2000,
    });

    setProductsDetails(res.data);
  } else {
    toast.error(res.message, {
      position: "top-center",
      duration: 2000,
    });
  }
}


  useEffect(() => {
    getUserCart();
  }, []);

  if (isLoading) {
    return <h2 className="text-center my-10">Loading Cart...</h2>;
  }

  if (!productsDetails || productsDetails.products.length === 0) {
    return (
      <h2 className="text-center my-10 text-2xl">
        Your Cart Is Empty
      </h2>
    );
  }    







  return (
    <section className="my-12 w-[80%] mx-auto">

     
<Table aria-label="Shopping cart">
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Product Image</TableHead>
      <TableHead scope="col">Title</TableHead>
      <TableHead scope="col">Quantity</TableHead>
      <TableHead scope="col">Price</TableHead>
      <TableHead scope="col">Total Amount</TableHead> 
      <TableHead scope="col">Action</TableHead>
    </TableRow>
  </TableHeader>

  
<TableBody>
  {productsDetails.products.map((product) => (
    <TableRow key={product._id}>
      {/* Product Image */}
      <TableCell>
        <img
          src={product.product.imageCover}
          alt={product.product.title}
          className="size-20 object-cover rounded-lg"
        />
      </TableCell>

      {/* Product Title */}
      <TableCell className="font-medium">
        {product.product.title}
      </TableCell>

      {/* Quantity */}
      <TableCell>
        <div className="flex gap-3 items-center">
          <button disabled={disabledUpdate} onClick={() => updateProduct(product.product.id, product.count - 1, "-")} className="w-8 h-8 bg-slate-200 disabled:bg-slate-700
disabled:text-white
disabled:cursor-not-allowed rounded-full cursor-pointer">
            -
          </button>  

          <div> 

            {updateLoading && product.product.id === currentId ?  (  

              <FaSpinner className="animate-spin" />  )  : 

              (  


                product.count






            )}




          </div>

          
          <button disabled={disabledUpdate} onClick={() => updateProduct(product.product.id, product.count + 1, "+")} className="w-8 h-8 bg-slate-200 rounded-full cursor-pointer disabled:bg-slate-700
disabled:text-white
disabled:cursor-not-allowed">
            +
          </button>
        </div>
      </TableCell>

      {/* Price */}
      <TableCell>
        {product.price} $
      </TableCell>

      {/* Total Amount */}
      <TableCell className="font-bold">
        {product.count * product.price} $
      </TableCell>  


      <TableCell >
        <Button disabled={removeDisabled} onClick={() => removeProduct(product.product.id, product.count)} className='cursor-pointer disabled:bg-red-600 disabled:cursor-not-allowed'>Remove</Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

</Table>  




<div className="flex gap-3 items-center my-6">
  <input
    type="text"
    placeholder="Enter coupon code"
    value={couponName}
    onChange={(e) => setCouponName(e.target.value)}
    className="border border-gray-300 rounded-lg p-3 outline-none focus:border-emerald-500"
  />

  <button
    type="button"
    onClick={applyCoupon}
    className="bg-emerald-600 text-white px-5 py-3 rounded-lg cursor-pointer hover:bg-emerald-700"
  >
    Apply Coupon
  </button>
</div>



      <div className="flex justify-between items-center mb-16 my-6 text-2xl bg-slate-200 p-4 rounded-lg">
        <span>Total Cart Price</span>

        <span className="font-bold text-emerald-500 p-2 rounded">
          {productsDetails.totalCartPrice} $
        </span>
      </div>   


      <div className='flex justify-end gap-2'>   

        <Button onClick={() => removeAllProducts()} className='rounded-sm bg-red-600 cursor-pointer mb-12' >Clear All Products</Button>  

         <Link href={`/checkout/${cartId}`}>  

         <Button  className='rounded-sm bg-blue-600 cursor-pointer mb-12' >Checkout Now</Button>
         
         
         
         </Link>



      </div>

    </section>
  );
}