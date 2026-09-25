import type { Insight } from "../types";

const article: Insight = {
  slug: "customer-asked-ai-governance",
  title: "When a customer asks about your AI governance",
  seoTitle: "Responding to Customer Questions on AI Governance",
  standfirst:
    "AI governance questions now appear in some security questionnaires and due diligence requests. This article explains what those questions are usually trying to establish, which frameworks they refer to, and how to give an accurate first answer.",
  description:
    "What customer questions about AI governance are usually testing, how ISO/IEC 42001, NIST AI RMF and the EU AI Act relate, and how to answer accurately.",
  category: "AI governance",
  jurisdiction: "International",
  published: "2026-04-04",
  updated: "2026-09-25",
  readingTime: "5 min read",
  body: [
    {
      type: "p",
      text: "Organisations that build AI into their products, or use AI to deliver a service, are increasingly finding AI governance questions in customer security questionnaires, supplier onboarding forms and investor due diligence requests. The questions vary in depth. Some ask only whether AI is used at all. Others ask how models are selected, how risks are assessed, who is accountable and which framework the organisation follows.",
    },
    {
      type: "p",
      text: "Having no formal AI governance programme is a common starting position, particularly for smaller companies whose AI use has grown quickly. The priority is to answer accurately, describe what is already in place, and be clear about what is planned. Overstating a position in a questionnaire creates a contractual and reputational risk that is harder to manage than an honest gap.",
    },
    { type: "h2", text: "What the question is usually trying to establish" },
    {
      type: "p",
      text: "Although wording differs, most AI governance questions are looking for evidence of a small number of things. A reviewer wants to understand whether the supplier knows where AI is used, whether someone is responsible for it, and whether risks to the customer and to affected individuals are considered before and after deployment.",
    },
    {
      type: "list",
      items: [
        "A named owner with defined responsibility for AI risk, reporting to senior management",
        "An inventory of AI systems and models in use, including third-party models accessed through an API",
        "A method for assessing the risks and impacts of each use case, proportionate to what the system does",
        "How personal data used in training, fine-tuning or prompts is handled, and on what lawful basis",
        "Human oversight arrangements, monitoring after deployment, and how incidents or errors are handled",
        "How suppliers of models and AI services are assessed and managed",
      ],
    },
    {
      type: "p",
      text: "An accurate inventory is often the most useful single document to produce first. It shows the reviewer the scale of AI use, and it gives the organisation itself the basis for every later decision about risk and scope.",
    },
    { type: "h2", text: "The frameworks reviewers commonly refer to" },
    {
      type: "p",
      text: "ISO/IEC 42001:2023 specifies requirements for establishing, implementing, maintaining and continually improving an Artificial Intelligence Management System (AIMS) [1]. It is a voluntary international standard, intended for organisations that provide or use products or services that use AI systems, and organisations can seek certification against it from an independent certification body [1]. It shares its management system structure with ISO/IEC 27001, which makes it familiar to organisations that already run an Information Security Management System (ISMS).",
    },
    {
      type: "p",
      text: "The NIST AI Risk Management Framework (AI RMF) 1.0, released by the US National Institute of Standards and Technology in January 2023, is intended for voluntary use and organises AI risk management around four functions: govern, map, measure and manage [2]. NIST has also published a Generative AI Profile (NIST AI 600-1) and states that AI RMF 1.0 is being revised [2]. US customers in particular may ask whether a supplier's approach draws on it. There is no certification against the AI RMF.",
    },
    {
      type: "p",
      text: "The EU Artificial Intelligence Act, Regulation (EU) 2024/1689, is binding law. It entered into force on 1 August 2024 and its obligations apply in stages, depending on the type of system and the role of the organisation [3]. It can apply to organisations outside the EU, including in the UK, where they place AI systems on the EU market or where the output of a system is used in the EU [3]. Customers with EU operations may ask how a supplier has assessed its position under the Act.",
    },
    {
      type: "p",
      text: "In the UK, the government's published approach relies on existing regulators applying five cross-sector principles within their own remits, including safety, transparency, fairness, accountability and contestability [4]. For AI that processes personal data, the Information Commissioner's Office (ICO) publishes guidance on applying UK GDPR to AI systems and on explaining decisions made with AI [5].",
    },
    {
      type: "callout",
      title: "Illustrative example",
      text: "A software company uses a third-party large language model to summarise customer support tickets. A proportionate first answer to a customer would name the owner for AI risk, describe the use case and the model supplier, explain what customer data is sent to the model and under which contractual terms, describe how summaries are reviewed, and state whether the company intends to adopt a recognised framework. This example is hypothetical and is included only to show the level of detail a reviewer may find useful.",
    },
    { type: "h2", text: "A proportionate first response" },
    {
      type: "p",
      text: "Where no programme yet exists, the following steps give an organisation something accurate to say and a sound base for later work. None of them requires a decision about certification.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Appoint an accountable owner and record their remit",
        "Build an inventory of AI use, covering internal tools as well as product features",
        "Classify each use case by what it does and who it affects, and note any that may fall within the EU AI Act's scope",
        "Review data protection arrangements for each use case, including any data protection impact assessment already required",
        "Write a short AI policy that reflects actual practice",
        "Decide which framework, if any, the programme will align to, and record the reasons",
      ],
    },
    { type: "h2", text: "Deciding whether certification is worth pursuing" },
    {
      type: "p",
      text: "ISO/IEC 42001 certification can give customers independent assurance that an AIMS exists and operates, which some procurement teams find easier to assess than a narrative answer [1]. Whether it is worth pursuing depends on who is asking, how central AI is to the product, whether the organisation already operates an ISO/IEC 27001 ISMS that the AIMS could share processes with, and whether the organisation has obligations under the EU AI Act that it needs to address in any case.",
    },
    {
      type: "p",
      text: "For some organisations, alignment with the NIST AI RMF or a documented internal programme will meet customer expectations. For others, customers will specifically request certification. It is reasonable to ask the customer which evidence they would accept before committing to a particular route.",
    },
    { type: "h2", text: "What to avoid saying" },
    {
      type: "p",
      text: "Answers should distinguish clearly between what is in place, what is in progress and what is planned. An organisation should not describe itself as ISO/IEC 42001 certified until a certificate has been issued by a certification body, and should not describe itself as compliant with the EU AI Act without having assessed which obligations apply to it and addressed them [3]. Statements such as working towards ISO/IEC 42001 are acceptable where there is a real programme behind them.",
    },
    {
      type: "p",
      text: "Where it helps, independent advisory support is available for building an AI inventory, choosing a framework and preparing for ISO/IEC 42001 certification.",
    },
  ],
  sources: [
    {
      title: "ISO/IEC 42001:2023 Information technology: Artificial intelligence: Management system",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/42001",
    },
    {
      title: "AI Risk Management Framework",
      publisher: "National Institute of Standards and Technology",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
    },
    {
      title: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
      publisher: "EUR-Lex, Publications Office of the European Union",
      url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
    },
    {
      title: "A pro-innovation approach to AI regulation: government response",
      publisher: "GOV.UK, Department for Science, Innovation and Technology",
      url: "https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response",
    },
    {
      title: "Artificial intelligence guidance",
      publisher: "Information Commissioner's Office",
      url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/",
    },
  ],
  service: {
    label: "Explore AI governance & ISO 42001",
    href: "/services/iso-42001",
  },
  related: [
    "iso-42001-vs-eu-ai-act",
    "iso-27001-ai-companies-iso-42001",
    "eu-ai-act-uk-companies",
  ],
};

export default article;
