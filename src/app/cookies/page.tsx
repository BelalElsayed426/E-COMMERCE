import PageHeader from "../_components/PageHeader/PageHeader";

const sections = [
  {
    title: "1. What Are Cookies?",
    content:
      "Cookies are small text files stored on your device when you visit our website. They help us provide a better browsing experience by remembering your preferences and understanding how you use our site.",
  },
  {
    title: "2. Types of Cookies We Use",
    content:
      "We use essential cookies for basic site functionality, performance cookies to understand usage patterns, functionality cookies to remember your preferences, and targeting cookies for relevant ads.",
  },
  {
    title: "3. Essential Cookies",
    content:
      "These cookies are necessary for the website to function properly. They enable core features such as security, network management, and accessibility. You cannot disable these cookies.",
  },
  {
    title: "4. Analytics Cookies",
    content:
      "We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and user experience. All data collected is anonymised.",
  },
  {
    title: "5. Managing Cookies",
    content:
      "Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete cookies that have already been set. Note that disabling certain cookies may affect site functionality.",
  },
  {
    title: "6. Changes to This Policy",
    content:
      "We may update this Cookie Policy from time to time. Any changes will be posted on this page with a revised effective date.",
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        icon="FaCookieBite"
        title="Cookie Policy"
        description="How we use cookies on our website"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cookie Policy" },
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
