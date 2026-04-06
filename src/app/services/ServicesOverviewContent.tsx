"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, ShieldCheck, Globe, Leaf, Brain, Lock, UserCheck, FileSearch, Bug, Scale } from "lucide-react";
import type { Service } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "iso-27001": Shield,
  "iso-22301": ShieldCheck,
  "iso-9001": Globe,
  "iso-14001": Leaf,
  "iso-42001": Brain,
  "cyber-essentials": Lock,
  "vciso": UserCheck,
  "vdpo": FileSearch,
  "penetration-testing": Bug,
  "gdpr-privacy": Scale,
};
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface CategoryGroup {
  key: string;
  label: string;
  description: string;
  services: Omit<Service, 'icon'>[];
}

interface ServicesOverviewContentProps {
  groupedServices: CategoryGroup[];
}

export default function ServicesOverviewContent({ groupedServices }: ServicesOverviewContentProps) {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #14AAA9 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            From ISO certification to ongoing security leadership, we cover the full compliance landscape for UK technology companies.
          </p>
          <Button href="/contact" size="lg">
            Book Free Gap Analysis
          </Button>
        </motion.div>
      </section>

      {/* ─── Service Categories ─── */}
      {groupedServices.map((category, catIdx) => (
        <section
          key={category.key}
          className={catIdx % 2 === 0 ? "py-20 lg:py-28 bg-surface" : "py-20 lg:py-28 bg-primary"}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label={category.label}
              title={category.label}
              description={category.description}
              dark={catIdx % 2 !== 0}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {category.services.map((service) => {
                const isDark = catIdx % 2 !== 0;
                return (
                  <motion.div key={service.slug} variants={staggerItem}>
                    <Link
                      href={`/services/${service.slug}`}
                      className={`group flex flex-col h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                        isDark
                          ? "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
                          : "bg-white border border-gray-100 shadow-lg shadow-black/5 hover:shadow-2xl"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                          isDark
                            ? "bg-accent/10 group-hover:bg-accent/20"
                            : "bg-accent/10 group-hover:bg-accent/20"
                        }`}
                      >
                        {(() => { const Ic = iconMap[service.slug] || Shield; return <Ic className="h-6 w-6 text-accent" />; })()}
                      </div>

                      <h3
                        className={`font-bold mb-2 transition-colors ${
                          isDark
                            ? "text-white group-hover:text-accent"
                            : "text-primary group-hover:text-accent-dark"
                        }`}
                      >
                        {service.shortTitle}
                      </h3>

                      <p
                        className={`text-sm mb-3 flex-1 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {service.description}
                      </p>

                      <p
                        className={`text-sm font-semibold mb-4 ${
                          isDark ? "text-accent" : "text-accent-dark"
                        }`}
                      >
                        Fixed-fee engagement
                      </p>

                      <span
                        className={`text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all ${
                          isDark ? "text-accent" : "text-accent-dark"
                        }`}
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      ))}

      {/* ─── CTA ─── */}
      <CTASection />
    </>
  );
}
