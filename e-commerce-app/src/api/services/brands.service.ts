
import { BrandType } from "../types/product.type";

// Get All Brands
export async function getAllBrands(): Promise<BrandType[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.data as BrandType[];
  } catch (error) {
    
    return [];
  }
}

// Get Specific Brand


export async function getSpecificBrand(
  brandId: string
): Promise<BrandType | undefined> {
  const url = `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) return undefined;

      const data = await res.json();

      return data.data as BrandType;
    } catch (error) {
    

      if (attempt === 3) {
        return undefined;
      }
    }
  }

  return undefined;
}

