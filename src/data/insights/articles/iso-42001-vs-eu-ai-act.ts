import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-42001-vs-eu-ai-act",
  title: "ISO 42001 and the EU AI Act: how a voluntary standard relates to binding law",
  seoTitle: "ISO 42001 and the EU AI Act Compared",
  standfirst:
    "ISO/IEC 42001 and the EU Artificial Intelligence Act are often mentioned together but serve different purposes. This article explains how they relate, where a management system supports the Act's requirements, and how to describe your position accurately.",
  description:
    "How ISO/IEC 42001 relates to the EU AI Act: a voluntary management system standard alongside binding law, where they align, and what each does not cover.",
  summary:
    "How ISO 42001, a voluntary management system, relates to the EU AI Act as binding law, and what each does not cover.",
  category: "AI governance",
  jurisdiction: "European Union",
  published: "2026-03-21",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "Statements such as EU AI Act compliant, ISO 42001 certified and aligned with AI governance frameworks are sometimes used as if they meant the same thing. They do not. One describes conformity with a legal regime, one describes an independent certificate against a voluntary standard, and the third is a general claim that needs supporting evidence. Buyers and regulators are likely to treat them differently.",
    },
    { type: "h2", text: "Two different kinds of instrument" },
    {
      type: "p",
      text: "ISO/IEC 42001:2023 is a voluntary international standard that specifies requirements for establishing, implementing, maintaining and continually improving an Artificial Intelligence Management System (AIMS) [1]. Organisations adopt it by choice, and may seek certification from an independent certification body. It applies to any organisation that provides or uses AI systems, in any jurisdiction [1].",
    },
    {
      type: "p",
      text: "Regulation (EU) 2024/1689, the Artificial Intelligence Act, is binding EU law that entered into force on 1 August 2024 [2]. Its obligations depend on the organisation's role, such as provider or deployer, and on the category of AI system or model concerned. Some obligations already apply, and those for high-risk AI systems apply from 2 December 2027 for the use cases in Annex III and from 2 August 2028 for AI systems covered by the product legislation in Annex I, following amendments made in 2026 by Regulation (EU) 2026/1744 [3][5]. These dates reflect the position as at September 2026.",
    },
    { type: "h2", text: "Where the standard supports the Act" },
    {
      type: "p",
      text: "Providers of high-risk AI systems must put in place a quality management system under Article 17 and a risk management system under Article 9, and must meet requirements on data and data governance, technical documentation, record-keeping, transparency, human oversight, accuracy, robustness and cybersecurity [2]. A well-implemented AIMS can provide the organisational structure for much of this work: defined responsibilities, a documented risk assessment and treatment process, impact assessment, control over the AI system lifecycle, management of data used by AI systems, internal audit and management review [1].",
    },
    {
      type: "p",
      text: "The degree of overlap depends on how the AIMS is scoped and implemented. The Act sets out specific content for technical documentation, specific criteria for risk management and specific requirements for data sets used in training, validation and testing [2]. A management system that meets ISO/IEC 42001 will not necessarily address each of those in the form the Act requires, so a clause-by-clause comparison against the Act's text is needed rather than an assumption of coverage.",
    },
    { type: "h2", text: "What ISO/IEC 42001 does not provide" },
    {
      type: "p",
      text: "Several obligations under the Act are regulatory procedures with no equivalent in a management system standard. For high-risk AI systems these include conformity assessment under Article 43, the EU declaration of conformity, CE marking, registration in the EU database, post-market monitoring under Article 72 and reporting of serious incidents under Article 73 [2]. Providers of general-purpose AI models have their own obligations on documentation, information for downstream providers, copyright policy and a summary of training content [2].",
    },
    {
      type: "callout",
      title: "Harmonised standards and presumption of conformity",
      text: "Under Article 40 of the AI Act, high-risk AI systems that conform with harmonised standards, or parts of them, whose references have been published in the Official Journal of the European Union are presumed to conform with the corresponding requirements. ISO/IEC 42001 is an international standard published by ISO and IEC. Certification against it does not, by itself, give rise to that presumption. Organisations should check the Official Journal for the harmonised standards that have been cited, rather than relying on secondary summaries.",
    },
    {
      type: "p",
      text: "Some organisations also use the NIST AI Risk Management Framework (AI RMF) 1.0, a voluntary framework published in January 2023 and structured around four functions: govern, map, measure and manage [4]. It can be a useful reference for risk practices, particularly for organisations with US customers, but like ISO/IEC 42001 it does not establish conformity with the EU AI Act.",
    },
    { type: "h2", text: "How the combinations work in practice" },
    {
      type: "list",
      items: [
        "Certified to ISO/IEC 42001 but not meeting the Act: possible where the organisation has a working AIMS but has not addressed obligations specific to the Act that apply to it",
        "Meeting the Act without ISO/IEC 42001: possible, because the Act does not require certification to any particular management system standard",
        "Both: an AIMS used as the organising framework, with the Act's specific requirements mapped and addressed within it",
        "Neither applicable: an organisation with no EU nexus may have no obligations under the Act, though customers may still ask about its AI governance",
      ],
    },
    { type: "h2", text: "Describing your position accurately" },
    {
      type: "p",
      text: "A claim of compliance with the EU AI Act implies that the organisation has determined which obligations apply to it and has met them. For many organisations, particularly those whose high-risk obligations do not yet apply, it is more accurate to describe the assessment carried out, the obligations identified and the work planned. A claim of ISO/IEC 42001 certification should be made only once a certificate has been issued, and should state the scope it covers [1].",
    },
    {
      type: "p",
      text: "Where customers ask about AI governance, the most useful response usually sets out the management system in place, how AI systems have been classified under the Act, and which obligations apply. For organisations developing high-risk systems, conformity assessment will be a distinct piece of work that an AIMS supports but does not replace [2].",
    },
    {
      type: "p",
      text: "Support is available for designing an AIMS that is mapped to the obligations of the AI Act that apply to a particular organisation.",
    },
  ],
  sources: [
    {
      title: "ISO/IEC 42001:2023 Information technology: Artificial intelligence: Management system",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/42001",
    },
    {
      title: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
      publisher: "EUR-Lex, Publications Office of the European Union",
      url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
    },
    {
      title: "Regulation (EU) 2026/1744 (Digital Omnibus on AI)",
      publisher: "EUR-Lex, Publications Office of the European Union",
      url: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj",
    },
    {
      title: "AI Risk Management Framework",
      publisher: "National Institute of Standards and Technology",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
    },
    {
      title: "AI Omnibus enters into force",
      publisher: "European Commission, Shaping Europe's digital future",
      url: "https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force",
    },
  ],
  service: {
    label: "Explore AI governance & ISO 42001",
    href: "/services/iso-42001",
  },
  related: [
    "eu-ai-act-uk-companies",
    "customer-asked-ai-governance",
    "iso-27001-ai-companies-iso-42001",
  ],
};

export default article;
