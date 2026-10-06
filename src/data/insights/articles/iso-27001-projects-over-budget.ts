import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-27001-projects-over-budget",
  title: "Scoping an ISO 27001 programme: what to settle before work begins",
  seoTitle: "Scoping an ISO 27001 Programme Well",
  standfirst:
    "Many ISO/IEC 27001 programmes grow beyond their original plan because important questions were left open at the start. This article sets out how to define scope, establish a starting position and agree the details in writing.",
  description:
    "How to scope an ISO/IEC 27001 programme: defining the ISMS scope, establishing your starting position and what to settle in writing before work begins.",
  summary:
    "How to define the scope of an ISO 27001 programme and settle the starting position before work begins.",
  category: "Cyber and GRC",
  jurisdiction: "International",
  published: "2026-03-24",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "When an ISO/IEC 27001 programme takes longer or demands more effort than expected, the cause is often found in decisions made, or not made, before work started. An unclear scope, an optimistic view of existing controls or an informal understanding of who does what can each add work later. Settling these points early, and recording them, gives the organisation and anyone supporting it a shared basis for planning.",
    },
    {
      type: "h2",
      text: "Why programmes drift from their original plan",
    },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 requires an organisation to understand its context, determine the scope of its Information Security Management System (ISMS), assess and treat information security risks, and operate and improve the system over time [1]. Each of these can expand if it is not bounded. Common sources of drift include a scope that widens as stakeholders add systems or sites, a risk assessment that uncovers more remediation than anticipated, controls that exist in practice but lack evidence, and internal staff who have less time available than planned.",
    },
    {
      type: "h2",
      text: "Defining the ISMS scope",
    },
    {
      type: "p",
      text: "The standard requires the scope to be determined and documented, taking account of internal and external issues, the requirements of interested parties, and interfaces and dependencies with activities performed by others [1]. In practice, a well-defined scope names the products or services covered, the locations and teams involved, the technology environments in scope and the relevant third parties.",
    },
    {
      type: "p",
      text: "Scope should reflect what customers and other interested parties actually need assurance about. A scope that is too narrow may not satisfy the customers who prompted the work, because the certificate states what was audited and buyers can check it through public registers such as IAF CertSearch [5]. A scope that is too broad adds work and audit effort without a corresponding benefit. The number of people within the scope is also one of the factors a certification body uses when determining audit time under ISO/IEC 27006-1:2024 [6].",
    },
    {
      type: "callout",
      title: "Illustrative example",
      text: "A software company with a single product might define its scope as the development, operation and support of that product, delivered from one cloud environment by its engineering, operations and customer support teams, including the suppliers that host and support it. Its finance and marketing functions would sit outside the scope, with the interfaces between them and the in-scope teams documented. This is a hypothetical example, not a recommendation for any particular organisation.",
    },
    {
      type: "h2",
      text: "Establishing your starting position",
    },
    {
      type: "p",
      text: "A gap assessment against the clauses of ISO/IEC 27001 and the reference controls in Annex A, with implementation guidance drawn from ISO/IEC 27002:2022, gives a realistic view of what exists and what needs to be built [1] [2]. The distinction that matters most is between controls that are documented and operating with evidence, controls that operate informally without records, and controls that do not yet exist. The second category is frequently larger than expected and is where much unplanned effort originates.",
    },
    {
      type: "h2",
      text: "Questions to settle in writing before work begins",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "What is the proposed ISMS scope, and who in management has approved it?",
        "What is the agreed starting position, based on a documented gap assessment?",
        "Which deliverables will be produced, who owns each one, and what does complete mean for each?",
        "Which tasks will internal staff carry out, and how much of their time is realistically available?",
        "Who will perform the internal audit, and how will their objectivity and impartiality be ensured?",
        "Who is the named lead for any external support, and who else will work on the programme?",
        "How will changes to scope or deliverables be proposed, assessed and agreed?",
        "Which certification body will be approached, and at what point?",
        "What support, if any, is expected during the Stage 1 and Stage 2 audits and in responding to findings?",
      ],
    },
    {
      type: "p",
      text: "Recording the answers does not remove uncertainty, but it makes changes visible. When the scope or the starting position changes, everyone can see why the plan needs to change with it.",
    },
    {
      type: "h2",
      text: "Choosing and engaging a certification body",
    },
    {
      type: "p",
      text: "ISO does not certify organisations. Certification is carried out by independent certification bodies [3]. In the UK, the United Kingdom Accreditation Service (UKAS) accredits certification bodies as competent to audit and certify management systems [4]. Accredited ISMS certification bodies work to ISO/IEC 17021-1:2015 and ISO/IEC 27006-1:2024, which govern how audits are planned, how audit time is determined and how certification decisions are made [6] [7].",
    },
    {
      type: "p",
      text: "When comparing certification bodies, it is reasonable to ask about their accreditation for ISO/IEC 27001, their experience in your sector, auditor availability and how they will structure the Stage 1 and Stage 2 audits. The certification body is independent of any consultant supporting you, so its audit plan and decisions are its own. It should be engaged directly by the organisation seeking certification.",
    },
    {
      type: "h2",
      text: "Keeping the programme on course",
    },
    {
      type: "p",
      text: "Once work begins, regular review against the agreed scope, deliverables and internal capacity helps identify drift early. Where the gap assessment turns out to be optimistic, it is better to revise the plan openly than to compress the time controls have to operate before audit. A programme that reflects the organisation's real position is easier to sustain through surveillance audits and recertification than one built around a target date.",
    },
    {
      type: "p",
      text: "Support is available for organisations scoping an ISO/IEC 27001:2022 programme and carrying out an initial gap assessment.",
    },
  ],
  sources: [
    {
      title: "ISO/IEC 27001:2022 Information security management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
    {
      title: "ISO/IEC 27002:2022 Information security controls",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/75652.html",
    },
    {
      title: "Certification",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/certification.html",
    },
    {
      title: "Certification body accreditation",
      publisher: "United Kingdom Accreditation Service",
      url: "https://www.ukas.com/accreditation/standards/certification-body-accreditation/",
    },
    {
      title: "IAF CertSearch",
      publisher: "International Accreditation Forum",
      url: "https://www.iafcertsearch.org/",
    },
    {
      title: "ISO/IEC 27006-1:2024 Requirements for bodies providing audit and certification of information security management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/82908.html",
    },
    {
      title: "ISO/IEC 17021-1:2015 Conformity assessment: requirements for bodies providing audit and certification of management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/61651.html",
    },
  ],
  service: {
    label: "Explore ISO 27001 readiness & implementation",
    href: "/services/iso-27001",
  },
  related: [
    "iso-27001-fast-track-what-changes",
    "compliance-automation-platforms-and-consultancy",
    "20-person-company-iso-27001",
  ],
};

export default article;
