"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import PageHeader from "../_components/PageHeader/PageHeader";
import EmptyState from "../_components/EmptyState/EmptyState";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  FaTruck,
  FaShieldHalved,
  FaCreditCard,
  FaMoneyBill,
} from "react-icons/fa6";

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

export default function CheckoutPage() {
  const { isAuthenticated, token } = useAuth();
  const { cartItems, totalPrice, cartId, loading, clearCart } = useCart();
  const router = useRouter();

  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">(
    "online",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader
          icon="FaCreditCard"
          title="Checkout"
          description="Complete your order"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
          gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
        />
        <div className="container mx-auto px-4 py-8">
          <EmptyState
            icon="FaBoxOpen"
            title="Please Sign In"
            description="You need to be signed in to checkout."
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
          icon="FaCreditCard"
          title="Checkout"
          description="Complete your order"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
          gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
        />
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <PageHeader
          icon="FaCreditCard"
          title="Checkout"
          description="Complete your order"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
          gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
        />
        <div className="container mx-auto px-4 py-8">
          <EmptyState
            icon="FaBoxOpen"
            title="Your Cart is Empty"
            description="Add some products before checking out."
            actionLabel="Browse Products"
            actionHref="/products"
          />
        </div>
      </>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!cartId || !token) return;
    setError("");
    setSubmitting(true);

    try {
      if (paymentMethod === "online") {
        const res = await fetch(
          `${API_BASE}/orders/checkout-session/${cartId}?url=${window.location.origin}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", token },
            body: JSON.stringify({
              shippingAddress: { details, phone, city },
            }),
          },
        );
        const data = await res.json();
        if (data.status === "success" && data.session?.url) {
          window.location.href = data.session.url;
          return;
        }
        setError(data.message || "Failed to create checkout session.");
      } else {
        const res = await fetch(`${API_BASE}/orders/${cartId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
          body: JSON.stringify({
            shippingAddress: { details, phone, city },
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          await clearCart();
          router.push("/allorders");
          return;
        }
        setError(data.message || "Failed to place order.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <>
      <PageHeader
        icon="FaCreditCard"
        title="Checkout"
        description="Complete your order"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <FaTruck className="text-primary-600" />
                  Shipping Address
                </h2>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Address Details
                    </label>
                    <input
                      id="details"
                      type="text"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Street address, apartment, suite, etc."
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter your city"
                        required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <FaCreditCard className="text-primary-600" />
                  Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                      paymentMethod === "online"
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-500/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        paymentMethod === "online"
                          ? "bg-primary-100 text-primary-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <FaCreditCard />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">
                        Online Payment
                      </div>
                      <div className="text-xs text-gray-500">
                        Pay with credit/debit card
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all cursor-pointer ${
                      paymentMethod === "cash"
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-500/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        paymentMethod === "cash"
                          ? "bg-primary-100 text-primary-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <FaMoneyBill />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">
                        Cash on Delivery
                      </div>
                      <div className="text-xs text-gray-500">
                        Pay when you receive
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-14 bg-primary-600 text-white font-semibold text-lg rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {submitting
                  ? "Processing..."
                  : paymentMethod === "online"
                    ? "Pay Now"
                    : "Place Order"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-lg bg-gray-50 overflow-hidden">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Qty: {item.count}
                      </p>
                      <p className="text-sm font-semibold text-primary-600">
                        {item.price} EGP
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-5 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{totalPrice} EGP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">{totalPrice} EGP</span>
                </div>
              </div>

              {/* Trust Features */}
              <div className="border-t border-gray-100 mt-5 pt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaShieldHalved className="text-primary-600" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaTruck className="text-primary-600" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
