import { BlogPost, seedBlogs } from "../data/blogs";

const STORAGE_KEY = "3sconsulting_blogs_v1";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

export function getStoredCustomBlogs(): BlogPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading custom blogs from storage", err);
    return [];
  }
}

export function getAllBlogs(): BlogPost[] {
  const customBlogs = getStoredCustomBlogs();
  // Filter out any seed blogs that might have been updated or merged
  const customSlugs = new Set(customBlogs.map((b) => b.slug));
  const remainingSeeds = seedBlogs.filter((b) => !customSlugs.has(b.slug));
  
  // Custom blogs first, sorted by creation date or publication date
  return [...customBlogs, ...remainingSeeds];
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const all = getAllBlogs();
  return all.find((b) => b.slug === slug || b.id === slug);
}

import { sanitizeText, isSafeUrl } from "./security";

export function saveBlogPost(input: {
  title: string;
  excerpt: string;
  category: BlogPost["category"];
  author?: string;
  authorRole?: string;
  coverImage?: string;
  tags?: string[];
  content: string;
}): BlogPost {
  const customBlogs = getStoredCustomBlogs();
  const cleanTitle = sanitizeText(input.title);
  const baseSlug = slugify(cleanTitle) || `post-${Date.now()}`;
  let uniqueSlug = baseSlug;
  let counter = 1;

  const existingSlugs = new Set(getAllBlogs().map((b) => b.slug));
  while (existingSlugs.has(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rawImage = input.coverImage?.trim() || "/images/insight-safety-culture.jpg";
  const safeImage = isSafeUrl(rawImage) ? rawImage : "/images/insight-safety-culture.jpg";

  const cleanContent = sanitizeText(input.content);
  const cleanExcerpt = sanitizeText(input.excerpt) ||
    cleanContent.slice(0, 160).replace(/[#*`_]/g, "").trim() + "...";

  const cleanAuthor = sanitizeText(input.author || "P.V Sharma");
  const cleanAuthorRole = sanitizeText(input.authorRole || "Founder & Principal Consultant");
  const cleanTags = (input.tags || [input.category]).map((t) => sanitizeText(t)).filter(Boolean);

  const newPost: BlogPost = {
    id: `custom-blog-${Date.now()}`,
    slug: uniqueSlug,
    title: cleanTitle,
    excerpt: cleanExcerpt,
    category: input.category,
    author: cleanAuthor,
    authorRole: cleanAuthorRole,
    publishedDate: dateStr,
    readingTime: calculateReadingTime(cleanContent),
    coverImage: safeImage,
    tags: cleanTags.length > 0 ? cleanTags : [input.category],
    content: cleanContent,
    isCustom: true,
    createdAt: Date.now(),
  };

  const updated = [newPost, ...customBlogs];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Error saving blog to storage", err);
  }

  return newPost;
}

export function deleteBlogPost(id: string): boolean {
  try {
    const customBlogs = getStoredCustomBlogs();
    const updated = customBlogs.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    return true;
  } catch (err) {
    console.error("Error deleting blog", err);
    return false;
  }
}

export function resetBlogsToDefaults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Error resetting blogs", err);
  }
}
