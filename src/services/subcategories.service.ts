import { Subcategory } from "@/interfaces/Subcategories.interface";
import { ListingResponse } from "@/interfaces/Listing.api.interface";

export async function getSubcategoriesByCategory(
  categoryId: string,
): Promise<Subcategory[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch subcategories: ${res.statusText}`);
    }
    const data: ListingResponse<Subcategory> = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    return [];
  }
}
