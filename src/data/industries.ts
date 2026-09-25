import type { ServiceSlug } from "@/data/services";

/**
 * Who we help (§29).
 *
 * Six principal groups, replacing thirteen sectors. Each describes the
 * requirements that group typically meets, in qualified terms, and links to the
 * services that most often answer them. No group claims a sector specialism
 * the evidence does not support, and no sector statistics are given.
 *
 * Slugs double as anchor ids on /who-we-help. Existing anchors (fintech,
 * healthcare, saas-technology, ai-technology, professional-services,
 * government-suppliers) are kept so inbound links still land on a section.
 */
export interface AudienceGroup {
  slug: string;
  title: string;
  summary: string;
  requirements: string[];
  services: ServiceSlug[];
}

export const audienceGroups: AudienceGroup[] = [
  {
    slug: "saas-technology",
    title: "SaaS & technology",
    summary:
      "Technology companies selling to larger organisations are commonly asked to evidence their security during procurement, often by several customers in different ways.",
    requirements: [
      "ISO 27001 certification requested by customers",
      "SOC 2 reports requested by US customers",
      "Security questionnaires and customer due diligence",
      "Penetration testing evidence",
    ],
    services: ["iso-27001", "soc-2", "cyber-assurance", "vciso"],
  },
  {
    slug: "ai-technology",
    title: "AI companies",
    summary:
      "Organisations that develop or deploy AI face questions from customers, investors and regulators about how their systems are governed and how risk is managed.",
    requirements: [
      "AI governance frameworks and accountability",
      "ISO 42001 readiness where certification is sought",
      "NIST AI RMF and EU AI Act alignment where relevant",
      "Information security and privacy foundations",
    ],
    services: ["iso-42001", "iso-27001", "privacy"],
  },
  {
    slug: "fintech",
    title: "FinTech & financial services",
    summary:
      "Financial services firms and their technology suppliers operate under regulatory expectations on security, resilience and data, which vary by jurisdiction and by type of firm.",
    requirements: [
      "Information security governance and ISO 27001",
      "Operational resilience and business continuity",
      "GCC financial regulator requirements, including SAMA and QCB",
      "Third-party risk and customer assurance",
    ],
    services: ["iso-27001", "iso-22301", "gcc-regulatory-compliance", "vciso"],
  },
  {
    slug: "healthcare",
    title: "Healthcare & HealthTech",
    summary:
      "Organisations handling health data carry heightened privacy and security obligations, and suppliers to health services are often asked for specific assurance before they can proceed.",
    requirements: [
      "Privacy governance for special category data",
      "Information security management and ISO 27001",
      "Sector assurance requirements set by health bodies and customers",
      "Continuity of critical services",
    ],
    services: ["privacy", "iso-27001", "iso-22301"],
  },
  {
    slug: "professional-services",
    title: "Professional services",
    summary:
      "Law firms, consultancies and other advisers hold confidential client information and are increasingly asked by clients to demonstrate how it is protected.",
    requirements: [
      "Client security questionnaires and audits",
      "ISO 27001 and Cyber Essentials",
      "Privacy governance",
      "Senior security oversight without a full-time appointment",
    ],
    services: ["iso-27001", "cyber-essentials", "privacy", "vciso"],
  },
  {
    slug: "government-suppliers",
    title: "Government and regulated supply chains",
    summary:
      "Suppliers to government, critical infrastructure and regulated organisations often inherit security requirements through contracts and supplier assurance processes.",
    requirements: [
      "Cyber Essentials for relevant UK public sector contracts",
      "ISO 27001 and supplier assurance",
      "NCA and NIA requirements in Saudi Arabia and Qatar",
      "Business continuity expectations",
    ],
    services: ["cyber-essentials", "iso-27001", "gcc-regulatory-compliance", "iso-22301"],
  },
];
