import {
  Shield, Brain, ShieldCheck, Radar, FileSearch, UserCheck, LifeBuoy, Landmark, Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MarketSlug } from "@/data/markets";

/**
 * The service catalogue, per the strategic rebuild specification of
 * 25 September 2026 (§8, §14 to §23).
 *
 * Eight core services form the Services menu. Cyber Essentials is routed but
 * sits inside the UK and cyber assurance architecture rather than the menu.
 * Everything else the business can support is a specialist capability listed
 * on the services hub, without a page of its own.
 *
 * Withdrawn pages are not kept here as "retired" entries any more. Their URLs
 * are redirected in next.config.ts, and `relatedSlugs` is typed against
 * ServiceSlug, so a reference to a service that no longer exists is a build
 * error rather than a card that silently disappears.
 *
 * There is deliberately no pricing, no package, no duration and no document
 * count anywhere in this file (§6, §15).
 */

export type ServiceSlug =
  | "iso-27001"
  | "iso-42001"
  | "soc-2"
  | "cyber-assurance"
  | "privacy"
  | "vciso"
  | "iso-22301"
  | "gcc-regulatory-compliance"
  | "cyber-essentials";

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  title: string;
  text: string;
}

export interface ServiceGroup {
  label: string;
  points: string[];
  note?: string;
}

export interface Service {
  slug: ServiceSlug;
  /** core: one of the eight Services menu items. supporting: routed, not in the menu. */
  tier: "core" | "supporting";
  icon: LucideIcon;
  /** Label in the Services menu and on cards. */
  navLabel: string;
  /** The page H1. */
  title: string;
  /** Breadcrumb and short references. */
  shortTitle: string;
  /** One sentence, used on cards. */
  summary: string;
  /** The business outcome, stated first (§3 writing principle). */
  opening: string;
  overview: string[];
  coverage: { heading: string; intro?: string; items: ServiceItem[] };
  /** Optional grouped detail, e.g. by jurisdiction. */
  groups?: { heading: string; intro?: string; items: ServiceGroup[] };
  approach: ServiceItem[];
  /** Who decides what. Rendered on every service page (§36). */
  independence: string;
  relatedRequirements?: {
    heading: string;
    intro?: string;
    items: (ServiceItem & { href?: string })[];
  };
  faqs: FAQ[];
  relatedSlugs: ServiceSlug[];
  markets: MarketSlug[];
  /** Discreet availability line on the service page. */
  availability: string;
  /**
   * ISO country codes when the service is limited to those places.
   * Omit when the service is not restricted to a closed set of countries.
   */
  areaServed?: string[];
  seo: { title: string; description: string };
}

export { ENGAGEMENT_TERMS } from "@/lib/constants";

