import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-27001-legal-firms-sra",
  title: "ISO 27001 for law firms: SRA obligations, client scrutiny and information security",
  seoTitle: "ISO 27001 for Law Firms and SRA Obligations",
  standfirst:
    "What the Solicitors Regulation Authority requires of firms on confidentiality, systems and reporting, what it has said about cyber security, and how an ISO/IEC 27001 management system relates to those obligations.",
  description:
    "What the SRA Codes require on confidentiality, controls and reporting, what the SRA has found on law firm cyber security, and where ISO 27001 fits.",
  summary:
    "What the SRA requires of law firms on confidentiality and systems, and how an ISO 27001 management system relates.",
  category: "UK compliance",
  jurisdiction: "England and Wales",
  published: "2026-03-29",
  updated: "2026-09-25",
  readingTime: "5 min read",
  body: [
    {
      type: "p",
      text: "Law firms hold material that attackers value: client money in transit, confidential commercial information and personal data. The Solicitors Regulation Authority (SRA) does not require firms to hold any particular information security certification, including ISO/IEC 27001. It does set outcome-based obligations that bear directly on information security, and it has published findings and guidance on how firms manage cyber risk. This article sets out those obligations and how an Information Security Management System (ISMS) relates to them.",
    },
    {
      type: "h2",
      text: "What the SRA Codes require",
    },
    {
      type: "p",
      text: "The SRA Code of Conduct for Firms requires firms to have effective governance structures, arrangements, systems and controls that ensure compliance with the SRA's regulatory arrangements (paragraph 2.1), and to identify, monitor and manage all material risks to the business (paragraph 2.5) [1]. Both the Code for Firms and the Code of Conduct for Solicitors, RELs, RFLs and RSLs require the affairs of current and former clients to be kept confidential unless disclosure is required or permitted by law or the client consents (paragraph 6.3 in each) [1] [2].",
    },
    {
      type: "p",
      text: "Both Codes also require prompt reporting to the SRA of facts or matters reasonably believed to be capable of amounting to a serious breach of its regulatory arrangements (paragraph 3.9 of the Code for Firms and paragraph 7.7 of the Code for Solicitors) [1] [2]. The SRA's cybercrime guidance adds that firms must safeguard money and assets entrusted to them by clients and others, and it expects firms to understand the threats they face and respond to them, rather than prescribing particular technical measures [3].",
    },
    {
      type: "p",
      text: "Where a security incident involves personal data, the UK GDPR notification duty also applies. If a breach is likely to result in a risk to people's rights and freedoms, the firm must notify the Information Commissioner's Office (ICO) without undue delay and, where feasible, within 72 hours [4].",
    },
    {
      type: "h2",
      text: "What the SRA has found",
    },
    {
      type: "p",
      text: "The SRA's cyber security thematic review, published in September 2020, was based on visits to 40 firms. Most had been targeted by cyber attacks, with email modification fraud among the most common methods. The review also found gaps in staff training, in the use of two-factor authentication and laptop encryption, and in reporting incidents to the SRA and the ICO [5]. The review noted that firms with Cyber Essentials Plus were more likely to have good policies in place [5].",
    },
    {
      type: "p",
      text: "The SRA's Risk Outlook report on information security and cybercrime, published in June 2022, identified phishing and email modification fraud as accounting for over half of reported cybercrime, along with ransomware that steals data as well as encrypting it, and attacks on IT providers that spread to the firms using them [6]. Its recommendations included multi-factor authentication, reliable backups, staff training, checking third-party providers and a culture in which staff report incidents quickly [6].",
    },
    {
      type: "callout",
      title: "Guidance and obligation",
      text: "The Codes of Conduct are binding on regulated firms and individuals. Thematic reviews, Risk Outlook reports and guidance explain how the SRA sees risk and what it considers good practice. They are relevant to how the SRA assesses a firm, but they are not additional rules, and none of them requires ISO/IEC 27001.",
    },
    {
      type: "h2",
      text: "Where an ISMS supports these obligations",
    },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 specifies requirements for establishing, implementing, maintaining and continually improving an ISMS [7]. Certification is carried out by independent certification bodies for a defined scope. For a law firm, an ISMS offers a structured way to show the systems and controls that paragraphs 2.1 and 2.5 of the Code for Firms call for, and to keep them current. In practice, the areas that matter most tend to be:",
    },
    {
      type: "list",
      items: [
        "Access control on matter and document management systems, including information barriers between teams",
        "Verification of payment instructions and changes to bank details, which addresses the fraud type the SRA reports most often",
        "Multi-factor authentication, encryption of devices and management of removable media",
        "Supplier management for case management, cloud and IT support providers",
        "Incident response procedures that cover SRA reporting, ICO notification and client communication",
        "Staff training with records of who has completed it",
      ],
    },
    {
      type: "p",
      text: "Some firms are concerned that an external audit might compromise legal professional privilege or client confidentiality. A certification audit examines whether controls are designed and operating as described. Auditors review records such as access logs, risk assessments and training records, and firms can agree with their certification body how sampling is handled so that privileged content is not exposed.",
    },
    {
      type: "h2",
      text: "Cyber Essentials as a baseline",
    },
    {
      type: "p",
      text: "The SRA's cybercrime guidance refers firms to the National Cyber Security Centre (NCSC) and to Cyber Essentials [3]. Cyber Essentials is the government-backed scheme covering five technical controls: firewalls, secure configuration, security update management, user access control and malware protection. Cyber Essentials Plus adds hands-on technical testing by an assessor [8]. For smaller firms, Cyber Essentials can be a practical starting point. An ISMS covers wider ground, including governance, risk assessment, supplier management and continual improvement.",
    },
    {
      type: "h2",
      text: "Client expectations",
    },
    {
      type: "p",
      text: "Many clients, particularly in regulated sectors, run supplier security assessments on their external law firms, often using the same questionnaires they send to technology suppliers. The questions typically cover certifications held, handling of client data, access control, information barriers and incident notification. Practice varies widely between clients and panels. Some ask for ISO/IEC 27001 by name, some accept Cyber Essentials Plus or evidence of equivalent controls, and some assess answers case by case.",
    },
    {
      type: "p",
      text: "A useful starting point for a managing partner or head of risk is to collect the security questionnaires and contract clauses the firm has received from clients over the past year, and compare them with what the firm can currently evidence. That shows where the gaps are and whether a certified ISMS, Cyber Essentials, or improvements to existing controls would address them. Independent support is available for firms that want help with that assessment.",
    },
  ],
  sources: [
    {
      title: "SRA Code of Conduct for Firms",
      publisher: "Solicitors Regulation Authority",
      url: "https://www.sra.org.uk/solicitors/standards-regulations/code-conduct-firms/",
    },
    {
      title: "SRA Code of Conduct for Solicitors, RELs, RFLs and RSLs",
      publisher: "Solicitors Regulation Authority",
      url: "https://www.sra.org.uk/solicitors/standards-regulations/code-conduct-solicitors/",
    },
    {
      title: "The impact of cybercrime",
      publisher: "Solicitors Regulation Authority",
      url: "https://www.sra.org.uk/solicitors/resources/cybercrime/cybercrime/",
    },
    {
      title: "UK GDPR data breach reporting (DPA 2018)",
      publisher: "Information Commissioner's Office",
      url: "https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/",
    },
    {
      title: "Cyber Security: A thematic review",
      publisher: "Solicitors Regulation Authority",
      url: "https://www.sra.org.uk/sra/research-publications/cyber-security/",
    },
    {
      title: "Risk Outlook report: information security and cybercrime in a new normal",
      publisher: "Solicitors Regulation Authority",
      url: "https://www.sra.org.uk/sra/research-publications/risk-outlook-report-information-security-cybercrime/",
    },
    {
      title: "ISO/IEC 27001:2022 Information security management systems: Requirements",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
    {
      title: "Cyber Essentials overview",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/cyberessentials/overview",
    },
  ],
  service: {
    label: "Explore ISO 27001 readiness & implementation",
    href: "/services/iso-27001",
  },
  related: [
    "iso-27001-vs-cyber-essentials-plus",
    "iso-27001-security-questionnaire",
    "cyber-insurance-premium-increased",
  ],
};

export default article;
