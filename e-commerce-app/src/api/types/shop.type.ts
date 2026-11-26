import { ProductType } from "./product.type";

// the filters of the shop page (all of them come from the url)
export interface ShopQuery {
  keyword?: string;
  sort?: string; // price | -price | -sold | -ratingsAverage ...
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  category?: string[];
  page?: number;
  limit?: number;
}

export interface ProductsPage {
  products: ProductType[];
  currentPage: number;
  numberOfPages: number;
}