const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

const dir = path.join(process.cwd(), 'public', 'downloads');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function createPdf(filename, title, subtitle, sections) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 40;
  const pageWidth = 595.28;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  // Header Banner
  doc.setFillColor(10, 47, 49); // Dark teal
  doc.rect(0, 0, pageWidth, 75, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('3Sconsulting | NEBOSH IDip Study Series', margin, 32);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(178, 223, 219);
  doc.text('Safety · Security · Sustainability | Author: P.V Sharma', margin, 50);

  y = 100;

  // Title
  doc.setTextColor(10, 47, 49);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  const splitTitle = doc.splitTextToSize(title, contentWidth);
  doc.text(splitTitle, margin, y);
  y += (splitTitle.length * 21) + 6;

  // Subtitle
  if (subtitle) {
    doc.setTextColor(38, 133, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(subtitle, margin, y);
    y += 20;
  }

  doc.setDrawColor(200, 220, 220);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 18;

  // Sections
  sections.forEach(sec => {
    if (y > 720) {
      doc.addPage();
      y = margin + 20;
    }

    if (sec.heading) {
      y += 8;
      doc.setTextColor(14, 66, 69);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(sec.heading, margin, y);
      y += 16;
    }

    doc.setTextColor(51, 51, 51);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);

    sec.paragraphs.forEach(p => {
      const isBullet = p.startsWith('•') || p.startsWith('-') || p.startsWith('*');
      const lines = doc.splitTextToSize(p, isBullet ? contentWidth - 14 : contentWidth);
      
      if (y + (lines.length * 13.5) > 770) {
        doc.addPage();
        y = margin + 20;
      }

      if (isBullet) {
        doc.text('•', margin, y);
        doc.text(lines, margin + 12, y);
      } else {
        doc.text(lines, margin, y);
      }
      y += (lines.length * 13.5) + 6;
    });
  });

  // Footer for all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.setDrawColor(230, 230, 230);
    doc.line(margin, 810, pageWidth - margin, 810);
    doc.text('3Sconsulting — Educational & Study Material | Authorized for Free Download', margin, 824);
    doc.text('Page ' + i + ' of ' + totalPages, pageWidth - margin - 60, 824);
  }

  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, Buffer.from(doc.output('arraybuffer')));
  console.log('Created ' + filePath);
}

