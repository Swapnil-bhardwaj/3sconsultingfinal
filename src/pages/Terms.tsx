import LegalPage from "./LegalPage";

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      intro="The terms governing your use of the 3Sconsulting website."
      sections={[
        { heading: "Acceptance of Terms", body: "By accessing this website, you agree to be bound by these Terms of Use and all applicable laws and regulations." },
        { heading: "Use of Content", body: "Content on this website is provided for general informational purposes only and does not constitute formal consulting advice. Please contact us directly for advice specific to your organisation." },
        { heading: "Intellectual Property", body: "All content, branding and materials on this website are the property of 3Sconsulting Ltd and may not be reproduced without prior written consent." },
        { heading: "Limitation of Liability", body: "3Sconsulting shall not be liable for any damages arising from the use of, or inability to use, this website or its content." },
        { heading: "Contact", body: "Questions regarding these Terms should be directed to enquiries@3sconsulting.com." },
      ]}
    />
  );
}
