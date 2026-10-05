import type { Metadata } from "next";
import { Exo } from "next/font/google";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import Providers from "./_components/Providers/Providers";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./globals.css";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart - Online Grocery & Shopping",
  description:
    "Your one-stop shop for fresh groceries, household essentials, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo.className} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
