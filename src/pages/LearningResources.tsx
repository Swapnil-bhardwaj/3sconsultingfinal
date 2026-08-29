import { useMemo, useState } from "react";
import { Search, Download, FileText, ArrowRight, Eye, X, ShieldCheck, Sparkles, BookOpen, Check } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Reveal from "../components/ui/Reveal";
import SEO from "../components/ui/SEO";
import { cn } from "../utils/cn";
import { resourceCategories, featuredResource, latestResources, Resource } from "../data/resources";
import { sanitizeText } from "../utils/security";

export default function LearningResources() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [previewDoc, setPreviewDoc] = useState<Resource | null>(null);

  const cleanQuery = sanitizeText(query).toLowerCase();

  const handleCategorySelect = (catName: string) => {
    setActiveCategory(catName);
    setTimeout(() => {
      document.getElementById("resources-list-section")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const filtered = useMemo(() => {
    return latestResources.filter((r) => {
      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Articles" && r.type === "Article") ||
        (activeCategory === "Downloads" && r.type === "Download");
      const matchesQuery =
        !cleanQuery ||
        r.title.toLowerCase().includes(cleanQuery) ||
        r.description.toLowerCase().includes(cleanQuery) ||
        (r.topic && r.topic.toLowerCase().includes(cleanQuery)) ||
        (r.badge && r.badge.toLowerCase().includes(cleanQuery));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, cleanQuery]);

  return (
    <>
      <SEO
        title="NEBOSH IDip Study Material & HSE PDFs"
        description="Free downloadable NEBOSH IDip study modules, Vocational Rehabilitation checklists, ISO 45001 worker consultation guides, HSE enforcement case studies, and OBE mock tests."
        canonicalUrl="https://www.3sconsulting.com/learning-resources"
        schema={{
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: "NEBOSH IDip Study Series & Knowledge Resources",
          description: "Comprehensive study materials, statutory checklists, and Open Book Exam scenario tests for health and safety practitioners.",
          provider: {
            "@type": "Organization",
            name: "3Sconsulting",
            url: "https://www.3sconsulting.com",
          },
        }}
      />
      <PageHero
        eyebrow="NEBOSH IDip & HSE Knowledge Hub"
        title="Learning Resources, Study Modules & Downloadable PDFs"
        description="Access and download authentic NEBOSH IDip study materials, statutory checklists, case studies, and compliance toolkits."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex w-full max-w-lg items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 backdrop-blur-sm">
            <Search className="h-4.5 w-4.5 shrink-0 text-teal-200" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search NEBOSH modules, topics, or checklists…"
              aria-label="Search learning resources"
              className="w-full bg-transparent text-sm text-white placeholder:text-ink-300 focus:outline-none"
            />
          </div>
          {featuredResource.downloadUrl && (
            <a
              href={featuredResource.downloadUrl}
              download
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-5 py-3 text-sm font-bold text-teal-950 shadow-md transition-all hover:bg-white hover:scale-105"
            >
              <Download className="h-4 w-4" /> Download Featured PDF
            </a>
          )}
        </div>
      </PageHero>

      {/* Category Selection Cards */}
      <section className="py-14 lg:py-16">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Resource Categories</p>
              <h2 className="mt-1 text-2xl font-bold text-ink-950">Select a category to explore</h2>
            </div>
            <button
              type="button"
              onClick={() => handleCategorySelect("All")}
              className={cn(
                "w-fit rounded-full px-5 py-2.5 text-sm font-semibold transition-all border cursor-pointer",
                activeCategory === "All"
                  ? "bg-teal-800 text-white border-teal-800 shadow-sm"
                  : "bg-white text-ink-700 border-ink-200 hover:border-teal-400"
              )}
            >
              Show All ({latestResources.length})
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {resourceCategories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCategorySelect(cat.name);
                  }
                }}
                className={cn(
                  "group flex flex-col justify-between rounded-2xl border p-7 text-left transition-all duration-300 cursor-pointer shadow-soft hover:-translate-y-1 hover:shadow-lift",
                  activeCategory === cat.name
                    ? "border-teal-700 bg-teal-50/90 ring-2 ring-teal-700"
                    : "border-ink-200 bg-white hover:border-teal-400"
                )}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors",
                      activeCategory === cat.name
                        ? "bg-teal-700 text-white"
                        : "bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white"
                    )}
                  >
                    <cat.icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-ink-950">{cat.name}</p>
                      <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-900">
                        {cat.name === "Downloads" ? "6 Verified PDFs" : "3 In-Depth Articles"}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{cat.description}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between text-xs font-bold text-teal-800 group-hover:text-teal-900">
                  <span className="flex items-center gap-1.5">
                    {activeCategory === cat.name ? (
                      <>
                        <Check className="h-4 w-4 text-teal-700" /> Filter Active (Showing below)
                      </>
                    ) : (
                      <>View {cat.name} List ↓</>
                    )}
                  </span>
                  <span className="rounded-lg bg-white px-3 py-1.5 border border-ink-200 shadow-2xs group-hover:border-teal-400">
                    Click to Open →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Download Spotlight */}
      <section className="border-y border-ink-200 bg-paper-dim py-16 lg:py-20">
        <Container>
          <div className="flex items-center gap-2 mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">
            <Sparkles className="h-4 w-4" />
            Featured NEBOSH Study Material
          </div>
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 rounded-2xl border border-ink-200 bg-white p-8 shadow-soft lg:grid-cols-12 lg:p-12">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="green">Verified PDF Download</Badge>
                  <span className="rounded-md bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-900">
                    {featuredResource.topic}
                  </span>
                  {featuredResource.pages && (
                    <span className="text-xs text-ink-500 font-medium">• {featuredResource.pages}</span>
                  )}
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-snug text-ink-950 sm:text-3xl">
                  {featuredResource.title}
                </h2>
                <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-600">
                  {featuredResource.description}
                </p>
                
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  {featuredResource.downloadUrl && (
                    <a
                      href={featuredResource.downloadUrl}
                      download
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-900 hover:scale-105"
                    >
                      <Download className="h-4.5 w-4.5" />
                      Download Complete PDF
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(featuredResource)}
                    className="inline-flex items-center gap-2 rounded-xl border border-ink-300 bg-white px-5 py-3.5 text-sm font-bold text-ink-800 transition-colors hover:border-teal-400 hover:text-teal-800 cursor-pointer"
                  >
                    <Eye className="h-4.5 w-4.5" />
                    Quick Preview
                  </button>
                </div>
              </div>
              <div className="hidden lg:col-span-4 lg:block">
                <div className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-teal-950 p-8 text-center text-white shadow-inner">
                  <img src="/images/logo.png" alt="3Sconsulting" className="h-24 w-24 object-contain drop-shadow-md mb-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">Free PDF Access</span>
                  <span className="mt-1 text-sm text-ink-200">Authorized Educational Material</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Grid of All Resources (PDF Downloads & Articles) */}
      <section id="resources-list-section" className="py-16 lg:py-24 scroll-mt-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-ink-200 pb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Browse Study Series</p>
              <h2 className="mt-1 text-2xl font-bold text-ink-950 sm:text-3xl">
                {activeCategory === "All"
                  ? "All NEBOSH Materials & Articles"
                  : activeCategory === "Downloads"
                  ? "Downloadable PDF Study Materials"
                  : "Technical Articles & Guides"}
              </h2>
            </div>
            
            {/* Quick Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold transition-colors cursor-pointer",
                  activeCategory === "All"
                    ? "bg-teal-800 text-white"
                    : "bg-paper-dim text-ink-700 hover:bg-teal-100"
                )}
              >
                All ({latestResources.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("Downloads")}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1",
                  activeCategory === "Downloads"
                    ? "bg-green-700 text-white"
                    : "bg-paper-dim text-ink-700 hover:bg-green-100"
                )}
              >
                <Download className="h-3 w-3" /> Downloads (6)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("Articles")}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1",
                  activeCategory === "Articles"
                    ? "bg-teal-800 text-white"
                    : "bg-paper-dim text-ink-700 hover:bg-teal-100"
                )}
              >
                <FileText className="h-3 w-3" /> Articles (3)
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 rounded-xl border border-dashed border-ink-300 p-12 text-center">
              <p className="text-ink-500">No resources match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-sm font-semibold text-teal-800 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r, i) => (
                <Reveal key={r.id || r.title} delay={(i % 3) * 80}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-ink-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <Badge tone={r.type === "Download" ? "green" : "teal"}>
                          {r.type === "Download" ? (
                            <span className="flex items-center gap-1 font-bold">
                              <Download className="h-3 w-3" /> PDF Download
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 font-bold">
                              <FileText className="h-3 w-3" /> Article
                            </span>
                          )}
                        </Badge>
                        {r.badge && (
                          <span className="rounded bg-paper-dim px-2 py-0.5 text-[11px] font-bold text-teal-900">
                            {r.badge}
                          </span>
                        )}
                      </div>

                      {r.topic && (
                        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                          {r.topic}
                        </p>
                      )}

                      <h3 className="mt-2 text-lg font-bold leading-snug text-ink-950">{r.title}</h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{r.description}</p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-ink-100 flex flex-wrap items-center justify-between gap-3">
                      {r.type === "Download" && r.downloadUrl ? (
                        <>
                          <a
                            href={r.downloadUrl}
                            download
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-800 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-teal-900 hover:scale-105 shadow-xs"
                          >
                            <Download className="h-3.5 w-3.5" /> Download PDF
                          </a>
                          <button
                            type="button"
                            onClick={() => setPreviewDoc(r)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-ink-600 hover:text-teal-800 cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" /> Preview
                          </button>
                        </>
                      ) : (
                        <Link
                          to="/blog"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 hover:text-teal-900"
                        >
                          Read Article <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Security & Verification Banner */}
      <section className="border-t border-ink-200 bg-paper-dim py-14">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-teal-900/10 bg-white p-8 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-800">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink-950">Verified & Secure Study Downloads</h3>
                <p className="mt-1 text-sm text-ink-600">
                  All PDF documents are cryptographically verified, scanned for malware, and provided free for educational and exam preparation use.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="shrink-0 rounded-xl bg-teal-900 px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-teal-950"
            >
              Request Custom Study Material
            </Link>
          </div>
        </Container>
      </section>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-xs"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewDoc(null)}
              className="absolute top-5 right-5 rounded-full p-1 text-ink-500 hover:bg-ink-100 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <Badge tone="teal">{previewDoc.type}</Badge>
              {previewDoc.badge && (
                <span className="text-xs font-bold text-teal-800">{previewDoc.badge}</span>
              )}
            </div>

            <h3 className="mt-3 text-2xl font-bold text-ink-950 leading-tight">
              {previewDoc.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              {previewDoc.description}
            </p>

            <div className="my-6 rounded-xl border border-teal-100 bg-teal-50/70 p-5 text-sm text-ink-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-teal-950">
                <BookOpen className="h-4 w-4 text-teal-700" />
                Document Information & Study Focus
              </div>
              <p className="text-xs text-ink-700 leading-relaxed">
                Author: <strong>P.V Sharma (Founder & Principal Consultant, 3Sconsulting)</strong>
              </p>
              <p className="text-xs text-ink-700">
                Topic: <strong>{previewDoc.topic || "Occupational Health & Safety / NEBOSH IDip"}</strong>
              </p>
              <p className="text-xs text-ink-700">
                Format: <strong>Formatted PDF Document for Desktop, Mobile & Print</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-ink-100 pt-5">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="rounded-xl border border-ink-300 px-5 py-2.5 text-xs font-bold text-ink-700 hover:bg-ink-50 cursor-pointer"
              >
                Close Preview
              </button>
              {previewDoc.downloadUrl && (
                <a
                  href={previewDoc.downloadUrl}
                  download
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-900"
                >
                  <Download className="h-4 w-4" /> Download PDF Now
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
