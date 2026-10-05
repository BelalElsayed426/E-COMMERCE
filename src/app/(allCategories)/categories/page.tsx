import CategoryCard from "@/app/_components/CategoryCard/CategoryCard";
import PageHeader from "@/app/_components/PageHeader/PageHeader";
import { Category } from "@/interfaces/categories.interface";
import { getCategories } from "@/services/categories.service";

export default async function page() {
  const Categories: Category[] = await getCategories();
  return (
    <>
      <PageHeader
        icon="FaLayerGroup"
        title="All Categories"
        description="Browse our wide range of product categories"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400"
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Categories.map((category) => (
            <CategoryCard category={category} key={category._id} />
          ))}
        </div>
      </div>
    </>
  );
}
