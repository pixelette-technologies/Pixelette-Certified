import {
  Shield, ShieldCheck, Globe, Leaf, Brain, Lock,
  UserCheck, FileSearch, Bug, Scale,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  phase: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PricingTier {
  name: string;
  audience: string;
  price: string;
  features: string[];
}

/**
 * Publication status for a service.
 *
 * Three states rather than a boolean, because the 8 September 2026 brief has
 * three buckets and a boolean would force ISO 9001 and ISO 14001 into either
 * "core" (which the brief forbids) or "withdrawn" (which it does not ask for).
 *
 *   core        one of the seven top-level Services menu items
 *   supporting  genuinely offered, but not headline. Reachable, not promoted.
 *   retired     withdrawn. Never rendered, never routed, never in the sitemap.
 *
 * Entries are marked rather than deleted on purpose: relatedSlugs are plain
 * strings, and a dangling slug resolves to undefined which getRelatedServices
 * already filters away. Deleting an entry therefore removes a card from six
 * other pages silently, with no error and no build failure. Marking it keeps
 * the failure visible and the decision reversible in one line.
 */
export type ServiceStatus = "core" | "supporting" | "retired";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  category: "iso" | "cyber" | "advisory" | "privacy" | "grc" | "architecture" | "bcdr" | "ai-governance";
  status: ServiceStatus;
  /** true iff src/app/services/<slug>/page.tsx exists */
  hasRoute: boolean;
  features: string[];
  process: ProcessStep[];
  pricing: PricingTier[];
  faqs: FAQ[];
  relatedSlugs: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const services: Service[] = [
  {
    slug: "iso-27001",
    status: "core",
    hasRoute: true,
    title: "ISO/IEC 27001 Implementation & Certification Readiness",
    shortTitle: "ISO 27001",
    description: "The global standard for information security management. Implementation and certification readiness, scoped to your organisation.",
    longDescription:
      "ISO 27001 is the international standard for information security management. It defines the requirements for an Information Security Management System (ISMS), a structured framework of policies, procedures, and controls that protects your organisation's information assets. For UK technology companies, ISO 27001 has become the de facto requirement for selling to enterprise clients, winning government contracts, passing investor due diligence, and qualifying for cyber insurance at favourable rates. Whether you are a SaaS platform targeting enterprise clients, a healthcare provider seeking NHS supply chain approval, a FinTech navigating FCA or DORA requirements, a manufacturer seeking supply chain inclusion, or any other organisation that handles sensitive data, ISO 27001 is your foundation.",
    icon: Shield,
    category: "iso",
    features: [
      "Gap analysis and remediation roadmap",
      "Full ISMS documentation suite (32 policies)",
      "Risk assessment and risk register (150+ entries)",
      "Statement of Applicability (93 Annex A controls)",
      "Internal audit before Stage 2",
      "Stage 1 and Stage 2 audit support",
      "Staff awareness training (2 sessions)",
      "3 months post-certification support",
    ],
    process: [
      { phase: "Phase 1", title: "Kickoff & gap analysis", description: "Initial meeting, scope definition, gap analysis conducted, remediation roadmap delivered." },
      { phase: "Phase 2", title: "Documentation build", description: "All ISMS policies written, risk assessment conducted, SoA drafted, asset inventory built." },
      { phase: "Phase 3", title: "Controls implementation", description: "Technical and organisational controls implemented and evidenced, staff training delivered." },
      { phase: "Phase 4", title: "Internal audit", description: "Full internal audit conducted, non-conformities identified and closed." },
      { phase: "Phase 5", title: "External audit", description: "Stage 1 documentation review and Stage 2 compliance audit. Certificate issued." },
    ],
    pricing: [
      { name: "Essentials", audience: "Startups and SMEs up to 50 employees", price: "Scoped to your business", features: ["Gap analysis", "ISMS documentation", "SoA", "Risk register", "1 internal audit", "Stage 1 + Stage 2 support"] },
      { name: "Professional", audience: "Scale-ups 50–150 employees", price: "Scoped to your business", features: ["Everything in Essentials", "Staff training", "6-month vCISO Basic", "Surveillance audit support Year 1"] },
      { name: "Enterprise", audience: "150+ employees or regulated sectors", price: "Scoped to your business", features: ["Everything in Professional", "vCISO Standard 12 months", "GDPR alignment layer", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "How long does ISO 27001 take?", answer: "It depends on your starting position, the scope of the management system and the certification body's own audit timetable. We set a realistic phase plan at scoping and confirm it in the proposal. No completion date is promised before that." },
      { question: "Do we need ISO 27001 or Cyber Essentials?", answer: "They solve different problems. Cyber Essentials covers 5 basic technical controls and is required for UK government contracts. ISO 27001 is a full management system required by enterprise clients globally. Many companies start with Cyber Essentials and progress to ISO 27001." },
      { question: "What happens if we fail the Stage 2 audit?", answer: "We run a full internal audit before Stage 2 so that non-conformities surface internally first and are closed before the certification body sees them. Where an auditor does raise a finding, we support you through corrective action and closure." },
      { question: "Do we need to be technical to get ISO 27001?", answer: "No. ISO 27001 is a management system standard, not a technical standard. We write the documentation, implement the controls, and manage the process. Your team needs to understand the policies and follow them, which we train them to do." },
      { question: "Can we get ISO 27001 and SOC 2 at the same time?", answer: "Yes, and it is efficient to do so. They share 60–70% of control requirements. We can run a combined implementation reducing total cost and time significantly." },
    ],
    relatedSlugs: ["cyber-essentials", "vciso", "gdpr-privacy"],
    seo: {
      title: "ISO 27001 Certification Readiness UK | Fixed Fee",
      description: "ISO 27001 implementation and certification readiness. UK-based, senior-led, from gap analysis through to Stage 2 audit support. Fixed-fee engagement scoped before work begins.",
      keywords: ["ISO 27001 certification UK", "ISO 27001 consultant", "ISMS implementation", "information security certification"],
    },
  },
  {
    slug: "iso-22301",
    status: "supporting",
    hasRoute: true,
    title: "ISO 22301 Implementation & Certification Readiness",
    shortTitle: "ISO 22301",
    description: "Business continuity certification. Demonstrate resilience and stay operational when it matters most.",
    longDescription:
      "ISO 22301 is the international standard for Business Continuity Management Systems (BCMS). It helps your organisation prepare for, respond to, and recover from disruptions, whether cyber attacks, supply chain failures, natural disasters, or infrastructure outages.",
    icon: ShieldCheck,
    category: "iso",
    features: [
      "Business Impact Analysis (BIA)",
      "Business Continuity Plan documentation",
      "Disaster Recovery procedures",
      "Crisis management framework",
      "Testing and exercise programme",
      "Staff awareness training",
      "Internal audit and management review",
      "Stage 1 and Stage 2 audit support",
    ],
    process: [
      { phase: "Phase 1", title: "Kickoff & BIA", description: "Scope definition, business impact analysis, critical function identification." },
      { phase: "Phase 2", title: "BCMS documentation", description: "BC policies, plans, and procedures written. Recovery strategies defined." },
      { phase: "Phase 3", title: "Implementation & testing", description: "Plans tested through exercises. Staff trained. Gaps identified and closed." },
      { phase: "Phase 4", title: "Internal audit", description: "Full internal audit and management review conducted." },
      { phase: "Phase 5", title: "External audit", description: "Stage 1 and Stage 2 certification audit. Certificate issued." },
    ],
    pricing: [
      { name: "Essentials", audience: "SMEs up to 50 employees", price: "Scoped to your business", features: ["Gap analysis", "BCMS documentation", "BIA", "BC plans", "Internal audit", "Audit support"] },
      { name: "Professional", audience: "50–150 employees", price: "Scoped to your business", features: ["Everything in Essentials", "Exercise programme", "Staff training", "Year 1 surveillance support"] },
      { name: "Enterprise", audience: "150+ employees", price: "Scoped to your business", features: ["Everything in Professional", "Multi-site coverage", "Integrated DR planning", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "What is the difference between ISO 22301 and ISO 27001?", answer: "ISO 27001 focuses on information security management. ISO 22301 focuses on business continuity, ensuring your organisation can continue operating during and after a disruption. Many organisations pursue both as they are complementary." },
      { question: "How long does ISO 22301 certification take?", answer: "Typically 10–14 weeks depending on your organisation's complexity and existing business continuity measures." },
    ],
    relatedSlugs: ["iso-27001", "iso-9001", "vciso"],
    seo: {
      title: "ISO 22301 Business Continuity UK",
      description: "ISO 22301 certification for UK businesses. Business continuity management, disaster recovery planning, and audit support. Expert-led implementation.",
      keywords: ["ISO 22301 certification UK", "business continuity", "BCMS", "disaster recovery"],
    },
  },
  {
    slug: "iso-9001",
    status: "supporting",
    hasRoute: true,
    title: "ISO 9001 Implementation & Certification Readiness",
    shortTitle: "ISO 9001",
    description: "Quality management certification. Prove consistent delivery excellence to clients worldwide.",
    longDescription:
      "ISO 9001 is the world's most widely adopted quality management standard. It demonstrates that your organisation consistently delivers products and services that meet customer and regulatory requirements.",
    icon: Globe,
    category: "iso",
    features: [
      "Quality Management System (QMS) documentation",
      "Process mapping and optimisation",
      "Quality policy and objectives",
      "Risk-based thinking framework",
      "Customer satisfaction monitoring",
      "Internal audit programme",
      "Management review procedures",
      "Continuous improvement framework",
    ],
    process: [
      { phase: "Phase 1", title: "Kickoff & gap analysis", description: "Current quality practices assessed against ISO 9001 requirements." },
      { phase: "Phase 2", title: "QMS documentation", description: "Quality manual, procedures, and process maps developed." },
      { phase: "Phase 3", title: "Implementation", description: "QMS implemented, staff trained, evidence gathered." },
      { phase: "Phase 4", title: "Internal audit", description: "Full internal audit conducted, findings addressed." },
      { phase: "Phase 5", title: "External audit", description: "Stage 1 and Stage 2 certification audit." },
    ],
    pricing: [
      { name: "Essentials", audience: "SMEs up to 50 employees", price: "Scoped to your business", features: ["Gap analysis", "QMS documentation", "Process mapping", "Internal audit", "Audit support"] },
      { name: "Professional", audience: "50–150 employees", price: "Scoped to your business", features: ["Everything in Essentials", "Staff training", "Performance metrics setup", "Year 1 surveillance"] },
      { name: "Enterprise", audience: "150+ employees", price: "Scoped to your business", features: ["Everything in Professional", "Multi-site coverage", "Integrated management system", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "Is ISO 9001 relevant for technology companies?", answer: "Absolutely. ISO 9001 demonstrates that your development processes, service delivery, and customer support meet consistently high standards. Many enterprise procurement teams require it." },
    ],
    relatedSlugs: ["iso-27001", "iso-14001", "iso-22301"],
    seo: {
      title: "ISO 9001 Quality Management UK",
      description: "ISO 9001 certification for UK businesses. Quality management system implementation, audit support, and continuous improvement. Fixed-fee engagement.",
      keywords: ["ISO 9001 certification UK", "quality management", "QMS"],
    },
  },
  {
    slug: "iso-14001",
    status: "supporting",
    hasRoute: true,
    title: "ISO 14001 Implementation & Certification Readiness",
    shortTitle: "ISO 14001",
    description: "Environmental management certification. Lead on sustainability and meet ESG obligations.",
    longDescription:
      "ISO 14001 is the international standard for Environmental Management Systems (EMS). It provides a framework for managing environmental responsibilities systematically, reducing your environmental footprint, and demonstrating commitment to sustainability.",
    icon: Leaf,
    category: "iso",
    features: [
      "Environmental Management System documentation",
      "Environmental aspects and impacts assessment",
      "Legal compliance register",
      "Environmental objectives and targets",
      "Operational controls and procedures",
      "Emergency preparedness planning",
      "Internal audit and management review",
      "Stage 1 and Stage 2 audit support",
    ],
    process: [
      { phase: "Phase 1", title: "Kickoff & environmental review", description: "Current environmental practices assessed, aspects and impacts identified." },
      { phase: "Phase 2", title: "EMS documentation", description: "Environmental policy, procedures, and controls documented." },
      { phase: "Phase 3", title: "Implementation", description: "Controls implemented, monitoring established, staff trained." },
      { phase: "Phase 4", title: "Internal audit", description: "Full EMS audit conducted, corrective actions taken." },
      { phase: "Phase 5", title: "External audit", description: "Certification body audit. Certificate issued." },
    ],
    pricing: [
      { name: "Essentials", audience: "SMEs", price: "Scoped to your business", features: ["Gap analysis", "EMS documentation", "Aspects register", "Internal audit", "Audit support"] },
      { name: "Professional", audience: "50–150 employees", price: "Scoped to your business", features: ["Everything in Essentials", "Staff training", "Monitoring programme", "Year 1 surveillance"] },
      { name: "Enterprise", audience: "150+ employees", price: "Scoped to your business", features: ["Everything in Professional", "Multi-site", "Integrated management system", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "Why do tech companies need ISO 14001?", answer: "Data centres, office operations, and supply chains all have environmental impacts. ISO 14001 demonstrates responsible environmental management to clients, investors, and regulators increasingly focused on ESG." },
    ],
    relatedSlugs: ["iso-9001", "iso-27001", "iso-22301"],
    seo: {
      title: "ISO 14001 Environmental Readiness UK",
      description: "ISO 14001 certification for UK businesses. Environmental management system implementation, gap analysis and audit support. Expert-led, fixed-fee engagement.",
      keywords: ["ISO 14001 certification UK", "environmental management", "EMS", "sustainability certification"],
    },
  },
  {
    slug: "iso-42001",
    status: "core",
    hasRoute: true,
    title: "AI Governance & ISO/IEC 42001 Certification Readiness",
    shortTitle: "ISO 42001",
    description: "AI governance certification. Lead responsibly in the era of artificial intelligence.",
    longDescription:
      "ISO 42001 is the international standard for Artificial Intelligence Management Systems (AIMS). Published in 2023, it defines requirements for responsible AI governance, covering risk management, transparency, accountability, ethical AI use, and continuous improvement of AI systems. For UK and EU technology companies building AI products, ISO 42001 is rapidly becoming what ISO 27001 was five years ago.",
    icon: Brain,
    category: "iso",
    features: [
      "AI Management System (AIMS) documentation",
      "AI risk assessment framework",
      "Transparency and explainability procedures",
      "Bias and fairness evaluation",
      "Data governance for AI systems",
      "AI lifecycle management",
      "Ethical AI use policies",
      "EU AI Act compliance mapping",
    ],
    process: [
      { phase: "Phase 1", title: "Kickoff & AI readiness review", description: "AI systems inventory, current governance assessment, scope definition." },
      { phase: "Phase 2", title: "AIMS documentation", description: "AI policies, risk frameworks, transparency procedures, and data governance documented." },
      { phase: "Phase 3", title: "Implementation & assessment", description: "Controls implemented, bias assessments conducted, staff trained on responsible AI." },
      { phase: "Phase 4", title: "Internal audit", description: "Full AIMS audit, non-conformities addressed." },
      { phase: "Phase 5", title: "External audit", description: "Certification body audit. Certificate issued." },
    ],
    pricing: [
      { name: "Essentials", audience: "AI startups up to 50 employees", price: "Scoped to your business", features: ["Gap analysis", "AIMS documentation", "AI risk assessment", "Internal audit", "Audit support"] },
      { name: "Professional", audience: "Scale-ups 50–150 employees", price: "Scoped to your business", features: ["Everything in Essentials", "EU AI Act mapping", "Staff training", "Year 1 surveillance"] },
      { name: "Enterprise", audience: "150+ or regulated AI", price: "Scoped to your business", features: ["Everything in Professional", "Multi-system coverage", "Board advisory", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "Who needs ISO 42001?", answer: "Any company that builds, deploys, or integrates AI systems, especially those selling to enterprise clients, operating in regulated sectors, or subject to the EU AI Act." },
      { question: "Is ISO 42001 mandatory?", answer: "Not yet, but the EU AI Act references ISO 42001 as a primary compliance framework. Enterprise clients are starting to require it in procurement questionnaires, similar to how ISO 27001 became a requirement for SaaS companies." },
    ],
    relatedSlugs: ["iso-27001", "gdpr-privacy", "vciso"],
    seo: {
      title: "ISO 42001 AI Governance Readiness UK",
      description: "ISO/IEC 42001 AI management system implementation and certification readiness. Our approved delivery network includes a PECB Certified ISO/IEC 42001 Lead Auditor. EU AI Act aligned. Fixed-fee engagement.",
      keywords: ["ISO 42001 certification", "AI governance", "AIMS", "EU AI Act compliance", "responsible AI"],
    },
  },
  {
    slug: "cyber-essentials",
    status: "supporting",
    hasRoute: true,
    title: "Cyber Essentials Readiness & Coordination",
    shortTitle: "Cyber Essentials",
    description: "The UK government-backed cybersecurity certification. Essential for public sector supply chains.",
    longDescription:
      "Cyber Essentials is a UK government-backed certification scheme that protects organisations against the most common cyber attacks. It covers five technical controls: firewalls, secure configuration, user access control, malware protection, and patch management. If you sell to the UK government or work in the public sector supply chain, Cyber Essentials is your first and fastest step.",
    icon: Lock,
    category: "cyber",
    features: [
      "Pre-assessment gap analysis",
      "5 technical controls review",
      "Self-assessment questionnaire preparation (CE)",
      "External technical testing (CE+)",
      "Remediation guidance",
      "Certification submission management",
      "12 months certification validity",
      "Progression planning to ISO 27001",
    ],
    process: [
      { phase: "Phase 1", title: "Gap analysis", description: "Review of your current security controls against Cyber Essentials requirements." },
      { phase: "Phase 2", title: "Remediation", description: "Address identified gaps in firewall, patching, access control, malware protection, and configuration." },
      { phase: "Phase 3", title: "Certification", description: "Complete self-assessment (CE) or technical assessment (CE+). Certificate issued." },
    ],
    pricing: [
      { name: "Cyber Essentials", audience: "All businesses", price: "Scoped to your business", features: ["Gap analysis", "Remediation guidance", "Self-assessment preparation", "Submission management"] },
      { name: "Cyber Essentials Plus", audience: "Higher-assurance requirements", price: "Scoped to your business", features: ["Everything in CE", "External vulnerability scanning", "Configuration testing", "Hands-on technical assessment"] },
    ],
    faqs: [
      { question: "What is the difference between CE and CE Plus?", answer: "Cyber Essentials is a self-assessment verified by a certifying body. Cyber Essentials Plus includes external hands-on technical testing, vulnerability scanning and configuration testing by an assessor." },
      { question: "How quickly can we get certified?", answer: "It depends on your starting position and on the authorised assessor's availability. Cyber Essentials Plus takes longer than Cyber Essentials because of the external technical assessment. We set a realistic plan at scoping rather than promising a date before we have looked." },
    ],
    relatedSlugs: ["iso-27001", "penetration-testing", "vciso"],
    seo: {
      title: "Cyber Essentials Readiness & Coordination UK",
      description: "Cyber Essentials and Cyber Essentials Plus readiness and coordination for government suppliers and NHS supply chains. Fixed-fee. The formal assessment is delivered through the appropriate authorised route.",
      keywords: ["Cyber Essentials certification", "Cyber Essentials Plus", "UK government certification", "cybersecurity certification"],
    },
  },
  {
    slug: "vciso",
    status: "core",
    hasRoute: true,
    title: "vCISO & GRC Advisory",
    shortTitle: "vCISO",
    description: "Senior security leadership, without the senior hire. A fractional CISO for your business.",
    longDescription:
      "A Chief Information Security Officer (CISO) is one of the most important roles in a modern technology company. A Virtual CISO gives you everything a full-time CISO provides, board-level security strategy, risk management, compliance governance, supplier security oversight, incident response leadership, at a monthly retainer that scales with your needs.",
    icon: UserCheck,
    category: "advisory",
    features: [
      "Board-level security strategy",
      "Risk management and governance",
      "Compliance programme oversight",
      "Security questionnaire management",
      "Incident response planning",
      "Supplier security assessment",
      "Staff security briefings",
      "Monthly security reporting",
    ],
    process: [
      { phase: "Phase 1", title: "Onboarding", description: "Security posture review, stakeholder meetings, priority identification." },
      { phase: "Phase 2", title: "Foundation", description: "Security roadmap, governance framework, quick wins delivered." },
      { phase: "Phase 3", title: "Retainer", description: "Monthly advisory, board reports, risk management, questionnaire support." },
    ],
    pricing: [
      { name: "vCISO Basic", audience: "Post-certification governance", price: "Monthly retainer", features: ["10–12 hrs/month", "Monthly security review", "Board report", "Policy maintenance", "Email support"] },
      { name: "vCISO Standard", audience: "Active enterprise sales", price: "Monthly retainer", features: ["18–22 hrs/month", "All Basic features", "Security questionnaire management", "Incident response planning", "Quarterly risk register update"] },
      { name: "vCISO Enterprise", audience: "Regulated / pre-IPO", price: "Monthly retainer", features: ["22–30 hrs/month", "All Standard features", "On-site presence", "Board presentation", "M&A security due diligence"] },
    ],
    faqs: [
      { question: "How is a vCISO different from a consultant?", answer: "A consultant delivers a project and leaves. A vCISO is an ongoing senior security leader embedded in your business, attending board meetings, managing your security programme, and being accountable for outcomes." },
      { question: "Can we scale up or down?", answer: "Yes. vCISO retainers are flexible. You can move between tiers as your needs change, with 30 days notice." },
    ],
    relatedSlugs: ["iso-27001", "vdpo", "penetration-testing"],
    seo: {
      title: "vCISO & GRC Advisory UK",
      description: "Senior security leadership without the full-time hire. Flexible monthly vCISO retainers covering board-level strategy, risk and compliance governance.",
      keywords: ["vCISO UK", "virtual CISO", "fractional CISO", "security leadership"],
    },
  },
  {
    slug: "vdpo",
    status: "core",
    hasRoute: true,
    title: "Privacy & vDPO",
    shortTitle: "vDPO",
    description: "Your dedicated Data Protection Officer, on demand. Expert privacy leadership at a fraction of the cost.",
    longDescription:
      "Under GDPR, many organisations are required to appoint a Data Protection Officer. Our vDPO service provides a qualified, experienced DPO on a flexible retainer, handling data subject requests, maintaining your ROPA, advising on DPIAs, and ensuring your privacy programme stays compliant.",
    icon: FileSearch,
    category: "advisory",
    features: [
      "GDPR compliance oversight",
      "Data subject request management",
      "Record of Processing Activities (ROPA)",
      "Data Protection Impact Assessments (DPIAs)",
      "Privacy policy management",
      "Breach notification procedures",
      "ICO liaison and correspondence",
      "Staff privacy awareness training",
    ],
    process: [
      { phase: "Phase 1", title: "Onboarding", description: "Privacy posture review, ROPA audit, priority gap identification." },
      { phase: "Phase 2", title: "Foundation", description: "ROPA updated, DPIA framework established, policies reviewed." },
      { phase: "Phase 3", title: "Retainer", description: "Ongoing DPO duties, DSR management, compliance monitoring." },
    ],
    pricing: [
      { name: "vDPO", audience: "All organisations", price: "Monthly retainer", features: ["8–10 hrs/month", "ROPA maintenance", "DSR handling", "DPIA advisory", "Privacy policy reviews", "Email support"] },
    ],
    faqs: [
      { question: "Do we legally need a DPO?", answer: "Under GDPR Article 37, you need a DPO if you are a public authority, carry out large-scale systematic monitoring, or process special category data at scale. Even if not legally required, having a DPO demonstrates strong data governance." },
    ],
    relatedSlugs: ["gdpr-privacy", "vciso", "iso-27001"],
    seo: {
      title: "Privacy & vDPO Service UK",
      description: "Virtual Data Protection Officer service for UK businesses. GDPR compliance, DSR management, DPIAs and ongoing DPO duties on a flexible monthly retainer.",
      keywords: ["vDPO UK", "virtual DPO", "data protection officer", "GDPR DPO"],
    },
  },
  {
    slug: "penetration-testing",
    status: "retired",
    hasRoute: false,
    title: "Penetration Testing (VAPT) — withdrawn",
    shortTitle: "Penetration Testing",
    description: "Find your vulnerabilities before attackers do. Expert-led security testing for any environment.",
    longDescription:
      "Withdrawn from the first release pending verification of a named tester or provider and their QA route. Retained as data, with status 'retired', so related-service references resolve cleanly rather than vanishing silently.",
    icon: Bug,
    category: "cyber",
    features: [
      "Web application penetration testing",
      "API security testing",
      "Network infrastructure testing",
      "Cloud configuration review",
      "CVSS-scored vulnerability reporting",
      "Remediation guidance and prioritisation",
      "Executive summary for board/investors",
      "Re-test after remediation",
    ],
    process: [
      { phase: "Phase 1", title: "Scoping & planning", description: "Define scope, agree rules of engagement, set up testing environment." },
      { phase: "Phase 2", title: "Testing", description: "Active penetration testing conducted against agreed scope." },
      { phase: "Phase 3", title: "Reporting", description: "Detailed findings report with CVSS scores, executive summary, remediation guidance." },
    ],
    pricing: [
      { name: "Web/API test", audience: "Single application", price: "Per application", features: ["OWASP Top 10 testing", "API endpoint testing", "CVSS-scored report", "Remediation guidance", "Re-test included"] },
    ],
    faqs: [
      { question: "How often should we do pen testing?", answer: "At minimum annually, and after any significant changes to your applications or infrastructure. Many compliance frameworks (ISO 27001, PCI DSS) require at least annual testing." },
      { question: "Will testing disrupt our live systems?", answer: "We work with you to minimise disruption. Testing is typically conducted against staging environments or during low-traffic periods. We follow strict rules of engagement agreed before testing begins." },
    ],
    relatedSlugs: ["cyber-essentials", "iso-27001", "vciso"],
    seo: {
      title: "Penetration Testing UK | VAPT",
      description: "Professional penetration testing for UK businesses. Web application, API, and network security testing. CVSS-scored reports. Fixed-fee engagement.",
      keywords: ["penetration testing UK", "VAPT", "web application testing", "API security testing"],
    },
  },
  {
    slug: "gdpr-privacy",
    status: "supporting",
    hasRoute: true,
    title: "GDPR & Data Privacy",
    shortTitle: "GDPR & Privacy",
    description: "Turn your data protection obligations into a competitive advantage across any jurisdiction.",
    longDescription:
      "Our GDPR and data privacy service helps organisations build robust privacy programmes that go beyond basic compliance. We transform your data protection obligations into a competitive advantage, demonstrating to clients, partners, and regulators that you take data seriously.",
    icon: Scale,
    category: "privacy",
    features: [
      "GDPR compliance assessment",
      "Privacy programme design",
      "Record of Processing Activities (ROPA)",
      "Data Protection Impact Assessments",
      "Privacy notice and policy drafting",
      "Data breach response procedures",
      "International data transfer mechanisms",
      "Staff privacy awareness training",
    ],
    process: [
      { phase: "Phase 1", title: "Privacy assessment", description: "Current privacy practices reviewed against GDPR requirements. Gap report delivered." },
      { phase: "Phase 2", title: "Programme build", description: "Privacy policies, ROPA, DPIA framework, breach procedures developed." },
      { phase: "Phase 3", title: "Implementation", description: "Policies implemented, consent mechanisms updated, staff trained." },
    ],
    pricing: [
      { name: "Essentials", audience: "SMEs", price: "Scoped to your business", features: ["GDPR assessment", "Privacy policies", "ROPA", "Breach procedures", "Staff training"] },
      { name: "Professional", audience: "Scale-ups", price: "Scoped to your business", features: ["Everything in Essentials", "DPIAs", "International transfers", "Quarterly reviews"] },
      { name: "Enterprise", audience: "Regulated organisations", price: "Scoped to your business", features: ["Everything in Professional", "vDPO service", "ICO liaison", "Multi-jurisdiction"] },
    ],
    faqs: [
      { question: "Is GDPR still relevant after Brexit?", answer: "Yes. The UK has its own version (UK GDPR) which mirrors EU GDPR. If you process data of UK residents or trade with the EU, GDPR compliance is essential." },
    ],
    relatedSlugs: ["vdpo", "iso-27001", "iso-42001"],
    seo: {
      title: "GDPR Compliance Consultancy UK",
      description: "Turn GDPR obligations into a competitive advantage. UK data protection compliance, DPIAs, and data mapping. Expert-led. Fixed-fee engagement.",
      keywords: ["GDPR compliance UK", "data privacy", "data protection", "GDPR consultant"],
    },
  },
  /* ────── New services from Master Document v1.1 ────── */

  {
    slug: "iso-27701",
    status: "supporting",
    hasRoute: false,
    title: "ISO 27701 Privacy Information Management",
    shortTitle: "ISO 27701",
    description: "The privacy extension to ISO 27001. Establishes a Privacy Information Management System aligned with GDPR and global privacy regulations.",
    longDescription: "ISO 27701 extends ISO 27001 to cover privacy management, establishing requirements for a Privacy Information Management System (PIMS). It provides a structured framework for managing personal data aligned with GDPR, CCPA, and other global privacy regulations. Typically implemented alongside or after ISO 27001.",
    icon: Shield,
    category: "iso",
    features: ["Privacy policies and procedures aligned to ISO 27701", "PIMS implementation consultancy", "Integration with existing ISO 27001 ISMS", "Internal audit and Stage 1 and Stage 2 certification audit accompaniment"],
    process: [
      { phase: "Phase 1", title: "Kickoff & gap analysis", description: "Assess current privacy posture against ISO 27701 requirements." },
      { phase: "Phase 2", title: "PIMS documentation", description: "Privacy policies, procedures, and PIMS documentation built." },
      { phase: "Phase 3", title: "Implementation", description: "Integration with existing ISMS, staff training, controls implemented." },
      { phase: "Phase 4", title: "Internal audit", description: "Full pre-audit review conducted." },
      { phase: "Phase 5", title: "External audit", description: "Stage 1 and Stage 2 certification audit." },
    ],
    pricing: [
      { name: "Standard", audience: "Organisations with existing ISO 27001", price: "Scoped to your business", features: ["Gap analysis", "PIMS documentation", "ISMS integration", "Internal audit", "Audit support"] },
    ],
    faqs: [
      { question: "Do we need ISO 27001 first?", answer: "ISO 27701 is an extension to ISO 27001. You can implement them together or add ISO 27701 after achieving ISO 27001 certification." },
    ],
    relatedSlugs: ["iso-27001", "gdpr-privacy", "vdpo"],
    seo: { title: "ISO 27701 Privacy Certification UK", description: "ISO 27701 privacy information management certification. Extends ISO 27001 with GDPR-aligned privacy governance.", keywords: ["ISO 27701", "PIMS", "privacy certification"] },
  },
  {
    slug: "soc-2",
    status: "core",
    hasRoute: true,
    title: "SOC 2 Readiness",
    shortTitle: "SOC 2",
    description: "Trust Services Criteria compliance for technology companies serving US enterprise clients and investors.",
    longDescription: "SOC 2 Type I assesses whether controls are suitably designed. SOC 2 Type II verifies that controls operated effectively over a period. We prepare the controls, evidence and operating model needed for the examination. The examination itself, and the resulting report, are performed through the appropriate independent CPA or audit route, never by Pixelette Certified.",
    icon: ShieldCheck,
    category: "grc",
    features: ["Trust Services Criteria gap analysis", "Controls framework design and documentation", "Policy and procedure drafting", "Evidence collection programme", "Audit readiness and examiner liaison", "Coordination of the independent CPA examination"],
    process: [
      { phase: "Phase 1", title: "Gap analysis", description: "Trust Services Criteria assessment and controls mapping." },
      { phase: "Phase 2", title: "Controls design", description: "Documentation, policies, and controls implementation." },
      { phase: "Phase 3", title: "Implementation", description: "Evidence collection and audit readiness preparation." },
    ],
    pricing: [
      { name: "Type I", audience: "Point-in-time controls assessment", price: "Scoped to your business", features: ["Controls design review", "Policy documentation", "Readiness assessment"] },
      { name: "Type II", audience: "Operational effectiveness over audit period", price: "Scoped to your business", features: ["Full implementation", "Evidence programme", "Independent examination coordinated"] },
    ],
    faqs: [
      { question: "What is the difference between SOC 2 Type I and Type II?", answer: "Type I is a point-in-time assessment of controls design. Type II verifies controls operated effectively over a period (typically 6-12 months). Most US enterprise clients require Type II." },
    ],
    relatedSlugs: ["iso-27001", "vciso", "penetration-testing"],
    seo: { title: "SOC 2 Readiness UK", description: "SOC 2 Type I and Type II readiness for technology companies. Trust Services Criteria implementation, evidence preparation and coordination of the independent examination.", keywords: ["SOC 2", "SOC 2 Type II", "Trust Services Criteria"] },
  },
  {
    slug: "sama-csf",
    status: "supporting",
    hasRoute: false,
    title: "SAMA CSF Readiness & Compliance Support",
    shortTitle: "SAMA CSF",
    description: "Mandatory cybersecurity framework for Saudi Arabian financial institutions regulated by the Saudi Arabian Monetary Authority.",
    longDescription: "The SAMA Cybersecurity Framework is mandatory for all financial institutions regulated by the Saudi Arabian Monetary Authority, including banks, insurance companies, and financial market infrastructure. Pixelette Certified delivers full SAMA CSF compliance implementation.",
    icon: Shield,
    category: "grc",
    features: ["SAMA CSF controls gap analysis across all four domains", "Cybersecurity policies and procedures drafting", "Controls implementation consultancy", "Regulatory examination readiness assessment", "Banking sector compliance programme design"],
    process: [
      { phase: "Phase 1", title: "Gap analysis", description: "Controls gap analysis across all SAMA CSF domains." },
      { phase: "Phase 2", title: "Implementation", description: "Policies, procedures, and controls implemented." },
      { phase: "Phase 3", title: "Readiness", description: "Regulatory examination readiness assessment." },
    ],
    pricing: [
      { name: "Enterprise", audience: "Saudi financial institutions", price: "Scoped to your business", features: ["Full SAMA CSF implementation", "Regulatory readiness", "Banking sector expertise"] },
    ],
    faqs: [],
    relatedSlugs: ["iso-27001", "iso-22301", "vciso"],
    seo: { title: "SAMA CSF Compliance", description: "SAMA Cybersecurity Framework compliance for Saudi Arabian banks and financial institutions.", keywords: ["SAMA CSF", "Saudi Arabia banking compliance"] },
  },
  {
    slug: "nca-ecc",
    status: "supporting",
    hasRoute: false,
    title: "NCA ECC / CCC Readiness & Compliance Support",
    shortTitle: "NCA ECC/CCC",
    description: "Essential Cybersecurity Controls and Cloud Cybersecurity Controls for Saudi government entities and critical infrastructure.",
    longDescription: "The NCA Essential Cybersecurity Controls apply to all Saudi government entities and critical national infrastructure. The NCA Cloud Cybersecurity Controls apply to cloud service providers in the Kingdom. Both are mandatory regulatory requirements.",
    icon: Lock,
    category: "grc",
    features: ["NCA ECC/CCC gap analysis across all control domains", "Controls implementation and documentation", "Critical infrastructure and cloud security compliance", "Regulatory reporting and audit readiness support"],
    process: [
      { phase: "Phase 1", title: "Assessment", description: "Gap analysis across all NCA control domains." },
      { phase: "Phase 2", title: "Implementation", description: "Controls implementation and documentation." },
    ],
    pricing: [
      { name: "Enterprise", audience: "Saudi government and critical infrastructure", price: "Scoped to your business", features: ["Full NCA ECC/CCC implementation", "Regulatory reporting support"] },
    ],
    faqs: [],
    relatedSlugs: ["iso-27001", "iso-22301", "vciso"],
    seo: { title: "NCA ECC/CCC Compliance", description: "NCA Essential Cybersecurity Controls and Cloud Controls for Saudi Arabia.", keywords: ["NCA ECC", "NCA CCC", "Saudi cybersecurity"] },
  },
  {
    slug: "qcb-nia",
    status: "supporting",
    hasRoute: false,
    title: "QCB / NIA Readiness & Compliance Support",
    shortTitle: "QCB/NIA",
    description: "Qatar Central Bank cybersecurity requirements and National Information Assurance framework for Qatari financial institutions.",
    longDescription: "The Qatar Central Bank Cybersecurity Requirements and the National Information Assurance framework are the primary regulatory cybersecurity obligations for financial institutions and government entities in Qatar.",
    icon: Shield,
    category: "grc",
    features: ["QCB Cybersecurity Requirements gap analysis", "NIA framework alignment and documentation", "Financial sector regulatory compliance programme", "Regulatory reporting and audit preparation"],
    process: [
      { phase: "Phase 1", title: "Assessment", description: "Gap analysis against QCB and NIA requirements." },
      { phase: "Phase 2", title: "Implementation", description: "Controls implementation and regulatory documentation." },
    ],
    pricing: [
      { name: "Enterprise", audience: "Qatar financial institutions", price: "Scoped to your business", features: ["Full QCB/NIA compliance implementation"] },
    ],
    faqs: [],
    relatedSlugs: ["iso-27001", "iso-22301", "vciso"],
    seo: { title: "QCB/NIA Compliance Qatar", description: "Qatar Central Bank and National Information Assurance compliance for Qatari financial institutions.", keywords: ["QCB", "NIA", "Qatar banking compliance"] },
  },
  {
    slug: "zero-trust",
    status: "supporting",
    hasRoute: false,
    title: "Zero Trust Architecture Design",
    shortTitle: "Zero Trust",
    description: "Vendor-neutral Zero Trust architecture design based on NIST SP 800-207 and CISA principles.",
    longDescription: "Zero Trust Architecture replaces the traditional perimeter-based security model with a 'never trust, always verify' approach. Delivered as a vendor-neutral architecture design applicable to any technology stack.",
    icon: Lock,
    category: "architecture",
    features: ["Zero Trust maturity assessment", "Identity and access management architecture", "Micro-segmentation and network design", "Endpoint security framework", "Data protection architecture", "Implementation roadmap"],
    process: [
      { phase: "Phase 1", title: "Assessment", description: "Current-state analysis and maturity assessment." },
      { phase: "Phase 2", title: "Design", description: "Architecture design across identity, network, and data layers." },
      { phase: "Phase 3", title: "Roadmap", description: "Implementation roadmap and documentation delivered." },
    ],
    pricing: [
      { name: "Standard", audience: "All organisations", price: "Scoped to your business", features: ["Maturity assessment", "Architecture design", "Implementation roadmap"] },
    ],
    faqs: [],
    relatedSlugs: ["iso-27001", "vciso", "penetration-testing"],
    seo: { title: "Zero Trust Architecture Design", description: "Vendor-neutral Zero Trust architecture design. NIST SP 800-207 aligned.", keywords: ["Zero Trust", "NIST 800-207", "security architecture"] },
  },
  {
    slug: "ad-hardening",
    status: "supporting",
    hasRoute: false,
    title: "Active Directory Hardening",
    shortTitle: "AD Hardening",
    description: "Systematic hardening of Active Directory and Azure AD / Entra ID environments to reduce domain compromise risk.",
    longDescription: "Active Directory remains one of the most targeted attack surfaces in enterprise environments. AD hardening addresses critical misconfigurations, privilege escalation paths, and attack vectors including pass-the-hash, Kerberoasting, and AD persistence techniques.",
    icon: Lock,
    category: "architecture",
    features: ["AD configuration review and gap analysis", "Privileged access management design", "Group Policy hardening", "Service account security review", "Domain controller hardening", "Prioritised remediation report"],
    process: [
      { phase: "Phase 1", title: "Review", description: "Configuration review and vulnerability assessment." },
      { phase: "Phase 2", title: "Remediation", description: "Hardening implementation and verification." },
    ],
    pricing: [
      { name: "Per domain", audience: "On-premise and cloud hybrid", price: "Scoped to your business", features: ["Full AD review", "Hardening implementation", "Remediation report"] },
    ],
    faqs: [],
    relatedSlugs: ["penetration-testing", "vciso", "iso-27001"],
    seo: { title: "Active Directory Hardening", description: "Active Directory and Azure AD security hardening for enterprise environments.", keywords: ["AD hardening", "Active Directory security", "Entra ID"] },
  },
  {
    slug: "cloud-security-architecture",
    status: "supporting",
    hasRoute: false,
    title: "Cloud Security Architecture",
    shortTitle: "Cloud Security",
    description: "Security architecture design for AWS, Azure, GCP, and hybrid cloud environments.",
    longDescription: "Cloud Security Architecture engagements design or redesign the security posture of your cloud environment, covering identity, network, data, and operations security across hybrid and multi-cloud deployments.",
    icon: Globe,
    category: "architecture",
    features: ["Current-state cloud security assessment", "Target-state architecture design", "Landing zone and account structure design", "CSA Cloud Controls Matrix alignment", "Architecture document and implementation roadmap"],
    process: [
      { phase: "Phase 1", title: "Assessment", description: "Current cloud security posture review." },
      { phase: "Phase 2", title: "Design", description: "Target architecture design across all cloud layers." },
      { phase: "Phase 3", title: "Documentation", description: "Architecture document and roadmap delivered." },
    ],
    pricing: [
      { name: "Standard", audience: "AWS, Azure, GCP, hybrid", price: "Scoped to your business", features: ["Assessment", "Architecture design", "Implementation roadmap"] },
    ],
    faqs: [],
    relatedSlugs: ["penetration-testing", "iso-27001", "vciso"],
    seo: { title: "Cloud Security Architecture", description: "Cloud security architecture for AWS, Azure, and GCP environments.", keywords: ["cloud security", "AWS security", "Azure security"] },
  },
  {
    slug: "bia-bra",
    status: "supporting",
    hasRoute: false,
    title: "Business Impact Analysis & Risk Assessment",
    shortTitle: "BIA / BRA",
    description: "Identify critical functions, recovery priorities, and the threats most likely to cause disruption to your operations.",
    longDescription: "A Business Impact Analysis identifies and quantifies the effects of disruption on critical business functions. The Business Risk Assessment identifies the threats most likely to cause those disruptions. ISO 22301 aligned.",
    icon: Scale,
    category: "bcdr",
    features: ["Critical business function mapping", "MAO, RTO, and RPO determination", "Business risk and threat assessment", "Interdependency mapping", "Formal BIA and BRA documentation"],
    process: [
      { phase: "Phase 1", title: "Scoping", description: "Critical functions and services identified." },
      { phase: "Phase 2", title: "Analysis", description: "Impact analysis and risk assessment conducted." },
    ],
    pricing: [
      { name: "Standard", audience: "Up to 5 business functions", price: "Scoped to your business", features: ["BIA", "BRA", "Formal documentation"] },
    ],
    faqs: [],
    relatedSlugs: ["iso-22301", "vciso", "iso-27001"],
    seo: { title: "Business Impact Analysis", description: "BIA and BRA services aligned to ISO 22301 requirements.", keywords: ["BIA", "BRA", "business impact analysis"] },
  },
  {
    slug: "dr-planning",
    status: "supporting",
    hasRoute: false,
    title: "Disaster Recovery Planning",
    shortTitle: "DR Planning",
    description: "Actionable DR runbooks and recovery procedures ensuring IT systems can be restored within defined objectives.",
    longDescription: "Disaster Recovery Planning translates BIA and BRA findings into actionable DR runbooks and recovery procedures, ensuring IT systems and critical data can be restored within defined recovery objectives.",
    icon: ShieldCheck,
    category: "bcdr",
    features: ["DR strategy aligned to RTO, RPO, and MAO targets", "DR runbook development", "Backup and replication strategy review", "DR testing plan and exercise design", "ISO 22301 integration"],
    process: [
      { phase: "Phase 1", title: "Strategy", description: "DR strategy design aligned to recovery objectives." },
      { phase: "Phase 2", title: "Runbooks", description: "Step-by-step recovery procedures developed." },
      { phase: "Phase 3", title: "Testing", description: "DR testing plan designed and initial exercise conducted." },
    ],
    pricing: [
      { name: "Standard", audience: "Up to 5 IT systems", price: "Scoped to your business", features: ["DR strategy", "Runbooks", "Testing plan"] },
    ],
    faqs: [],
    relatedSlugs: ["iso-22301", "iso-27001", "vciso"],
    seo: { title: "Disaster Recovery Planning", description: "DR planning and runbook development aligned to ISO 22301.", keywords: ["disaster recovery", "DR planning", "RTO RPO"] },
  },
  {
    slug: "ai-risk-assessment",
    status: "supporting",
    hasRoute: false,
    title: "AI Risk Assessment",
    shortTitle: "AI Risk Assessment",
    description: "Structured evaluation of AI system risks against the NIST AI Risk Management Framework, with EU AI Act alignment.",
    longDescription: "An AI Risk Assessment provides a structured evaluation of risks associated with your AI systems, covering technical, operational, ethical, privacy, and regulatory dimensions. Conducted against the NIST AI RMF.",
    icon: Brain,
    category: "ai-governance",
    features: ["AI system inventory and classification by EU AI Act risk tier", "NIST AI RMF GOVERN, MAP, MEASURE, MANAGE assessment", "Bias, fairness, and transparency review", "Data governance and privacy risk assessment", "AI security and adversarial robustness review", "Prioritised recommendations report"],
    process: [
      { phase: "Phase 1", title: "Inventory", description: "AI systems inventoried and classified by risk tier." },
      { phase: "Phase 2", title: "Assessment", description: "NIST AI RMF assessment across all functions." },
      { phase: "Phase 3", title: "Report", description: "Risk assessment report with prioritised recommendations." },
    ],
    pricing: [
      { name: "Standard", audience: "Up to 5 AI systems", price: "Scoped to your business", features: ["System inventory", "NIST AI RMF assessment", "Recommendations report"] },
    ],
    faqs: [],
    relatedSlugs: ["iso-42001", "iso-27001", "vciso"],
    seo: { title: "AI Risk Assessment", description: "AI risk assessment against NIST AI RMF with EU AI Act alignment.", keywords: ["AI risk assessment", "NIST AI RMF", "EU AI Act"] },
  },
  {
    slug: "managed-compliance",
    status: "core",
    hasRoute: true,
    title: "Managed Compliance",
    shortTitle: "Managed Compliance",
    description: "Certification is a control cycle, not a one-off project. Keep the system working after the audit.",
    longDescription: "A certificate is a snapshot; the management system behind it is what an auditor actually tests at surveillance. Managed Compliance keeps controls, evidence, reviews and improvement activity moving between audits, so the next assessment is a continuation of business as usual rather than a scramble. It suits organisations that have achieved certification and need to hold it, and those carrying ongoing regulatory obligations without a full-time governance function.",
    icon: UserCheck,
    category: "grc",
    features: ["Managed compliance and GRC advisory", "Internal review and audit-readiness support", "Evidence and policy maintenance", "Management-review and continual-improvement support", "Surveillance and recertification preparation", "Regulatory horizon scanning", "Risk register review and reporting", "On-demand practitioner access"],
    process: [
      { phase: "Phase 1", title: "Onboarding", description: "Review of the existing management system, current evidence position and outstanding findings, and a priority roadmap." },
      { phase: "Phase 2", title: "Ongoing governance", description: "Scheduled reviews, policy and evidence maintenance, risk register upkeep, and regulatory horizon scanning." },
      { phase: "Phase 3", title: "Audit preparation", description: "Internal review ahead of each surveillance or recertification assessment, with findings closed before the assessor arrives." },
    ],
    pricing: [
      { name: "Managed Governance & Compliance", audience: "Organisations holding certification, or carrying ongoing regulatory obligations", price: "Monthly retainer, scoped to your business", features: ["Ongoing governance and GRC advisory", "Evidence and policy maintenance", "Internal review before each assessment", "Surveillance and recertification preparation", "On-demand practitioner access"] },
    ],
    faqs: [
      { question: "We are already certified. What does this actually cover?", answer: "The work that keeps a management system credible between assessments: risk register reviews, evidence collection, policy updates as the business changes, management review, internal audit, and closing findings. Surveillance assessments test whether the system is operating, not whether the documents exist." },
      { question: "How is this different from vCISO?", answer: "vCISO is security leadership: strategy, risk ownership and board reporting. Managed Compliance is the governance and evidence engine underneath it. Organisations often take both, and they are scoped together where that is the case." },
      { question: "Do you handle the surveillance assessment itself?", answer: "We prepare you for it and support findings through to closure. The assessment is carried out by your certification body, which is independent of us by design." },
    ],
    relatedSlugs: ["vciso", "vdpo", "iso-27001"],
    seo: { title: "Managed Compliance UK", description: "Ongoing governance, evidence maintenance and audit readiness between assessments. Surveillance and recertification preparation, scoped to your business.", keywords: ["managed compliance", "managed GRC", "surveillance audit support", "audit readiness"] },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Services that have their own page and are still offered.
 *
 * This replaces three separately-maintained copies of the same slug list that
 * had grown up in ServicesGrid.tsx, ServicesOverviewContent.tsx and sitemap.ts.
 * Three hand-kept copies of "which services have pages" is how a withdrawn
 * service stays in the sitemap after its route is deleted.
 */
export function getRoutedServices(): Service[] {
  return services.filter((s) => s.hasRoute && s.status !== "retired");
}

export function getRelatedServices(slugs: string[]): Service[] {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s) && s!.status !== "retired" && s!.hasRoute);
}
