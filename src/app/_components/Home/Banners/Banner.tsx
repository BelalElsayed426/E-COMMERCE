"use client";
import { Badge } from "@/components/ui/badge";
import { BannersProps } from "@/interfaces/Banner.interface";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Banner({
  banners = [
    {
      emoji: "🔥",
      badge: "Deal of the Day",
      title: "Fresh Organic Fruits",
      description: "Get up to 40% off on selected organic fruits",
      discount: "40% OFF",
      code: "ORGANIC40",
      buttonText: "Shop Now",
      href: "/products",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-emerald-700",
      textColor: "text-emerald-600",
    },
    {
      emoji: "✨",
      badge: "New Arrivals",
      title: "Exotic Vegetables",
      description: "Discover our latest collection of premium vegetables",
      discount: "25% OFF",
      code: "FRESH25",
      buttonText: "Explore Now",
      href: "/products?sort=newest",
      gradientFrom: "from-orange-400",
      gradientTo: "to-rose-500",
      textColor: "text-orange-500",
    },
  ],
}: BannersProps) {
  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {banners.map((banner, index) => {
            const direction = index === 0 ? -50 : 50;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: direction }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${banner.gradientFrom} ${banner.gradientTo} p-8 text-white`}
              >
                {/* background circle */}
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-white/10 -translate-x-1/2 translate-y-1/2" />
                {/* content */}
                <div className="relative z-10 flex flex-col gap-2">
                  <Badge className="mb-2 bg-white/20 text-sm">
                    <span>{banner.emoji}</span>
                    <span>{banner.badge}</span>
                  </Badge>
                  <h3 className="text-2xl font-bold md:text-3xl">
                    {banner.title}
                  </h3>
                  <p className="mb-2 text-white/80">{banner.description}</p>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="text-3xl font-bold">{banner.discount}</div>
                    <div className="text-sm text-white/70">
                      Use code:{" "}
                      <span className="font-bold text-white">
                        {banner.code}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href={banner.href}
                  className={`inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold ${banner.textColor} transition-colors hover:bg-gray-100`}
                >
                  {banner.buttonText}
                  <FaArrowRight />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
