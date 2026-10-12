import type { ServiceSlug } from "@/data/services";

/**
 * Market routes. The United Kingdom, the United States and the GCC have
 * distinct customer, regulatory and assurance requirements, so each has a
 * page. International is the route for requirements elsewhere.
 *
 * These routes are navigation. They are not a claim that Pixelette Certified
 * works only in these places, and they are not a claim of greater expertise
 * in any of them.
 */
export type MarketSlug = "uk" | "us" | "gcc" | "international";

export interface Market {
  slug: MarketSlug;
  /** URL segment under /markets. */
  path: string;
  name: string;
  /** The page H1. */
  title: string;
  /** Index and listing line. */
  cardLine: string;
  /** Link label from the homepage and the markets index. */
  exploreLabel: string;
  /** Heading above the service list. */
  servicesHeading: string;
  opening: string;
  overview: string[];
  /** Who the page is written for. */
  audience?: { heading: string; items: string[] };
  services: { slug: ServiceSlug; note: string }[];
  /** Additional focus areas that do not map one-to-one onto a service page. */
  focus?: { heading: string; items: { title: string; text: string }[] };
  /** Market-specific points about independence, delivery or legal advice. */
  notes: { title: string; text: string }[];
  seo: { title: string; description: string };
}

export const markets: Market[] = [
  {
    slug: "uk",
    path: "united-kingdom",
    name: "United Kingdom",
    title: "Compliance and assurance in the United Kingdom",
    cardLine:
      "ISO 27001, AI governance, Cyber Essentials readiness, privacy, vCISO and procurement assurance.",
    exploreLabel: "Explore UK requirements",
    servicesHeading: "Relevant services",
    opening:
      "Support for organisations meeting the security, privacy, AI governance and assurance requirements that apply in the United Kingdom.",
    overview: [
      "UK organisations are often asked to evidence their security and governance during procurement, whether through ISO 27001 certification, Cyber Essentials, a security questionnaire or a data protection review. Regulated sectors carry further expectations from bodies such as the Information Commissioner's Office, the Financial Conduct Authority and NHS England.",
      "Where an engagement involves a UK-specific requirement, we confirm the applicable scope and ensure the appropriate specialist capability is available before defining the engagement.",
    ],
    services: [
      { slug: "iso-27001", note: "Readiness and implementation for independent certification." },
      { slug: "iso-42001", note: "AI governance and ISO 42001 readiness." },
      { slug: "cyber-essentials", note: "Readiness and submission support for Cyber Essentials and Cyber Essentials Plus." },
      { slug: "privacy", note: "UK GDPR, the Data Protection Act 2018, DPIAs and DPO support." },
      { slug: "vciso", note: "Security leadership, governance and risk advisory." },
    ],
    focus: {
      heading: "Customer and procurement assurance",
      items: [
        { title: "Security questionnaires", text: "Preparing accurate, evidenced responses to customer and supplier due diligence." },
        { title: "Public sector supply chains", text: "Understanding the assurance a public sector buyer has asked for and preparing to meet it." },
        { title: "Regulated customers", text: "Supporting suppliers to financial services, healthcare and legal organisations whose customers pass their own obligations down the supply chain." },
      ],
    },
    notes: [
      {
        title: "Independent assessment",
        text: "ISO certificates are issued by independent certification bodies, and Cyber Essentials certification by Certification Bodies licensed under the scheme. We prepare you for those assessments.",
      },
    ],
    seo: {
      title: "Compliance and Assurance in the United Kingdom",
      description:
        "ISO 27001, AI governance, Cyber Essentials readiness, privacy, vCISO and procurement assurance for requirements that apply in the United Kingdom.",
    },
  },
  {
    slug: "us",
    path: "united-states",
    name: "United States",
    title: "Compliance and assurance in the United States",
    cardLine:
      "SOC 2 readiness, ISO 27001, NIST-aligned cyber governance, AI governance, US privacy and vCISO and GRC.",
    exploreLabel: "Explore US requirements",
    servicesHeading: "Relevant services",
    opening:
      "Support for organisations preparing for SOC 2, meeting enterprise security expectations and governing AI and personal data under requirements that apply in the United States.",
    overview: [
      "US enterprise customers commonly ask their suppliers for a SOC 2 report, evidence of security governance aligned to recognised frameworks, and increasingly an account of how AI is governed. Those requests often arrive during a sales process and need a structured response.",
      "We help organisations prepare for independent examination, build governance around the NIST frameworks where customers expect them, and put privacy and AI governance on a sound footing.",
    ],
    audience: {
      heading: "Typical organisations",
      items: [
        "SaaS and technology companies",
        "AI companies",
        "B2B organisations selling to enterprise customers",
        "Growth companies entering enterprise procurement for the first time",
      ],
    },
    services: [
      { slug: "soc-2", note: "Readiness for Type 1 and Type 2 examinations by a licensed CPA firm." },
      { slug: "iso-27001", note: "For customers who ask for international certification, often alongside SOC 2." },
      { slug: "vciso", note: "Security leadership, NIST-aligned cyber governance and ongoing GRC support." },
      { slug: "iso-42001", note: "AI governance, NIST AI RMF alignment and ISO 42001 readiness." },
      { slug: "privacy", note: "Privacy programme support for applicable state requirements." },
    ],
    focus: {
      heading: "Frameworks US customers commonly reference",
      items: [
        { title: "NIST Cybersecurity Framework 2.0", text: "Published by NIST in February 2024 and widely used as a reference for security governance." },
        { title: "NIST AI Risk Management Framework", text: "A voluntary framework for managing AI risk, published by NIST in January 2023." },
        { title: "ISO/IEC 42001", text: "An international management system standard for AI, certifiable by an independent certification body." },
      ],
    },
    notes: [
      {
        title: "SOC 2 independence",
        text: "A SOC 2 examination is performed, and the report issued, by an appropriately licensed CPA firm. Pixelette Certified provides readiness, implementation and coordination support, and does not issue SOC 2 reports.",
      },
      {
        title: "Legal advice",
        text: "We do not provide US legal advice. Where a privacy or regulatory question requires legal interpretation, appropriately qualified US counsel should be involved.",
      },
    ],
    seo: {
      title: "Compliance and Assurance in the United States",
      description:
        "SOC 2 readiness, ISO 27001, NIST-aligned cyber governance, AI governance, US privacy programme support and vCISO for requirements that apply in the United States.",
    },
  },
  {
    slug: "gcc",
    path: "gcc",
    name: "GCC",
    title: "Cyber, compliance and regulatory assurance across the GCC",
    cardLine:
      "Saudi Arabia, Qatar and UAE requirements alongside ISO, privacy, cyber and governance programmes.",
    exploreLabel: "Explore GCC requirements",
    servicesHeading: "Relevant services",
    opening:
      "Support for organisations meeting cyber security, privacy, continuity and governance requirements set in Saudi Arabia, Qatar and the UAE.",
    overview: [
      "Applicability depends on the country, the sector and the type of entity. Government entities, critical infrastructure, financial institutions and their suppliers are often asked to demonstrate alignment before work can proceed.",
      "The requirements are not the same in each state. Where a requirement is jurisdiction-specific, we confirm the applicable scope and ensure the appropriate specialist capability is available before defining the engagement.",
    ],
    services: [
      { slug: "gcc-regulatory-compliance", note: "NCA, SAMA, NIA and QCB requirements, scoped to the country and sector." },
      { slug: "iso-27001", note: "An international standard that can be mapped to a regional requirement." },
      { slug: "iso-22301", note: "Business continuity and operational resilience where the requirement calls for it." },
      { slug: "privacy", note: "Saudi and Qatari data protection requirements, and applicable UAE privacy requirements." },
      { slug: "iso-42001", note: "AI governance, including where a UAE requirement calls for it." },
      { slug: "vciso", note: "Security leadership, governance and risk advisory." },
    ],
    focus: {
      heading: "Requirements by country",
      items: [
        {
          title: "Saudi Arabia",
          text: "NCA and SAMA requirements, privacy, ISO standards, and cyber and GRC support. Applicability depends on the entity and the sector.",
        },
        {
          title: "Qatar",
          text: "NIA and QCB requirements, privacy, ISO standards, and governance. Applicability depends on the entity and the sector.",
        },
        {
          title: "UAE",
          text: "Applicable cyber, compliance, privacy and governance requirements, including ISO and AI governance. The scope is confirmed before an engagement is defined.",
        },
      ],
    },
    notes: [
      {
        title: "Regulatory status",
        text: "Pixelette Certified is not approved or accredited by a regulator in any GCC state. Regulatory compliance is determined by the relevant regulator, and certification by independent certification bodies.",
      },
    ],
    seo: {
      title: "GCC Cyber and Regulatory Assurance",
      description:
        "Cyber, privacy, continuity and governance support for requirements in Saudi Arabia, Qatar and the UAE, including NCA, SAMA, NIA, QCB and ISO programmes.",
    },
  },
  {
    slug: "international",
    path: "international",
    name: "International",
    title: "International compliance and assurance support",
    cardLine:
      "International standards and US-facing assurance, scoped to the relevant customer requirement and jurisdiction.",
    exploreLabel: "Explore international requirements",
    servicesHeading: "Services across borders",
    opening:
      "Pixelette Certified supports organisations internationally with cyber security, compliance, assurance and AI governance requirements. Many of the standards and frameworks we work with are international in scope, while other requirements depend on the country, regulator or sector involved.",
    overview: [
      "Where an engagement involves jurisdiction-specific requirements, we confirm the applicable scope and ensure the appropriate specialist capability is available before defining the engagement.",
      "The services below can commonly be delivered across borders. That does not mean every service is available in every jurisdiction. National laws, regulators, government schemes and sector rules need the relevant jurisdictional capability.",
    ],
    services: [
      { slug: "iso-27001", note: "Information security management and certification readiness." },
      { slug: "iso-42001", note: "AI management systems, governance and assurance." },
      { slug: "iso-22301", note: "Business continuity and operational resilience." },
      { slug: "privacy", note: "Privacy information management, including ISO 27701 where that standard is the requirement." },
      { slug: "vciso", note: "Security leadership, governance and risk advisory." },
      { slug: "cyber-assurance", note: "Testing and assurance, subject to the scope and any required accreditation." },
      { slug: "soc-2", note: "Readiness for organisations that need to satisfy US customers, procurement teams or enterprise buyers." },
    ],
    notes: [
      {
        title: "Jurisdiction-specific requirements",
        text: "When a requirement depends on a national law, a regulator or a government scheme, we establish what applies, whether it is within scope, and what specialist capability is required before the engagement is defined.",
      },
      {
        title: "SOC 2 independence",
        text: "A SOC 2 examination is performed, and the report issued, by an appropriately licensed CPA firm. Pixelette Certified provides readiness support and does not issue SOC 2 reports.",
      },
    ],
    seo: {
      title: "International Compliance and Assurance",
      description:
        "Cyber security, compliance, assurance and AI governance support for organisations internationally, adapted to the relevant standard, customer requirement and jurisdiction.",
    },
  },
];

export function getMarketByPath(path: string): Market | undefined {
  return markets.find((m) => m.path === path);
}

export function marketHref(market: Market): string {
  return `/markets/${market.path}`;
}
