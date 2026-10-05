import PageHeader from "../_components/PageHeader/PageHeader";
import {
  getAllProducts,
  getAllProductsByCategory,
} from "@/services/products.service";
import ProductCard from "../_components/ProductCard/ProductCard";
import { ProductPageProps } from "@/interfaces/Products.ui.interface";
import { getCategoryById } from "@/services/categories.service";
import { notFound } from "next/navigation";
import { ActiveFilter } from "@/interfaces/ActiveFilters.interface";
import ActiveFilters from "../_components/ActiveFilters/ActiveFilters";
import EmptyState from "../_components/EmptyState/EmptyState";

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  const { category: categoryId, search } = await searchParams;
  const [category, products] = await Promise.all([
    categoryId ? getCategoryById(categoryId) : Promise.resolve(null),
    categoryId
      ? getAllProductsByCategory(categoryId)
      : getAllProducts(search || undefined),
  ]);

  if (categoryId && !category) {
    notFound();
  }

  const filters: ActiveFilter[] = [];
  if (category) {
    filters.push({
      key: "category",
      icon: "FaLayerGroup",
      label: category.name,
      removeHref: "/products",
    });
  }
  if (search) {
    filters.push({
      key: "search",
      icon: "FaBoxOpen",
      label: `"${search}"`,
      removeHref: categoryId ? `/products?category=${categoryId}` : "/products",
    });
  }

  const pageTitle = category
    ? category.name
    : search
      ? `Search: "${search}"`
      : "All Products";
  const pageDescription = category
    ? `Browse products in ${category.name}`
    : search
      ? `Showing results for "${search}"`
      : "Explore our complete product collection";

  return (
    <>
      <PageHeader
        icon="FaBoxOpen"
        title={pageTitle}
        description={pageDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: category ? "/products" : undefined },
          ...(category ? [{ label: category.name }] : []),
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400"
      />

      <div className="container mx-auto px-4 py-8">
        <ActiveFilters filters={filters} clearAllHref="/products" />
        <div className="mb-6 text-sm text-gray-500">
          Showing {products.length} products
        </div>

        {products.length === 0 ? (
          <EmptyState
            icon="FaBoxOpen"
            title="No Products Found"
            description="No products match your current filters."
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
