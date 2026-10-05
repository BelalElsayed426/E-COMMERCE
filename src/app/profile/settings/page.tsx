"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import PageHeader from "../../_components/PageHeader/PageHeader";
import EmptyState from "../../_components/EmptyState/EmptyState";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaLocationDot,
  FaGear,
  FaChevronRight,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
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

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

export default function SettingsPage() {
  const { isAuthenticated, token, user } = useAuth();
  const pathname = usePathname();

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
            description="You need to be signed in to view your settings."
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
          <main className="flex-1 space-y-6">
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

                <button
                  type="submit"
                  disabled={profileLoading}
                  className="w-full h-12 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {profileLoading ? "Updating..." : "Update Profile"}
                </button>
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full h-12 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {passwordLoading ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
