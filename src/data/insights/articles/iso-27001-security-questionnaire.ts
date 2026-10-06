import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-27001-security-questionnaire",
  title: "A customer has asked for ISO 27001 in a security questionnaire: how to respond",
  seoTitle: "Responding to an ISO 27001 Questionnaire Request",
  standfirst:
    "What a buyer is usually asking when a questionnaire mentions ISO/IEC 27001, how to describe your position accurately, and what evidence you can offer if you do not hold a certificate.",
  description:
    "How to respond when a supplier security questionnaire asks for ISO/IEC 27001: answering accurately, offering evidence, and deciding whether to certify.",
  summary:
    "What a questionnaire is usually asking when it mentions ISO 27001, and how to describe your position accurately.",
  category: "Cyber and GRC",
  jurisdiction: "International",
  published: "2026-04-07",
  updated: "2026-09-25",
  readingTime: "5 min read",
  body: [
    {
      type: "p",
      text: "Supplier security questionnaires often include a direct question about ISO/IEC 27001, the international standard that sets out requirements for an Information Security Management System (ISMS). The current edition is ISO/IEC 27001:2022 [1]. For a supplier without a certificate, the question can feel decisive. In practice, how you answer it, and what you offer alongside the answer, usually matters as much as the answer itself.",
    },
    {
      type: "h2",
      text: "What the question is asking",
    },
    {
      type: "p",
      text: "A buyer asking about ISO/IEC 27001 is normally trying to establish whether your organisation manages information security in a systematic way: whether risks are identified and treated, whether controls are chosen for a reason, and whether someone is accountable for keeping the system working. Certification is one way of evidencing that. ISO itself does not certify organisations. Certificates are issued by independent certification bodies, and in many countries those bodies are accredited by a national accreditation body [2].",
    },
    {
      type: "p",
      text: "Guidance from the UK National Cyber Security Centre (NCSC) encourages customers to gain confidence in a supplier's security through questions covering governance, incident management, data protection, personnel security and independent testing, among other areas [4]. The NCSC's wider supply chain guidance frames this as an ongoing relationship rather than a single checkpoint [5]. A questionnaire is therefore often the start of a conversation, even where the procurement team has a firm policy on certification.",
    },
    {
      type: "h2",
      text: "Answer accurately",
    },
    {
      type: "p",
      text: "The most damaging response is an inaccurate one. Phrases such as \"ISO 27001 in progress\" or \"aligned with ISO 27001\" are vague, invite follow-up questions and may later be relied on in a contract. Accredited certificates can be checked by buyers through IAF CertSearch, a database of certifications issued by certification bodies accredited under the International Accreditation Forum arrangements [3]. A claim that cannot be verified tends to reduce trust rather than build it.",
    },
    {
      type: "p",
      text: "A precise answer states your current position and, where relevant, what is under way. Depending on your circumstances, that might be one of the following:",
    },
    {
      type: "list",
      items: [
        "We do not hold ISO/IEC 27001 certification. Our information security controls are documented and we can provide evidence under a non-disclosure agreement.",
        "We do not currently hold certification. We have begun implementing an ISMS against ISO/IEC 27001:2022 and can share our scope, risk assessment approach and progress.",
        "We do not currently hold certification. We have engaged a certification body and can share the planned audit arrangements once confirmed.",
      ],
    },
    {
      type: "callout",
      title: "Certification, readiness and alignment",
      text: "Certification means an accredited certification body has audited your ISMS and issued a certificate for a defined scope. Readiness means you are preparing for that audit. Alignment is an informal description with no agreed meaning. Buyers generally treat these very differently, so the words you choose should match your actual position.",
    },
    {
      type: "h2",
      text: "Evidence you can offer without a certificate",
    },
    {
      type: "p",
      text: "Many questions in a supplier questionnaire can be answered on their merits regardless of certification status. Access control, encryption, backup, incident response and personnel security are all matters of fact about how you operate. Where you process personal data on behalf of a UK customer, the Information Commissioner's Office (ICO) expects controllers to choose processors that can demonstrate appropriate security, which gives the buyer a legitimate reason to ask detailed questions [6].",
    },
    {
      type: "p",
      text: "Evidence that buyers commonly accept, subject to their own policies, includes:",
    },
    {
      type: "list",
      items: [
        "Current information security policies, with owners and review dates.",
        "A risk register and a record of how significant risks are being treated.",
        "A recent independent penetration test summary and evidence of remediation.",
        "An incident response plan and the date it was last exercised.",
        "A sub-processor list showing locations and the categories of data shared.",
        "Cyber Essentials or Cyber Essentials Plus certification, for UK buyers who recognise the scheme [7].",
      ],
    },
    {
      type: "p",
      text: "Cyber Essentials is a UK government-backed scheme covering five technical controls, and the NCSC's supply chain guidance points to it as a way of gaining assurance that suppliers have fundamental controls in place [5] [7]. It is narrower than ISO/IEC 27001 and does not substitute for it where a buyer specifically requires an ISMS certificate, but it can support a response while other work is in progress.",
    },
    {
      type: "h2",
      text: "Deciding whether to pursue certification",
    },
    {
      type: "p",
      text: "A single questionnaire is rarely a sufficient reason on its own to begin an ISO/IEC 27001 programme. The decision is better made against the pattern of demand. Relevant questions include how many current and prospective customers ask for certification, whether it is a mandatory procurement criterion or a preference, how much senior time each questionnaire currently consumes, and whether the scope a customer cares about can be defined sensibly as an ISMS scope.",
    },
    {
      type: "p",
      text: "Where buyers do not require certification, its absence often leads to a longer security review instead, with requests for architecture and data flow diagrams, continuity arrangements and test reports. That review can be manageable if the underlying evidence exists. Organisations that sell mainly to consumers or to small businesses without formal procurement may reasonably decide that certification is not yet warranted, and revisit the question as their customer base changes.",
    },
    {
      type: "h2",
      text: "What to tell the customer about timing",
    },
    {
      type: "p",
      text: "If you decide to pursue certification, avoid committing to an audit date or certificate date that depends on others. The certification body sets its own audit schedule and makes the certification decision independently [2]. How long preparation takes depends on your starting position, the scope you choose and how long your controls need to operate before they can be evidenced. It is more credible to share the steps you have taken, the scope you are working to and the evidence available now, and to update the customer as dates are confirmed.",
    },
    {
      type: "p",
      text: "Support is available for organisations assessing their readiness against ISO/IEC 27001:2022 and preparing evidence for customer questionnaires.",
    },
  ],
  sources: [
    {
      title: "ISO/IEC 27001:2022 Information security management systems",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
    {
      title: "Certification",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/certification.html",
    },
    {
      title: "IAF CertSearch",
      publisher: "International Accreditation Forum",
      url: "https://www.iafcertsearch.org/",
    },
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
    "enterprise-security-questionnaire-without-iso-27001",
    "iso-27001-fast-track-what-changes",
    "iso-27001-vs-cyber-essentials-plus",
  ],
};

export default article;
