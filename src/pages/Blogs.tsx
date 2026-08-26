import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, PenSquare, Calendar, Clock, Tag, PlusCircle, ArrowRight, Sparkles } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Reveal from "../components/ui/Reveal";
import SEO from "../components/ui/SEO";
import { cn } from "../utils/cn";
import { blogCategories, BlogPost } from "../data/blogs";
import { getAllBlogs } from "../utils/blogStorage";

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const refreshBlogs = () => {
    setBlogs(getAllBlogs());
  };

  useEffect(() => {
    refreshBlogs();
    window.addEventListener("storage", refreshBlogs);
    return () => window.removeEventListener("storage", refreshBlogs);
  }, []);

  const featured = useMemo(() => {
    return blogs.find((b) => b.featured) ?? blogs[0];
  }, [blogs]);

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCat = activeCategory === "All" || b.category === activeCategory;
      const q = query.toLowerCase().trim();
      const matchesQ =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [blogs, activeCategory, query]);

  return (
    <>
      <SEO
        title="Safety, Security & Sustainability Blog"
        description="Perspectives, technical explainers, and expert insights on ISO 45001, ESG governance, and supply chain risk by P.V Sharma and 3Sconsulting."
        canonicalUrl="https://www.3sconsulting.com/blog"
      />
      <PageHero
        eyebrow="3Sconsulting Blog"
        title="Perspectives, Technical Insights & Best Practices"
        description="Thought leadership on Safety, Security, Sustainability, ISO compliance, and enterprise risk management."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button to="/blog/write" variant="primary" size="lg" className="shadow-lg hover:shadow-teal-900/30">
            <PenSquare className="mr-2 h-4.5 w-4.5" />
            Write &amp; Post Blog
          </Button>
          <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm sm:w-auto">
            <Search className="h-4.5 w-4.5 shrink-0 text-teal-200" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blogs by title, tag, or topic…"
              aria-label="Search blogs"
              className="w-full bg-transparent text-sm text-white placeholder:text-ink-300 focus:outline-none"
            />
          </div>
        </div>
      </PageHero>

      {/* Featured Blog Spotlight (when no search active) */}
      {!query && activeCategory === "All" && featured && (
        <section className="border-b border-ink-200 bg-paper-dim py-16 lg:py-20">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">
                <Sparkles className="h-4 w-4" />
                Featured Editorial
              </div>
              <Link
                to="/blog/write"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 hover:text-teal-950"
              >
                <PlusCircle className="h-4 w-4" /> Have an insight? Post a blog
              </Link>
            </div>

            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft transition-all duration-300 hover:shadow-lift">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="relative overflow-hidden lg:col-span-7">
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-96 lg:h-full"
                    />
                    {featured.isCustom && (
                      <span className="absolute top-4 left-4 rounded-md bg-teal-800 px-3 py-1 text-xs font-semibold text-white shadow-md">
                        Community Post
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="teal">{featured.category}</Badge>
                        <span className="flex items-center gap-1 text-xs text-ink-500 font-medium">
                          <Clock className="h-3.5 w-3.5" /> {featured.readingTime}
                        </span>
                      </div>
                      <Link to={`/blog/${featured.slug}`}>
                        <h2 className="mt-4 text-2xl font-bold leading-snug text-ink-950 transition-colors hover:text-teal-800 sm:text-3xl">
                          {featured.title}
                        </h2>
                      </Link>
                      <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
                        {featured.excerpt}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-ink-100 pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-ink-950">{featured.author}</p>
                          <p className="text-xs text-teal-700">{featured.authorRole}</p>
                        </div>
                        <Link
                          to={`/blog/${featured.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 transition-colors hover:bg-teal-700 hover:text-white"
                        >
                          Read Post <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Main Blog Feed & Filters */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    activeCategory === cat
                      ? "border-teal-700 bg-teal-800 text-white shadow-sm"
                      : "border-ink-200 bg-white text-ink-700 hover:border-teal-400"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <p className="text-sm font-medium text-ink-500">{filtered.length} posts found</p>
              <Button to="/blog/write" variant="outline" size="sm">
                <PenSquare className="mr-1.5 h-4 w-4" />
                Write Blog
              </Button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-14 rounded-2xl border border-dashed border-ink-300 p-16 text-center">
              <p className="text-lg font-semibold text-ink-800">No blog posts match your search.</p>
              <p className="mt-2 text-sm text-ink-500">Try selecting another category or write the first post on this topic!</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("All");
                  }}
                >
                  Clear Filters
                </Button>
                <Button to="/blog/write" variant="primary">
                  <PenSquare className="mr-2 h-4 w-4" /> Post New Blog
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <Reveal key={post.id || post.slug} delay={(i % 3) * 100}>
                  <article className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge tone="teal">{post.category}</Badge>
                          {post.isCustom && (
                            <span className="rounded bg-teal-800/90 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-xs">
                              User Post
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-ink-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-teal-600" />
                            {post.publishedDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-teal-600" />
                            {post.readingTime}
                          </span>
                        </div>

                        <Link to={`/blog/${post.slug}`}>
                          <h3 className="mt-3 text-lg font-bold leading-snug text-ink-950 transition-colors hover:text-teal-800 line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="mt-2.5 text-sm leading-relaxed text-ink-600 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {post.tags && post.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 rounded bg-paper-dim px-2 py-0.5 text-[11px] font-medium text-ink-600"
                              >
                                <Tag className="h-2.5 w-2.5 text-ink-400" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-ink-100 px-6 py-4 bg-paper-dim/40">
                      <div className="flex items-center justify-between">
                        <div className="text-xs">
                          <p className="font-bold text-ink-900">{post.author}</p>
                          <p className="text-[11px] text-ink-500">{post.authorRole}</p>
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-950"
                        >
                          Read Article →
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Write Blog Banner */}
      <section className="border-t border-ink-200 bg-teal-950 py-16 text-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
            <div>
              <span className="rounded-full bg-teal-800/80 px-3.5 py-1 text-xs font-semibold text-teal-300">
                Publishing Platform
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Have insights or industry experiences to share?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">
                Write a blog post directly on 3Sconsulting. It will be published instantly in our knowledge feed.
              </p>
            </div>
            <Button
              to="/blog/write"
              size="lg"
              className="shrink-0 bg-white text-teal-950 hover:bg-teal-50"
              withArrow
            >
              <PenSquare className="mr-2 h-4.5 w-4.5" />
              Write a Blog Post
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
