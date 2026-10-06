import type { Insight } from "../types";

const article: Insight = {
  slug: "iso-27001-uk-healthtech-nhs",
  title: "ISO 27001 for UK healthtech: the DSPT, DTAC and NHS procurement",
  seoTitle: "ISO 27001 for UK Healthtech: DSPT, DTAC and the NHS",
  standfirst:
    "The assurance frameworks a digital health supplier is likely to meet when selling to NHS organisations in England, what each one is for, and how an ISO/IEC 27001 management system relates to them.",
  description:
    "How the DSPT, DTAC, clinical safety standards and Cyber Essentials apply to digital health suppliers to the NHS in England, and where ISO/IEC 27001 fits.",
  summary:
    "Which assurance frameworks a digital health supplier is likely to meet when selling to NHS organisations in England.",
  category: "UK compliance",
  jurisdiction: "United Kingdom (England)",
  published: "2026-03-31",
  updated: "2026-09-25",
  readingTime: "5 min read",
  body: [
    {
      type: "p",
      text: "Digital health suppliers selling to NHS organisations in England are usually asked for several kinds of assurance at once. Some come from national requirements, some from procurement policy and some from the buying organisation's own information governance team. ISO/IEC 27001:2022 is often requested alongside them, but it is a voluntary standard and none of the frameworks below requires certification to it [8]. This article explains what each framework is for and how an Information Security Management System (ISMS) relates to it.",
    },
    {
      type: "h2",
      text: "The Data Security and Protection Toolkit",
    },
    {
      type: "p",
      text: "The Data Security and Protection Toolkit (DSPT) is an online self-assessment tool that allows organisations to measure their performance against the National Data Guardian's ten data security standards. All organisations that have access to NHS patient data and systems must use it to provide assurance that they practise good data security and handle personal information correctly [1]. The toolkit is published in annual versions, and the version for the 2026 to 2027 year was released in September 2026 [2].",
    },
    {
      type: "p",
      text: "The toolkit now takes different forms for different organisation types. NHS trusts, integrated care boards, commissioning support units and arm's length bodies complete a version aligned to the National Cyber Security Centre's Cyber Assessment Framework (CAF), with outcomes rated as achieved, partially achieved or not achieved [3]. Mandatory audit requirements have also been published for several organisation types, including some IT suppliers [2]. A supplier should confirm which version and which audit expectations apply to it before starting work.",
    },
    {
      type: "p",
      text: "An ISMS can supply a good deal of the evidence the DSPT asks for, such as policies, risk assessments, access reviews, training records and incident logs. The DSPT is still a separate submission with its own structure, and holding an ISO/IEC 27001 certificate does not complete it.",
    },
    {
      type: "h2",
      text: "The Digital Technology Assessment Criteria",
    },
    {
      type: "p",
      text: "The Digital Technology Assessment Criteria (DTAC) set a baseline that NHS and social care organisations use when assessing digital health technologies during procurement. The criteria cover clinical safety, data protection, technical assurance, interoperability, and usability and accessibility [4].",
    },
    {
      type: "p",
      text: "NHS England published a refreshed DTAC form and guidance in early 2026. The new form has around a quarter fewer questions, removes duplication with processes such as the DSPT, and focuses on software-based digital health technologies. The previous version was to be phased out by 6 April 2026 [5]. Suppliers holding a DTAC assessment completed on the older form should check whether their buyers expect it to be refreshed.",
    },
    {
      type: "p",
      text: "The technical security and data protection sections of DTAC draw on the same underlying controls an ISMS manages: access control, vulnerability management, testing, supplier management and data protection impact assessment. An ISMS makes those answers easier to evidence. It does not address the clinical safety, interoperability or usability sections.",
    },
    {
      type: "h2",
      text: "Clinical safety standards",
    },
    {
      type: "p",
      text: "DCB0129 and DCB0160 are information standards published under section 250 of the Health and Social Care Act 2012. DCB0129 sets clinical risk management requirements for manufacturers of health IT systems, and DCB0160 sets requirements for the health and care organisations that deploy and use them [6]. A supplier whose product could affect patient care will usually need a clinical safety officer, a clinical risk management process and a hazard log that meets DCB0129.",
    },
    {
      type: "p",
      text: "NHS England is reviewing both standards. A public consultation ran between June and September 2026, so suppliers should watch for revised versions [7]. Clinical safety sits outside the scope of ISO/IEC 27001, although a well-run ISMS can support it through document control, change management and incident handling.",
    },
    {
      type: "h2",
      text: "Cyber Essentials in NHS contracts",
    },
    {
      type: "p",
      text: "Procurement Policy Note (PPN) 014 applies to central government departments, their executive agencies and non-departmental public bodies, and NHS bodies. For contracts that involve handling personal information or providing certain information and communication technology (ICT) systems and services, it asks these organisations to require suppliers to hold Cyber Essentials or Cyber Essentials Plus, or to demonstrate equivalent controls, before contract award [9]. The note states that the scheme should not be applied to all contracts as a matter of course [9]. Whether a particular tender asks for Cyber Essentials or Cyber Essentials Plus is therefore set by the buyer.",
    },
    {
      type: "h2",
      text: "Where ISO 27001 fits",
    },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 specifies requirements for establishing, implementing, maintaining and continually improving an ISMS [8]. Certification is carried out by independent certification bodies for a defined scope. For a healthtech supplier, the value of an ISMS is that it gives a single, maintained source of evidence that several of the frameworks above draw on. The frameworks overlap unevenly:",
    },
    {
      type: "list",
      items: [
        "DSPT: substantial overlap on governance, risk, access, training and incident management, but a separate annual submission",
        "DTAC: overlap on technical security and data protection, none on clinical safety, interoperability or usability",
        "DCB0129: largely outside ISMS scope, supported by shared processes such as change control",
        "Cyber Essentials: overlap on the five technical control areas, but a separate certification with its own assessment",
      ],
    },
    {
      type: "p",
      text: "Many NHS buyers and larger private health providers also ask about ISO/IEC 27001 in their own supplier questionnaires. That is a buyer preference rather than a national requirement, and the weight it carries varies between organisations.",
    },
    {
      type: "h2",
      text: "Planning around a tender",
    },
    {
      type: "p",
      text: "Tender deadlines rarely allow an ISMS to be built from nothing. Where a tender arrives before the relevant assurance is in place, an accurate statement of the current position and the planned next steps is more useful to a buyer than a vague commitment. The time needed depends on the product's clinical risk, the maturity of existing controls, which DSPT version applies and the availability of assessors and auditors. Support is available for suppliers that want an independent view of how their controls map across these frameworks.",
    },
  ],
  sources: [
    {
      title: "Data Security and Protection Toolkit",
      publisher: "NHS England",
      url: "https://www.dsptoolkit.nhs.uk/",
    },
    {
      title: "Data Security and Protection Toolkit: News",
      publisher: "NHS England",
      url: "https://www.dsptoolkit.nhs.uk/News",
    },
    {
      title: "Update for NHS Trusts, CSUs, ALBs and ICBs",
      publisher: "NHS England, Data Security and Protection Toolkit",
      url: "https://www.dsptoolkit.nhs.uk/News/154",
    },
    {
      title: "Using the Digital Technology Assessment Criteria (DTAC)",
      publisher: "AI and Digital Regulations Service for health and social care",
      url: "https://digitalregulations.innovation.nhs.uk/regulations-and-guidance-for-developers/all-developers-guidance/using-the-digital-technology-assessment-criteria-dtac/",
    },
    {
      title: "Updated NHS England Digital Technology Assessment Criteria (DTAC) form and guidance",
      publisher: "NHS Innovation Service",
      url: "https://innovation.nhs.uk/news/updated-nhs-england-digital-technology-assessment-criteria-dtac-form-and-guidance/",
    },
    {
      title: "Clinical risk management standards",
      publisher: "NHS England Digital",
      url: "https://digital.nhs.uk/services/clinical-safety/clinical-risk-management-standards",
    },
    {
      title: "National review of clinical risk management standards DCB0129 and DCB0160: supporting information",
      publisher: "NHS England",
      url: "https://www.england.nhs.uk/long-read/national-review-of-clinical-risk-management-standardsdcb0129-and-dcb0160-supporting-information/",
    },
    {
      title: "ISO/IEC 27001:2022 Information security management systems: Requirements",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
    {
      title: "PPN 014: Cyber Essentials scheme",
      publisher: "GOV.UK",
      url: "https://www.gov.uk/government/publications/ppn-014-cyber-essentials-scheme",
    },
  ],
  service: {
    label: "Explore ISO 27001 readiness & implementation",
    href: "/services/iso-27001",
  },
  related: [
    "iso-27001-vs-cyber-essentials-plus",
    "iso-27001-security-questionnaire",
    "iso-27001-fast-track-what-changes",
  ],
};

export default article;
