import { Link, useParams, Navigate } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import Accordion from "../components/ui/Accordion";
import { getServiceBySlug, services } from "../data/services";
import { industries } from "../data/industries";
import { articles } from "../data/insights";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug ?? "");

  if (!service) return <Navigate to="/services" replace />;

  const relatedIndustries = industries.filter((ind) => service.industries.includes(ind.name));
  const relatedArticles = articles.filter((a) => service.faqs && a.relatedServices.includes(service.slug)).slice(0, 2);
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-ink-200 bg-teal-950 py-20 lg:py-24">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: service.title },
            ]}
          />
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-teal-300">
                {service.category} · {service.number}
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">{service.heroDescription}</p>
            </div>
            <service.icon className="hidden h-16 w-16 shrink-0 text-teal-400 lg:block" strokeWidth={1} aria-hidden="true" />
          </div>
          <div className="mt-9">
            <Button to="/contact" withArrow>Discuss Your Requirements</Button>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Overview</p>
            </div>
            <div className="lg:col-span-8">
              <p className="max-w-2xl text-lg leading-relaxed text-ink-700">{service.overview}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Challenges */}
      <section className="border-y border-ink-200 bg-paper-dim py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Challenges We Address</p>
            </div>
            <div className="lg:col-span-8">
              <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {service.challenges.map((c) => (
                  <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-ink-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Expertise */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Our Expertise</p>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-4">
                {service.expertise.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" strokeWidth={1.5} />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* How We Help */}
      <section className="border-y border-ink-200 bg-teal-950 py-20 lg:py-24">
        <Container>
          <p className="mb-10 text-sm font-semibold uppercase tracking-[0.14em] text-teal-300">How We Help</p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {service.howWeHelp.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="border-l-2 border-teal-600 pl-5">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Approach */}
      <section className="py-20 lg:py-24">
        <Container>
          <p className="mb-10 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Our Approach</p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {service.approach.map((step, i) => (
              <Reveal key={step.step} delay={i * 90}>
                <p className="text-4xl font-bold text-teal-100">{step.step}</p>
                <h3 className="mt-3 text-base font-bold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="border-y border-ink-200 bg-paper-dim py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Benefits</p>
              <h2 className="mt-3 text-2xl font-bold text-ink-950">What you can expect</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {service.benefits.map((b) => (
                  <li key={b} className="rounded-xl border border-ink-200 bg-white p-5 text-[15px] leading-relaxed text-ink-700 shadow-soft">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Industries */}
      {relatedIndustries.length > 0 && (
        <section className="py-20 lg:py-24">
          <Container>
            <p className="mb-10 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Related Industries</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedIndustries.map((ind) => (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  className="group rounded-xl border border-ink-200 p-6 transition-colors hover:bg-paper-dim"
                >
                  <h3 className="text-base font-bold text-ink-950">{ind.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{ind.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-800">
                    View Industry <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related Resources */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-ink-200 bg-paper-dim py-20 lg:py-24">
          <Container>
            <p className="mb-10 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Related Resources</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedArticles.map((a) => (
                <Link key={a.slug} to={`/insights/${a.slug}`} className="group flex gap-5 rounded-xl border border-ink-200 bg-white p-5">
                  <img src={a.image} alt="" className="h-20 w-24 shrink-0 rounded-lg object-cover" loading="lazy" />
                  <div>
                    <h3 className="text-[15px] font-bold text-ink-950 group-hover:text-teal-800">{a.title}</h3>
                    <p className="mt-1.5 text-xs text-ink-500">{a.readingTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQs */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">FAQs</p>
              <h2 className="mt-3 text-2xl font-bold text-ink-950">Common questions</h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={service.faqs} />
            </div>
          </div>
        </Container>
      </section>

      {/* Other services */}
      <section className="border-t border-ink-200 bg-paper-dim py-20 lg:py-24">
        <Container>
          <p className="mb-10 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Explore More Services</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherServices.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="group rounded-xl border border-ink-200 bg-white p-6 shadow-soft">
                <s.icon className="h-6 w-6 text-teal-700" strokeWidth={1.5} />
                <h3 className="mt-4 text-base font-bold text-ink-950">{s.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-800">
                  Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-teal-900 py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white">
            Ready to talk through your {service.title.toLowerCase()} requirements?
          </h2>
          <Button to="/contact" size="lg" className="bg-white text-teal-900 hover:bg-teal-50" withArrow>
            Discuss Your Requirements
          </Button>
        </Container>
      </section>
    </>
  );
}
