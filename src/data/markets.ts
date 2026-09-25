import type { ServiceSlug } from "@/data/services";

/**
 * The three headline markets (§11, §25 to §28).
 *
 * Deliberately three and only three. Organisations elsewhere can still contact
 * us, but the site does not present APAC, the EU or "the Americas" as
 * equivalent acquisition markets, and it does not list countries it cannot
 * substantiate delivery in.
 */
export type MarketSlug = "uk" | "us" | "gcc";

export interface Market {
  slug: MarketSlug;
  /** URL segment under /markets. */
  path: string;
  name: string;
  /** The page H1. */
  title: string;
  /** Homepage card line (§11). */
  cardLine: string;
  opening: string;
  overview: string[];
  /** Who the page is principally for. */
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
    title: "Compliance and assurance for UK organisations",
    cardLine:
      "ISO 27001, AI governance, Cyber Essentials readiness, privacy, vCISO and procurement assurance.",
    opening:
      "Support for UK organisations meeting the security, privacy, AI governance and assurance requirements set by customers, public sector buyers and regulators.",
    overview: [
      "UK organisations are often asked to evidence their security and governance during procurement, whether through ISO 27001 certification, Cyber Essentials, a security questionnaire or a data protection review. Regulated sectors carry further expectations from bodies such as the Information Commissioner's Office, the Financial Conduct Authority and NHS England.",
      "Specialist UK practitioners are assigned where an engagement requires UK-specific expertise, for example in UK GDPR, public sector supply chains or sector regulation. Other parts of an engagement may draw on practitioners elsewhere in our specialist delivery network.",
    ],
    services: [
      { slug: "iso-27001", note: "Readiness and implementation for independent certification." },
      { slug: "iso-42001", note: "AI governance frameworks and ISO 42001 readiness." },
      { slug: "cyber-essentials", note: "Readiness and submission support for Cyber Essentials and Cyber Essentials Plus." },
      { slug: "privacy", note: "UK GDPR, the Data Protection Act 2018, DPIAs and DPO support." },
      { slug: "vciso", note: "Senior security leadership and ongoing GRC support." },
      { slug: "iso-22301", note: "Business continuity and operational resilience where relevant." },
    ],
    focus: {
      heading: "Procurement and customer assurance",
      items: [
        { title: "Security questionnaires", text: "Preparing accurate, evidenced responses to customer and supplier due diligence." },
        { title: "Public sector supply chains", text: "Understanding the assurance a public sector buyer has asked for and preparing to meet it." },
        { title: "Regulated customers", text: "Supporting suppliers to financial services, healthcare and legal organisations whose customers pass their own obligations down the supply chain." },
      ],
    },
    notes: [
      { title: "Independent assessment", text: "ISO certificates are issued by independent certification bodies, and Cyber Essentials certification by Certification Bodies licensed under the scheme. We prepare you for those assessments." },
    ],
    seo: {
      title: "UK Compliance & Assurance",
      description:
        "ISO 27001, AI governance, Cyber Essentials readiness, UK GDPR, vCISO and procurement assurance for UK organisations.",
    },
  },
  {
    slug: "us",
    path: "united-states",
    name: "United States",
    title: "Security, compliance and assurance for US organisations",
    cardLine:
      "SOC 2 readiness, ISO 27001, NIST-aligned cyber governance, AI governance, US privacy and vCISO/GRC.",
    opening:
      "Support for US organisations preparing for SOC 2, meeting enterprise security expectations and governing AI and personal data with discipline.",
    overview: [
      "US enterprise customers commonly ask their suppliers for a SOC 2 report, evidence of security governance aligned to recognised frameworks, and increasingly an account of how AI is governed. For growing companies, those requests often arrive during a sales process and need a structured response.",
      "We help organisations prepare for independent examination, build governance around the NIST frameworks where customers expect them, and put privacy and AI governance on a sound footing.",
    ],
    audience: {
      heading: "Who we principally work with",
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
      { slug: "vciso", note: "Senior security leadership, NIST-aligned governance and ongoing GRC support." },
      { slug: "iso-42001", note: "AI governance, NIST AI RMF alignment and ISO 42001 readiness." },
      { slug: "privacy", note: "Privacy programme support for applicable state requirements." },
      { slug: "cyber-assurance", note: "Testing and assurance evidence for customers and auditors." },
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
      { title: "SOC 2 independence", text: "A SOC 2 examination is performed, and the report issued, by an appropriately licensed CPA firm. Pixelette Certified provides readiness, implementation and coordination support, and does not issue SOC 2 reports." },
      { title: "Legal advice", text: "We do not provide US legal advice. Where a privacy or regulatory question requires legal interpretation, appropriately qualified US counsel should be involved." },
    ],
    seo: {
      title: "US Security & Compliance",
      description:
        "SOC 2 readiness, ISO 27001, NIST-aligned cyber governance, AI governance, US privacy programme support and vCISO for US organisations.",
    },
  },
  {
    slug: "gcc",
    path: "gcc",
    name: "GCC",
    title: "Cyber, compliance and regulatory assurance across the GCC",
    cardLine:
      "Saudi, Qatar and UAE regulatory requirements alongside ISO, privacy, cyber and governance programmes.",
    opening:
      "Support for organisations meeting cyber security, privacy, continuity and governance requirements set by regulators in Saudi Arabia, Qatar and the UAE.",
    overview: [
      "GCC regulators have set detailed requirements for government entities, critical infrastructure, financial institutions and their suppliers. Understanding which requirements apply, and demonstrating alignment with them, is often a condition of doing business in the region.",
      "Our GCC work is led by practitioners with experience of the relevant regulators and sectors. We concentrate on Saudi Arabia and Qatar, and offer more selective support in the UAE.",
    ],
    services: [
      { slug: "gcc-regulatory-compliance", note: "NCA, SAMA, NIA, NISCF and QCB requirements." },
      { slug: "iso-27001", note: "An international foundation that can be mapped to regional requirements." },
      { slug: "iso-22301", note: "Business continuity and resilience for regulated organisations." },
      { slug: "privacy", note: "Saudi and Qatari data protection requirements." },
      { slug: "iso-42001", note: "AI governance, including for organisations in the UAE." },
      { slug: "vciso", note: "Ongoing governance, risk and compliance leadership." },
    ],
    focus: {
      heading: "Regulatory pathways",
      items: [
        { title: "Saudi Arabia", text: "National Cybersecurity Authority (NCA) controls, Saudi Central Bank (SAMA) cyber security requirements and the Personal Data Protection Law." },
        { title: "Qatar", text: "The National Information Assurance (NIA) standard, the National Information Security Compliance Framework (NISCF), Qatar Central Bank (QCB) requirements and the Personal Data Privacy Protection Law." },
        { title: "United Arab Emirates", text: "Cyber governance, ISO standards, AI governance and privacy, with regulatory alignment support where appropriate specialist expertise is available." },
      ],
    },
    notes: [
      { title: "Regulatory status", text: "Pixelette Certified is not a regulator-approved or accredited entity in any GCC jurisdiction. Regulatory compliance is determined by the relevant regulator, and certification by independent certification bodies." },
    ],
    seo: {
      title: "GCC Cyber & Regulatory Assurance",
      description:
        "Cyber, privacy, continuity and governance support across Saudi Arabia, Qatar and the UAE, including NCA, SAMA, QCB, NIA and ISO programmes.",
    },
  },
];

export function getMarketByPath(path: string): Market | undefined {
  return markets.find((m) => m.path === path);
}

export function marketHref(market: Market): string {
  return `/markets/${market.path}`;
}
