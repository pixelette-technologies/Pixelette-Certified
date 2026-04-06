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
    slug: "iso-27001-complete-guide-2026",
    title: "ISO 27001 in 2026: The Complete Guide for UK Technology Companies",
    description:
      "Everything you need to know about ISO 27001 certification in 2026, updated requirements, costs, timelines, and what UK tech companies must prepare for.",
    date: "2026-03-15",
    category: "ISO 27001",
    readingTime: "12 min read",
  },
  {
    slug: "cyber-essentials-vs-iso-27001",
    title: "Cyber Essentials vs ISO 27001: Which Does Your Business Actually Need?",
    description:
      "A practical comparison of the two most common UK certifications. When Cyber Essentials is enough, when you need ISO 27001, and when you need both.",
    date: "2026-03-08",
    category: "Compliance",
    readingTime: "8 min read",
  },
  {
    slug: "enterprise-security-questionnaire-without-iso-27001",
    title: "How to Answer an Enterprise Security Questionnaire Without ISO 27001",
    description:
      "Strategies for handling security questionnaires when you do not yet have ISO 27001, and why getting certified makes the process ten times easier.",
    date: "2026-02-28",
    category: "Advisory",
    readingTime: "7 min read",
  },
  {
    slug: "iso-42001-ai-companies",
    title: "ISO 42001: Why AI Companies Need This Certification Now",
    description:
      "The EU AI Act is coming. ISO 42001 is the governance framework that proves your AI is built responsibly. Here is what you need to know.",
    date: "2026-02-20",
    category: "AI Governance",
    readingTime: "10 min read",
  },
  {
    slug: "real-cost-iso-27001-certification-uk",
    title: "The Real Cost of ISO 27001 Certification in the UK",
    description:
      "A transparent breakdown of ISO 27001 certification costs in 2026, consultancy fees, certification body fees, tooling, and the hidden costs nobody mentions.",
    date: "2026-02-12",
    category: "ISO 27001",
    readingTime: "9 min read",
  },
  {
    slug: "vciso-vs-full-time-ciso",
    title: "vCISO vs Full-Time CISO: What UK Scale-Ups Actually Need",
    description:
      "When does a virtual CISO make sense versus hiring full-time? A data-driven comparison for UK scale-ups from Series A to Series C.",
    date: "2026-02-05",
    category: "vCISO",
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