// 1. Vocational Rehabilitation
createPdf('nebosh-idip-vocational-rehabilitation.pdf',
  'NEBOSH IDip Study Series: Vocational Rehabilitation',
  'Topic: Vocational Rehabilitation, RTW Frameworks & Legal Duties',
  [
    {
      heading: '1 — Introduction to Vocational Rehabilitation (VR)',
      paragraphs: [
        'Vocational Rehabilitation (VR) encompasses coordinated activities designed to help individuals with health problems or impairments stay in, return to, or move into productive work.',
        'For health, safety, and environment (HSE) professionals and NEBOSH IDip candidates, VR bridges occupational health management with organizational risk control, employer legal duty of care, business continuity, and employee wellbeing outcomes (reducing sickness absence, retaining critical skills, and minimizing compensation claims).',
        'Key learning focus for IDip: Legal and policy frameworks → Employer statutory duties → Practical Return-to-Work (RTW) measures → Investigation and learning from practical case studies.'
      ]
    },
    {
      heading: '2 — Key Terminology & Glossary',
      paragraphs: [
        '• Return-to-work (RTW) plan: A structured timetable with temporary task and schedule adjustments supporting a gradual, phased return to work.',
        '• Reasonable adjustments: Modifications to the workplace, physical equipment, working hours, or job duties to remove barriers for returning employees.',
        '• Occupational Health (OH): Specialist clinical and advisory input focusing on medical assessment, functional capability, and workplace adaptation.',
        '• Phased return: Progressive step-up in hours and physical duties over an agreed timeframe.',
        '• Functional capacity: Assessment of what tasks a person can safely perform (focusing on capability rather than medical diagnosis alone).'
      ]
    },
    {
      heading: '3 — Key Policy & Regulatory Requirements',
      paragraphs: [
        'NICE Guideline NG146 (Workplace health: long-term sickness absence and capability to work):',
        '• Maintain early, supportive contact with employees off sick and plan RTW collaboratively.',
        '• Develop and implement individualized return-to-work plans (phased return, adjustments, temporary redeployment).',
        '• Provide or signpost access to occupational health and rehabilitation services when absence is prolonged or complex.',
        '• Assess workplace hazards contributing to sickness and execute preventive adjustments.',
        '• Record, analyze, and review long-term sickness absence data to identify trends.',
        'ILO Convention C159 (1983) & Recommendation R168 (1983):',
        '• States and employers must formulate policies ensuring access to vocational guidance, training, placement, and job-retention measures for disabled workers.',
        '• Promotes equality of opportunity and non-discrimination in recruitment and workforce retention.',
        '• Emphasizes comprehensive coordination between medical, vocational, and social services.'
      ]
    },
    {
      heading: '4 — Employer Responsibilities Checklist',
      paragraphs: [
        '• Early Contact & Case Ownership: Contact absent workers early (within 1–2 weeks for long-term absence risk) and document agreed next steps.',
        '• Occupational Health Referral: For absences exceeding 4 weeks or complex conditions, refer to OH for structured functional capacity assessment.',
        '• Individualized RTW Plan: Document clear milestones, phased hours, temporary restrictions, review triggers, and designated supervisors.',
        '• Workplace Adaptations: Modify workstations, tooling, lighting, shift patterns, or arrange temporary light duties in line with the Equality Act 2010.',
        '• Confidentiality & Consent: Secure informed employee consent prior to sharing clinical details; ensure transparent communication across HR, manager, and employee.'
      ]
    },
    {
      heading: '5 — Return-to-Work (RTW) Plan Template Structure',
      paragraphs: [
        '1. Employee Details & Job Role | Line Manager & OH Clinician details',
        '2. Functional Capacity Summary: Documented abilities and specific tasks to avoid',
        '3. Phased Hours Schedule: e.g. Week 1 (3 hrs/day) → Week 2 (4.5 hrs/day) → Week 3 (6 hrs/day) → Full Duties',
        '4. Ergonomic Adjustments & Tooling modifications required',
        '5. Clinical Support & Physiotherapy appointments schedule',
        '6. Structured Review Dates: Weekly during Month 1, followed by monthly reviews',
        '7. Formal Sign-off: Employee, Operations Manager, and OH Specialist signatures'
      ]
    },
    {
      heading: '6 — Case Study & Exam Tips',
      paragraphs: [
        'Food Industry Rehabilitation Case: An employee suffered acute low-back strain. Early OH assessment, timely physiotherapy referral, and a 6-week graduated RTW plan in a modified packing station enabled 100% full capacity restoration without re-injury.',
        'NEBOSH IDip Exam Tip: In scenario-based questions, cite ILO C159/R168 and NICE NG146 directly to demonstrate grounded regulatory knowledge.'
      ]
    }
  ]
);

// 2. Worker Consultation
createPdf('nebosh-idip-worker-consultation.pdf',
  'NEBOSH IDip Study Series: Worker Consultation (LO 2.3)',
  'Topic: Effective Workforce Consultation, ISO 45001:2018 & HSG263 Stages',
  [
    {
      heading: '1 — Principles of Effective Consultation',
      paragraphs: [
        'Consultation is a two-way dialogue where employers share relevant health and safety information, listen to employees\' views, and give genuine consideration before making decisions.',
        'Workplaces where workers actively participate in health and safety decisions have significantly lower accident rates, stronger safety climates, higher operational productivity, and robust compliance.',
        'Key Benefits: Joint hazard identification, enhanced safety culture maturity, reduced absenteeism and litigation, and sustainable risk management.'
      ]
    },
    {
      heading: '2 — International & National Regulatory Frameworks',
      paragraphs: [
        '• ILO Convention C155 (Article 20): Mandates cooperation between employers and workers in ensuring a safe working environment, requiring equal representation on joint committees.',
        '• ILO Recommendation R164 (Rec 12): Specifies consultation on new operational processes, hazard identification, layout modifications, and welfare provisions.',
        '• UK Safety Representatives & Safety Committees Regulations 1977 & Consultation with Employees Regulations 1996: Requires consultation before introducing new safety measures, planning training, or introducing equipment changes.'
      ]
    },
    {
      heading: '3 — ISO 45001:2018 Requirements (Clause 5.4)',
      paragraphs: [
        'ISO 45001 defines "Consultation" as seeking views before making a decision, and "Participation" as direct involvement in decision-making.',
        'Under Clause 5.4, organizations must remove barriers to participation (literacy, language, threat of reprisal, time constraints) and:',
        '• Consult non-managerial workers on: determining stakeholder needs, establishing OH&S policy, assigning roles, identifying compliance obligations, setting safety objectives, and planning audit programmes.',
        '• Involve non-managerial workers in: hazard identification and risk assessment, determining control measures, investigating incidents, and identifying training needs.'
      ]
    },
    {
      heading: '4 — The Four Stages of Consultation (HSE HSG263)',
      paragraphs: [
        '1. Get Started (Prepare): Identify consultation needs, secure executive leadership commitment, and allocate necessary time and resources.',
        '2. Get Organised (Plan): Decide on consultation mechanisms (direct face-to-face briefings vs representative safety committees), establish meeting schedules, and train safety reps.',
        '3. Get It Done (Consult & Involve): Share meaningful data, actively listen to frontline concerns, encourage employee suggestions, and agree on practical action items.',
        '4. Get It Right (Keep Improving): Monitor the effectiveness of consultation channels, review joint safety committees, and implement continual improvements.'
      ]
    },
    {
      heading: '5 — Behavioural Factors & Role of the Safety Professional',
      paragraphs: [
        '• Avoid Tokenism: Symbolic consultation without genuine influence degrades trust and creates cynicism.',
        '• Mitigate Peer Group Pressure: Facilitate open environments where workers can voice concerns without fear of social friction.',
        '• H&S Professional Roles: Act as Facilitator (ensuring all voices are heard), Advisor (translating technical standards into practical solutions), Mediator (constructively resolving disputes), and Monitor (measuring consultation outcomes).'
      ]
    }
  ]
);

