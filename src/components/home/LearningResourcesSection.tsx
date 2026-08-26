import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { resourceCategories } from "../../data/resources";

export default function LearningResourcesSection() {
  return (
    <section className="border-y border-ink-200 bg-teal-950 py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Learning Resources"
            light
            title="A knowledge hub built for practitioners"
            description="Practical articles, expert perspectives, downloadable audit toolkits, and implementation checklists."
          />
          <Button to="/learning-resources" variant="outline-light" withArrow className="shrink-0">
            Explore Resources
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {resourceCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 90}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10 hover:border-teal-400/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-800/60 text-teal-300">
                  <cat.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-white">{cat.name}</p>
                  <span className="rounded-full bg-teal-900/80 border border-teal-500/30 px-3 py-1 text-xs font-semibold text-teal-300">
                    {cat.count} resources
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-ink-300">{cat.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
