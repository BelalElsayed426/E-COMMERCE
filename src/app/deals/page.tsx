import PageHeader from "../_components/PageHeader/PageHeader";
import Link from "next/link";
import { FaBolt, FaArrowRight } from "react-icons/fa6";

export default function DealsPage() {
  return (
    <>
      <PageHeader
        icon="FaBolt"
        title="Deals & Offers"
        description="Discover amazing discounts on your favorite products"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Deals & Offers" },
        ]}
        gradientClass="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
            <FaBolt className="text-3xl text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Deals Coming Soon!
          </h2>
          <p className="text-gray-500 mb-8">
            We&apos;re preparing exciting deals and exclusive offers for you.
            Check back soon or browse our products to find great prices.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Browse Products
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </>
  );
}
