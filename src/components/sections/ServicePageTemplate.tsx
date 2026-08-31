import Link from "next/link";
import { Shield, ShieldCheck, Globe, Leaf, Brain, Lock, UserCheck, FileSearch, Bug, Scale } from "lucide-react";
import type { Service } from "@/data/services";
import { getRelatedServices } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import CTASection from "@/components/sections/CTASection";
import FaqSchema from "@/components/seo/FaqSchema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ArrowRight, Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type SerializableService = Omit<Service, 'icon'>;

interface ServicePageTemplateProps {
  service: SerializableService;
}

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

/**
 * Drives all eleven service routes. Converted to the guide's interior-page
 * layout: left-aligned hero on the offset wash, the process timeline as a
 * bordered divider strip (it runs to five stages on the ISO services, so the
 * guide's 4-up horizontal strip is stacked rather than columned), and the
 * pricing tiers as cards where the highlighted one is marked by a 3px brand
 * top border instead of a filled green block.
 */
export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const relatedServices = getRelatedServices(service.relatedSlugs);
  const IconComponent = iconMap[service.slug] || Shield;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs schema={false} items={[{ name: "Services", href: "/services" }, { name: service.shortTitle }]} />

          <div className="mt-8 max-w-[52ch]">
            <IconComponent className="h-6 w-6 text-brand" strokeWidth={1.6} />

            <h1 className="h1p mt-6">{service.title}</h1>

            <p className="lead mt-6">{service.description}</p>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Pill>Fixed-fee engagement</Pill>
              <Pill>{service.process.length} phases</Pill>
            </div>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href="/contact" size="lg">
                Get Started
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                See Your 10-Week Certification Roadmap
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Overview ─── */}
      <section className="sec band-alt">
        <div className="wrap">
          <SectionHeading label="Overview" title="What is this service?" className="mb-6" />
          <p className="body max-w-[66ch]">{service.longDescription}</p>
        </div>
      </section>

      {/* ─── What We Deliver ─── */}
      <section className="sec">
        <div className="wrap">
          <SectionHeading
            label="Deliverables"
            title="What we deliver"
            description="Every engagement includes these core deliverables, tailored to your organisation."
          />

          <div className="grid gap-3.5 sm:grid-cols-2">
            {service.features.map((feature, i) => (
              <div key={i} className="card flex items-start gap-3.5 p-5">
                <span className="mt-1 shrink-0 text-brand">
                  <Check size={16} />
                </span>
                <span className="text-[15px] leading-relaxed text-body">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Process ─── */}
      <section className="sec band-alt">
        <div className="wrap">
          <SectionHeading
            label="Our Process"
            title={service.category === "advisory" ? "How we engage with you" : "How we get you certified"}
            description={service.category === "advisory" ? "A structured onboarding and ongoing retainer model designed for your business." : "A proven, structured approach from kickoff to certification."}
          />

          <ol className="list-none overflow-hidden rounded-card border border-line-card">
            {service.process.map((step, i) => (
              <li
                key={i}
                className="grid gap-x-8 gap-y-3 border-b border-line-card bg-page p-7 last:border-b-0 md:grid-cols-[150px_1fr] md:p-[30px]"
              >
                <Eyebrow>{step.week}</Eyebrow>
                <div>
                  <h3 className="h4">{step.title}</h3>
                  <p className="small mt-2.5">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="sec">
        <div className="wrap">
          <SectionHeading
            label="Pricing"
            title="Transparent pricing"
            description="No hidden fees. No surprise invoices. Choose the tier that fits your organisation."
          />

          <div
            className={cn(
              "grid items-start gap-3.5",
              service.pricing.length === 1 && "mx-auto max-w-md",
              service.pricing.length === 2 && "mx-auto max-w-3xl sm:grid-cols-2",
              service.pricing.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {service.pricing.map((tier, i) => {
              const isHighlighted = service.pricing.length === 3 && i === 1;
              return (
                <div
                  key={tier.name}
                  className={cn("card flex h-full flex-col", isHighlighted && "card-feature")}
                >
                  {isHighlighted && (
                    <Pill tone="brand" className="mb-5 self-start">Most Popular</Pill>
                  )}

                  <h3 className="h4">{tier.name}</h3>
                  <p className="small mt-1.5">{tier.audience}</p>

                  <div className="mono mt-5 text-[22px] font-medium leading-tight tracking-tight text-brand">
                    {tier.price}
                  </div>

                  <div className="rule my-6" role="presentation" />

                  <ul className="mb-8 list-none flex-1 space-y-3">
                    {tier.features.map((feat, fi) => (
                      <li key={fi} className="flex gap-3">
                        <span className="mt-1 shrink-0 text-brand">
                          <Check size={15} />
                        </span>
                        <span className="small">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button href="/contact" variant={isHighlighted ? "primary" : "secondary"} fullWidth>
                    Get Started
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      {service.faqs.length > 0 && (
        <section className="sec band-alt">
          <div className="wrap max-w-[840px]">
            <SectionHeading label="FAQ" title="Frequently asked questions" />
            <FaqSchema faqs={service.faqs} />
            <Accordion items={service.faqs} />
          </div>
        </section>
      )}

      {/* ─── Related Services ─── */}
      {relatedServices.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SectionHeading
              label="Related Services"
              title="You may also need"
              description="Complementary services that strengthen your compliance posture."
            />

            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.slice(0, 3).map((related) => {
                const RelIcon = iconMap[related.slug] || Shield;
                return (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="card flex h-full flex-col p-6 transition-colors duration-150 hover:border-line-strong"
                  >
                    <RelIcon className="h-5 w-5 text-brand" strokeWidth={1.6} />
                    <h3 className="h4 mt-4">{related.shortTitle}</h3>
                    <p className="small mt-2 flex-1">{related.description}</p>
                    <span className="flink mt-4 text-sm font-medium text-brand">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <CTASection
        headline={`Ready to start your ${service.shortTitle} journey?`}
        description="Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs."
        primaryCta="See Your 10-Week Certification Roadmap"
        primaryHref="/contact"
        secondaryCta="Talk to a Consultant"
        secondaryHref="/contact"
      />
    </>
  );
}
