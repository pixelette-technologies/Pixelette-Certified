import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-27001-or-soc-2-uk-saas",
  title: "ISO 27001 or SOC 2: choosing for a UK SaaS company selling to US customers",
  seoTitle: "ISO 27001 or SOC 2 for a UK SaaS Company",
  standfirst:
    "How ISO/IEC 27001 certification and a SOC 2 examination differ, what US and UK buyers tend to ask for, and the factors that decide which to pursue first.",
  description:
    "ISO/IEC 27001 certification and SOC 2 reports compared for UK SaaS firms selling to the US: who issues each, type 1 and type 2, overlap and sequencing.",
  category: "US assurance",
  jurisdiction: "United Kingdom and United States",
  published: "2026-04-03",
  updated: "2026-09-25",
  readingTime: "5 min read",
  body: [
    {
      type: "p",
      text: "A UK software company that starts selling to US enterprises often finds that security reviews ask for a SOC 2 report, even where the company already holds ISO/IEC 27001 certification or is working towards it. The two are frequently discussed as if they were interchangeable. They come from different traditions, produce different outputs and are issued by different kinds of organisation. This article explains the differences and the factors that usually decide which to pursue, and in what order.",
    },
    {
      type: "h2",
      text: "What ISO/IEC 27001 certification is",
    },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 is an international standard that specifies requirements for establishing, implementing, maintaining and continually improving an Information Security Management System (ISMS) [1]. An organisation defines the scope of its ISMS, assesses its information security risks, and selects controls to treat them, using Annex A of the standard as a reference.",
    },
    {
      type: "p",
      text: "ISO does not certify organisations. Certificates are issued by independent certification bodies after an audit [2]. The result is a certificate stating the scope, which the organisation can share publicly and which buyers can often verify. The certificate says that the management system meets the standard. It does not describe individual controls or test results in detail.",
    },
    {
      type: "h2",
      text: "What a SOC 2 report is",
    },
    {
      type: "p",
      text: "SOC 2 is an attestation engagement developed by the American Institute of Certified Public Accountants (AICPA). It is an examination of controls at a service organisation relevant to security, availability, processing integrity, confidentiality or privacy, performed by certified public accountants (CPAs) in public practice under AICPA attestation standards [3]. The output is a report containing the auditor's opinion, a description of the system and, in a type 2 report, the tests performed and their results. SOC 2 is not a certification.",
    },
    {
      type: "p",
      text: "The examination is performed against the Trust Services Criteria, established by the AICPA's Assurance Services Executive Committee. The current version is the 2017 Trust Services Criteria with revised points of focus published in 2022 [5]. The security criteria, often called the common criteria, are included in every SOC 2 examination. The organisation chooses whether to add availability, processing integrity, confidentiality and privacy based on what its customers rely on [5].",
    },
    {
      type: "p",
      text: "There are two types of report [3]:",
    },
    {
      type: "list",
      items: [
        "A type 1 report addresses the description of the system and the suitability of the design of controls as of a specified date",
        "A type 2 report also addresses the operating effectiveness of those controls throughout a specified period, so the auditor tests whether they actually operated during that period",
      ],
    },
    {
      type: "p",
      text: "SOC 2 reports are generally intended for a limited audience of customers and others with sufficient knowledge of the system, and are usually shared under a non-disclosure agreement. The AICPA's SOC 3 report addresses the same criteria in less detail and is designed for general use [4] [6].",
    },
    {
      type: "h2",
      text: "The practical differences",
    },
    {
      type: "list",
      items: [
        "Scope: an ISMS scope is set by the organisation and can cover the whole business. A SOC 2 examination is normally scoped to the system used to deliver a particular service to customers.",
        "Evidence: ISO/IEC 27001 audits sample evidence that the management system and controls are operating. A type 2 SOC 2 examination tests controls across a defined period, so evidence has to exist for that whole period.",
        "Output: an ISO/IEC 27001 certificate is a short public document. A SOC 2 report is a detailed document that lists controls, tests and any exceptions found.",
        "Issuer: ISO/IEC 27001 certificates are issued by certification bodies. SOC 2 reports are issued by licensed CPA firms.",
      ],
    },
    {
      type: "p",
      text: "Much of the underlying control work is shared: access management, change management, logging and monitoring, supplier management, incident response and security awareness appear in both. The AICPA publishes a mapping between the Trust Services Criteria and ISO/IEC 27001, which is a useful starting point for planning a combined control set [7].",
    },
    {
      type: "h2",
      text: "What buyers tend to ask for",
    },
    {
      type: "p",
      text: "US enterprise procurement teams commonly ask for a SOC 2 report, and many specifically ask for a type 2 report because it covers controls in operation over time. UK and European buyers more often refer to ISO/IEC 27001, which is an international standard familiar to procurement teams in many countries. These are tendencies in buyer practice rather than rules. Some US buyers accept ISO/IEC 27001 with additional evidence, and some UK buyers ask for SOC 2.",
    },
    {
      type: "callout",
      title: "Accepting one in place of the other",
      text: "Whether a buyer will accept ISO/IEC 27001 in place of a SOC 2 report is the buyer's decision. It is reasonable to ask, and to offer the certificate, Statement of Applicability and supporting evidence, but a procurement process with a fixed checklist may not have discretion to accept a substitute.",
    },
    {
      type: "h2",
      text: "Deciding which comes first",
    },
    {
      type: "p",
      text: "The order usually follows the customer base. A company whose pipeline is mostly US enterprise buyers asking for SOC 2 will often start there, while one selling mainly to UK, European or international buyers will often start with ISO/IEC 27001. Where both are needed, designing one set of controls that satisfies both frameworks, and collecting evidence in a way that supports a SOC 2 examination period, reduces duplicated work. Other factors include:",
    },
    {
      type: "list",
      items: [
        "What current and prospective customers have asked for in writing",
        "Whether the business needs an assurance document it can share publicly or one it can share under a non-disclosure agreement",
        "How mature the existing controls are, since a type 2 examination needs evidence covering the whole period",
        "Internal capacity to run the management system and the examination processes at the same time",
        "The availability of a certification body and of a CPA firm with suitable experience",
      ],
    },
    {
      type: "p",
      text: "Support is available for UK companies planning readiness for either framework, or both.",
    },
  ],
  sources: [
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
      title: "SOC 2 Reporting on an Examination of Controls at a Service Organization Relevant to Security, Availability, Processing Integrity, Confidentiality, or Privacy",
      publisher: "AICPA & CIMA",
      url: "https://www.aicpa-cima.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy",
    },
    {
      title: "System and Organization Controls: SOC suite of services",
      publisher: "AICPA & CIMA",
      url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2",
    },
    {
      title: "2017 Trust Services Criteria (With Revised Points of Focus, 2022)",
      publisher: "AICPA & CIMA",
      url: "https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022",
    },
    {
      title: "SOC 3: SOC for Service Organizations: Trust Services Criteria for General Use Report",
      publisher: "AICPA & CIMA",
      url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-3",
    },
    {
      title: "Mapping: 2017 Trust Services Criteria to ISO 27001",
      publisher: "AICPA & CIMA",
      url: "https://www.aicpa-cima.com/resources/download/mapping-2017-trust-services-criteria-to-iso-27001",
    },
  ],
  service: {
    label: "Explore SOC 2 readiness",
    href: "/services/soc-2",
  },
  related: [
    "iso-27001-security-questionnaire",
    "enterprise-security-questionnaire-without-iso-27001",
    "iso-27001-uk-fintech-fca-dora",
  ],
};

export default article;
