import { Category } from "./categories.interface";

export interface CategoryUiProps {
  category: Category;
  variant?: "compact" | "detailed";
}
