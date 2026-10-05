export interface PageHeaderProps {
  icon?: string;
  image?: string;
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  gradientClass?: string;
}

interface Breadcrumb {
  label: string;
  href?: string;
}