// 3. Enforcement Policy HAVS Case Study
createPdf('nebosh-idip-enforcement-policy-havs.pdf',
  'NEBOSH IDip Case Study: Enforcement Policy & HAVS Prosecution',
  'Topic: HSE Enforcement Policy Statement (EPS), EMM Model & Case Analysis',
  [
    {
      heading: '1 — Case Overview: Robinson Brothers Ltd (£100,000 Fine)',
      paragraphs: [
        'An investigation by the Health and Safety Executive (HSE) was prompted by 9 reports of Hand-Arm Vibration Syndrome (HAVS) from workers at Robinson Brothers Ltd.',
        'The investigation uncovered that employees used handheld vibrating tools (grinders, road breakers) over a 14-year period without suitable and sufficient vibration risk assessments, exposure limits, tool maintenance, or health surveillance.',
        'Legal Outcome: Robinson Brothers Ltd pleaded guilty to breaching Regulations 5(1), 6(1), 7(1), and 8(1) of the Control of Vibration at Work Regulations 2005. The court imposed a £100,000 fine and £6,761 in prosecution costs.'
      ]
    },
    {
      heading: '2 — Key Principles of HSE\'s Enforcement Policy Statement (EPS)',
      paragraphs: [
        '• Proportionality: Enforcement action corresponds directly to the severity of the breach and scale of harm. Longstanding exposure causing irreversible nerve and vascular damage justified prosecution.',
        '• Targeting: Regulators focus interventions on high-risk activities and dutyholders with systematic control failures.',
        '• Consistency: Ensuring similar breaches and risk profiles receive consistent regulatory enforcement responses.',
        '• Transparency: Clear communication to dutyholders regarding legal requirements, inspection findings, and the rationale for enforcement.',
        '• Accountability: Regulators remain accountable to the public and courts for appropriate use of statutory powers.'
      ]
    },
    {
      heading: '3 — Application of the Enforcement Management Model (EMM)',
      paragraphs: [
        'The EMM guides inspectors in determining appropriate enforcement by evaluating:',
        '• Risk Gap: The gap between actual workplace risk and the legally required standard (Severe permanent harm vs acceptable exposure).',
        '• Compliance Gap: Absolute failure to conduct vibration assessments or provide health surveillance over 14 years.',
        '• Dutyholder Attitude: Failure to heed industry precedents or respond to emerging worker symptoms indicated low compliance commitment, justifying formal prosecution over improvement notices.'
      ]
    },
    {
      heading: '4 — Precedent Cases Influencing Judicial Sentencing',
      paragraphs: [
        '• Balfour Beatty Utility Solutions Ltd (2016): Fined £500,000 for systemic HAVS exposure and failure to assess tool vibration.',
        '• Network Rail & BAM Nuttall (2019): Fined >£200,000 combined for prolonged vibration exposure and training deficits.',
        'These cases established legal foreseeability and guided the court under UK Definitive Sentencing Guidelines for Health and Safety Offences.'
      ]
    }
  ]
);

