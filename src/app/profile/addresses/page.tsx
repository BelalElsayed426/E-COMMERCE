"use client";

import { useAuth } from "@/lib/auth-context";
import PageHeader from "../../_components/PageHeader/PageHeader";
import EmptyState from "../../_components/EmptyState/EmptyState";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaLocationDot,
  FaGear,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa6";

const sidebarLinks = [
  {
    href: "/profile/addresses",
    label: "My Addresses",
    icon: FaLocationDot,
  },
  {
    href: "/profile/settings",
    label: "Settings",
    icon: FaGear,
  },
];

export default function AddressesPage() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader
          icon="FaUser"
          title="My Account"
          description="Manage your addresses and account settings"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "My Account" },
          ]}
          gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
        />
        <div className="container mx-auto px-4 py-8">
          <EmptyState
            icon="FaBoxOpen"
            title="Please Sign In"
            description="You need to be signed in to view your addresses."
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
        icon="FaUser"
        title="My Account"
        description="Manage your addresses and account settings"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "My Account" },
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">
                My Account
              </h3>
              <nav className="space-y-1.5">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          isActive
                            ? "bg-primary-100 text-primary-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <link.icon className="text-sm" />
                      </div>
                      <span
                        className={`flex-1 text-sm ${
                          isActive ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {link.label}
                      </span>
                      <FaChevronRight
                        className={`text-xs ${
                          isActive ? "text-primary-400" : "text-gray-300"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  My Addresses
                </h2>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors cursor-pointer">
                  <FaPlus className="text-xs" />
                  Add Address
                </button>
              </div>

              {/* Empty State */}
              <div className="text-center py-16 space-y-3">
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-gray-100 rounded-full mb-4">
                  <FaLocationDot className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  No Addresses Yet
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  You haven&apos;t added any addresses yet. Add your first
                  address for faster checkout.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors mt-2 cursor-pointer">
                  <FaPlus className="text-xs" />
                  Add Your First Address
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
