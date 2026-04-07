"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Quote, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import JsonLd from "@/components/seo/JsonLd";

interface CaseStudyMetric {
  value: string;
  label: string;
}

interface CaseStudyData {
  slug: string;
  client: string;
  industry: string;
  employees: string;
  certifications: string[];
  timeline: string;
  overview: string;
  challenge: string[];
  solution: string[];
  metrics: CaseStudyMetric[];
  testimonial: { quote: string; author: string; role: string };
  relatedServices: { title: string; href: string }[];
}

export default function CaseStudyClient({ study }: { study: CaseStudyData }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${study.client} - ${study.certifications.join(" + ")} Case Study`,
          description: study.overview,
          publisher: { "@type": "Organization", name: "Pixelette Certified" },
        }}
      />
      <section className="bg-primary py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-accent hover:text-accent-light text-sm font-semibold mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Case Studies
          </Link>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <div className="flex flex-wrap gap-2 mb-4">
              {study.certifications.map((cert) => (
                <span key={cert} className="bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-accent/20">{cert}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">{study.client}</h1>
            <p className="text-gray-400 text-lg">{study.industry}, {study.employees}, {study.timeline}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-primary-dark py-12 border-y border-white/5">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {study.metrics.map((metric) => (
            <motion.div key={metric.label} variants={staggerItem} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-accent">{metric.value}</div>
              <div className="text-sm text-gray-400 mt-1">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Overview</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{study.overview}</p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-white mb-6">The Challenge</h2>
          {study.challenge.map((p, i) => (<p key={i} className="text-gray-300 leading-relaxed mb-4">{p}</p>))}
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Our Solution</h2>
          {study.solution.map((p, i) => (<p key={i} className="text-gray-700 leading-relaxed mb-4">{p}</p>))}
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <Quote className="h-8 w-8 text-accent/40 mb-4" />
            <p className="text-white text-lg italic leading-relaxed mb-6">&ldquo;{study.testimonial.quote}&rdquo;</p>
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white">{study.testimonial.author}</p>
              <p className="text-sm text-gray-400">{study.testimonial.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-primary mb-8">Services Used</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {study.relatedServices.map((svc) => (
              <Link key={svc.href} href={svc.href}>
                <Card variant="white" className="text-center h-full">
                  <h3 className="font-semibold text-primary">{svc.title}</h3>
                  <span className="text-sm text-accent mt-2 inline-flex items-center gap-1">Learn more <ArrowRight className="h-3 w-3" /></span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-dark">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to achieve the same results?</h2>
          <p className="text-gray-400 mb-8">Book a free gap analysis to discuss your certification needs.</p>
          <Button href="/contact" size="lg">See Your 10-Week Certification Roadmap</Button>
        </div>
      </section>
    </>
  );
}
