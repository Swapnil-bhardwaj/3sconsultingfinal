import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Camera, UploadCloud, Calendar, User, ZoomIn } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Badge from "../ui/Badge";
import Reveal from "../ui/Reveal";
import { GalleryItem } from "../../data/gallery";
import { getAllGalleryItems } from "../../utils/galleryStorage";

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    setItems(getAllGalleryItems());
    const handleStorage = () => setItems(getAllGalleryItems());
    window.addEventListener("gallery_storage", handleStorage);
    return () => window.removeEventListener("gallery_storage", handleStorage);
  }, []);

  const featured = items[0];
  const rest = items.slice(1, 4);

  return (
    <section className="py-24 lg:py-32 border-t border-ink-200 bg-paper-dim">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Gallery & Highlights"
            title="Training Masterclasses, Publications & Candidate Feedback"
            description="A visual look into our live online training sessions, published sustainability books, and client engagements."
          />
          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-800 px-5 py-2.5 text-xs font-bold text-white shadow-soft transition-all hover:bg-teal-900"
            >
              <Camera className="h-3.5 w-3.5" />
              View Full Gallery &amp; Upload
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {featured && (
            <Reveal className="lg:col-span-7">
              <Link to="/gallery" className="group block h-full rounded-2xl border border-ink-200 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-lift">
                <div className="relative overflow-hidden rounded-xl bg-ink-950 aspect-16/10">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge tone="teal">{featured.badge || featured.category}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-ink-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-ink-950 shadow-md">
                      <ZoomIn className="h-4 w-4 text-teal-800" /> View in Gallery
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">{featured.category}</span>
                  <h3 className="mt-2 text-2xl font-bold leading-snug text-ink-950 transition-colors group-hover:text-teal-800">
                    {featured.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600 line-clamp-2">{featured.caption}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-ink-500 border-t border-ink-100 pt-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-teal-700" /> {featured.date}</span>
                    {featured.author && <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-teal-700" /> {featured.author}</span>}
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((item, i) => (
              <Reveal key={item.id} delay={(i + 1) * 100}>
                <Link
                  to="/gallery"
                  className="group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-ink-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-900">
                      {item.category}
                    </span>
                    <h4 className="mt-1 text-sm font-bold leading-snug text-ink-950 transition-colors group-hover:text-teal-800 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-ink-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-teal-600" /> {item.date}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}

            <div className="rounded-2xl border border-teal-900/10 bg-teal-900 p-6 text-white text-center shadow-soft">
              <UploadCloud className="mx-auto h-8 w-8 text-teal-300 mb-2" />
              <h4 className="text-sm font-bold">Have a photo to share?</h4>
              <p className="mt-1 text-xs text-ink-200">Upload photos from site audits, trainings, or certificates.</p>
              <Link
                to="/gallery"
                className="mt-3.5 inline-block rounded-xl bg-white px-4 py-2 text-xs font-bold text-teal-950 hover:bg-teal-50"
              >
                Upload Photo Now →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
