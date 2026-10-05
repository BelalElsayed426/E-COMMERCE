"use client";

import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaHeart,
  FaTrash,
  FaCartShopping,
  FaRegStar,
  FaStar,
  FaStarHalfStroke,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import PageHeader from "@/app/_components/PageHeader/PageHeader";
import EmptyState from "@/app/_components/EmptyState/EmptyState";

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

export default function WishlistPage() {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [cartLoading, setCartLoading] = useState<string | null>(null);

  async function handleRemove(productId: string) {
    setActionLoading(productId);
    await removeFromWishlist(productId);
    setActionLoading(null);
  }

  async function handleAddToCart(productId: string) {
    setCartLoading(productId);
    await addToCart(productId);
    setCartLoading(null);
  }

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader
          icon="FaHeart"
          title="My Wishlist"
          description="Save your favorite products for later"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Wishlist" },
          ]}
          gradientClass="bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400"
        />
        <div className="container mx-auto px-4 py-16">
          <EmptyState
            icon="FaBoxOpen"
            title="Please Sign In"
            description="You need to sign in to view your wishlist."
            actionLabel="Sign In"
            actionHref="/login"
          />
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader
          icon="FaHeart"
          title="My Wishlist"
          description="Save your favorite products for later"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Wishlist" },
          ]}
          gradientClass="bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400"
        />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600" />
            <span className="text-gray-500 font-medium">
              Loading your wishlist...
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        icon="FaHeart"
        title="My Wishlist"
        description={
          wishlistItems.length > 0
            ? `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? "s" : ""} saved`
            : "Your wishlist is empty"
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Wishlist" },
        ]}
        gradientClass="bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400"
      />

      <div className="container mx-auto px-4 py-8">
        {wishlistItems.length === 0 ? (
          <EmptyState
            icon="FaBoxOpen"
            title="Your Wishlist is Empty"
            description="You haven't added any products to your wishlist yet. Browse our products and save your favorites!"
            actionLabel="Browse Products"
            actionHref="/products"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlistItems.map((product) => {
              const hasDiscount =
                !!product.priceAfterDiscount &&
                product.priceAfterDiscount < product.price;
              const discountPercent = hasDiscount
                ? Math.round(
                    ((product.price - product.priceAfterDiscount!) /
                      product.price) *
                      100,
                  )
                : 0;

              return (
                <div
                  key={product._id}
                  className={`group rounded-lg border border-gray-200 overflow-hidden bg-white transition-all hover:-translate-y-2 hover:shadow-md duration-300 ${
                    actionLoading === product._id ? "opacity-50" : ""
                  }`}
                >
                  <div className="relative">
                    <Link href={`/products/${product._id}`}>
                      <div className="relative h-60 w-full bg-white">
                        <Image
                          src={product.imageCover}
                          alt={product.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    </Link>
                    {hasDiscount && (
                      <div className="absolute left-3 top-3">
                        <span className="rounded bg-red-500 text-white px-2 py-1 text-xs">
                          -{discountPercent}%
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => handleRemove(product._id)}
                      disabled={actionLoading === product._id}
                      className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-full bg-white text-red-500 shadow-sm hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <FaHeart />
                    </button>
                  </div>

                  <div className="p-4 flex flex-col gap-1">
                    <div className="text-xs text-gray-500">
                      {product.category.name}
                    </div>
                    <h3
                      className="font-medium text-gray-700 line-clamp-2"
                      title={product.title}
                    >
                      <Link
                        href={`/products/${product._id}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {product.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-lg">
                        {renderStars(product.ratingsAverage)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {product.ratingsAverage}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-wrap gap-x-2">
                        {hasDiscount ? (
                          <>
                            <span className="text-lg font-bold text-primary-600">
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
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => handleAddToCart(product._id)}
                        disabled={cartLoading === product._id}
                        className="flex-1 h-10 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors cursor-pointer"
                      >
                        <FaCartShopping className="text-xs" />
                        {cartLoading === product._id
                          ? "Adding..."
                          : "Add to Cart"}
                      </Button>
                      <Button
                        onClick={() => handleRemove(product._id)}
                        disabled={actionLoading === product._id}
                        className="h-10 w-10 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
                        size="icon"
                      >
                        <FaTrash className="text-xs" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
