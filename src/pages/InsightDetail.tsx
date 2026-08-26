import { Link, useParams, Navigate } from "react-router-dom";
import { CalendarDays, Clock, RefreshCw } from "lucide-react";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/ui/Breadcrumb";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { getArticleBySlug, articles } from "../data/insights";
import { services } from "../data/services";

export default function InsightDetail() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug ?? "");

  if (!article) return <Navigate to="/insights" replace />;

  const related = services.filter((s) => article.relatedServices.includes(s.slug));
  const relatedArticles = articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 2);

  return (
    <>
      <section className="border-b border-ink-200 bg-paper-dim py-14 lg:py-16">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Insights", to: "/insights" },
              { label: article.title },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Badge tone="teal">{article.category}</Badge>
            <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-ink-950 sm:text-[2.6rem]">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">{article.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink-200 pt-6 text-sm text-ink-500">
              <span className="font-semibold text-ink-800">{article.author.name}</span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" /> {article.publishedDate}
              </span>
              {article.updatedDate && (
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4" aria-hidden="true" /> Updated {article.updatedDate}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" /> {article.readingTime}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <div className="border-b border-ink-200">
        <img src={article.image} alt="" className="h-72 w-full object-cover sm:h-[440px]" />
      </div>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-ink-400">On This Page</p>
                <ul className="space-y-3 border-l border-ink-200 pl-4 text-sm">
                  {article.content.map((section) => (
                    <li key={section.heading}>
                      <a href={`#${slugify(section.heading)}`} className="text-ink-600 hover:text-teal-800">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <article className="max-w-2xl lg:col-span-9">
              {article.content.map((section, i) => (
                <div key={section.heading} className={i > 0 ? "mt-10" : ""}>
                  <h2 id={slugify(section.heading)} className="scroll-mt-28 text-2xl font-bold tracking-tight text-ink-950">
                    {section.heading}
                  </h2>
                  {section.body.map((p, pi) => (
                    <p key={pi} className="mt-4 text-[17px] leading-[1.8] text-ink-700">
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              {article.callout && (
                <div className="mt-10 rounded-xl border-l-4 border-green-600 bg-green-50 p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-green-800">{article.callout.title}</p>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink-800">{article.callout.body}</p>
                </div>
              )}

              {related.length > 0 && (
                <div className="mt-14 rounded-xl border border-ink-200 bg-paper-dim p-7">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Related Services</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {related.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-teal-800 hover:border-teal-700"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-14 flex items-start gap-5 rounded-xl border border-ink-200 p-7">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-800 text-lg font-bold text-white">
                  {article.author.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-base font-bold text-ink-950">{article.author.name}</p>
                  <p className="text-sm text-teal-700">{article.author.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{article.author.bio}</p>
                </div>
              </div>

              {relatedArticles.length > 0 && (
                <div className="mt-14">
                  <p className="mb-6 text-xs font-bold uppercase tracking-wide text-ink-500">Related Articles</p>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {relatedArticles.map((a) => (
                      <Link key={a.slug} to={`/insights/${a.slug}`} className="group block">
                        <img src={a.image} alt="" className="h-36 w-full rounded-lg object-cover" loading="lazy" />
                        <h4 className="mt-3 text-[15px] font-bold leading-snug text-ink-950 group-hover:text-teal-800">
                          {a.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-14 rounded-xl bg-teal-950 p-8 text-center">
                <h3 className="text-xl font-bold text-white">Need advice specific to your organisation?</h3>
                <div className="mt-5">
                  <Button to="/contact" className="bg-white text-teal-900 hover:bg-teal-50" withArrow>
                    Discuss Your Requirements
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
