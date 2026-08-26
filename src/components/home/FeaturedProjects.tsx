import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { caseStudies } from "../../data/caseStudies";

export default function FeaturedProjects() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Real engagements, real outcomes"
          description="A selection of recent client work across certification, risk and sustainability advisory."
        />

        <div className="mt-14 space-y-px">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 100}>
              <Link
                to={`/case-studies/${cs.slug}`}
                className="group grid grid-cols-1 items-center gap-6 border-t border-ink-200 py-8 last:border-b sm:grid-cols-12"
              >
                <div className="sm:col-span-2">
                  <span className="inline-flex rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold text-ink-600">
                    {cs.sector}
                  </span>
                </div>
                <div className="sm:col-span-7">
                  <h3 className="text-xl font-bold text-ink-950 transition-colors group-hover:text-teal-800">
                    {cs.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{cs.summary}</p>
                </div>
                <div className="sm:col-span-3 sm:text-right">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800">
                    View Case Study →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Button to="/case-studies" variant="secondary">
            All Case Studies
          </Button>
        </div>
      </Container>
    </section>
  );
}
