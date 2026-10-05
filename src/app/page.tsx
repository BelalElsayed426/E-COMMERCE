import HeroSlider from "./_components/Home/HeroSlider/HeroSlider";
import FeaturesBar from "./_components/Home/FeaturesBar/FeaturesBar";
import FeaturedCategories from "./_components/Home/FeaturedCategories/FeaturedCategories";
import Banner from "./_components/Home/Banners/Banner";
import FeaturedProducts from "./_components/Home/FeaturedProducts/FeaturedProducts";
import Newsletter from "./_components/Home/Newsletter/Newsletter";

export default async function HomePage() {
  return (
    <main>
      <HeroSlider />
      <FeaturesBar
        bgColor="bg-gray-50"
        borderColor="border-transparent"
        cardStyle={true}
        features={[
          {
            icon: "FaTruck",
            title: "Free Shipping",
            description: "On order over 500 EGP",
            iconBgColor: "bg-blue-50",
            iconColor: "text-blue-500",
          },
          {
            icon: "FaShieldHalved",
            title: "Secure Payment",
            description: "100% secure checkout",
            iconBgColor: "bg-emerald-50",
            iconColor: "text-emerald-500",
          },
          {
            icon: "FaArrowRotateLeft",
            title: "Easy Returns",
            description: "14-day return policy",
            iconBgColor: "bg-orange-50",
            iconColor: "text-orange-500",
          },
          {
            icon: "FaHeadset",
            title: "24/7 Support",
            description: "Contact us anytime",
            iconBgColor: "bg-purple-50",
            iconColor: "text-purple-500",
          },
        ]}
      />
      <FeaturedCategories />
      <Banner />
      <FeaturedProducts />
      <Newsletter />
    </main>
  );
}
