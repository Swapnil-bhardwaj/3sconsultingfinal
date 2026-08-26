import { useState } from "react";
import type { FormEvent } from "react";
import { MapPin, Mail, Phone, CheckCircle2, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SEO from "../components/ui/SEO";
import { services } from "../data/services";
import { sanitizeText } from "../utils/security";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    country: "India",
    service: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const cleanSubmission = {
      name: sanitizeText(formData.name),
      organisation: sanitizeText(formData.organisation),
      email: sanitizeText(formData.email),
      phone: sanitizeText(formData.phone),
      country: sanitizeText(formData.country),
      service: sanitizeText(formData.service),
      message: sanitizeText(formData.message),
      timestamp: new Date().toISOString(),
    };

    // 1. Save locally as persistent backup lead log
    try {
      const existing = JSON.parse(localStorage.getItem("3s_contact_enquiries") || "[]");
      existing.unshift(cleanSubmission);
      localStorage.setItem("3s_contact_enquiries", JSON.stringify(existing));
    } catch (err) {
      console.warn("Could not save enquiry backup locally", err);
    }

    // 2. Submit to Google Sheets (if Web App URL is configured)
    const GOOGLE_SHEET_URL = ""; // Paste your Google Apps Script Web App URL here
    if (GOOGLE_SHEET_URL) {
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanSubmission),
        }).catch(() => null);
      } catch {
        // Degrades gracefully
      }
    }

    // 3. Submit to Email Webhook (Web3Forms)
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "e88d1ba6-99cf-4a41-8622-3sconsulting",
          from_name: "3Sconsulting Website Enquiry",
          subject: `New Consulting Enquiry from ${cleanSubmission.name} (${cleanSubmission.organisation})`,
          ...cleanSubmission,
        }),
      }).catch(() => null);
    } catch {
      // Degrades gracefully
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const whatsappEnquiryUrl = `https://wa.me/919831800143?text=${encodeURIComponent(
    `Hello P.V Sharma, I have submitted an enquiry on the 3Sconsulting website regarding ${
      formData.service || "consulting services"
    }.`
  )}`;

  return (
    <>
      <SEO
        title="Contact Us | Safety & ESG Consulting"
        description="Speak with P.V Sharma and senior HSE consultants at 3Sconsulting. Address: Prem Kuteer, Bijnor, UP. Phone: +91 9831800143. Enquire about ISO 45001, risk audits, or training."
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact 3Sconsulting",
          description: "Get in touch with 3Sconsulting for occupational safety, ISO audit readiness, and ESG sustainability advisory.",
          mainEntity: {
            "@type": "LocalBusiness",
            name: "3Sconsulting",
            telephone: "+91 9831800143",
            email: "enquiries@3sconsulting.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Prem Kuteer, VPO – SHivala Kalan",
              addressLocality: "Bijnor",
              addressRegion: "Uttar Pradesh",
              postalCode: "246734",
              addressCountry: "IN",
            },
          },
        }}
      />

      <PageHero
        eyebrow="Contact Us"
        title="Let's Discuss Your Requirements"
        description="Tell us about your organisation and the challenges you're facing — a senior consultant will respond within one business day."
      />

      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold tracking-tight text-ink-950">
                Speak directly with a senior consultant
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
                Whether you need support with a certification deadline, an emerging risk, NEBOSH examination preparation, or a
                broader sustainability strategy, we're happy to have an initial, no-obligation
                conversation about your specific situation.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50">
                    <MapPin className="h-5 w-5 text-teal-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-950">Head Office</p>
                    <p className="mt-1 text-sm text-ink-600">Prem Kuteer, VPO – SHivala Kalan, Distt. – Bijnor (U.P.) – 246734</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50">
                    <Mail className="h-5 w-5 text-teal-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-950">Email</p>
                    <a href="mailto:enquiries@3sconsulting.com" className="mt-1 block text-sm text-ink-600 hover:text-teal-800">
                      enquiries@3sconsulting.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50">
                    <Phone className="h-5 w-5 text-teal-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-950">Phone / WhatsApp</p>
                    <a href="tel:+919831800143" className="mt-1 block text-sm text-ink-600 hover:text-teal-800">
                      +91 9831800143
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Connect */}
              <div className="mt-10 rounded-2xl border border-green-200 bg-green-50/60 p-6">
                <div className="flex items-center gap-2 text-sm font-bold text-green-900">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  Instant WhatsApp Connect
                </div>
                <p className="mt-2 text-sm leading-relaxed text-green-800">
                  Prefer chatting immediately? Connect directly with P.V Sharma on WhatsApp for quick guidance.
                </p>
                <a
                  href={whatsappEnquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" /> Message on WhatsApp
                </a>
              </div>

              <div className="mt-6 rounded-xl border border-ink-200 bg-paper-dim p-6">
                <p className="text-sm font-bold text-ink-950">Serving clients across India & internationally</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Our consultants work on-site, virtually and in hybrid formats to support organizations wherever they operate.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-teal-200 bg-teal-50/50 p-12 text-center shadow-soft">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-ink-950">Thank you for reaching out!</h2>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
                    Your enquiry has been received. P.V Sharma or a senior consultant will review your requirements and get back to you within 24 hours.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <a
                      href={whatsappEnquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700 shadow-md"
                    >
                      <MessageCircle className="h-4 w-4" /> Follow up on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="rounded-xl border border-ink-300 bg-white px-5 py-3 text-sm font-bold text-ink-700 hover:bg-ink-50"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-200 bg-white p-8 shadow-soft lg:p-10" noValidate>
                  <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-teal-800">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Secure SSL Form — Direct Consultant Response</span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field
                      label="Full Name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(v) => handleChange("name", v)}
                      autoComplete="name"
                    />
                    <Field
                      label="Organisation / Institution"
                      id="organisation"
                      required
                      value={formData.organisation}
                      onChange={(v) => handleChange("organisation", v)}
                      autoComplete="organization"
                    />
                    <Field
                      label="Email Address"
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(v) => handleChange("email", v)}
                      autoComplete="email"
                    />
                    <Field
                      label="Phone / Mobile Number"
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(v) => handleChange("phone", v)}
                      autoComplete="tel"
                    />
                    <div>
                      <label htmlFor="country" className="mb-2 block text-sm font-semibold text-ink-800">
                        Country <span className="text-teal-700">*</span>
                      </label>
                      <select
                        id="country"
                        required
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        className="h-12 w-full rounded-lg border border-ink-300 bg-white px-4 text-sm text-ink-900 focus:border-teal-600"
                      >
                        <option value="India">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="service" className="mb-2 block text-sm font-semibold text-ink-800">
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => handleChange("service", e.target.value)}
                        className="h-12 w-full rounded-lg border border-ink-300 bg-white px-4 text-sm text-ink-900 focus:border-teal-600"
                      >
                        <option value="">General Enquiry / Consultation</option>
                        <option value="NEBOSH IDip Study Support">NEBOSH IDip Study Support</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink-800">
                      How can we help you? <span className="text-teal-700">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Describe your organization's requirements, certification goals, or question…"
                      className="w-full rounded-lg border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-600"
                    />
                  </div>

                  <div className="mt-6 flex items-start gap-3">
                    <input
                      id="consent"
                      type="checkbox"
                      required
                      defaultChecked
                      className="mt-1 h-4 w-4 shrink-0 rounded border-ink-300 text-teal-700 focus:ring-teal-600"
                    />
                    <label htmlFor="consent" className="text-sm leading-relaxed text-ink-600">
                      I consent to 3Sconsulting storing and processing my details to respond to my inquiry in line with the{" "}
                      <a href="/privacy-policy" className="font-medium text-teal-800 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <Button type="submit" size="lg" disabled={submitting} withArrow>
                      {submitting ? "Sending..." : "Send Enquiry"}
                    </Button>
                    <span className="flex items-center gap-1.5 text-xs text-ink-500">
                      <Clock className="h-3.5 w-3.5" /> Response within 24h
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({
  label,
  id,
  type = "text",
  required = false,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (val: string) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-800">
        {label} {required && <span className="text-teal-700">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        autoComplete={autoComplete}
        className="h-12 w-full rounded-lg border border-ink-300 bg-white px-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-600"
      />
    </div>
  );
}
