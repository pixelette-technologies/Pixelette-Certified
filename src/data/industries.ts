import {
  Landmark, Cpu, Heart, GraduationCap, ShoppingCart,
  Building2, Scale, Factory, Wifi, Truck, Gavel, Zap, Radio,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Industry {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  challenges: string[];
  certifications: string[];
  /** What procurement in this sector actually asks for. Never a client outcome. */
  procurementReality: string;
  /** Requirement signals for the sector. Never a performance figure. */
  signals: { value: string; label: string }[];
}

export const industries: Industry[] = [
  {
    slug: "fintech",
    title: "FinTech & Financial Services",
    shortTitle: "FinTech",
    description: "Enterprise clients and regulators expect evidenced security governance. We build the management system and the evidence behind it.",
    longDescription:
      "Financial technology companies operate under intense scrutiny from regulators, enterprise banking partners, and investors. FCA expectations, PSD2 requirements, and enterprise procurement security questionnaires all demand formal certification. Without ISO 27001, your pipeline stalls at the security review stage.",
    icon: Landmark,
    challenges: [
      "Enterprise banks require ISO 27001 as a non-negotiable procurement condition",
      "FCA expectations around data governance and operational resilience are increasing",
      "Cyber insurance underwriters demand certified security posture for favourable premiums",
      "Series B+ investors scrutinise information security governance during due diligence",
      "PCI DSS, SOC 2, and ISO 27001 overlap creates compliance fatigue without expert guidance",
    ],
    certifications: ["ISO 27001", "Cyber Essentials Plus", "ISO 22301", "GDPR", "vCISO"],
    procurementReality: "Enterprise banking partners, FCA-regulated counterparties and cyber insurers each ask for formal evidence of information security governance before onboarding. ISO 27001 is the usual reference point, and the security review is where uncertified suppliers stall.",
    signals: [
      { value: "ISO 27001", label: "Common procurement condition" },
      { value: "DORA", label: "Operational resilience in scope" },
      { value: "Fixed-fee", label: "Scoped before work begins" },
    ],
  },
  {
    slug: "ai-technology",
    title: "AI & Machine Learning Companies",
    shortTitle: "AI & ML",
    description: "AI governance is becoming a procurement requirement. ISO/IEC 42001 is the management system standard buyers are starting to ask for.",
    longDescription:
      "AI companies face a unique compliance landscape. The EU AI Act, enterprise AI procurement requirements, and growing public scrutiny around responsible AI all demand formal governance frameworks. ISO 42001 is the standard that proves you build AI responsibly, and the companies that achieve it now gain a structural advantage.",
    icon: Cpu,
    challenges: [
      "EU AI Act compliance deadlines are approaching with significant penalties for non-compliance",
      "Enterprise clients are adding AI governance questions to security questionnaires",
      "Bias, fairness, and transparency requirements need structured assessment frameworks",
      "Investors are scrutinising AI risk management in due diligence",
      "GDPR Article 22 automated decision-making obligations overlap with AI governance",
    ],
    certifications: ["ISO 42001", "ISO 27001", "GDPR", "vCISO"],
    procurementReality: "AI governance questions are appearing in enterprise security questionnaires alongside the EU AI Act timetable. Buyers increasingly want evidence of accountability, risk ownership, data governance and human oversight rather than a policy document.",
    signals: [
      { value: "ISO 42001", label: "AI management system standard" },
      { value: "EU AI Act", label: "Obligations phasing in" },
      { value: "Shared controls", label: "Integrates with ISO 27001" },
    ],
  },
  {
    slug: "saas-technology",
    title: "SaaS & Technology Platforms",
    shortTitle: "SaaS",
    description: "ISO 27001 is the ticket to enterprise sales. Stop losing deals to certified competitors.",
    longDescription:
      "SaaS companies scaling into the enterprise market hit the same wall: procurement teams require ISO 27001 as a minimum security standard. Every month without certification is pipeline lost to competitors who already have it. We build the management system, the controls and the evidence pack that turns a questionnaire from a fire drill into a repeatable response.",
    icon: Wifi,
    challenges: [
      "Enterprise procurement requires ISO 27001 as a first-pass filter",
      "Security questionnaires consume 40+ engineering hours per month",
      "Multi-tenant architecture creates unique scope and control requirements",
      "SOC 2 demand from US clients adds to the compliance burden",
      "Rapid feature development outpaces security documentation",
    ],
    certifications: ["ISO 27001", "Cyber Essentials", "vCISO", "Penetration Testing", "GDPR"],
    procurementReality: "Security questionnaires have become a sales gate rather than a formality. A maintained control environment and a current evidence pack turn a multi-day response exercise into a repeatable one.",
    signals: [
      { value: "ISO 27001", label: "Enterprise baseline" },
      { value: "SOC 2", label: "Common for US buyers" },
      { value: "Evidence pack", label: "Questionnaire-ready" },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare & HealthTech",
    shortTitle: "Healthcare",
    description: "NHS supply chain compliance and patient data protection require certified security. We deliver both.",
    longDescription:
      "Healthcare technology companies operate in one of the most regulated environments in the UK. NHS Digital supply chain requirements mandate Cyber Essentials, while private healthcare clients and insurers require ISO 27001. Patient data sensitivity adds GDPR obligations that demand formal privacy governance.",
    icon: Heart,
    challenges: [
      "NHS Digital supply chain mandates Cyber Essentials for all technology suppliers",
      "Private healthcare clients require ISO 27001 for data processing agreements",
      "Patient data sensitivity demands rigorous GDPR compliance and DPIAs",
      "Multi-site operations complicate scope and control consistency",
      "Clinical safety standards intersect with information security requirements",
    ],
    certifications: ["Cyber Essentials Plus", "ISO 27001", "ISO 22301", "GDPR", "vDPO"],
    procurementReality: "NHS supply chain routes, DSPT and DTAC each set their own evidence expectations, and private healthcare clients commonly require information security assurance before a data processing agreement is signed.",
    signals: [
      { value: "Cyber Essentials", label: "Common public sector gate" },
      { value: "ISO 27001", label: "Data processing assurance" },
      { value: "DSPT / DTAC", label: "NHS evidence routes" },
    ],
  },
  {
    slug: "professional-services",
    title: "Professional Services & Consulting",
    shortTitle: "Prof. Services",
    description: "Demonstrate trust and governance excellence to enterprise clients with formal certification.",
    longDescription:
      "Professional services firms, law firms, accountancies, management consultancies, and recruitment agencies, handle sensitive client data daily. Enterprise clients increasingly require ISO 27001 and formal data protection governance from their professional service providers.",
    icon: Building2,
    challenges: [
      "Enterprise clients mandate ISO 27001 for professional service suppliers",
      "Handling sensitive client data creates significant liability exposure",
      "Multi-office operations require consistent security governance",
      "Regulatory bodies are increasing expectations around data protection",
      "Competitive differentiation requires demonstrable security posture",
    ],
    certifications: ["ISO 27001", "ISO 9001", "Cyber Essentials", "GDPR", "vCISO"],
    procurementReality: "Client audit clauses and panel onboarding increasingly ask for a documented management system rather than a policy pack, particularly where client data crosses jurisdictions.",
    signals: [
      { value: "ISO 27001", label: "Client audit expectation" },
      { value: "ISO 9001", label: "Panel onboarding" },
      { value: "Multi-office", label: "Scope set at diagnostic" },
    ],
  },
  {
    slug: "government-suppliers",
    title: "Government & Public Sector Suppliers",
    shortTitle: "Gov Suppliers",
    description: "Cyber Essentials is mandatory. ISO 27001 wins frameworks. We handle both.",
    longDescription:
      "Any company selling to the UK government must hold Cyber Essentials certification. For higher-assurance contracts, defence, NHS, critical infrastructure, Cyber Essentials Plus and ISO 27001 are required. We fast-track government suppliers through both certifications.",
    icon: Scale,
    challenges: [
      "Cyber Essentials is mandatory for all UK government contract suppliers",
      "Higher-assurance contracts require Cyber Essentials Plus and ISO 27001",
      "Framework deadlines create urgent certification timelines",
      "MOD and defence sector contracts require additional security clearances",
      "Annual renewal requirements demand ongoing compliance management",
    ],
    certifications: ["Cyber Essentials", "Cyber Essentials Plus", "ISO 27001", "ISO 22301", "vCISO"],
    procurementReality: "Cyber Essentials is commonly required across UK public sector supply chains, and framework applications set their own submission deadlines. The assessment itself is delivered by a licensed Certification Body.",
    signals: [
      { value: "Cyber Essentials", label: "Readiness and coordination" },
      { value: "Frameworks", label: "Deadline-driven" },
      { value: "Licensed CB", label: "Performs the assessment" },
    ],
  },
  {
    slug: "ecommerce-retail",
    title: "E-Commerce & Retail Technology",
    shortTitle: "E-Commerce",
    description: "Protect customer data, meet payment security standards, and build buyer trust.",
    longDescription:
      "E-commerce and retail technology companies process millions of transactions and store sensitive customer data. Payment card industry requirements, GDPR obligations, and enterprise retail partner security expectations all demand formal compliance. ISO 27001 and Cyber Essentials build the trust that drives conversion.",
    icon: ShoppingCart,
    challenges: [
      "Payment processing requires formal security governance",
      "GDPR obligations around customer data are significant",
      "Enterprise retail partners require ISO 27001 for integration",
      "Data breach risk directly impacts brand trust and revenue",
      "Multi-channel operations create complex data flow requirements",
    ],
    certifications: ["ISO 27001", "Cyber Essentials", "GDPR", "Penetration Testing", "vCISO"],
    procurementReality: "Payment data, enterprise retail partners and cyber insurers each place their own evidence requirements on retailers, and PCI DSS obligations sit alongside rather than inside an ISO management system.",
    signals: [
      { value: "PCI DSS", label: "Readiness and support" },
      { value: "ISO 27001", label: "Partner onboarding" },
      { value: "Insurers", label: "Ask for control evidence" },
    ],
  },
  {
    slug: "education",
    title: "Education & EdTech",
    shortTitle: "EdTech",
    description: "Protect student data, meet DfE requirements, and win institutional contracts.",
    longDescription:
      "Education technology companies handle some of the most sensitive data categories, children's personal information. DfE standards, institutional procurement requirements, and GDPR children's data provisions all demand formal security and privacy governance.",
    icon: GraduationCap,
    challenges: [
      "Children's data requires heightened GDPR protections and DPIAs",
      "DfE and institutional procurement demand formal security certification",
      "Multi-academy trusts and universities require ISO 27001 from suppliers",
      "Safeguarding obligations intersect with data protection requirements",
      "International expansion requires compliance across multiple jurisdictions",
    ],
    certifications: ["ISO 27001", "Cyber Essentials", "GDPR", "vDPO", "ISO 9001"],
    procurementReality: "Multi-academy trusts and institutional buyers apply heightened scrutiny where children's data is processed, and UK GDPR obligations around consent and safeguarding sit alongside security requirements.",
    signals: [
      { value: "ISO 27001", label: "Institutional procurement" },
      { value: "UK GDPR", label: "Children's data duties" },
      { value: "DPIA", label: "Commonly required" },
    ],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing & Industrial",
    shortTitle: "Manufacturing",
    description: "Global supply chains demand certified quality, environmental responsibility, and information security from every supplier at every tier.",
    longDescription: "Global supply chains demand certified quality, environmental responsibility, and information security from every supplier at every tier.",
    icon: Factory,
    challenges: [
      "Tier 1 manufacturers and global OEMs require ISO 9001 quality management certification from all suppliers in their chain",
      "Environmental management certification (ISO 14001) is increasingly mandatory for supply chain inclusion and ESG compliance",
      "Industrial and operational technology environments require formal information security governance as part of supply chain risk management",
    ],
    certifications: ["ISO 9001", "ISO 14001", "ISO 27001", "ISO 22301"],
    procurementReality: "OEM approved-supplier lists commonly require a quality management system, and environmental criteria increasingly appear alongside it in supply chain onboarding.",
    signals: [
      { value: "ISO 9001", label: "Approved supplier lists" },
      { value: "ISO 14001", label: "Environmental criteria" },
      { value: "Integrated", label: "Shared documentation" },
    ],
  },
  {
    slug: "logistics",
    title: "Logistics & Supply Chain",
    shortTitle: "Logistics",
    description: "Cross-border operations require compliance that keeps pace with your supply chain, across every country you move goods through.",
    longDescription: "Cross-border operations require compliance that keeps pace with your supply chain, across every country you move goods through.",
    icon: Truck,
    challenges: [
      "Multinational clients require ISO 27001 and ISO 22301 from all logistics and supply chain partners before onboarding",
      "Business continuity certification is essential for 3PL, freight forwarding, and last-mile delivery providers",
      "GDPR and international data transfer obligations apply to any logistics operator processing personal data across borders",
    ],
    certifications: ["ISO 27001", "ISO 22301", "ISO 9001", "GDPR"],
    procurementReality: "Multinational distribution clients ask for both information security and demonstrable continuity planning, because a supplier outage propagates directly into their own operations.",
    signals: [
      { value: "ISO 27001", label: "Client security requirement" },
      { value: "ISO 22301", label: "Continuity assurance" },
      { value: "Integrated", label: "Shared documentation" },
    ],
  },
  {
    slug: "legal",
    title: "Legal & Professional Services",
    shortTitle: "Legal",
    description: "Client privilege is sacred. Certified information security proves you treat it that way, to every client, regulator, and auditor.",
    longDescription: "Client privilege is sacred. Certified information security proves you treat it that way, to every client, regulator, and auditor.",
    icon: Gavel,
    challenges: [
      "Law firms, accountancy practices, and advisory firms handle privileged and sensitive client data requiring formal, certified security controls",
      "Bar associations and regulatory bodies are increasingly requiring demonstrable information security standards from member firms",
      "Global law firm networks require ISO 27001 certification from all affiliated offices and supplier organisations",
    ],
    certifications: ["ISO 27001", "GDPR", "vCISO", "ISO 9001"],
    procurementReality: "SRA expectations, client audit rights and global client networks each set their own information security requirements, and firms operating across jurisdictions face several at once.",
    signals: [
      { value: "ISO 27001", label: "Client network requirement" },
      { value: "ISO 9001", label: "Quality assurance" },
      { value: "Multi-jurisdiction", label: "Scope set at diagnostic" },
    ],
  },
  {
    slug: "energy",
    title: "Energy & Utilities",
    shortTitle: "Energy",
    description: "Critical infrastructure compliance is not optional. It is a regulatory requirement in virtually every jurisdiction.",
    longDescription: "Critical infrastructure compliance is not optional. It is a regulatory requirement in virtually every jurisdiction.",
    icon: Zap,
    challenges: [
      "Energy sector regulators across the UK, EU, UAE, and US mandate information security and business continuity certification",
      "ISO 14001 environmental management is a procurement prerequisite for utilities, energy generators, and infrastructure suppliers",
      "NIS2 in Europe, NESA in the UAE, and equivalent frameworks in other markets create binding compliance obligations for energy sector participants",
    ],
    certifications: ["ISO 27001", "ISO 22301", "ISO 14001", "vCISO"],
    procurementReality: "Utilities procurement frameworks commonly set both security and environmental criteria, and critical infrastructure obligations raise the evidence bar further.",
    signals: [
      { value: "ISO 27001", label: "Framework criterion" },
      { value: "ISO 14001", label: "Environmental criterion" },
      { value: "Critical infrastructure", label: "Heightened scrutiny" },
    ],
  },
  {
    slug: "telecommunications",
    title: "Telecommunications",
    shortTitle: "Telecom",
    description: "Network operators and telecoms suppliers face some of the most demanding security certification requirements anywhere in the world.",
    longDescription: "Network operators and telecoms suppliers face some of the most demanding security certification requirements anywhere in the world.",
    icon: Radio,
    challenges: [
      "Telecoms regulators globally require ISO 27001 as a baseline information security standard for licensed operators",
      "Business continuity certification is non-negotiable for any provider operating critical communications infrastructure",
      "Penetration testing and vulnerability assessment requirements are embedded in most national telecoms regulatory frameworks",
    ],
    certifications: ["ISO 27001", "ISO 22301", "Penetration Testing", "vCISO"],
    procurementReality: "National operator procurement processes apply detailed security requirements to software suppliers, and evidence of a maintained control environment is normally requested rather than a point-in-time statement.",
    signals: [
      { value: "ISO 27001", label: "Operator requirement" },
      { value: "ISO 22301", label: "Service continuity" },
      { value: "Maintained", label: "Evidence kept current" },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
