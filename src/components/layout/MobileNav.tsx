import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import Button from "../ui/Button";
import { primaryNav, servicesMegaMenu } from "../../data/navigation";
import { cn } from "../../utils/cn";

export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      panelRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-ink-950/50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        tabIndex={-1}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-lift transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="space-y-1">
            {primaryNav.map((item) =>
              item.label === "Services" ? (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setServicesExpanded((v) => !v)}
                    aria-expanded={servicesExpanded}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink-900 hover:bg-ink-100"
                  >
                    Services
                    <ChevronDown className={cn("h-4 w-4 transition-transform", servicesExpanded && "rotate-180")} />
                  </button>
                  {servicesExpanded && (
                    <div className="mb-2 space-y-4 rounded-xl bg-paper-dim px-4 py-4">
                      {servicesMegaMenu.map((col) => (
                        <div key={col.title}>
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-teal-700">
                            {col.title}
                          </p>
                          <ul className="space-y-2">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <Link to={link.to} onClick={onClose} className="text-sm text-ink-700 hover:text-teal-800">
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-xl px-3 py-3 text-base font-medium",
                        isActive ? "bg-teal-50 text-teal-800" : "text-ink-900 hover:bg-ink-100"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="border-t border-ink-200 p-5">
          <Button to="/contact" onClick={onClose} className="w-full">
            Discuss Your Requirements
          </Button>
        </div>
      </div>
    </div>
  );
}
