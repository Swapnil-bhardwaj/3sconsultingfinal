import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-teal-900 py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(95,156,103,0.25), transparent 45%)" }}
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <Reveal>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-teal-300">Get Started</p>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Ready to strengthen safety, security and sustainability across your business?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-200">
            Speak with one of our senior consultants about your organisation's specific challenges —
            no obligation, just a genuine conversation.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button to="/contact" size="lg" className="bg-white text-teal-900 hover:bg-teal-50" withArrow>
              Discuss Your Requirements
            </Button>
            <Button to="/services" size="lg" variant="outline-light">
              Explore Our Services
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
