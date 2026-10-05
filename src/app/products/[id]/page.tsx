import { notFound } from "next/navigation";
import { getProductById } from "@/services/product.service";
import { getAllProductsByCategory } from "@/services/products.service";
import ProductImageGallery from "../../_components/ProductImageGallery/ProductImageGallery";
import ProductCard from "../../_components/ProductCard/ProductCard";
import Link from "next/link";
import {
  FaStar,
  FaStarHalfStroke,
  FaRegStar,
  FaTruck,
  FaShieldHalved,
  FaArrowRotateLeft,
} from "react-icons/fa6";
import { ProductDetailActions } from "./ProductDetailActions";

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfStroke key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }
  return stars;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const hasDiscount =
    !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100,
      )
    : 0;

  const relatedProducts = await getAllProductsByCategory(
    product.category._id,
  );
  const filtered = relatedProducts
    .filter((p) => p._id !== product._id)
    .slice(0, 5);

  const allImages = [product.imageCover, ...product.images.filter((img) => img !== product.imageCover)];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href="/products"
            className="hover:text-primary-600 transition-colors"
          >
            Products
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href={`/products?category=${product.category._id}`}
            className="hover:text-primary-600 transition-colors"
          >
            {product.category.name}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium line-clamp-1">
            {product.title}
          </span>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <ProductImageGallery images={allImages} title={product.title} />

          {/* Product Info */}
          <div className="flex flex-col gap-5">
            <div>
              <Link
                href={`/products?category=${product.category._id}`}
                className="text-sm text-primary-600 font-medium hover:underline"
              >
                {product.category.name}
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {product.title}
              </h1>
              {product.brand && (
                <p className="text-sm text-gray-500 mt-1">
                  Brand:{" "}
                  <span className="font-medium text-gray-700">
                    {product.brand.name}
                  </span>
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex text-lg">{renderStars(product.ratingsAverage)}</div>
              <span className="text-sm text-gray-600">
                {product.ratingsAverage} ({product.ratingsQuantity} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-bold text-primary-600">
                    {product.priceAfterDiscount}&nbsp;EGP
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {product.price}&nbsp;EGP
                  </span>
                  <span className="px-2.5 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                    -{discountPercent}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {product.price}&nbsp;EGP
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.quantity > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.quantity > 0
                  ? `In Stock (${product.quantity} available)`
                  : "Out of Stock"}
              </span>
              {product.sold > 0 && (
                <span className="text-sm text-gray-500">
                  {product.sold} sold
                </span>
              )}
            </div>

            {/* Actions */}
            <ProductDetailActions
              productId={product._id}
              disabled={product.quantity === 0}
            />

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <FaTruck className="text-primary-600" />
                </div>
                <span className="text-xs text-gray-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <FaShieldHalved className="text-primary-600" />
                </div>
                <span className="text-xs text-gray-600">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <FaArrowRotateLeft className="text-primary-600" />
                </div>
                <span className="text-xs text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {filtered.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Products
              </h2>
              <Link
                href={`/products?category=${product.category._id}`}
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {filtered.map((p) => (
                <ProductCard product={p} key={p._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
