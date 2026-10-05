"use client";

import { motion } from "framer-motion";
import { FeaturesBarProps } from "@/interfaces/FeaturesBar.interface";
import {
  FaArrowRotateLeft,
  FaHeadset,
  FaShieldHalved,
  FaTruck,
} from "react-icons/fa6";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  FaTruck: FaTruck,
  FaArrowRotateLeft: FaArrowRotateLeft,
  FaShieldHalved: FaShieldHalved,
  FaHeadset: FaHeadset,
};
export default function FeaturesBar({
  features = [
    {
      icon: "FaTruck",
      title: "Free Shipping",
      description: "On order over 500 EGP",
    },
    {
      icon: "FaArrowRotateLeft",
      title: "Easy Returns",
      description: "14-day return policy",
    },
    {
      icon: "FaShieldHalved",
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      icon: "FaHeadset",
      title: "24/7 Support",
      description: "Contact us anytime",
    },
  ],

  bgColor = "bg-primary-50",
  borderColor = "border-primary-100",
  iconBgColor = "bg-primary-100",
  iconColor = "text-primary-600",
  cardStyle = false,
}: FeaturesBarProps) {
  return (
    <div className={`${bgColor} border-y ${borderColor}`}>
      <div className={`container mx-auto ${cardStyle ? "px-8" : "px-4"} py-6`}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            const currentIconBg = feature.iconBgColor ?? iconBgColor;
            const currentIconColor = feature.iconColor ?? iconColor;
            const animationProps = cardStyle
              ? {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.4, delay: index * 0.1 },
                }
              : {};
            return (
              <motion.div
                key={index}
                {...animationProps}
                className={`flex items-center gap-3 ${cardStyle ? "bg-white p-4 rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-md" : ""}`}
              >
                <div
                  className={`h-12 w-12 shrink-0 ${cardStyle ? "rounded-full" : "rounded-xl"} ${currentIconBg} flex items-center justify-center`}
                >
                  <Icon className={`text-lg ${currentIconColor}`} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                  <p className="text-xs font-semibold text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
