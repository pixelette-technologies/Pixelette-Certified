import type { Insight } from "../types";

const article: Insight = {
  slug: "gcc-cyber-regulation-saudi-arabia-qatar",
  title: "Cyber security and data protection regulation in Saudi Arabia and Qatar: an overview",
  seoTitle: "Cyber and Data Protection Rules in Saudi Arabia and Qatar",
  standfirst:
    "Saudi Arabia and Qatar each have national cyber security frameworks, sector rules for financial institutions and a personal data protection law. This overview sets out the main instruments, who issues them and how their applicability depends on the type of organisation.",
  description:
    "An overview of the main cyber security and data protection frameworks in Saudi Arabia and Qatar, who issues them, and which organisations they apply to.",
  category: "GCC regulation",
  jurisdiction: "Saudi Arabia and Qatar",
  published: "2026-09-25",
  readingTime: "5 min read",
  body: [
    {
      type: "p",
      text: "Organisations expanding into the Gulf, or supplying services to government bodies, banks and critical infrastructure operators there, often meet national cyber security and data protection requirements that differ from the UK, EU and US frameworks they already know. In both Saudi Arabia and Qatar, the requirements that apply depend heavily on the type of entity: government bodies, operators of critical infrastructure, regulated financial institutions and other private organisations are treated differently.",
    },
    {
      type: "p",
      text: "This article summarises the principal instruments as published by the regulators, as at September 2026. It is a general overview rather than legal advice, and regulators update these documents, so the current version should always be checked at source.",
    },
    { type: "h2", text: "Saudi Arabia: cyber security controls" },
    {
      type: "p",
      text: "The National Cybersecurity Authority (NCA) is the national cyber security reference in the Kingdom and publishes the Essential Cybersecurity Controls (ECC) [1]. The current version, ECC-2:2024, replaced ECC-1:2018 and is organised into four main domains: cybersecurity governance, cybersecurity defence, cybersecurity resilience, and third-party and cloud computing cybersecurity [1].",
    },
    {
      type: "p",
      text: "According to its scope statement, the ECC applies to government agencies in the Kingdom and their affiliated companies and entities, inside and outside the Kingdom, and to private sector entities owning, operating or hosting Critical National Infrastructure [1]. Other organisations are encouraged, but not required, to use the controls as good practice [1]. Within scope, applicability varies by control; for example, the cloud computing and hosting controls apply to entities using or planning to use such services. The NCA assesses compliance through means such as self-assessment, compliance reporting and field audit visits [1].",
    },
    {
      type: "p",
      text: "Financial institutions have a separate sector framework. The Saudi Central Bank (SAMA) issued its Cyber Security Framework in May 2017, and it applies to banks, insurance and reinsurance companies, financing companies and credit bureaus operating in Saudi Arabia, and to the financial market infrastructure [2]. It uses a maturity model with levels from zero to five, and SAMA states that member organisations should operate at maturity level 3 or higher [2].",
    },
    { type: "h2", text: "Saudi Arabia: personal data protection" },
    {
      type: "p",
      text: "The Personal Data Protection Law (PDPL) was issued by Royal Decree No. (M/19) dated 9/2/1443H and amended by Royal Decree No. (M/148) dated 5/9/1444H [3]. It came into force in September 2023, with a one-year period before penalties were applied [5]. The Saudi Data and Artificial Intelligence Authority (SDAIA) publishes the Law, its Implementing Regulation and the Regulation on Personal Data Transfer outside the Kingdom [4].",
    },
    {
      type: "p",
      text: "The PDPL applies to processing of personal data relating to individuals that takes place in the Kingdom, and also to processing of personal data relating to individuals residing in the Kingdom by any party outside it [3]. This means that organisations with no Saudi establishment can still be within scope. The Law leaves the identity of the competent authority to a resolution of the Council of Ministers, and it preserves the powers of the Saudi Central Bank in its own sector [3]. Organisations should confirm the current supervisory arrangements for their sector.",
    },
    { type: "h2", text: "Qatar: cyber security and information assurance" },
    {
      type: "p",
      text: "The National Cyber Security Agency (NCSA) was established by Amiri Decree No. (1) of 2021 [6]. Its National Cyber Governance and Assurance Affairs function issues certificates of compliance with national information security standards and policies, and certificates for technology and information security service providers [6]. The National Information Security Compliance Framework (NISCF) complements Qatar's National Information Assurance Framework, and the NCSA accredits service providers to deliver the audits that some NISCF services require [6]. The NCSA also publishes the National Information Assurance Standard, which sets out national security requirements.",
    },
    {
      type: "p",
      text: "Whether an organisation must comply with the national standard, or obtain an NCSA certificate, depends on its status and on requirements set by its sector regulator or by the government bodies it works with. Organisations should confirm this with the relevant authority rather than assume it applies, or does not.",
    },
    {
      type: "p",
      text: "Financial institutions are subject to rules from Qatar Central Bank (QCB). QCB publishes a set of information security regulations, including a Technology Risks Regulation for banks, an Insurance Sector Cyber Security Regulation, an Information and Cyber Security Regulation for Payment Service Providers, Technology Risk Instructions for Financial Services Operators, a Cloud Computing Regulation and a Data Handling and Protection Regulation [7]. The Data Handling and Protection Regulation applies to all financial institutions supervised by QCB, subject to exemptions set out in the regulation, and requires institutions to report data breaches to QCB and to other authorised agencies, including the NCSA [8].",
    },
    { type: "h2", text: "Qatar: personal data privacy" },
    {
      type: "p",
      text: "Law No. (13) of 2016 on Personal Data Privacy Protection (PDPPL) is Qatar's general data protection law. Under Amiri Decree No. (1) of 2021, the National Cyber Governance and Assurance Affairs within the NCSA is the competent department for administering and enforcing it, and it publishes guidelines for regulated entities on topics such as personal data breach notification [9]. QCB's own regulation also requires financial institutions to process personal data in line with the PDPPL [8].",
    },
    {
      type: "callout",
      title: "National and sector requirements can overlap",
      text: "In both countries, a regulated financial institution may be subject to a sector regulator's cyber rules as well as national frameworks and the general data protection law. When scoping a programme, identify every authority with jurisdiction over the entity before selecting controls.",
    },
    { type: "h2", text: "A note on the United Arab Emirates" },
    {
      type: "p",
      text: "The UAE has a comparable structure. The UAE Information Assurance Regulation, version 1.1 of March 2020, obliges UAE government entities and other entities identified as critical to implement its controls, and recommends voluntary adoption by other entities [10]. Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data came into force on 2 January 2022, and the UAE Data Office acts as the federal data regulator [11]. Some free zones, such as the Dubai International Financial Centre, have their own data protection law [11].",
    },
    { type: "h2", text: "Working out what applies" },
    {
      type: "list",
      ordered: true,
      items: [
        "Establish the legal status of each entity involved, including whether it is a government body, a government-affiliated company, a Critical National Infrastructure operator or a regulated financial institution",
        "Identify the regulators with jurisdiction, including any free zone authority",
        "Determine whether personal data of individuals in each country is processed, and where the processing takes place",
        "Obtain the current version of each applicable framework from the regulator and record the version used",
        "Map existing controls, such as an ISO/IEC 27001 Information Security Management System (ISMS), against each framework to identify gaps, noting that national frameworks carry specific requirements an international certification may not address",
      ],
    },
    {
      type: "p",
      text: "Advisory support is available for organisations assessing which Gulf frameworks apply to them and planning the work to meet them.",
    },
  ],
  sources: [
    {
      title: "Essential Cybersecurity Controls (ECC-2:2024)",
      publisher: "National Cybersecurity Authority, Kingdom of Saudi Arabia",
      url: "https://nca.gov.sa/en/regulatory-documents/controls-list/ecc/",
    },
    {
      title: "Cyber Security Framework",
      publisher: "Saudi Central Bank (SAMA) Rulebook",
      url: "https://rulebook.sama.gov.sa/en/cyber-security-framework-2",
    },
    {
      title: "Personal Data Protection Law",
      publisher: "Saudi Data and Artificial Intelligence Authority",
      url: "https://sdaia.gov.sa/en/SDAIA/about/Documents/Personal%20Data%20English%20V2-23April2023-%20Reviewed-.pdf",
    },
    {
      title: "Implementing Regulation of the Personal Data Protection Law and Regulation on Personal Data Transfer outside the Kingdom",
      publisher: "Saudi Data and Artificial Intelligence Authority",
      url: "https://sdaia.gov.sa/en/SDAIA/about/Documents/ImplementingRegulation.pdf",
    },
    {
      title: "Guide to the Saudi Personal Data Protection Law",
      publisher: "Saudi Data and Artificial Intelligence Authority, Data Governance Platform",
      url: "https://dgp.sdaia.gov.sa/wps/wcm/connect/f579bc32-fda8-47bd-bc6f-66b8cb77985c/ENG-Guide+to+the+saudi+PDP+law+for+controllersprocessors.pdf?MOD=AJPERES",
    },
    {
      title: "National Information Security Compliance Framework (NISCF): Audit Standard, V3.0",
      publisher: "National Cyber Security Agency, State of Qatar",
      url: "https://ncsa.gov.qa/shared/document_library/94787172324409/33000/3112/1.0~186d0c0d-a04c-426d-9a9a-0b36f8c2fad3?mimetype=application%2Fpdf&filename=C05.pdf",
    },
    {
      title: "Information Security regulations",
      publisher: "Qatar Central Bank",
      url: "https://www.qcb.gov.qa/en/Pages/Information-Security.aspx",
    },
    {
      title: "Data Handling and Protection Regulation",
      publisher: "Qatar Central Bank",
      url: "https://www.qcb.gov.qa/Documents/InformationSecurity/Data%20Handling%20and%20Protection%20Regulation.pdf",
    },
    {
      title: "Personal Data Breach Notifications: Guideline for Regulated Entities",
      publisher: "National Cyber Security Agency, State of Qatar",
      url: "https://ncsa.gov.qa/shared/document_library/94787172324409/33000/8870/1.0~740b1248-e3a9-40e1-b66e-589091cc182a?mimetype=application%2Fpdf&filename=Personal+Data+Breach+Notifications+-+Guideline+for+Regulated+Entities+%284%29.pdf",
    },
    {
      title: "UAE Information Assurance Regulation, Version 1.1",
      publisher: "Telecommunications and Digital Government Regulatory Authority, UAE",
      url: "https://tdra.gov.ae/-/media/About/regulations-and-ruling/EN/UAE-Information-Assurance-Regulation-v1-1-pdf.ashx",
    },
    {
      title: "Data protection laws",
      publisher: "The Official Portal of the UAE Government",
      url: "https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws",
    },
  ],
  service: {
    label: "Explore GCC cyber & regulatory compliance",
    href: "/services/gcc-regulatory-compliance",
  },
  related: [
    "iso-27001-security-questionnaire",
    "enterprise-security-questionnaire-without-iso-27001",
    "compliance-automation-platforms-and-consultancy",
  ],
};

export default article;
