import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { caseStudies } from "../data/caseStudies";

export default function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Real engagements. Practical outcomes."
        description="A closer look at how we've helped clients strengthen certification readiness, manage risk and build credible sustainability practice."
      />

      <section className="py-24 lg:py-28">
        <Container>
          <div className="space-y-16">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 100}>
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="group grid grid-cols-1 gap-8 border-b border-ink-200 pb-16 last:border-0 lg:grid-cols-12 lg:items-center"
                >
                  <div className="overflow-hidden rounded-xl border border-ink-200 lg:col-span-6">
                    <img
                      src={cs.image}
                      alt=""
                      className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-96"
                      loading="lazy"
                    />
                  </div>
                  <div className="lg:col-span-6">
                    <span className="inline-flex rounded-full border border-ink-200 bg-paper-dim px-3 py-1 text-xs font-semibold text-ink-600">
                      {cs.sector}
                    </span>
                    <h2 className="mt-4 text-2xl font-bold leading-snug text-ink-950 transition-colors group-hover:text-teal-800 sm:text-3xl">
                      {cs.title}
                    </h2>
                    <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-600">{cs.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800">
                      View Case Study →
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
            Considering a similar engagement for your organisation?
          </h2>
          <Button to="/contact" size="lg" className="bg-white text-teal-900 hover:bg-teal-50" withArrow>
            Discuss Your Requirements
          </Button>
        </Container>
      </section>
    </>
  );
}
