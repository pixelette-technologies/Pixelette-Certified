import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-27001-fast-track-what-changes",
  title: "ISO 27001 timetables: what can be shortened and what cannot",
  seoTitle: "What Affects an ISO 27001 Timetable",
  standfirst:
    "ISO/IEC 27001 does not prescribe a timetable. This article explains which parts of a programme depend on your own organisation, which depend on the certification body, and why operating evidence cannot be rushed.",
  description:
    "What affects an ISO 27001 timetable: starting position, scope, operating evidence, certification body scheduling and how ISO/IEC 27006-1 sets audit time.",
  category: "Cyber and GRC",
  jurisdiction: "International",
  published: "2026-04-06",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "Organisations preparing for ISO/IEC 27001 certification usually want to know how long it will take. The honest answer is that it depends, and that some of the variables sit outside the organisation's control. Understanding which parts of a programme can be planned more efficiently, and which cannot, helps set realistic expectations with customers, investors and boards.",
    },
    {
      type: "h2",
      text: "The standard sets requirements, not a calendar",
    },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 specifies requirements for establishing, implementing, maintaining and continually improving an Information Security Management System (ISMS). It includes requirements for assessing and treating information security risks, and Annex A lists 93 reference controls grouped into four themes [1]. Implementation guidance for those controls is published separately in ISO/IEC 27002:2022 [6].",
    },
    {
      type: "p",
      text: "Nothing in the standard fixes how long implementation should take. What it does require is that the management system operates: risks are assessed and treated, controls are selected and justified in a Statement of Applicability, internal audits are carried out and top management reviews the ISMS [1]. Those activities take place over time, and that is the main reason a credible timetable cannot be reduced to a documentation exercise.",
    },
    {
      type: "h2",
      text: "How the certification audit is structured",
    },
    {
      type: "p",
      text: "Certification bodies that audit management systems work to ISO/IEC 17021-1:2015, which sets requirements for their competence, consistency and impartiality [2]. For ISMS certification, ISO/IEC 27006-1:2024 adds requirements specific to information security, and replaced ISO/IEC 27006:2015 [3]. Certification bodies are in turn assessed by accreditation bodies, such as the United Kingdom Accreditation Service (UKAS) in the UK [5].",
    },
    {
      type: "p",
      text: "Under ISO/IEC 17021-1, initial certification is a two-stage audit. Stage 1 reviews the management system's design and readiness, including whether internal audits and management reviews are being planned and performed. Stage 2 evaluates whether the system is implemented and effective. Certificates then run on a three-year cycle with surveillance audits in the intervening years and a recertification audit before expiry [2].",
    },
    {
      type: "callout",
      title: "Audit time is set by the certification body",
      text: "ISO/IEC 27006-1:2024 includes an annex on determining audit time, which takes account of the number of people within the scope and other factors [3]. European co-operation for Accreditation guidance on that annex notes that, whatever the calculation, the certification body must ensure enough time is allocated for a complete and effective audit [4]. The length of the audit is therefore not something a client or consultant can negotiate down.",
    },
    {
      type: "h2",
      text: "What affects your timetable",
    },
    {
      type: "p",
      text: "The following factors usually have the greatest influence on how long preparation takes:",
    },
    {
      type: "list",
      items: [
        "Starting position. An organisation that already operates documented access control, change management, supplier management and incident response has less to build than one starting from informal practice.",
        "Scope. A scope covering one product, one hosting environment and one team is simpler to implement and audit than one spanning several sites, business units or legal entities.",
        "Operating evidence. Auditors look for evidence that controls are working, such as access reviews completed, incidents logged and training delivered. That evidence accumulates only as the controls operate.",
        "Internal audit and management review. Both are ISO/IEC 27001 requirements and need to have taken place, with outputs recorded, before the certification audit can assess them properly.",
        "Decision-making capacity. Risk treatment decisions, policy approvals and resourcing depend on management availability.",
        "Certification body scheduling. Certification bodies plan audits around auditor availability. Booking early reduces waiting time but does not change what the audit requires.",
      ],
    },
    {
      type: "h2",
      text: "What can reasonably be made more efficient",
    },
    {
      type: "p",
      text: "Some parts of a programme respond well to better planning. Working from a structured set of policy and procedure templates, tailored to the organisation, can reduce drafting time compared with writing from nothing. Running workstreams in parallel, rather than one after another, can shorten elapsed time where people are available. Agreeing scope early and approaching certification bodies once scope is stable can avoid delays later.",
    },
    {
      type: "p",
      text: "Other parts do not compress. The risk assessment still needs to reflect the organisation's real risks. Controls still need to operate for long enough to produce meaningful evidence. The internal audit still needs to be conducted objectively and impartially, as the standard requires [1]. The certification body still decides the audit duration and makes the certification decision independently. A plan that appears to shorten any of these deserves close scrutiny.",
    },
    {
      type: "h2",
      text: "Questions to ask of any proposed plan",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "What is the proposed ISMS scope, and has it been agreed with management in writing?",
        "Which controls in Annex A are expected to be excluded, and on what justification?",
        "How long will key controls have operated before the Stage 2 audit, and what evidence will exist?",
        "When will the internal audit and management review take place, and who will conduct the internal audit?",
        "Which accredited certification body is proposed, and has its availability been confirmed?",
        "What happens to the plan if the Stage 1 audit identifies issues that need resolving before Stage 2?",
      ],
    },
    {
      type: "p",
      text: "Clear answers to these questions are a better indicator of a realistic plan than any headline duration. Where a timetable matters to a customer or investor, it is usually more credible to share the plan and its dependencies than a single target date.",
    },
    {
      type: "p",
      text: "Readiness support is available for organisations planning an ISO/IEC 27001:2022 programme and assessing what their own timetable depends on.",
    },
  ],
  sources: [
    {
      title: "ISO/IEC 27001:2022 Information security management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
    {
      title: "ISO/IEC 17021-1:2015 Conformity assessment: requirements for bodies providing audit and certification of management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/61651.html",
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
      title: "Certification body accreditation",
      publisher: "United Kingdom Accreditation Service",
      url: "https://www.ukas.com/accreditation/standards/certification-body-accreditation/",
    },
    {
      title: "ISO/IEC 27002:2022 Information security controls",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/75652.html",
    },
  ],
  service: {
    label: "Explore ISO 27001 readiness & implementation",
    href: "/services/iso-27001",
  },
  related: [
    "iso-27001-projects-over-budget",
    "iso-27001-security-questionnaire",
    "20-person-company-iso-27001",
  ],
};

export default article;
