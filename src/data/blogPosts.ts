// Framework-agnostic blog post metadata. Lives outside the "use client" blog
// page so server components (e.g. the /blog/category/[category] archive route
// and sitemap.ts) import the real array rather than a client-reference proxy.

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "iso-27001-security-questionnaire",
    title: "We just got asked for ISO 27001 in a security questionnaire. What now?",
    description:
      "Your buyer just sent a security questionnaire asking for ISO 27001. You don't have it. This guide shows exactly what to do next and how to stay in the deal.",
    date: "2026-04-07",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "iso-27001-10-weeks-vs-6-months",
    title: "ISO 27001 in 10 weeks vs 6 months: what actually changes?",
    description:
      "The 10-week timeline is not a marketing gimmick. This guide explains what a structured fast-track compresses, what it does not, and how to tell a real fast-track from corner-cutting.",
    date: "2026-04-06",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "real-cost-not-being-iso-27001-certified",
    title: "The real cost of NOT being ISO 27001 certified",
    description:
      "Every founder asks how much ISO 27001 costs. The right question is how much it costs not to have it. This guide puts a number on the second question.",
    date: "2026-04-05",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "customer-asked-ai-governance",
    title: "Our customer just asked about our AI governance. We don't have any.",
    description:
      "Enterprise buyers and investors are asking about AI governance with increasing regularity. If you build or deploy AI, ISO 42001 is the answer. Here is what to do this week.",
    date: "2026-04-04",
    category: "AI Governance",
    readingTime: "8 min read",
  },
  {
    slug: "iso-27001-or-soc-2-uk-saas",
    title: "ISO 27001 or SOC 2? A straight answer for UK SaaS selling into US enterprise",
    description:
      "A UK SaaS company closes its first US deal and discovers SOC 2 is the default. This guide explains whether to hold one or both, and in what order.",
    date: "2026-04-03",
    category: "SOC 2",
    readingTime: "8 min read",
  },
  {
    slug: "enterprise-security-questionnaire-without-iso-27001",
    title: "How to answer an enterprise security questionnaire without ISO 27001",
    description:
      "A tactical guide for handling enterprise security questionnaires when you do not yet hold ISO 27001, with a free response framework template.",
    date: "2026-04-02",
    category: "Advisory",
    readingTime: "8 min read",
  },
  {
    slug: "iso-27001-uk-fintech-fca-dora",
    title: "ISO 27001 for UK fintech: what the FCA and DORA actually require",
    description:
      "FCA operational resilience, DORA compliance, and ISO 27001 for fintech. This guide maps the real regulatory requirements to the certification framework.",
    date: "2026-04-01",
    category: "FinTech",
    readingTime: "8 min read",
  },
  {
    slug: "iso-27001-uk-healthtech-nhs",
    title: "ISO 27001 for UK healthtech: NHS DSPT, DTAC, and the procurement gates you will actually face",
    description:
      "A practical guide to the four assurance frameworks every UK healthtech selling into the NHS will encounter, where ISO 27001 fits in the stack, and how to navigate tender deadlines.",
    date: "2026-03-31",
    category: "Healthcare",
    readingTime: "8 min read",
  },
  {
    slug: "iso-27001-ai-companies-iso-42001",
    title: "ISO 27001 for AI companies: why ISO 42001 alone is not enough",
    description:
      "AI companies need both ISO 27001 and ISO 42001 because the two standards cover different risk domains, and enterprise buyers check the ISO 27001 box first.",
    date: "2026-03-30",
    category: "AI Governance",
    readingTime: "7 min read",
  },
  {
    slug: "iso-27001-legal-firms-sra",
    title: "ISO 27001 for legal firms: SRA expectations, client audits, and the cost of one breach",
    description:
      "The average UK legal firm data breach costs 4.2 million pounds, yet legal firms remain the slowest professional services sector to certify. This guide explains what the SRA expects and why client audits are now the dominant procurement gate.",
    date: "2026-03-29",
    category: "Legal",
    readingTime: "7 min read",
  },
  {
    slug: "investor-asked-security-posture",
    title: "Your investor just asked about your security posture in due diligence. What now?",
    description:
      "Investor security diligence is more sophisticated than procurement questionnaires. This guide explains what Series B and later funds actually look for and what to do if the questionnaire arrived this morning.",
    date: "2026-03-28",
    category: "Advisory",
    readingTime: "7 min read",
  },
  {
    slug: "cyber-insurance-premium-increased",
    title: "Your cyber insurance premium just increased by 40%. Here is why, and what to do about it.",
    description:
      "UK cyber insurance premiums have repriced sharply and certified businesses are now treated as a separate risk class. This guide explains exactly how underwriters use ISO 27001 in their pricing models.",
    date: "2026-03-27",
    category: "Advisory",
    readingTime: "6 min read",
  },
  {
    slug: "iso-27001-vs-cyber-essentials-plus",
    title: "ISO 27001 vs Cyber Essentials Plus: when you need one, when you need both, and when the question itself is wrong",
    description:
      "ISO 27001 and Cyber Essentials Plus are not alternatives. They answer different questions and satisfy different procurement gates. This guide explains which buyers need which credential.",
    date: "2026-03-26",
    category: "Compliance",
    readingTime: "6 min read",
  },
  {
    slug: "vanta-drata-vs-real-consultancy",
    title: "Vanta vs Drata vs a real consultancy: what compliance automation tools actually do (and what they don't)",
    description:
      "An honest comparison of compliance automation platforms and consultancy-led implementation, including the five scenarios where the platform-only approach reliably fails.",
    date: "2026-03-25",
    category: "Advisory",
    readingTime: "7 min read",
  },
  {
    slug: "iso-27001-projects-over-budget",
    title: "Why most ISO 27001 projects run over budget (and the four red flags to watch for in a proposal)",
    description:
      "Roughly 60 percent of ISO 27001 projects in the UK come in over budget. This guide identifies the four red flags at the proposal stage and the contract mechanics that prevent overrun.",
    date: "2026-03-24",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "20-person-company-iso-27001",
    title: "Can a 20-person company really get ISO 27001 certified? A direct answer.",
    description:
      "ISO 27001 was designed to scale to organisations of any size. This guide explains how the standard scales, what genuinely gets easier at smaller scale, and the one thing that is harder.",
    date: "2026-03-23",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "eu-ai-act-uk-companies",
    title: "EU AI Act preparation for UK companies: what you actually need to do before August 2026",
    description:
      "The EU AI Act applies to UK companies whose AI output is used in the EU, regardless of where they are headquartered. This guide maps the obligations and provides a 90-day action plan.",
    date: "2026-03-22",
    category: "AI Governance",
    readingTime: "8 min read",
  },
  {
    slug: "iso-42001-vs-eu-ai-act",
    title: "ISO 42001 vs the EU AI Act: what enterprise buyers actually expect you to hold",
    description:
      "ISO 42001 and the EU AI Act are not interchangeable. This guide explains the structural relationship between them and how to position your AI governance posture credibly.",
    date: "2026-03-21",
    category: "AI Governance",
    readingTime: "8 min read",
  },
];
