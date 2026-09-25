import type { Insight } from "../types";

const article: Insight = {
  slug: "investor-asked-security-posture",
  title: "Security questions in investor due diligence: what to expect and how to prepare",
  seoTitle: "Security Questions in Investor Due Diligence",
  standfirst:
    "Investors increasingly include information security in due diligence. This article explains how that review differs from a customer questionnaire, the themes it commonly covers, and how to present your position accurately.",
  description:
    "What investors commonly ask about information security in due diligence, the evidence that carries weight, and how to present gaps and plans honestly.",
  category: "Cyber and GRC",
  jurisdiction: "International",
  published: "2026-03-28",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "Security questions now appear routinely in the due diligence carried out by many venture, growth and private equity investors, particularly where the target company holds customer data or provides software that other organisations depend on. The review may be run by the fund's own team, by external advisers, or by a specialist technical diligence provider. The scope and depth vary considerably between investors and between rounds.",
    },
    {
      type: "h2",
      text: "How investor diligence differs from a customer questionnaire",
    },
    {
      type: "p",
      text: "A customer reviewing a supplier wants to know whether its own data and operations will be adequately protected. An investor is assessing risk to the value of the business over the life of the investment. That tends to shift the emphasis towards governance, accountability and the organisation's ability to sustain and improve its security as it grows, and towards any regulatory or contractual exposure that could affect value.",
    },
    {
      type: "p",
      text: "In the UK, the government's Cyber Governance Code of Practice, launched in April 2025, sets out what boards and directors of medium and large organisations are expected to do to govern cyber risk. It is a voluntary code built around five principles: risk management, strategy, people, incident planning and response, and assurance and oversight [1]. It is not a diligence checklist, but its themes closely match the questions investors tend to ask of leadership teams.",
    },
    {
      type: "h2",
      text: "Themes diligence questions commonly cover",
    },
    {
      type: "list",
      items: [
        "Governance and accountability: who owns information security at executive level, how the board is informed and how often security is discussed.",
        "Risk management: whether a risk register exists, how it is maintained and how risk appetite is expressed.",
        "Controls and evidence: certifications or attestation reports held, recent penetration test results and remediation status, and the incident record.",
        "Legal and regulatory exposure: data protection compliance, sector-specific obligations and international data transfer arrangements.",
        "Resilience: recovery objectives for critical services, the last continuity or recovery test and the organisation's insurance position.",
      ],
    },
    {
      type: "p",
      text: "The Board Toolkit published by the National Cyber Security Centre (NCSC), which supports the Code, includes questions boards can use to assess their organisation's cyber security [2]. Reviewing those questions internally before diligence begins is a practical way to identify where your answers are thin.",
    },
    {
      type: "h2",
      text: "Evidence that carries weight",
    },
    {
      type: "p",
      text: "Independent evidence is generally given more weight than self-description. ISO/IEC 27001:2022 certification shows that an accredited certification body has audited an Information Security Management System (ISMS) for a defined scope [3]. A SOC 2 report is an attestation issued by a licensed CPA firm after examining controls relevant to criteria such as security, availability and confidentiality [4]. Neither covers everything an investor may want to know, and reviewers commonly check whether the scope of a certificate or report matches the parts of the business that matter to them.",
    },
    {
      type: "p",
      text: "Where personal data is processed, reviewers may also look for evidence of how the organisation meets its security obligations under data protection law. In the UK, the Information Commissioner's Office (ICO) explains that those obligations are risk-based and require appropriate technical and organisational measures [5]. Documentation showing how that assessment was made is often more persuasive than a general statement of compliance.",
    },
    {
      type: "h2",
      text: "If you do not hold a certification",
    },
    {
      type: "p",
      text: "Many companies at earlier stages do not hold ISO/IEC 27001 certification or a SOC 2 report, and investors are generally aware of this. What matters is whether the company can describe its current controls accurately, evidence them where possible and show a considered plan for the gaps. Useful material includes documented policies with named owners, a risk register, recent independent testing with remediation records, and, where relevant, the scope and status of any implementation work under way.",
    },
    {
      type: "callout",
      title: "Answer what is asked, accurately",
      text: "Diligence teams frequently cross-check answers against documents and interviews. Overstating a position, for example describing informal practice as a documented process or implying a certification date that depends on an external body, is more damaging than acknowledging a gap alongside a realistic plan to close it.",
    },
    {
      type: "p",
      text: "Some investors may propose conditions relating to security, such as a commitment to reach a particular standard after completion. Whether that is appropriate, and on what timetable, is a commercial and legal matter for the company and its advisers. Management should be confident that any commitment is achievable, bearing in mind that certification decisions rest with the certification body.",
    },
    {
      type: "h2",
      text: "Preparing before a fundraise",
    },
    {
      type: "p",
      text: "Companies expecting to raise funds can reduce disruption by preparing in advance. That usually means confirming who is accountable for security at executive level, bringing the risk register up to date, collecting evidence of key controls operating, and making sure policies reflect what actually happens. Where certification is likely to be expected by customers as well as investors, starting an ISMS well ahead of a round allows controls to operate and produce evidence before anyone reviews them.",
    },
    {
      type: "p",
      text: "Support is available for organisations preparing security evidence for investor due diligence and for boards establishing cyber governance.",
    },
  ],
  sources: [
    {
      title: "Cyber Governance Code of Practice",
      publisher: "Department for Science, Innovation and Technology",
      url: "https://www.gov.uk/government/publications/cyber-governance-code-of-practice",
    },
    {
      title: "Board Toolkit",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/collection/board-toolkit",
    },
    {
      title: "ISO/IEC 27001:2022 Information security management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
    {
      title: "SOC 2: SOC for Service Organizations",
      publisher: "AICPA & CIMA",
      url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2",
    },
    {
      title: "A guide to data security",
      publisher: "Information Commissioner's Office",
      url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/a-guide-to-data-security/",
    },
  ],
  service: {
    label: "Explore vCISO & GRC advisory",
    href: "/services/vciso",
  },
  related: [
    "iso-27001-security-questionnaire",
    "iso-27001-or-soc-2-uk-saas",
    "20-person-company-iso-27001",
  ],
};

export default article;
