/**
 * Practitioner experience (§30).
 *
 * These describe the kinds of programme practitioners supporting Pixelette
 * Certified have delivered. They are PRACTITIONER experience, much of it
 * gained before or independently of Pixelette Certified, and the page says so.
 * They are not Pixelette client engagements and must not be presented as such.
 *
 * Deliberately absent, per §30 and §37: client names, savings, pass rates,
 * revenue outcomes, contract values, timelines and client quotations. Each entry
 * states an area of experience and nothing that would need a client's consent
 * or a figure to substantiate.
 *
 * When an engagement contracted directly through Pixelette Certified can be
 * published with the client's written permission, it belongs in
 * src/data/caseStudies.ts, whose type enforces the evidence record, and not
 * here.
 */
export interface ExperienceArea {
  sector: string;
  jurisdiction: string;
  title: string;
  text: string;
  areas: string[];
}

export const experienceAreas: ExperienceArea[] = [
  {
    sector: "Financial services",
    jurisdiction: "Saudi Arabia",
    title: "Regulatory cyber security and resilience in financial services",
    text: "Experience relating to Saudi Central Bank (SAMA) and National Cybersecurity Authority (NCA) requirements, business continuity and privacy obligations for regulated financial institutions.",
    areas: ["SAMA cyber security requirements", "NCA controls", "Business continuity", "Privacy"],
  },
  {
    sector: "Payments and FinTech",
    jurisdiction: "Qatar",
    title: "Security and governance for payments and FinTech",
    text: "Experience supporting security and governance requirements associated with Qatar Central Bank (QCB) regulation.",
    areas: ["QCB-related requirements", "Security governance", "Controls and evidence"],
  },
  {
    sector: "Critical infrastructure",
    jurisdiction: "Qatar",
    title: "Information security governance for critical infrastructure",
    text: "Information security governance and alignment with Qatar's National Information Assurance (NIA) requirements.",
    areas: ["NIA alignment", "Information security governance"],
  },
  {
    sector: "Technology and healthcare",
    jurisdiction: "United Kingdom and United States",
    title: "Certification and assurance for technology and healthcare organisations",
    text: "Experience of ISO 27001 and SOC 2 programmes, and of AI governance, for technology and healthcare organisations.",
    areas: ["ISO 27001", "SOC 2", "AI governance"],
  },
  {
    sector: "AI governance",
    jurisdiction: "International",
    title: "ISO 42001 and AI governance",
    text: "Implementation and readiness experience for AI management systems and wider AI governance frameworks.",
    areas: ["ISO 42001 implementation", "Readiness for independent certification", "AI risk and impact assessment"],
  },
];
