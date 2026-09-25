import type { Insight } from "../types";

const article: Insight = {
  slug: "enterprise-security-questionnaire-without-iso-27001",
  title: "Answering an enterprise security questionnaire without ISO 27001",
  seoTitle: "Security Questionnaires Without ISO 27001",
  standfirst:
    "How to give a complete, accurate and well-evidenced response to a supplier security questionnaire when your organisation does not hold ISO/IEC 27001 certification.",
  description:
    "How to answer an enterprise security questionnaire without ISO 27001: what buyers assess, which evidence helps, and phrasing that weakens a response.",
  category: "Cyber and GRC",
  jurisdiction: "International",
  published: "2026-04-02",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "Enterprise buyers frequently send suppliers a security questionnaire before contract. Some ask directly for ISO/IEC 27001 certification. Many more ask detailed questions about how security is managed, and those questions can be answered well whether or not a certificate is held. A careful, consistent and evidenced response will not satisfy every buyer, particularly those with a firm certification requirement, but it often keeps the conversation open where the buyer has discretion.",
    },
    {
      type: "h2",
      text: "What the buyer is trying to establish",
    },
    {
      type: "p",
      text: "Security questionnaires test specific controls, but reviewers also form a view of the supplier's maturity from the response as a whole. Consistency between answers, evidence that someone with security knowledge has read the questions, and documentation that supports what is claimed all shape that view. The UK National Cyber Security Centre (NCSC) describes supplier assurance questions as a way for customers to gain confidence in a supplier's security, covering areas such as governance, incident management, network and data protection, personnel security and independent testing [1].",
    },
    {
      type: "p",
      text: "Where personal data is involved, UK buyers have a legal reason to ask. Article 32 of the UK GDPR requires controllers and processors to implement appropriate technical and organisational measures, taking account of risk [4]. The Information Commissioner's Office (ICO) expects controllers to use processors that can demonstrate appropriate security and to put that into contract [3].",
    },
    {
      type: "h2",
      text: "Questions you can answer on their merits",
    },
    {
      type: "p",
      text: "A large part of a typical questionnaire concerns matters of fact that do not depend on certification status. Answering these fully and specifically builds credibility for the harder questions. They commonly include:",
    },
    {
      type: "list",
      items: [
        "Company information: legal entity, ownership and, in the UK, registration with the ICO where applicable.",
        "Data handling: what personal data you process, where it is stored, how long it is kept and who has access.",
        "Access control: multi-factor authentication, role-based access, joiner and leaver processes and privileged access management.",
        "Encryption: at rest and in transit, naming the services and methods used.",
        "Incident response: a written plan, the date it was last tested and the person responsible for co-ordinating a response.",
        "Business continuity: recovery objectives, backup arrangements and how often recovery is tested.",
        "Sub-processors: names, locations, purposes and the categories of data shared with each.",
      ],
    },
    {
      type: "h2",
      text: "Where the absence of certification shows",
    },
    {
      type: "p",
      text: "Some questions assume an ISO/IEC 27001 Information Security Management System (ISMS) exists: a request for a certificate, a Statement of Applicability or the latest internal audit report. The accurate answer to the certification question is that you do not hold it. You can then set out what does exist, such as a risk register, a control matrix showing how you address the relevant areas, and recent independent test results.",
    },
    {
      type: "p",
      text: "Other recognised frameworks and schemes can help, provided they are described accurately. Cyber Essentials and Cyber Essentials Plus are UK certification schemes covering five technical controls [5]. A SOC 2 report is an attestation report issued by a licensed CPA firm following an examination of controls, and is more commonly requested by US buyers [6]. The NIST Cybersecurity Framework (CSF) 2.0, released in February 2024, is voluntary guidance describing cyber security outcomes, which some organisations use to structure and explain their security programme [7]. None of these is equivalent to ISO/IEC 27001 certification, which is issued by an independent certification body against a defined ISMS scope [8].",
    },
    {
      type: "callout",
      title: "Describing work in progress",
      text: "If you have begun implementing an ISMS, say what has been done and what remains, and offer supporting documents under a non-disclosure agreement. Avoid giving a certification date you do not control. The certification body schedules the audit and makes the certification decision.",
    },
    {
      type: "h2",
      text: "Phrasing that weakens a response",
    },
    {
      type: "list",
      items: [
        "\"We follow industry best practice.\" Name the framework or describe the control instead.",
        "\"N/A\" against questions on encryption, multi-factor authentication, logging or incident response. These almost always apply in some form.",
        "\"This is handled by our cloud provider.\" Under shared responsibility models, the buyer is asking about the controls you operate, not only those of your provider.",
        "Marking large sections \"confidential\" without offering an alternative route, such as a call or disclosure under a non-disclosure agreement.",
        "\"In progress\" without saying what has been done and what remains.",
      ],
    },
    {
      type: "h2",
      text: "Building a reusable evidence pack",
    },
    {
      type: "p",
      text: "Questionnaires arrive as spreadsheets, portal forms or requests for a written response. Whatever the format, maintaining a core set of documents makes each response quicker and more consistent. A useful pack usually contains a short summary of your security arrangements, an architecture diagram, a data flow diagram, a sub-processor list, a penetration test summary with remediation status, the incident response plan and contact details for the person responsible for security. The NCSC's supply chain guidance encourages customers to treat supplier assurance as ongoing, so keeping these documents current is worthwhile [2].",
    },
    {
      type: "p",
      text: "If questionnaires are becoming frequent and each one draws heavily on senior staff, that pattern is useful evidence for a decision about certification. It is worth recording how often buyers ask for ISO/IEC 27001 specifically, whether it is a mandatory criterion, and how much time each response takes. Those facts, rather than any single request, are the sound basis for deciding whether an ISMS and certification would be proportionate for your organisation.",
    },
    {
      type: "p",
      text: "Support is available for preparing questionnaire evidence and for assessing readiness against ISO/IEC 27001:2022.",
    },
  ],
  sources: [
    {
      title: "Supplier assurance questions",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/guidance/supplier-assurance-questions",
    },
    {
      title: "Supply chain security guidance",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/collection/supply-chain-security",
    },
    {
      title: "A guide to data security",
      publisher: "Information Commissioner's Office",
      url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/a-guide-to-data-security/",
    },
    {
      title: "UK GDPR Article 32: Security of processing",
      publisher: "legislation.gov.uk",
      url: "https://www.legislation.gov.uk/eur/2016/679/article/32",
    },
    {
      title: "Cyber Essentials overview",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/cyberessentials/overview",
    },
    {
      title: "SOC 2: SOC for Service Organizations",
      publisher: "AICPA & CIMA",
      url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2",
    },
    {
      title: "Cybersecurity Framework",
      publisher: "National Institute of Standards and Technology",
      url: "https://www.nist.gov/cyberframework",
    },
    {
      title: "ISO/IEC 27001:2022 Information security management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
  ],
  service: {
    label: "Explore ISO 27001 readiness & implementation",
    href: "/services/iso-27001",
  },
  related: [
    "iso-27001-security-questionnaire",
    "iso-27001-or-soc-2-uk-saas",
    "iso-27001-vs-cyber-essentials-plus",
  ],
};

export default article;
