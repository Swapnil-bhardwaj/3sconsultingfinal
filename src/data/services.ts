import type { LucideIcon } from "lucide-react";
import {
  GraduationCap,
  ClipboardCheck,
  ShieldAlert,
  Leaf,
  Settings2,
  BookOpenCheck,
} from "lucide-react";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  number: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  category: "Training" | "Audit & Readiness" | "Consulting";
  heroDescription: string;
  overview: string;
  challenges: string[];
  expertise: string[];
  howWeHelp: { title: string; description: string }[];
  approach: { step: string; title: string; description: string }[];
  benefits: string[];
  industries: string[];
  faqs: ServiceFAQ[];
}

export const services: Service[] = [
  {
    slug: "hse-esg-training",
    number: "01",
    icon: GraduationCap,
    title: "HSE & ESG Training",
    shortDescription:
      "Practical, accredited training that builds safety culture and ESG literacy across every level of your organisation.",
    category: "Training",
    heroDescription:
      "Building capability from the boardroom to the frontline through structured, accredited HSE and ESG learning programmes.",
    overview:
      "Organisations are only as safe and sustainable as the people within them. Our HSE & ESG training programmes are designed to close capability gaps at every level, from frontline operatives to senior leadership, giving teams the practical knowledge and confidence to manage safety and sustainability responsibly, every day.",
    challenges: [
      "Inconsistent safety awareness across sites, teams and contractors",
      "Limited internal ESG literacy at leadership and operational level",
      "Difficulty demonstrating competency for audits and certification",
      "Training that is generic, outdated or disconnected from daily operations",
    ],
    expertise: [
      "CPD-certified HSE and ESG curriculum design",
      "ISO awareness training (45001, 14001, 31000, 9001)",
      "Behavioural safety culture programmes",
      "Sector-specific training for construction, manufacturing and infrastructure",
    ],
    howWeHelp: [
      { title: "Needs assessment", description: "We evaluate current competency levels and identify the specific gaps holding your teams back." },
      { title: "Tailored curriculum", description: "Programmes are built around your operations, regulatory context and risk profile — never off the shelf." },
      { title: "Accredited delivery", description: "Training is delivered on-site, virtually or blended, with CPD certification on completion." },
      { title: "Embedding & follow-up", description: "We support post-training reinforcement so learning translates into lasting behavioural change." },
    ],
    approach: [
      { step: "01", title: "Diagnose", description: "Audit existing training records, incident data and role requirements." },
      { step: "02", title: "Design", description: "Develop a curriculum aligned to your risk profile and certification goals." },
      { step: "03", title: "Deliver", description: "Facilitate engaging, practical sessions led by experienced practitioners." },
      { step: "04", title: "Sustain", description: "Provide toolkits, refreshers and competency tracking to embed change." },
    ],
    benefits: [
      "Reduced incident and near-miss frequency",
      "Stronger audit and certification readiness",
      "Improved employee confidence and engagement",
      "Demonstrable compliance evidence for regulators and clients",
    ],
    industries: ["Construction", "Manufacturing", "Infrastructure", "Supply Chain"],
    faqs: [
      { question: "Can training be delivered on-site internationally?", answer: "Yes. We deliver training on-site, virtually and in blended formats across the UK, US and internationally, adapting content to local regulatory requirements." },
      { question: "Is the training accredited?", answer: "Our programmes carry CPD certification, and we can align content to specific ISO standards and awarding body frameworks on request." },
      { question: "How long do programmes typically run?", answer: "Programme length depends on scope — from half-day awareness sessions to multi-week capability-building programmes for larger organisations." },
    ],
  },
  {
    slug: "internal-audits-certification-readiness",
    number: "02",
    icon: ClipboardCheck,
    title: "Internal Audits & Certification Readiness",
    shortDescription:
      "Independent internal audits that prepare your organisation for ISO 45001, 14001, 31000 and ESG certification with confidence.",
    category: "Audit & Readiness",
    heroDescription:
      "Rigorous, independent internal auditing that identifies gaps early and prepares your organisation for successful certification.",
    overview:
      "Certification bodies expect evidence, consistency and genuine management commitment. Our internal audit and readiness service gives your organisation an honest, independent view of where you stand against ISO 45001, ISO 14001, ISO 31000 and ESG frameworks, well before an external assessor arrives.",
    challenges: [
      "Uncertainty about readiness ahead of certification or surveillance audits",
      "Fragmented documentation and inconsistent management system evidence",
      "Non-conformities identified too late in the certification process",
      "Limited internal audit expertise or independence",
    ],
    expertise: [
      "ISO 45001 occupational health and safety systems",
      "ISO 14001 environmental management systems",
      "ISO 31000 risk management frameworks",
      "ESG assurance and reporting audits",
    ],
    howWeHelp: [
      { title: "Gap analysis", description: "We benchmark your current management systems against the relevant standard." },
      { title: "Independent internal audit", description: "A structured, evidence-based audit conducted by qualified lead auditors." },
      { title: "Corrective action planning", description: "Clear, prioritised recommendations with realistic timelines for closure." },
      { title: "Certification support", description: "Hands-on support through external audit stages, including management review preparation." },
    ],
    approach: [
      { step: "01", title: "Scope", description: "Define audit scope, standards and sites in collaboration with your team." },
      { step: "02", title: "Audit", description: "Conduct document review, site visits and stakeholder interviews." },
      { step: "03", title: "Report", description: "Deliver a clear findings report with graded non-conformities and observations." },
      { step: "04", title: "Close out", description: "Support implementation of corrective actions ahead of certification." },
    ],
    benefits: [
      "Higher first-time certification success rates",
      "Reduced risk of major non-conformities",
      "Stronger, more defensible management system documentation",
      "Increased confidence from clients, insurers and regulators",
    ],
    industries: ["Construction", "Manufacturing", "Infrastructure"],
    faqs: [
      { question: "Do you audit against multiple standards at once?", answer: "Yes, we routinely conduct integrated audits across ISO 45001, 14001 and 31000 to reduce disruption and duplication of effort." },
      { question: "Are your auditors independent of our organisation?", answer: "Yes. Independence is central to a credible internal audit — our auditors have no operational involvement in your business." },
      { question: "Can you support us through the external certification audit itself?", answer: "We can prepare documentation, brief your team and be available for support during external assessments where required." },
    ],
  },
  {
    slug: "risk-management",
    number: "03",
    icon: ShieldAlert,
    title: "Risk Management",
    shortDescription:
      "Enterprise and operational risk management that strengthens resilience, business continuity and supply chain security.",
    category: "Consulting",
    heroDescription:
      "Structured risk management that protects operations, people and supply chains from disruption.",
    overview:
      "Every organisation carries risk — the question is whether it is understood, prioritised and managed. We help leadership teams build practical, proportionate risk management frameworks that strengthen resilience across operations, security and supply chains.",
    challenges: [
      "Risk registers that exist on paper but are not embedded operationally",
      "Limited visibility of supply chain and third-party risk",
      "Weak business continuity and incident response planning",
      "Difficulty prioritising risk investment across competing demands",
    ],
    expertise: [
      "ISO 31000 risk management frameworks",
      "Business continuity and resilience planning",
      "Supply chain and third-party risk assessment",
      "Security risk and crisis management planning",
    ],
    howWeHelp: [
      { title: "Risk framework design", description: "Establish a proportionate risk governance structure aligned to ISO 31000." },
      { title: "Risk assessment", description: "Identify, assess and prioritise operational, security and supply chain risks." },
      { title: "Continuity planning", description: "Develop business continuity and incident response plans that are tested and practical." },
      { title: "Ongoing assurance", description: "Support periodic review cycles so risk management stays current." },
    ],
    approach: [
      { step: "01", title: "Map", description: "Map operational, security and supply chain risk exposure." },
      { step: "02", title: "Prioritise", description: "Score and prioritise risks by likelihood, impact and control maturity." },
      { step: "03", title: "Mitigate", description: "Design proportionate controls and continuity arrangements." },
      { step: "04", title: "Monitor", description: "Establish governance for ongoing risk review and reporting." },
    ],
    benefits: [
      "Improved resilience to operational disruption",
      "Greater visibility of supply chain vulnerabilities",
      "Stronger governance and board-level risk reporting",
      "Reduced insurance and financing risk premiums",
    ],
    industries: ["Supply Chain", "Manufacturing", "Infrastructure"],
    faqs: [
      { question: "Do you work with our existing risk register?", answer: "Yes, we typically build on existing frameworks rather than replacing them, strengthening structure and evidence rather than starting from zero." },
      { question: "Can you support crisis and incident response planning?", answer: "Yes, business continuity and incident response planning is a core part of our risk management service." },
      { question: "Is this suitable for multi-site or international operations?", answer: "Yes, our frameworks are designed to scale across multiple sites, geographies and supply chain tiers." },
    ],
  },
  {
    slug: "esg-sustainability-consulting",
    number: "04",
    icon: Leaf,
    title: "ESG & Sustainability Consulting",
    shortDescription:
      "Practical ESG strategy, environmental management and sustainable business advisory grounded in ISO 14001.",
    category: "Consulting",
    heroDescription:
      "Turning ESG ambition into practical, measurable business action.",
    overview:
      "Clients, investors and regulators increasingly expect credible, evidenced ESG performance. We help organisations move beyond policy statements to practical environmental management, sustainable operations and transparent reporting that stands up to scrutiny.",
    challenges: [
      "ESG commitments that lack measurable targets or governance",
      "Difficulty translating sustainability strategy into operational practice",
      "Inconsistent or unverifiable ESG reporting",
      "Pressure from clients and investors for credible sustainability evidence",
    ],
    expertise: [
      "ISO 14001 environmental management systems",
      "ESG strategy, governance and target-setting",
      "Sustainability reporting and disclosure frameworks",
      "Sustainable supply chain design",
    ],
    howWeHelp: [
      { title: "ESG maturity assessment", description: "Benchmark current ESG governance, data and performance against best practice." },
      { title: "Strategy & target setting", description: "Develop a credible, resourced ESG strategy with measurable targets." },
      { title: "Environmental management systems", description: "Implement and certify ISO 14001-aligned environmental management." },
      { title: "Reporting & assurance", description: "Build reporting structures that withstand external scrutiny." },
    ],
    approach: [
      { step: "01", title: "Assess", description: "Evaluate current ESG maturity, data quality and governance." },
      { step: "02", title: "Define", description: "Set realistic, evidenced sustainability targets and priorities." },
      { step: "03", title: "Implement", description: "Embed environmental management systems and operational practice." },
      { step: "04", title: "Report", description: "Establish credible, transparent ESG reporting and assurance." },
    ],
    benefits: [
      "Stronger ESG credentials with clients and investors",
      "Reduced environmental and regulatory risk",
      "Improved efficiency through better resource management",
      "Clear, evidenced sustainability reporting",
    ],
    industries: ["Manufacturing", "Construction", "Supply Chain"],
    faqs: [
      { question: "Do you help with sustainability report writing?", answer: "Yes, we support the development of ESG reports and disclosures aligned to recognised frameworks." },
      { question: "Can you support ISO 14001 certification specifically?", answer: "Yes, ISO 14001 implementation and certification readiness is a core element of this service." },
      { question: "Is this only relevant for large enterprises?", answer: "No, we scale our approach for SMEs and larger organisations, focusing on proportionate, achievable action." },
    ],
  },
  {
    slug: "custom-consulting-projects",
    number: "05",
    icon: Settings2,
    title: "Custom Consulting Projects",
    shortDescription:
      "Bespoke advisory engagements addressing complex, cross-cutting safety, security and sustainability challenges.",
    category: "Consulting",
    heroDescription:
      "Focused, senior-led advisory for the challenges that don't fit a standard framework.",
    overview:
      "Not every challenge fits neatly into a single service line. Our custom consulting projects bring senior practitioners together to address complex, cross-cutting issues spanning safety, security and sustainability — from due diligence to organisational transformation.",
    challenges: [
      "Complex, cross-functional issues that span safety, risk and sustainability",
      "Due diligence requirements for mergers, acquisitions or new contracts",
      "Organisational change requiring integrated HSE and ESG input",
      "Need for independent, senior-level advisory input on specific decisions",
    ],
    expertise: [
      "Integrated HSE, risk and ESG due diligence",
      "Organisational and management system transformation",
      "Independent expert review and advisory panels",
      "Multi-stakeholder programme design and delivery",
    ],
    howWeHelp: [
      { title: "Scoping workshop", description: "We work with your leadership team to define the real problem and success criteria." },
      { title: "Senior-led delivery", description: "Engagements are led directly by senior consultants, not delegated to junior teams." },
      { title: "Cross-disciplinary input", description: "We draw on safety, risk and sustainability expertise as the challenge requires." },
      { title: "Actionable outcomes", description: "Every engagement concludes with clear, practical recommendations." },
    ],
    approach: [
      { step: "01", title: "Scope", description: "Define the specific problem, stakeholders and success criteria." },
      { step: "02", title: "Investigate", description: "Conduct focused research, interviews and analysis." },
      { step: "03", title: "Advise", description: "Present findings and recommendations to leadership." },
      { step: "04", title: "Support", description: "Assist with implementation where required." },
    ],
    benefits: [
      "Independent, senior-level perspective on complex decisions",
      "Faster resolution of cross-functional challenges",
      "Reduced risk in transactions and organisational change",
      "Practical, implementable recommendations",
    ],
    industries: ["Construction", "Manufacturing", "Infrastructure", "Supply Chain"],
    faqs: [
      { question: "How is a custom project scoped?", answer: "We begin with a structured scoping conversation to understand your objectives before proposing an engagement model and fee." },
      { question: "Do you support due diligence for M&A?", answer: "Yes, we provide HSE, risk and ESG due diligence support for transactions and new contract awards." },
      { question: "Can projects run alongside our internal teams?", answer: "Yes, most engagements are designed to work closely alongside your internal teams rather than in isolation." },
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
