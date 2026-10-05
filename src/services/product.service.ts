import { Product } from "@/interfaces/products.interface";

interface SingleProductResponse {
  data: Product;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }
    const data: SingleProductResponse = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}
