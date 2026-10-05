interface Banner {
  emoji: string;
  badge: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  buttonText: string;
  href: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
}

export interface BannersProps {
  banners?: Banner[];
}
