import type { Insight } from "../types";

const article: Insight = {
  slug: "20-person-company-iso-27001",
  title: "ISO 27001 for a 20-person company: how the standard scales",
  seoTitle: "ISO 27001 for Small Companies: How It Scales",
  standfirst:
    "ISO/IEC 27001 is written to apply to organisations of any size. This article explains how it scales to a small company, what tends to be simpler, where the real constraints lie and how to judge whether the timing is right.",
  description:
    "How ISO/IEC 27001 applies to a company of around 20 people: scope, what is simpler at small scale, internal capacity and how audit time is set.",
  summary:
    "How ISO 27001 scales to a company of about 20 people, what is simpler, and where the real constraints lie.",
  category: "Cyber and GRC",
  jurisdiction: "International",
  published: "2026-03-23",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "Founders of small companies often assume that ISO/IEC 27001 is designed for large enterprises and would be disproportionate for a team of twenty. The standard itself does not support that assumption. Small organisations do face particular challenges when implementing it, but they are mostly about people and time rather than the requirements.",
    },
    {
      type: "h2",
      text: "What the standard says about size",
    },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 states that its requirements are generic and intended to apply to all organisations, regardless of type, size or nature [1]. The standard requires an organisation to define the scope of its Information Security Management System (ISMS), assess the information security risks within that scope and treat them proportionately. The certification audit then assesses the ISMS against that scope, rather than against an external benchmark of what a larger organisation might do.",
    },
    {
      type: "p",
      text: "ISO has also published a practical handbook for small and medium-sized enterprises implementing ISO/IEC 27001:2022, which summarises the requirements and includes examples intended for organisations with limited resources [2].",
    },
    {
      type: "callout",
      title: "Illustrative example",
      text: "A hypothetical 20-person software company might define its scope as the development, hosting and support of its product for customers, delivered by all staff from a single cloud environment with no on-premises infrastructure. The risk assessment, asset inventory and supplier list for a scope like this are considerably shorter than those of a multi-site organisation. This example is illustrative only.",
    },
    {
      type: "h2",
      text: "What tends to be simpler at small scale",
    },
    {
      type: "list",
      items: [
        "Scope. A small company often has one product, one main hosting provider, one identity provider and a short list of suppliers, which keeps the asset inventory and risk assessment manageable.",
        "Decision-making. The standard requires top management to show leadership and approve key decisions such as the information security policy and risk treatment. In a small company, those people are usually close to the work and can decide quickly.",
        "Evidence. Records tend to sit in a small number of systems, such as one code repository, one cloud account and one HR platform, which makes evidence easier to gather.",
        "Culture. Changes to behaviour, such as new access review routines or incident reporting, can be communicated directly to everyone affected.",
      ],
    },
    {
      type: "h2",
      text: "Where small companies find it harder",
    },
    {
      type: "p",
      text: "The main constraint is internal capacity. ISO/IEC 27001 requires defined roles and responsibilities, an internal audit programme and management review, as well as ongoing operation of the controls [1]. A company of twenty rarely has a dedicated information security manager or an internal audit function, so the work falls to a founder, the technical lead or an operations lead alongside their existing role.",
    },
    {
      type: "p",
      text: "Internal audit is a particular point to plan for. The standard requires auditors to be selected so that the audit is objective and impartial [1], which can be difficult when the same few people design and operate the controls. Small organisations commonly address this by using an external internal auditor or by arranging for staff to audit areas they are not responsible for. The other practical question is continuity after certification: the ISMS must keep operating between audits, and responsibility for it needs to survive changes in personnel and priorities.",
    },
    {
      type: "h2",
      text: "How audit effort relates to size",
    },
    {
      type: "p",
      text: "Certification bodies determine how much audit time is needed using ISO/IEC 27006-1:2024, which includes an annex on audit time that takes account of the number of people within the ISMS scope along with other factors such as complexity [3]. A small scope with few people will generally require less audit time than a large one. Guidance from European co-operation for Accreditation is clear, however, that the certification body must always allocate enough time for a complete and effective audit, whatever the calculation produces [4].",
    },
    {
      type: "p",
      text: "Certification follows the same structure regardless of size. Under ISO/IEC 17021-1:2015, initial certification involves a Stage 1 and a Stage 2 audit, followed by surveillance audits and recertification on a three-year cycle [5]. The auditor is looking for evidence that the controls the company has chosen are operating as described. A small ISMS that is genuinely in use is more likely to satisfy that test than an elaborate one that exists mainly on paper.",
    },
    {
      type: "h2",
      text: "Deciding whether the timing is right",
    },
    {
      type: "p",
      text: "For a small company the question is usually one of timing rather than feasibility. Circumstances that suggest waiting include having no customers or prospects who ask for ISO/IEC 27001, being at a stage where leadership time is better spent on finding and serving early customers, or facing financial pressures that make a sustained management system difficult to support.",
    },
    {
      type: "p",
      text: "Where customer demand for ISO/IEC 27001 is not yet present, a proportionate baseline can still be worthwhile. In the UK, Cyber Essentials is a government-backed certification scheme covering five technical controls, and is described by the UK National Cyber Security Centre (NCSC) as the minimum standard of cyber security it recommends for organisations of all sizes [6]. The NCSC's small business guide also sets out practical steps on backups, device protection, account security and recognising scams [7]. Neither replaces an ISMS, but both can form a sound foundation for one later.",
    },
    {
      type: "p",
      text: "Support is available for small organisations assessing whether ISO/IEC 27001:2022 is proportionate for them and what a realistic scope would look like.",
    },
  ],
  sources: [
    {
      title: "ISO/IEC 27001:2022 Information security management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
    {
      title: "ISO/IEC 27001:2022 Information security management systems: a practical guide for SMEs",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/publication/PUB100484.html",
    },
    {
      title: "ISO/IEC 27006-1:2024 Requirements for bodies providing audit and certification of information security management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/82908.html",
    },
    {
      title: "Audit time determination to ISO/IEC 27006-1:2024 (FAQ 48.6)",
      publisher: "European co-operation for Accreditation",
      url: "https://european-accreditation.org/sp_accordion_faqs/question-48-6-audit-time-determination-to-iso-iec-27006-12024-determination-of-initial-number-of-persons-c-3-4/",
    },
    {
      title: "ISO/IEC 17021-1:2015 Conformity assessment: requirements for bodies providing audit and certification of management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/61651.html",
    },
    {
      title: "Cyber Essentials overview",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/cyberessentials/overview",
    },
    {
      title: "Small business guide",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/collection/small-business-guide",
    },
  ],
  service: {
    label: "Explore ISO 27001 readiness & implementation",
    href: "/services/iso-27001",
  },
  related: [
    "iso-27001-projects-over-budget",
    "iso-27001-fast-track-what-changes",
    "iso-27001-vs-cyber-essentials-plus",
  ],
};

export default article;
