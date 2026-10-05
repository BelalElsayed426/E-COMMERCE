import { Product } from "@/interfaces/products.interface";
import { ProductResponse } from "@/types/response.type";

export async function getAllProducts(keyword?: string): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    const query = params.toString();
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products${query ? `?${query}` : ""}`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    const data: ProductResponse = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
export async function getAllProductsByCategory(
  categoryId: string,
): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    const data: ProductResponse = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
