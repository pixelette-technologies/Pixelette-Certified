import {
  Shield,
  FileCheck,
  Users,
  Award,
  Info,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import CTASection from "@/components/sections/CTASection";
import FaqSchema from "@/components/seo/FaqSchema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ArrowRight, Check } from "@/components/ui/icons";

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
    title: "90 days post-certification support included",
    description:
      "Every engagement scoped to your business, your sector, and your audit body. 90 days post-certification support included as standard, with surveillance audit accompaniment and ongoing advisory available.",
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
      "Every engagement is scoped individually and priced as a fixed-fee project. You receive a full proposal before any work begins. No hourly billing, no scope creep charges, no surprise invoices. Every engagement scoped to your business, your sector, and your audit body, with 90 days post-certification support included as standard.",
  },
  {
    question: "Are certification body fees included?",
    answer:
      "For SME engagements, the certification body audit fee is included in our project price. For larger organisations, CB fees are separate, typically £4,500 to £8,000 depending on the standard, your organisation size, and the chosen certification body. This is the independent body's own fee, not ours, and it is confirmed at scoping. We can help you obtain competitive quotes from suitably accredited certification bodies.",
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
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Pricing" }]} />

          <div className="mt-8 max-w-[52ch]">
            <Eyebrow className="mb-5">Pricing</Eyebrow>
            <h1 className="h1p">Transparent pricing, scoped to your business</h1>
            <p className="lead mt-6">
              We do not publish price lists because no two engagements are identical.
              What we commit to: a fixed-fee proposal before work starts, full
              transparency, no hourly billing, no scope creep, and 90 days post-certification support included as standard.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href="/contact" size="lg">
                Book a Compliance Diagnostic
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Talk to a Consultant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our pricing promise */}
      <section className="sec">
        <div className="wrap" data-reveal="">
          <SectionHeading
            label="Our Promise"
            title="How we price every engagement"
            description="Every proposal is scoped to your specific organisation, team size, existing controls, sector, and objectives."
          />
          <div className="grid gap-3.5 md:grid-cols-3">
            {promises.map((item) => (
              <Card key={item.title} className="flex h-full flex-col">
                <item.icon className="h-5 w-5 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="h4 mt-4">{item.title}</h3>
                <p className="small mt-2.5">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What is included */}
      <section className="sec band-alt">
        <div className="wrap max-w-[900px]" data-reveal="">
          <SectionHeading
            label="Included"
            title="What every engagement delivers"
            description="Regardless of the standard or your organisation size, every Pixelette Certified engagement includes:"
          />
          <Card>
            <ul className="list-none space-y-4">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 shrink-0 text-brand">
                    <Check size={16} />
                  </span>
                  <span className="small">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Certification body fees note */}
          <Card className="mt-3.5 flex items-start gap-4">
            <Info className="mt-1 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden="true" />
            <div>
              <p className="small">
                <strong className="font-semibold text-ink">Certification body audit fees:</strong>{" "}
                For SME engagements, the certification body audit fee is included in
                the project price. For larger organisations, CB fees are separate,
                typically{" "}
                <strong className="font-semibold text-ink">£4,500 to £8,000</strong>{" "}
                depending on the standard, your organisation size, and the chosen
                certification body. This is the independent body&rsquo;s own fee, not ours, and it
                is confirmed at scoping. We can help you obtain competitive quotes
                from suitably accredited certification bodies.
              </p>
              <p className="small mt-2.5">
                <strong className="font-semibold text-ink">Payment plans:</strong>{" "}
                Available for all engagements. Typically structured as an initial
                deposit at kickoff followed by milestone-based payments.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Multi-certification savings */}
      <section className="sec">
        <div className="wrap max-w-[900px]" data-reveal="">
          <SectionHeading
            label="Multi-Certification"
            title="Combined certifications save time and money"
            description="Many ISO standards share significant control overlap. We price combined engagements efficiently and typically deliver dual certifications faster than two sequential projects."
          />
          <div className="grid gap-3.5 sm:grid-cols-2">
            {multiCertOverlaps.map((item) => (
              <div key={item.combo} className="card flex items-center gap-4 p-5">
                <Users className="h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.combo}</p>
                  <p className="mono mt-1 text-[11px] uppercase tracking-[0.08em] text-brand">
                    {item.overlap}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to get started */}
      <section className="sec band-alt">
        <div className="wrap max-w-[900px]" data-reveal="">
          <Eyebrow className="mb-5">Get Started</Eyebrow>
          <h2 className="h2 max-w-[20ch]">Your free 30-minute gap analysis</h2>
          <p className="body mt-5">
            Every engagement begins with a free, no-obligation gap analysis. In 30
            minutes, our consultants will assess your current posture, identify which
            standards apply, and provide a realistic timeline and fixed-fee proposal.
            No certification outcome or completion date is promised before scope, current readiness and the independent assessment route have been confirmed.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href="/contact" size="lg" iconRight={<ArrowRight size={16} />}>
              Book a Compliance Diagnostic
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec">
        <div className="wrap max-w-[840px]" data-reveal="">
          <SectionHeading label="Pricing FAQ" title="Common pricing questions" />
          <FaqSchema faqs={pricingFAQs} />
          <Accordion items={pricingFAQs} />
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
