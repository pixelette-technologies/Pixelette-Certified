/**
 * Case studies. Currently none, and that is the point.
 *
 * The three studies this file used to hold were anonymous ("A 65-person UK
 * FinTech..."), carried quantified outcomes, and had no client identity,
 * permission or source evidence behind them. The 8 September 2026 brief removes
 * them and is explicit that they must not be replaced with invented proof.
 *
 * THE EVIDENCE RULE IS ENCODED IN THE TYPE, NOT IN A COMMENT.
 *
 * `evidence` is not optional. Under `strict`, that means an unverified case
 * study cannot be added to the array without a named verifier, a verification
 * date, an approval reference, and a list of every factual claim with its
 * source. It will not compile otherwise. That is the strongest enforcement
 * available here, and it costs nothing.
 *
 * Publishing later is therefore a data change, not a code change: fill the
 * array, and the section that renders it switches from the evidence statement
 * to the grid on its own.
 */
export interface CaseStudyEvidence {
  /** Named client contact and role who confirmed the content. */
  verifiedBy: string;
  /** ISO date the client confirmed it. */
  verifiedOn: string;
  /** Reference to the written approval on file. */
  approvalRef: string;
  /** Each factual claim in the study, paired with what substantiates it. */
  claimsSubstantiated: { claim: string; source: string }[];
}

export interface CaseStudy {
  slug: string;
  /** The named client. Anonymous studies are not publishable. */
  client: string;
  sector: string;
  /** What the engagement covered. */
  scope: string;
  /** The customer, tender, regulator or growth objective that created the need. */
  situation: string;
  /** What Pixelette actually delivered. Not what the client did afterwards. */
  work: string[];
  /**
   * The independent outcome: the certification, report or assessment result,
   * attributed to the body that issued it. Never phrased as something Pixelette
   * awarded or achieved.
   */
  outcome: string;
  /**
   * Commercial outcome. Optional, and the only optional field here.
   *
   * The brief's template separates this from the independent outcome for a
   * reason: contract, onboarding, time and performance results belong to the
   * client, not to us, and may only be included where the client has authorised
   * them AND we can evidence them. If either is missing, the study still
   * publishes without this line rather than being held back.
   */
  commercialOutcome?: string;
  evidence: CaseStudyEvidence;
}

export const caseStudies: CaseStudy[] = [];

/**
 * Shown wherever case studies would appear while the array is empty. Framing
 * the absence as a policy is stronger than leaving a gap: it tells a buyer
 * exactly how we treat their confidentiality too.
 */
export const EVIDENCE_STATEMENT =
  "We publish client case studies only where the client is named, has given written permission and every statement can be substantiated. Client work is confidential. Where a reference is needed, we can discuss arranging one under a confidentiality agreement, subject to the client agreeing.";
