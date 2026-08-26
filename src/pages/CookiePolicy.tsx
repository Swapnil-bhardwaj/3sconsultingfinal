import LegalPage from "./LegalPage";

export default function CookiePolicy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      intro="How 3Sconsulting uses cookies and similar technologies on this website."
      sections={[
        { heading: "What Are Cookies", body: "Cookies are small text files placed on your device to help websites function and to provide analytical information to site owners." },
        { heading: "How We Use Cookies", body: "We use essential cookies to ensure the website functions correctly, and analytics cookies to understand how visitors use our site so we can improve it over time." },
        { heading: "Managing Cookies", body: "Most browsers allow you to control cookies through their settings. Please note that disabling certain cookies may affect the functionality of this website." },
        { heading: "Contact", body: "For questions about our use of cookies, please contact us at enquiries@3sconsulting.com." },
      ]}
    />
  );
}
