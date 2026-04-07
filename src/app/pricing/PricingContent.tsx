"use client";

import { motion } from "framer-motion";
import {
  Shield,
  FileCheck,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import CTASection from "@/components/sections/CTASection";
import FaqSchema from "@/components/seo/FaqSchema";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const promises = [
  {
    icon: FileCheck,
    title: "Fixed-fee proposal before any work begins",
    description:
      "Every engagement is scoped to your specific organisation, team size, existing controls, sector, and objectives. You receive a detailed fixed-fee proposal with full transparency on what is and is not included.",
  },
  {
    icon: Shield,
    title: "No hourly billing, no scope creep, no surprises",
    description:
      "Once your proposal is agreed, the price is locked. No unexpected invoices, no additional charges for revisions, no hourly clock ticking in the background.",
  },
  {
    icon: Award,
    title: "We beat any comparable quote by at least 10%",
    description:
      "When comparing quotes from compliance consultancies, bring us the number. We will deliver the same quality of certified outcome, with our 98% pass rate and practitioner-led delivery, at a price that beats any comparable proposal.",
  },
];

const included = [
  "Scoping and gap analysis, no additional charge",
  "All documentation, policies, and procedures, written by certified practitioners",
  "Implementation consultancy throughout the build phase",
  "Internal audit before Stage 2",
  "Stage 1 and Stage 2 external audit accompaniment",
  "Post-certification support, included for the first 90 days",
  "For SME engagements: certification body audit fee included in the project price",
];

const multiCertOverlaps = [
  { combo: "ISO 27001 + ISO 42001", overlap: "60% control overlap" },
  { combo: "ISO 27001 + ISO 27701", overlap: "Natural privacy extension" },
  { combo: "ISO 27001 + ISO 22301", overlap: "40-50% documentation overlap" },
  { combo: "ISO 9001 + ISO 14001", overlap: "Substantial management system overlap" },
];

const pricingFAQs = [
  {
    question: "How is your pricing structured?",
    answer:
      "Every engagement is scoped individually and priced as a fixed-fee project. You receive a full proposal before any work begins, no hourly billing, no scope creep charges, no surprise invoices. We commit to beating any comparable quote by at least 10%.",
  },
  {
    question: "Are certification body fees included?",
    answer:
      "For SME engagements, the certification body audit fee is included in our project price. For larger organisations, CB fees are separate, typically £4,500 to £8,000 depending on the standard, your organisation size, and the chosen certification body. We recommend UKAS-accredited certification bodies and help you obtain competitive quotes.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. Payment plans are available, typically structured as an initial deposit at kickoff followed by milestone-based payments. Speak to our team to arrange terms that work for your business.",
  },
  {
    question: "What if we need multiple certifications?",
    answer:
      "Multi-certification engagements benefit from significant control overlap, ISO 27001 + ISO 42001 share 60% of controls, ISO 27001 + ISO 27701 integrate naturally, ISO 9001 + ISO 14001 overlap substantially. We price combined engagements efficiently and typically deliver dual certifications faster than two sequential projects.",
  },
  {
    question: "Is the gap analysis really free?",
    answer:
      "Yes. The free gap analysis is a 30-minute call with a senior consultant. We assess your current posture, identify applicable standards for your business and jurisdiction, establish a realistic timeline, and provide an indicative cost. No obligation. No sales pressure.",
  },
  {
    question: "What happens after we get certified?",
    answer:
      "ISO certificates are valid for 3 years subject to annual surveillance audits. We offer surveillance audit accompaniment, vCISO retainers for ongoing governance, vDPO retainers for data protection, and managed advisory subscriptions to keep your programme current and improving.",
  },
  {
    question: "Do you work with clients outside the UK?",
    answer:
      "Yes. We deliver globally, with active engagements across the UK, UAE, Saudi Arabia, Qatar, EU, Americas, and Asia Pacific. Our UK credentials are internationally recognised, and we have specific expertise in Gulf regulatory frameworks including SAMA CSF, NCA ECC/CCC, and QCB/NIA.",
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
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-6">
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Transparent pricing, scoped to your business
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            We do not publish price lists because no two engagements are identical.
            What we guarantee: a fixed-fee proposal before work starts, full
            transparency, and a commitment to beat any comparable quote by at least 10%.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact" size="lg">
              Book Your Free Gap Analysis
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Have a quote? We will beat it by 10%
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Our pricing promise */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Promise"
            title="How we price every engagement"
            description="Every proposal is scoped to your specific organisation, team size, existing controls, sector, and objectives."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {promises.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <Card variant="glass" className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What is included */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Included"
            title="What every engagement delivers"
            description="Regardless of the standard or your organisation size, every Pixelette Certified engagement includes:"
          />
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card variant="glass" hover={false}>
              <ul className="space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Certification body fees note */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
              <div>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">
                  <strong className="text-white">Certification body audit fees:</strong>{" "}
                  For SME engagements, the certification body audit fee is included in
                  the project price. For larger organisations, CB fees are separate,
                  typically{" "}
                  <strong className="text-white">£4,500 to £8,000</strong>{" "}
                  depending on the standard, your organisation size, and the chosen
                  certification body. We recommend UKAS-accredited certification bodies
                  and can help you obtain competitive quotes.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-white">Payment plans:</strong>{" "}
                  Available for all engagements. Typically structured as an initial
                  deposit at kickoff followed by milestone-based payments.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Multi-certification savings */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Multi-Certification"
            title="Combined certifications save time and money"
            description="Many ISO standards share significant control overlap. We price combined engagements efficiently and typically deliver dual certifications faster than two sequential projects."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {multiCertOverlaps.map((item) => (
              <motion.div key={item.combo} variants={staggerItem}>
                <Card variant="glass" hover={false} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.combo}</p>
                    <p className="text-accent text-xs">{item.overlap}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to get started */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mb-6">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
              Your free 30-minute gap analysis
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Every engagement begins with a free, no-obligation gap analysis. In 30
              minutes, our consultants will assess your current posture, identify which
              standards apply, provide a realistic timeline, and confirm our commitment
              to beat any comparable quote by at least 10%. Most clients book their first
              paid engagement within two weeks.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/contact" size="lg">
                Book Your Free Gap Analysis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
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
            <FaqSchema faqs={pricingFAQs} />
            <Accordion items={pricingFAQs} />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Ready to get started?"
        description="Book a free 30-minute gap analysis call. We will assess your current position, recommend the right services, and give you a clear timeline. No obligation. No sales pressure."
      />
    </>
  );
}
