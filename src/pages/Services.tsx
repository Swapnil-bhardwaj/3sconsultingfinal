import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { services } from "../data/services";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Professional expertise across safety, risk, sustainability and organisational capability"
        description="Comprehensive consulting and capability-building services, delivered by senior practitioners with international experience across India, UK and worldwide."
      />

      <section className="py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 border-t border-ink-200 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 90}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group block h-full border-b border-r border-ink-200 p-8 transition-colors hover:bg-paper-dim"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm text-ink-400">{service.number}</span>
                    <service.icon className="h-6 w-6 text-teal-700" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-teal-700">
                    {service.category}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-ink-950">{service.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">{service.shortDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800">
                    Learn More
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-200 bg-teal-900 py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white">
            Not sure which service is right for your organisation?
          </h2>
          <Button to="/contact" size="lg" className="bg-white text-teal-900 hover:bg-teal-50" withArrow>
            Discuss Your Requirements
          </Button>
        </Container>
      </section>
    </>
  );
}
