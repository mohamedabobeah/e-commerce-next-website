
import { CategoryType, SubcategoryType } from "../types/product.type";

// Get All Categories
export async function getAllCategories(): Promise<CategoryType[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data.data as CategoryType[];
  } catch (error) {
   
    return [];
  }
}

// Get Specific Category
export async function getSpecificCategory(
  categoryId: string
): Promise<CategoryType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return undefined;
    }

    const data = await res.json();

    return data.data as CategoryType;
  } catch (error) {
    
    return undefined;
  }
}

// Get All Subcategories
export async function getAllSubcategories(): Promise<SubcategoryType[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data.data as SubcategoryType[];
  } catch (error) {
    
    return [];
  }
}

// Get Subcategories By Category
export async function getSubcategoriesByCategory(
  categoryId: string
): Promise<SubcategoryType[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data.data as SubcategoryType[];
  } catch (error) {
    
    return [];
  }
}
