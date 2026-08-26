import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { industries } from "../data/industries";

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries We Support"
        title="Sector expertise where safety and sustainability risk is real"
        description="Our consultants bring first-hand sector experience to construction, manufacturing, infrastructure and supply chain organisations."
      />

      <section className="py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={i * 100}>
                <Link
                  to={`/industries/${industry.slug}`}
                  className="group relative block h-96 overflow-hidden rounded-xl border border-ink-200 shadow-soft transition-shadow hover:shadow-lift"
                >
                  <img
                    src={industry.image}
                    alt={`${industry.name} — ${industry.description}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-8">
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

      <section className="border-t border-ink-200 bg-teal-900 py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white">
            Don't see your sector listed? We'd still like to hear from you.
          </h2>
          <Button to="/contact" size="lg" className="bg-white text-teal-900 hover:bg-teal-50" withArrow>
            Discuss Your Requirements
          </Button>
        </Container>
      </section>
    </>
  );
}
