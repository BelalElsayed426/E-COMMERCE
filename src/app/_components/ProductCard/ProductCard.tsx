import {
  FaArrowsRotate,
  FaRegEye,
  FaRegStar,
  FaStar,
  FaStarHalfStroke,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { ProductUiProps } from "@/interfaces/Products.ui.interface";
import {
  AddToCartButton,
  WishlistButton,
} from "./ProductCardActions";
import { Button } from "@/components/ui/button";

function renderStars(rating: number) {
  const stars = [];
  for (let i = 0; i <= 5; i++) {
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

export default function ProductCard({ product }: ProductUiProps) {
  const hasDiscount =
    !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100,
      )
    : 0;

  return (
    <div className="group rounded-lg border border-gray-200 overflow-hidden bg-white transition-all hover:-translate-y-3 hover:shadow-md duration-300">
      <div className="relative">
        <div className="relative h-60 w-full bg-white">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute left-3 top-3">
            <span className="rounded bg-red-500 text-white px-2 py-1 text-xs">
              -{discountPercent}%
            </span>
          </div>
        )}
        {/* Product Actions Buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <WishlistButton productId={product._id} />
          <Button
            size="icon-lg"
            className="cursor-pointer rounded-full bg-white text-gray-600 shadow-sm transition hover:text-primary-600"
          >
            <FaArrowsRotate />
          </Button>
          <Link
            href={`/products/${product.id}`}
            className="flex items-center justify-center h-8 w-8 cursor-pointer rounded-full bg-white text-gray-600 shadow-sm transition hover:text-primary-600"
          >
            <FaRegEye />
          </Link>
        </div>
      </div>
      {/* Product Details */}
      <div className="p-4 flex flex-col gap-1">
        <div className="text-xs text-gray-500">{product.category.name}</div>
        <h3
          className="cursor-pointer font-medium text-gray-700 line-clamp-2"
          title={product.title}
        >
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex text-lg">
            {renderStars(product.ratingsAverage)}
          </div>
          <span className="text-sm text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>
        {/* Product Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-x-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-primary-600 ">
                  {product.priceAfterDiscount}&nbsp;EGP
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {product.price}&nbsp;EGP
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                {product.price}&nbsp;EGP
              </span>
            )}
          </div>
          <AddToCartButton
            productId={product._id}
            disabled={product.quantity === 0}
          />
        </div>
      </div>
    </div>
  );
}
