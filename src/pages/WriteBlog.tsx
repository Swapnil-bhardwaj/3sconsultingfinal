import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PenSquare,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  Eye,
  Edit3,
  Tag,
} from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { blogCategories, presetCoverImages, BlogPost } from "../data/blogs";
import { saveBlogPost } from "../utils/blogStorage";
import RichBlogContent from "../components/blog/RichBlogContent";

export default function WriteBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<BlogPost["category"]>("Safety");
  const [author, setAuthor] = useState("P.V Sharma");
  const [authorRole, setAuthorRole] = useState("Founder & Principal Consultant");
  const [coverImage, setCoverImage] = useState(presetCoverImages[0].url);
  const [customImage, setCustomImage] = useState("");
  const [useCustomImage, setUseCustomImage] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [tagsInput, setTagsInput] = useState("Workplace Safety, Compliance, Best Practices");
  const [content, setContent] = useState("");

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedImage = useCustomImage && customImage.trim() ? customImage.trim() : coverImage;

  const handleInsertHelper = (snippet: string) => {
    setContent((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please enter a blog title.");
      return;
    }
    if (!content.trim()) {
      setError("Please write the content for your blog post.");
      return;
    }

    setIsSubmitting(true);

    try {
      const parsedTags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const newPost = saveBlogPost({
        title: title.trim(),
        category,
        author: author.trim() || "P.V Sharma",
        authorRole: authorRole.trim() || "Founder & Principal Consultant",
        coverImage: selectedImage,
        excerpt: excerpt.trim(),
        tags: parsedTags.length > 0 ? parsedTags : [category],
        content: content.trim(),
      });

      // Redirect to the newly created blog post
      setTimeout(() => {
        navigate(`/blog/${newPost.slug}`);
      }, 300);
    } catch (err) {
      console.error(err);
      setError("Failed to publish blog post. Please check your inputs.");
      setIsSubmitting(false);
    }
  };

  const previewParagraphs = content.split(/\n\s*\n/);

  return (
    <>
      <PageHero
        eyebrow="Publishing Studio"
        title="Write & Post a Blog"
        description="Draft and publish technical articles, safety advisories, and industry insights directly to the 3Sconsulting knowledge hub."
      />

      <section className="py-14 lg:py-20 bg-paper-dim/60">
        <Container>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 transition-colors hover:text-teal-800"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Blogs
            </Link>

            <div className="flex items-center rounded-lg border border-ink-300 bg-white p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "edit" ? "bg-teal-800 text-white shadow-xs" : "text-ink-700 hover:text-teal-800"
                }`}
              >
                <Edit3 className="h-3.5 w-3.5" /> Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "preview" ? "bg-teal-800 text-white shadow-xs" : "text-ink-700 hover:text-teal-800"
                }`}
              >
                <Eye className="h-3.5 w-3.5" /> Live Preview
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
              {error}
            </div>
          )}

          {activeTab === "edit" ? (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-200 bg-white p-8 shadow-soft lg:p-12">
              <div className="space-y-8">
                {/* Basic Meta */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                  <div className="md:col-span-8">
                    <label htmlFor="blog-title" className="mb-2 block text-sm font-bold text-ink-900">
                      Blog Title <span className="text-teal-700">*</span>
                    </label>
                    <input
                      id="blog-title"
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Modern Strategies for Workplace Safety & Risk Mitigation"
                      className="h-12 w-full rounded-xl border border-ink-300 bg-white px-4 text-base text-ink-900 placeholder:text-ink-400 focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                    />
                  </div>

                  <div className="md:col-span-4">
                    <label htmlFor="blog-category" className="mb-2 block text-sm font-bold text-ink-900">
                      Category <span className="text-teal-700">*</span>
                    </label>
                    <select
                      id="blog-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as BlogPost["category"])}
                      className="h-12 w-full rounded-xl border border-ink-300 bg-white px-4 text-sm font-medium text-ink-900 focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                    >
                      {blogCategories
                        .filter((c) => c !== "All")
                        .map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 rounded-xl bg-paper-dim/60 p-5 border border-ink-200">
                  <div>
                    <label htmlFor="blog-author" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
                      Author Name
                    </label>
                    <input
                      id="blog-author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="h-10 w-full rounded-lg border border-ink-300 bg-white px-3 text-sm text-ink-900 focus:border-teal-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="blog-role" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
                      Author Designation / Role
                    </label>
                    <input
                      id="blog-role"
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      className="h-10 w-full rounded-lg border border-ink-300 bg-white px-3 text-sm text-ink-900 focus:border-teal-700"
                    />
                  </div>
                </div>

                {/* Cover Image Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-ink-900 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-teal-700" />
                      Select Cover Image
                    </label>
                    <button
                      type="button"
                      onClick={() => setUseCustomImage(!useCustomImage)}
                      className="text-xs font-semibold text-teal-800 hover:underline"
                    >
                      {useCustomImage ? "Choose from Presets" : "Use Custom Image URL"}
                    </button>
                  </div>

                  {useCustomImage ? (
                    <div>
                      <input
                        type="url"
                        value={customImage}
                        onChange={(e) => setCustomImage(e.target.value)}
                        placeholder="https://example.com/cover-image.jpg"
                        className="h-11 w-full rounded-xl border border-ink-300 bg-white px-4 text-sm text-ink-900 focus:border-teal-700"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                      {presetCoverImages.map((img) => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setCoverImage(img.url)}
                          className={`group relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all ${
                            coverImage === img.url
                              ? "border-teal-700 shadow-md ring-2 ring-teal-700/40"
                              : "border-transparent opacity-75 hover:opacity-100 hover:border-ink-400"
                          }`}
                        >
                          <img src={img.url} alt={img.label} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-2 flex items-end">
                            <span className="text-[10px] font-semibold text-white leading-tight">
                              {img.label}
                            </span>
                          </div>
                          {coverImage === img.url && (
                            <div className="absolute top-1 right-1 rounded-full bg-teal-700 p-0.5 text-white">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="blog-excerpt" className="mb-2 block text-sm font-bold text-ink-900">
                    Summary / Excerpt
                  </label>
                  <textarea
                    id="blog-excerpt"
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence overview of what this article covers..."
                    className="w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-teal-700"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="blog-tags" className="mb-2 block text-sm font-bold text-ink-900">
                    Tags (Comma Separated)
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-400" />
                    <input
                      id="blog-tags"
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="e.g. ISO 45001, Safety Leadership, Risk Audits, ESG"
                      className="h-11 w-full rounded-xl border border-ink-300 bg-white pl-10 pr-4 text-sm text-ink-900 focus:border-teal-700"
                    />
                  </div>
                </div>

                {/* Content Editor with Helpers */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label htmlFor="blog-content" className="text-sm font-bold text-ink-900">
                      Blog Content <span className="text-teal-700">*</span>
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-ink-500 font-medium">Quick Insert:</span>
                      <button
                        type="button"
                        onClick={() => handleInsertHelper("### Subheading Title")}
                        className="rounded bg-paper-dim px-2 py-1 text-xs font-semibold text-ink-700 hover:bg-ink-200"
                      >
                        + Subheading
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertHelper("- Point 1\n- Point 2\n- Point 3")}
                        className="rounded bg-paper-dim px-2 py-1 text-xs font-semibold text-ink-700 hover:bg-ink-200"
                      >
                        + Bullet List
                      </button>
                    </div>
                  </div>

                  <textarea
                    id="blog-content"
                    required
                    rows={14}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your article here...
Use ### for subheadings.
Use - or * for bullet points.
Leave blank lines between paragraphs."
                    className="w-full rounded-xl border border-ink-300 bg-white p-4 font-mono text-sm leading-relaxed text-ink-900 placeholder:text-ink-400 focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                  />
                </div>

                {/* Submit Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("preview")}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Preview Post
                  </Button>

                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => navigate("/blog")}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="shadow-md"
                      withArrow
                    >
                      <PenSquare className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Publishing..." : "Publish Blog Post"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            /* Live Preview Mode */
            <div className="rounded-2xl border border-ink-200 bg-white shadow-soft overflow-hidden">
              <div className="bg-teal-900 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-teal-300" />
                  <span className="font-bold text-sm">Post Preview Mode</span>
                </div>
                <Button
                  type="button"
                  variant="outline-light"
                  size="sm"
                  onClick={() => setActiveTab("edit")}
                >
                  <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Back to Edit
                </Button>
              </div>

              <div className="p-8 sm:p-12 max-w-3xl mx-auto">
                <div className="flex items-center gap-3">
                  <Badge tone="teal">{category}</Badge>
                  <span className="text-xs font-semibold text-teal-800">Draft Preview</span>
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
                  {title || "Untitled Blog Post"}
                </h1>

                <p className="mt-3 text-lg leading-relaxed text-ink-600">
                  {excerpt || "Excerpt will appear here..."}
                </p>

                <div className="mt-6 flex items-center gap-4 border-t border-ink-200 pt-4 text-sm text-ink-600">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-800 text-xs font-bold text-white">
                      {author.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-ink-900">{author}</p>
                      <p className="text-[10px] text-teal-700">{authorRole}</p>
                    </div>
                  </div>
                </div>

                <div className="my-8 overflow-hidden rounded-xl border border-ink-200">
                  <img src={selectedImage} alt="Cover Preview" className="h-72 w-full object-cover" />
                </div>

                <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-xs">
                  {content ? (
                    <RichBlogContent content={content} />
                  ) : (
                    <p className="italic text-ink-400">Content body is empty. Type in the editor to view preview.</p>
                  )}
                </div>

                <div className="mt-12 flex justify-end gap-3 border-t border-ink-200 pt-6">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("edit")}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Content
                  </Button>
                  <Button type="button" variant="primary" onClick={handleSubmit} withArrow>
                    Publish Post Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
