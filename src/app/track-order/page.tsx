"use client";

import { useState, FormEvent } from "react";
import PageHeader from "../_components/PageHeader/PageHeader";
import { Button } from "@/components/ui/button";
import { FaTruck, FaMagnifyingGlass } from "react-icons/fa6";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHeader
        icon="FaTruck"
        title="Track Your Order"
        description="Enter your order ID to check its status"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Track Order" },
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-2xl text-primary-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Track Your Package
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter your order number to see delivery updates
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="orderId"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Order Number
                </label>
                <div className="relative">
                  <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    id="orderId"
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. 12345"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors cursor-pointer"
              >
                Track Order
              </Button>
            </form>

            {submitted && (
              <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-sm text-gray-500 text-center">
                  For detailed order tracking, please visit your{" "}
                  <a
                    href="/profile/orders"
                    className="text-primary-600 font-semibold hover:text-primary-700"
                  >
                    Order History
                  </a>{" "}
                  page.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
