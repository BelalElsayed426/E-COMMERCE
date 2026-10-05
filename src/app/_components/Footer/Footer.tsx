import Link from "next/link";
import Image from "next/image";
import freshcartLogo from "@/assets/images/freshcart-logo.svg";
import FeaturesBar from "../Home/FeaturesBar/FeaturesBar";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const shopLinks = [
  { name: "All Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Brands", href: "/brands" },
  { name: "Deals & Offers", href: "/deals" },
  { name: "New Arrivals", href: "/products" },
];

const accountLinks = [
  { name: "Sign In", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "My Orders", href: "/profile/orders" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Shopping Cart", href: "/cart" },
];

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Contact Us", href: "/contact" },
  { name: "Shipping Info", href: "/shipping" },
  { name: "Returns & Refunds", href: "/returns" },
  { name: "Track Order", href: "/track-order" },
];

const legalLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer>
      <FeaturesBar />

      <div className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/">
                <Image
                  src={freshcartLogo}
                  alt="FreshCart"
                  className="h-8 w-auto brightness-0 invert mb-4"
                />
              </Link>
              <p className="text-sm text-gray-400 mb-6 max-w-sm">
                Your one-stop shop for fresh groceries, household essentials,
                and more. Quality products delivered right to your door.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <FaLocationDot className="text-primary-500 shrink-0" />
                  <span>123 Market Street, Cairo, Egypt</span>
                </div>
                <Link
                  href="tel:+18001234567"
                  className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
                >
                  <FaPhone className="text-primary-500 shrink-0" />
                  <span>+1 (800) 123-4567</span>
                </Link>
                <Link
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-3 text-sm hover:text-primary-400 transition-colors"
                >
                  <MdEmail className="text-primary-500 shrink-0" />
                  <span>support@freshcart.com</span>
                </Link>
              </div>

              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary-600 hover:text-white"
                    >
                      <Icon className="text-sm" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Shop</h3>
              <ul className="space-y-2.5">
                {shopLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Account</h3>
              <ul className="space-y-2.5">
                {accountLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2.5">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} FreshCart. All rights
                reserved.
              </p>

              <div className="flex items-center gap-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 mr-1">
                  We accept:
                </span>
                <div className="flex items-center gap-1.5">
                  {["Visa", "Mastercard", "PayPal", "Amex"].map((card) => (
                    <span
                      key={card}
                      className="px-2 py-1 bg-gray-800 rounded text-[10px] font-semibold text-gray-400"
                    >
                      {card}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
