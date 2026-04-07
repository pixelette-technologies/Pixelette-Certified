"use client";

import Link from "next/link";
import { ArrowRight, Shield, ShieldCheck, Globe, Leaf, Brain, Lock, UserCheck, FileSearch, Bug, Scale } from "lucide-react";
import type { Service } from "@/data/services";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";

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

interface CategoryGroup {
  key: string;
  label: string;
  description: string;
  services: Omit<Service, "icon">[];
}

interface ServicesOverviewContentProps {
  groupedServices: CategoryGroup[];
}

const PAGES_WITH_ROUTES = new Set([
  "iso-27001", "iso-22301", "iso-9001", "iso-14001", "iso-42001",
  "cyber-essentials", "vciso", "vdpo", "penetration-testing", "gdpr-privacy",
]);

function serviceHref(slug: string): string {
  return PAGES_WITH_ROUTES.has(slug) ? `/services/${slug}` : "/contact";
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Everything You Need to Be Enterprise-Ready. ISO certification, cybersecurity, AI governance, and privacy compliance. UK-headquartered, globally delivered, across every sector.
          </p>
          <Button href="/contact" size="lg">
            See Your 10-Week Certification Roadmap
          </Button>
        </div>
      </section>

      {/* ─── Categories Grid ─── */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {groupedServices.map((category) => (
              <div
                key={category.key}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 lg:p-8"
              >
                {/* Category header */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">
                  {category.label}
                </p>
                <h2 className="text-lg font-bold text-white mb-1">
                  {category.label}
                </h2>
                <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Service cards inside category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.services.map((service) => {
                    const Ic = iconMap[service.slug] || Shield;
                    return (
                      <Link
                        key={service.slug}
                        href={serviceHref(service.slug)}
                        className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-accent/30 transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <Ic className="h-4 w-4 text-accent" />
                          </div>
                          <h3 className="font-semibold text-sm text-white group-hover:text-accent transition-colors leading-tight">
                            {service.shortTitle}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400 mb-3 flex-1 leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                        <span className="text-xs font-semibold text-accent inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                          Learn more <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTASection />
    </>
  );
}
