import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-27001-vs-cyber-essentials-plus",
  title: "ISO 27001 and Cyber Essentials Plus: how they differ and when each is asked for",
  seoTitle: "ISO 27001 vs Cyber Essentials Plus: Key Differences",
  standfirst:
    "Cyber Essentials Plus and ISO/IEC 27001 are often compared as if they were alternatives. They assess different things, are issued under different arrangements, and tend to be requested by different buyers.",
  description:
    "How Cyber Essentials Plus and ISO/IEC 27001 differ in scope, assessment and recognition, which buyers tend to ask for each, and how they can work together.",
  summary:
    "How Cyber Essentials Plus and ISO 27001 differ in what they assess, and which buyers tend to ask for each.",
  category: "UK compliance",
  jurisdiction: "United Kingdom",
  published: "2026-03-26",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "UK organisations weighing up information security credentials often ask whether they need ISO/IEC 27001 or Cyber Essentials Plus. The two are sometimes treated as rival options, but they answer different questions. Cyber Essentials Plus tests whether a defined set of technical controls is in place. ISO/IEC 27001 certification assesses whether an organisation runs a management system for information security risk. This article explains the difference and the situations in which each tends to be requested.",
    },
    {
      type: "h2",
      text: "What Cyber Essentials covers",
    },
    {
      type: "p",
      text: "Cyber Essentials is a UK government-backed scheme developed by the National Cyber Security Centre (NCSC). The NCSC describes it as the minimum standard of cyber security recommended by government for organisations of all sizes [1]. It covers five technical controls: firewalls, secure configuration, security update management, user access control and malware protection [1].",
    },
    {
      type: "p",
      text: "IASME is the government's Cyber Essentials delivery partner. Assessment and certification are carried out by certification bodies licensed by IASME [2]. There are two levels:",
    },
    {
      type: "list",
      items: [
        "Cyber Essentials, a verified self-assessment in which the organisation answers a question set and a qualified assessor marks the answers [3]",
        "Cyber Essentials Plus, which adds a technical audit, including external vulnerability scanning and testing of a representative sample of devices, to verify that the controls are in place [3]",
      ],
    },
    {
      type: "p",
      text: "Both levels are renewed annually. The Cyber Essentials Plus audit must be completed within three months of the organisation's Cyber Essentials certification [3].",
    },
    {
      type: "p",
      text: "The requirements are updated from time to time. As at September 2026, the current document is Requirements for IT Infrastructure v3.3, which applies to assessments from late April 2026 and uses the Danzell question set. Among other changes, it states that cloud services cannot be excluded from scope, makes multi-factor authentication on cloud services an automatic fail point where it is available but not used, and treats failure to apply high-risk or critical security updates within 14 days as an automatic fail [4].",
    },
    {
      type: "h2",
      text: "What ISO/IEC 27001 covers",
    },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 is an international standard that specifies requirements for establishing, implementing, maintaining and continually improving an Information Security Management System (ISMS) [5]. Its requirements cover the context and scope of the ISMS, leadership, risk assessment and treatment, support, operation, performance evaluation and improvement. Annex A lists 93 reference controls in organisational, people, physical and technological themes. An organisation decides which apply on the basis of its risk assessment and records the decision in a Statement of Applicability [5].",
    },
    {
      type: "p",
      text: "ISO itself does not certify organisations. Certificates are issued by independent certification bodies [6]. Under ISO/IEC 17021-1:2015, initial certification involves a Stage 1 and a Stage 2 audit, followed by surveillance audits and recertification on a three-year cycle [7].",
    },
    {
      type: "h2",
      text: "The main differences",
    },
    {
      type: "list",
      items: [
        "Focus: Cyber Essentials Plus tests a fixed set of technical controls. ISO/IEC 27001 assesses a management system that selects controls on the basis of risk.",
        "Breadth: Cyber Essentials does not address governance, supplier management, incident management, business continuity or physical security in any depth. ISO/IEC 27001 covers all of these.",
        "Method: Cyber Essentials Plus relies heavily on technical testing of devices and internet-facing services. ISO/IEC 27001 audits rely on interviews, documents, records and sampled evidence of controls in operation.",
        "Recognition: Cyber Essentials is a UK scheme and is referenced in UK public sector procurement policy. ISO/IEC 27001 is an international standard recognised by buyers in many countries.",
      ],
    },
    {
      type: "h2",
      text: "Who tends to ask for which",
    },
    {
      type: "p",
      text: "In UK public procurement, Procurement Policy Note (PPN) 014 applies to central government departments, their executive agencies and non-departmental public bodies, and NHS bodies. For relevant contracts, such as those involving personal information or certain information and communication technology services, suppliers are asked to hold Cyber Essentials or Cyber Essentials Plus, or to demonstrate equivalent controls, before contract award. The note says the scheme should not be applied to every contract as a matter of course [8]. The buyer decides which level to ask for.",
    },
    {
      type: "p",
      text: "Private sector buyers, particularly larger enterprises and regulated organisations, more often refer to ISO/IEC 27001 in supplier questionnaires, and overseas buyers are unlikely to be familiar with Cyber Essentials. These are patterns in buyer practice rather than rules, and individual procurement teams vary. The most reliable guide is what the organisation's own customers and target tenders actually ask for.",
    },
    {
      type: "callout",
      title: "Illustrative example",
      text: "A hypothetical UK software supplier bids for a government contract that involves citizens' personal data and also sells to banks in the UK and abroad. The government tender asks for Cyber Essentials Plus, and the banks' questionnaires ask about ISO/IEC 27001. In that situation the two credentials serve different customers, and holding one would not satisfy the request for the other.",
    },
    {
      type: "h2",
      text: "Using them together",
    },
    {
      type: "p",
      text: "The technical controls in Cyber Essentials correspond to a subset of the controls in ISO/IEC 27001 Annex A, so work on one supports the other. Organisations that already run an ISMS generally find that Cyber Essentials Plus tests controls they have documented, while organisations that start with Cyber Essentials gain a technical baseline that an ISMS can build on. The order that makes sense depends on which customers need to be satisfied first, the current state of the technical estate, and the resources available to run an ISMS once it is in place. Support is available for organisations deciding how to sequence the two.",
    },
  ],
  sources: [
    {
      title: "Cyber Essentials overview",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/cyberessentials/overview",
    },
    {
      title: "What is the role of Certification Bodies when certifying to Cyber Essentials?",
      publisher: "IASME",
      url: "https://iasme.co.uk/articles/what-is-the-role-of-certification-bodies-when-certifying-to-cyber-essentials/",
    },
    {
      title: "Cyber Essentials and Cyber Essentials Plus: what is the difference?",
      publisher: "IASME",
      url: "https://iasme.co.uk/articles/cyber-essentials-and-cyber-essentials-plus-what-is-the-difference/",
    },
    {
      title: "Important update: changes to Cyber Essentials for April 2026",
      publisher: "IASME",
      url: "https://iasme.co.uk/articles/important-update-changes-to-cyber-essentials-for-april-2026/",
    },
    {
      title: "ISO/IEC 27001:2022 Information security management systems: Requirements",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
    {
      title: "Certification",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/certification.html",
    },
    {
      title: "ISO/IEC 17021-1:2015 Conformity assessment: requirements for bodies providing audit and certification of management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/61651.html",
    },
    {
      title: "PPN 014: Cyber Essentials scheme",
      publisher: "GOV.UK",
      url: "https://www.gov.uk/government/publications/ppn-014-cyber-essentials-scheme",
    },
  ],
  service: {
    label: "Explore Cyber Essentials readiness & certification support",
    href: "/services/cyber-essentials",
  },
  related: [
    "iso-27001-uk-healthtech-nhs",
    "cyber-insurance-premium-increased",
    "iso-27001-security-questionnaire",
  ],
};

export default article;
