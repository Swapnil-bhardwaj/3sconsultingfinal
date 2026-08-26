import Button from "../ui/Button";
import Container from "../ui/Container";
import { ShieldCheck, Radar, Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-teal-50 via-paper to-paper">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(19,84,88,0.08), transparent 40%), radial-gradient(circle at 85% 0%, rgba(76,134,84,0.10), transparent 45%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative grid grid-cols-1 items-center gap-16 py-20 lg:grid-cols-12 lg:py-28">
        <div className="fade-up lg:col-span-7">
          <p className="mb-5 text-sm font-bold tracking-[0.2em] text-teal-700">3SCONSULTING</p>
          <h1 className="max-w-2xl text-[2.5rem] font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl lg:text-[3.4rem]">
            Leading Safety, Security and Sustainability in Business
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            We help organisations across the UK and US strengthen occupational safety, manage
            enterprise and supply chain risk, and build genuinely sustainable, resilient business
            practices — through practical consulting, rigorous auditing and expert-led training.
          </p>
          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <Button to="/contact" size="lg" withArrow>
              Discuss Your Requirements
            </Button>
            <Button to="/services" size="lg" variant="secondary">
              Explore Our Services
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-ink-200 pt-8">
            <div>
              <p className="text-2xl font-bold text-ink-950">15+ yrs</p>
              <p className="text-sm text-ink-500">Advisory experience</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink-950">UK &amp; US</p>
              <p className="text-sm text-ink-500">Client operations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink-950">ISO-aligned</p>
              <p className="text-sm text-ink-500">Frameworks &amp; audits</p>
            </div>
          </div>
        </div>

        <div className="fade-up lg:col-span-5" style={{ animationDelay: "120ms" }}>
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 rounded-full border border-teal-200" aria-hidden="true" />
            <div className="absolute inset-6 rounded-full border border-teal-300/70" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-teal-900 shadow-lift sm:h-32 sm:w-32">
                <ShieldCheck className="h-14 w-14 text-white" strokeWidth={1.5} aria-hidden="true" />
              </div>
            </div>

            {[
              { Icon: ShieldCheck, label: "Safety", pos: "top-2 left-1/2 -translate-x-1/2", tone: "bg-teal-800" },
              { Icon: Radar, label: "Security", pos: "bottom-8 left-2", tone: "bg-teal-600" },
              { Icon: Leaf, label: "Sustainability", pos: "bottom-8 right-2", tone: "bg-green-600" },
            ].map(({ Icon, label, pos, tone }) => (
              <div key={label} className={`absolute ${pos} flex flex-col items-center gap-2`}>
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${tone} shadow-soft`}>
                  <Icon className="h-7 w-7 text-white" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-ink-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
