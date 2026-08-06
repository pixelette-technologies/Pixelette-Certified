// Shared, client-safe constants for the contact form.
//
// This file is the single source of truth for the service list, the consent
// wording, and the privacy-policy version consent is captured against. It is
// imported by BOTH the form (to render) and the API route (to validate and to
// store the consent record), so the wording a visitor sees and the wording we
// record can never drift apart.

// The selectable "Service interest" options. Rendered by the form and validated
// (membership) server-side.
export const SERVICE_OPTIONS = [
  "ISO 27001 Certification",
  "ISO 22301 Certification",
  "ISO 42001 AI Governance",
  "ISO 9001 Quality Management",
  "ISO 14001 Environmental",
  "Cyber Essentials / CE+",
  "GDPR & Data Privacy",
  "Virtual CISO (vCISO)",
  "Virtual DPO (vDPO)",
  "Penetration Testing",
  "Gap Analysis",
  "Multiple Services",
  "Other / Not Sure",
] as const;

// Per-field length constraints, enforced on both client (maxLength) and server.
export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
  company: { max: 200 },
  phone: { max: 50 },
  country: { max: 100 },
} as const;

// Effective date of /privacy-policy ("Last updated: 1 April 2026"). Stored with
// every submission so we can prove which policy version the person consented to.
export const PRIVACY_POLICY_VERSION = "2026-04-01";

// The exact statement the visitor agrees to by ticking the consent box. Stored
// verbatim with each submission (UK GDPR Art. 7(1) — ability to demonstrate
// consent). The visible label renders this same sentence with "Privacy Policy"
// hyperlinked; keep the two in sync.
export const CONSENT_STATEMENT =
  "I agree to Pixelette Certified processing my personal data to respond to this enquiry, in accordance with our Privacy Policy.";

// Plain-language transparency notice shown beneath the consent checkbox:
// lawful basis, retention period, and how to withdraw. Mirrors the Privacy Policy.
export const CONSENT_NOTICE =
  "We use these details only to respond to your enquiry. Lawful basis: consent (UK GDPR Art. 6(1)(a)). We retain enquiries for 24 months and you can withdraw consent at any time by emailing privacy@pixelettecertified.com.";
