import PageHeader from "../_components/PageHeader/PageHeader";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly, such as your name, email address, phone number, and shipping address when you create an account or place an order.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use your information to process orders, communicate with you, improve our services, and send promotional content if you have opted in to receive marketing communications.",
  },
  {
    title: "3. Data Security",
    content:
      "We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology.",
  },
  {
    title: "4. Third-Party Services",
    content:
      "We may share your information with trusted third-party services for payment processing, delivery, and analytics. These parties are contractually obligated to protect your data.",
  },
  {
    title: "5. Your Rights",
    content:
      "You have the right to access, correct, or delete your personal information at any time. You can manage your preferences in your account settings or by contacting our support team.",
  },
  {
    title: "6. Data Retention",
    content:
      "We retain your personal information for as long as your account is active or as needed to provide you with our services, comply with legal obligations, and resolve disputes.",
  },
  {
    title: "7. Updates to This Policy",
    content:
      "We may update this policy from time to time. We will notify you of any significant changes via email or through a notice on our website.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        icon="FaShieldHalved"
        title="Privacy Policy"
        description="How we collect, use, and protect your data"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
        gradientClass="bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: October 1, 2026
            </p>
            <div className="space-y-8">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
