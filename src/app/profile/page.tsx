"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import PageHeader from "../_components/PageHeader/PageHeader";
import EmptyState from "../_components/EmptyState/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaClockRotateLeft,
  FaPen,
} from "react-icons/fa6";

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

export default function ProfilePage() {
  const { isAuthenticated, token, user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [profileMsg, setProfileMsg] = useState({ text: "", type: "" });
  const [profileLoading, setProfileLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ text: "", type: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader
          icon="FaUser"
          title="My Profile"
          description="Manage your account settings"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Profile" },
          ]}
          gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
        />
        <div className="container mx-auto px-4 py-8">
          <EmptyState
            icon="FaBoxOpen"
            title="Please Sign In"
            description="You need to be signed in to view your profile."
            actionLabel="Sign In"
            actionHref="/login"
          />
        </div>
      </>
    );
  }

  async function handleProfileUpdate(e: FormEvent) {
    e.preventDefault();
    setProfileMsg({ text: "", type: "" });
    setProfileLoading(true);

    try {
      const res = await fetch(`${API_BASE}/users/updateMe/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: token! },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setProfileMsg({ text: "Profile updated successfully!", type: "success" });
      } else {
        setProfileMsg({ text: data.message || "Failed to update profile.", type: "error" });
      }
    } catch {
      setProfileMsg({ text: "Network error. Please try again.", type: "error" });
    }
    setProfileLoading(false);
  }

  async function handlePasswordChange(e: FormEvent) {
    e.preventDefault();
    setPasswordMsg({ text: "", type: "" });

    if (newPassword !== rePassword) {
      setPasswordMsg({ text: "Passwords do not match.", type: "error" });
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch(`${API_BASE}/users/changeMyPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: token! },
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
          rePassword,
        }),
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setCurrentPassword("");
        setNewPassword("");
        setRePassword("");
        setPasswordMsg({ text: "Password changed successfully!", type: "success" });
      } else {
        setPasswordMsg({ text: data.message || "Failed to change password.", type: "error" });
      }
    } catch {
      setPasswordMsg({ text: "Network error. Please try again.", type: "error" });
    }
    setPasswordLoading(false);
  }

  return (
    <>
      <PageHeader
        icon="FaUser"
        title="My Profile"
        description="Manage your account settings"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Profile" },
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <FaUser className="text-3xl text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {user?.name}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <div className="border-t border-gray-100 mt-6 pt-6 space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-primary-50 text-primary-600 font-medium text-sm"
                >
                  <FaPen className="text-xs" />
                  Edit Profile
                </Link>
                <Link
                  href="/profile/orders"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                >
                  <FaClockRotateLeft className="text-xs" />
                  Order History
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <FaUser className="text-primary-600" />
                Personal Information
              </h2>

              {profileMsg.text && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm border ${
                    profileMsg.type === "success"
                      ? "bg-green-50 border-green-200 text-green-600"
                      : "bg-red-50 border-red-200 text-red-600"
                  }`}
                >
                  {profileMsg.text}
                </div>
              )}

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profileEmail"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="profileEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={profileLoading}
                  className="w-full h-12 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {profileLoading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <FaLock className="text-primary-600" />
                Change Password
              </h2>

              {passwordMsg.text && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm border ${
                    passwordMsg.type === "success"
                      ? "bg-green-50 border-green-200 text-green-600"
                      : "bg-red-50 border-red-200 text-red-600"
                  }`}
                >
                  {passwordMsg.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="currentPassword"
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-12 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showCurrent ? (
                        <FaEyeSlash className="text-sm" />
                      ) : (
                        <FaEye className="text-sm" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="newPasswordChange"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="newPasswordChange"
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-12 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNew ? (
                        <FaEyeSlash className="text-sm" />
                      ) : (
                        <FaEye className="text-sm" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="rePassword"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="rePassword"
                      type="password"
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      placeholder="Re-enter new password"
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-700 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full h-12 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {passwordLoading ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
