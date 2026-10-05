"use client";

import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaCartShopping,
  FaTrash,
  FaMinus,
  FaPlus,
  FaTruck,
  FaShieldHalved,
  FaArrowLeft,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import PageHeader from "@/app/_components/PageHeader/PageHeader";
import EmptyState from "@/app/_components/EmptyState/EmptyState";

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    loading,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [clearingCart, setClearingCart] = useState(false);

  async function handleUpdateQuantity(productId: string, count: number) {
    if (count < 1) return;
    setActionLoading(productId);
    await updateQuantity(productId, count);
    setActionLoading(null);
  }

  async function handleRemove(productId: string) {
    setActionLoading(productId);
    await removeFromCart(productId);
    setActionLoading(null);
  }

  async function handleClearCart() {
    setClearingCart(true);
    await clearCart();
    setClearingCart(false);
  }

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader
          icon="FaCartShopping"
          title="Shopping Cart"
          description="Review your items and proceed to checkout"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Cart" },
          ]}
          gradientClass="bg-gradient-to-r from-primary-700 via-primary-600 to-emerald-500"
        />
        <div className="container mx-auto px-4 py-16">
          <EmptyState
            icon="FaBoxOpen"
            title="Please Sign In"
            description="You need to sign in to view your shopping cart."
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
          icon="FaCartShopping"
          title="Shopping Cart"
          description="Review your items and proceed to checkout"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Cart" },
          ]}
          gradientClass="bg-gradient-to-r from-primary-700 via-primary-600 to-emerald-500"
        />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
            <span className="text-gray-500 font-medium">
              Loading your cart...
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        icon="FaCartShopping"
        title="Shopping Cart"
        description={
          cartItems.length > 0
            ? `You have ${cartItems.length} item${cartItems.length > 1 ? "s" : ""} in your cart`
            : "Your cart is empty"
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart" },
        ]}
        gradientClass="bg-gradient-to-r from-primary-700 via-primary-600 to-emerald-500"
      />

      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <EmptyState
            icon="FaBoxOpen"
            title="Your Cart is Empty"
            description="Looks like you haven't added any products to your cart yet."
            actionLabel="Start Shopping"
            actionHref="/products"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900">
                  Cart Items ({cartItems.length})
                </h2>
                <Button
                  onClick={handleClearCart}
                  disabled={clearingCart}
                  className="text-red-500 bg-red-50 hover:bg-red-100 cursor-pointer text-sm font-medium"
                >
                  <FaTrash className="text-xs" />
                  {clearingCart ? "Clearing..." : "Clear Cart"}
                </Button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className={`flex gap-4 sm:gap-6 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm transition-opacity ${
                    actionLoading === item.product._id ? "opacity-50" : ""
                  }`}
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${item.product.id}`}
                    className="shrink-0"
                  >
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className="object-contain p-2"
                        sizes="112px"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">
                          {item.product.category.name}
                        </p>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors text-sm sm:text-base"
                        >
                          {item.product.title}
                        </Link>
                        {item.product.brand && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            Brand: {item.product.brand.name}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemove(item.product._id)}
                        disabled={actionLoading === item.product._id}
                        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product._id,
                              item.count - 1,
                            )
                          }
                          disabled={
                            item.count <= 1 ||
                            actionLoading === item.product._id
                          }
                          className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="h-8 w-10 flex items-center justify-center text-sm font-semibold text-gray-900">
                          {item.count}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product._id,
                              item.count + 1,
                            )
                          }
                          disabled={actionLoading === item.product._id}
                          className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-600">
                          {item.price * item.count}&nbsp;EGP
                        </p>
                        {item.count > 1 && (
                          <p className="text-xs text-gray-400">
                            {item.price}&nbsp;EGP each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors mt-2"
              >
                <FaArrowLeft className="text-xs" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Order Summary
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>
                        Subtotal ({cartItems.length} item
                        {cartItems.length > 1 ? "s" : ""})
                      </span>
                      <span className="font-medium">{totalPrice} EGP</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium text-primary-600">Free</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <span className="text-base font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-base font-bold text-primary-600">
                        {totalPrice} EGP
                      </span>
                    </div>
                  </div>

                  <Button className="w-full h-12 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors mt-6 cursor-pointer">
                    <FaCartShopping className="text-sm" />
                    Proceed to Checkout
                  </Button>
                </div>

                {/* Trust Features */}
                <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100">
                      <FaTruck className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Free Shipping
                      </p>
                      <p className="text-xs text-gray-500">
                        On orders over 500 EGP
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100">
                      <FaShieldHalved className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Secure Payment
                      </p>
                      <p className="text-xs text-gray-500">
                        100% payment protection
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
