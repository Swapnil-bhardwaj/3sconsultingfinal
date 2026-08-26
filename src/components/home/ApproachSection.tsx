import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const steps = [
  { step: "01", title: "Assess", description: "We start with an honest, evidence-based assessment of current practice, risk exposure and certification readiness." },
  { step: "02", title: "Design", description: "We design a proportionate programme — training, audit or advisory — matched to your operations and objectives." },
  { step: "03", title: "Deliver", description: "Our senior consultants deliver hands-on, practical support, working alongside your teams rather than at a distance." },
  { step: "04", title: "Embed", description: "We help embed lasting change through follow-up, governance and ongoing capability building." },
];

export default function ApproachSection() {
  return (
    <section className="border-y border-ink-200 bg-paper-dim py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Approach"
          title="A disciplined, evidence-led way of working"
          description="Every engagement follows the same rigorous process, adapted to your organisation's context and risk profile."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 100}>
              <div className="relative pl-0">
                <p className="text-5xl font-bold text-teal-100">{s.step}</p>
                <h3 className="mt-3 text-lg font-bold text-ink-950">{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-600">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
