import Link from "next/link";
import {
  FaAppleWhole,
  FaCarrot,
  FaCartShopping,
  FaHouse,
  FaLemon,
  FaSeedling,
} from "react-icons/fa6";
import GoBackButton from "./_components/GoBackButton/GoBackButton";

const Links = [
  { label: "All Products", href: "/products", primary: true },
  { label: "Categories", href: "/categories" },
  { label: "Today's Deals", href: "/deals" },
  { label: "Contact Us", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-gray-50 flex items-center justify-center px-4 py-16">
      {/* Decorative background blobs */}
      <FaAppleWhole className="hidden lg:block absolute top-16 left-16 text-4xl text-primary-200/60 rotate-[5deg]" />
      <FaAppleWhole className="hidden lg:block absolute top-80 left-50 text-2xl text-primary-200/60 rotate-[5deg]" />
      <FaCarrot className="hidden lg:block absolute top-32 right-32 text-4xl text-primary-200/60 rotate-[5deg]" />
      <FaLemon className="hidden lg:block absolute bottom-50 left-32 text-4xl text-primary-200/60 rotate-[5deg]" />
      <FaSeedling className="hidden lg:block absolute bottom-40 right-50 text-4xl text-primary-200/60 rotate-[5deg]" />

      <div className="relative z-10 max-w-xl w-full">
        {/* Illustration */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 w-64 h-52 sm:w-72 sm:h-60 bg-primary-100/50 rounded-4xl blur-2xl" />
            <div className="relative w-64 h-52 sm:w-72 sm:h-60">
              <div className="absolute inset-x-0 top-4 mx-auto w-52 h-40 sm:w-60 sm:h-44 bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 flex items-center justify-center overflow-hidden">
                <FaCartShopping className="relative text-6xl sm:text-7xl text-primary-400/80" />
              </div>

              {/* 404 badge */}
              <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-white shadow-lg" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/40">
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      404
                    </span>
                  </div>
                </div>
              </div>

              {/* Ground shadow dots/line */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-400" />
                <div className="w-8 h-4 border-b-[3px] border-primary-400 rounded-b-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Oops! Nothing Here
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
            Looks like this page went out of stock! Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-1"
          >
            <FaHouse className="group-hover:scale-110 transition-transform duration-300" />
            Go to Homepage
          </Link>
          <GoBackButton />
        </div>

        {/* Popular destinations */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {Links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  link.primary
                    ? "bg-primary-50 text-primary-700 hover:bg-primary-100"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
