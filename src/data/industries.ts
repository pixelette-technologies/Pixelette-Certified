import {
  Landmark, Cpu, Heart, GraduationCap, ShoppingCart,
  Building2, Scale, Factory, Plane, Wifi, Truck, Gavel, Zap, Radio,
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
  caseStudySnippet: string;
  stats: { value: string; label: string }[];
}

export const industries: Industry[] = [
  {
    slug: "fintech",
    title: "FinTech & Financial Services",
    shortTitle: "FinTech",
    description: "Enterprise clients and regulators demand certified security. We get FinTechs audit-ready in weeks, not months.",
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
    caseStudySnippet: "A 65-person UK FinTech achieved ISO 27001 in 9 weeks, closing a major banking contract within 30 days of certification.",
    stats: [
      { value: "9wk", label: "Avg FinTech certification" },
      { value: "340%", label: "Enterprise pipeline increase" },
      { value: "35%", label: "Insurance premium reduction" },
    ],
  },
  {
    slug: "ai-technology",
    title: "AI & Machine Learning Companies",
    shortTitle: "AI & ML",
    description: "ISO 42001 AI governance is the new competitive edge. Be among the first certified AI companies in the UK.",
    longDescription:
      "AI companies face a unique compliance landscape. The EU AI Act, enterprise AI procurement requirements, and growing public scrutiny around responsible AI all demand formal governance frameworks. ISO 42001 is the standard that proves you build AI responsibly — and the companies that achieve it now gain a structural advantage.",
    icon: Cpu,
    challenges: [
      "EU AI Act compliance deadlines are approaching with significant penalties for non-compliance",
      "Enterprise clients are adding AI governance questions to security questionnaires",
      "Bias, fairness, and transparency requirements need structured assessment frameworks",
      "Investors are scrutinising AI risk management in due diligence",
      "GDPR Article 22 automated decision-making obligations overlap with AI governance",
    ],
    certifications: ["ISO 42001", "ISO 27001", "GDPR", "vCISO"],
    caseStudySnippet: "A 40-person AI SaaS platform achieved dual ISO 42001 + ISO 27001 certification in 14 weeks, leveraging 60% control overlap.",
    stats: [
      { value: "1st", label: "Among first UK AI consultancies" },
      { value: "60%", label: "Control overlap leveraged" },
      { value: "14wk", label: "Dual certification timeline" },
    ],
  },
  {
    slug: "saas-technology",
    title: "SaaS & Technology Platforms",
    shortTitle: "SaaS",
    description: "ISO 27001 is the ticket to enterprise sales. Stop losing deals to certified competitors.",
    longDescription:
      "SaaS companies scaling into the enterprise market hit the same wall: procurement teams require ISO 27001 as a minimum security standard. Every month without certification is pipeline lost to competitors who already have it. We specialise in getting SaaS platforms from zero to certified in 10 weeks.",
    icon: Wifi,
    challenges: [
      "Enterprise procurement requires ISO 27001 as a first-pass filter",
      "Security questionnaires consume 40+ engineering hours per month",
      "Multi-tenant architecture creates unique scope and control requirements",
      "SOC 2 demand from US clients adds to the compliance burden",
      "Rapid feature development outpaces security documentation",
    ],
    certifications: ["ISO 27001", "Cyber Essentials", "vCISO", "Penetration Testing", "GDPR"],
    caseStudySnippet: "A UK SaaS platform cut security questionnaire response time by 85% after ISO 27001 certification, closing 5 enterprise deals in Q1.",
    stats: [
      { value: "10wk", label: "Standard SaaS timeline" },
      { value: "5", label: "Enterprise deals in Q1" },
      { value: "85%", label: "Questionnaire time saved" },
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
    caseStudySnippet: "A 120-person HealthTech achieved Cyber Essentials in 3 weeks and ISO 27001 in 12 weeks, securing NHS framework eligibility.",
    stats: [
      { value: "3wk", label: "Cyber Essentials timeline" },
      { value: "12wk", label: "ISO 27001 timeline" },
      { value: "100%", label: "Contract renewals secured" },
    ],
  },
  {
    slug: "professional-services",
    title: "Professional Services & Consulting",
    shortTitle: "Prof. Services",
    description: "Demonstrate trust and governance excellence to enterprise clients with formal certification.",
    longDescription:
      "Professional services firms — law firms, accountancies, management consultancies, and recruitment agencies — handle sensitive client data daily. Enterprise clients increasingly require ISO 27001 and formal data protection governance from their professional service providers.",
    icon: Building2,
    challenges: [
      "Enterprise clients mandate ISO 27001 for professional service suppliers",
      "Handling sensitive client data creates significant liability exposure",
      "Multi-office operations require consistent security governance",
      "Regulatory bodies are increasing expectations around data protection",
      "Competitive differentiation requires demonstrable security posture",
    ],
    certifications: ["ISO 27001", "ISO 9001", "Cyber Essentials", "GDPR", "vCISO"],
    caseStudySnippet: "A multi-office consultancy unified fragmented security practices under ISO 27001 and ISO 9001 in a combined 14-week engagement.",
    stats: [
      { value: "14wk", label: "Combined ISO timeline" },
      { value: "£0", label: "Major audit findings cost" },
      { value: "25%", label: "Below market pricing" },
    ],
  },
  {
    slug: "government-suppliers",
    title: "Government & Public Sector Suppliers",
    shortTitle: "Gov Suppliers",
    description: "Cyber Essentials is mandatory. ISO 27001 wins frameworks. We handle both.",
    longDescription:
      "Any company selling to the UK government must hold Cyber Essentials certification. For higher-assurance contracts — defence, NHS, critical infrastructure — Cyber Essentials Plus and ISO 27001 are required. We fast-track government suppliers through both certifications.",
    icon: Scale,
    challenges: [
      "Cyber Essentials is mandatory for all UK government contract suppliers",
      "Higher-assurance contracts require Cyber Essentials Plus and ISO 27001",
      "Framework deadlines create urgent certification timelines",
      "MOD and defence sector contracts require additional security clearances",
      "Annual renewal requirements demand ongoing compliance management",
    ],
    certifications: ["Cyber Essentials", "Cyber Essentials Plus", "ISO 27001", "ISO 22301", "vCISO"],
    caseStudySnippet: "Achieved Cyber Essentials in 2 weeks to meet an NHS framework deadline, then ISO 27001 within 10 weeks.",
    stats: [
      { value: "2wk", label: "Fastest CE certification" },
      { value: "10wk", label: "ISO 27001 follow-on" },
      { value: "100%", label: "Framework eligibility" },
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
    caseStudySnippet: "An e-commerce platform reduced data breach insurance premiums by 40% and onboarded 3 enterprise retail partners post-certification.",
    stats: [
      { value: "40%", label: "Insurance premium reduction" },
      { value: "10wk", label: "Certification timeline" },
      { value: "3", label: "Enterprise partners gained" },
    ],
  },
  {
    slug: "education",
    title: "Education & EdTech",
    shortTitle: "EdTech",
    description: "Protect student data, meet DfE requirements, and win institutional contracts.",
    longDescription:
      "Education technology companies handle some of the most sensitive data categories — children's personal information. DfE standards, institutional procurement requirements, and GDPR children's data provisions all demand formal security and privacy governance.",
    icon: GraduationCap,
    challenges: [
      "Children's data requires heightened GDPR protections and DPIAs",
      "DfE and institutional procurement demand formal security certification",
      "Multi-academy trusts and universities require ISO 27001 from suppliers",
      "Safeguarding obligations intersect with data protection requirements",
      "International expansion requires compliance across multiple jurisdictions",
    ],
    certifications: ["ISO 27001", "Cyber Essentials", "GDPR", "vDPO", "ISO 9001"],
    caseStudySnippet: "An EdTech platform serving 200+ schools achieved ISO 27001 and GDPR compliance, unlocking multi-academy trust contracts.",
    stats: [
      { value: "200+", label: "Schools protected" },
      { value: "11wk", label: "Certification timeline" },
      { value: "100%", label: "GDPR children's compliance" },
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
    caseStudySnippet: "A manufacturing supplier achieved ISO 9001 and ISO 14001 dual certification in 16 weeks, securing inclusion on three major OEM approved supplier lists.",
    stats: [
      { value: "16wk", label: "Dual certification timeline" },
      { value: "3", label: "OEM supplier lists secured" },
      { value: "100%", label: "First-attempt pass rate" },
    ],
  },
  {
    slug: "logistics",
    title: "Logistics & Supply Chain",
    shortTitle: "Logistics",
    description: "Cross-border operations require compliance that keeps pace with your supply chain — across every country you move goods through.",
    longDescription: "Cross-border operations require compliance that keeps pace with your supply chain — across every country you move goods through.",
    icon: Truck,
    challenges: [
      "Multinational clients require ISO 27001 and ISO 22301 from all logistics and supply chain partners before onboarding",
      "Business continuity certification is essential for 3PL, freight forwarding, and last-mile delivery providers",
      "GDPR and international data transfer obligations apply to any logistics operator processing personal data across borders",
    ],
    certifications: ["ISO 27001", "ISO 22301", "ISO 9001", "GDPR"],
    caseStudySnippet: "A logistics technology provider achieved ISO 27001 and ISO 22301 in parallel in 15 weeks, securing contracts with three multinational distribution clients.",
    stats: [
      { value: "15wk", label: "Dual certification timeline" },
      { value: "3", label: "Multinational contracts won" },
      { value: "100%", label: "First-attempt pass rate" },
    ],
  },
  {
    slug: "legal",
    title: "Legal & Professional Services",
    shortTitle: "Legal",
    description: "Client privilege is sacred. Certified information security proves you treat it that way — to every client, regulator, and auditor.",
    longDescription: "Client privilege is sacred. Certified information security proves you treat it that way — to every client, regulator, and auditor.",
    icon: Gavel,
    challenges: [
      "Law firms, accountancy practices, and advisory firms handle privileged and sensitive client data requiring formal, certified security controls",
      "Bar associations and regulatory bodies are increasingly requiring demonstrable information security standards from member firms",
      "Global law firm networks require ISO 27001 certification from all affiliated offices and supplier organisations",
    ],
    certifications: ["ISO 27001", "GDPR", "vCISO", "ISO 9001"],
    caseStudySnippet: "A professional services firm with offices across three countries achieved ISO 27001 and ISO 9001 dual certification, satisfying the security requirements of two global client networks simultaneously.",
    stats: [
      { value: "14wk", label: "Combined certification" },
      { value: "3", label: "Countries covered" },
      { value: "0", label: "Major audit findings" },
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
    caseStudySnippet: "An energy technology provider achieved ISO 27001 and ISO 14001 dual certification in 16 weeks, meeting the procurement requirements of a major utilities procurement framework.",
    stats: [
      { value: "16wk", label: "Dual certification timeline" },
      { value: "100%", label: "Framework eligibility" },
      { value: "35%", label: "Insurance premium reduction" },
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
    caseStudySnippet: "A telecoms software provider achieved ISO 27001 certification in 11 weeks, satisfying the security requirements of a major national telecoms operator procurement process.",
    stats: [
      { value: "11wk", label: "Certification timeline" },
      { value: "100%", label: "Operator requirements met" },
      { value: "0", label: "Major audit findings" },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
