import { Fragment } from "react";
import { PageHeaderProps } from "@/interfaces/PageHeader.interface";
import {
  FaBoxOpen,
  FaCartShopping,
  FaHeart,
  FaLayerGroup,
  FaTags,
  FaCreditCard,
  FaUser,
  FaClockRotateLeft,
  FaCircleInfo,
  FaEnvelope,
  FaBolt,
  FaFileContract,
  FaShieldHalved,
  FaCookieBite,
  FaCircleQuestion,
  FaTruck,
  FaRotateLeft,
  FaLocationDot,
  FaKey,
} from "react-icons/fa6";
import { IconType } from "react-icons";
import Link from "next/link";
import Image from "next/image";

const iconMap: Record<string, IconType> = {
  FaBoxOpen: FaBoxOpen,
  FaTags: FaTags,
  FaLayerGroup: FaLayerGroup,
  FaHeart: FaHeart,
  FaCartShopping: FaCartShopping,
  FaCreditCard: FaCreditCard,
  FaUser: FaUser,
  FaClockRotateLeft: FaClockRotateLeft,
  FaCircleInfo: FaCircleInfo,
  FaEnvelope: FaEnvelope,
  FaBolt: FaBolt,
  FaFileContract: FaFileContract,
  FaShieldHalved: FaShieldHalved,
  FaCookieBite: FaCookieBite,
  FaCircleQuestion: FaCircleQuestion,
  FaTruck: FaTruck,
  FaRotateLeft: FaRotateLeft,
  FaLocationDot: FaLocationDot,
  FaKey: FaKey,
};
export default function PageHeader({
  icon,
  image,
  title,
  description,
  breadcrumbs,
  gradientClass,
}: PageHeaderProps) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div className={`${gradientClass} text-white`}>
      <div className="container mx-auto px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Fragment key={index}>
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
                {!isLast && <span className="text-white/40">/</span>}
              </Fragment>
            );
          })}
        </nav>
        {/* Title and description */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            ) : (
              Icon && <Icon className="text-3xl" />
            )}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-white/80 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
