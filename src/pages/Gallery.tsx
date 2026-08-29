import { useEffect, useMemo, useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  Image as ImageIcon,
  UploadCloud,
  Search,
  X,
  ZoomIn,
  Trash2,
  Calendar,
  User,
  Tag,
  Plus,
  Sparkles,
  CheckCircle2,
  Download,
} from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Reveal from "../components/ui/Reveal";
import SEO from "../components/ui/SEO";
import { cn } from "../utils/cn";
import { galleryCategories, GalleryItem } from "../data/gallery";
import { getAllGalleryItems, saveGalleryItem, deleteGalleryItem } from "../utils/galleryStorage";

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState<GalleryItem["category"]>("Training & Masterclasses");
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadAuthor, setUploadAuthor] = useState("P.V Sharma");
  const [uploadTags, setUploadTags] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const refreshGallery = () => {
    setItems(getAllGalleryItems());
  };

  useEffect(() => {
    refreshGallery();
    window.addEventListener("gallery_storage", refreshGallery);
    return () => window.removeEventListener("gallery_storage", refreshGallery);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category === activeCategory ||
        (activeCategory === "User Uploads" && item.isCustom);
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.caption.toLowerCase().includes(q) ||
        (item.author && item.author.toLowerCase().includes(q)) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [items, activeCategory, query]);

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size exceeds 5MB. Please choose a smaller image.");
      return;
    }

    setUploadError("");
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      setUploadError("Please select an image to upload.");
      return;
    }

    if (!uploadTitle.trim()) {
      setUploadError("Please provide a title for the photo.");
      return;
    }

    const tagList = uploadTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    saveGalleryItem({
      title: uploadTitle.trim(),
      category: uploadCategory,
      image: imagePreview,
      caption: uploadCaption.trim() || uploadTitle.trim(),
      author: uploadAuthor.trim() || "P.V Sharma",
      tags: tagList,
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadOpen(false);
      // Reset form
      setUploadTitle("");
      setUploadCaption("");
      setImagePreview(null);
      setUploadTags("");
      setUploadError("");
    }, 1200);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this uploaded photo?")) {
      deleteGalleryItem(id);
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  return (
    <>
      <SEO
        title="Photo Gallery | Training Sessions, Books & Frameworks"
        description="Explore 3Sconsulting gallery: live NEBOSH IDip masterclasses, sustainability book publications by Prakash Vir Sharma, IWA 48:2024 ESG maturity matrix, and candidate testimonials."
        canonicalUrl="https://www.3sconsulting.com/gallery"
        schema={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "3Sconsulting Professional Photo Gallery",
          description: "Visual showcase of live training workshops, publications, and client achievements.",
          provider: {
            "@type": "Organization",
            name: "3Sconsulting",
            url: "https://www.3sconsulting.com",
          },
        }}
      />

      <PageHero
        eyebrow="Media & Highlights"
        title="Visual Showcase: Masterclasses, Publications & Milestones"
        description="Browse photos from our live training sessions, published works by Prakash Vir Sharma, ESG maturity frameworks, and student feedback."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-6 py-3.5 text-sm font-bold text-teal-950 shadow-md transition-all hover:bg-white hover:scale-105 cursor-pointer"
          >
            <UploadCloud className="h-4.5 w-4.5" />
            Upload New Photo
          </button>

          <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm sm:w-auto">
            <Search className="h-4.5 w-4.5 shrink-0 text-teal-200" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gallery photos…"
              aria-label="Search gallery"
              className="w-full bg-transparent text-sm text-white placeholder:text-ink-300 focus:outline-none"
            />
          </div>
        </div>
      </PageHero>

      {/* Gallery Filter Navigation */}
      <section className="border-b border-ink-200 bg-white py-6">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer",
                    activeCategory === cat
                      ? "bg-teal-800 text-white shadow-xs"
                      : "bg-paper-dim text-ink-700 hover:bg-teal-50 hover:text-teal-800"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-xs font-semibold text-ink-500">
              Showing {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-20">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-300 bg-white p-14 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-ink-400" />
              <h3 className="mt-4 text-lg font-bold text-ink-950">No photos found</h3>
              <p className="mt-1 text-sm text-ink-600">
                Try searching for a different term or upload a new photo to this category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                className="mt-5 text-sm font-bold text-teal-800 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, idx) => (
                <Reveal key={item.id} delay={(idx % 3) * 80}>
                  <div
                    onClick={() => setSelectedItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedItem(item);
                    }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-ink-950">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink-950 backdrop-blur-xs">
                          <ZoomIn className="h-3.5 w-3.5 text-teal-800" /> Click to Expand
                        </span>
                      </div>
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-teal-900/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs">
                          {item.badge || item.category}
                        </span>
                        {item.isCustom && (
                          <span className="rounded-md bg-teal-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            User Upload
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <p className="text-xs font-semibold text-teal-700">{item.category}</p>
                        <h3 className="mt-1.5 text-lg font-bold leading-snug text-ink-950 group-hover:text-teal-800 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-600">
                          {item.caption}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between text-xs text-ink-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-teal-700" /> {item.date}
                        </span>
                        {item.author && (
                          <span className="flex items-center gap-1 font-medium text-ink-700">
                            <User className="h-3.5 w-3.5 text-teal-700" /> {item.author}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 rounded-full p-2 text-ink-500 hover:bg-ink-100 hover:text-ink-900 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="teal">{selectedItem.category}</Badge>
              {selectedItem.badge && (
                <span className="rounded bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-900">
                  {selectedItem.badge}
                </span>
              )}
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-ink-950 leading-tight">
              {selectedItem.title}
            </h2>

            {/* High-res Image */}
            <div className="my-5 overflow-hidden rounded-2xl border border-ink-200 bg-ink-950 max-h-[520px] flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[520px] w-full object-contain"
              />
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5 text-ink-800">
              <p className="text-sm sm:text-base leading-relaxed">{selectedItem.caption}</p>
            </div>

            {/* Tags & Metadata */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-ink-100 pt-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-500">Tags:</span>
                {selectedItem.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-md bg-paper-dim px-2.5 py-1 text-xs font-semibold text-ink-700"
                  >
                    <Tag className="h-3 w-3 text-teal-700" /> {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {selectedItem.isCustom && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedItem.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" /> Delete Photo
                  </button>
                )}
                <a
                  href={selectedItem.image}
                  download={`3sconsulting-${selectedItem.id}.png`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-teal-800 px-5 py-2 text-xs font-bold text-white hover:bg-teal-900 shadow-sm"
                >
                  <Download className="h-4 w-4" /> Download Image
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {isUploadOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsUploadOpen(false)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-5 right-5 rounded-full p-2 text-ink-500 hover:bg-ink-100 cursor-pointer"
              aria-label="Close upload modal"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-teal-800">
                <UploadCloud className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-bold text-ink-950">Upload Photo to Gallery</h2>
            </div>
            <p className="mt-1 text-sm text-ink-600">
              Add photos from recent training sessions, site audits, certifications, or workshops.
            </p>

            {uploadSuccess ? (
              <div className="my-10 flex flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-ink-950">Photo Uploaded Successfully!</h3>
                <p className="mt-1 text-sm text-ink-600">Your photo is now active in the gallery.</p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="mt-6 space-y-5">
                {uploadError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
                    {uploadError}
                  </div>
                )}

                {/* File Drop Area */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-700">
                    Select Image <span className="text-teal-700">*</span>
                  </label>
                  <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-300 bg-paper-dim p-6 text-center hover:border-teal-500">
                    {imagePreview ? (
                      <div className="relative w-full">
                        <img
                          src={imagePreview}
                          alt="Upload preview"
                          className="max-h-60 mx-auto rounded-xl object-contain shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="mt-3 inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-200"
                        >
                          <X className="h-3.5 w-3.5" /> Remove Image
                        </button>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="h-10 w-10 text-teal-700 mb-2" />
                        <p className="text-sm font-bold text-ink-900">Click or drag an image here</p>
                        <p className="text-xs text-ink-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          required
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
                      Photo Title <span className="text-teal-700">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g. Masterclass on ISO 45001"
                      className="h-11 w-full rounded-xl border border-ink-300 bg-white px-4 text-sm text-ink-900 focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
                      Category <span className="text-teal-700">*</span>
                    </label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value as GalleryItem["category"])}
                      className="h-11 w-full rounded-xl border border-ink-300 bg-white px-4 text-sm text-ink-900 focus:border-teal-600"
                    >
                      <option value="Training & Masterclasses">Training & Masterclasses</option>
                      <option value="Publications & Books">Publications & Books</option>
                      <option value="Frameworks & Standards">Frameworks & Standards</option>
                      <option value="Candidate Appreciations">Candidate Appreciations</option>
                      <option value="Audits & Projects">Audits & Projects</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
                    Caption / Description
                  </label>
                  <textarea
                    rows={3}
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    placeholder="Brief description of the event, session, or achievement…"
                    className="w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-teal-600"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
                      Author / Presenter
                    </label>
                    <input
                      type="text"
                      value={uploadAuthor}
                      onChange={(e) => setUploadAuthor(e.target.value)}
                      placeholder="e.g. P.V Sharma"
                      className="h-11 w-full rounded-xl border border-ink-300 bg-white px-4 text-sm text-ink-900 focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={uploadTags}
                      onChange={(e) => setUploadTags(e.target.value)}
                      placeholder="e.g. Training, Masterclass, Audit"
                      className="h-11 w-full rounded-xl border border-ink-300 bg-white px-4 text-sm text-ink-900 focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-100">
                  <button
                    type="button"
                    onClick={() => setIsUploadOpen(false)}
                    className="rounded-xl border border-ink-300 px-5 py-2.5 text-xs font-bold text-ink-700 hover:bg-ink-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-teal-900 shadow-sm cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Save to Gallery
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
