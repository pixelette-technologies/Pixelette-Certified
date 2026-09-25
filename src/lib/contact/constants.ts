// Shared, client-safe constants for the contact form.
//
// This file is the single source of truth for the form's option lists, the
// consent wording, and the privacy-policy version consent is captured against.
// It is imported by BOTH the form (to render) and the API route (to validate
// and store), so what a visitor sees and what we record cannot drift apart.
//
// Every option carries a slug and a label, and they do different jobs:
//
//   value  the stable identifier. Stored in a CHECK-constrained column and used
//          in `/contact?reason=<value>` deep links. Changing a value needs a
//          migration and breaks live links, so treat it as an API.
//   label  what the visitor reads, and what is emailed to the team.
//
// The three lists follow §33 of the 25 September 2026 rebuild specification.

/** "What are you working towards?" Stored in contact_submissions.enquiry_reason. */
export const ENQUIRY_REASONS = [
  { value: "iso-27001", label: "ISO 27001" },
  { value: "ai-governance", label: "AI governance / ISO 42001" },
  { value: "soc-2", label: "SOC 2" },
  { value: "cyber-assurance", label: "Cyber assurance or testing" },
  { value: "privacy", label: "Privacy or data governance" },
  { value: "vciso-grc", label: "vCISO / GRC" },
  { value: "cyber-essentials", label: "Cyber Essentials" },
  { value: "business-continuity", label: "Business continuity / ISO 22301" },
  { value: "gcc-regulatory", label: "GCC regulatory compliance" },
  { value: "other", label: "Other" },
  { value: "not-sure", label: "Not sure" },
] as const;

export type EnquiryReasonValue = (typeof ENQUIRY_REASONS)[number]["value"];

/** "Where does the requirement apply?" Stored in contact_submissions.jurisdiction. */
export const JURISDICTIONS = [
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "saudi-arabia", label: "Saudi Arabia" },
  { value: "uae", label: "UAE" },
  { value: "qatar", label: "Qatar" },
  { value: "other", label: "Other" },
] as const;

export type JurisdictionValue = (typeof JURISDICTIONS)[number]["value"];

/** "What has prompted the requirement?" Stored in contact_submissions.requirement_trigger. */
export const REQUIREMENT_TRIGGERS = [
  { value: "customer-procurement", label: "Customer or procurement requirement" },
  { value: "regulatory-obligation", label: "Regulatory obligation" },
  { value: "certification-audit", label: "Certification or audit" },
  { value: "investor-due-diligence", label: "Investor or due-diligence requirement" },
  { value: "internal-governance", label: "Internal governance improvement" },
  { value: "other", label: "Other" },
] as const;

export type RequirementTriggerValue = (typeof REQUIREMENT_TRIGGERS)[number]["value"];

/**
 * Build a link into the contact form with "What are you working towards?"
 * preselected. Typed, so a value that does not exist is a build error at the
 * call site rather than a silent no-op for the visitor.
 */
export function contactHref(reason?: EnquiryReasonValue): string {
  return reason ? `/contact?reason=${reason}#enquiry-form` : "/contact";
}

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
  role: { max: 120 },
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

// Effective date of /privacy-policy ("Last updated: 25 September 2026"). Stored with
// every submission so we can prove which policy version the person consented to.
export const PRIVACY_POLICY_VERSION = "2026-09-25";

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
