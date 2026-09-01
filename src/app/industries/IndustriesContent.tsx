import Link from "next/link";
import {
  Landmark, Cpu, Heart, GraduationCap, ShoppingCart,
  Building2, Scale, Wifi, Factory, Truck, Gavel, Zap, Radio,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Pill from "@/components/ui/Pill";
import Card from "@/components/ui/Card";
import CTASection from "@/components/sections/CTASection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ArrowRight, Check } from "@/components/ui/icons";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  fintech: Landmark,
  "ai-technology": Cpu,
  "saas-technology": Wifi,
  healthcare: Heart,
  "professional-services": Building2,
  "government-suppliers": Scale,
  "ecommerce-retail": ShoppingCart,
  education: GraduationCap,
  manufacturing: Factory,
  logistics: Truck,
  legal: Gavel,
  energy: Zap,
  telecommunications: Radio,
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
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Industries" }]} />

          <div className="mt-8 max-w-[52ch]">
            <Eyebrow className="mb-5">Who We Help</Eyebrow>
            <h1 className="h1p">Delivering Cyber Confidence Across Industries</h1>
            <p className="lead mt-6">
              Every industry faces unique compliance challenges. We bring specialist
              expertise to each sector, delivering certifications that unlock growth
              and protect your business.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid gap-3.5 md:grid-cols-2">
            {industries.map((industry) => {
              const IconComp = iconMap[industry.slug] || Building2;
              return (
                <div key={industry.slug} className="card flex h-full flex-col">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <IconComp className="mt-1 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} />
                    <div>
                      <h3 className="h3">{industry.title}</h3>
                      <p className="small mt-1.5">{industry.description}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-3.5">
                    {industry.stats.map((stat) => (
                      <div key={stat.label} className="tile">
                        <b className="!text-[20px]">{stat.value}</b>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Challenges */}
                  <div className="mt-6">
                    <Eyebrow as="p" className="mb-3">Key Challenges</Eyebrow>
                    <ul className="list-none space-y-2.5">
                      {industry.challenges.slice(0, 3).map((challenge) => (
                        <li key={challenge} className="flex gap-3">
                          <span className="mt-1 shrink-0 text-brand">
                            <Check size={15} />
                          </span>
                          <span className="small">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div className="mt-6">
                    <Eyebrow as="p" className="mb-3">Recommended Certifications</Eyebrow>
                    <div className="flex flex-wrap gap-2">
                      {industry.certifications.map((cert) => (
                        <Pill key={cert} tone="brand">{cert}</Pill>
                      ))}
                    </div>
                  </div>

                  {/* Case study snippet */}
                  <blockquote className="mt-6 border-l-2 border-brand pl-5 text-[15px] leading-relaxed text-body">
                    &ldquo;{industry.caseStudySnippet}&rdquo;
                  </blockquote>

                  {/* CTA */}
                  <div className="mt-auto pt-6">
                    <Link href="/contact" className="flink text-sm font-medium text-brand hover:text-brand-hover">
                      Get certified for {industry.shortTitle} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="sec">
        <div className="wrap" data-reveal="">
          <SectionHeading
            label="Why It Matters"
            title="Industry expertise drives faster certification"
            description="Generic consultancies apply the same template to every client. We understand your industry's specific regulatory landscape, common audit findings, and what your clients actually require."
          />

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Sector-Specific Scoping",
                description: "We know exactly which controls matter for your industry and which can be scoped out, reducing cost and timeline.",
              },
              {
                title: "Regulatory Mapping",
                description: "FCA, NHS Digital, DfE, EU AI Act, we map your certification to the regulations your industry faces.",
              },
              {
                title: "Auditor Expectations",
                description: "We know what auditors look for in your sector. No surprises at Stage 2 because we have seen every scenario.",
              },
              {
                title: "Client Requirements",
                description: "We understand what your enterprise clients actually need to see, not just the certificate, but the evidence behind it.",
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
              <Card key={item.title} className="h-full">
                <h3 className="h4">{item.title}</h3>
                <p className="small mt-2.5">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Not sure which certification your industry needs?"
        description="Book a free 30-minute gap analysis. We will assess your industry requirements, map the certifications that matter, and give you a realistic timeline and cost."
        primaryCta="See Your 10-Week Certification Roadmap"
        primaryHref="/contact"
        secondaryCta="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
