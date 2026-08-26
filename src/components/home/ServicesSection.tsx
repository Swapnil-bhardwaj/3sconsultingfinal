import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { services } from "../../data/services";

export default function ServicesSection() {
  return (
    <section className="border-y border-ink-200 bg-paper-dim py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What We Do"
            title="Professional expertise across safety, risk and sustainability"
            description="Core capabilities that help organisations reduce harm, manage risk and operate more sustainably."
          />
          <Link
            to="/services"
            className="hidden shrink-0 text-sm font-semibold text-teal-800 hover:text-teal-900 sm:inline-flex sm:items-center sm:gap-1"
          >
            View all services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-ink-200 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 90}>
              <Link
                to={`/services/${service.slug}`}
                className="group block h-full border-b border-r border-ink-200 p-8 transition-colors hover:bg-white"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-ink-400">{service.number}</span>
                  <service.icon className="h-6 w-6 text-teal-700" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-ink-950">{service.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">{service.shortDescription}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800">
                  Learn More
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link to="/services" className="text-sm font-semibold text-teal-800">
            View all services →
          </Link>
        </div>
      </Container>
    </section>
  );
}
