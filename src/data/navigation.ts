export interface MegaMenuLink {
  label: string;
  to: string;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

export const servicesMegaMenu: MegaMenuColumn[] = [
  {
    title: "Training",
    links: [
      { label: "HSE & ESG Training", to: "/services/hse-esg-training" },
      { label: "ISO Awareness", to: "/services/hse-esg-training" },
      { label: "ESG Foundation", to: "/services/hse-esg-training" },
      { label: "NEBOSH Prep & Safety Culture", to: "/services/hse-esg-training" },
    ],
  },
  {
    title: "Audit & Readiness",
    links: [
      { label: "Internal Audits", to: "/services/internal-audits-certification-readiness" },
      { label: "ISO 45001 (OH&S)", to: "/services/internal-audits-certification-readiness" },
      { label: "ISO 14001 (Environment)", to: "/services/internal-audits-certification-readiness" },
      { label: "ISO 31000 (Risk Management)", to: "/services/internal-audits-certification-readiness" },
      { label: "ESG Assurance Audits", to: "/services/internal-audits-certification-readiness" },
    ],
  },
  {
    title: "Consulting",
    links: [
      { label: "Risk Management", to: "/services/risk-management" },
      { label: "ESG & Sustainability", to: "/services/esg-sustainability-consulting" },
      { label: "Custom Consulting Projects", to: "/services/custom-consulting-projects" },
      { label: "Sustainable Supply Chain", to: "/services/esg-sustainability-consulting" },
    ],
  },
];

export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "Who We Are", to: "/who-we-are" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Learning Resources", to: "/learning-resources" },
  { label: "Blog", to: "/blog" },
  { label: "Insights", to: "/insights" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Contact Us", to: "/contact" },
];
