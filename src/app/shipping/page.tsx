import PageHeader from "../_components/PageHeader/PageHeader";
import { FaTruck, FaBox, FaClock, FaLocationDot } from "react-icons/fa6";

const shippingInfo = [
  {
    icon: FaTruck,
    title: "Standard Delivery",
    description: "3-5 business days",
    detail: "Free on orders over 500 EGP",
  },
  {
    icon: FaClock,
    title: "Express Delivery",
    description: "1-2 business days",
    detail: "Available in select areas",
  },
  {
    icon: FaBox,
    title: "Order Processing",
    description: "Orders are processed within 24 hours",
    detail: "Monday to Saturday",
  },
  {
    icon: FaLocationDot,
    title: "Delivery Areas",
    description: "We deliver across Egypt",
    detail: "All major cities covered",
  },
];

export default function ShippingPage() {
  return (
    <>
      <PageHeader
        icon="FaTruck"
        title="Shipping Information"
        description="Everything you need to know about delivery"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shipping Info" },
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {shippingInfo.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Icon className="text-xl text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-1">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-400">{item.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Shipping Policy
            </h2>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                At FreshCart, we strive to deliver your orders as quickly and
                safely as possible. All orders are carefully packed to ensure
                your products arrive in perfect condition.
              </p>
              <p>
                Standard shipping is free on all orders over 500 EGP. For orders
                below this amount, a flat shipping fee of 50 EGP applies.
              </p>
              <p>
                Express delivery is available in Cairo, Alexandria, and Giza for
                an additional fee. Orders placed before 2:00 PM are processed on
                the same day.
              </p>
              <p>
                You will receive a confirmation email with tracking details once
                your order has been shipped. You can also track your order
                through your account dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
