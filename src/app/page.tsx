import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ProblemSection from "@/components/sections/ProblemSection";
import ThreeStepProcess from "@/components/sections/ThreeStepProcess";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Differentiators from "@/components/sections/Differentiators";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import CTASection from "@/components/sections/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/icons";
import { Shield, Brain, UserCheck, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://pixelettecertified.com",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://pixelettecertified.com/#website",
          name: "Pixelette Certified",
          url: "https://pixelettecertified.com",
          description:
            "UK-headquartered ISO certification and compliance consultancy. ISO 27001, ISO 42001, Cyber Essentials, GDPR, vCISO, vDPO, SOC 2, penetration testing, and AI governance. Globally delivered across UK, UAE, Saudi Arabia, Qatar, EU, Americas, and APAC.",
          publisher: { "@id": "https://pixelettecertified.com/#organization" },
        }}
      />
      <Hero />

      {/* ISO 27001 Certified Practice badge */}
      <div className="border-y border-line bg-band py-3.5">
        <div className="wrap flex items-center justify-center gap-3">
          <Shield className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} aria-hidden="true" />
          <p className="small text-center">
            <strong className="font-semibold text-ink">ISO 27001 Certified Practice</strong> — We hold the same certification we help you achieve.
          </p>
        </div>
      </div>

      <TrustBar />

      {/* Buyer-intent pathways */}
      <section className="sec-sm">
        <div className="wrap">
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "I need certification to close a specific deal", href: "/services/iso-27001", icon: FileCheck },
              { label: "I need to build a compliance programme from scratch", href: "/services", icon: Shield },
              { label: "I need AI governance certification", href: "/services/iso-42001", icon: Brain },
              { label: "I need ongoing security leadership", href: "/services/vciso", icon: UserCheck },
            ].map((path) => (
              <Link
                key={path.href + path.label}
                href={path.href}
                className="card flex items-start gap-3 p-5 transition-colors duration-150 hover:border-line-strong"
              >
                <path.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <span className="text-sm leading-snug text-body">
                  {path.label}
                  <ArrowRight size={13} className="ml-1.5 text-brand" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProblemSection />

      {/* Commercial Impact section */}
      <section className="sec band-alt">
        <div className="wrap">
          <SectionHeading
            label="Commercial Impact"
            title="The Commercial Impact of Getting Certified"
          />

          <p className="lead max-w-[46ch] font-medium text-brand">
            Certification is not a cost line. It is a revenue unlock.
          </p>

          <ul className="list-none mt-9 space-y-3.5">
            {[
              "50+ certifications delivered across banking, healthcare, SaaS, AI, manufacturing, and government supply chains.",
              "98% first-attempt pass rate, meaning your audit fee, your internal time, and your deal timeline are protected.",
              "10 weeks from kick-off to certificate, fast enough to unblock a procurement gate, slow enough to do it properly.",
              "FinTech clients have used certification to unlock enterprise banking contracts (see FinTech case study).",
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-1 shrink-0 text-brand">
                  <Check size={16} />
                </span>
                <span className="small">{point}</span>
              </li>
            ))}
          </ul>

          <p className="small mt-9 max-w-[72ch]">
            Fixed-fee. Senior-led. Backed by the Pixelette Pass-First Guarantee: if a failure occurs due to a gap in our documentation, we cover the remediation at no additional cost.
          </p>
        </div>
      </section>

      <ThreeStepProcess />

      {/* Urgency messaging */}
      <section className="border-y border-line bg-band py-12 lg:py-14">
        <div className="wrap">
          <p className="body mx-auto text-center">
            Our 10-week delivery cycle means engagements started today complete before the end of Q2 2026. Engagements started after May complete in Q3. If you have a procurement deadline, fiscal year-end, or EU AI Act milestone in view, the calendar, not the contract, is your binding constraint.
          </p>
        </div>
      </section>

      <ServicesGrid />

      {/* ISO 42001 First-Mover section */}
      <section className="sec band-alt">
        <div className="wrap flex flex-col justify-between gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div>
            <Brain className="h-6 w-6 text-brand" strokeWidth={1.6} aria-hidden="true" />
            <h2 className="h2 mt-5 max-w-[20ch]">
              The AI Governance First-Mover Advantage
            </h2>
            <p className="body mt-5">
              ISO 42001 certification before your competitors. Delivered by a PECB-certified Lead Auditor, among the first in the UK market.
            </p>
          </div>

          <div className="shrink-0">
            <Button href="/services/iso-42001" size="lg" iconRight={<ArrowRight size={16} />}>
              Learn About ISO 42001
            </Button>
          </div>
        </div>
      </section>

      <Differentiators />

      {/* Pass-First Guarantee */}
      <section className="border-y border-line py-12 lg:py-14">
        <div className="wrap mx-auto max-w-[72ch] text-center">
          <h3 className="h4">The Pixelette Pass-First Guarantee</h3>
          <p className="small mt-3">
            98% First-Attempt Pass Rate. If a failure occurs due to a gap in our documentation, we cover the remediation at no additional cost.
          </p>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
      <CTASection />
    </>
  );
}
