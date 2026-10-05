import { notFound } from "next/navigation";
import { getCategoryById } from "@/services/categories.service";
import { getAllProductsByCategory } from "@/services/products.service";
import { getSubcategoriesByCategory } from "@/services/subcategories.service";
import PageHeader from "@/app/_components/PageHeader/PageHeader";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import EmptyState from "@/app/_components/EmptyState/EmptyState";
import Link from "next/link";
import Image from "next/image";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category, products, subcategories] = await Promise.all([
    getCategoryById(id),
    getAllProductsByCategory(id),
    getSubcategoriesByCategory(id),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <>
      <PageHeader
        image={category.image}
        title={category.name}
        description={`Explore products in ${category.name}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Subcategories
            </h2>
            <div className="flex flex-wrap gap-3">
              {subcategories.map((sub) => (
                <span
                  key={sub._id}
                  className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100"
                >
                  {sub.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        <div className="mb-4 text-sm text-gray-500">
          Showing {products.length} products in {category.name}
        </div>

        {products.length === 0 ? (
          <EmptyState
            icon="FaBoxOpen"
            title="No Products Found"
            description={`No products available in ${category.name} yet.`}
            actionLabel="View All Products"
            actionHref="/products"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