export const services: Service[] = [
  {
    slug: "iso-27001",
    tier: "core",
    icon: Shield,
    navLabel: "ISO 27001 & information security",
    title: "ISO 27001 readiness & implementation",
    shortTitle: "ISO 27001",
    summary:
      "Build an information security management system that is ready for independent ISO 27001 certification.",
    opening:
      "Build an information security management system that is ready for independent ISO 27001 certification, and that your customers and auditors can see operating in practice.",
    overview: [
      "ISO/IEC 27001:2022 sets out the requirements for an Information Security Management System (ISMS): the governance, risk management and controls an organisation uses to protect the information it holds. Customers often ask for it during procurement, particularly where a supplier will handle their data or connect to their systems.",
      "Certification is awarded by an independent certification body following a two-stage audit. Our work is to prepare the organisation for that audit: agreeing a sensible scope, building the management system, implementing proportionate controls and producing evidence that shows the system is working.",
    ],
    coverage: {
      heading: "What the work covers",
      items: [
        { title: "Scope", text: "Agreeing which parts of the organisation, locations, systems and services the ISMS will cover, and recording the boundaries clearly." },
        { title: "Gap assessment", text: "Reviewing current practice against the clauses of the standard and the Annex A controls to establish where work is needed." },
        { title: "Risk assessment and treatment", text: "Establishing a risk methodology, identifying information security risks and deciding how each will be treated." },
        { title: "Statement of Applicability", text: "Recording which Annex A controls apply, why, and how they are implemented, with justified exclusions." },
        { title: "Policies and controls", text: "Developing the policies, procedures and technical and organisational controls the risk assessment calls for, sized to the organisation." },
        { title: "Evidence", text: "Establishing records that show controls are operating, so an auditor can test practice rather than documents alone." },
        { title: "Awareness", text: "Helping staff understand their responsibilities under the ISMS through proportionate awareness activity." },
        { title: "Internal audit", text: "Planning and conducting an internal audit so that nonconformities are identified and addressed before the certification audit." },
        { title: "Management review and corrective action", text: "Supporting leadership through management review, and establishing a corrective action process that the auditor will expect to see used." },
        { title: "Certification body preparation", text: "Helping you select and engage an accredited certification body, preparing for Stage 1 and Stage 2, and supporting any findings through to closure." },
      ],
    },
    approach: [
      { title: "Understand the requirement", text: "Confirm why certification is being sought, who has asked for it, and what scope will satisfy that requirement." },
      { title: "Assess and plan", text: "Complete the gap assessment and agree an implementation plan that reflects your starting position." },
      { title: "Implement and evidence", text: "Build the ISMS, implement controls and establish the operating records the audit will examine." },
      { title: "Prepare for certification", text: "Complete the internal audit and management review, then support you through the certification body's audit." },
    ],
    independence:
      "Certification is awarded by an independent certification body following successful assessment. Pixelette Certified provides readiness, implementation and certification support.",
    relatedRequirements: {
      heading: "Related assurance requirements",
      intro:
        "An ISMS often provides the foundation for other assurance requirements. Where more than one applies, planning them together avoids duplicated effort.",
      items: [
        { title: "SOC 2", text: "Many ISO 27001 controls support the SOC 2 Trust Services Criteria. US customers may ask for a SOC 2 report in addition to, or instead of, a certificate.", href: "/services/soc-2" },
        { title: "ISO 42001", text: "An AI management system follows the same management system structure and can share governance, risk and audit processes with the ISMS.", href: "/services/iso-42001" },
        { title: "ISO 27701", text: "ISO/IEC 27701 adds privacy information management to an existing ISMS for organisations that need to demonstrate privacy governance.", href: "/services/privacy" },
        { title: "Cyber Essentials", text: "For UK organisations, Cyber Essentials covers a narrower set of technical controls and is sometimes required alongside ISO 27001 in public sector supply chains.", href: "/services/cyber-essentials" },
      ],
    },
    faqs: [
      { question: "How long does ISO 27001 take?", answer: "It depends on the scope, your existing controls, how quickly evidence of operation can be built up and the certification body's availability. We set out a realistic plan once we understand your starting position, rather than quoting a standard timescale." },
      { question: "Do you issue the ISO 27001 certificate?", answer: "No. Certificates are issued by independent certification bodies, which should be accredited by a recognised accreditation body such as UKAS in the United Kingdom. We prepare you for their audit and support you through it." },
      { question: "Do we need ISO 27001 or Cyber Essentials?", answer: "They meet different needs. Cyber Essentials is a UK scheme covering a defined set of technical controls. ISO 27001 is an international management system standard covering governance, risk and a much broader set of controls. The right answer depends on what your customers or contracts require." },
      { question: "Do we need a technical team to achieve ISO 27001?", answer: "ISO 27001 is a management system standard, so leadership involvement and clear ownership matter as much as technical skill. Technical controls still need to be implemented, and we work with your team or suppliers to do that." },
    ],
    relatedSlugs: ["soc-2", "iso-42001", "vciso"],
    markets: ["uk", "us", "gcc", "international"],
    availability: "Available internationally",
    seo: {
      title: "ISO 27001 Readiness & Implementation",
      description:
        "ISO 27001 readiness and implementation: scope, risk assessment, ISMS, Statement of Applicability, internal audit and support through independent certification.",
    },
  },
  {
    slug: "iso-42001",
    tier: "core",
    icon: Brain,
    navLabel: "AI governance & ISO 42001",
    title: "AI governance & ISO 42001",
    shortTitle: "AI governance",
    summary:
      "Establish accountable governance for the AI your organisation builds, buys and uses, with ISO 42001 readiness where certification is sought.",
    opening:
      "Govern the AI your organisation builds, buys and uses with the same discipline you apply to security and privacy, and be able to show customers and regulators how it is done.",
    overview: [
      "Customers, boards and regulators increasingly ask how organisations identify AI risk, who is accountable for it, and how systems are monitored once they are in use. A credible answer needs structure: an inventory of AI systems, clear roles, a way of assessing risk and impact, and evidence that controls are applied.",
      "ISO/IEC 42001:2023 specifies requirements for an Artificial Intelligence Management System (AIMS) and is one recognised route to demonstrating that structure. It is not the only one. Depending on your market, the NIST AI Risk Management Framework or specific regulatory obligations may be more relevant, and many organisations need a governance framework before they consider certification.",
    ],
    coverage: {
      heading: "What the work covers",
      items: [
        { title: "Governance structure", text: "Establishing where AI decisions are made, how they are escalated and how oversight is reported to leadership." },
        { title: "Roles and accountability", text: "Assigning ownership for AI systems, risk decisions and monitoring, including where responsibilities sit with suppliers." },
        { title: "AI inventory", text: "Recording the AI systems the organisation develops, deploys or relies on, and their purpose, data and users." },
        { title: "Risk and impact assessment", text: "Assessing risks to the organisation and impacts on individuals and groups, and deciding how each will be treated." },
        { title: "Lifecycle governance", text: "Setting controls for design, data, testing, deployment, change and retirement of AI systems." },
        { title: "Third-party AI", text: "Assessing AI provided by suppliers or embedded in products you buy, and setting proportionate contractual and operational controls." },
        { title: "Privacy", text: "Aligning AI governance with data protection obligations, including impact assessments where personal data is involved." },
        { title: "Monitoring", text: "Defining how performance, incidents and changes in risk are monitored once systems are in use." },
        { title: "Policies and evidence", text: "Developing the policies and records that show governance is operating in practice." },
        { title: "ISO 42001 readiness", text: "Where certification is sought, preparing the AIMS for audit by an independent certification body." },
      ],
    },
    groups: {
      heading: "Frameworks we align to",
      intro: "The right reference point depends on where you operate and who is asking.",
      items: [
        { label: "ISO/IEC 42001:2023", points: ["International management system standard for AI", "Certifiable by an accredited certification body", "Integrates with ISO 27001 and privacy governance"] },
        { label: "NIST AI RMF 1.0", points: ["Voluntary framework published by NIST in January 2023", "Organised around the Govern, Map, Measure and Manage functions", "Widely referenced by US customers and public bodies"] },
        { label: "Regulatory alignment", points: ["EU AI Act (Regulation (EU) 2024/1689) where it applies to your systems or market", "Sector and jurisdiction requirements that apply to the organisation", "Legal interpretation is provided by appropriately qualified counsel where required"] },
      ],
    },
    approach: [
      { title: "Understand the requirement", text: "Establish who is asking about AI governance, what they expect to see and which frameworks or regulations apply." },
      { title: "Assess and plan", text: "Build the AI inventory, assess current governance and agree priorities." },
      { title: "Implement and evidence", text: "Put roles, risk and impact processes, policies and monitoring in place, and record how they operate." },
      { title: "Prepare for independent assurance", text: "Where ISO 42001 certification is sought, complete internal audit and management review and support the certification audit." },
    ],
    independence:
      "ISO 42001 certification, where sought, is awarded by an independent certification body. Pixelette Certified provides governance design, implementation and certification readiness support.",
    faqs: [
      { question: "Is ISO 42001 mandatory?", answer: "No. ISO/IEC 42001 is a voluntary standard. Some customers ask for it, and it can support evidence of good governance under regulatory regimes, but holding it does not in itself demonstrate compliance with any specific law." },
      { question: "Does ISO 42001 make us compliant with the EU AI Act?", answer: "Not on its own. The EU AI Act sets legal obligations that depend on the role you play and the risk category of the system. An AI management system can support those obligations, but Act-specific requirements must be addressed separately." },
      { question: "We only use AI tools from suppliers. Does this apply to us?", answer: "Often, yes. Organisations that deploy third-party AI still need to understand how it is used, what data it processes and who is accountable. The work is usually lighter than for organisations that develop AI systems." },
    ],
    relatedSlugs: ["iso-27001", "privacy", "vciso"],
    markets: ["uk", "us", "gcc", "international"],
    availability: "Available internationally",
    seo: {
      title: "AI Governance & ISO 42001",
      description:
        "AI governance frameworks, AI inventories, risk and impact assessment, NIST AI RMF alignment and ISO 42001 readiness for independent certification.",
    },
  },
  {
    slug: "soc-2",
    tier: "core",
    icon: ShieldCheck,
    navLabel: "SOC 2 readiness",
    title: "SOC 2 readiness",
    shortTitle: "SOC 2",
    summary:
      "Establish the controls, evidence and operating discipline required to prepare for a SOC 2 examination.",
    opening:
      "Pixelette Certified helps organisations establish the controls, evidence and operating discipline required to prepare for a SOC 2 examination.",
    overview: [
      "SOC 2 is an attestation framework developed by the American Institute of Certified Public Accountants (AICPA). A service organisation engages a licensed CPA firm to examine its controls against the Trust Services Criteria, and the firm issues a report that customers can review. US customers often request a SOC 2 report from technology and service providers during procurement.",
      "A Type 1 report addresses whether controls are suitably designed at a point in time. A Type 2 report also addresses whether they operated effectively over a period, and is the version most customers ask for. Preparing well means deciding the scope, designing controls that fit how the business works, and building a consistent record of evidence before the examination period begins.",
    ],
    coverage: {
      heading: "What the work covers",
      items: [
        { title: "Readiness assessment", text: "Reviewing current controls against the Trust Services Criteria and identifying gaps." },
        { title: "Scope", text: "Deciding which systems, services and criteria the report should cover, starting with Security and adding Availability, Confidentiality, Processing Integrity or Privacy where customers need them." },
        { title: "Control design", text: "Designing controls that meet the criteria and reflect how your organisation actually operates." },
        { title: "Implementation", text: "Putting controls into operation across people, process and technology, working with your team and suppliers." },
        { title: "Evidence", text: "Establishing how each control will be evidenced, and checking that evidence is complete and consistent." },
        { title: "Type 1 and Type 2 readiness", text: "Preparing for a point-in-time examination, an examination over a period, or a Type 1 followed by Type 2." },
        { title: "Remediation", text: "Addressing gaps identified during readiness work before the examination period starts." },
        { title: "Audit coordination", text: "Supporting you in selecting a CPA firm and coordinating information requests during the examination." },
        { title: "Ongoing control maintenance", text: "Keeping controls and evidence operating between examinations, since Type 2 reports are usually renewed annually." },
        { title: "Integration with ISO 27001", text: "Where you also hold or are pursuing ISO 27001, mapping controls so that one set of evidence supports both." },
      ],
    },
    approach: [
      { title: "Understand the requirement", text: "Confirm what your customers have asked for, including report type, criteria and timing." },
      { title: "Assess and plan", text: "Complete the readiness assessment and agree scope and a remediation plan." },
      { title: "Implement and evidence", text: "Implement controls and establish consistent evidence of their operation." },
      { title: "Prepare for the examination", text: "Confirm readiness, support selection of a CPA firm and coordinate during the examination." },
    ],
    independence:
      "The independent SOC examination and SOC 2 report are performed by an appropriately licensed CPA firm. Pixelette Certified provides readiness, implementation and coordination support.",
    relatedRequirements: {
      heading: "Related assurance requirements",
      items: [
        { title: "ISO 27001", text: "Customers outside the United States often ask for ISO 27001 certification instead. The two can share a single control set.", href: "/services/iso-27001" },
        { title: "Cyber assurance and testing", text: "Penetration testing and vulnerability management commonly support SOC 2 controls and customer due diligence.", href: "/services/cyber-assurance" },
      ],
    },
    faqs: [
      { question: "Is SOC 2 a certification?", answer: "No. SOC 2 is an examination performed by a licensed CPA firm, resulting in a report on your controls rather than a certificate. A consultancy cannot issue a SOC 2 report." },
      { question: "Should we start with Type 1 or Type 2?", answer: "It depends on what your customers need and when. A Type 1 report can be produced sooner and demonstrates control design. Most customers eventually expect a Type 2 report, which requires controls to operate over an examination period." },
      { question: "Can one programme support SOC 2 and ISO 27001?", answer: "Yes. The frameworks differ in structure and outcome, but many controls overlap. Designing controls and evidence once, then mapping them to both, avoids duplicated work." },
    ],
    relatedSlugs: ["iso-27001", "cyber-assurance", "vciso"],
    markets: ["us", "international"],
    availability: "Available internationally for organisations requiring US-facing assurance",
    seo: {
      title: "SOC 2 Readiness",
      description:
        "SOC 2 readiness: scope, Trust Services Criteria, control design, evidence and Type 1 or Type 2 preparation. The examination is performed by a licensed CPA firm.",
    },
  },
  {
    slug: "cyber-assurance",
    tier: "core",
    icon: Radar,
    navLabel: "Cyber assurance & testing",
    title: "Cyber assurance & testing",
    shortTitle: "Cyber assurance",
    summary:
      "Independent testing and review of your applications, networks and cloud environments, with support through remediation.",
    opening:
      "Understand how your applications, networks and cloud environments would stand up to attack, and show customers and auditors that weaknesses are found and fixed.",
    overview: [
      "Technical testing gives evidence that security controls work as intended. Customers, insurers and frameworks such as ISO 27001 and SOC 2 commonly expect organisations to test their systems and act on the findings.",
      "We scope testing around the systems that matter and the assurance you need to provide, and deliver it through appropriately qualified testers from our specialist delivery network. Findings are reported in a form that both technical teams and leadership can act on.",
    ],
    coverage: {
      heading: "What the work covers",
      items: [
        { title: "Vulnerability assessment", text: "Identifying known weaknesses across infrastructure and applications, prioritised by risk." },
        { title: "Web application testing", text: "Testing applications for common and business-logic weaknesses, including authentication and access control." },
        { title: "API testing", text: "Testing APIs for weaknesses in authentication, authorisation, input handling and data exposure." },
        { title: "Network testing", text: "Testing external and internal network exposure and segmentation." },
        { title: "Cloud configuration review", text: "Reviewing cloud accounts and services against recognised secure configuration guidance." },
        { title: "Penetration testing", text: "Scenario-based testing within agreed rules of engagement, to show how weaknesses could be combined." },
        { title: "Remediation validation", text: "Retesting after fixes to confirm that findings have been addressed." },
        { title: "Security assurance support", text: "Helping you present testing evidence to customers, auditors and insurers." },
      ],
    },
    approach: [
      { title: "Understand the requirement", text: "Establish what needs testing, why, and any requirement a customer or regulator has set for the tester's qualifications." },
      { title: "Scope and plan", text: "Agree targets, methods, timing and rules of engagement in writing." },
      { title: "Test and report", text: "Carry out the testing and report findings with clear priorities and remediation guidance." },
      { title: "Remediate and validate", text: "Support remediation and retest to confirm that issues are resolved." },
    ],
    independence:
      "Testing provides evidence about the security of your systems at the time of testing. It is not a certification. Where a customer or regulator requires testing by a provider holding a particular accreditation, such as CREST, we arrange delivery through an appropriately accredited specialist provider.",
    faqs: [
      { question: "How often should we test?", answer: "It depends on how often your systems change, your risk profile and what customers or frameworks expect. Many organisations test at least annually and after significant changes." },
      { question: "Will testing disrupt our live systems?", answer: "Testing is planned to minimise disruption, with rules of engagement agreed in advance. Some tests can be run against staging environments where they reflect production." },
      { question: "Can you provide testing by an accredited provider?", answer: "Where a customer or regulator specifies a particular accreditation for testers or testing companies, we arrange delivery through a provider that holds it and confirm this in writing before testing begins." },
    ],
    relatedSlugs: ["soc-2", "iso-27001", "cyber-essentials"],
    markets: ["uk", "us", "gcc", "international"],
    availability: "Available internationally, subject to scope and any required accreditation",
    seo: {
      title: "Cyber Assurance & Testing",
      description:
        "Vulnerability assessment, web application, API, network and cloud testing, penetration testing and remediation validation, delivered by qualified testers.",
    },
  },
  {
    slug: "privacy",
    tier: "core",
    icon: FileSearch,
    navLabel: "Privacy & data governance",
    title: "Privacy & data governance",
    shortTitle: "Privacy",
    summary:
      "Build a privacy programme that meets the requirements applying to your organisation and can be demonstrated in practice.",
    opening:
      "Build a privacy programme that meets the requirements applying to your organisation and can be demonstrated in practice.",
    overview: [
      "Privacy obligations depend on where you operate, whose data you process and what you do with it. An organisation serving customers in more than one country may face several regimes with different rules on lawful processing, individual rights, breach notification and international transfers.",
      "We help organisations understand which requirements apply, put proportionate governance in place and keep the records that show it operating. Where the work calls for legal advice on the interpretation of a law, we will say so, and appropriately qualified legal counsel may be required.",
    ],
    coverage: {
      heading: "What the work covers",
      items: [
        { title: "Privacy assessment", text: "Reviewing current practice against the requirements that apply to your organisation." },
        { title: "Data mapping and records", text: "Establishing what personal data you hold, where it flows and why, including records of processing where required." },
        { title: "Impact assessments", text: "Conducting and reviewing data protection impact assessments and similar risk assessments." },
        { title: "Policies and notices", text: "Developing privacy notices, policies and procedures that reflect what you actually do." },
        { title: "Individual rights", text: "Establishing processes to handle access, deletion and other requests within the required periods." },
        { title: "Breach governance", text: "Preparing for personal data breaches, including assessment, escalation and notification decisions." },
        { title: "International transfers", text: "Identifying transfers and putting appropriate transfer mechanisms and safeguards in place." },
        { title: "Data protection officer support", text: "Providing ongoing privacy leadership, including an external data protection officer service where that is appropriate for your organisation." },
      ],
    },
    groups: {
      heading: "Requirements by jurisdiction",
      intro: "We organise privacy work around the regimes that apply to you.",
      items: [
        { label: "United Kingdom", points: ["UK GDPR and the Data Protection Act 2018", "Data protection impact assessments (DPIAs)", "Records of processing activities (ROPA)", "Privacy notices and policies", "Breach governance", "International transfers", "Data protection officer support"] },
        { label: "United States", points: ["Privacy programme design and operation", "Applicable state privacy requirements", "Privacy risk and impact assessments where applicable", "Operational privacy governance", "Supported by practitioners holding the CIPP/US credential"], note: "The United States has no single comprehensive federal privacy law. Requirements vary by state and sector." },
        { label: "GCC", points: ["Saudi Arabia's Personal Data Protection Law", "Qatar's Personal Data Privacy Protection Law", "Wider regional requirements where appropriate specialist expertise is available"] },
        { label: "International frameworks", points: ["ISO/IEC 27701 privacy information management", "Cross-border privacy governance for organisations operating in several jurisdictions"] },
      ],
    },
    approach: [
      { title: "Understand the requirement", text: "Establish which laws and customer requirements apply, and what you need to be able to demonstrate." },
      { title: "Assess and plan", text: "Map personal data and processing, identify gaps and agree priorities." },
      { title: "Implement and evidence", text: "Put policies, processes and records in place and embed them in day-to-day operations." },
      { title: "Maintain", text: "Keep the programme current as the business, its suppliers and the law change." },
    ],
    independence:
      "Compliance with data protection law is not a certification, and regulators do not certify organisations as compliant. ISO/IEC 27701 certification, where sought, is awarded by an independent certification body. Pixelette Certified provides privacy programme, readiness and advisory support, and appropriately qualified legal counsel may be required where legal advice is needed.",
    faqs: [
      { question: "Do we need a data protection officer?", answer: "Under UK GDPR, a data protection officer is required for public authorities and for organisations whose core activities involve large-scale regular and systematic monitoring or large-scale processing of special category data. Other organisations may still benefit from dedicated privacy leadership." },
      { question: "Is there such a thing as GDPR certification?", answer: "Organisations are not certified as GDPR compliant by regulators. Certification schemes exist under the legislation, and ISO/IEC 27701 can be certified independently, but neither replaces the obligation to comply with the law." },
      { question: "Can you help with privacy in more than one country?", answer: "Yes. We organise the work around the regimes that apply, and assign practitioners with the relevant jurisdictional knowledge." },
    ],
    relatedSlugs: ["iso-27001", "iso-42001", "vciso"],
    markets: ["uk", "us", "gcc", "international"],
    availability: "Available internationally. National privacy laws are scoped to the applicable jurisdiction",
    seo: {
      title: "Privacy & Data Governance",
      description:
        "Privacy programmes for UK GDPR, US state privacy requirements and GCC data protection laws, including DPIAs, records of processing and DPO support.",
    },
  },
  {
    slug: "vciso",
    tier: "core",
    icon: UserCheck,
    navLabel: "vCISO & GRC advisory",
    title: "vCISO & GRC advisory",
    shortTitle: "vCISO & GRC",
    summary:
      "Flexible senior security and governance capability, from strategy and board reporting to ongoing compliance support.",
    opening:
      "Give your organisation senior security and governance leadership, sized to what you need, without making a full-time appointment before you are ready to.",
    overview: [
      "Many growing organisations need the judgement of a Chief Information Security Officer (CISO) before they need one full time. A virtual CISO provides that capability on a flexible basis: setting direction, managing risk, reporting to the board and supporting customer assurance.",
      "Governance, risk and compliance (GRC) advisory supports the same aim. It keeps frameworks such as ISO 27001 and SOC 2 operating between audits, so that evidence, reviews and improvement continue as part of normal business rather than being rebuilt before each assessment.",
      "The practitioner assigned depends on your jurisdiction, sector and requirement, and is confirmed with you before the engagement begins.",
    ],
    coverage: {
      heading: "What the work covers",
      items: [
        { title: "Security strategy", text: "Setting security priorities that reflect the business, its risks and its customers." },
        { title: "Risk", text: "Maintaining a risk register and helping leadership make and record risk decisions." },
        { title: "Governance", text: "Establishing security governance, roles and reporting lines." },
        { title: "Board reporting", text: "Reporting security posture and risk to the board in terms it can act on." },
        { title: "Customer assurance", text: "Supporting customer due diligence, including security questionnaires and assurance meetings." },
        { title: "Third-party risk", text: "Assessing and managing the security of suppliers and service providers." },
        { title: "ISO and SOC programmes", text: "Overseeing ISO 27001, ISO 42001 or SOC 2 programmes and keeping them operating between audits." },
        { title: "NIST alignment", text: "Aligning security governance to the NIST Cybersecurity Framework 2.0 where that is the expected reference point." },
        { title: "Regulatory readiness", text: "Helping the organisation prepare for regulatory requirements in its sector and jurisdiction." },
        { title: "Ongoing GRC support", text: "Evidence and policy maintenance, internal review, management review and preparation for surveillance or recertification audits." },
      ],
    },
    approach: [
      { title: "Understand the requirement", text: "Agree what leadership needs, what customers and regulators expect, and the level of involvement required." },
      { title: "Assess and plan", text: "Review current posture and agree a prioritised plan." },
      { title: "Lead and implement", text: "Provide ongoing leadership, oversight and reporting against the plan." },
      { title: "Sustain", text: "Keep governance, evidence and audit readiness current as the organisation changes." },
    ],
    independence:
      "vCISO and GRC advisory support governance and decision-making. Responsibility for risk decisions remains with the organisation, and any certification, attestation or regulatory assessment is carried out by the relevant independent party.",
    faqs: [
      { question: "How is a vCISO different from a consultancy project?", answer: "A project delivers a defined outcome and ends. A vCISO engagement provides continuing senior involvement, working with leadership over time on strategy, risk and assurance." },
      { question: "Can we change the level of involvement?", answer: "Yes. The level of involvement is agreed at the start and can be reviewed as your needs change." },
      { question: "We are already certified. How does ongoing GRC support help?", answer: "Surveillance audits test whether the management system is operating. Ongoing support keeps risk reviews, evidence, internal audit and management review current between assessments." },
    ],
    relatedSlugs: ["iso-27001", "soc-2", "privacy"],
    markets: ["uk", "us", "gcc", "international"],
    availability: "Available internationally, subject to the requirements of the engagement",
    seo: {
      title: "vCISO & GRC Advisory",
      description:
        "Flexible senior security leadership and GRC advisory: strategy, risk, board reporting, customer assurance, third-party risk and ongoing ISO and SOC support.",
    },
  },
  {
    slug: "iso-22301",
    tier: "core",
    icon: LifeBuoy,
    navLabel: "Business continuity & ISO 22301",
    title: "Business continuity & operational resilience",
    shortTitle: "Business continuity",
    summary:
      "Prepare the organisation to continue delivering important services through disruption, with ISO 22301 readiness where it is sought.",
    opening:
      "Prepare your organisation to keep delivering the services that matter most when systems, suppliers or premises are disrupted.",
    overview: [
      "Customers and regulators increasingly expect organisations to show how they would respond to disruption, whether from a cyber incident, a supplier failure or loss of premises. Business continuity work identifies what must keep running, how quickly it must recover and what arrangements will achieve that.",
      "ISO 22301:2019 specifies requirements for a Business Continuity Management System (BCMS) and is one route to demonstrating this capability. Some organisations need certification; others need the continuity arrangements without it, or need to meet operational resilience requirements set by a regulator.",
    ],
    coverage: {
      heading: "What the work covers",
      items: [
        { title: "Business impact analysis", text: "Identifying critical activities, their dependencies and how long each can be disrupted." },
        { title: "Risk assessment", text: "Assessing the threats most likely to disrupt critical activities." },
        { title: "Continuity strategy", text: "Deciding how critical activities will be maintained or recovered." },
        { title: "Incident response", text: "Establishing how incidents are escalated, managed and communicated." },
        { title: "Disaster recovery", text: "Planning the recovery of technology and data within agreed objectives." },
        { title: "Exercising and testing", text: "Testing plans through exercises and improving them based on what is learned." },
        { title: "ISO 22301 readiness", text: "Where certification is sought, preparing the BCMS for audit by an independent certification body." },
        { title: "Regulatory resilience requirements", text: "Aligning with operational resilience requirements where your regulator sets them." },
      ],
    },
    approach: [
      { title: "Understand the requirement", text: "Establish who expects what, including customers, regulators and the board." },
      { title: "Assess and plan", text: "Complete the business impact analysis and risk assessment and agree priorities." },
      { title: "Implement and exercise", text: "Put continuity and recovery arrangements in place and test them." },
      { title: "Prepare for independent assurance", text: "Where certification is sought, complete internal audit and management review and support the certification audit." },
    ],
    independence:
      "ISO 22301 certification, where sought, is awarded by an independent certification body. Pixelette Certified provides continuity planning, implementation and readiness support.",
    faqs: [
      { question: "What is the difference between ISO 22301 and ISO 27001?", answer: "ISO 27001 addresses information security management. ISO 22301 addresses the ability to continue operating during and after disruption. They are complementary and can share management system processes." },
      { question: "Do we need certification?", answer: "Not always. Many organisations need tested continuity arrangements to satisfy customers or regulators without pursuing certification. We help you decide which is appropriate." },
    ],
    relatedSlugs: ["iso-27001", "vciso", "gcc-regulatory-compliance"],
    markets: ["uk", "gcc", "international"],
    availability: "Available internationally",
    seo: {
      title: "Business Continuity & ISO 22301",
      description:
        "Business impact analysis, continuity strategy, incident response, disaster recovery, exercising and ISO 22301 readiness for independent certification.",
    },
  },
  {
    slug: "gcc-regulatory-compliance",
    tier: "core",
    icon: Landmark,
    navLabel: "GCC regulatory compliance",
    title: "GCC cyber & regulatory compliance",
    shortTitle: "GCC compliance",
    summary:
      "Support with cyber security, governance, privacy and assurance requirements across Saudi Arabia, Qatar and the UAE.",
    opening:
      "Support for organisations navigating cyber security, governance, privacy and assurance requirements in Saudi Arabia, Qatar and the UAE.",
    overview: [
      "Regulators in the Gulf have established detailed cyber security and data protection requirements, and applicability often depends on the sector, the type of entity and whether it supports government or critical national infrastructure. Organisations entering these markets, and suppliers to regulated entities, frequently need to demonstrate alignment before they can proceed.",
      "Where an engagement involves jurisdiction-specific requirements, we confirm the applicable scope and ensure the appropriate specialist capability is available before defining the engagement. Regulatory work can sit alongside international standards where that reduces duplicated effort.",
    ],
    coverage: {
      heading: "What the work covers",
      items: [
        { title: "Applicability review", text: "Establishing which frameworks apply to your organisation, and which your customers or regulators expect you to align with." },
        { title: "Gap assessment", text: "Assessing current controls against the applicable regulatory requirements." },
        { title: "Implementation", text: "Developing the governance, policies and controls needed to close gaps." },
        { title: "Evidence and reporting", text: "Establishing evidence and preparing for regulatory review or self-assessment where required." },
        { title: "Standards integration", text: "Aligning regulatory controls with ISO 27001, ISO 22301 and privacy programmes." },
        { title: "Ongoing governance", text: "GRC and vCISO support to keep compliance current." },
      ],
    },
    groups: {
      heading: "Jurisdictions",
      intro: "The requirements differ by country. UAE support is confirmed against the applicable regulator and sector before an engagement is defined.",
      items: [
        { label: "Saudi Arabia", points: ["National Cybersecurity Authority (NCA) requirements, including the Essential Cybersecurity Controls", "Saudi Central Bank (SAMA) cyber security requirements for regulated financial institutions", "Personal Data Protection Law and privacy governance", "ISO 27001", "Business continuity", "GRC and vCISO support"] },
        { label: "Qatar", points: ["National Information Assurance (NIA) standard and the National Information Security Compliance Framework (NISCF)", "Qatar Central Bank (QCB) requirements for regulated financial institutions", "Personal Data Privacy Protection Law", "ISO 27001", "Business continuity", "Governance"] },
        { label: "United Arab Emirates", points: ["Applicable cyber, compliance, privacy and governance requirements", "ISO standards", "AI governance"], note: "The applicable regulator and sector are confirmed before an engagement is defined." },
      ],
    },
    approach: [
      { title: "Understand the requirement", text: "Identify the regulator, the entity type and what you must demonstrate." },
      { title: "Assess and plan", text: "Assess current controls against the applicable framework and agree a plan." },
      { title: "Implement and evidence", text: "Implement controls and build the evidence the regulator or customer will review." },
      { title: "Prepare for review", text: "Support you through regulatory review, self-assessment or customer due diligence." },
    ],
    independence:
      "Regulatory compliance is determined by the relevant regulator, and certification against international standards is awarded by independent certification bodies. Pixelette Certified is not a regulator-approved or accredited entity in the GCC; we provide readiness, implementation and advisory support.",
    faqs: [
      { question: "Do these frameworks apply to foreign companies?", answer: "It depends on the framework, your sector and whether you operate in the country or supply regulated entities there. Some requirements apply directly to regulated entities and are passed to their suppliers through contracts. We start by establishing what applies to you." },
      { question: "Can ISO 27001 satisfy GCC regulatory requirements?", answer: "ISO 27001 can provide a strong foundation and often overlaps significantly, but regulatory frameworks contain their own specific requirements. Mapping the two avoids duplicated work without assuming one replaces the other." },
    ],
    relatedSlugs: ["iso-27001", "iso-22301", "privacy"],
    markets: ["gcc"],
    availability: "Saudi Arabia, Qatar and the UAE, according to the applicable requirement",
    areaServed: ["SA", "QA", "AE"],
    seo: {
      title: "GCC Cyber & Regulatory Compliance",
      description:
        "Support with NCA, SAMA, NIA, NISCF, QCB and GCC privacy requirements, combined with ISO 27001, business continuity and ongoing GRC support.",
    },
  },
  {
    slug: "cyber-essentials",
    tier: "supporting",
    icon: Lock,
    navLabel: "Cyber Essentials readiness",
    title: "Cyber Essentials readiness & certification support",
    shortTitle: "Cyber Essentials",
    summary:
      "Prepare for Cyber Essentials or Cyber Essentials Plus, with assessment carried out by an authorised Certification Body.",
    opening:
      "Prepare your organisation for Cyber Essentials or Cyber Essentials Plus, and enter the assessment with confidence that your controls meet the requirements.",
    overview: [
      "Cyber Essentials is a UK government-backed scheme, overseen by the National Cyber Security Centre (NCSC), that covers five technical controls: firewalls, secure configuration, security update management, user access control and malware protection. Some UK public sector contracts require it, and many private sector customers ask for it.",
      "Cyber Essentials is a verified self-assessment. Cyber Essentials Plus adds hands-on technical verification by an assessor. In both cases, the assessment is carried out by a Certification Body licensed through the scheme.",
    ],
    coverage: {
      heading: "What the work covers",
      items: [
        { title: "Readiness assessment", text: "Establishing the scope and assessing your current position against the scheme requirements." },
        { title: "Control review", text: "Reviewing configuration, patching, access control, malware protection and boundary controls." },
        { title: "Gap identification", text: "Identifying where controls fall short of the requirements, prioritised for remediation." },
        { title: "Remediation support", text: "Helping your team or IT provider address the gaps." },
        { title: "Evidence and submission preparation", text: "Helping you prepare accurate answers and supporting evidence for the self-assessment." },
        { title: "Certification Body coordination", text: "Coordinating with an authorised Certification Body for the assessment and, for Cyber Essentials Plus, the technical audit." },
      ],
    },
    approach: [
      { title: "Understand the requirement", text: "Confirm whether Cyber Essentials or Cyber Essentials Plus is needed, and the scope." },
      { title: "Assess", text: "Review your controls against the current requirements." },
      { title: "Remediate", text: "Support remediation of any gaps." },
      { title: "Prepare for assessment", text: "Prepare your submission and coordinate with the Certification Body." },
    ],
    independence:
      "Cyber Essentials certification is awarded by a Certification Body licensed under the scheme. Pixelette Certified is not a Cyber Essentials Certification Body; we provide readiness, remediation and submission support.",
    relatedRequirements: {
      heading: "Related assurance requirements",
      items: [
        { title: "ISO 27001", text: "A broader management system standard, often requested alongside Cyber Essentials by larger customers.", href: "/services/iso-27001" },
        { title: "Cyber assurance and testing", text: "Wider technical testing beyond the scope of the Cyber Essentials Plus audit.", href: "/services/cyber-assurance" },
      ],
    },
    faqs: [
      { question: "What is the difference between Cyber Essentials and Cyber Essentials Plus?", answer: "Cyber Essentials is a self-assessment verified by a Certification Body. Cyber Essentials Plus uses the same requirements but adds a hands-on technical audit of your systems by an assessor." },
      { question: "How long is certification valid?", answer: "Certification reflects your position at the time of assessment, and the scheme expects organisations to recertify at least every 12 months." },
    ],
    relatedSlugs: ["iso-27001", "cyber-assurance", "vciso"],
    markets: ["uk"],
    availability: "United Kingdom",
    areaServed: ["GB"],
    seo: {
      title: "Cyber Essentials Readiness",
      description:
        "Cyber Essentials and Cyber Essentials Plus readiness, remediation and submission support. Assessment is carried out by an authorised Certification Body.",
    },
  },
];

