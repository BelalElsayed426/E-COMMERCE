export interface Feature {
  icon: string;
  title: string;
  description: string;
  iconBgColor?: string;
  iconColor?: string;
}
export interface FeaturesBarProps {
  features?: Feature[];
  bgColor?: string;
  borderColor?: string;
  iconBgColor?: string;
  iconColor?: string;
  cardStyle?: boolean;
}
