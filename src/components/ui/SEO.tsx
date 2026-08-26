import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  author?: string;
  schema?: Record<string, any>;
}

export default function SEO({
  title,
  description = "3Sconsulting — Leading Safety, Security and Sustainability in Business. International consulting, NEBOSH study materials, HSE audits, ISO certification, and ESG advisory by P.V Sharma.",
  keywords = [
    "3Sconsulting",
    "P.V Sharma",
    "Safety Consulting",
    "NEBOSH IDip Study Material",
    "ISO 45001 Certification",
    "ISO 14001",
    "ISO 31000",
    "ESG Sustainability",
    "HSE Audits",
    "Workplace Health and Safety",
  ],
  canonicalUrl,
  ogImage = "/images/logo.png",
  ogType = "website",
  publishedTime,
  author = "P.V Sharma",
  schema,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const siteTitle = "3Sconsulting | Safety, Security & Sustainability";
    document.title = title ? `${title} | 3Sconsulting` : siteTitle;

    // 2. Helper to set/update meta tags
    const setMeta = (attr: "name" | "property", key: string, value: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    // 3. Standard Metas
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords.join(", "));
    setMeta("name", "author", author);

    // 4. Open Graph Metas
    setMeta("property", "og:title", title ? `${title} | 3Sconsulting` : siteTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", "3Sconsulting");

    if (canonicalUrl) {
      setMeta("property", "og:url", canonicalUrl);
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonicalUrl);
    }

    if (publishedTime) {
      setMeta("property", "article:published_time", publishedTime);
      setMeta("property", "article:author", author);
    }

    // 5. Twitter Metas
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title ? `${title} | 3Sconsulting` : siteTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // 6. JSON-LD Schema.org
    let scriptTag = document.getElementById("json-ld-schema") as HTMLScriptElement | null;
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "json-ld-schema";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, publishedTime, author, schema]);

  return null;
}
