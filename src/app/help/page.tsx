import PageHeader from "../_components/PageHeader/PageHeader";
import {
  FaCircleQuestion,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaTruck,
  FaRotateLeft,
  FaCreditCard,
  FaShieldHalved,
} from "react-icons/fa6";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our products, add items to your cart, and proceed to checkout. You can pay online with a credit/debit card or choose cash on delivery.",
    icon: FaCreditCard,
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, and cash on delivery for eligible orders.",
    icon: FaCreditCard,
  },
  {
    question: "How can I track my order?",
    answer:
      "After placing your order, you can track its status from your Order History page in your profile.",
    icon: FaTruck,
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 14-day return policy for most items. Products must be in original condition and packaging.",
    icon: FaRotateLeft,
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, all transactions are encrypted and processed through secure payment gateways. We never store your card details.",
    icon: FaShieldHalved,
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3-5 business days. Express delivery is available for select areas within 24 hours.",
    icon: FaTruck,
  },
];

export default function HelpPage() {
  return (
    <>
      <PageHeader
        icon="FaCircleQuestion"
        title="Help Center"
        description="Find answers to your questions"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Center" },
        ]}
        gradientClass="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
      />

      <div className="container mx-auto px-4 py-12">
        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const Icon = faq.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Info */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Still Need Help?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
              <p className="text-sm text-gray-500">support@freshcart.com</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
              <p className="text-sm text-gray-500">+1 (800) 123-4567</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <FaLocationDot className="text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
              <p className="text-sm text-gray-500">123 Market St, Cairo</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
