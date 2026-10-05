import PageHeader from "../_components/PageHeader/PageHeader";
import { FaRotateLeft, FaCheck, FaXmark, FaBox } from "react-icons/fa6";

const steps = [
  {
    step: "1",
    title: "Request a Return",
    description:
      "Contact our support team or initiate a return from your order history within 14 days of delivery.",
  },
  {
    step: "2",
    title: "Pack the Item",
    description:
      "Place the item in its original packaging with all tags and accessories included.",
  },
  {
    step: "3",
    title: "Ship It Back",
    description:
      "Use the prepaid shipping label we provide or drop the item at a designated location.",
  },
  {
    step: "4",
    title: "Get Your Refund",
    description:
      "Once we receive and inspect the item, your refund will be processed within 5-7 business days.",
  },
];

const eligible = [
  "Unused items in original packaging",
  "Items with all tags still attached",
  "Items returned within 14 days of delivery",
  "Defective or damaged products",
];

const notEligible = [
  "Perishable or consumable goods",
  "Personalised or custom-made items",
  "Items without original packaging",
  "Items returned after 14 days",
];

export default function ReturnsPage() {
  return (
    <>
      <PageHeader
        icon="FaRotateLeft"
        title="Returns & Refunds"
        description="Easy returns for a hassle-free experience"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Returns & Refunds" },
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Process Steps */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How Returns Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {steps.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-primary-600">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Eligibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheck className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  Eligible for Return
                </h3>
              </div>
              <ul className="space-y-2">
                {eligible.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <FaCheck className="text-green-500 text-xs flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <FaXmark className="text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  Not Eligible
                </h3>
              </div>
              <ul className="space-y-2">
                {notEligible.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <FaXmark className="text-red-500 text-xs flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
