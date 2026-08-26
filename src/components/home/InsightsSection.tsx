import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Badge from "../ui/Badge";
import Reveal from "../ui/Reveal";
import { articles } from "../../data/insights";

export default function InsightsSection() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured.slug).slice(0, 3);

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Insights" title="Perspectives from our consulting practice" />
          <Link to="/insights" className="hidden shrink-0 text-sm font-semibold text-teal-800 hover:text-teal-900 sm:inline-block">
            View all insights →
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link to={`/insights/${featured.slug}`} className="group block">
              <div className="overflow-hidden rounded-xl border border-ink-200">
                <img
                  src={featured.image}
                  alt=""
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-96"
                  loading="lazy"
                />
              </div>
              <div className="mt-5">
                <Badge tone="teal">{featured.category}</Badge>
                <h3 className="mt-3 text-2xl font-bold leading-snug text-ink-950 transition-colors group-hover:text-teal-800">
                  {featured.title}
                </h3>
                <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-ink-600">{featured.excerpt}</p>
                <p className="mt-4 text-sm text-ink-500">
                  {featured.author.name} · {featured.publishedDate} · {featured.readingTime}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-8 lg:col-span-5">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 100}>
                <Link to={`/insights/${article.slug}`} className="group flex gap-5 border-b border-ink-200 pb-8 last:border-0">
                  <img
                    src={article.image}
                    alt=""
                    className="h-24 w-28 shrink-0 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div>
                    <Badge tone="neutral" className="mb-2">{article.category}</Badge>
                    <h4 className="text-[15px] font-bold leading-snug text-ink-950 transition-colors group-hover:text-teal-800">
                      {article.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-ink-500">{article.publishedDate} · {article.readingTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:hidden">
          <Link to="/insights" className="text-sm font-semibold text-teal-800">
            View all insights →
          </Link>
        </div>
      </Container>
    </section>
  );
}
