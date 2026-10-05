import { CategoryUiProps } from "@/interfaces/Category.ui.interface";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function CategoryCard({
  category,
  variant = "detailed",
}: CategoryUiProps) {
  if (variant === "compact") {
    return (
      <Link
        key={category._id}
        href={`/categories/${category._id}`}
        className="group cursor-pointer rounded-lg bg-white p-4 shadow-sm text-center transition-shadow hover:shadow-md"
      >
        <div className="relative mx-auto mb-3 h-20 w-20 rounded-full bg-primary-100 transition-colors group-hover:bg-primary-200">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover rounded-full"
            sizes="5rem"
          />
        </div>
        <h3 className="font-medium">{category.name}</h3>
      </Link>
    );
  }
  return (
    <Link
      key={category._id}
      href={`/categories/${category._id}`}
      className="group cursor-pointer rounded-2xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm text-center transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gray-50">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
      </div>
      <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
        {category.name}
      </h3>
      <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm text-primary-600 flex items-center gap-1">
          View Subcategories
          <FaArrowRight className="text-[10px]" />
        </span>
      </div>
    </Link>
  );
}
