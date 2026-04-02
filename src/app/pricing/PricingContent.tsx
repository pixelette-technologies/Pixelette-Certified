"use client";

import { motion } from "framer-motion";
import { Info, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import CTASection from "@/components/sections/CTASection";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  Pricing data                                                       */
/* ------------------------------------------------------------------ */

interface PricingRow {
  service: string;
  href: string;
  essentials: string | null;
  professional: string | null;
  enterprise: string | null;
}

const certificationPricing: PricingRow[] = [
  {
    service: "ISO 27001",
    href: "/services/iso-27001",
    essentials: "£8,500",
    professional: "£13,500",
    enterprise: "£22,000",
  },
  {
    service: "ISO 22301",
    href: "/services/iso-22301",
    essentials: "£9,500",
    professional: "£14,500",
    enterprise: "£24,000",
  },
  {
    service: "ISO 42001",
    href: "/services/iso-42001",
    essentials: "£10,000",
    professional: "£15,500",
    enterprise: "£26,000",
  },
  {
    service: "ISO 9001",
    href: "/services/iso-9001",
    essentials: "£7,500",
    professional: "£12,000",
    enterprise: "£19,000",
  },
  {
    service: "ISO 14001",
    href: "/services/iso-14001",
    essentials: "£8,000",
    professional: "£13,000",
    enterprise: "£20,000",
  },
  {
    service: "Cyber Essentials",
    href: "/services/cyber-essentials",
    essentials: "£1,800",
    professional: null,
    enterprise: null,
  },
  {
    service: "Cyber Essentials Plus",
    href: "/services/cyber-essentials",
    essentials: "£3,200",
    professional: null,
    enterprise: null,
  },
  {
    service: "GDPR & Privacy",
    href: "/services/gdpr-privacy",
    essentials: "£5,500",
    professional: "£9,000",
    enterprise: "£16,000",
  },
];

interface RetainerRow {
  service: string;
  href: string;
  price: string;
  note: string;
}

const retainerPricing: RetainerRow[] = [
  {
    service: "vCISO Basic",
    href: "/services/vciso",
    price: "£2,800",
    note: "per month — 10-12 hrs/month",
  },
  {
    service: "vCISO Standard",
    href: "/services/vciso",
    price: "£4,200",
    note: "per month — 18-22 hrs/month",
  },
  {
    service: "vCISO Enterprise",
    href: "/services/vciso",
    price: "£7,500",
    note: "per month — 22-30 hrs/month",
  },
  {
    service: "vDPO",
    href: "/services/vdpo",
    price: "£2,000",
    note: "per month — 8-10 hrs/month",
  },
];

interface OneOffRow {
  service: string;
  href: string;
  price: string;
  note: string;
}

const oneOffPricing: OneOffRow[] = [
  {
    service: "Penetration Testing",
    href: "/services/penetration-testing",
    price: "£2,800",
    note: "per application",
  },
  {
    service: "Gap Analysis",
    href: "/contact",
    price: "£1,500",
    note: "standalone assessment",
  },
];

const pricingFAQs = [
  {
    question: "Are certification body fees included in these prices?",
    answer:
      "No. All prices shown are Pixelette Certified consultancy fees. Certification body (CB) audit fees are separate and typically range from £4,500 to £8,000 depending on the standard, your organisation size, and the certification body you choose. We can recommend UKAS-accredited certification bodies and help you obtain competitive quotes.",
  },
  {
    question: "What is the difference between Essentials, Professional, and Enterprise tiers?",
    answer:
      "Essentials covers the core implementation: gap analysis, documentation, risk assessment, internal audit, and audit support. Professional adds staff training, post-certification support (typically 6 months vCISO or Year 1 surveillance support). Enterprise is for larger or regulated organisations and includes extended vCISO retainers, multi-site coverage, and Year 1 + 2 surveillance audit support.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. We offer milestone-based payment for all certification projects. Typically: 30% at kickoff, 40% at documentation delivery, and 30% at certification. For retainer services (vCISO, vDPO), we invoice monthly.",
  },
  {
    question: "What if we need multiple certifications?",
    answer:
      "We offer significant discounts for bundled certifications. ISO 27001 + ISO 22301, for example, shares 40-50% of documentation and controls. Contact us for a custom quote and we will build a combined timeline that saves you time and money.",
  },
  {
    question: "Is the gap analysis really free?",
    answer:
      "The initial 30-minute gap analysis consultation is free and delivered remotely. This gives you a high-level view of your current position and what certification requires. The standalone £1,500 gap analysis is a detailed, documented assessment with a formal remediation roadmap.",
  },
  {
    question: "What happens after we get certified?",
    answer:
      "ISO certifications require annual surveillance audits (Year 1 and Year 2) and a full re-certification audit in Year 3. Our Professional and Enterprise tiers include surveillance audit support. We also offer vCISO retainers for ongoing security governance between audits.",
  },
];

/* ------------------------------------------------------------------ */
/*  Tier descriptions for mobile cards                                 */
/* ------------------------------------------------------------------ */

const tiers = [
  {
    name: "Essentials",
    audience: "Startups & SMEs up to 50 employees",
    description: "Core implementation: gap analysis, documentation, risk assessment, internal audit, and full audit support.",
  },
  {
    name: "Professional",
    audience: "Scale-ups with 50-150 employees",
    description: "Everything in Essentials plus staff training, vCISO support, and Year 1 surveillance audit coverage.",
  },
  {
    name: "Enterprise",
    audience: "150+ employees or regulated sectors",
    description: "Full-service engagement with extended vCISO, multi-site coverage, GDPR alignment, and Year 1 + 2 surveillance.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PricingContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #14AAA9 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <SectionLabel className="mb-4 block">Pricing</SectionLabel>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Straightforward pricing. No surprises.
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every price is published. Every engagement is fixed-fee. You know
            exactly what you are paying before any work begins.
          </p>
        </motion.div>
      </section>

      {/* Certification body note */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card variant="glass" hover={false} className="flex items-start gap-4">
              <div className="shrink-0 mt-0.5">
                <Info className="h-5 w-5 text-accent" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">Important:</strong> All prices
                shown are Pixelette Certified consultancy fees. Certification
                body audit fees are separate and typically range from{" "}
                <strong className="text-white">£4,500 &ndash; £8,000</strong>{" "}
                depending on the standard, organisation size, and chosen
                certification body.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Tier descriptions */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {tiers.map((tier, i) => (
              <motion.div key={tier.name} variants={staggerItem}>
                <Card
                  variant={i === 1 ? "dark" : "glass"}
                  hover={false}
                  className={
                    i === 1
                      ? "border-accent/40 ring-1 ring-accent/20"
                      : ""
                  }
                >
                  {i === 1 && (
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-accent mb-3">{tier.audience}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certification pricing table */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Certification Services"
            title="ISO, Cyber Essentials & GDPR"
            description="Fixed-fee packages from gap analysis through to certification."
          />

          {/* Desktop table */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">
                      Essentials
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-accent uppercase tracking-wider text-center">
                      Professional
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {certificationPricing.map((row) => (
                    <tr
                      key={row.service}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <a
                          href={row.href}
                          className="text-white font-semibold hover:text-accent transition-colors inline-flex items-center gap-1.5 group"
                        >
                          {row.service}
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.essentials ? (
                          <span className="text-white font-semibold">
                            {row.essentials}
                          </span>
                        ) : (
                          <span className="text-gray-600">&mdash;</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-accent/[0.03]">
                        {row.professional ? (
                          <span className="text-white font-semibold">
                            {row.professional}
                          </span>
                        ) : (
                          <span className="text-gray-600">&mdash;</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.enterprise ? (
                          <span className="text-white font-semibold">
                            {row.enterprise}
                          </span>
                        ) : (
                          <span className="text-gray-600">&mdash;</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Mobile cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:hidden space-y-4"
          >
            {certificationPricing.map((row) => (
              <motion.div key={row.service} variants={staggerItem}>
                <Card variant="glass" hover={false}>
                  <a
                    href={row.href}
                    className="text-white font-bold text-lg hover:text-accent transition-colors mb-3 block"
                  >
                    {row.service}
                  </a>
                  <div className="space-y-2 text-sm">
                    {row.essentials && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Essentials</span>
                        <span className="text-white font-semibold">
                          {row.essentials}
                        </span>
                      </div>
                    )}
                    {row.professional && (
                      <div className="flex justify-between">
                        <span className="text-accent">Professional</span>
                        <span className="text-white font-semibold">
                          {row.professional}
                        </span>
                      </div>
                    )}
                    {row.enterprise && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Enterprise</span>
                        <span className="text-white font-semibold">
                          {row.enterprise}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Retainer pricing */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Advisory Retainers"
            title="Virtual CISO (vCISO)"
            description="Senior security leadership on a flexible monthly retainer."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {retainerPricing.map((item, i) => (
              <motion.div key={item.service} variants={staggerItem}>
                <Card
                  variant={i === 1 ? "dark" : "glass"}
                  className={`h-full ${
                    i === 1 ? "border-accent/40 ring-1 ring-accent/20" : ""
                  }`}
                >
                  <h3 className="text-lg font-bold text-white mb-1">
                    {item.service}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-extrabold text-accent">
                      {item.price}
                    </span>
                    <span className="text-sm text-gray-400">/mo</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{item.note}</p>
                  <Button href={item.href} variant="secondary" size="sm" className="w-full">
                    Learn more
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* One-off services */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="One-Off Services"
            title="Testing & assessment"
            description="Standalone engagements for specific security needs."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            {oneOffPricing.map((item) => (
              <motion.div key={item.service} variants={staggerItem}>
                <Card variant="glass" className="h-full text-center">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {item.service}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-3xl font-extrabold text-accent">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{item.note}</p>
                  <Button href={item.href} variant="secondary" size="sm" className="w-full">
                    Learn more
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Pricing FAQ"
            title="Common pricing questions"
          />
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion items={pricingFAQs} />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Not sure which tier is right for you?"
        description="Book a free 30-minute gap analysis call. We will assess your current position, recommend the right services and tier, and give you a clear timeline and cost. No obligation."
      />
    </>
  );
}
