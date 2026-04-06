import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  author: string;
  authorRole: string;
  content: string[];
  relatedSlugs: string[];
}

const blogPostsData: Record<string, BlogPostData> = {
  "iso-27001-complete-guide-2026": {
    slug: "iso-27001-complete-guide-2026",
    title: "ISO 27001 in 2026: The Complete Guide for UK Technology Companies",
    description:
      "Everything you need to know about ISO 27001 certification in 2026, updated requirements, costs, timelines, and what UK tech companies must prepare for.",
    date: "2026-03-15",
    category: "ISO 27001",
    readingTime: "12 min read",
    author: "Pixelette Certified",
    authorRole: "Compliance Team",
    content: [
      "ISO 27001 remains the gold standard for information security management in 2026. For UK technology companies, it has evolved from a nice-to-have into a prerequisite for enterprise sales, government contracts, and investor confidence. The 2022 revision continues to be the current version, with enhanced focus on cloud security, threat intelligence, and data leakage prevention.",
      "The certification landscape has shifted significantly. Enterprise procurement teams now routinely reject vendors without ISO 27001 as a first-pass filter. Cyber insurance providers offer substantially better premiums to certified organisations. And with the UK government expanding its digital supply chain requirements, the addressable market for uncertified companies continues to shrink.",
      "Getting certified in 2026 typically takes 10 to 14 weeks with an experienced consultancy. The process follows a well-established pattern: gap analysis, documentation build, controls implementation, internal audit, and external certification audit. The key differentiator is not the process itself but the quality of the implementation and how well the ISMS integrates with your existing operations.",
      "Cost varies based on organisation size and complexity. For a startup or SME with up to 50 employees, expect to invest between eight and twelve thousand pounds for consultancy, plus certification body fees of two to four thousand pounds. Scale-ups with 50 to 150 employees typically invest between thirteen and eighteen thousand pounds. Enterprise implementations for larger or more complex organisations start from twenty-two thousand pounds.",
      "The most common mistake companies make is treating ISO 27001 as a documentation exercise. The standard requires a living management system, one that is actively maintained, regularly reviewed, and continuously improved. Organisations that build their ISMS properly from the start find that it genuinely improves their security posture, not just their sales pipeline.",
      "One significant development in 2026 is the increasing convergence between ISO 27001 and other frameworks. Companies pursuing SOC 2 alongside ISO 27001 can leverage sixty to seventy percent overlap in control requirements. Similarly, ISO 42001 for AI governance builds directly on ISO 27001 foundations, making it efficient to pursue both certifications.",
    ],
    relatedSlugs: [
      "cyber-essentials-vs-iso-27001",
      "real-cost-iso-27001-certification-uk",
      "enterprise-security-questionnaire-without-iso-27001",
    ],
  },
  "cyber-essentials-vs-iso-27001": {
    slug: "cyber-essentials-vs-iso-27001",
    title: "Cyber Essentials vs ISO 27001: Which Does Your Business Actually Need?",
    description:
      "A practical comparison of the two most common UK certifications. When Cyber Essentials is enough, when you need ISO 27001, and when you need both.",
    date: "2026-03-08",
    category: "Compliance",
    readingTime: "8 min read",
    author: "Pixelette Certified",
    authorRole: "Compliance Team",
    content: [
      "The question we hear most frequently from UK technology companies is whether they need Cyber Essentials, ISO 27001, or both. The answer depends entirely on your business context, who your customers are, what contracts you are pursuing, and where you want to be in eighteen months.",
      "Cyber Essentials is a UK government-backed certification scheme that covers five fundamental technical controls: firewalls, secure configuration, user access control, malware protection, and patch management. It is relatively quick to achieve, typically two to three weeks, and costs between one and four thousand pounds depending on whether you pursue the basic or Plus level.",
      "ISO 27001 is a comprehensive international standard covering the full spectrum of information security management. It requires building an Information Security Management System with policies, procedures, risk assessments, and ongoing governance. Implementation typically takes ten to fourteen weeks and represents a significantly larger investment.",
      "If you sell exclusively to UK government bodies or public sector organisations, Cyber Essentials is mandatory for contracts involving the handling of certain sensitive information. It is your minimum entry ticket. However, if you sell to enterprise clients, particularly those in financial services, healthcare, or technology, ISO 27001 is what they ask for.",
      "Many organisations follow a practical progression: start with Cyber Essentials to establish baseline security controls and qualify for government work, then progress to ISO 27001 when enterprise sales demand it. The controls you implement for Cyber Essentials directly feed into your ISO 27001 implementation, so the investment is not wasted.",
      "Our recommendation for most UK technology companies is to pursue both. Cyber Essentials can be achieved in weeks and opens immediate doors. ISO 27001 should follow within twelve months as part of your growth strategy. The combined investment delivers returns across government, enterprise, and insurance channels.",
    ],
    relatedSlugs: [
      "iso-27001-complete-guide-2026",
      "real-cost-iso-27001-certification-uk",
      "vciso-vs-full-time-ciso",
    ],
  },
  "enterprise-security-questionnaire-without-iso-27001": {
    slug: "enterprise-security-questionnaire-without-iso-27001",
    title: "How to Answer an Enterprise Security Questionnaire Without ISO 27001",
    description:
      "Strategies for handling security questionnaires when you do not yet have ISO 27001, and why getting certified makes the process ten times easier.",
    date: "2026-02-28",
    category: "Advisory",
    readingTime: "7 min read",
    author: "Pixelette Certified",
    authorRole: "Compliance Team",
    content: [
      "Enterprise security questionnaires are the gatekeepers of B2B SaaS sales. If you have ever received a 200-question spreadsheet from a prospect's security team, you know the sinking feeling. Without ISO 27001, answering these questionnaires is a time-consuming, inconsistent, and often unsuccessful process.",
      "The fundamental challenge is that most questionnaires are built around ISO 27001 and SOC 2 control frameworks. Questions about your risk assessment methodology, access control policies, incident response procedures, and business continuity plans all assume you have formal documentation. Without it, you are writing custom narrative answers for every single question.",
      "There are strategies to manage this effectively. First, build a centralised knowledge base of your security practices, even if they are not formally documented in an ISMS. Document your actual controls, how you manage access, how you handle incidents, how you protect data. This gives you consistent source material to draw from.",
      "Second, be transparent about your current state and your roadmap. Many enterprise security teams will accept a credible plan to achieve ISO 27001 within six to twelve months, particularly if you can demonstrate strong technical controls and a mature approach to security.",
      "Third, consider using a Trust Centre platform that publishes your security posture proactively. This reduces inbound questionnaire volume by giving prospects self-service access to your security documentation.",
      "However, the most effective strategy is simply to get ISO 27001 certified. Once certified, the answer to most questionnaire sections becomes: please refer to our ISO 27001 certificate and Statement of Applicability. A process that previously consumed days per prospect becomes minutes.",
    ],
    relatedSlugs: [
      "iso-27001-complete-guide-2026",
      "vciso-vs-full-time-ciso",
      "cyber-essentials-vs-iso-27001",
    ],
  },
  "iso-42001-ai-companies": {
    slug: "iso-42001-ai-companies",
    title: "ISO 42001: Why AI Companies Need This Certification Now",
    description:
      "The EU AI Act is coming. ISO 42001 is the governance framework that proves your AI is built responsibly. Here is what you need to know.",
    date: "2026-02-20",
    category: "AI Governance",
    readingTime: "10 min read",
    author: "Pixelette Certified",
    authorRole: "Compliance Team",
    content: [
      "ISO 42001 is the international standard for Artificial Intelligence Management Systems. Published in December 2023, it provides a structured framework for organisations that develop, provide, or use AI systems to do so responsibly and transparently. For UK and EU technology companies building AI products, ISO 42001 is rapidly becoming what ISO 27001 was a decade ago.",
      "The EU AI Act entered into force in August 2024, with full compliance requirements phasing in through 2026. The Act establishes a risk-based regulatory framework for AI systems, and ISO 42001 is explicitly referenced as a compliance mechanism. Companies that achieve ISO 42001 certification are in the strongest position to demonstrate compliance.",
      "What does ISO 42001 actually require? At its core, the standard mandates an AI Management System that covers the entire AI lifecycle, from design and development through deployment and decommissioning. Key areas include AI risk assessment, bias and fairness evaluation, transparency and explainability, data governance, and continuous monitoring of AI system performance.",
      "The certification process follows a similar pattern to ISO 27001. It begins with an AI readiness review and system inventory, progresses through documentation and controls implementation, and culminates in internal and external audits. Typical timelines range from twelve to sixteen weeks, depending on the number and complexity of AI systems in scope.",
      "For UK AI companies specifically, the competitive advantage is significant. Enterprise clients are beginning to include AI governance requirements in procurement questionnaires. Investors are scrutinising AI risk management practices. And the UK government's own AI safety framework aligns closely with ISO 42001 principles.",
      "Our advice to AI companies: do not wait for regulatory enforcement. Organisations that build responsible AI governance now will have a structural advantage over those scrambling to comply later. ISO 42001 provides the framework; the question is whether you invest proactively or reactively.",
    ],
    relatedSlugs: [
      "iso-27001-complete-guide-2026",
      "vciso-vs-full-time-ciso",
      "cyber-essentials-vs-iso-27001",
    ],
  },
  "real-cost-iso-27001-certification-uk": {
    slug: "real-cost-iso-27001-certification-uk",
    title: "The Real Cost of ISO 27001 Certification in the UK",
    description:
      "A transparent breakdown of ISO 27001 certification costs in 2026, consultancy fees, certification body fees, tooling, and the hidden costs nobody mentions.",
    date: "2026-02-12",
    category: "ISO 27001",
    readingTime: "9 min read",
    author: "Pixelette Certified",
    authorRole: "Compliance Team",
    content: [
      "Transparency around ISO 27001 costs is remarkably poor in the UK market. Most consultancies hide behind 'contact us for a quote' pages, making it difficult for technology companies to budget effectively. This guide provides the honest breakdown we wish existed when we started in this industry.",
      "There are four primary cost components to ISO 27001 certification. First, consultancy fees for the implementation itself. Second, certification body fees for the external audit. Third, tooling and platform costs. Fourth, internal time investment from your team.",
      "Consultancy fees vary based on organisation size and complexity. For a startup or SME with up to fifty employees, expect to pay between eight and twelve thousand pounds. Scale-ups with fifty to one hundred and fifty employees typically pay between thirteen and eighteen thousand pounds. Enterprise organisations with complex environments start from twenty-two thousand pounds.",
      "Certification body fees are separate from consultancy fees and are paid directly to the auditing body. For a small organisation, expect three to five thousand pounds for the initial certification audit. This covers Stage 1 (documentation review) and Stage 2 (compliance audit). Annual surveillance audits cost approximately sixty percent of the initial audit fee.",
      "Tooling costs are often overlooked. You will need a GRC platform or equivalent to manage your ISMS, risk registers, policy management, evidence collection, and audit tracking. Budget one to three thousand pounds annually for this. Some organisations use spreadsheets initially, which is technically acceptable but creates operational overhead.",
      "The hidden cost that nobody discusses is internal time. Your team will need to participate in interviews, review policies, attend training sessions, and provide evidence during the audit. For a typical SME implementation, budget forty to sixty hours of cumulative internal time over the ten to twelve week implementation period.",
    ],
    relatedSlugs: [
      "iso-27001-complete-guide-2026",
      "cyber-essentials-vs-iso-27001",
      "enterprise-security-questionnaire-without-iso-27001",
    ],
  },
  "vciso-vs-full-time-ciso": {
    slug: "vciso-vs-full-time-ciso",
    title: "vCISO vs Full-Time CISO: What UK Scale-Ups Actually Need",
    description:
      "When does a virtual CISO make sense versus hiring full-time? A data-driven comparison for UK scale-ups from Series A to Series C.",
    date: "2026-02-05",
    category: "vCISO",
    readingTime: "8 min read",
    author: "Pixelette Certified",
    authorRole: "Compliance Team",
    content: [
      "The average salary for a full-time CISO in London in 2026 is between one hundred and forty and one hundred and eighty thousand pounds, plus equity, benefits, and bonus. For most UK scale-ups between Series A and Series B, that is an enormous commitment for a role that may only require twenty to thirty percent of a full-time equivalent.",
      "A Virtual CISO provides the same strategic security leadership, board reporting, risk management, compliance governance, incident response planning, and security architecture oversight, on a flexible monthly retainer. Typical vCISO engagements cost between two thousand eight hundred and seven thousand five hundred pounds per month, depending on the level of involvement.",
      "The decision framework is relatively straightforward. If your security programme is mature, you operate in a heavily regulated industry, you have a large security team that needs daily leadership, or you are preparing for IPO, a full-time CISO makes sense. The role requires deep organisational knowledge and consistent availability.",
      "For most scale-ups, however, a vCISO is the pragmatic choice. You get senior security leadership at a fraction of the cost, with the flexibility to scale up or down as needs change. A good vCISO brings cross-industry experience from working with multiple clients, which often results in better strategic advice than a full-time hire who only sees one organisation.",
      "The transition point typically occurs when your organisation reaches one hundred and fifty to two hundred employees, or when you enter a heavily regulated market that demands dedicated security leadership. At that point, the volume of security work, daily risk decisions, team management, regulatory engagement, justifies a full-time hire.",
      "Many of our clients follow a practical trajectory: engage a vCISO during the growth phase, use them to build the security programme and governance framework, and then hire a full-time CISO when the organisation is large enough to justify it. The vCISO effectively builds the foundation that the full-time CISO inherits.",
    ],
    relatedSlugs: [
      "iso-27001-complete-guide-2026",
      "iso-42001-ai-companies",
      "enterprise-security-questionnaire-without-iso-27001",
    ],
  },
};

function getPost(slug: string): BlogPostData | undefined {
  return blogPostsData[slug];
}

function getRelatedPosts(slugs: string[]): BlogPostData[] {
  return slugs
    .map((s) => blogPostsData[s])
    .filter(Boolean);
}

export async function generateStaticParams() {
  return Object.keys(blogPostsData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.relatedSlugs);

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title }]} />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
