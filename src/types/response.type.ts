import { Category } from "@/interfaces/categories.interface";
import { ListingResponse } from "@/interfaces/Listing.api.interface";
import { Product } from "@/interfaces/products.interface";

export type CategoryResponse = ListingResponse<Category>;
export type ProductResponse = ListingResponse<Product>;

export interface SingleCategoryResponse {
  data: Category;
}
