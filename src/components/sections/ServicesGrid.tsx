"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, ShieldCheck, Globe, Leaf, Brain, Lock, UserCheck, FileSearch, Bug, Scale } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { services } from "@/data/services";

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

export default function ServicesGrid() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-dark overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px] animate-float-slow" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent-light/[0.02] blur-[80px] animate-float-slower" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Our Services"
          title="Everything you need to get compliant"
          description="From ISO certification to ongoing security leadership, we cover the full compliance landscape for businesses across every industry, in every market."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.slug] || Shield;
            return (
              <motion.div key={service.slug} variants={staggerItem}>
                <Link
                  href={`/services/${service.slug}`}
                  aria-label={`Learn more about ${service.shortTitle} — ${service.description}`}
                  className="group flex flex-col h-full rounded-2xl p-6 glass-card transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4 group-hover:border-accent/50 group-hover:shadow-glow transition-all duration-500">
                    <IconComponent className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {service.shortTitle}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 flex-1">
                    {service.description}
                  </p>
                  <span className="text-sm font-semibold text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
