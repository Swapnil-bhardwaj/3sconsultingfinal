import { ShieldCheck, Target, Compass, Heart } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";

const values = [
  { icon: ShieldCheck, title: "Independence", body: "We advise without conflicting commercial interests, so our recommendations are always in your organisation's genuine interest." },
  { icon: Target, title: "Evidence", body: "Every recommendation is grounded in structured assessment and recognised standards, not assumption or generic templates." },
  { icon: Compass, title: "Candour", body: "We tell clients what they need to hear, not simply what is easiest to deliver." },
  { icon: Heart, title: "Partnership", body: "We work alongside your teams as an extension of your organisation, not as a detached third party." },
];

const timeline = [
  { year: "Foundations", body: "3Sconsulting was established to bring integrated safety, security and sustainability advisory to organisations navigating increasingly complex regulatory and stakeholder expectations." },
  { year: "Sector focus", body: "We built deep specialism in construction, manufacturing, infrastructure and supply chain — sectors where safety and sustainability risk is most acute." },
  { year: "Today", body: "We support clients across the UK and US with training, audit, risk and ESG consulting delivered by senior practitioners with genuine sector experience." },
];

export default function WhoWeAre() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="An independent advisory partner for safer, more resilient, more sustainable business"
        description="3Sconsulting exists to help organisations turn safety, security and sustainability from compliance obligations into genuine sources of resilience and trust."
      />

      <section className="py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <img
                  src="/images/who-we-are.jpg"
                  alt="3Sconsulting consultants reviewing safety and sustainability documentation together"
                  className="aspect-[4/5] w-full rounded-xl border border-ink-200 object-cover shadow-soft"
                  loading="lazy"
                />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Our Story</p>
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink-950 sm:text-4xl">
                  Built by practitioners who have managed real risk, on real sites.
                </h2>
                <div className="mt-6 space-y-5 text-[16.5px] leading-relaxed text-ink-600">
                  <p>
                    3Sconsulting was founded on a simple observation: organisations are regularly
                    asked to manage safety, security and sustainability as separate, siloed
                    obligations — when in reality, these three dimensions are deeply interdependent.
                  </p>
                  <p>
                    A construction site with poor safety culture rarely has robust environmental
                    controls. A supply chain with weak risk visibility is rarely genuinely
                    sustainable. Our consultants work across all three disciplines because that is
                    how risk actually behaves in practice.
                  </p>
                  <p>
                    Today, we support clients across the UK and US — from regional contractors to
                    established manufacturers — with the same rigour, independence and
                    practitioner-led approach that shaped the firm from day one.
                  </p>
                </div>
                <div className="mt-9">
                  <Button to="/contact" withArrow>Discuss Your Requirements</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-ink-200 bg-paper-dim py-24 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Mission, Vision & Values"
            title="What guides every engagement"
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="h-full rounded-xl border border-ink-200 bg-white p-7 shadow-soft">
                  <v.icon className="h-7 w-7 text-teal-700" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-5 text-base font-bold text-ink-950">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Our Journey" title="How we got here" />
          <div className="mt-14 space-y-0">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 100}>
                <div className="grid grid-cols-1 gap-4 border-t border-ink-200 py-8 last:border-b sm:grid-cols-4">
                  <p className="text-lg font-bold text-ink-950 sm:col-span-1">{t.year}</p>
                  <p className="text-[15px] leading-relaxed text-ink-600 sm:col-span-3">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-teal-900 py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white">
            Want to know more about how we work?
          </h2>
          <Button to="/contact" size="lg" className="bg-white text-teal-900 hover:bg-teal-50" withArrow>
            Discuss Your Requirements
          </Button>
        </Container>
      </section>
    </>
  );
}
