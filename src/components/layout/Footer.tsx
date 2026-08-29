import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import Container from "../ui/Container";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M18.9 3H22l-7.6 8.68L23 21h-6.9l-5.4-6.6L4.5 21H1.4l8.1-9.26L1 3h7.1l4.9 6.06L18.9 3Zm-1.2 16.2h1.7L7.4 4.7H5.6l12.1 14.5Z" />
    </svg>
  );
}

const columns = [
  {
    title: "Company",
    links: [
      { label: "Who We Are", to: "/who-we-are" },
      { label: "Gallery", to: "/gallery" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "HSE & ESG Training", to: "/services/hse-esg-training" },
      { label: "Audits & Certification", to: "/services/internal-audits-certification-readiness" },
      { label: "Risk Management", to: "/services/risk-management" },
      { label: "ESG & Sustainability", to: "/services/esg-sustainability-consulting" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Construction", to: "/industries/construction" },
      { label: "Manufacturing", to: "/industries/manufacturing" },
      { label: "Infrastructure", to: "/industries/infrastructure" },
      { label: "Supply Chain", to: "/industries/supply-chain" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Learning Resources", to: "/learning-resources" },
      { label: "Gallery", to: "/gallery" },
      { label: "Case Studies", to: "/case-studies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-200">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light showTagline />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-300">
              3Sconsulting helps organisations strengthen safety culture, manage enterprise
              risk and build sustainable, resilient business practices.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-ink-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                <span>Prem Kuteer, VPO – SHivala Kalan, Distt. – Bijnor (U.P.) – 246734</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                <a href="mailto:enquiries@3sconsulting.com" className="hover:text-white">
                  enquiries@3sconsulting.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                <a href="tel:+919831800143" className="hover:text-white">
                  +91 9831800143
                </a>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="3Sconsulting on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ink-200 transition-colors hover:border-teal-400 hover:text-white"
              >
                <LinkedinIcon />
              </a>
              <a
                href="#"
                aria-label="3Sconsulting on X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ink-200 transition-colors hover:border-teal-400 hover:text-white"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-ink-300 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} 3Sconsulting Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-white">Cookie Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
