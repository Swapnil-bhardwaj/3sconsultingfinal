import type { LucideIcon } from "lucide-react";
import { FileText, Download } from "lucide-react";

export interface ResourceCategory {
  name: string;
  icon: LucideIcon;
  count: number;
  description: string;
}

export const resourceCategories: ResourceCategory[] = [
  {
    name: "Articles",
    icon: FileText,
    count: 24,
    description: "Expert perspectives, technical explainers, and regulatory guidance on safety, security, and ESG sustainability.",
  },
  {
    name: "Downloads",
    icon: Download,
    count: 23,
    description: "Official NEBOSH IDip study materials, audit toolkits, RTW checklists, case studies, and mock assessments.",
  },
];

export interface Resource {
  id: string;
  title: string;
  type: "Article" | "Download";
  topic?: string;
  description: string;
  duration?: string;
  fileSize?: string;
  downloadUrl?: string;
  badge?: string;
  pages?: string;
}

export const featuredResource: Resource = {
  id: "featured-nebosh-vr",
  title: "NEBOSH IDip: Vocational Rehabilitation (VR) & Return-to-Work Toolkit",
  type: "Download",
  topic: "NEBOSH IDip Study Series",
  description:
    "Comprehensive study guide covering NICE NG146, ILO C159/R168/R99 frameworks, employer statutory responsibilities checklist, phased RTW schedule templates, and low back injury rehabilitation case analysis.",
  fileSize: "PDF Document",
  downloadUrl: "/downloads/nebosh-idip-vocational-rehabilitation.pdf",
  badge: "Official Study Material",
  pages: "5 Pages",
};

export const latestResources: Resource[] = [
  {
    id: "nebosh-vr",
    title: "NEBOSH IDip Study Material: Vocational Rehabilitation (VR)",
    type: "Download",
    topic: "Health Management & RTW",
    description:
      "Full study module on Vocational Rehabilitation (VR) linking health management with risk control, NICE NG146 guidelines, ILO C159/R168/R99 conventions, and employer RTW audit checklists.",
    fileSize: "PDF Document",
    downloadUrl: "/downloads/nebosh-idip-vocational-rehabilitation.pdf",
    badge: "NEBOSH IDip",
    pages: "5 Pages",
  },
  {
    id: "nebosh-consultation",
    title: "NEBOSH IDip Study Series: Worker Consultation (LO 2.3 & ISO 45001)",
    type: "Download",
    topic: "Worker Participation & Governance",
    description:
      "Deep dive into workforce consultation under ILO C155/R164, UK 1996/1977 regulations, ISO 45001:2018 Clause 5.4 requirements, HSG263 4-stage model, and behavioral dynamics.",
    fileSize: "PDF Document",
    downloadUrl: "/downloads/nebosh-idip-worker-consultation.pdf",
    badge: "NEBOSH IDip",
    pages: "6 Pages",
  },
  {
    id: "nebosh-enforcement-havs",
    title: "NEBOSH IDip Case Study: Enforcement Policy Statement & HAVS",
    type: "Download",
    topic: "Regulatory Enforcement & Legal",
    description:
      "Legal case analysis of the £100,000 Robinson Brothers Ltd HAVS prosecution. Covers HSE Enforcement Policy Statement (EPS) principles, Enforcement Management Model (EMM), and sentencing precedents.",
    fileSize: "PDF Document",
    downloadUrl: "/downloads/nebosh-idip-enforcement-policy-havs.pdf",
    badge: "Case Study",
    pages: "4 Pages",
  },
  {
    id: "nebosh-obe-mock-test",
    title: "NEBOSH IDip Scenario Based Mock Test (OBE): HAVS Management",
    type: "Download",
    topic: "Examination Preparation",
    description:
      "Complete 48-Hour Open Book Exam (OBE) scenario at Veltrix Engineering Ltd with examination tasks on statutory breaches, EPS proportionality/targeting/consistency, and HSE enforcement options.",
    fileSize: "PDF Document",
    downloadUrl: "/downloads/nebosh-idip-obe-mock-test-havs.pdf",
    badge: "OBE Mock Exam",
    pages: "1 Page",
  },
  {
    id: "nebosh-transformational-leadership",
    title: "NEBOSH IDip: Transformational Leadership in Safety Management",
    type: "Download",
    topic: "Safety Leadership & Culture",
    description:
      "Comprehensive module analyzing 21 transformational leadership characteristics, behavioral felt leadership, psychological safety, culture maturity, and balancing with transactional compliance.",
    fileSize: "PDF Document",
    downloadUrl: "/downloads/nebosh-idip-transformational-leadership.pdf",
    badge: "NEBOSH IDip",
    pages: "4 Pages",
  },
  {
    id: "iso-45001-readiness",
    title: "ISO 45001 Readiness Checklist & Gap Analysis Toolkit",
    type: "Download",
    topic: "ISO Certification",
    description:
      "A practical self-assessment gap analysis matrix to evaluate organizational readiness against ISO 45001 clauses prior to certification audits.",
    fileSize: "PDF Document",
    downloadUrl: "/downloads/nebosh-idip-worker-consultation.pdf",
    badge: "Audit Toolkit",
    pages: "Checklist",
  },
  {
    id: "art-iso-31000",
    title: "Understanding ISO 31000: A Practical Enterprise Overview",
    type: "Article",
    topic: "Risk Advisory",
    description:
      "A concise explainer on applying ISO 31000 risk management principles to build cross-departmental resilience in modern organizations.",
    duration: "6 min read",
    badge: "Article",
  },
  {
    id: "art-safety-culture",
    title: "Building a Genuine Safety Culture in Practice, Not Just Policy",
    type: "Article",
    topic: "Safety Culture",
    description:
      "Why policies alone rarely change frontline behaviour, and the practical steps required to embed psychological safety and leadership commitment.",
    duration: "7 min read",
    badge: "Article",
  },
  {
    id: "art-beyond-checkbox",
    title: "Moving Beyond Checkbox Compliance in Modern Business",
    type: "Article",
    topic: "ESG & Compliance",
    description:
      "How leading enterprises transform regulatory obligations into tangible operational resilience and investor trust.",
    duration: "5 min read",
    badge: "Article",
  },
];
