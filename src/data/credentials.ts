/**
 * Practitioner credentials, as a single source of truth.
 *
 * The governing rule: a credential belongs to the individual who holds it.
 * Everything here is held by practitioners within the specialist delivery
 * network and must never be presented as a corporate accreditation, converted
 * into a count, attributed to a named individual on the public site, or used to
 * imply that the holder is a Pixelette employee.
 *
 * The published set follows §12 of the 25 September 2026 rebuild
 * specification, which lists the currently evidenced credentials. FIP moved
 * from HOLD to published under that specification. An ethical-hacking credential remains unpublished
 * because it is not separately verified. ISO/IEC 27001 lead auditor TRAINING is
 * described as training, because the evidence is course completion rather than
 * a registration.
 *
 * Text labels only. No issuer logos or badges (§12).
 */

export interface Credential {
  /** Short label as it appears on the site. */
  label: string;
  issuer: string;
  /** Plain-English area the credential covers. */
  area: string;
  /**
   * Publication gate. A credential renders only when true, and any credential
   * token rendered anywhere must also be listed in APPROVED_CREDENTIALS in
   * src/lib/claims/register.mjs or the build fails.
   */
  verifiable: boolean;
}

export const credentials: Credential[] = [
  { label: "CISA", issuer: "ISACA", area: "Information systems audit", verifiable: true },
  { label: "PECB Certified ISO/IEC 42001 Lead Auditor", issuer: "PECB", area: "AI management system audit", verifiable: true },
  { label: "AIGP", issuer: "IAPP", area: "AI governance", verifiable: true },
  { label: "CIPP/US", issuer: "IAPP", area: "US privacy law", verifiable: true },
  { label: "CIPM", issuer: "IAPP", area: "Privacy programme management", verifiable: true },
  { label: "FIP", issuer: "IAPP", area: "Privacy", verifiable: true },
  { label: "CCSK", issuer: "Cloud Security Alliance", area: "Cloud security", verifiable: true },
  { label: "CCZT", issuer: "Cloud Security Alliance", area: "Zero Trust", verifiable: true },
  { label: "ISO/IEC 27001 lead auditor training", issuer: "Completed training course", area: "Information security audit", verifiable: true },
];

/** Only these are rendered. See the `verifiable` gate above. */
export function publishedCredentials(): Credential[] {
  return credentials.filter((c) => c.verifiable);
}

/** The approved framing sentence (§12). Used on every credential surface. */
export const CREDENTIAL_STATEMENT =
  "Across our specialist delivery network, practitioners hold credentials spanning information-security audit, AI governance, privacy, cloud security and Zero Trust.";

/** The closing qualification, stated wherever credentials are listed. */
export const CREDENTIAL_FOOTNOTE =
  "Credentials are held by the individual practitioners to whom they were issued, not by Pixelette Certified. Pixelette Certified is not an accredited certification body. Practitioner assignment depends on the requirement and availability.";
