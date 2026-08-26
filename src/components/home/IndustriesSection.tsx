import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { industries } from "../../data/industries";

export default function IndustriesSection() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Industries We Support"
          title="Sector expertise where the risk is real"
          description="From active construction sites to global supply chains, our consultants bring direct sector experience to every engagement."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={i * 100}>
              <Link
                to={`/industries/${industry.slug}`}
                className="group relative block h-80 overflow-hidden rounded-xl border border-ink-200 shadow-soft transition-shadow hover:shadow-lift"
              >
                <img
                  src={industry.image}
                  alt={`${industry.name} — ${industry.description}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <h3 className="text-2xl font-bold text-white">{industry.name}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-100/90">{industry.description}</p>
                  <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white">
                    View Industry
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
