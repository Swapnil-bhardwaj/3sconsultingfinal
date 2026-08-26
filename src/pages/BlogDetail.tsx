import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Tag, Share2, Check, Trash2, PenSquare } from "lucide-react";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/ui/Breadcrumb";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { BlogPost } from "../data/blogs";
import { getBlogBySlug, getAllBlogs, deleteBlogPost } from "../utils/blogStorage";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      const found = getBlogBySlug(slug);
      setPost(found);
      if (found) {
        const all = getAllBlogs();
        const otherPosts = all.filter((b) => b.slug !== found.slug && b.category === found.category).slice(0, 3);
        setRelated(otherPosts.length > 0 ? otherPosts : all.filter((b) => b.slug !== found.slug).slice(0, 3));
      }
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="py-24">
        <Container className="text-center">
          <h1 className="text-2xl font-bold text-ink-950">Blog Post Not Found</h1>
          <p className="mt-2 text-sm text-ink-600">The blog post you requested does not exist or has been removed.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Button to="/blog" variant="primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
            </Button>
            <Button to="/blog/write" variant="outline">
              <PenSquare className="mr-2 h-4 w-4" /> Write a Blog
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this custom blog post?")) {
      deleteBlogPost(post.id);
      navigate("/blog");
    }
  };

  // Render markdown-like sections or text paragraphs nicely
  const paragraphs = post.content.split(/\n\s*\n/);

  return (
    <>
      <section className="border-b border-ink-200 bg-paper-dim py-12 lg:py-16">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: post.title },
            ]}
          />

          <div className="mt-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="teal">{post.category}</Badge>
              {post.isCustom && (
                <span className="rounded-full bg-teal-800 px-2.5 py-0.5 text-xs font-semibold text-white">
                  User Post
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink-950 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-ink-600">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-600">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-800 font-bold text-white text-xs">
                    {post.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 3)}
                  </div>
                  <div>
                    <span className="font-bold text-ink-900">{post.author}</span>
                    <span className="block text-xs text-teal-700">{post.authorRole}</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-ink-500">
                  <Calendar className="h-4 w-4 text-teal-600" /> {post.publishedDate}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-ink-500">
                  <Clock className="h-4 w-4 text-teal-600" /> {post.readingTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:border-teal-400 hover:text-teal-800"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-600" /> Copied Link
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" /> Share
                    </>
                  )}
                </button>

                {post.isCustom && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    title="Delete custom post"
                    className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cover Image */}
      <div className="border-b border-ink-200 bg-paper-dim">
        <Container className="py-6">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-72 w-full rounded-2xl object-cover shadow-soft sm:h-96 lg:h-[460px]"
          />
        </Container>
      </div>

      {/* Blog Body */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <div className="prose max-w-none space-y-6 text-[17px] leading-[1.8] text-ink-800">
                {paragraphs.map((p, idx) => {
                  const trimmed = p.trim();
                  if (trimmed.startsWith("### ")) {
                    return (
                      <h3
                        key={idx}
                        className="mt-8 text-2xl font-bold tracking-tight text-ink-950 border-b border-ink-100 pb-2"
                      >
                        {trimmed.replace(/^###\s+/, "")}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith("## ")) {
                    return (
                      <h2 key={idx} className="mt-10 text-3xl font-bold tracking-tight text-ink-950">
                        {trimmed.replace(/^##\s+/, "")}
                      </h2>
                    );
                  }
                  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                    const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
                    return (
                      <ul key={idx} className="my-4 space-y-2 list-disc pl-6 text-ink-700">
                        {items.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className="text-ink-700">
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-ink-200 pt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-500">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio Box */}
              <div className="mt-12 flex items-start gap-5 rounded-2xl border border-ink-200 bg-paper-dim p-7">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-800 text-lg font-bold text-white shadow-sm">
                  {post.author
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-ink-950">{post.author}</p>
                    <span className="text-xs font-semibold text-teal-800">{post.authorRole}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    P.V Sharma leads 3Sconsulting, advising organisations across industries on occupational health &
                    safety strategy, ISO certification readiness, enterprise risk management, and ESG sustainability.
                  </p>
                  <div className="mt-3">
                    <Link to="/contact" className="text-xs font-bold text-teal-800 hover:underline">
                      Connect with P.V Sharma →
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="rounded-2xl border border-teal-900/10 bg-teal-900 p-7 text-white shadow-lift">
                <span className="rounded bg-teal-800 px-2.5 py-0.5 text-xs font-bold text-teal-200">
                  Contribute
                </span>
                <h3 className="mt-3 text-lg font-bold">Write Your Own Post</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-200">
                  Share your technical experiences, audit case findings, or regulatory insights with our community.
                </p>
                <div className="mt-5">
                  <Button to="/blog/write" className="w-full bg-white text-teal-900 hover:bg-teal-50" size="sm">
                    <PenSquare className="mr-1.5 h-3.5 w-3.5" /> Write &amp; Post Blog
                  </Button>
                </div>
              </div>

              {related.length > 0 && (
                <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Related Posts</p>
                  <div className="mt-4 space-y-5">
                    {related.map((r) => (
                      <Link key={r.slug} to={`/blog/${r.slug}`} className="group block">
                        <div className="flex items-center gap-2 text-[11px] text-ink-400">
                          <span>{r.category}</span>
                          <span>•</span>
                          <span>{r.readingTime}</span>
                        </div>
                        <h4 className="mt-1 text-sm font-bold text-ink-900 transition-colors group-hover:text-teal-800">
                          {r.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft text-center">
                <h4 className="text-base font-bold text-ink-950">Need bespoke advisory?</h4>
                <p className="mt-2 text-xs leading-relaxed text-ink-600">
                  Speak directly with senior consultants for ISO readiness, risk audits, or ESG implementations.
                </p>
                <Button to="/contact" size="sm" className="mt-4 w-full" withArrow>
                  Contact 3Sconsulting
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
