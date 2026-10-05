"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FaCartShopping,
  FaRegHeart,
  FaHeart,
  FaCheck,
} from "react-icons/fa6";

export function ProductDetailActions({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [cartLoading, setCartLoading] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const inWishlist = isInWishlist(productId);

  async function handleAddToCart() {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setCartLoading(true);
    const success = await addToCart(productId);
    setCartLoading(false);
    if (success) {
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2000);
    }
  }

  async function handleWishlist() {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setWishlistLoading(true);
    if (inWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
    setWishlistLoading(false);
  }

  return (
    <div className="flex items-center gap-3 pt-2">
      <Button
        disabled={disabled || cartLoading}
        onClick={handleAddToCart}
        className={`flex-1 h-13 font-semibold text-base rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${
          cartAdded
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-primary-600 text-white hover:bg-primary-700"
        }`}
      >
        {cartLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
        ) : cartAdded ? (
          <FaCheck className="mr-2" />
        ) : (
          <FaCartShopping className="mr-2" />
        )}
        {cartLoading ? "Adding..." : cartAdded ? "Added to Cart!" : "Add to Cart"}
      </Button>
      <Button
        onClick={handleWishlist}
        disabled={wishlistLoading}
        className={`h-13 w-13 rounded-xl border transition-colors cursor-pointer ${
          inWishlist
            ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
            : "border-gray-200 bg-white text-gray-600 hover:text-red-500 hover:border-red-200"
        }`}
        size="icon"
      >
        {wishlistLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        ) : inWishlist ? (
          <FaHeart className="text-xl" />
        ) : (
          <FaRegHeart className="text-xl" />
        )}
      </Button>
    </div>
  );
}
