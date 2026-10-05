"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaPlus, FaRegHeart, FaHeart, FaCheck } from "react-icons/fa6";

export function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleClick() {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setLoading(true);
    const success = await addToCart(productId);
    setLoading(false);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  }

  return (
    <Button
      title="Add to cart"
      size="icon-xl"
      disabled={disabled || loading}
      onClick={handleClick}
      className={`cursor-pointer transition ${
        added
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-primary-600 text-white hover:bg-primary-700"
      } disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : added ? (
        <FaCheck />
      ) : (
        <FaPlus />
      )}
    </Button>
  );
}

export function WishlistButton({ productId }: { productId: string }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const inWishlist = isInWishlist(productId);

  async function handleClick() {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setLoading(true);
    if (inWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
    setLoading(false);
  }

  return (
    <Button
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      size="icon-lg"
      onClick={handleClick}
      disabled={loading}
      className={`cursor-pointer rounded-full bg-white shadow-sm transition ${
        inWishlist
          ? "text-red-500 hover:text-red-600"
          : "text-gray-600 hover:text-red-500"
      }`}
    >
      {loading ? (
        <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
      ) : inWishlist ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
}
