"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Landmark, Cpu, Heart, GraduationCap, ShoppingCart,
  Building2, Scale, Wifi, CheckCircle,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  fintech: Landmark,
  "ai-technology": Cpu,
  "saas-technology": Wifi,
  healthcare: Heart,
  "professional-services": Building2,
  "government-suppliers": Scale,
  "ecommerce-retail": ShoppingCart,
  education: GraduationCap,
};

interface IndustryData {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  challenges: string[];
  certifications: string[];
  caseStudySnippet: string;
  stats: { value: string; label: string }[];
}

interface IndustriesContentProps {
  industries: IndustryData[];
}

export default function IndustriesContent({ industries }: IndustriesContentProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-mesh">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[100px] animate-float-slower" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent-light/[0.03] blur-[80px] animate-float-slow" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <span className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-6 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Who We Help
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 gradient-text-white">
            Delivering Cyber Confidence Across Industries
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Every industry faces unique compliance challenges. We bring specialist
            expertise to each sector, delivering certifications that unlock growth
            and protect your business.
          </p>
        </motion.div>
      </section>

      {/* Industries Grid */}
      <section className="relative py-20 lg:py-28 bg-gradient-dark overflow-hidden">
        <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px] animate-float-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {industries.map((industry) => {
              const IconComp = iconMap[industry.slug] || Building2;
              return (
                <motion.div key={industry.slug} variants={staggerItem}>
                  <div className="group h-full glass-card rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center shrink-0 group-hover:border-accent/50 group-hover:shadow-glow transition-all duration-500">
                        <IconComp className="h-7 w-7 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold gradient-text-white">{industry.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{industry.description}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {industry.stats.map((stat) => (
                        <div key={stat.label} className="text-center px-2 py-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="text-lg font-extrabold gradient-text">{stat.value}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Challenges */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Key Challenges</h4>
                      <ul className="space-y-2">
                        {industry.challenges.slice(0, 3).map((challenge) => (
                          <li key={challenge} className="flex items-start gap-2 text-sm text-gray-400">
                            <CheckCircle className="h-4 w-4 text-accent/60 shrink-0 mt-0.5" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Certifications */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Recommended Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Case study snippet */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
                      <p className="text-sm text-gray-400 italic leading-relaxed">
                        &ldquo;{industry.caseStudySnippet}&rdquo;
                      </p>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-light transition-colors group-hover:gap-3"
                    >
                      Get certified for {industry.shortTitle} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="relative py-20 lg:py-28 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-white to-surface" />
        <div className="absolute top-[30%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[100px] animate-float-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Why It Matters"
            title="Industry expertise drives faster certification"
            description="Generic consultancies apply the same template to every client. We understand your industry's specific regulatory landscape, common audit findings, and what your clients actually require."
            dark={false}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Sector-Specific Scoping",
                description: "We know exactly which controls matter for your industry and which can be scoped out, reducing cost and timeline.",
              },
              {
                title: "Regulatory Mapping",
                description: "FCA, NHS Digital, DfE, EU AI Act — we map your certification to the regulations your industry faces.",
              },
              {
                title: "Auditor Expectations",
                description: "We know what auditors look for in your sector. No surprises at Stage 2 because we have seen every scenario.",
              },
              {
                title: "Client Requirements",
                description: "We understand what your enterprise clients actually need to see — not just the certificate, but the evidence behind it.",
              },
              {
                title: "Dual Certifications",
                description: "Many industries need multiple certifications. We leverage overlap to deliver them efficiently and cost-effectively.",
              },
              {
                title: "Ongoing Governance",
                description: "Post-certification support tailored to your industry's surveillance audit requirements and evolving regulations.",
              },
            ].map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <Card variant="white" className="h-full group">
                  <h3 className="font-bold text-primary text-lg mb-3 group-hover:text-accent-dark transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        headline="Not sure which certification your industry needs?"
        description="Book a free 30-minute gap analysis. We will assess your industry requirements, map the certifications that matter, and give you a realistic timeline and cost."
        primaryCta="Book Free Gap Analysis"
        primaryHref="/contact"
        secondaryCta="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
