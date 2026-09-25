import type { Insight } from "../types";

const article: Insight = {
  slug: "eu-ai-act-uk-companies",
  title: "The EU AI Act and UK companies: scope, timetable and first steps",
  seoTitle: "The EU AI Act for UK Companies",
  standfirst:
    "The EU Artificial Intelligence Act can apply to organisations established outside the EU, including in the UK. This article explains when it may apply, how its obligations are staged following the 2026 amendments, and how UK organisations can assess their position.",
  description:
    "When the EU AI Act can apply to UK organisations, its staged application dates as amended in 2026, and practical steps for assessing your position.",
  category: "AI governance",
  jurisdiction: "United Kingdom and European Union",
  published: "2026-03-22",
  updated: "2026-09-25",
  readingTime: "5 min read",
  body: [
    {
      type: "p",
      text: "Regulation (EU) 2024/1689, the Artificial Intelligence Act, establishes harmonised rules for AI systems placed on the market, put into service or used in the European Union [1]. It is binding EU law. The UK is not bound by it as a matter of domestic law, but UK organisations can fall within its scope because of what they supply into the EU or where the output of their systems is used.",
    },
    {
      type: "p",
      text: "This article reflects the position as at September 2026, including the amendments made by the Digital Omnibus on AI. It is a general overview and not legal advice. Organisations with significant EU exposure should take legal advice on their specific circumstances.",
    },
    { type: "h2", text: "When the Act can apply to a UK organisation" },
    {
      type: "p",
      text: "Article 2 sets out the Act's territorial scope. It applies to providers placing AI systems on the market or putting them into service in the EU, and to providers placing general-purpose AI models on the EU market, irrespective of where those providers are established [1]. It also applies to providers and deployers established in a third country where the output produced by the AI system is used in the EU [1]. Importers, distributors and deployers established in the EU are also covered.",
    },
    {
      type: "p",
      text: "For a UK organisation, the key questions are therefore whether it makes an AI system available to customers in the EU, whether it integrates a general-purpose AI model into a product sold there, and whether customers in the EU use the output of its systems. The role the organisation plays matters, because most obligations attach to providers, with a narrower set for deployers. A UK provider of a high-risk AI system will also need to appoint an authorised representative established in the EU before making the system available there [1].",
    },
    { type: "h2", text: "How obligations are structured" },
    {
      type: "p",
      text: "The Act takes a risk-based approach. Certain AI practices are prohibited outright under Article 5 [1]. AI systems classified as high-risk, either because they are safety components of products covered by EU product legislation listed in Annex I or because they fall within the use cases in Annex III, such as certain uses in employment, education, access to essential services and credit assessment, are subject to detailed requirements [1]. Some systems are subject to transparency obligations under Article 50, for example where people interact directly with an AI system or where content is AI-generated [1]. Separate obligations apply to providers of general-purpose AI models [1].",
    },
    {
      type: "p",
      text: "For high-risk systems, provider obligations include a risk management system, data governance, technical documentation, record-keeping, human oversight, accuracy, robustness and cybersecurity, a quality management system, conformity assessment, registration and post-market monitoring [1].",
    },
    { type: "h2", text: "The timetable as at September 2026" },
    {
      type: "p",
      text: "The Act entered into force on 1 August 2024 [1]. As originally adopted, its provisions applied in stages, and the Digital Omnibus on AI, Regulation (EU) 2026/1744, has since amended the dates for high-risk systems [2]. The Commission has confirmed that the amending regulation entered into force on 27 July 2026 [3].",
    },
    {
      type: "list",
      items: [
        "2 February 2025: the prohibitions on certain AI practices and the AI literacy provisions began to apply [1]",
        "2 August 2025: the obligations for providers of general-purpose AI models, the governance provisions and the penalties framework began to apply [1]",
        "2 August 2026: the general date of application, including the transparency obligations in Article 50 [1]",
        "2 December 2027: the obligations for high-risk AI systems in the Annex III use cases, deferred from 2 August 2026 by the 2026 amendments [3][4]",
        "2 August 2028: the obligations for high-risk AI systems that are covered by the product legislation in Annex I, deferred from 2 August 2027 [3][4]",
      ],
    },
    {
      type: "p",
      text: "The amendments also introduced a new prohibited practice concerning AI-generated non-consensual intimate content and child sexual abuse material, and extended some simplifications previously available to small and medium-sized enterprises to small mid-cap companies [4]. Other provisions, including the AI literacy provision in Article 4, were also amended [2]. Organisations should read the consolidated text rather than relying on summaries of the original Act, because several provisions were changed.",
    },
    {
      type: "callout",
      title: "Deferral is not removal",
      text: "The 2026 amendments moved the dates on which high-risk obligations apply. They did not remove those obligations, and the prohibitions and the general-purpose AI model obligations continue to apply from their original dates.",
    },
    { type: "h2", text: "Penalties and enforcement" },
    {
      type: "p",
      text: "Member States are responsible for penalties for most infringements, within maximum levels set in Article 99 [1]. The maximum fines are expressed as the higher of a fixed amount or a percentage of total worldwide annual turnover, with the highest tier reserved for prohibited practices and lower tiers for other breaches and for supplying incorrect information to authorities [1]. Supervision of general-purpose AI models sits with the Commission through the AI Office [1].",
    },
    { type: "h2", text: "How the UK position differs" },
    {
      type: "p",
      text: "The UK government's published approach relies on existing regulators applying five cross-sector principles within their own remits, rather than a single horizontal AI statute [5]. UK organisations therefore need to consider two sets of expectations: UK sector regulation and data protection law at home, and the AI Act for activity that reaches the EU.",
    },
    { type: "h2", text: "First steps for a UK organisation" },
    {
      type: "list",
      ordered: true,
      items: [
        "Build an inventory of AI systems and general-purpose AI models the organisation develops, supplies or uses",
        "For each, record whether it is made available in the EU and whether its output is used there",
        "Determine the organisation's role for each system, such as provider, deployer, importer or distributor",
        "Check each use case against the prohibited practices, the high-risk categories in Annexes I and III, and the transparency obligations",
        "Where high-risk obligations may apply, plan the documentation, risk management and quality management work against the amended dates",
        "Consider whether a management system standard such as ISO/IEC 42001 would help organise the work, recognising that it does not itself establish compliance with the Act",
      ],
    },
    {
      type: "p",
      text: "Advisory support is available for AI inventories, role and risk classification, and building an AI management system that supports this work.",
    },
  ],
  sources: [
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
      title: "AI Omnibus enters into force",
      publisher: "European Commission, Shaping Europe's digital future",
      url: "https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force",
    },
    {
      title: "Artificial intelligence: Council gives final green light to simplify and streamline rules",
      publisher: "Council of the European Union",
      url: "https://www.consilium.europa.eu/en/press/press-releases/2026/06/29/artificial-intelligence-council-gives-final-green-light-to-simplify-and-streamline-rules/",
    },
    {
      title: "A pro-innovation approach to AI regulation: government response",
      publisher: "GOV.UK, Department for Science, Innovation and Technology",
      url: "https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response",
    },
  ],
  service: {
    label: "Explore AI governance & ISO 42001",
    href: "/services/iso-42001",
  },
  related: [
    "iso-42001-vs-eu-ai-act",
    "customer-asked-ai-governance",
    "iso-27001-ai-companies-iso-42001",
  ],
};

export default article;
