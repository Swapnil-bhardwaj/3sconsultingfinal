import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import Logo from "./Logo";
import Button from "../ui/Button";
import Container from "../ui/Container";
import MobileNav from "./MobileNav";
import { primaryNav, servicesMegaMenu } from "../../data/navigation";
import { cn } from "../../utils/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const openServices = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-teal-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-ink-200 shadow-soft"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <Container className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-[68px]" : "h-[84px]")}>
          <Link to="/" aria-label="3Sconsulting home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) =>
              item.label === "Services" ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((v) => !v)}
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-[14.5px] font-medium text-ink-800 transition-colors hover:text-teal-800"
                  >
                    Services
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
                  </button>

                  {servicesOpen && (
                    <div
                      className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3"
                      onMouseEnter={openServices}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="grid grid-cols-3 gap-6 rounded-2xl border border-ink-200 bg-white p-7 shadow-lift">
                        {servicesMegaMenu.map((col) => (
                          <div key={col.title}>
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-teal-700">
                              {col.title}
                            </p>
                            <ul className="space-y-2.5">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    to={link.to}
                                    className="text-[13.5px] leading-snug text-ink-700 transition-colors hover:text-teal-800"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between rounded-b-2xl border border-t-0 border-ink-200 bg-teal-50 px-7 py-4">
                        <p className="text-[13px] text-ink-700">Not sure where to start?</p>
                        <Link to="/services" className="text-[13px] font-semibold text-teal-800 hover:text-teal-900">
                          View all services →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors",
                      isActive ? "text-teal-800" : "text-ink-800 hover:text-teal-800"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden lg:block">
            <Button to="/contact" size="sm">
              Discuss Your Requirements
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
