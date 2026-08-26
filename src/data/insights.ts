export interface Author {
  name: string;
  role: string;
  bio: string;
}

export interface Article {
  slug: string;
  category: "Safety" | "Security" | "Sustainability" | "Governance";
  title: string;
  excerpt: string;
  image: string;
  author: Author;
  publishedDate: string;
  updatedDate?: string;
  readingTime: string;
  featured?: boolean;
  intro: string;
  content: { heading: string; body: string[] }[];
  callout?: { title: string; body: string };
  relatedServices: string[];
}

export const pvSharma: Author = {
  name: "P.V Sharma",
  role: "Founder & Principal Consultant",
  bio: "P.V Sharma leads 3Sconsulting, advising organisations across industries on occupational health & safety strategy, ISO certification readiness, enterprise risk management, and ESG sustainability with decades of hands-on expertise.",
};

export const articles: Article[] = [
  {
    slug: "building-a-genuine-safety-culture",
    category: "Safety",
    title: "Building a Genuine Safety Culture, Not Just a Safety Policy",
    excerpt:
      "Why policies alone rarely change behaviour, and what it actually takes to embed a lasting safety culture across a workforce.",
    image: "/images/insight-safety-culture.jpg",
    author: pvSharma,
    publishedDate: "14 January 2025",
    updatedDate: "2 June 2025",
    readingTime: "7 min read",
    featured: true,
    intro:
      "Most organisations have a safety policy. Far fewer have a genuine safety culture. The difference between the two determines whether safety improves in practice, or simply looks compliant on paper.",
    content: [
      {
        heading: "The gap between policy and practice",
        body: [
          "A well-written safety policy is a necessary starting point, but it is not, on its own, a safety culture. Culture is what people do when no one is watching — the decisions made on-site, under time pressure, without a supervisor present.",
          "We regularly see organisations with comprehensive documentation and mature-looking management systems that still experience preventable incidents. The common thread is usually a disconnect between what the policy says and what is genuinely rewarded, modelled and reinforced day to day.",
        ],
      },
      {
        heading: "Leadership visibility matters more than most realise",
        body: [
          "Workforces read leadership behaviour closely. When senior leaders visibly prioritise safety — attending site walks, asking genuine questions, responding constructively to reported concerns — it signals that safety is a real priority rather than a compliance exercise.",
          "Conversely, when production targets are consistently prioritised over reported safety concerns, even subtly, workers notice and adjust their own behaviour accordingly.",
        ],
      },
      {
        heading: "Practical steps toward a stronger culture",
        body: [
          "Effective culture change typically combines three elements: structured training that builds genuine competency (not tick-box completion), visible and consistent leadership behaviour, and systems that make it easy — and safe — to report concerns without fear of blame.",
          "None of these elements work in isolation. A strong training programme without leadership reinforcement fades quickly. Visible leadership without practical systems creates frustration when concerns raised are not acted upon.",
        ],
      },
    ],
    callout: {
      title: "Key insight",
      body: "Safety culture is built through consistent, small, visible decisions over time — not through a single policy document or annual training event.",
    },
    relatedServices: ["hse-esg-training", "internal-audits-certification-readiness"],
  },
  {
    slug: "esg-reporting-beyond-the-checkbox",
    category: "Sustainability",
    title: "ESG Reporting: Moving Beyond the Checkbox Exercise",
    excerpt:
      "Clients and investors are asking sharper questions about ESG performance. Here's how to build reporting that stands up to scrutiny.",
    image: "/images/insight-esg-reporting.jpg",
    author: pvSharma,
    publishedDate: "3 March 2025",
    readingTime: "6 min read",
    featured: false,
    intro:
      "ESG reporting has moved rapidly from a voluntary, reputational exercise to an operational and commercial requirement. Yet many organisations still treat it as an annual reporting task rather than an ongoing management discipline.",
    content: [
      {
        heading: "Why credibility now matters more than volume",
        body: [
          "A decade ago, sustainability reporting was largely about visibility — showing that an organisation was engaged with environmental and social issues. Today, clients, investors and regulators are asking for evidence: measurable targets, verifiable data and demonstrable governance.",
          "Reports built primarily around narrative and intention, without underlying data discipline, increasingly attract scrutiny rather than credit.",
        ],
      },
      {
        heading: "Building the data foundation first",
        body: [
          "Before an organisation can report credibly, it needs reliable underlying data — energy consumption, waste, emissions, supply chain information. Many ESG programmes stall because this foundational data work is skipped in favour of writing the report itself.",
          "We typically recommend organisations invest in data governance and collection processes before finalising external reporting commitments, to avoid setting unachievable targets.",
        ],
      },
      {
        heading: "Aligning to ISO 14001 for operational credibility",
        body: [
          "ISO 14001 certification provides a structured, externally verified foundation for environmental management that materially strengthens the credibility of broader ESG reporting. It demonstrates that environmental management is a genuine operational discipline, not solely a reporting exercise.",
        ],
      },
    ],
    callout: {
      title: "Key insight",
      body: "Credible ESG reporting starts with disciplined internal data and governance — not with the report itself.",
    },
    relatedServices: ["esg-sustainability-consulting", "internal-audits-certification-readiness"],
  },
  {
    slug: "supply-chain-resilience-in-uncertain-times",
    category: "Security",
    title: "Supply Chain Resilience in an Era of Persistent Disruption",
    excerpt:
      "Supply chain risk is no longer an occasional event to plan for — it's a constant operating condition. Here's how leading organisations are responding.",
    image: "/images/insight-risk-resilience.jpg",
    author: pvSharma,
    publishedDate: "22 April 2025",
    readingTime: "8 min read",
    featured: false,
    intro:
      "The last several years have made clear that supply chain disruption is not an occasional anomaly to be managed as an exception — it is a persistent operating condition that requires structural resilience.",
    content: [
      {
        heading: "From contingency planning to structural resilience",
        body: [
          "Traditional business continuity planning often assumed a return to 'normal operations' after a defined disruption. Organisations now need resilience that assumes ongoing, overlapping disruptions — from geopolitical events to extreme weather to supplier failure.",
          "This requires a shift from static contingency plans toward dynamic risk monitoring and diversified supplier relationships.",
        ],
      },
      {
        heading: "Visibility is the foundation of resilience",
        body: [
          "Many organisations have strong visibility of tier-one suppliers but limited insight into tier-two and tier-three risk exposure. A structured third-party risk assessment process, aligned to ISO 31000 principles, is essential to understand where genuine vulnerability sits.",
        ],
      },
      {
        heading: "Building resilience without excessive cost",
        body: [
          "Resilience does not require eliminating all risk — that is neither achievable nor commercially sensible. It requires understanding which risks genuinely threaten continuity of operations, and investing proportionately in mitigation for those specific exposures.",
        ],
      },
    ],
    callout: {
      title: "Key insight",
      body: "Resilience today means designing for continuous, overlapping disruption — not planning for a single, discrete event.",
    },
    relatedServices: ["risk-management", "custom-consulting-projects"],
  },
  {
    slug: "iso-45001-common-implementation-pitfalls",
    category: "Safety",
    title: "ISO 45001: Common Implementation Pitfalls We See in Practice",
    excerpt:
      "Certification is achievable for almost any organisation — but several recurring mistakes slow the process down. Here's what to avoid.",
    image: "/images/insight-safety-culture.jpg",
    author: pvSharma,
    publishedDate: "9 September 2024",
    readingTime: "5 min read",
    featured: false,
    intro:
      "ISO 45001 provides a robust, internationally recognised framework for occupational health and safety management. Yet many organisations encounter the same avoidable pitfalls during implementation.",
    content: [
      {
        heading: "Treating documentation as the end goal",
        body: [
          "The most common pitfall is focusing implementation effort almost entirely on documentation, at the expense of embedding practical operational change. Auditors look for evidence that the system is genuinely in use, not simply that procedures exist on paper.",
        ],
      },
      {
        heading: "Underestimating worker consultation requirements",
        body: [
          "ISO 45001 places strong emphasis on worker participation and consultation. Organisations that treat this as a formality, rather than building genuine mechanisms for worker input, frequently encounter non-conformities during certification audits.",
        ],
      },
      {
        heading: "Leaving internal audit until too late",
        body: [
          "A thorough internal audit, conducted independently and with sufficient time before the external assessment, consistently improves first-time certification success. Leaving this step until shortly before the external audit rarely allows enough time for meaningful corrective action.",
        ],
      },
    ],
    relatedServices: ["internal-audits-certification-readiness", "hse-esg-training"],
  },
];

export const getArticleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const categories = ["All", "Safety", "Security", "Sustainability", "Governance"] as const;
