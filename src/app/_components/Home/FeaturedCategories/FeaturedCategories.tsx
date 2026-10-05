import { Category } from "@/interfaces/categories.interface";
import { getCategories } from "@/services/categories.service";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import CategoryCard from "../../CategoryCard/CategoryCard";

export default async function FeaturedCategories() {
  const Categories: Category[] = await getCategories();
  return (
    <section id="categories" className="py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="my-8 flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-700" />
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Shop By <span className="text-emerald-600">Category</span>
            </h2>
          </div>
          <Link
            href="/categories"
            className="flex items-center cursor-pointer self-end font-medium text-primary-600 hover:text-primary-700 sm:self-auto"
          >
            View All Categories
            <FaArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {Categories.map((category) => (
            <CategoryCard
              category={category}
              variant="compact"
              key={category._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
