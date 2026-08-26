import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Reveal from "../components/ui/Reveal";
import { cn } from "../utils/cn";
import { articles, categories } from "../data/insights";

const PAGE_SIZE = 4;

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const featured = articles.find((a) => a.featured) ?? articles[0];

  const filtered = useMemo(() => {
    return articles
      .filter((a) => a.slug !== featured.slug)
      .filter((a) => activeCategory === "All" || a.category === activeCategory)
      .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));
  }, [activeCategory, query, featured.slug]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Perspectives on safety, security and sustainability practice"
        description="Editorial analysis and practical guidance from our consulting team."
      />

      <section className="border-b border-ink-200 py-20 lg:py-24">
        <Container>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Featured Article</p>
          <Reveal>
            <Link to={`/insights/${featured.slug}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="overflow-hidden rounded-xl border border-ink-200 lg:col-span-7">
                <img
                  src={featured.image}
                  alt=""
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-96"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center lg:col-span-5">
                <Badge tone="teal" className="w-fit">{featured.category}</Badge>
                <h2 className="mt-4 text-2xl font-bold leading-snug text-ink-950 transition-colors group-hover:text-teal-800 sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-lg text-[15.5px] leading-relaxed text-ink-600">{featured.excerpt}</p>
                <p className="mt-5 text-sm text-ink-500">
                  {featured.author.name} · {featured.publishedDate} · {featured.readingTime}
                </p>
                <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-teal-800">
                  Read Article →
                </span>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setPage(1);
                  }}
                  aria-pressed={activeCategory === cat}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    activeCategory === cat
                      ? "border-teal-700 bg-teal-800 text-white"
                      : "border-ink-200 text-ink-700 hover:border-teal-400"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 rounded-full border border-ink-200 bg-white px-4 py-2.5 lg:w-72">
              <Search className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search articles…"
                aria-label="Search insights"
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>

          {paged.length === 0 ? (
            <p className="mt-14 text-ink-500">No articles match your search.</p>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
              {paged.map((article, i) => (
                <Reveal key={article.slug} delay={(i % 2) * 100}>
                  <Link to={`/insights/${article.slug}`} className="group block">
                    <div className="overflow-hidden rounded-xl border border-ink-200">
                      <img
                        src={article.image}
                        alt=""
                        className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <Badge tone="neutral" className="mt-5">{article.category}</Badge>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-ink-950 transition-colors group-hover:text-teal-800">
                      {article.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-600">{article.excerpt}</p>
                    <p className="mt-4 text-xs text-ink-500">
                      {article.author.name} · {article.publishedDate} · {article.readingTime}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? "page" : undefined}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    page === i + 1 ? "bg-teal-800 text-white" : "text-ink-700 hover:bg-ink-100"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          )}
        </Container>
      </section>
    </>
  );
}
