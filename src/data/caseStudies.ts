export interface CaseStudy {
  slug: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  image: string;
  services: string[];
  context: string;
  challenge: string;
  approach: string[];
  outcome: string[];
  lessons: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "regional-contractor-iso-45001-readiness",
    client: "A regional civil engineering contractor",
    sector: "Construction",
    title: "Preparing a Multi-Site Contractor for ISO 45001 Certification",
    summary:
      "Independent internal audit and targeted training programme supporting first-time ISO 45001 certification across four active construction sites.",
    image: "/images/case-study-1.jpg",
    services: ["internal-audits-certification-readiness", "hse-esg-training"],
    context:
      "A regional civil engineering contractor operating across four active construction sites was pursuing ISO 45001 certification for the first time, driven by client pre-qualification requirements on a major public infrastructure tender.",
    challenge:
      "The contractor had existing safety procedures in place but limited experience of formal ISO management system requirements. Safety practice varied noticeably between site teams, and there was no established internal audit process to identify gaps before external certification assessment.",
    approach: [
      "Conducted a structured gap analysis against ISO 45001 requirements across all four sites",
      "Delivered an independent internal audit, including document review, site visits and worker interviews",
      "Identified and prioritised non-conformities with a clear corrective action plan and realistic timelines",
      "Designed and delivered targeted HSE training for site supervisors and safety representatives",
      "Supported management review preparation ahead of the external certification audit",
    ],
    outcome: [
      "The organisation achieved ISO 45001 certification on its first external assessment",
      "Site-level safety practice consistency improved measurably across all four locations",
      "Supervisors reported greater confidence in managing safety documentation and reporting",
      "The client secured pre-qualification for the target infrastructure tender",
    ],
    lessons:
      "Early, independent internal audit consistently proves to be the single highest-value step in certification readiness, giving organisations enough time to make meaningful corrective changes before external assessment rather than reactive fixes under time pressure.",
  },
  {
    slug: "manufacturer-esg-environmental-management",
    client: "A mid-sized industrial manufacturer",
    sector: "Manufacturing",
    title: "Building Credible Environmental Management for a Growing Manufacturer",
    summary:
      "ISO 14001 implementation and ESG reporting foundations supporting a manufacturer's response to increasing client sustainability requirements.",
    image: "/images/case-study-2.jpg",
    services: ["esg-sustainability-consulting", "internal-audits-certification-readiness"],
    context:
      "A mid-sized industrial manufacturer faced growing pressure from key clients to demonstrate credible environmental management and sustainability performance as part of ongoing supplier assessments.",
    challenge:
      "The organisation had informal environmental practices but no certified environmental management system, and no structured process for collecting or reporting sustainability data. Client questionnaires were being answered inconsistently across departments.",
    approach: [
      "Assessed current environmental practices and data maturity against ISO 14001 requirements",
      "Designed and implemented an environmental management system tailored to manufacturing operations",
      "Established structured data collection processes for energy, waste and emissions reporting",
      "Conducted an independent internal audit ahead of external certification",
      "Developed a consistent internal process for responding to client ESG and sustainability questionnaires",
    ],
    outcome: [
      "The organisation achieved ISO 14001 certification within the planned programme timeline",
      "Sustainability data reporting became consistent and centrally managed for the first time",
      "Client questionnaire responses became standardised, reducing administrative burden significantly",
      "Environmental performance became a documented, evidenced part of client relationship discussions",
    ],
    lessons:
      "Organisations under pressure to demonstrate ESG credentials achieve far more sustainable results by first investing in operational environmental management and data discipline, rather than starting with external reporting or messaging.",
  },
];

export const getCaseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
