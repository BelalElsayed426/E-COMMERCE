import { Category } from "@/interfaces/categories.interface";
import {
  CategoryResponse,
  SingleCategoryResponse,
} from "@/types/response.type";

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        next: {
          revalidate: 3600,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    const data: CategoryResponse = await res.json();
    return data.data;
  } catch (error) {
    console.log("Failed to fetch categories:", error);
    return [];
  }
}
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    const data: SingleCategoryResponse = await res.json();
    return data.data;
  } catch (error) {
    console.log("Failed to fetch categories:", error);
    return null;
  }
}
