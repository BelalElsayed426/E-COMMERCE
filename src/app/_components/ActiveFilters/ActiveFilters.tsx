import { ActiveFiltersProps } from "@/interfaces/ActiveFilters.interface";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFilter, FaLayerGroup, FaTags, FaXmark } from "react-icons/fa6";

const iconMap: Record<string, IconType> = {
  FaLayerGroup: FaLayerGroup,
  FaTags: FaTags,
};
export default function ActiveFilters({
  filters,
  clearAllHref,
}: ActiveFiltersProps) {
  if (filters.length === 0) {
    return null;
  }
  return (
    <div className="mb-6 flex items-center flex-wrap gap-3">
      <span className="flex items-center gap-2 text-sm text-gray-600">
        <FaFilter className="text-xs" />
        Active Filters:
      </span>
      {filters.map((filter) => {
        const Icon = iconMap[filter.icon];
        return (
          <Link
            key={filter.key}
            href={filter.removeHref}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-sm font-medium text-primary-700 hover:bg-primary-200 transition-colors"
          >
            {Icon && <Icon className="text-xs" />}
            {filter.label}
            <FaXmark className="text-xs" />
          </Link>
        );
      })}
      <Link
        href={clearAllHref}
        className="underline text-sm text-gray-500 hover:text-gray-700"
      >
        Clear All
      </Link>
    </div>
  );
}
