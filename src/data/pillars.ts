import type { EnquiryReasonValue } from "@/lib/contact/constants";

/**
 * The four commercial pillars.
 *
 * These replace the flat service catalogue as the primary way the offer is
 * presented. The brief's reasoning is that a visitor arrives with an outcome
 * they need ("prove we are secure enough to be onboarded"), not with a standard
 * they have already selected, and an equal-weight list of twenty-three services
 * makes them do the mapping themselves.
 *
 * This earns a file in src/data/ rather than a const inside the component
 * because it has two consumers (the homepage and /services) and needs slugs for
 * anchor links - the two conditions the repo already uses to decide.
 */
export interface Pillar {
  slug: "certification-ready" | "security-assurance" | "risk-privacy-ai" | "audit-ready";
  /** The "01".."04" eyebrow */
  index: string;
  title: string;
  summary: string;
  bullets: string[];
  ctaLabel: string;
  /** Preselects the matching option on the enquiry form. Typed, so a renamed
   *  reason is a build error rather than a silent 400 for the visitor. */
  ctaReason: EnquiryReasonValue;
  /**
   * The bridge into services.ts. Lets /services regroup by pillar without
   * touching twenty-three entries or inventing a second taxonomy.
   */
  serviceSlugs: string[];
}

export const pillars: Pillar[] = [
  {
    slug: "certification-ready",
    index: "01",
    title: "Get certification-ready",
    summary:
      "Build the management system, controls and evidence needed for an independent certification audit.",
    bullets: [
      "ISO/IEC 27001 implementation and certification readiness",
      "ISO/IEC 42001 AI management system implementation and certification readiness",
      "Selected ISO management-system support where a verified practitioner route is assigned",
      "Cyber Essentials readiness and certification coordination, subject to an authorised assessment route",
    ],
    ctaLabel: "Map my certification route",
    ctaReason: "tender-requirement",
    serviceSlugs: ["iso-27001", "iso-42001", "cyber-essentials", "iso-22301", "iso-9001", "iso-14001"],
  },
  {
    slug: "security-assurance",
    index: "02",
    title: "Prove security & assurance",
    summary:
      "Answer enterprise assurance requests with a defensible control environment and evidence pack.",
    bullets: [
      "SOC 2 Type I and Type II readiness and implementation support",
      "Security questionnaire and customer-assurance support",
      "Third-party risk and control-evidence preparation",
      "PCI DSS readiness and compliance support where the required specialist route is assigned",
    ],
    ctaLabel: "Review my assurance requirement",
    ctaReason: "security-questionnaire",
    serviceSlugs: ["soc-2", "iso-27001", "zero-trust", "cloud-security-architecture"],
  },
  {
    slug: "risk-privacy-ai",
    index: "03",
    title: "Govern risk, privacy & AI",
    summary: "Add credible governance without building every senior capability in-house.",
    bullets: [
      "vCISO and GRC advisory",
      "vDPO and privacy governance",
      "DPIA and PIA support, and privacy programme oversight",
      "AI governance, AI risk assessment and ISO/IEC 42001 alignment",
      "Selected UK, EU and GCC regulatory-alignment support matched to practitioner expertise",
    ],
    ctaLabel: "Discuss governance support",
    ctaReason: "vciso",
    serviceSlugs: ["vciso", "vdpo", "gdpr-privacy", "ai-risk-assessment", "iso-27701", "sama-csf", "nca-ecc", "qcb-nia"],
  },
  {
    slug: "audit-ready",
    index: "04",
    title: "Stay audit-ready",
    summary:
      "Certification is a control cycle, not a one-off project. Keep the system working after the audit.",
    bullets: [
      "Managed compliance and GRC advisory",
      "Internal review and audit-readiness support",
      "Evidence and policy maintenance",
      "Management-review and continual-improvement support",
      "Surveillance and recertification preparation",
    ],
    ctaLabel: "Keep us audit-ready",
    ctaReason: "maintain-certification",
    serviceSlugs: ["managed-compliance", "vciso", "bia-bra", "dr-planning"],
  },
];

export function getPillarBySlug(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}
