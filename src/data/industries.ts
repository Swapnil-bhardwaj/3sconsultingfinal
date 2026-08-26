export interface Industry {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  focusAreas: string[];
  relatedServices: string[];
}

export const industries: Industry[] = [
  {
    slug: "construction",
    name: "Construction",
    description:
      "Embedding safety culture and certification readiness across sites, contractors and supply chains.",
    longDescription:
      "Construction remains one of the highest-risk sectors for occupational safety and environmental compliance. We work with contractors, developers and site operators to build genuine safety culture, strengthen ISO 45001 and 14001 readiness, and manage the layered risk of multi-contractor sites.",
    image: "/images/industry-construction.jpg",
    focusAreas: [
      "Site safety culture and behavioural programmes",
      "ISO 45001 and 14001 certification readiness",
      "Contractor and subcontractor risk management",
      "Environmental management on active sites",
    ],
    relatedServices: ["hse-esg-training", "internal-audits-certification-readiness", "risk-management"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "Strengthening occupational safety, environmental management and ESG performance on the production floor.",
    longDescription:
      "Manufacturing organisations face constant pressure to balance productivity with safety, environmental compliance and increasing ESG scrutiny from clients and investors. We help manufacturers build management systems and training programmes that hold up under audit and daily operational pressure.",
    image: "/images/industry-manufacturing.jpg",
    focusAreas: [
      "ISO 45001 occupational safety management",
      "ISO 14001 environmental management",
      "ESG reporting and sustainability strategy",
      "Process safety and risk assessment",
    ],
    relatedServices: ["internal-audits-certification-readiness", "esg-sustainability-consulting", "hse-esg-training"],
  },
  {
    slug: "infrastructure",
    name: "Infrastructure",
    description:
      "Managing complex risk and resilience across large-scale, long-duration infrastructure programmes.",
    longDescription:
      "Infrastructure programmes carry long timelines, multiple stakeholders and significant public exposure. We support infrastructure owners and delivery partners with integrated risk management, resilience planning and sustainability advisory across the programme lifecycle.",
    image: "/images/industry-infrastructure.jpg",
    focusAreas: [
      "Enterprise and programme risk management",
      "Business continuity and resilience planning",
      "ISO 31000 risk frameworks",
      "Sustainability strategy for major programmes",
    ],
    relatedServices: ["risk-management", "custom-consulting-projects", "esg-sustainability-consulting"],
  },
  {
    slug: "supply-chain",
    name: "Supply Chain",
    description:
      "Improving visibility, resilience and sustainability across multi-tier supply chains.",
    longDescription:
      "Modern supply chains span multiple geographies, tiers and risk profiles. We help organisations gain visibility of third-party risk, build more resilient logistics operations and develop credible, sustainable supply chain practices that meet client and regulatory expectations.",
    image: "/images/industry-supply-chain.jpg",
    focusAreas: [
      "Third-party and supplier risk assessment",
      "Sustainable supply chain design",
      "Business continuity for logistics operations",
      "ESG due diligence across supplier networks",
    ],
    relatedServices: ["risk-management", "esg-sustainability-consulting", "custom-consulting-projects"],
  },
];

export const getIndustryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
