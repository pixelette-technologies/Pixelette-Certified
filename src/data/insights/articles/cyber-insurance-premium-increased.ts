import type { Insight } from "../types";

const article: Insight = {
  slug: "cyber-insurance-premium-increased",
  title: "Cyber insurance renewals: what insurers ask about security controls",
  seoTitle: "What Cyber Insurers Ask About Security Controls",
  standfirst:
    "The security questions UK cyber insurers commonly ask at application and renewal, why accurate answers matter, and how Cyber Essentials and ISO/IEC 27001 relate to the underwriting process.",
  description:
    "What UK cyber insurers commonly ask about security controls, the duty of fair presentation, and how Cyber Essentials and ISO/IEC 27001 relate to cover.",
  summary:
    "The security questions UK cyber insurers commonly ask at renewal, and how Cyber Essentials and ISO 27001 relate.",
  category: "Cyber and GRC",
  jurisdiction: "United Kingdom",
  published: "2026-03-27",
  updated: "2026-09-25",
  readingTime: "4 min read",
  body: [
    {
      type: "p",
      text: "A cyber insurance renewal often arrives with a longer proposal form than the year before, more specific questions about security controls, and sometimes new conditions or changes to terms. How insurers price and structure cover is a matter for each insurer, and this article does not attempt to predict premiums. It sets out what insurers commonly ask, why accuracy matters, and how recognised security schemes relate to the process.",
    },
    {
      type: "h2",
      text: "What insurers commonly ask",
    },
    {
      type: "p",
      text: "The Association of British Insurers (ABI) explains that cyber insurance applications include questions common to all business insurance, such as turnover, customers and claims history, together with questions specific to cyber risk [1]. The cyber questions it lists include:",
    },
    {
      type: "list",
      items: [
        "What cyber security policies are in place",
        "Whether there is a designated person responsible for information security or privacy",
        "Whether encryption is used",
        "Whether multi-factor authentication is used and enforced",
        "Whether remote access to systems and networks is secured",
        "Whether anti-virus and firewall software is in place",
        "Whether patches are applied regularly to critical systems",
      ],
    },
    {
      type: "p",
      text: "The National Cyber Security Centre (NCSC) notes that insurers may ask for detailed information about an organisation's technical, procedural and human controls [2]. Depending on the insurer, questions may extend to areas such as backups, incident response arrangements and supplier access, which fall within those broad categories. The exact questions vary between insurers and change over time.",
    },
    {
      type: "h2",
      text: "Why accurate answers matter",
    },
    {
      type: "p",
      text: "Under the Insurance Act 2015, a business must make a fair presentation of the risk to the insurer before the contract is entered into. That includes making every material representation of fact substantially correct, and every material representation of expectation or belief in good faith [3]. An answer that overstates a control, such as confirming that multi-factor authentication is enforced everywhere when it is not, can create difficulties later if the insurer finds the position was different when a claim is made.",
    },
    {
      type: "p",
      text: "For that reason, proposal forms are best completed with input from whoever runs the IT estate, not only by finance or the broker. Where a control is partly in place, it is usually better to say so and explain the plan than to give a simple yes.",
    },
    {
      type: "h2",
      text: "What the policy covers",
    },
    {
      type: "p",
      text: "The NCSC's guidance encourages organisations to understand what a policy covers and excludes, what support services are included, whether incident response support is provided, and what requirements must be maintained for cover to remain valid or be renewed [2]. Some policies include conditions tied to specific controls. A renewal is a sensible point to read the conditions alongside the proposal answers and confirm they still match reality.",
    },
    {
      type: "callout",
      title: "Insurance and security",
      text: "The NCSC is clear that cyber insurance will not prevent an attack or solve an organisation's security issues [2]. Insurance transfers part of the financial consequences of an incident. It sits alongside security controls and does not replace them.",
    },
    {
      type: "h2",
      text: "Where Cyber Essentials and ISO 27001 fit",
    },
    {
      type: "p",
      text: "Cyber Essentials covers five technical controls: firewalls, secure configuration, security update management, user access control and malware protection. Cyber Essentials Plus adds hands-on technical testing [4]. Several of the insurer questions above, such as those on patching, anti-virus, firewalls and access control, map directly onto these controls. The NCSC also notes that UK organisations below a turnover threshold that certify their whole organisation are entitled to cyber liability insurance arranged through IASME, the scheme's delivery partner [4]. The NCSC's insurance guidance adds that some insurers may take recognised certifications such as Cyber Essentials into account [2].",
    },
    {
      type: "p",
      text: "ISO/IEC 27001:2022 specifies requirements for an Information Security Management System (ISMS) [5]. An ISMS covers a wider range of the questions insurers ask, including governance, supplier management and incident response, and it produces documented evidence that can help in completing a proposal form accurately. How much weight a particular insurer gives to certification is for that insurer to decide.",
    },
    {
      type: "h2",
      text: "Preparing for renewal",
    },
    {
      type: "p",
      text: "A practical approach is to keep a short record of the controls insurers commonly ask about, with the current position and supporting evidence for each. Reviewing that record a few months before renewal leaves time to close gaps before answering, and it gives the broker clearer information to present to the market. Where a control cannot be put in place before renewal, an honest description of the position and the plan is more useful than an optimistic answer. Support is available for organisations that want an independent review of their controls before renewal.",
    },
  ],
  sources: [
    {
      title: "How to buy cyber insurance",
      publisher: "Association of British Insurers",
      url: "https://www.abi.org.uk/products-and-issues/choosing-the-right-insurance/cyber-insurance/how-to-buy-cyber-insurance/",
    },
    {
      title: "Cyber insurance guidance",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/guidance/cyber-insurance-guidance",
    },
    {
      title: "Insurance Act 2015, section 3: The duty of fair presentation",
      publisher: "legislation.gov.uk",
      url: "https://www.legislation.gov.uk/ukpga/2015/4/section/3",
    },
    {
      title: "Cyber Essentials overview",
      publisher: "National Cyber Security Centre",
      url: "https://www.ncsc.gov.uk/cyberessentials/overview",
    },
    {
      title: "ISO/IEC 27001:2022 Information security management systems: Requirements",
      publisher: "International Organization for Standardization",
      url: "https://www.iso.org/standard/27001",
    },
  ],
  service: {
    label: "Explore Cyber Essentials readiness & certification support",
    href: "/services/cyber-essentials",
  },
  related: [
    "iso-27001-vs-cyber-essentials-plus",
    "iso-27001-security-questionnaire",
    "investor-asked-security-posture",
  ],
};

export default article;
