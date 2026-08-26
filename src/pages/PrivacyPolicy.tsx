import LegalPage from "./LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="How 3Sconsulting collects, uses and protects your personal information."
      sections={[
        { heading: "Information We Collect", body: "We collect information you provide directly to us, such as when you complete our contact form, subscribe to updates, or engage our consulting services, including your name, organisation, contact details and any information you choose to share about your enquiry." },
        { heading: "How We Use Your Information", body: "We use your information to respond to enquiries, deliver our services, communicate updates you have opted into, and improve our website and services. We do not sell personal information to third parties." },
        { heading: "Data Retention", body: "We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, including legal, accounting or reporting requirements." },
        { heading: "Your Rights", body: "You have the right to access, correct or request deletion of your personal information. To exercise these rights, please contact us at enquiries@3sconsulting.com." },
        { heading: "Contact", body: "If you have questions about this Privacy Policy, please contact us at enquiries@3sconsulting.com or write to our registered office at Prem Kuteer, VPO – SHivala Kalan, Distt. – Bijnor (U.P.) – 246734." },
      ]}
    />
  );
}
