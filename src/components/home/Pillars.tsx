import { ShieldCheck, Radar, Leaf } from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

const pillars = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Safety",
    tone: "text-teal-800",
    line: "border-teal-700",
    items: ["HSE", "Occupational Safety", "Safety Culture", "ISO 45001"],
  },
  {
    number: "02",
    icon: Radar,
    title: "Security",
    tone: "text-teal-600",
    line: "border-teal-500",
    items: ["Risk Management", "Resilience", "Supply Chain Risk", "Business Continuity"],
  },
  {
    number: "03",
    icon: Leaf,
    title: "Sustainability",
    tone: "text-green-700",
    line: "border-green-600",
    items: ["ESG", "Environmental Management", "ISO 14001", "Sustainable Business"],
  },
];

export default function Pillars() {
  return (
    <section className="bg-ink-950 py-24 lg:py-32">
      <Container>
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-teal-300">
            Our Framework
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">The 3S Approach</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            Everything we do connects back to three interdependent pillars — the foundation of
            durable, trustworthy organisations.
          </p>
        </div>

        <div className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="group px-1 py-10 transition-colors lg:px-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-ink-500">{p.number}</span>
                  <p.icon className={`h-7 w-7 ${p.tone}`} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-white">{p.title}</h3>
                <div className={`mt-4 h-px w-12 border-t-2 ${p.line}`} />
                <ul className="mt-6 space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-2.5 text-[15px] text-ink-300">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-ink-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
