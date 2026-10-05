"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaKey,
  FaLock,
  FaShieldHalved,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa6";

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

export default function VerifyCodePage() {
  const [resetCode, setResetCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      });
      const data = await res.json();

      if (data.status === "Success") {
        router.push("/reset-password");
      } else {
        setError(data.message || "Invalid or expired reset code.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left - Illustration */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="w-full h-96 bg-gradient-to-br from-primary-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-primary-100/50"></div>
              <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50"></div>
              <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50"></div>
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <FaKey className="text-primary-600 text-4xl" />
                  </div>
                </div>
                <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
                  <FaEnvelope className="text-primary-500 text-xl" />
                </div>
                <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
                  <FaShieldHalved className="text-green-500 text-xl" />
                </div>
                <div className="flex gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse [animation-delay:150ms]"></div>
                  <div className="w-3 h-3 rounded-full bg-primary-600 animate-pulse [animation-delay:300ms]"></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Verify Your Identity
              </h2>
              <p className="text-lg text-gray-600">
                We&apos;ve sent a verification code to your email. Enter it
                below to continue resetting your password.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaEnvelope className="text-primary-600 mr-2" />
                  Check Email
                </div>
                <div className="flex items-center">
                  <FaShieldHalved className="text-primary-600 mr-2" />
                  Secure Code
                </div>
                <div className="flex items-center">
                  <FaLock className="text-primary-600 mr-2" />
                  Encrypted
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
                Enter Verification Code
              </h1>
              <p className="text-gray-600">
                Check your email for the reset code
              </p>
            </div>

            {/* Step Indicators - Step 2 active */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-primary-600 text-white">
                  <FaEnvelope className="text-xs" />
                </div>
                <div className="w-16 h-0.5 mx-2 bg-primary-600"></div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-primary-600 text-white ring-4 ring-primary-100">
                  <FaKey className="text-xs" />
                </div>
                <div className="w-16 h-0.5 mx-2 bg-gray-200"></div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gray-100 text-gray-400">
                  <FaLock className="text-xs" />
                </div>
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
                  htmlFor="resetCode"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Reset Code
                </label>
                <div className="relative">
                  <input
                    id="resetCode"
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="Enter the code from your email"
                    required
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all text-center text-lg tracking-widest"
                  />
                  <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <FaSpinner className="animate-spin inline-block" />
                ) : (
                  "Verify Code"
                )}
              </button>

              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  <FaArrowLeft className="text-xs" />
                  Didn&apos;t receive a code? Resend
                </Link>
              </div>
            </form>

            {/* Bottom Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