// 4. OBE Mock Test Veltrix Engineering
createPdf('nebosh-idip-obe-mock-test-havs.pdf',
  'NEBOSH IDip Scenario Based Mock Test (OBE): HAVS Management',
  'Scenario: HAVS at Veltrix Engineering Ltd (48-Hour Open Book Assessment)',
  [
    {
      heading: 'Scenario Context — Veltrix Engineering Ltd',
      paragraphs: [
        'Veltrix Engineering Ltd is a UK-based metal fabrication firm with 170 employees undertaking cutting, grinding, and welding using handheld tools (angle grinders, needle scalers, jackhammers).',
        'Over 5 years, 12 workers reported symptoms of Hand-Arm Vibration Syndrome (blanching fingers, numbness, loss of grip strength). Despite complaints, management conducted no vibration risk assessments, provided no health surveillance, and established no tool rotation.',
        'Following an anonymous report, HSE investigated and confirmed multiple statutory breaches under the Control of Vibration at Work Regulations 2005 and Health and Safety at Work etc. Act 1974 Section 2(1).'
      ]
    },
    {
      heading: 'Examination Task Questions',
      paragraphs: [
        'Task a) Legal Breaches (10 Marks): Explain the specific statutory breaches committed by Veltrix Engineering Ltd under the Control of Vibration at Work Regulations 2005 (Regs 5, 6, 7, 8) and HSWA 1974.',
        'Task b) Enforcement Principles (10 Marks): With reference to HSE\'s Enforcement Policy Statement (EPS), explain how Proportionality, Targeting, and Consistency influence the inspector\'s decision to prosecute.',
        'Task c) Enforcement Routes & EMM (10 Marks): Identify the full range of enforcement options available to HSE (verbal advice, Improvement Notice, Prohibition Notice, Prosecution) and justify the most appropriate regulatory route for Veltrix Engineering.'
      ]
    },
    {
      heading: 'Model Answer Guidance & Examiner Tips',
      paragraphs: [
        '• Structure answers around clear regulatory citations and link every legal requirement directly to facts in the scenario.',
        '• Highlight the irreversible nature of HAVS as a permanent vascular and neurological condition.',
        '• Discuss the role of Section 2(1) HSWA 1974 regarding employer duty to ensure the health, safety, and welfare of employees so far as is reasonably practicable.'
      ]
    }
  ]
);

// 5. Transformational Leadership
createPdf('nebosh-idip-transformational-leadership.pdf',
  'NEBOSH IDip Study Series: Transformational Leadership in Safety',
  'Topic: Leadership Styles, 21 Characteristics & Safety Culture Impact',
  [
    {
      heading: '1 — Concept of Transformational Safety Leadership',
      paragraphs: [
        'Transformational leadership inspires, motivates, and engages employees to achieve safety excellence by creating a compelling shared vision, fostering psychological safety, and building mutual trust.',
        'Unlike transactional leadership (which relies on rule enforcement, audits, rewards, and disciplinary sanctions), transformational leadership transforms worker attitudes, perceptions, and core beliefs, turning compliance into voluntary commitment.'
      ]
    },
    {
      heading: '2 — Key Characteristics of Transformational Safety Leaders',
      paragraphs: [
        '• Visionary Thinking & Inspirational Motivation: Communicating an inspiring long-term zero-harm vision.',
        '• Leading by Example: Consistently demonstrating safe behaviors and visible felt leadership on the shop floor.',
        '• Emotional Intelligence & Empathy: Actively listening to frontline safety concerns and understanding worker challenges.',
        '• Trust Building & Psychological Safety: Eliminating fear of blame so employees readily report hazards and near misses.',
        '• Empowerment & Worker Ownership: Delegating safety responsibilities and involving employees in risk assessments.',
        '• Resilience & Integrity: Role modeling ethics, transparency, and accountability even during production pressure.'
      ]
    },
    {
      heading: '3 — Advantages vs Disadvantages in Safety Management',
      paragraphs: [
        'Advantages:',
        '• Elevates safety culture maturity from basic compliance to genuine employee ownership.',
        '• Substantially reduces underreporting and encourages proactive hazard mitigation.',
        '• Fosters innovation in safer tooling, process design, and ergonomic workstations.',
        'Disadvantages & Limitations:',
        '• Time and resource intensive, requiring sustained coaching, mentoring, and open communication.',
        '• Risk of neglecting routine procedural details or operational discipline if focus remains solely on high-level inspiration.',
        '• Inconsistency across organizational tiers if middle management does not embrace the leadership vision.'
      ]
    },
    {
      heading: '4 — Achieving Balance: Transformational + Transactional Leadership',
      paragraphs: [
        'Optimal occupational safety requires an integrated balance:',
        '• Use Transformational Leadership to inspire vision, foster culture, and empower engagement.',
        '• Use Transactional Leadership to maintain clear operating rules, enforce non-negotiable safety standards (such as PPE and permit-to-work systems), and ensure statutory compliance.'
      ]
    }
  ]
);

console.log('All 5 NEBOSH IDip Study Series PDFs created successfully!');
