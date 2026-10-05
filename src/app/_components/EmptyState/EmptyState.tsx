import { EmptyStateProps } from "@/interfaces/EmptyState.interface";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaBoxOpen, FaLocationDot } from "react-icons/fa6";

const iconMap: Record<string, IconType> = {
  FaBoxOpen: FaBoxOpen,
  FaLocationDot: FaLocationDot,
};
export default function EmptyState({
  icon = "FaBoxOpen",
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const Icon = iconMap[icon];
  return (
    <div className="text-center py-20 space-y-2">
      <div className="w-20 h-20 mx-auto flex items-center justify-center bg-gray-100 rounded-full mb-3">
        {Icon && <Icon className="text-3xl text-gray-400" />}
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
