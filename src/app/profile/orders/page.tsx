"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import PageHeader from "../../_components/PageHeader/PageHeader";
import EmptyState from "../../_components/EmptyState/EmptyState";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import {
  FaClockRotateLeft,
  FaCreditCard,
  FaMoneyBill,
  FaTruck,
  FaCheck,
} from "react-icons/fa6";

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

interface OrderProduct {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
}

interface Order {
  _id: string;
  id: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  cartItems: OrderProduct[];
  shippingAddress?: {
    details: string;
    phone: string;
    city: string;
  };
}

export default function OrdersPage() {
  const { isAuthenticated, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function fetchOrders() {
      try {
        const decoded = jwtDecode<{ id: string }>(token!);
        const res = await fetch(`${API_BASE}/orders/user/${decoded.id}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data.reverse());
        }
      } catch {
        console.error("Failed to fetch orders");
      }
      setLoading(false);
    }

    fetchOrders();
  }, [token]);

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader
          icon="FaClockRotateLeft"
          title="Order History"
          description="Track your past orders"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Orders" },
          ]}
          gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
        />
        <div className="container mx-auto px-4 py-8">
          <EmptyState
            icon="FaBoxOpen"
            title="Please Sign In"
            description="You need to be signed in to view your orders."
            actionLabel="Sign In"
            actionHref="/login"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        icon="FaClockRotateLeft"
        title="Order History"
        description="Track your past orders"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Orders" },
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
      />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            icon="FaBoxOpen"
            title="No Orders Yet"
            description="You haven't placed any orders yet."
            actionLabel="Start Shopping"
            actionHref="/products"
          />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        Order #{order.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isPaid ? (
                        <FaCheck className="text-[10px]" />
                      ) : (
                        <FaClockRotateLeft className="text-[10px]" />
                      )}
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        order.isDelivered
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.isDelivered ? (
                        <FaCheck className="text-[10px]" />
                      ) : (
                        <FaTruck className="text-[10px]" />
                      )}
                      {order.isDelivered ? "Delivered" : "In Transit"}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {order.paymentMethodType === "card" ? (
                        <FaCreditCard className="text-[10px]" />
                      ) : (
                        <FaMoneyBill className="text-[10px]" />
                      )}
                      {order.paymentMethodType === "card"
                        ? "Card"
                        : "Cash"}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="relative h-16 w-16 shrink-0 rounded-lg bg-gray-50 overflow-hidden">
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

                  {/* Order Footer */}
                  <div className="border-t border-gray-100 mt-4 pt-4 flex flex-wrap items-center justify-between gap-4">
                    {order.shippingAddress && (
                      <p className="text-sm text-gray-500">
                        {order.shippingAddress.city} —{" "}
                        {order.shippingAddress.details}
                      </p>
                    )}
                    <p className="text-lg font-bold text-primary-600">
                      {order.totalOrderPrice} EGP
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
