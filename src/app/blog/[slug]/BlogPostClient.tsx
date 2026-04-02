"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";

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

interface BlogPostClientProps {
  post: BlogPostData;
  relatedPosts: BlogPostData[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostClient({
  post,
  relatedPosts,
}: BlogPostClientProps) {
  return (
    <article className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary to-primary-dark pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* JSON-LD structured data */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: post.author,
              jobTitle: post.authorRole,
            },
            publisher: {
              "@type": "Organization",
              name: "Pixelette Certified",
              url: "https://pixelettecertified.co.uk",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://pixelettecertified.co.uk/blog/${post.slug}`,
            },
          }}
        />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-accent hover:text-accent-light transition-colors mb-8"
          >
            &larr; Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <span className="text-white font-medium">{post.author}</span>
                <span className="mx-1">&middot;</span>
                <span>{post.authorRole}</span>
              </div>
            </div>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </motion.header>

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {post.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-300 leading-relaxed mb-6 text-base lg:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="my-16 border-t border-white/10" />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              Related Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block"
                >
                  <Card variant="glass" className="h-full">
                    <span className="inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full mb-3">
                      {related.category}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug mb-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatDate(related.date)}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/30 backdrop-blur-md border border-accent/20 rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to get certified?
            </h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Book a free consultation to discuss your certification needs. Our
              team will assess your current position and recommend the fastest
              path to compliance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Book Free Consultation
              </Button>
              <Button href="/services/iso-27001" variant="secondary" size="lg">
                View Services
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
