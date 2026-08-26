import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { caseStudies } from "../../data/caseStudies";

export default function CaseStudiesSection() {
  const spotlight = caseStudies[0];

  return (
    <section className="border-y border-ink-200 bg-paper-dim py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="overflow-hidden rounded-xl border border-ink-200 shadow-soft">
              <img src={spotlight.image} alt="" className="h-[420px] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Case Study Spotlight</p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink-950 sm:text-4xl">
              {spotlight.title}
            </h2>
            <blockquote className="mt-6 border-l-2 border-teal-700 pl-5 text-lg leading-relaxed text-ink-700">
              “{spotlight.lessons}”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              {spotlight.services.map((s) => (
                <span key={s} className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-600">
                  {s.replace(/-/g, " ")}
                </span>
              ))}
            </div>
            <div className="mt-9">
              <Button to={`/case-studies/${spotlight.slug}`} withArrow>
                View Case Study
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
