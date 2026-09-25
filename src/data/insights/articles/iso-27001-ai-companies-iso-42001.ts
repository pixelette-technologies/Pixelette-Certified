import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-27001-ai-companies-iso-42001",
  title: "ISO 27001 and ISO 42001 for AI companies: how the two standards fit together",
  seoTitle: "ISO 27001 and ISO 42001 for AI Companies",
  standfirst:
    "ISO/IEC 27001 and ISO/IEC 42001 share a management system structure but address different risks. This article sets out what each covers, where they overlap, and what to consider when deciding whether to pursue one or both.",
  description:
    "How ISO/IEC 27001 and ISO/IEC 42001 relate for companies that build or use AI: shared structure, different risk domains, and how to decide on scope.",
  category: "AI governance",
  jurisdiction: "International",
  published: "2026-03-30",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "Companies that build AI products are sometimes told that ISO/IEC 42001 makes ISO/IEC 27001 unnecessary, or the reverse. Neither claim holds in general. The two standards are designed to work together, and the right combination depends on what customers ask for, what the organisation already has in place and which risks it needs to manage.",
    },
    { type: "h2", text: "What each standard covers" },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 specifies requirements for an Information Security Management System (ISMS) [1]. Its purpose is to preserve the confidentiality, integrity and availability of information through a risk-based management system. Annex A of the 2022 edition lists 93 reference controls grouped into organisational, people, physical and technological themes, and an organisation decides which apply to it through its risk assessment and records that in a Statement of Applicability.",
    },
    {
      type: "p",
      text: "ISO/IEC 42001:2023 specifies requirements for an Artificial Intelligence Management System (AIMS) [2]. It is intended for organisations that provide or use products or services that use AI systems, and it addresses matters specific to AI, such as assessing the impact of AI systems on individuals and society, the AI system lifecycle, data used by AI systems, transparency towards interested parties and the responsible use of AI [2]. Like ISO/IEC 27001, it contains an annex of reference controls that the organisation selects according to its own risk assessment.",
    },
    {
      type: "p",
      text: "Both standards follow the harmonised structure that ISO uses for management system standards, with the same clause sequence covering context, leadership, planning, support, operation, performance evaluation and improvement [2]. This shared structure is where most of the practical overlap lies.",
    },
    { type: "h2", text: "Where they overlap and where they do not" },
    {
      type: "p",
      text: "Many management system processes can be shared between an ISMS and an AIMS: document control, competence and awareness, internal audit, management review, and the handling of nonconformities and corrective action. An organisation that already runs one system can usually extend these processes to cover the second rather than building them again.",
    },
    {
      type: "p",
      text: "The risk domains are different. ISO/IEC 27001 is concerned with information security risk, including access control, cryptography, supplier security, secure development, logging, incident management and continuity of information security. ISO/IEC 42001 is concerned with risks arising from the development and use of AI, including unintended outcomes, bias, lack of transparency and effects on people who are subject to AI-assisted decisions. An AIMS will consider the security of AI systems, but it does not replace the breadth of information security controls expected under an ISMS.",
    },
    {
      type: "callout",
      title: "A point that is often misunderstood",
      text: "Holding certification to one standard does not imply conformity with the other. A customer who has asked for ISO/IEC 27001 is asking about information security across the scope of the ISMS, and an ISO/IEC 42001 certificate does not answer that question on its own. The reverse also applies.",
    },
    { type: "h2", text: "What customers tend to ask for" },
    {
      type: "p",
      text: "ISO/IEC 27001 has been in use for considerably longer, and many procurement and supplier assurance processes already refer to it by name. ISO/IEC 42001 was first published in 2023 [2], and recognition of it in procurement processes is still developing. In practice, AI companies selling to larger organisations frequently receive questionnaires that cover general information security in detail and AI governance in a smaller section, although this varies considerably by customer and sector.",
    },
    {
      type: "p",
      text: "Before committing to either standard, it is worth reviewing recent questionnaires, contract clauses and customer conversations to see what evidence has actually been requested. Where a customer has asked specifically for ISO/IEC 42001, that is a clear signal. Where they have asked general questions about AI use, a well-documented programme may be sufficient in the short term.",
    },
    { type: "h2", text: "Choosing a route" },
    {
      type: "p",
      text: "There are three common positions, and each leads to a different starting point.",
    },
    {
      type: "list",
      items: [
        "An organisation that already holds ISO/IEC 27001 certification can extend its existing management system to include an AIMS, reusing the shared processes and adding the AI-specific risk and impact assessment, policies and controls",
        "An organisation with neither standard can scope and design both together as an integrated management system, which avoids duplicated documentation, and then decide whether to seek certification to both at the same time or one after the other",
        "An organisation whose customers focus mainly on AI governance, and which has limited information security demands, may reasonably start with ISO/IEC 42001 and keep ISO/IEC 27001 under review",
      ],
    },
    {
      type: "p",
      text: "The timetable for each route depends on scope, the maturity of existing controls, how much operating evidence exists, and certification body availability. Scope deserves particular care. The AIMS scope should identify the AI systems and the roles the organisation plays in relation to them, for example as a developer, a provider or a user of AI supplied by others, and it should be consistent with the ISMS scope where both exist.",
    },
    { type: "h2", text: "Certification" },
    {
      type: "p",
      text: "ISO itself does not certify organisations; certificates are issued by independent certification bodies [3]. For ISO/IEC 42001, ISO/IEC 42006:2025 sets out additional requirements for bodies that audit and certify AI management systems, supplementing the general requirements that apply to management system certification bodies [4]. When choosing a certification body, check that it is accredited for the relevant standard by a recognised accreditation body, and whether it can audit both management systems together if an integrated approach is planned.",
    },
    {
      type: "p",
      text: "Support is available for organisations deciding how to scope and sequence an ISMS and an AIMS, and for preparing either for certification audit.",
    },
  ],
  sources: [
    {
      title: "ISO/IEC 27001:2022 Information security management systems: Requirements",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
    {
      title: "ISO/IEC 42001:2023 Information technology: Artificial intelligence: Management system",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/42001",
    },
    {
      title: "Certification",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/certification.html",
    },
    {
      title: "ISO/IEC 42006:2025 Requirements for bodies providing audit and certification of artificial intelligence management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/42006",
    },
  ],
  service: {
    label: "Explore AI governance & ISO 42001",
    href: "/services/iso-42001",
  },
  related: [
    "customer-asked-ai-governance",
    "iso-42001-vs-eu-ai-act",
    "iso-27001-security-questionnaire",
  ],
};

export default article;
