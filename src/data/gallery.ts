export interface GalleryItem {
  id: string;
  title: string;
  category: "Training & Masterclasses" | "Publications & Books" | "Frameworks & Standards" | "Candidate Appreciations" | "Audits & Projects";
  image: string;
  caption: string;
  date: string;
  badge?: string;
  author?: string;
  tags: string[];
  isCustom?: boolean;
  createdAt?: number;
}

export const galleryCategories = [
  "All",
  "Training & Masterclasses",
  "Publications & Books",
  "Frameworks & Standards",
  "Candidate Appreciations",
  "Audits & Projects",
] as const;

export const seedGalleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "NEBOSH IDip Live Online Masterclass & Interactive Training",
    category: "Training & Masterclasses",
    image: "/images/gallery/gallery-training-session-1.png",
    caption:
      "Interactive preparatory masterclass led by Prakash Vir Sharma (P.V Sharma) covering NEBOSH International Diploma modules, risk control frameworks, and practical examination techniques with global participants.",
    date: "August 2025",
    badge: "Live Training",
    author: "P.V Sharma",
    tags: ["NEBOSH IDip", "Live Training", "HSE Capability", "P.V Sharma"],
    createdAt: 1756000000000,
  },
  {
    id: "gallery-2",
    title: "International HSE & ESG Capability Workshop Session",
    category: "Training & Masterclasses",
    image: "/images/gallery/gallery-training-session-2.png",
    caption:
      "Global virtual training session bringing together safety professionals and engineers across India, UAE, and international organizations for ISO standards and workplace hazard management.",
    date: "July 2025",
    badge: "Workshop",
    author: "P.V Sharma",
    tags: ["Global Workshop", "ISO Standards", "Safety Training", "Professional Development"],
    createdAt: 1754000000000,
  },
  {
    id: "gallery-3",
    title: "GRI Made Simple: Guide to Sustainability Reporting Success",
    category: "Publications & Books",
    image: "/images/gallery/gallery-gri-book-cover.png",
    caption:
      "Official book publication by Prakash Vir Sharma: 'GRI MADE SIMPLE — Your Step-by-Step Guide to Sustainability Reporting Success', providing practical blueprints for corporate ESG disclosures.",
    date: "Published 2024 / 2025",
    badge: "Official Book",
    author: "Prakash Vir Sharma",
    tags: ["GRI Standards", "ESG Reporting", "Sustainability Book", "P.V Sharma"],
    createdAt: 1752000000000,
  },
  {
    id: "gallery-4",
    title: "ESG Maturity Matrix in IWA 48:2024 Framework",
    category: "Frameworks & Standards",
    image: "/images/gallery/gallery-esg-maturity-matrix.png",
    caption:
      "Strategic roadmap illustrating organizational ESG maturity progression from Ad-hoc and Developing through Established, Advanced, to Leading/Transformational under IWA 48:2024 guidelines.",
    date: "2024 / 2025",
    badge: "Standard Framework",
    author: "3Sconsulting Advisory",
    tags: ["IWA 48:2024", "ESG Maturity", "Governance Matrix", "Sustainability Strategy"],
    createdAt: 1750000000000,
  },
  {
    id: "gallery-5",
    title: "Candidate Appreciations & Training Feedback Testimonials",
    category: "Candidate Appreciations",
    image: "/images/gallery/gallery-student-testimonials.png",
    caption:
      "Direct participant testimonials and feedback praising Prakash Sir (P.V Sharma) for thorough mentorship, engaging preparatory classes, and detailed real-world experience sharing.",
    date: "Recent Cohort",
    badge: "Testimonials",
    author: "Training Participants",
    tags: ["Testimonials", "Student Feedback", "Prakash Sir", "Training Excellence"],
    createdAt: 1748000000000,
  },
];
