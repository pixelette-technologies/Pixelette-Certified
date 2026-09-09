// Shared, client-safe constants for the contact form.
//
// This file is the single source of truth for the service list, the consent
// wording, and the privacy-policy version consent is captured against. It is
// imported by BOTH the form (to render) and the API route (to validate and to
// store the consent record), so the wording a visitor sees and the wording we
// record can never drift apart.

/**
 * "What brought you here?" - the enquiry vocabulary.
 *
 * This replaces the old "Service interest" list, which asked visitors to
 * self-diagnose against an acronym before they had spoken to anyone. The brief
 * is explicit that people arrive with a trigger, not a roadmap: a customer
 * request, a tender condition, a questionnaire, an investor question or a
 * regulatory deadline. These are those triggers.
 *
 * Each option carries BOTH a slug and a label, and they do different jobs:
 *
 *   value  the stable identifier. Used in `/contact?reason=<value>` deep links
 *          from the homepage trigger cards, and later as the stored enquiry
 *          reason. Changing a value breaks live links, so treat it as an API.
 *   label  what the visitor reads, and what is stored and emailed today so the
 *          record stays human-readable without a lookup.
 *
 * Penetration Testing is deliberately absent: it is withdrawn from the first
 * release, and an option nobody can be sold is a dead end in a form.
 */
export const ENQUIRY_REASONS = [
  { value: "tender-requirement", label: "A customer or tender has asked for certification" },
  { value: "security-questionnaire", label: "We have been sent a security questionnaire" },
  { value: "iso-certification", label: "We need ISO 27001 or ISO 42001" },
  { value: "soc-2", label: "A US customer is asking for SOC 2" },
  { value: "ai-governance", label: "Customers are questioning how we govern AI" },
  { value: "vciso", label: "We need a CISO, but not a full-time hire" },
  { value: "privacy-vdpo", label: "We need privacy leadership or an external DPO" },
  { value: "maintain-certification", label: "We are already certified and need to stay ready" },
  { value: "other", label: "Something else" },
] as const;

export type EnquiryReasonValue = (typeof ENQUIRY_REASONS)[number]["value"];

/**
 * The labels, which are what the server validates membership against and what
 * is stored. Derived rather than duplicated: a label edited in one place cannot
 * fall out of step with the other.
 */
export const SERVICE_OPTIONS = ENQUIRY_REASONS.map((r) => r.label);

/**
 * Build a link into the contact form with a reason preselected.
 *
 * Every caller uses this rather than hand-writing a query string, so a value
 * that does not exist is a TypeScript error at the call site instead of a
 * silent no-op for the visitor. The anchor matters: without it a deep-linked
 * visitor lands on the hero and has to scroll to find the field we just filled
 * in for them.
 */
export function contactHref(reason?: EnquiryReasonValue): string {
  return reason ? `/contact?reason=${reason}#enquiry-form` : "/contact";
}

/**
 * Organisation size bands, per the brief's enquiry form.
 *
 * Values are stable slugs (matched by a CHECK constraint in migration 0005);
 * labels are what the visitor reads. Changing a value needs a migration,
 * changing a label does not.
 */
export const ORGANISATION_SIZES = [
  { value: "1-25", label: "1 to 25" },
  { value: "26-100", label: "26 to 100" },
  { value: "101-500", label: "101 to 500" },
  { value: "501-2000", label: "501 to 2,000" },
  { value: "2000-plus", label: "More than 2,000" },
] as const;

export type OrganisationSizeValue = (typeof ORGANISATION_SIZES)[number]["value"];

/** Jurisdiction or market. Same slug/label contract as above. */
export const JURISDICTIONS = [
  { value: "uk", label: "UK" },
  { value: "eu", label: "EU" },
  { value: "us", label: "US" },
  { value: "gcc", label: "GCC" },
  { value: "multi-region", label: "Multi-region" },
  { value: "other", label: "Other" },
] as const;

export type JurisdictionValue = (typeof JURISDICTIONS)[number]["value"];

// Per-field length constraints, enforced on both client (maxLength) and server.
export const CONTACT_LIMITS = {
  // Kept for the legacy `name` column, which is still populated as
  // "firstName lastName". Note 50 + 1 + 50 exceeds this cap: the derived value
  // must NOT be re-checked against name.max, and the column is unbounded text
  // in Postgres, so nothing breaks.
  name: { min: 2, max: 100 },
  firstName: { min: 1, max: 50 },
  lastName: { min: 1, max: 50 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
  company: { max: 200 },
  phone: { max: 50 },
  country: { max: 100 },
} as const;

/**
 * Upload limits, shared by the form (to reject early, in the browser) and the
 * route (which is the only one that counts).
 *
 * 4 MiB because Vercel's serverless request body ceiling is around 4.5 MB and
 * multipart adds part headers and boundaries on top of the file. That leaves
 * roughly 300 KB of headroom for the ten text fields and the Turnstile token,
 * which is ample. A tender questionnaire is almost always far below this.
 */
export const UPLOAD_LIMITS = {
  maxBytes: 4 * 1024 * 1024,
  /**
   * Extensions we accept. Deliberately excluded, each for a reason:
   *   .zip   hides anything
   *   .svg   is an XSS payload wearing an image costume
   *   .html  likewise
   *   .docm/.xlsm  macro-enabled Office formats are malware carriers
   *   .msg/.eml    tempting for "forward me the customer email", but they are
   *                containers with their own nested attachments
   */
  allowedExtensions: [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv", ".txt", ".png", ".jpg", ".jpeg"],
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
//
// Extended to cover uploaded documents, because the retention promise has to
// apply to the file as well as the row. That promise is what the purge cron
// exists to keep.
export const CONSENT_NOTICE =
  "We use these details only to respond to your enquiry. Lawful basis: consent (UK GDPR Art. 6(1)(a)). Any document you attach is held in access-controlled storage under the same terms. We retain enquiries and attachments for 24 months, and you can withdraw consent at any time by emailing privacy@pixelettecertified.com.";

/**
 * Marketing opt-in, kept entirely separate from the privacy consent above.
 *
 * The brief requires these two to be separate, and the separation has to be
 * real rather than presentational: a distinct statement, a distinct checkbox
 * that is unticked by default and never gates submission, and its own stored
 * timestamp. Bundling consent to be contacted about THIS enquiry with consent
 * to be marketed to indefinitely is the pattern the requirement exists to stop.
 *
 * Wording follows the newsletter signup already live on the site, so the two
 * marketing consents a visitor can give say the same thing.
 */
export const MARKETING_STATEMENT =
  "I would like to receive occasional compliance insights and service updates from Pixelette Certified, in accordance with our Privacy Policy. You can unsubscribe at any time.";
