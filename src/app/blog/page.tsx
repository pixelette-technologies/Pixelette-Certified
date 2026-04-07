"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

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
    title: "We Just Got Asked for ISO 27001 in a Security Questionnaire. What Now?",
    description:
      "Your buyer just sent a security questionnaire asking for ISO 27001. You don't have it. This guide shows exactly what to do next and how to stay in the deal.",
    date: "2026-04-07",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "iso-27001-10-weeks-vs-6-months",
    title: "ISO 27001 in 10 Weeks vs 6 Months: What Actually Changes?",
    description:
      "The 10-week timeline is not a marketing gimmick. This guide explains what a structured fast-track compresses, what it does not, and how to tell a real fast-track from corner-cutting.",
    date: "2026-04-06",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "real-cost-not-being-iso-27001-certified",
    title: "The Real Cost of NOT Being ISO 27001 Certified",
    description:
      "Every founder asks how much ISO 27001 costs. The right question is how much it costs not to have it. This guide puts a number on the second question.",
    date: "2026-04-05",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "customer-asked-ai-governance",
    title: "Our Customer Just Asked About Our AI Governance. We Don't Have Any.",
    description:
      "Enterprise buyers and investors are asking about AI governance with increasing regularity. If you build or deploy AI, ISO 42001 is the answer. Here is what to do this week.",
    date: "2026-04-04",
    category: "AI Governance",
    readingTime: "8 min read",
  },
  {
    slug: "iso-27001-or-soc-2-uk-saas",
    title: "ISO 27001 or SOC 2? A Straight Answer for UK SaaS Selling into US Enterprise",
    description:
      "A UK SaaS company closes its first US deal and discovers SOC 2 is the default. This guide explains whether to hold one or both, and in what order.",
    date: "2026-04-03",
    category: "SOC 2",
    readingTime: "8 min read",
  },
  {
    slug: "enterprise-security-questionnaire-without-iso-27001",
    title: "How to Answer an Enterprise Security Questionnaire Without ISO 27001",
    description:
      "A tactical guide for handling enterprise security questionnaires when you do not yet hold ISO 27001, with a free response framework template.",
    date: "2026-04-02",
    category: "Advisory",
    readingTime: "8 min read",
  },
  {
    slug: "iso-27001-uk-fintech-fca-dora",
    title: "ISO 27001 for UK Fintech: What the FCA and DORA Actually Require",
    description:
      "FCA operational resilience, DORA compliance, and ISO 27001 for fintech. This guide maps the real regulatory requirements to the certification framework.",
    date: "2026-04-01",
    category: "FinTech",
    readingTime: "8 min read",
  },
  {
    slug: "iso-27001-uk-healthtech-nhs",
    title: "ISO 27001 for UK Healthtech: NHS DSPT, DTAC, and the Procurement Gates You Will Actually Face",
    description:
      "A practical guide to the four assurance frameworks every UK healthtech selling into the NHS will encounter, where ISO 27001 fits in the stack, and how to navigate tender deadlines.",
    date: "2026-03-31",
    category: "Healthcare",
    readingTime: "8 min read",
  },
  {
    slug: "iso-27001-ai-companies-iso-42001",
    title: "ISO 27001 for AI Companies: Why ISO 42001 Alone Is Not Enough",
    description:
      "AI companies need both ISO 27001 and ISO 42001 because the two standards cover different risk domains, and enterprise buyers check the ISO 27001 box first.",
    date: "2026-03-30",
    category: "AI Governance",
    readingTime: "7 min read",
  },
  {
    slug: "iso-27001-legal-firms-sra",
    title: "ISO 27001 for Legal Firms: SRA Expectations, Client Audits, and the Cost of One Breach",
    description:
      "The average UK legal firm data breach costs 4.2 million pounds, yet legal firms remain the slowest professional services sector to certify. This guide explains what the SRA expects and why client audits are now the dominant procurement gate.",
    date: "2026-03-29",
    category: "Legal",
    readingTime: "7 min read",
  },
  {
    slug: "investor-asked-security-posture",
    title: "Your Investor Just Asked About Your Security Posture in Due Diligence. What Now?",
    description:
      "Investor security diligence is more sophisticated than procurement questionnaires. This guide explains what Series B and later funds actually look for and what to do if the questionnaire arrived this morning.",
    date: "2026-03-28",
    category: "Advisory",
    readingTime: "7 min read",
  },
  {
    slug: "cyber-insurance-premium-increased",
    title: "Your Cyber Insurance Premium Just Increased by 40%. Here Is Why, and What to Do About It.",
    description:
      "UK cyber insurance premiums have repriced sharply and certified businesses are now treated as a separate risk class. This guide explains exactly how underwriters use ISO 27001 in their pricing models.",
    date: "2026-03-27",
    category: "Advisory",
    readingTime: "6 min read",
  },
  {
    slug: "iso-27001-vs-cyber-essentials-plus",
    title: "ISO 27001 vs Cyber Essentials Plus: When You Need One, When You Need Both, and When the Question Itself Is Wrong",
    description:
      "ISO 27001 and Cyber Essentials Plus are not alternatives. They answer different questions and satisfy different procurement gates. This guide explains which buyers need which credential.",
    date: "2026-03-26",
    category: "Compliance",
    readingTime: "6 min read",
  },
  {
    slug: "vanta-drata-vs-real-consultancy",
    title: "Vanta vs Drata vs a Real Consultancy: What Compliance Automation Tools Actually Do (And What They Don't)",
    description:
      "An honest comparison of compliance automation platforms and consultancy-led implementation, including the five scenarios where the platform-only approach reliably fails.",
    date: "2026-03-25",
    category: "Advisory",
    readingTime: "7 min read",
  },
  {
    slug: "iso-27001-projects-over-budget",
    title: "Why Most ISO 27001 Projects Run Over Budget (And the Four Red Flags to Watch For in a Proposal)",
    description:
      "Roughly 60 percent of ISO 27001 projects in the UK come in over budget. This guide identifies the four red flags at the proposal stage and the contract mechanics that prevent overrun.",
    date: "2026-03-24",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "20-person-company-iso-27001",
    title: "Can a 20-Person Company Really Get ISO 27001 Certified? A Direct Answer.",
    description:
      "ISO 27001 was designed to scale to organisations of any size. This guide explains how the standard scales, what genuinely gets easier at smaller scale, and the one thing that is harder.",
    date: "2026-03-23",
    category: "ISO 27001",
    readingTime: "7 min read",
  },
  {
    slug: "eu-ai-act-uk-companies",
    title: "EU AI Act Preparation for UK Companies: What You Actually Need to Do Before August 2026",
    description:
      "The EU AI Act applies to UK companies whose AI output is used in the EU, regardless of where they are headquartered. This guide maps the obligations and provides a 90-day action plan.",
    date: "2026-03-22",
    category: "AI Governance",
    readingTime: "8 min read",
  },
  {
    slug: "iso-42001-vs-eu-ai-act",
    title: "ISO 42001 vs the EU AI Act: What Enterprise Buyers Actually Expect You to Hold",
    description:
      "ISO 42001 and the EU AI Act are not interchangeable. This guide explains the structural relationship between them and how to position your AI governance posture credibly.",
    date: "2026-03-21",
    category: "AI Governance",
    readingTime: "8 min read",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <section className="relative py-24 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary to-primary-dark pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Blog"
          title="Insights & Guides"
          description="Expert perspectives on ISO certification, cybersecurity, compliance, and AI governance for UK technology companies."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card variant="glass" className="h-full flex flex-col">
                  {/* Category tag */}
                  <span className="inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full mb-4">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden="true">,</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <span className="text-accent text-sm font-semibold">
                      Read more &rarr;
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              Need expert guidance?
            </h3>
            <p className="text-gray-400 mb-6">
              Book a free consultation with our compliance team to discuss your
              certification needs.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Book Free Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
