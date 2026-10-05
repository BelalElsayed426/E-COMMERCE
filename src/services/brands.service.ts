import { Brand } from "@/interfaces/Brands.interface";
import { ListingResponse } from "@/interfaces/Listing.api.interface";

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
      {
        next: {
          revalidate: 3600,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.statusText}`);
    }
    const data: ListingResponse<Brand> = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
}
