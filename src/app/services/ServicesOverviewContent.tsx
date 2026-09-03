import Link from "next/link";
import { Shield, ShieldCheck, Globe, Leaf, Brain, Lock, UserCheck, FileSearch, Bug, Scale } from "lucide-react";
import type { Service } from "@/data/services";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import CTASection from "@/components/sections/CTASection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ArrowRight } from "@/components/ui/icons";

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
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Services" }]} />

          <div className="mt-8 max-w-[52ch]">
            <h1 className="h1p">Our services</h1>
            <p className="lead mt-6">
              Everything You Need to Be Enterprise-Ready. ISO certification, cybersecurity, AI governance, and privacy compliance. UK headquartered, globally delivered, across every sector.
            </p>
            <div className="mt-9">
              <Button href="/contact" size="lg">
                See Your 10 Week Certification Roadmap
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories Grid ─── */}
      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid gap-3.5 md:grid-cols-2">
            {groupedServices.map((category) => (
              <div key={category.key} className="card flex flex-col">
                {/* Category header */}
                <Eyebrow className="mb-2">{category.label}</Eyebrow>
                <h2 className="h4">{category.label}</h2>
                <p className="small mt-2">{category.description}</p>

                {/* Service cards inside category */}
                <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((service) => {
                    const Ic = iconMap[service.slug] || Shield;
                    return (
                      <Link
                        key={service.slug}
                        href={serviceHref(service.slug)}
                        className="tile flex h-full flex-col p-4 transition-colors duration-150 hover:border-line-strong"
                      >
                        <div className="mb-2 flex items-center gap-2.5">
                          <Ic className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} />
                          <h3 className="text-sm font-semibold leading-tight text-ink">
                            {service.shortTitle}
                          </h3>
                        </div>
                        <p className="mb-3 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand">
                          Learn more <ArrowRight size={12} />
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
