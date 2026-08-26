import { Link, useParams, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import { getCaseStudyBySlug, caseStudies } from "../data/caseStudies";
import { getServiceBySlug } from "../data/services";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const cs = getCaseStudyBySlug(slug ?? "");

  if (!cs) return <Navigate to="/case-studies" replace />;

  const relatedServices = cs.services.map(getServiceBySlug).filter(Boolean);
  const others = caseStudies.filter((c) => c.slug !== cs.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-200">
        <img src={cs.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink-950/70" />
        <Container className="relative py-24 lg:py-32">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Case Studies", to: "/case-studies" },
              { label: cs.title },
            ]}
          />
          <span className="mt-8 inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white">
            {cs.sector}
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl">
            {cs.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-100">{cs.summary}</p>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <article className="space-y-14 lg:col-span-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Context</p>
                <p className="mt-4 text-[17px] leading-[1.8] text-ink-700">{cs.context}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">The Challenge</p>
                <p className="mt-4 text-[17px] leading-[1.8] text-ink-700">{cs.challenge}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Our Approach</p>
                <ul className="mt-5 space-y-4">
                  {cs.approach.map((step) => (
                    <li key={step} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" strokeWidth={1.5} />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Outcome</p>
                <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {cs.outcome.map((o) => (
                    <li key={o} className="rounded-xl border border-ink-200 bg-paper-dim p-5 text-[15px] leading-relaxed text-ink-700">
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border-l-4 border-green-600 bg-green-50 p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-green-800">Lessons Learned</p>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-800">{cs.lessons}</p>
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div className="rounded-xl border border-ink-200 p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Client</p>
                  <p className="mt-2 text-[15px] font-semibold text-ink-950">{cs.client}</p>
                </div>
                <div className="rounded-xl border border-ink-200 p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Services Delivered</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {relatedServices.map((s) =>
                      s ? (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-800 hover:border-teal-700"
                        >
                          {s.title}
                        </Link>
                      ) : null
                    )}
                  </div>
                </div>
                <div className="rounded-xl bg-teal-950 p-6 text-center">
                  <p className="text-sm font-semibold text-white">Have a similar challenge?</p>
                  <div className="mt-4">
                    <Button to="/contact" size="sm" className="w-full bg-white text-teal-900 hover:bg-teal-50">
                      Discuss Your Requirements
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-200 bg-paper-dim py-20 lg:py-24">
        <Container>
          <p className="mb-10 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">More Case Studies</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {others.map((c) => (
              <Link key={c.slug} to={`/case-studies/${c.slug}`} className="group rounded-xl border border-ink-200 bg-white p-6 shadow-soft">
                <span className="inline-flex rounded-full border border-ink-200 px-3 py-1 text-xs font-semibold text-ink-600">
                  {c.sector}
                </span>
                <h3 className="mt-4 text-base font-bold text-ink-950 group-hover:text-teal-800">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
