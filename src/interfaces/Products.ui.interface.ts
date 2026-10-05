import { Product } from "./products.interface";

export interface ProductUiProps {
  product: Product;
}

export interface ProductPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}
