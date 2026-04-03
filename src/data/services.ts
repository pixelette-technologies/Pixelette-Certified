import {
  Shield, ShieldCheck, Globe, Leaf, Brain, Lock,
  UserCheck, FileSearch, Bug, Scale,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  week: string;
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

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  category: "iso" | "cyber" | "advisory" | "privacy";
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
    title: "ISO 27001 Certification",
    shortTitle: "ISO 27001",
    description: "The global standard for information security management. Get certified in 10 weeks.",
    longDescription:
      "ISO 27001 is the international standard for information security management. It defines the requirements for an Information Security Management System (ISMS) — a structured framework of policies, procedures, and controls that protects your organisation's information assets. For UK technology companies, ISO 27001 has become the de facto requirement for selling to enterprise clients, winning government contracts, passing investor due diligence, and qualifying for cyber insurance at favourable rates. Whether you are a SaaS platform targeting enterprise clients, a healthcare provider seeking NHS supply chain approval, a FinTech navigating FCA or DORA requirements, a manufacturer seeking supply chain inclusion, or any other organisation that handles sensitive data — ISO 27001 is your foundation.",
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
      { week: "Week 1", title: "Kickoff & Gap Analysis", description: "Initial meeting, scope definition, gap analysis conducted, remediation roadmap delivered." },
      { week: "Weeks 2–5", title: "Documentation Build", description: "All ISMS policies written, risk assessment conducted, SoA drafted, asset inventory built." },
      { week: "Weeks 6–8", title: "Controls Implementation", description: "Technical and organisational controls implemented and evidenced, staff training delivered." },
      { week: "Week 9", title: "Internal Audit", description: "Full internal audit conducted, non-conformities identified and closed." },
      { week: "Weeks 10–12", title: "External Audit", description: "Stage 1 documentation review and Stage 2 compliance audit. Certificate issued." },
    ],
    pricing: [
      { name: "Essentials", audience: "Startups and SMEs up to 50 employees", price: "From £8,500", features: ["Gap analysis", "ISMS documentation", "SoA", "Risk register", "1 internal audit", "Stage 1 + Stage 2 support"] },
      { name: "Professional", audience: "Scale-ups 50–150 employees", price: "From £13,500", features: ["Everything in Essentials", "Staff training", "6-month vCISO Basic", "Surveillance audit support Year 1"] },
      { name: "Enterprise", audience: "150+ employees or regulated sectors", price: "From £22,000", features: ["Everything in Professional", "vCISO Standard 12 months", "GDPR alignment layer", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "How long does ISO 27001 take?", answer: "Our standard implementation runs 10–12 weeks from kickoff to Stage 2 audit. Complex organisations or those with significant existing gaps may take 14–16 weeks." },
      { question: "Do we need ISO 27001 or Cyber Essentials?", answer: "They solve different problems. Cyber Essentials covers 5 basic technical controls and is required for UK government contracts. ISO 27001 is a full management system required by enterprise clients globally. Many companies start with Cyber Essentials and progress to ISO 27001." },
      { question: "What happens if we fail the Stage 2 audit?", answer: "Clients who go through our full implementation process do not fail Stage 2 on documentation grounds. If a failure occurs due to a gap in our documentation, we cover the remediation at no additional cost." },
      { question: "Do we need to be technical to get ISO 27001?", answer: "No. ISO 27001 is a management system standard, not a technical standard. We write the documentation, implement the controls, and manage the process. Your team needs to understand the policies and follow them, which we train them to do." },
      { question: "Can we get ISO 27001 and SOC 2 at the same time?", answer: "Yes, and it is efficient to do so. They share 60–70% of control requirements. We can run a combined implementation reducing total cost and time significantly." },
    ],
    relatedSlugs: ["cyber-essentials", "vciso", "gdpr-privacy"],
    seo: {
      title: "ISO 27001 Certification UK | 10 Weeks | From £8,500",
      description: "Get ISO 27001 certified in 10 weeks. UK-based expert-led implementation from gap analysis to Stage 2 audit. Fixed fee from £8,500. 98% first-attempt pass rate.",
      keywords: ["ISO 27001 certification UK", "ISO 27001 consultant", "ISMS implementation", "information security certification"],
    },
  },
  {
    slug: "iso-22301",
    title: "ISO 22301 Certification",
    shortTitle: "ISO 22301",
    description: "Business continuity certification. Demonstrate resilience and stay operational when it matters most.",
    longDescription:
      "ISO 22301 is the international standard for Business Continuity Management Systems (BCMS). It helps your organisation prepare for, respond to, and recover from disruptions — whether cyber attacks, supply chain failures, natural disasters, or infrastructure outages.",
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
      { week: "Week 1", title: "Kickoff & BIA", description: "Scope definition, business impact analysis, critical function identification." },
      { week: "Weeks 2–5", title: "BCMS Documentation", description: "BC policies, plans, and procedures written. Recovery strategies defined." },
      { week: "Weeks 6–8", title: "Implementation & Testing", description: "Plans tested through exercises. Staff trained. Gaps identified and closed." },
      { week: "Week 9", title: "Internal Audit", description: "Full internal audit and management review conducted." },
      { week: "Weeks 10–12", title: "External Audit", description: "Stage 1 and Stage 2 certification audit. Certificate issued." },
    ],
    pricing: [
      { name: "Essentials", audience: "SMEs up to 50 employees", price: "From £9,500", features: ["Gap analysis", "BCMS documentation", "BIA", "BC plans", "Internal audit", "Audit support"] },
      { name: "Professional", audience: "50–150 employees", price: "From £14,500", features: ["Everything in Essentials", "Exercise programme", "Staff training", "Year 1 surveillance support"] },
      { name: "Enterprise", audience: "150+ employees", price: "From £24,000", features: ["Everything in Professional", "Multi-site coverage", "Integrated DR planning", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "What is the difference between ISO 22301 and ISO 27001?", answer: "ISO 27001 focuses on information security management. ISO 22301 focuses on business continuity — ensuring your organisation can continue operating during and after a disruption. Many organisations pursue both as they are complementary." },
      { question: "How long does ISO 22301 certification take?", answer: "Typically 10–14 weeks depending on your organisation's complexity and existing business continuity measures." },
    ],
    relatedSlugs: ["iso-27001", "iso-9001", "vciso"],
    seo: {
      title: "ISO 22301 Business Continuity Certification UK",
      description: "ISO 22301 certification for UK businesses. Business continuity management, disaster recovery planning, and audit support. Expert-led implementation.",
      keywords: ["ISO 22301 certification UK", "business continuity", "BCMS", "disaster recovery"],
    },
  },
  {
    slug: "iso-9001",
    title: "ISO 9001 Certification",
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
      { week: "Week 1", title: "Kickoff & Gap Analysis", description: "Current quality practices assessed against ISO 9001 requirements." },
      { week: "Weeks 2–5", title: "QMS Documentation", description: "Quality manual, procedures, and process maps developed." },
      { week: "Weeks 6–8", title: "Implementation", description: "QMS implemented, staff trained, evidence gathered." },
      { week: "Week 9", title: "Internal Audit", description: "Full internal audit conducted, findings addressed." },
      { week: "Weeks 10–12", title: "External Audit", description: "Stage 1 and Stage 2 certification audit." },
    ],
    pricing: [
      { name: "Essentials", audience: "SMEs up to 50 employees", price: "From £7,500", features: ["Gap analysis", "QMS documentation", "Process mapping", "Internal audit", "Audit support"] },
      { name: "Professional", audience: "50–150 employees", price: "From £12,000", features: ["Everything in Essentials", "Staff training", "Performance metrics setup", "Year 1 surveillance"] },
      { name: "Enterprise", audience: "150+ employees", price: "From £19,000", features: ["Everything in Professional", "Multi-site coverage", "Integrated management system", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "Is ISO 9001 relevant for technology companies?", answer: "Absolutely. ISO 9001 demonstrates that your development processes, service delivery, and customer support meet consistently high standards. Many enterprise procurement teams require it." },
    ],
    relatedSlugs: ["iso-27001", "iso-14001", "iso-22301"],
    seo: {
      title: "ISO 9001 Quality Management Certification UK",
      description: "ISO 9001 certification for UK businesses. Quality management system implementation, audit support, and continuous improvement. From £7,500.",
      keywords: ["ISO 9001 certification UK", "quality management", "QMS"],
    },
  },
  {
    slug: "iso-14001",
    title: "ISO 14001 Certification",
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
      { week: "Week 1", title: "Kickoff & Environmental Review", description: "Current environmental practices assessed, aspects and impacts identified." },
      { week: "Weeks 2–5", title: "EMS Documentation", description: "Environmental policy, procedures, and controls documented." },
      { week: "Weeks 6–8", title: "Implementation", description: "Controls implemented, monitoring established, staff trained." },
      { week: "Week 9", title: "Internal Audit", description: "Full EMS audit conducted, corrective actions taken." },
      { week: "Weeks 10–12", title: "External Audit", description: "Certification body audit. Certificate issued." },
    ],
    pricing: [
      { name: "Essentials", audience: "SMEs", price: "From £8,000", features: ["Gap analysis", "EMS documentation", "Aspects register", "Internal audit", "Audit support"] },
      { name: "Professional", audience: "50–150 employees", price: "From £13,000", features: ["Everything in Essentials", "Staff training", "Monitoring programme", "Year 1 surveillance"] },
      { name: "Enterprise", audience: "150+ employees", price: "From £20,000", features: ["Everything in Professional", "Multi-site", "Integrated management system", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "Why do tech companies need ISO 14001?", answer: "Data centres, office operations, and supply chains all have environmental impacts. ISO 14001 demonstrates responsible environmental management to clients, investors, and regulators increasingly focused on ESG." },
    ],
    relatedSlugs: ["iso-9001", "iso-27001", "iso-22301"],
    seo: {
      title: "ISO 14001 Environmental Management Certification UK",
      description: "ISO 14001 certification for UK businesses. Environmental management system implementation and audit support.",
      keywords: ["ISO 14001 certification UK", "environmental management", "EMS", "sustainability certification"],
    },
  },
  {
    slug: "iso-42001",
    title: "ISO 42001 AI Governance Certification",
    shortTitle: "ISO 42001",
    description: "AI governance certification. Lead responsibly in the era of artificial intelligence.",
    longDescription:
      "ISO 42001 is the international standard for Artificial Intelligence Management Systems (AIMS). Published in 2023, it defines requirements for responsible AI governance — covering risk management, transparency, accountability, ethical AI use, and continuous improvement of AI systems. For UK and EU technology companies building AI products, ISO 42001 is rapidly becoming what ISO 27001 was five years ago.",
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
      { week: "Week 1", title: "Kickoff & AI Readiness Review", description: "AI systems inventory, current governance assessment, scope definition." },
      { week: "Weeks 2–5", title: "AIMS Documentation", description: "AI policies, risk frameworks, transparency procedures, and data governance documented." },
      { week: "Weeks 6–9", title: "Implementation & Assessment", description: "Controls implemented, bias assessments conducted, staff trained on responsible AI." },
      { week: "Week 10", title: "Internal Audit", description: "Full AIMS audit, non-conformities addressed." },
      { week: "Weeks 11–14", title: "External Audit", description: "Certification body audit. Certificate issued." },
    ],
    pricing: [
      { name: "Essentials", audience: "AI startups up to 50 employees", price: "From £10,000", features: ["Gap analysis", "AIMS documentation", "AI risk assessment", "Internal audit", "Audit support"] },
      { name: "Professional", audience: "Scale-ups 50–150 employees", price: "From £15,500", features: ["Everything in Essentials", "EU AI Act mapping", "Staff training", "Year 1 surveillance"] },
      { name: "Enterprise", audience: "150+ or regulated AI", price: "From £26,000", features: ["Everything in Professional", "Multi-system coverage", "Board advisory", "Year 1 + 2 surveillance"] },
    ],
    faqs: [
      { question: "Who needs ISO 42001?", answer: "Any company that builds, deploys, or integrates AI systems — especially those selling to enterprise clients, operating in regulated sectors, or subject to the EU AI Act." },
      { question: "Is ISO 42001 mandatory?", answer: "Not yet, but the EU AI Act references ISO 42001 as a primary compliance framework. Enterprise clients are starting to require it in procurement questionnaires, similar to how ISO 27001 became a requirement for SaaS companies." },
    ],
    relatedSlugs: ["iso-27001", "gdpr-privacy", "vciso"],
    seo: {
      title: "ISO 42001 AI Governance Certification UK | Pixelette",
      description: "Achieve ISO 42001 AI governance certification in 14 weeks. One of the only UK consultancies formally offering ISO 42001. EU AI Act ready.",
      keywords: ["ISO 42001 certification", "AI governance", "AIMS", "EU AI Act compliance", "responsible AI"],
    },
  },
  {
    slug: "cyber-essentials",
    title: "Cyber Essentials Certification",
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
      { week: "Week 1", title: "Gap Analysis", description: "Review of your current security controls against Cyber Essentials requirements." },
      { week: "Week 2", title: "Remediation", description: "Address identified gaps in firewall, patching, access control, malware protection, and configuration." },
      { week: "Week 3", title: "Certification", description: "Complete self-assessment (CE) or technical assessment (CE+). Certificate issued." },
    ],
    pricing: [
      { name: "Cyber Essentials", audience: "All businesses", price: "From £1,800", features: ["Gap analysis", "Remediation guidance", "Self-assessment preparation", "Submission management"] },
      { name: "Cyber Essentials Plus", audience: "Higher-assurance requirements", price: "From £3,200", features: ["Everything in CE", "External vulnerability scanning", "Configuration testing", "Hands-on technical assessment"] },
    ],
    faqs: [
      { question: "What is the difference between CE and CE Plus?", answer: "Cyber Essentials is a self-assessment verified by a certifying body. Cyber Essentials Plus includes external hands-on technical testing — vulnerability scanning and configuration testing by an assessor." },
      { question: "How quickly can we get certified?", answer: "Cyber Essentials typically takes 2–3 weeks. Cyber Essentials Plus takes 4–6 weeks due to the external testing component." },
    ],
    relatedSlugs: ["iso-27001", "penetration-testing", "vciso"],
    seo: {
      title: "Cyber Essentials Certification UK | From £1,800",
      description: "UK government-backed Cyber Essentials and Cyber Essentials Plus certification. From £1,800. Fast-track 2–3 week delivery for government suppliers and NHS.",
      keywords: ["Cyber Essentials certification", "Cyber Essentials Plus", "UK government certification", "cybersecurity certification"],
    },
  },
  {
    slug: "vciso",
    title: "Virtual CISO (vCISO)",
    shortTitle: "vCISO",
    description: "Senior security leadership, without the senior hire. A fractional CISO for your business.",
    longDescription:
      "A Chief Information Security Officer (CISO) is one of the most important roles in a modern technology company. A Virtual CISO gives you everything a full-time CISO provides — board-level security strategy, risk management, compliance governance, supplier security oversight, incident response leadership — at a monthly retainer that scales with your needs.",
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
      { week: "Week 1", title: "Onboarding", description: "Security posture review, stakeholder meetings, priority identification." },
      { week: "Weeks 2–4", title: "Foundation", description: "Security roadmap, governance framework, quick wins delivered." },
      { week: "Ongoing", title: "Retainer", description: "Monthly advisory, board reports, risk management, questionnaire support." },
    ],
    pricing: [
      { name: "vCISO Basic", audience: "Post-certification governance", price: "From £2,800/mo", features: ["10–12 hrs/month", "Monthly security review", "Board report", "Policy maintenance", "Email support"] },
      { name: "vCISO Standard", audience: "Active enterprise sales", price: "From £4,200/mo", features: ["18–22 hrs/month", "All Basic features", "Security questionnaire management", "Incident response planning", "Quarterly risk register update"] },
      { name: "vCISO Enterprise", audience: "Regulated / pre-IPO", price: "From £7,500/mo", features: ["22–30 hrs/month", "All Standard features", "On-site presence", "Board presentation", "M&A security due diligence"] },
    ],
    faqs: [
      { question: "How is a vCISO different from a consultant?", answer: "A consultant delivers a project and leaves. A vCISO is an ongoing senior security leader embedded in your business — attending board meetings, managing your security programme, and being accountable for outcomes." },
      { question: "Can we scale up or down?", answer: "Yes. vCISO retainers are flexible. You can move between tiers as your needs change, with 30 days notice." },
    ],
    relatedSlugs: ["iso-27001", "vdpo", "penetration-testing"],
    seo: {
      title: "Virtual CISO (vCISO) UK | From £2,800/month",
      description: "Senior security leadership without the full-time hire. vCISO retainers from £2,800/month. Board-level strategy, risk management, and compliance governance.",
      keywords: ["vCISO UK", "virtual CISO", "fractional CISO", "security leadership"],
    },
  },
  {
    slug: "vdpo",
    title: "Virtual DPO (vDPO)",
    shortTitle: "vDPO",
    description: "Your dedicated Data Protection Officer, on demand. Expert privacy leadership at a fraction of the cost.",
    longDescription:
      "Under GDPR, many organisations are required to appoint a Data Protection Officer. Our vDPO service provides a qualified, experienced DPO on a flexible retainer — handling data subject requests, maintaining your ROPA, advising on DPIAs, and ensuring your privacy programme stays compliant.",
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
      { week: "Week 1", title: "Onboarding", description: "Privacy posture review, ROPA audit, priority gap identification." },
      { week: "Weeks 2–4", title: "Foundation", description: "ROPA updated, DPIA framework established, policies reviewed." },
      { week: "Ongoing", title: "Retainer", description: "Ongoing DPO duties, DSR management, compliance monitoring." },
    ],
    pricing: [
      { name: "vDPO", audience: "All organisations", price: "From £2,000/mo", features: ["8–10 hrs/month", "ROPA maintenance", "DSR handling", "DPIA advisory", "Privacy policy reviews", "Email support"] },
    ],
    faqs: [
      { question: "Do we legally need a DPO?", answer: "Under GDPR Article 37, you need a DPO if you are a public authority, carry out large-scale systematic monitoring, or process special category data at scale. Even if not legally required, having a DPO demonstrates strong data governance." },
    ],
    relatedSlugs: ["gdpr-privacy", "vciso", "iso-27001"],
    seo: {
      title: "Virtual DPO (vDPO) Service UK | GDPR Data Protection Officer",
      description: "Virtual Data Protection Officer service. GDPR compliance, DSR management, DPIAs, and ongoing DPO duties. From £2,000/month.",
      keywords: ["vDPO UK", "virtual DPO", "data protection officer", "GDPR DPO"],
    },
  },
  {
    slug: "penetration-testing",
    title: "Penetration Testing (VAPT)",
    shortTitle: "Penetration Testing",
    description: "Find your vulnerabilities before attackers do. Expert-led security testing for any environment.",
    longDescription:
      "Our Vulnerability Assessment and Penetration Testing (VAPT) service identifies security weaknesses in your applications, networks, and infrastructure before attackers exploit them. Conducted by CREST-certified testers using industry-standard methodologies.",
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
      { week: "Week 1", title: "Scoping & Planning", description: "Define scope, agree rules of engagement, set up testing environment." },
      { week: "Weeks 2–3", title: "Testing", description: "Active penetration testing conducted against agreed scope." },
      { week: "Week 4", title: "Reporting", description: "Detailed findings report with CVSS scores, executive summary, remediation guidance." },
    ],
    pricing: [
      { name: "Web/API Test", audience: "Single application", price: "From £2,800/app", features: ["OWASP Top 10 testing", "API endpoint testing", "CVSS-scored report", "Remediation guidance", "Re-test included"] },
    ],
    faqs: [
      { question: "How often should we do pen testing?", answer: "At minimum annually, and after any significant changes to your applications or infrastructure. Many compliance frameworks (ISO 27001, PCI DSS) require at least annual testing." },
      { question: "Will testing disrupt our live systems?", answer: "We work with you to minimise disruption. Testing is typically conducted against staging environments or during low-traffic periods. We follow strict rules of engagement agreed before testing begins." },
    ],
    relatedSlugs: ["cyber-essentials", "iso-27001", "vciso"],
    seo: {
      title: "Penetration Testing UK | VAPT | Web, API & Network Testing",
      description: "Professional penetration testing for UK businesses. Web application, API, and network security testing. CVSS-scored reports. From £2,800.",
      keywords: ["penetration testing UK", "VAPT", "web application testing", "API security testing"],
    },
  },
  {
    slug: "gdpr-privacy",
    title: "GDPR & Data Privacy",
    shortTitle: "GDPR & Privacy",
    description: "Turn your data protection obligations into a competitive advantage across any jurisdiction.",
    longDescription:
      "Our GDPR and data privacy service helps organisations build robust privacy programmes that go beyond basic compliance. We transform your data protection obligations into a competitive advantage — demonstrating to clients, partners, and regulators that you take data seriously.",
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
      { week: "Week 1", title: "Privacy Assessment", description: "Current privacy practices reviewed against GDPR requirements. Gap report delivered." },
      { week: "Weeks 2–5", title: "Programme Build", description: "Privacy policies, ROPA, DPIA framework, breach procedures developed." },
      { week: "Weeks 6–8", title: "Implementation", description: "Policies implemented, consent mechanisms updated, staff trained." },
    ],
    pricing: [
      { name: "Essentials", audience: "SMEs", price: "From £5,500", features: ["GDPR assessment", "Privacy policies", "ROPA", "Breach procedures", "Staff training"] },
      { name: "Professional", audience: "Scale-ups", price: "From £9,000", features: ["Everything in Essentials", "DPIAs", "International transfers", "Quarterly reviews"] },
      { name: "Enterprise", audience: "Regulated organisations", price: "From £16,000", features: ["Everything in Professional", "vDPO service", "ICO liaison", "Multi-jurisdiction"] },
    ],
    faqs: [
      { question: "Is GDPR still relevant after Brexit?", answer: "Yes. The UK has its own version (UK GDPR) which mirrors EU GDPR. If you process data of UK residents or trade with the EU, GDPR compliance is essential." },
    ],
    relatedSlugs: ["vdpo", "iso-27001", "iso-42001"],
    seo: {
      title: "GDPR Compliance Services UK | Pixelette Certified",
      description: "Turn GDPR obligations into a competitive advantage. UK data protection compliance, DPIAs, and data mapping. Expert-led. Fixed fee from £5,500.",
      keywords: ["GDPR compliance UK", "data privacy", "data protection", "GDPR consultant"],
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return slugs.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean) as Service[];
}
