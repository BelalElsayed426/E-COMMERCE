"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./auth-context";

interface CartItem {
  count: number;
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: { name: string };
    brand: { name: string };
    ratingsAverage: number;
    id: string;
    price: number;
  };
  price: number;
}

interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  totalPrice: number;
  cartId: string | null;
  loading: boolean;
  addToCart: (productId: string) => Promise<boolean>;
  removeFromCart: (productId: string) => Promise<boolean>;
  updateQuantity: (productId: string, count: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotalPrice(0);
      setCartId(null);
    }
  }, [token]);

  async function fetchCart() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        headers: { token },
      });
      if (res.ok) {
        const data = await res.json();
        const cart: CartData = data.data;
        setCartItems(cart.products);
        setTotalPrice(cart.totalCartPrice);
        setCartId(cart._id);
      }
    } catch {
      // silently fail
    }
    setLoading(false);
  }

  async function addToCart(productId: string) {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.data.products);
        setTotalPrice(data.data.totalCartPrice);
        setCartId(data.data._id);
        return true;
      }
    } catch {
      // silently fail
    }
    return false;
  }

  async function removeFromCart(productId: string) {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/cart/${productId}`, {
        method: "DELETE",
        headers: { token },
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.data.products);
        setTotalPrice(data.data.totalCartPrice);
        return true;
      }
    } catch {
      // silently fail
    }
    return false;
  }

  async function updateQuantity(productId: string, count: number) {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/cart/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ count }),
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.data.products);
        setTotalPrice(data.data.totalCartPrice);
        return true;
      }
    } catch {
      // silently fail
    }
    return false;
  }

  async function clearCart() {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: "DELETE",
        headers: { token },
      });
      if (res.ok) {
        setCartItems([]);
        setTotalPrice(0);
        setCartId(null);
        return true;
      }
    } catch {
      // silently fail
    }
    return false;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length,
        totalPrice,
        cartId,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
