import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function WhoWeAreSection() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Who We Are</p>
              <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-ink-950 sm:text-4xl">
                An independent advisory partner for organisations serious about doing business
                responsibly.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <p className="text-lg leading-relaxed text-ink-600">
                3Sconsulting works alongside leadership teams, HSE managers and sustainability
                leads to strengthen the systems, culture and capability that keep people safe,
                manage risk effectively, and reduce environmental impact — without slowing the
                business down.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div className="border-l-2 border-teal-700 pl-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-ink-950">Mission</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    To make safety, security and sustainability practical, measurable priorities
                    for every client we serve.
                  </p>
                </div>
                <div className="border-l-2 border-teal-500 pl-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-ink-950">Vision</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    A business landscape where responsible practice and commercial performance
                    are never at odds.
                  </p>
                </div>
                <div className="border-l-2 border-green-600 pl-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-ink-950">Values</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    Independence, evidence and candour — we tell clients what they need to hear.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <Button to="/who-we-are" variant="ghost" withArrow className="px-0 hover:bg-transparent">
                  Discover 3Sconsulting
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
