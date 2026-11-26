
import { ProductType } from '@/api/types/product.type'
import React from 'react'
import { FaRegStar } from 'react-icons/fa'
import AddBtn from '../AddBtn/AddBtn';
import WishlistBtn from '../WishlistBtn/WishlistBtn';

export default function ProductCard({product} : {product: ProductType}) {
  return (
    <>   

    <div>
            {/* the card rises, gets a green border and a shadow when the mouse is over it */}
            <div className="group rounded-lg border p-3 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-green-400 hover:shadow-xl">
              {/* Image + wishlist heart */}
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full transition-transform duration-500 ease-out group-hover:scale-110"
                />

                <WishlistBtn productId={product.id} classes="absolute end-2 top-2" />
              </div>
 
              <h2 className='line-clamp-1 transition-colors duration-300 group-hover:text-green-600'>{product.title}</h2>
              <h3 className='line-clamp-1'>{product.description}</h3>
 
              {/* Rating */}
              <div className="rate flex items-center gap-2">
                <FaRegStar className="text-yellow-500" />
                <FaRegStar className="text-yellow-500" />
                {product.ratingsAverage}
                {`(${product.ratingsQuantity})`} reviews
              </div>
 
              {/* Price + add button */}
              <div className="price flex justify-between items-center">
                {product.priceAfterDiscount ? (
                  <>
                    <div className="flex gap-3 items-center">
                      <span className="text-[#16A34A] font-bold text-lg">
                        {product.priceAfterDiscount}
                      </span>
                      <span className="text-sm text-slate-600 line-through">
                        {product.price}
                      </span>
                    </div>
                  </>
                ) : (
                  product.price
                )}
               <AddBtn classes="bg-emerald-500 text-white rounded-full size-8 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-emerald-600 group-hover:rotate-90" word="+" id={product.id} />
                  
              </div>
            </div>
          </div>
      
    </>
  )
}