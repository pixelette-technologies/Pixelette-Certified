import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ProblemSection from "@/components/sections/ProblemSection";
import ThreeStepProcess from "@/components/sections/ThreeStepProcess";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Differentiators from "@/components/sections/Differentiators";
import Testimonials from "@/components/sections/Testimonials";
import Certifications from "@/components/sections/Certifications";
import Newsletter from "@/components/sections/Newsletter";
import CTASection from "@/components/sections/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Shield, ArrowRight, Brain, UserCheck, FileCheck } from "lucide-react";

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
          name: "Pixelette Certified",
          url: "https://pixelettecertified.com",
          description:
            "UK-headquartered ISO certification and compliance consultancy. ISO 27001, ISO 42001, Cyber Essentials, GDPR, vCISO, vDPO, SOC 2, penetration testing, and AI governance. Globally delivered across UK, UAE, Saudi Arabia, Qatar, EU, Americas, and APAC.",
        }}
      />
      <Hero />

      {/* ISO 27001 Certified Practice badge */}
      <div className="bg-primary-dark/50 py-3 border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-3">
          <Shield className="h-5 w-5 text-accent shrink-0" />
          <p className="text-sm text-gray-300">
            <strong className="text-white">ISO 27001 Certified Practice</strong> — We hold the same certification we help you achieve.
          </p>
        </div>
      </div>

      <TrustBar />

      {/* Buyer-intent pathways */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "I need certification to close a specific deal", href: "/services/iso-27001", icon: FileCheck },
              { label: "I need to build a compliance programme from scratch", href: "/services", icon: Shield },
              { label: "I need AI governance certification", href: "/services/iso-42001", icon: Brain },
              { label: "I need ongoing security leadership", href: "/services/vciso", icon: UserCheck },
            ].map((path) => (
              <Link
                key={path.href + path.label}
                href={path.href}
                className="group flex items-start gap-3 rounded-xl p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <path.icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors leading-snug">
                  {path.label}
                  <ArrowRight className="inline h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProblemSection />

      {/* Commercial Impact section */}
      <section className="py-20 lg:py-28 bg-primary-dark/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Commercial Impact"
            title="The Commercial Impact of Getting Certified"
          />
          <div className="text-center mb-8">
            <p className="text-xl text-accent font-semibold">
              Certification is not a cost line. It is a revenue unlock.
            </p>
          </div>
          <div className="space-y-4 mb-8">
            {[
              "50+ certifications delivered across banking, healthcare, SaaS, AI, manufacturing, and government supply chains.",
              "98% first-attempt pass rate, meaning your audit fee, your internal time, and your deal timeline are protected.",
              "10 weeks from kick-off to certificate, fast enough to unblock a procurement gate, slow enough to do it properly.",
              "One client closed a major bank contract within 30 days of certification (see FinTech case study).",
            ].map((point) => (
              <Card key={point} variant="glass" hover={false} className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">{point}</p>
              </Card>
            ))}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed text-center">
            Fixed-fee. Senior-led. Backed by the Pixelette Pass-First Guarantee: if a failure occurs due to a gap in our documentation, we cover the remediation at no additional cost.
          </p>
        </div>
      </section>

      <ThreeStepProcess />

      {/* Urgency messaging */}
      <section className="py-12 lg:py-16 bg-accent/5 border-y border-accent/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-300 text-sm leading-relaxed">
            Our 10-week delivery cycle means engagements started today complete before the end of Q2 2026. Engagements started after May complete in Q3. If you have a procurement deadline, fiscal year-end, or EU AI Act milestone in view, the calendar, not the contract, is your binding constraint.
          </p>
        </div>
      </section>

      <ServicesGrid />

      {/* ISO 42001 First-Mover section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary-dark to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-4">
            The AI Governance First-Mover Advantage
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
            ISO 42001 certification before your competitors. Delivered by a PECB-certified Lead Auditor, among the first in the UK market.
          </p>
          <Button href="/services/iso-42001" size="lg">
            Learn About ISO 42001 <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <Differentiators />

      {/* Pass-First Guarantee */}
      <section className="py-12 lg:py-16 bg-primary-dark/50 border-y border-accent/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xl font-bold text-white mb-3">The Pixelette Pass-First Guarantee</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            98% First-Attempt Pass Rate. If a failure occurs due to a gap in our documentation, we cover the remediation at no additional cost.
          </p>
        </div>
      </section>

      <Testimonials />
      <Certifications />
      <Newsletter />
      <CTASection />
    </>
  );
}
