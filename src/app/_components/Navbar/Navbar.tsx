"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import freshcartLogo from "@/assets/images/freshcart-logo.svg";
import { useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  FaTruck,
  FaGift,
  FaPhone,
  FaSearch,
  FaHeadset,
  FaRegHeart,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  FaCartShopping,
  FaUserPlus,
  FaArrowRightFromBracket,
  FaBoxOpen,
  FaGear,
  FaRegCircleUser,
  FaRegUser,
  FaRegAddressBook,
} from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import MobileMenu from "./MobileMenu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

const categories = [
  { name: "All Categories", href: "/categories" },
  { name: "Electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
  {
    name: "Women's Fashion",
    href: "/products?category=6439d58a0049ad0b52b9003f",
  },
  {
    name: "Men's Fashion",
    href: "/products?category=6439d5b90049ad0b52b90048",
  },
  {
    name: "Beauty & Health",
    href: "/products?category=6439d30b67d9aa4ca97064b1",
  },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistIds } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="hidden lg:block w-full border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaTruck className="text-xs text-primary-600" />
                <span>Free Shipping on Orders 500 EGP</span>
              </div>

              <div className="flex items-center gap-2">
                <FaGift className="text-xs text-primary-600" />
                <span>New Arrivals Daily</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <Link
                  href="tel:+18001234567"
                  className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
                >
                  <FaPhone className="text-xs" />
                  <span>+1 (800) 123-4567</span>
                </Link>

                <Link
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
                >
                  <MdEmail className="text-xs" />
                  <span>support@freshcart.com</span>
                </Link>
              </div>

              <span className="h-4 w-px bg-gray-200" />

              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {isAuthenticated ? (
                    <>
                      <NavigationMenuItem>
                        <span className="flex items-center gap-1.5 text-sm text-gray-600">
                          <LuUser className="text-sm" />
                          <span>{user?.name || "Account"}</span>
                        </span>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <button
                          onClick={logout}
                          className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-red-500 cursor-pointer"
                        >
                          <FaArrowRightFromBracket className="text-sm" />
                          <span>Sign Out</span>
                        </button>
                      </NavigationMenuItem>
                    </>
                  ) : (
                    <>
                      <NavigationMenuItem>
                        <Link
                          href="/login"
                          className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-primary-600"
                        >
                          <LuUser className="text-sm" />
                          <span>Sign In</span>
                        </Link>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <Link
                          href="/register"
                          className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-primary-600"
                        >
                          <FaUserPlus className="text-sm" />
                          <span>Sign Up</span>
                        </Link>
                      </NavigationMenuItem>
                    </>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 ">
          <div className="flex h-16 items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/">
              <Image
                src={freshcartLogo}
                alt="freshcartLogo"
                className="h-6 w-auto lg:h-8"
                priority
              />
            </Link>
            {/* Search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                  setSearchQuery("");
                }
              }}
              className="hidden lg:flex flex-1 max-w-2xl"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-5 py-3 pr-12 text-sm text-gray-700/50 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />

                <Button
                  type="submit"
                  size="icon-lg"
                  className="absolute top-1/2 right-1.5 bg-primary-600 text-white rounded-full -translate-y-1/2 transition-colors hover:bg-primary-700"
                >
                  <FaSearch className="text-sm" />
                </Button>
              </div>
            </form>
            {/* Nav links */}
            <nav className="hidden xl:flex items-center gap-6">
              <Link
                href="/"
                className="font-medium text-gray-700 transition-colors hover:text-primary-600"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="font-medium text-gray-700 transition-colors hover:text-primary-600"
              >
                Shop
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="group text-base font-medium text-gray-700 transition-colors hover:text-primary-600 p-0 m-0 cursor-pointer">
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white p-0">
                      <div className="w-50">
                        {categories.map((item) => (
                          <NavigationMenuLink
                            asChild
                            key={item.href}
                            className="text-base font-medium text-gray-700 transition-colors hover:text-primary-600 py-2.5 px-4"
                          >
                            <Link href={item.href}>{item.name}</Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link
                href="/brands"
                className="font-medium text-gray-700 transition-colors hover:text-primary-600"
              >
                Brands
              </Link>
            </nav>
            {/* right side */}
            <div className="flex items-center gap-1 lg:gap-2">
              <Link
                href="/contact"
                className="hidden lg:flex items-center gap-2 border-r border-gray-200 pr-3 mr-2 transition-opacity hover:opacity-80"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-50">
                  <FaHeadset className="text-primary-600" />
                </div>
                <div className="text-xs">
                  <div className="text-gray-400">Support</div>
                  <div className="text-gray-600 font-semibold">24/7 Help</div>
                </div>
              </Link>

              <Link
                href="/wishlist"
                title="Wishlist"
                className="group rounded-full p-2.5 transition-colors hover:bg-gray-100 relative"
              >
                <FaRegHeart className="text-2xl text-gray-500 transition-colors group-hover:text-primary-600" />
                {wishlistIds.length > 0 && (
                  <Badge className="absolute top-0.5 right-0.5 size-4 bg-red-500 text-xs font-semibold text-white">
                    {wishlistIds.length}
                  </Badge>
                )}
              </Link>
              <Link
                href="/cart"
                title="Cart"
                className="group rounded-full p-2.5 transition-colors hover:bg-gray-100 relative"
              >
                <FaCartShopping className="text-2xl text-gray-500 transition-colors group-hover:text-primary-600" />
                {cartCount > 0 && (
                  <Badge className="absolute top-0.5 right-0.5 size-4 bg-primary-600 text-xs font-semibold text-white">
                    {cartCount}
                  </Badge>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="hidden lg:block relative" ref={accountRef}>
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group cursor-pointer"
                    title="Account"
                  >
                    <FaRegCircleUser className="text-xl text-gray-500 group-hover:text-primary-600 transition-colors" />
                  </button>
                  <div
                    className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-200 origin-top-right ${
                      accountOpen
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible"
                    }`}
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <FaRegCircleUser className="text-xl text-primary-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user?.email || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/profile"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <FaRegUser className="w-4 text-gray-400" />
                        My Profile
                      </Link>
                      <Link
                        href="/profile/orders"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <FaBoxOpen className="w-4 text-gray-400" />
                        My Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <FaRegHeart className="w-4 text-gray-400" />
                        My Wishlist
                      </Link>
                      <Link
                        href="/profile/addresses"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <FaRegAddressBook className="w-4 text-gray-400" />
                        Addresses
                      </Link>
                      <Link
                        href="/profile/settings"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        <FaGear className="w-4 text-gray-400" />
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={() => {
                          setAccountOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
                      >
                        <FaArrowRightFromBracket className="w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden lg:flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white ml-2 transition-colors hover:bg-primary-700 shadow-md shadow-primary-600/20"
                >
                  <LuUser className="text-sm" />
                  Sign In
                </Link>
              )}
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
