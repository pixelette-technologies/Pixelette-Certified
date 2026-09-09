/**
 * Delivery credentials, as a single source of truth.
 *
 * Before this file existed, three places asserted credentials independently -
 * the About page cards, the About page JSON-LD, and Alice's system prompt - and
 * they had already drifted: two of them published a "9 active certifications"
 * aggregate that was arithmetically one person's eight certificates plus a paid
 * corporate membership. For a section whose entire purpose is legal accuracy,
 * three sources of truth is the defect.
 *
 * The governing rule, from the 8 September 2026 brief: accreditation belongs to
 * the entity that holds it. Everything here is an INDIVIDUAL or NETWORK
 * practitioner credential and must never be presented as a corporate
 * accreditation, converted into a count, or attached to a named individual on
 * the public site.
 */

export interface Credential {
  /** Short label as it appears on the site. Text only - no logos. */
  label: string;
  issuer: string;
  /** One line on what it covers, in plain English. */
  scope: string;
  /**
   * Publication gate. A credential is rendered only when this is true.
   *
   * `false` means the certificate exists but its current status has not been
   * verified, or the brief has it on hold. Adding a credential here with
   * `verifiable: true` is the moment evidence is being asserted, so it is also
   * the moment the claims register applies: the label must appear in
   * APPROVED_CREDENTIALS in src/lib/claims/register.mjs or the build fails.
   */
  verifiable: boolean;
}

export const credentials: Credential[] = [
  {
    label: "PECB Certified ISO/IEC 42001 Lead Auditor",
    issuer: "PECB",
    scope: "AI management systems. Leads ISO/IEC 42001 engagements.",
    verifiable: true,
  },
  {
    label: "CISA",
    issuer: "ISACA",
    scope: "Certified Information Systems Auditor. Underpins internal audit and evidence work.",
    verifiable: true,
  },
  {
    label: "AIGP",
    issuer: "IAPP",
    scope: "Artificial Intelligence Governance Professional. AI risk and accountability.",
    verifiable: true,
  },
  {
    label: "CIPM",
    issuer: "IAPP",
    scope: "Certified Information Privacy Manager. Privacy programme management.",
    verifiable: true,
  },
  {
    label: "CIPP/US",
    issuer: "IAPP",
    scope: "Certified Information Privacy Professional, United States. US privacy law.",
    verifiable: true,
  },
  {
    label: "CCSK",
    issuer: "Cloud Security Alliance",
    scope: "Certificate of Cloud Security Knowledge. Cloud controls.",
    verifiable: true,
  },
  {
    label: "CCZT",
    issuer: "Cloud Security Alliance",
    scope: "Certificate of Competence in Zero Trust. Zero trust architecture.",
    verifiable: true,
  },
];

/** Only these are rendered. See the `verifiable` gate above. */
export function publishedCredentials(): Credential[] {
  return credentials.filter((c) => c.verifiable);
}

/**
 * The governing paragraph. Used verbatim on every credential surface so the
 * framing cannot drift between pages.
 */
export const CREDENTIAL_DISCLAIMER =
  "Accreditation belongs to the entity that holds it. Pixelette Certified is not an accredited certification body and does not issue certificates. The credentials below are held by individual practitioners in our approved delivery network and are stated as individual credentials.";

/**
 * The closing note. Deliberately states the negative as well as the positive:
 * practitioner assignment is conditional, and the credentials are not ours.
 */
export const CREDENTIAL_FOOTNOTE =
  "Professional credentials are held by the individual practitioners to whom they were issued. Practitioner assignment depends on scope and availability. Corporate accreditation is stated separately only where independently verified.";
