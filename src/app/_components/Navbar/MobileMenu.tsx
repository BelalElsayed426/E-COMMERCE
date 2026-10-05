"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { FaBars, FaRegHeart, FaSearch, FaTimes } from "react-icons/fa";
import freshcartLogo from "@/assets/images/freshcart-logo.svg";
import Link from "next/link";
import {
  FaCartShopping,
  FaHeadset,
  FaArrowRightFromBracket,
  FaUser,
} from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Brands", href: "/brands" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistIds } = useWishlist();
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  }

  function handleLogout() {
    logout();
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-primary-600 text-white transition-colors hover:bg-primary-700 rounded-full h-10 w-10 cursor-pointer"
        size="icon"
      >
        <FaBars />
      </Button>
      {/* black overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 overflow-y-auto bg-white shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* logo */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-4">
          <Image
            src={freshcartLogo}
            alt="freshcartLogo"
            className="h-8 w-auto"
            priority
          />
          <Button
            onClick={() => setIsOpen(false)}
            size="icon"
            className="rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
          >
            <FaTimes className="text-gray-600" />
          </Button>
        </div>
        {/* search */}
        <form onSubmit={handleSearch} className="border-b border-gray-100 p-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-700/50 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <Button
              type="submit"
              size="icon-lg"
              className="absolute top-1/2 right-1.5 bg-primary-600 text-white rounded-lg -translate-y-1/2 transition-colors"
            >
              <FaSearch className="text-sm" />
            </Button>
          </div>
        </form>
        {/* Nav links */}
        <nav className="p-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center rounded-xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="border-t border-gray-100 mx-4" />
        <nav className="p-4">
          <div className="space-y-1">
            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-primary-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full h-9 w-9 bg-red-50">
                  <FaRegHeart className="text-red-500" />
                </div>
                <span className="font-medium text-gray-700">Wishlist</span>
              </div>
              {wishlistIds.length > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  {wishlistIds.length}
                </Badge>
              )}
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-primary-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full h-9 w-9 bg-primary-50">
                  <FaCartShopping className="text-primary-600" />
                </div>
                <span className="font-medium text-gray-700">Cart</span>
              </div>
              {cartCount > 0 && (
                <Badge className="bg-primary-600 text-white text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </div>
          <div className="border-t border-gray-100 mx-4" />
          <div className="p-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="flex items-center justify-center rounded-full h-9 w-9 bg-primary-50">
                    <FaUser className="text-primary-600 text-sm" />
                  </div>
                  <span className="font-medium text-gray-700">
                    {user?.name || "Account"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <FaArrowRightFromBracket className="text-sm" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-xl px-4 py-3 text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-xl px-4 py-3 text-base font-medium border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mx-4 mt-2 flex items-center rounded-xl border border-gray-100 bg-gray-50 text-gray-700 transition-colors hover:bg-primary-50 gap-3"
          >
            <div className="flex items-center justify-center rounded-full h-10 w-10 bg-primary-100">
              <FaHeadset className="text-primary-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700">
                Need Help?
              </div>
              <div className="text-sm text-primary-600">Contact Support</div>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
}
