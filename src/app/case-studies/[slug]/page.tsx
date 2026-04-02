import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";
import type { CaseStudyData } from "./types";

export type { CaseStudyData, CaseStudyMetric } from "./types";

const caseStudiesData: Record<string, CaseStudyData> = {
  "uk-fintech-iso-27001": {
    slug: "uk-fintech-iso-27001",
    client: "UK FinTech",
    industry: "Financial Technology",
    employees: "65 employees",
    certifications: ["ISO 27001"],
    timeline: "9 weeks",
    overview:
      "A fast-growing UK FinTech company processing payments for SME merchants. Series A funded, 65 employees, SaaS platform handling sensitive financial data. Their growth was being constrained by a lack of ISO 27001 certification — enterprise prospects were declining to proceed past the security questionnaire stage.",
    challenge: [
      "The company was losing two to three enterprise deals per quarter specifically because they could not demonstrate ISO 27001 certification. Prospects in financial services and insurance required it as a non-negotiable procurement condition.",
      "The security team was spending over forty hours per month answering security questionnaires with custom narrative responses. Without a formal ISMS, every questionnaire required bespoke answers that consumed engineering and compliance resources.",
      "Cyber insurance premiums were significantly higher than certified competitors, eroding margins. The absence of certification was also flagged during their Series B due diligence preparation.",
    ],
    solution: [
      "We conducted a comprehensive gap analysis in week one, mapping the company's existing security controls against ISO 27001 requirements. The analysis revealed strong technical controls but significant gaps in documentation, governance, and formal risk management.",
      "Over weeks two through five, we built the complete ISMS documentation suite — thirty-two policies, a risk register with one hundred and fifty entries, the Statement of Applicability covering all ninety-three Annex A controls, and supporting procedures.",
      "Weeks six through eight focused on controls implementation and evidence gathering. We worked with their engineering team to formalise access control procedures, implement monitoring, and establish incident response processes.",
      "The internal audit in week nine identified three minor non-conformities, all of which were closed within forty-eight hours. The Stage 1 and Stage 2 external audits followed immediately, resulting in certification with zero major findings.",
    ],
    metrics: [
      { value: "9", label: "Weeks to certification" },
      { value: "340%", label: "Enterprise pipeline increase" },
      { value: "0", label: "Major audit findings" },
      { value: "35%", label: "Reduction in insurance premium" },
    ],
    testimonial: {
      quote:
        "We went from losing enterprise deals to closing them. The ROI on ISO 27001 was measurable within sixty days of certification. Pixelette Certified made a process we expected to take six months happen in nine weeks.",
      author: "CTO",
      role: "UK FinTech Company",
    },
    relatedServices: [
      { title: "ISO 27001 Certification", href: "/services/iso-27001" },
      { title: "Virtual CISO", href: "/services/vciso" },
      { title: "Penetration Testing", href: "/services/penetration-testing" },
    ],
  },
  "ai-saas-iso-42001-iso-27001": {
    slug: "ai-saas-iso-42001-iso-27001",
    client: "AI SaaS Platform",
    industry: "Artificial Intelligence",
    employees: "40 employees",
    certifications: ["ISO 42001", "ISO 27001"],
    timeline: "14 weeks",
    overview:
      "An AI-native SaaS company building large language model applications for enterprise clients. Forty employees, Series A funded, processing sensitive client data through proprietary AI models. They needed to demonstrate both information security and responsible AI governance to win enterprise contracts and prepare for EU AI Act compliance.",
    challenge: [
      "Enterprise clients were increasingly requiring evidence of AI governance alongside traditional information security certifications. The company was receiving procurement questionnaires with specific sections on AI risk management, bias assessment, and data governance that they could not adequately address.",
      "The EU AI Act compliance deadline was approaching, and the company's AI systems fell within the high-risk category requiring formal governance frameworks. Without a structured approach, compliance would be reactive and expensive.",
      "The competitive landscape was intensifying. Several competitors had already achieved ISO 27001, and first-mover advantage on ISO 42001 was a significant differentiator given that very few UK AI companies held the certification.",
    ],
    solution: [
      "We designed a dual certification programme that leveraged the significant overlap between ISO 27001 and ISO 42001. Approximately sixty percent of the documentation and controls addressed requirements for both standards, reducing total effort and cost.",
      "The AI governance component required particular attention. We conducted a full AI systems inventory, developed an AI risk assessment framework aligned with the EU AI Act risk categories, and established transparency and explainability procedures for each AI model in production.",
      "Bias and fairness evaluation procedures were established for the company's NLP models, with quantitative metrics and ongoing monitoring requirements. Data governance controls addressed the full AI data lifecycle from collection through training, inference, and retention.",
      "The combined internal and external audit programme was structured to minimise disruption, with shared evidence collection and a coordinated audit schedule across both standards.",
    ],
    metrics: [
      { value: "14", label: "Weeks to dual certification" },
      { value: "60%", label: "Control overlap leveraged" },
      { value: "3", label: "Enterprise deals closed in 60 days" },
      { value: "1st", label: "Among first UK AI companies certified" },
    ],
    testimonial: {
      quote:
        "ISO 42001 gave us a structural advantage that our competitors simply could not match. Enterprise clients recognised that we were serious about responsible AI. The dual certification programme was brilliantly efficient — we got two certifications for significantly less than the cost of doing them separately.",
      author: "CEO",
      role: "AI SaaS Platform",
    },
    relatedServices: [
      { title: "ISO 42001 AI Governance", href: "/services/iso-42001" },
      { title: "ISO 27001 Certification", href: "/services/iso-27001" },
      { title: "GDPR & Data Privacy", href: "/services/gdpr-privacy" },
    ],
  },
  "healthcare-tech-cyber-essentials-iso-27001": {
    slug: "healthcare-tech-cyber-essentials-iso-27001",
    client: "Healthcare Tech",
    industry: "Healthcare Technology",
    employees: "120 employees",
    certifications: ["Cyber Essentials", "ISO 27001"],
    timeline: "12 weeks",
    overview:
      "A healthcare technology company providing electronic health record systems to NHS trusts and private healthcare providers. One hundred and twenty employees across three UK offices. They needed Cyber Essentials for NHS Digital supply chain compliance and ISO 27001 for private healthcare client requirements.",
    challenge: [
      "NHS Digital supply chain requirements mandated Cyber Essentials certification for all technology suppliers. Without it, the company could not bid for framework contracts or renew existing agreements. The deadline was imminent.",
      "Private healthcare clients — hospital groups and insurance providers — required ISO 27001 as a condition of data processing agreements. Several existing contracts were at risk of non-renewal without certification.",
      "The company had grown rapidly through acquisition, resulting in inconsistent security practices across three offices. Technical controls varied by site, documentation was fragmented, and there was no unified governance framework.",
    ],
    solution: [
      "We prioritised Cyber Essentials to meet the immediate NHS deadline. A focused gap analysis identified remediation requirements across the five technical controls. The company achieved Cyber Essentials certification within three weeks, preserving their NHS framework eligibility.",
      "With the immediate risk addressed, we transitioned into the full ISO 27001 implementation. The multi-site environment required careful scoping — we defined a unified ISMS that covered all three offices while allowing for site-specific operational procedures.",
      "The Cyber Essentials controls formed the foundation of the ISO 27001 technical control environment. We built upward from there, adding the management system components: risk assessment, governance framework, internal audit programme, and continuous improvement processes.",
      "Staff training was delivered across all three sites, with role-specific modules for technical teams, management, and general staff. The unified approach eliminated the inconsistencies that had developed during the acquisition integration period.",
    ],
    metrics: [
      { value: "3", label: "Weeks to Cyber Essentials" },
      { value: "12", label: "Weeks to ISO 27001" },
      { value: "35%", label: "Insurance premium reduction" },
      { value: "100%", label: "Contract renewals secured" },
    ],
    testimonial: {
      quote:
        "The phased approach was exactly right for us. Getting Cyber Essentials in three weeks saved our NHS contracts, and the ISO 27001 implementation unified our security practices across all three offices. We went from a fragmented patchwork to a coherent, certified security programme.",
      author: "Head of IT",
      role: "Healthcare Tech Company",
    },
    relatedServices: [
      { title: "Cyber Essentials", href: "/services/cyber-essentials" },
      { title: "ISO 27001 Certification", href: "/services/iso-27001" },
      { title: "Virtual CISO", href: "/services/vciso" },
    ],
  },
};

function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudiesData[slug];
}

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  const description = `${study.client} achieved ${study.certifications.join(" + ")} certification in ${study.timeline}. Read the full case study.`;

  return {
    title: `${study.client} | ${study.certifications.join(" + ")} Case Study`,
    description,
    openGraph: {
      title: `${study.client} Case Study | Pixelette Certified`,
      description,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyClient study={study} />;
}
