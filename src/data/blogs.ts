export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Safety" | "Security" | "Sustainability" | "ISO & Compliance" | "Risk Advisory";
  author: string;
  authorRole: string;
  publishedDate: string;
  readingTime: string;
  coverImage: string;
  tags: string[];
  content: string;
  featured?: boolean;
  isCustom?: boolean;
  createdAt?: number;
}

export const blogCategories = [
  "All",
  "Safety",
  "Security",
  "Sustainability",
  "ISO & Compliance",
  "Risk Advisory",
] as const;

export const presetCoverImages = [
  { label: "Safety Culture & Audit", url: "/images/insight-safety-culture.jpg" },
  { label: "ESG & Sustainability", url: "/images/insight-esg-reporting.jpg" },
  { label: "Risk & Resilience", url: "/images/insight-risk-resilience.jpg" },
  { label: "Manufacturing & Industrial", url: "/images/industry-manufacturing.jpg" },
  { label: "Infrastructure & Engineering", url: "/images/industry-infrastructure.jpg" },
  { label: "Construction & Site Operations", url: "/images/industry-construction.jpg" },
  { label: "Supply Chain & Logistics", url: "/images/industry-supply-chain.jpg" },
];

export const seedBlogs: BlogPost[] = [
  {
    id: "blog-1",
    slug: "implementing-iso-45001-step-by-step-guide",
    title: "Implementing ISO 45001: Practical Step-by-Step Roadmap for Modern Enterprises",
    excerpt:
      "A pragmatic blueprint for achieving ISO 45001 occupational health and safety certification without overburdening operational teams with excessive bureaucracy.",
    category: "ISO & Compliance",
    author: "P.V Sharma",
    authorRole: "Founder & Principal Consultant",
    publishedDate: "18 January 2025",
    readingTime: "6 min read",
    coverImage: "/images/insight-safety-culture.jpg",
    tags: ["ISO 45001", "Occupational Health", "Safety Audit", "Risk Governance"],
    featured: true,
    createdAt: 1737158400000,
    content: `Occupational health and safety management is no longer merely a regulatory checkmark; it is a core pillar of operational excellence, employee wellbeing, and stakeholder trust. ISO 45001 provides the global benchmark for identifying hazards, controlling risks, and continuously elevating safety performance.

### 1. Leadership Commitment and Worker Consultation
The foundation of ISO 45001 is proactive leadership. Management must not simply approve safety manuals from a distance; they must actively demonstrate visible participation. Worker consultation is equally critical. Frontline employees understand daily operational realities better than anyone else, making their structured input indispensable during risk assessments.

### 2. Conducting a Genuine Gap Analysis
Before drafting new procedures, perform a baseline review against ISO 45001 clauses. Evaluate existing operating procedures, emergency preparedness measures, incident logging systems, and statutory compliance registries. Identify where actual workplace habits diverge from standard requirements.

### 3. Hazard Identification and Hierarchy of Controls
Shift the organization from reactive incident management to proactive hazard control. Apply the Hierarchy of Controls systematically:
- **Elimination**: Physically remove the hazard where possible.
- **Substitution**: Replace hazardous processes or materials with safer alternatives.
- **Engineering Controls**: Isolate workers from hazards via machine guards, ventilation, and physical barriers.
- **Administrative Controls**: Implement standard operating procedures, permit-to-work systems, and training.
- **PPE**: Provide appropriate personal protective equipment as the final line of defense.

### 4. Continuous Monitoring, Internal Audits, and Management Review
Establish measurable Key Performance Indicators (KPIs) such as Near-Miss Reporting frequency, hazard closure turnaround times, and audit findings resolution. A rigorous internal audit prior to the external certification audit ensures complete operational readiness.`,
  },
  {
    id: "blog-2",
    slug: "esg-integration-modern-corporate-governance",
    title: "ESG Integration: How Sustainability Drives Commercial Value and Risk Resilience",
    excerpt:
      "Discover how integrating environmental, social, and governance standards into core strategy strengthens supply chains, attracts capital, and protects long-term shareholder value.",
    category: "Sustainability",
    author: "P.V Sharma",
    authorRole: "Founder & Principal Consultant",
    publishedDate: "12 February 2025",
    readingTime: "7 min read",
    coverImage: "/images/insight-esg-reporting.jpg",
    tags: ["ESG", "Sustainability", "ISO 14001", "Corporate Governance"],
    featured: false,
    createdAt: 1739318400000,
    content: `Environmental, Social, and Governance (ESG) criteria have transformed from voluntary corporate responsibility talking points into rigorous operational requirements requested by investors, regulators, and international supply chain partners.

### Moving Beyond Glossy Annual Brochures
Credibility in ESG today demands verifiable data. Organizations must establish reliable baselines for Scope 1, Scope 2, and supply chain emissions, material waste streams, resource efficiency, and fair labor practices. Stakeholders quickly see through superficial claims; data integrity is paramount.

### Aligning ESG with Management Standards
Frameworks like ISO 14001 (Environmental Management) and ISO 50001 (Energy Management) provide the structural backbone required to execute ESG goals reliably. By embedding environmental metrics into standard operating procedures, sustainability becomes part of every manager's routine responsibility.

### The Financial and Strategic Upside
Enterprises that lead in ESG maturity benefit from lower cost of capital, reduced operational waste, elevated employee retention, and preferred vendor status in global procurement tenders.`,
  },
  {
    id: "blog-3",
    slug: "proactive-risk-mitigation-supply-chains",
    title: "Proactive Risk Mitigation: Strengthening Supply Chains in an Era of Persistent Disruption",
    excerpt:
      "How forward-thinking enterprises use ISO 31000 principles and multi-tier vendor audits to insulate critical operations from external disruptions.",
    category: "Risk Advisory",
    author: "P.V Sharma",
    authorRole: "Founder & Principal Consultant",
    publishedDate: "28 February 2025",
    readingTime: "5 min read",
    coverImage: "/images/insight-risk-resilience.jpg",
    tags: ["ISO 31000", "Risk Management", "Supply Chain", "Business Continuity"],
    featured: false,
    createdAt: 1740700800000,
    content: `Global supply chains continue to face compounding pressures: geopolitical tensions, fluctuating raw material supplies, regulatory shifts, and severe climatic events. Managing these exposures requires dynamic, data-backed risk assessment.

### Multi-Tier Risk Visibility
Most organizations maintain adequate oversight over Tier 1 suppliers. However, major disruptions frequently originate in Tier 2 or Tier 3 sub-tier suppliers. Implementing vendor qualification audits and continuous supplier risk matrices ensures early detection of vulnerabilities.

### Embedding ISO 31000 Risk Frameworks
Applying ISO 31000 guidelines enables companies to establish common risk criteria across departments. Rather than maintaining fragmented risk registers in isolation, leadership gains a consolidated view of operational, environmental, and financial exposures.

### Designing Resilience into Daily Operations
Resilience does not mean holding excessive inventory; it means cultivating supplier diversity, establishing clear dual-sourcing triggers, and testing business continuity plans regularly through realistic tabletop simulation exercises.`,
  },
  {
    id: "blog-4",
    slug: "behavioral-safety-transforming-compliance-culture",
    title: "Behavioral Safety: How to Transform Compliance into a Genuine Culture of Care",
    excerpt:
      "Rules and signage alone cannot guarantee safety. Explore behavioral safety techniques that empower employees to take personal ownership of workplace health.",
    category: "Safety",
    author: "P.V Sharma",
    authorRole: "Founder & Principal Consultant",
    publishedDate: "10 March 2025",
    readingTime: "5 min read",
    coverImage: "/images/industry-manufacturing.jpg",
    tags: ["Safety Culture", "Behavioral Safety", "Leadership", "Workplace Wellbeing"],
    featured: false,
    createdAt: 1741564800000,
    content: `Many organizations possess flawless written safety manuals and state-of-the-art PPE, yet still experience avoidable incidents. The missing link is almost always safety culture and behavioral psychology.

### Safety is What Happens When No One is Watching
A compliance-based approach relies on policing and enforcement. In contrast, a behavioral safety approach fosters shared ownership and psychological safety, where workers feel genuinely empowered to pause work if conditions are unsafe.

### Key Pillars of Behavioral Safety Transformation
1. **Just Reporting Culture**: Eliminate blame from incident and near-miss reporting. When reporting is rewarded, hidden hazards are surfaced before they turn into severe accidents.
2. **Peer-to-Peer Safety Observations**: Train team leaders and operators to conduct constructive peer observations that reinforce safe behaviors and collaboratively address at-risk habits.
3. **Leadership Walking the Talk**: When executives and site managers consistently wear full PPE, actively ask questions during site inspections, and follow up promptly on reported hazards, the entire workforce adopts the same mindset.`,
  },
];
