
import { ProductType } from "../types/product.type";

// Get All Products
export async function getAllProducts(): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) return undefined;

    const data = await res.json();

    return data.data;
  } catch (err) {
    return undefined;
  }
}

// Get Single Product
export async function getSingleProduct(
  id: string
): Promise<ProductType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    if (!res.ok) return undefined;

    const data = await res.json();

    return data.data as ProductType;
  } catch (err) {
    return undefined;
  }
}

// Get Products By Category

export async function getProductsByCategory(
  categoryId: string
): Promise<ProductType[] | undefined> {
  try {
    const url = `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`; 

   

    console.log("Category ID:", categoryId);
    console.log("Products URL:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

  

      

    const data = await res.json();

      

  

    return data.data as ProductType[];
  } catch (err) {
   
    return undefined;
  }
}          




// Get Products By Brand
export async function getProductsByBrand(
  brandId: string
): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${encodeURIComponent(brandId)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return undefined;

    const data = await res.json();

    return data.data as ProductType[];
  } catch (error) {
    
    return undefined;
  }
}  








// ADD this function at the end of src/api/services/routemisr.service.ts
// and add this import at the top of the file:
// import { ProductsPage, ShopQuery } from "../types/shop.type";

// Get Products (search + filters + sort + pagination)
export async function getProducts(query: ShopQuery = {}): Promise<ProductsPage> {
  const emptyPage: ProductsPage = {
    products: [],
    currentPage: 1,
    numberOfPages: 1,
  };

  const params = new URLSearchParams();

  if (query.keyword) params.set("keyword", query.keyword);
  if (query.sort) params.set("sort", query.sort);
  if (query.minPrice) params.set("price[gte]", query.minPrice);
  if (query.maxPrice) params.set("price[lte]", query.maxPrice);
  if (query.brand) params.set("brand", query.brand);

  query.category?.forEach((id) => params.append("category[in]", id));

  params.set("page", String(query.page ?? 1));
  params.set("limit", String(query.limit ?? 12));

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return emptyPage;

    const data = await res.json();

    return {
      products: (data.data ?? []) as ProductType[],
      currentPage: data.metadata?.currentPage ?? 1,
      numberOfPages: data.metadata?.numberOfPages ?? 1,
    };
  } catch (error) {
    
    return emptyPage;
  }
}

