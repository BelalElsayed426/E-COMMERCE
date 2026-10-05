import PageHeader from "../_components/PageHeader/PageHeader";
import { getAllBrands } from "@/services/brands.service";
import Image from "next/image";
import Link from "next/link";
import EmptyState from "../_components/EmptyState/EmptyState";

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <>
      <PageHeader
        icon="FaTags"
        title="Top Brands"
        description="Shop from your favorite brands"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
        gradientClass="bg-gradient-to-br from-violet-600 via-violet-500 to-violet-400"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-sm text-gray-500">
          Showing {brands.length} brands
        </div>

        {brands.length === 0 ? (
          <EmptyState
            icon="FaBoxOpen"
            title="No Brands Found"
            description="No brands are available at the moment."
            actionLabel="Go Home"
            actionHref="/"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/products?brand=${brand._id}`}
                className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-2 hover:shadow-lg duration-300 flex flex-col items-center gap-3"
              >
                <div className="relative h-20 w-20">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 text-center group-hover:text-primary-600 transition-colors">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