/**
 * Additional specialist capabilities (§14). Offered where suitably qualified
 * delivery is available for the scope, sector and jurisdiction. None has its
 * own page; each links to the service it most naturally sits within.
 */
export const specialistCapabilities: { title: string; text: string; href: string }[] = [
  { title: "ISO 27701 privacy information management", text: "Extending an ISMS to cover privacy information management.", href: "/services/privacy" },
  { title: "Cyber Essentials readiness and certification support", text: "Readiness and submission support for the UK scheme.", href: "/services/cyber-essentials" },
  { title: "Zero Trust advisory", text: "Assessing maturity and planning a Zero Trust architecture aligned to NIST SP 800-207.", href: "/services/cyber-assurance" },
  { title: "Active Directory and Entra ID hardening", text: "Reviewing and hardening identity infrastructure against common attack paths.", href: "/services/cyber-assurance" },
  { title: "Cloud security", text: "Reviewing and improving the security of AWS, Azure and Google Cloud environments.", href: "/services/cyber-assurance" },
  { title: "Business impact analysis", text: "Identifying critical activities, dependencies and recovery objectives.", href: "/services/iso-22301" },
  { title: "Business risk assessment", text: "Assessing the threats most likely to disrupt critical activities.", href: "/services/iso-22301" },
  { title: "Disaster recovery planning", text: "Planning the recovery of technology and data within agreed objectives.", href: "/services/iso-22301" },
  { title: "AI risk assessment", text: "A structured assessment of AI systems against the NIST AI RMF and applicable regulation.", href: "/services/iso-42001" },
  { title: "PCI DSS readiness and support", text: "Preparing for PCI DSS assessment. Formal assessment is carried out by a Qualified Security Assessor where required.", href: "/contact" },
  { title: "Continuing GRC advisory", text: "Keeping frameworks, evidence and reviews current between audits.", href: "/services/vciso" },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getCoreServices(): Service[] {
  return services.filter((s) => s.tier === "core");
}

export function getRelatedServices(slugs: ServiceSlug[]): Service[] {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}
