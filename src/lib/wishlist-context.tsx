"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./auth-context";

interface WishlistProduct {
  _id: string;
  title: string;
  slug: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  category: { name: string; _id: string };
  brand: { name: string; _id: string };
  ratingsAverage: number;
  ratingsQuantity: number;
  id: string;
  quantity: number;
  sold: number;
  images: string[];
  subcategory: { _id: string; name: string; slug: string; category: string }[];
  description: string;
  createdAt: string;
  updatedAt: string;
  availableColors?: string[];
}

interface WishlistContextType {
  wishlistItems: WishlistProduct[];
  wishlistIds: string[];
  loading: boolean;
  addToWishlist: (productId: string) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<boolean>;
  isInWishlist: (productId: string) => boolean;
  fetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
      setWishlistIds([]);
    }
  }, [token]);

  async function fetchWishlist() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/wishlist`, {
        headers: { token },
      });
      if (res.ok) {
        const data = await res.json();
        setWishlistItems(data.data);
        setWishlistIds(data.data.map((item: WishlistProduct) => item._id));
      }
    } catch {
      // silently fail
    }
    setLoading(false);
  }

  async function addToWishlist(productId: string) {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        const data = await res.json();
        setWishlistIds(data.data);
        await fetchWishlist();
        return true;
      }
    } catch {
      // silently fail
    }
    return false;
  }

  async function removeFromWishlist(productId: string) {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/wishlist/${productId}`, {
        method: "DELETE",
        headers: { token },
      });
      if (res.ok) {
        const data = await res.json();
        setWishlistIds(data.data);
        setWishlistItems((prev) =>
          prev.filter((item) => item._id !== productId),
        );
        return true;
      }
    } catch {
      // silently fail
    }
    return false;
  }

  function isInWishlist(productId: string) {
    return wishlistIds.includes(productId);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistIds,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
