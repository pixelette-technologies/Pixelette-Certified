import Link from "next/link";
import { Shield, ShieldCheck, Globe, Leaf, Brain, Lock, UserCheck, FileSearch, Bug, Scale } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/icons";
import { services } from "@/data/services";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
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

const PAGES_WITH_ROUTES = new Set([
  "iso-27001", "iso-22301", "iso-9001", "iso-14001", "iso-42001",
  "cyber-essentials", "vciso", "vdpo", "penetration-testing", "gdpr-privacy",
]);

export default function ServicesGrid() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="Our Services"
          title="One Partner for ISO, Cyber Security, AI Governance, and Privacy"
          description="From ISO certification to ongoing security leadership, we cover the full compliance landscape for businesses across every industry, in every market."
        />

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.filter((service) => PAGES_WITH_ROUTES.has(service.slug)).map((service) => {
            const IconComponent = iconMap[service.slug] || Shield;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                aria-label={`Learn more about ${service.shortTitle}, ${service.description}`}
                className="card flex h-full flex-col p-6 transition-colors duration-150 hover:border-line-strong"
              >
                <IconComponent className="h-5 w-5 text-brand" strokeWidth={1.6} />
                <h3 className="h4 mt-4">{service.shortTitle}</h3>
                <p className="small mt-2 flex-1">{service.description}</p>
                <span className="flink mt-4 text-sm font-medium text-brand">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/services" className="flink text-sm font-medium text-brand hover:text-brand-hover">
            View all services <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
