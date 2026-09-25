import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-27001-uk-fintech-fca-dora",
  title: "ISO 27001 for UK fintech: how it relates to FCA operational resilience and DORA",
  seoTitle: "ISO 27001, FCA Resilience and DORA for UK Fintech",
  standfirst:
    "What the FCA and PRA operational resilience rules require, when the EU Digital Operational Resilience Act reaches a UK firm, and where an ISO/IEC 27001 management system helps and where it does not.",
  description:
    "How ISO/IEC 27001 relates to FCA and PRA operational resilience rules and to DORA, including when DORA affects a UK fintech and what an ISMS leaves out.",
  category: "UK compliance",
  jurisdiction: "United Kingdom",
  published: "2026-04-01",
  updated: "2026-09-25",
  readingTime: "6 min read",
  body: [
    {
      type: "p",
      text: "UK fintech firms authorised by the Financial Conduct Authority (FCA), and in some cases also by the Prudential Regulation Authority (PRA), work within operational resilience rules that go further than general information security practice. Some also have customers or group companies in the European Union, which raises the question of whether the EU Digital Operational Resilience Act (DORA) applies to them. This article sets out what those regimes require, where ISO/IEC 27001:2022 fits, and where it does not.",
    },
    {
      type: "callout",
      title: "The short version",
      text: "ISO/IEC 27001 is a voluntary international standard. Neither the FCA and PRA rules nor DORA require certification to it. A well-run Information Security Management System (ISMS) can supply much of the governance, risk and control evidence those regimes call for, but each regime has its own scope, terminology and reporting duties that an ISMS does not cover by default.",
    },
    {
      type: "h2",
      text: "The FCA and PRA operational resilience rules",
    },
    {
      type: "p",
      text: "The FCA's operational resilience framework was introduced through Policy Statement PS21/3. The rules came into force on 31 March 2022, and by 31 March 2025 in-scope firms had to be able to remain within their impact tolerances [1]. Firms must identify their important business services, meaning services which, if disrupted, could cause intolerable harm to consumers or markets, and set an impact tolerance for the maximum tolerable disruption to each one [1].",
    },
    {
      type: "p",
      text: "The rules sit in chapter 15A of the Senior Management Arrangements, Systems and Controls sourcebook (SYSC 15A), which also covers mapping, scenario testing, self-assessment documentation, governance and communications [2]. The chapter applies to defined categories of firm, including banks, building societies, enhanced scope firms under the Senior Managers and Certification Regime (SMCR), Solvency II firms, payment institutions, electronic money institutions and registered account information service providers [2]. A fintech holding other permissions should check the application provisions rather than assume the chapter applies to it.",
    },
    {
      type: "p",
      text: "For dual-regulated firms, the PRA sets parallel expectations in Supervisory Statement SS1/21. It applies to UK banks, building societies, PRA-designated investment firms, Solvency II insurers and the Society of Lloyd's and its managing agents [3].",
    },
    {
      type: "h2",
      text: "Incident and third-party reporting from March 2027",
    },
    {
      type: "p",
      text: "In March 2026 the FCA published PS26/2, its final rules on operational incident reporting and third-party reporting, developed with the PRA and the Bank of England. The rules define an operational incident, set thresholds for reporting, and require firms to notify the FCA of new or significantly changed material third-party arrangements and to maintain a register of those arrangements for annual submission. They apply from 18 March 2027 [4]. The register in particular will need supplier information that many firms do not currently hold in one place.",
    },
    {
      type: "p",
      text: "A separate regime for critical third parties, run jointly by the Bank of England, the PRA and the FCA, took effect on 1 January 2025. It applies only to third parties that HM Treasury designates, and the FCA states that it does not change the responsibility firms have for managing their own supplier relationships [5].",
    },
    {
      type: "h2",
      text: "When DORA reaches a UK firm",
    },
    {
      type: "p",
      text: "DORA, Regulation (EU) 2022/2554, has applied since 17 January 2025. It covers information and communication technology (ICT) risk management, ICT-related incident management and reporting, digital operational resilience testing, ICT third-party risk and information sharing. Its obligations fall on the EU financial entities listed in Article 2, such as credit institutions, payment and electronic money institutions, investment firms, insurers and crypto-asset service providers [6].",
    },
    {
      type: "p",
      text: "A firm authorised only in the UK is not a financial entity under DORA. Having EU customers is not, on its own, the test. There are three more precise routes by which DORA can affect a UK business:",
    },
    {
      type: "list",
      items: [
        "Group structure. Where a UK fintech has a subsidiary authorised in an EU member state as one of the entity types in Article 2, that EU entity is directly in scope [6].",
        "Supplying EU financial entities. DORA requires EU financial entities to manage ICT third-party risk and to include specified terms in contracts with ICT third-party service providers. A UK firm providing ICT services to such a customer will usually meet DORA through contract terms, audit and access rights and information requests, rather than as a directly supervised party [6].",
        "Designation as a critical provider. The European Supervisory Authorities can designate ICT third-party service providers as critical and bring them under EU oversight. The first list was published on 18 November 2025 and consisted largely of major cloud, data centre, telecommunications and technology providers [7].",
      ],
    },
    {
      type: "h2",
      text: "Where an ISMS helps",
    },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 specifies requirements for establishing, implementing, maintaining and continually improving an ISMS [8]. Certification is carried out by independent certification bodies and confirms that the management system meets the standard for a defined scope. Several parts of a working ISMS line up reasonably well with what the FCA, the PRA and DORA expect to see:",
    },
    {
      type: "list",
      items: [
        "A documented risk assessment and treatment process with named risk owners and management review",
        "Supplier security requirements, supplier monitoring and an inventory of third-party services",
        "Incident management procedures, logging and post-incident review",
        "Access control, change management, backup and vulnerability management",
        "Internal audit and a record of corrective action",
      ],
    },
    {
      type: "p",
      text: "For a UK firm supplying EU financial entities, an ISO/IEC 27001 certificate with a relevant scope is commonly accepted by customers as one input to their third-party due diligence, alongside contract terms and questionnaires. That is a matter of customer practice rather than regulation, and each customer decides what evidence it will accept.",
    },
    {
      type: "h2",
      text: "What an ISMS does not cover by default",
    },
    {
      type: "p",
      text: "An ISMS is scoped around information and the risks to it. Operational resilience is scoped around important business services and the harm their disruption would cause. The two views overlap, but the regulatory framework asks for outputs that an ISMS does not produce unless it is designed to:",
    },
    {
      type: "list",
      items: [
        "Identification of important business services and impact tolerances, with board-level approval [1]",
        "Mapping of the people, processes, technology, facilities and information that support each important business service [2]",
        "Scenario testing against impact tolerances, lessons learned and a written self-assessment [2]",
        "Incident classification and reporting against the regulators' thresholds and formats [4]",
        "A register of material third-party arrangements in the form the regulators require [4]",
      ],
    },
    {
      type: "p",
      text: "Business continuity and disaster recovery plans usually address part of this gap, but they need to be framed around important business services and tested against impact tolerances to serve the regulatory purpose.",
    },
    {
      type: "h2",
      text: "Bringing the two together",
    },
    {
      type: "p",
      text: "For most regulated fintechs, the sensible approach is to treat the regulatory obligations as the requirements and the ISMS as one of the ways of meeting and evidencing them. In practice that means setting the ISMS scope so it covers the systems behind the important business services, aligning risk ratings and incident severities with the regulatory thresholds, and keeping one supplier inventory that can feed both the ISMS and the future FCA register.",
    },
    {
      type: "p",
      text: "How long this takes depends on the firm's starting position, the number of important business services, the complexity of its third-party dependencies and, where certification is pursued, the certification body's availability. As at September 2026, the incident and third-party reporting rules and the critical third party regime are still being implemented, so firms should check the FCA and PRA websites for changes. Independent support is available for firms that want a review of how their ISMS lines up with these obligations.",
    },
  ],
  sources: [
    {
      title: "Operational resilience",
      publisher: "Financial Conduct Authority",
      url: "https://www.fca.org.uk/firms/operational-resilience",
    },
    {
      title: "SYSC 15A Operational resilience, FCA Handbook",
      publisher: "Financial Conduct Authority",
      url: "https://www.handbook.fca.org.uk/handbook/SYSC/15A/",
    },
    {
      title: "SS1/21 Operational resilience: Impact tolerances for important business services",
      publisher: "Prudential Regulation Authority, Bank of England",
      url: "https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/operational-resilience-impact-tolerances-for-important-business-services-ss",
    },
    {
      title: "PS26/2: Operational incident and third party reporting",
      publisher: "Financial Conduct Authority",
      url: "https://www.fca.org.uk/publications/policy-statements/ps26-2-operational-incident-third-party-reporting",
    },
    {
      title: "PS24/16: Operational resilience: Critical third parties to the UK financial sector",
      publisher: "Financial Conduct Authority",
      url: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
    },
    {
      title: "Regulation (EU) 2022/2554 on digital operational resilience for the financial sector (DORA)",
      publisher: "EUR-Lex, Publications Office of the European Union",
      url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
    },
    {
      title: "The European Supervisory Authorities designate critical ICT third-party providers under the Digital Operational Resilience Act",
      publisher: "European Banking Authority",
      url: "https://www.eba.europa.eu/publications-and-media/press-releases/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital",
    },
    {
      title: "ISO/IEC 27001:2022 Information security management systems: Requirements",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
  ],
  service: {
    label: "Explore ISO 27001 readiness & implementation",
    href: "/services/iso-27001",
  },
  related: [
    "iso-27001-or-soc-2-uk-saas",
    "iso-27001-security-questionnaire",
    "iso-27001-projects-over-budget",
  ],
};

export default article;
