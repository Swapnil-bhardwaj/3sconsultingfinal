import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "919831800143";
  const defaultMessage = encodeURIComponent(
    "Hello 3Sconsulting, I would like to enquire about your Safety, Security, ISO Certification & ESG Consulting services."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Optional Welcome Tooltip */}
      {showTooltip && (
        <div className="relative hidden rounded-2xl border border-teal-100 bg-white p-4 shadow-lift sm:block max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-ink-400 hover:text-ink-700"
            aria-label="Close message"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <p className="text-xs font-bold text-ink-950">Chat with P.V Sharma</p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-600">
            Have questions about ISO readiness, audits, or NEBOSH study materials? Get direct support on WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-block rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700"
          >
            Start Chat →
          </a>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat on WhatsApp with 3Sconsulting"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-400/40"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="h-7 w-7 transition-transform group-hover:scale-105" />
      </a>
    </div>
  );
}
