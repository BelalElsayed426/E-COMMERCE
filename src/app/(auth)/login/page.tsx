"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTruck,
  FaShieldHalved,
  FaClock,
  FaUsers,
  FaStar,
  FaSpinner,
} from "react-icons/fa6";
import { FaGoogle, FaFacebook } from "react-icons/fa6";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left - Illustration */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <img
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              alt="Fresh vegetables and fruits shopping"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2e5810ff3e-e750761ebcd4ae5907db.png"
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaTruck className="text-primary-600 mr-2" />
                  Free Delivery
                </div>
                <div className="flex items-center">
                  <FaShieldHalved className="text-primary-600 mr-2" />
                  Secure Payment
                </div>
                <div className="flex items-center">
                  <FaClock className="text-primary-600 mr-2" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  Fresh<span className="text-gray-800">Cart</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <FaGoogle className="text-red-500 text-lg" />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <FaFacebook className="text-blue-600 text-lg" />
                <span className="font-medium text-gray-700">
                  Continue with Facebook
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                  />
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                  />
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Keep me signed in
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <FaSpinner className="animate-spin inline-block" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                New to FreshCart?
                <Link
                  href="/register"
                  className="text-primary-600 hover:text-primary-700 ms-2 font-semibold"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
              <div className="flex items-center">
                <FaLock className="mr-1" />
                SSL Secured
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-1" />
                50K+ Users
              </div>
              <div className="flex items-center">
                <FaStar className="mr-1" />
                4.9 Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
