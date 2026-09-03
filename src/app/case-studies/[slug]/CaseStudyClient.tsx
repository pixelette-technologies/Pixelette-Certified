import Link from "next/link";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import StatTile from "@/components/ui/StatTile";
import { ArrowLeft, ArrowRight, QuoteGlyph } from "@/components/ui/icons";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { cn } from "@/lib/utils";

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
          publisher: { "@type": "Organization", "@id": "https://pixelettecertified.com/#organization", name: "Pixelette Certified" },
        }}
      />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Case Studies", href: "/case-studies" }, { name: study.client }]} />

          <Link href="/case-studies" className="flink mt-4 text-sm font-medium text-brand hover:text-brand-hover">
            <ArrowLeft size={14} /> Back to Case Studies
          </Link>

          <div className="mt-6 max-w-[52ch]">
            <div className="flex flex-wrap gap-2">
              {study.certifications.map((cert) => (
                <Pill key={cert} tone="brand">{cert}</Pill>
              ))}
            </div>
            <h1 className="h1p mt-6">{study.client}</h1>
            <p className="lead mt-5">
              {study.industry}, {study.employees}, {study.timeline}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-band py-12">
        <div className="wrap" data-reveal="">
          <div
            className={cn(
              "grid grid-cols-2 gap-3.5",
              study.metrics.length === 2 && "md:grid-cols-2",
              study.metrics.length === 3 && "md:grid-cols-3",
              study.metrics.length >= 4 && "md:grid-cols-4"
            )}
          >
            {study.metrics.map((metric) => (
              <StatTile key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap max-w-[820px]" data-reveal="">
          <h2 className="h3">Overview</h2>
          <p className="body mt-5">{study.overview}</p>

          <h2 className="h3 mt-14">The challenge</h2>
          <div className="mt-5 space-y-4">
            {study.challenge.map((p, i) => (
              <p key={i} className="body">{p}</p>
            ))}
          </div>

          <h2 className="h3 mt-14">Our solution</h2>
          <div className="mt-5 space-y-4">
            {study.solution.map((p, i) => (
              <p key={i} className="body">{p}</p>
            ))}
          </div>

          <figure className="card mt-14">
            <QuoteGlyph />
            <blockquote className="mt-5 text-[18px] leading-[1.5] text-ink">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <span className="block text-sm font-semibold text-ink">{study.testimonial.author}</span>
              <span className="small block">{study.testimonial.role}</span>
            </figcaption>
          </figure>

          <h2 className="h3 mt-14">Services used</h2>
          <div className="mt-8 grid gap-3.5 md:grid-cols-3">
            {study.relatedServices.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="card flex h-full flex-col p-5 text-center transition-colors duration-150 hover:border-line-strong"
              >
                <h3 className="text-[15px] font-semibold text-ink">{svc.title}</h3>
                <span className="mt-2 inline-flex items-center justify-center gap-1.5 text-sm text-brand">
                  Learn more <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec band-closing">
        <div className="wrap max-w-[640px] text-center" data-reveal="">
          <h2 className="h2">Ready to achieve the same results?</h2>
          <p className="body mx-auto mt-5">Book a free gap analysis to discuss your certification needs.</p>
          <div className="mt-9">
            <Button href="/contact" size="lg">See Your 10 Week Certification Roadmap</Button>
          </div>
        </div>
      </section>
    </>
  );
}
