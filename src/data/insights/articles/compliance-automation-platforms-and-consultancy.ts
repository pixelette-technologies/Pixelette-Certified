import type { Insight } from "../types";

const article: Insight = {
  slug: "compliance-automation-platforms-and-consultancy",
  title: "Compliance automation platforms and consultancy: what each contributes",
  seoTitle: "Compliance Automation Platforms and Consultancy",
  standfirst:
    "Compliance automation platforms have become a common part of ISO/IEC 27001 and SOC 2 programmes. This article sets out what they typically do well, which parts of the work still depend on judgement, and how to decide what combination suits your organisation.",
  description:
    "What compliance automation platforms typically do for ISO/IEC 27001 and SOC 2 programmes, what still needs judgement, and how to decide on the right mix.",
  category: "Cyber and GRC",
  jurisdiction: "International",
  published: "2026-03-25",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "Organisations preparing for ISO/IEC 27001 certification or a SOC 2 examination now have a choice of software platforms that automate parts of the work. They are often presented as an alternative to advisory support, and advisory firms sometimes present themselves as an alternative to software. In practice the two do different things, and many programmes use both. The useful question is which parts of the work each is suited to.",
    },
    { type: "h2", text: "What the platforms typically do" },
    {
      type: "p",
      text: "Capabilities vary between products, but most compliance automation platforms offer a similar core set of features.",
    },
    {
      type: "list",
      items: [
        "Integrations with cloud infrastructure, identity providers, code repositories, device management and HR systems, used to test whether configured controls are operating and to flag drift",
        "Collection of evidence from those integrations, so that records such as access reviews or configuration settings can be produced without manual assembly",
        "Policy templates, control libraries mapped to common frameworks, and task tracking for implementation work",
        "Workflows for recurring activities such as security awareness training, employee onboarding checks and vendor reviews",
      ],
    },
    {
      type: "p",
      text: "For organisations whose systems are largely cloud-based and well supported by the available integrations, these features can reduce the administrative effort of gathering and maintaining evidence, both before the first audit and during the surveillance cycle that follows.",
    },
    { type: "h2", text: "What still depends on judgement" },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 requires an organisation to determine the scope of its Information Security Management System (ISMS), assess information security risks in its own context, decide how to treat them, and produce a Statement of Applicability justifying the inclusion or exclusion of each Annex A control [1]. It also requires leadership commitment, internal audit and management review [1]. A platform can provide templates and a register to record these decisions, but the decisions themselves depend on knowledge of the business, its customers, its contractual obligations and its risk appetite.",
    },
    {
      type: "p",
      text: "Several other areas typically fall outside automated tooling: environments that integrations cannot reach, such as on-premises systems or specialised operational technology; policies that need to reflect how the organisation actually operates rather than a generic template; controls that are procedural rather than technical; and sector-specific regulatory requirements that go beyond the framework itself.",
    },
    {
      type: "p",
      text: "Automation also does not change who makes the assurance decision. ISO does not certify organisations; certificates are issued by independent certification bodies [2]. In the UK, certification bodies offering accredited ISO/IEC 27001 certification are accredited by the United Kingdom Accreditation Service (UKAS) and must meet ISO/IEC 27006-1, which sets requirements for bodies auditing and certifying an ISMS [3]. A SOC 2 report is issued by a licensed CPA firm following an examination of controls relevant to security, availability, processing integrity, confidentiality or privacy [4]. Neither a platform nor an adviser issues a certificate or a SOC 2 report.",
    },
    {
      type: "callout",
      title: "Evidence is not the same as effectiveness",
      text: "A dashboard showing all controls as passing reflects the tests the platform can run. Auditors assess whether the management system as a whole is designed and operating effectively, including processes that no integration can observe. Organisations should expect questions that go beyond the evidence a platform exports.",
    },
    { type: "h2", text: "Where advisory support fits" },
    {
      type: "p",
      text: "Advisory support is most often used for scoping, risk assessment methodology, the Statement of Applicability, tailoring policies, designing processes for areas outside the platform's reach, internal audit, and preparing for the certification body's audit. Organisations with an experienced internal security or compliance lead may need little of this. Those without such a person often find that platform alerts and tasks are generated but not acted upon, because nobody has the time or the context to interpret them.",
    },
    {
      type: "p",
      text: "The balance also differs between frameworks. A SOC 2 examination reports on a service organisation's controls against the criteria for the categories it has chosen to include [4], while ISO/IEC 27001 places more emphasis on the management system clauses, such as context, leadership, risk treatment and continual improvement [1]. The effort needed outside the platform may therefore differ depending on which framework is being pursued.",
    },
    { type: "h2", text: "Questions to help decide" },
    {
      type: "list",
      ordered: true,
      items: [
        "How much of the environment is covered by the platform's integrations, and what would need to be evidenced manually",
        "Which framework or frameworks are required by customers, and in which jurisdictions",
        "Whether there is an internal owner with the knowledge and time to make risk and scope decisions and act on platform output",
        "Whether the organisation needs help designing the management system itself, or mainly with maintaining evidence once it exists",
        "How the platform's policy and control libraries would be adapted to reflect how the organisation actually works",
      ],
    },
    {
      type: "p",
      text: "The answers usually point to one of three arrangements: a platform supported by a capable internal team, advisory support without a platform, or a combination. Each can work. The choice depends on the environment, the frameworks involved and the people available, and it is worth revisiting once the first audit cycle is complete.",
    },
    {
      type: "p",
      text: "Independent advisory support is available to organisations using compliance platforms, and to those that are not, for scoping, risk assessment and preparing for ISO/IEC 27001 certification audits.",
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
      title: "ISO/IEC 27006-1:2024 ISMS transition arrangements",
      publisher: "United Kingdom Accreditation Service",
      url: "https://www.ukas.com/resources/technical-bulletins/transition-to-iso-iec-27006-12024/",
    },
    {
      title: "System and Organization Controls: SOC suite of services",
      publisher: "AICPA & CIMA",
      url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2",
    },
  ],
  service: {
    label: "Explore ISO 27001 readiness & implementation",
    href: "/services/iso-27001",
  },
  related: [
    "iso-27001-projects-over-budget",
    "20-person-company-iso-27001",
    "iso-27001-or-soc-2-uk-saas",
  ],
};

export default article;
