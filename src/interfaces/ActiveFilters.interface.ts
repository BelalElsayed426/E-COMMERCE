export interface ActiveFilter {
  key: string;
  icon: string;
  label: string;
  removeHref: string;
}
export interface ActiveFiltersProps {
  filters: ActiveFilter[];
  clearAllHref: string;
}
