import { GalleryItem, seedGalleryItems } from "../data/gallery";
import { sanitizeText, isSafeUrl } from "./security";

const GALLERY_STORAGE_KEY = "3sconsulting_gallery_v1";

export function getStoredCustomGallery(): GalleryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading custom gallery from storage", err);
    return [];
  }
}

export function getAllGalleryItems(): GalleryItem[] {
  const custom = getStoredCustomGallery();
  const customIds = new Set(custom.map((c) => c.id));
  const remainingSeeds = seedGalleryItems.filter((s) => !customIds.has(s.id));
  // Return custom uploads first, then seed items
  return [...custom, ...remainingSeeds];
}

export function saveGalleryItem(input: {
  title: string;
  category: GalleryItem["category"];
  image: string;
  caption: string;
  author?: string;
  tags?: string[];
}): GalleryItem {
  const custom = getStoredCustomGallery();
  const cleanTitle = sanitizeText(input.title);
  const cleanCaption = sanitizeText(input.caption);
  const cleanAuthor = sanitizeText(input.author || "P.V Sharma");
  const cleanTags = (input.tags || [input.category]).map((t) => sanitizeText(t)).filter(Boolean);

  const rawImage = input.image.trim();
  const safeImage = isSafeUrl(rawImage) || rawImage.startsWith("data:image/") ? rawImage : "/images/who-we-are.jpg";

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const newItem: GalleryItem = {
    id: `custom-photo-${Date.now()}`,
    title: cleanTitle || "Uploaded Gallery Photo",
    category: input.category,
    image: safeImage,
    caption: cleanCaption || cleanTitle,
    date: dateStr,
    badge: "User Upload",
    author: cleanAuthor,
    tags: cleanTags.length > 0 ? cleanTags : [input.category],
    isCustom: true,
    createdAt: Date.now(),
  };

  const updated = [newItem, ...custom];
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("gallery_storage"));
  } catch (err) {
    console.error("Error saving gallery photo to storage", err);
  }

  return newItem;
}

export function deleteGalleryItem(id: string): boolean {
  try {
    const custom = getStoredCustomGallery();
    const updated = custom.filter((item) => item.id !== id);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("gallery_storage"));
    return true;
  } catch (err) {
    console.error("Error deleting gallery photo", err);
    return false;
  }
}

export function resetGalleryToDefaults(): void {
  try {
    localStorage.removeItem(GALLERY_STORAGE_KEY);
    window.dispatchEvent(new Event("gallery_storage"));
  } catch (err) {
    console.error("Error resetting gallery", err);
  }
}
