import { ProductType } from "./route.type";

export interface CartData {
  cartOwner: string;
  createdAt: string;
  products: CartProduct[];
  totalCartPrice: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface CartProduct {
  count: number;
  price: number;
  _id: string;
  product: ProductType;
}