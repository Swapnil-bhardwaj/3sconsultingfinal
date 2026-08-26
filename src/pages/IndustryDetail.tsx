import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import { getIndustryBySlug, industries } from "../data/industries";
import { services } from "../data/services";

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = getIndustryBySlug(slug ?? "");

  if (!industry) return <Navigate to="/industries" replace />;

  const related = services.filter((s) => industry.relatedServices.includes(s.slug));
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-200">
        <img src={industry.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink-950/70" />
        <Container className="relative py-24 lg:py-32">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Industries", to: "/industries" },
              { label: industry.name },
            ]}
          />
          <h1 className="mt-8 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            {industry.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-100">{industry.longDescription}</p>
          <div className="mt-9">
            <Button to="/contact" withArrow>Discuss Your Requirements</Button>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Focus Areas</p>
              <h2 className="mt-3 text-2xl font-bold text-ink-950">Where we add value</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {industry.focusAreas.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" strokeWidth={1.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-ink-200 bg-paper-dim py-20 lg:py-24">
        <Container>
          <p className="mb-10 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Related Services</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="group rounded-xl border border-ink-200 bg-white p-6 shadow-soft">
                <s.icon className="h-6 w-6 text-teal-700" strokeWidth={1.5} />
                <h3 className="mt-4 text-base font-bold text-ink-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-800">
                  Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <p className="mb-10 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Other Industries</p>
          <div className="flex flex-wrap gap-3">
            {others.map((i) => (
              <Link
                key={i.slug}
                to={`/industries/${i.slug}`}
                className="rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-teal-700 hover:text-teal-800"
              >
                {i.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-teal-900 py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white">
            Let's discuss the challenges specific to your {industry.name.toLowerCase()} operations.
          </h2>
          <Button to="/contact" size="lg" className="bg-white text-teal-900 hover:bg-teal-50" withArrow>
            Discuss Your Requirements
          </Button>
        </Container>
      </section>
    </>
  );
}
