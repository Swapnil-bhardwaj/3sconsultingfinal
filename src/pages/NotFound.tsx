import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <Container className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
          We couldn't find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-600">
          The page you're looking for may have moved or no longer exists. Let's get you back on
          track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/" withArrow>Back to Home</Button>
          <Button to="/contact" variant="secondary">Contact Us</Button>
        </div>
      </Container>
    </section>
  );
}
