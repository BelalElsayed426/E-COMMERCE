import PageHeader from "../_components/PageHeader/PageHeader";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "2. Account Registration",
    content:
      "To use certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and update it as needed.",
  },
  {
    title: "3. Orders and Payments",
    content:
      "When you place an order on FreshCart, you agree to pay the listed price plus any applicable shipping fees and taxes. We reserve the right to cancel orders at our discretion.",
  },
  {
    title: "4. Product Information",
    content:
      "We strive to provide accurate product descriptions and pricing. However, we do not guarantee that product descriptions or prices are error-free. We reserve the right to correct any errors.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All content on FreshCart, including text, graphics, logos, and software, is the property of FreshCart or its content suppliers and protected by intellectual property laws.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "FreshCart shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use our services.",
  },
  {
    title: "7. Changes to Terms",
    content:
      "We reserve the right to modify these terms at any time. Continued use of FreshCart after changes constitutes your acceptance of the new terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        icon="FaFileContract"
        title="Terms of Service"
        description="Please read these terms carefully"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
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
