import Link from "next/link";
import type { Service, ServiceItem, ServiceSlug } from "@/data/services";
import { getRelatedServices } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import CTASection from "@/components/sections/CTASection";
import FaqSchema from "@/components/seo/FaqSchema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Shorter service architecture: one sentence, three situations, a short
 * capability accordion, three route stages, the service-specific independence
 * note, three questions, three related services.
 *
 * The long overview and the repeated engagement-terms sentence are not
 * rendered. The underlying catalogue in services.ts is unchanged, so nothing
 * factual is deleted from the source, only from this template's surface.
 */

const SITUATIONS: Record<ServiceSlug, string[]> = {
  "iso-27001": [
    "A customer or contract has asked for ISO 27001 certification.",
    "The organisation needs an information security management system it can evidence.",
    "Other assurance work should sit on the same control foundation.",
  ],
  "iso-42001": [
    "Customers, a board or a regulator has asked how AI is governed.",
    "Certification to ISO 42001 is being considered.",
    "The NIST AI RMF or another framework fits the requirement more closely.",
  ],
  "soc-2": [
    "A US customer has asked for a SOC 2 report.",
    "The organisation is preparing for a Type 1 or Type 2 examination.",
    "Existing ISO 27001 controls need to be mapped to the Trust Services Criteria.",
  ],
  "cyber-assurance": [
    "A customer has asked for testing evidence.",
    "A material change needs a clear view of exposure.",
    "Findings need to be remediated and retested.",
  ],
  privacy: [
    "The organisation processes personal data in the UK, United States or GCC.",
    "A customer or regulator has asked for evidence of privacy governance.",
    "Security or AI work needs to stay aligned with data protection duties.",
  ],
  vciso: [
    "There is no senior security lead, or that lead needs specialist support.",
    "Governance and evidence need to stay current between audits.",
    "Customer assurance or board reporting needs a named owner.",
  ],
  "iso-22301": [
    "Customers or regulators expect continuity arrangements.",
    "Critical activities need recovery objectives and plans.",
    "ISO 22301 readiness is part of the requirement.",
  ],
  "gcc-regulatory-compliance": [
    "A Saudi, Qatari or UAE requirement applies to the organisation or its customers.",
    "NCA, SAMA, NIA, NISCF or QCB obligations need to be understood and addressed.",
    "International standards need to be mapped to regional requirements.",
  ],
  "cyber-essentials": [
    "A UK customer or public sector buyer has asked for Cyber Essentials.",
    "The organisation is preparing for Cyber Essentials Plus.",
    "Technical controls need to be in place before an authorised Certification Body assesses them.",
  ],
};

const ROUTE_LABELS = ["Assess", "Implement", "Prepare"] as const;

function routeSteps(approach: ServiceItem[]) {
  const picked =
    approach.length <= 3
      ? approach
      : [approach[1] ?? approach[0], approach[approach.length - 2], approach[approach.length - 1]];
  return picked.map((step, index) => ({
    title: ROUTE_LABELS[index] ?? step.title,
    text: step.text,
  }));
}

function capabilityItems(items: ServiceItem[]) {
  if (items.length <= 6) {
    return items.map((item) => ({ question: item.title, answer: item.text }));
  }
  const head = items.slice(0, 5).map((item) => ({ question: item.title, answer: item.text }));
  const rest = items
    .slice(5)
    .map((item) => `${item.title}. ${item.text}`)
    .join(" ");
  return [...head, { question: "Further scope", answer: rest }];
}

interface ServicePageTemplateProps {
  service: Service;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const related = getRelatedServices(service.relatedSlugs).slice(0, 3);
  const faqs = service.faqs.slice(0, 3);
  const stages = routeSteps(service.approach);
  const situations = SITUATIONS[service.slug];

  return (
    <>
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs
            schema={false}
            items={[{ name: "Services", href: "/services" }, { name: service.shortTitle }]}
          />

          <div className="mt-8 max-w-[42ch]">
            <h1 className="h1p">{service.title}</h1>
            <p className="lead mt-6">{service.summary}</p>
            <div className="mt-9">
              <Button href="/contact" size="lg">
                Discuss your requirements
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[20ch]">When this service is relevant</h2>
          <ul className="mt-8 max-w-[68ch] list-none">
            {situations.map((situation) => (
              <li key={situation} className="border-t border-line py-4 text-[16px] leading-snug text-ink last:border-b">
                {situation}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap max-w-[840px]" data-reveal="">
          <SectionHeading title="What we do" titleWidth="16ch" />
          <Accordion items={capabilityItems(service.coverage.items)} defaultOpenIndex={0} />
          {service.groups && (
            <div className="mt-12">
              <h3 className="h3">{service.groups.heading}</h3>
              {service.groups.intro && <p className="small mt-3 max-w-[62ch]">{service.groups.intro}</p>}
              <div className="mt-6">
                <Accordion
                  items={service.groups.items.map((group) => ({
                    question: group.label,
                    answer: `${group.points.join(" ")}${group.note ? ` ${group.note}` : ""}`,
                  }))}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[18ch]">Route to assurance</h2>
          <ol className="mt-10 grid list-none gap-8 md:grid-cols-3 md:gap-10">
            {stages.map((stage, index) => (
              <li key={stage.title} className="border-t border-line pt-5">
                <p className="mono text-xs uppercase tracking-[0.08em] text-brand">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="h4 mt-3">{stage.title}</h3>
                <p className="small mt-2">{stage.text}</p>
              </li>
            ))}
          </ol>
          <p className="small mt-10 max-w-[68ch] border-l-2 border-brand pl-5">{service.independence}</p>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="sec band-alt">
          <div className="wrap max-w-[840px]" data-reveal="">
            <SectionHeading title="Common questions" titleWidth="16ch" />
            <FaqSchema faqs={faqs} />
            <Accordion items={faqs} />
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[16ch]">Related services</h2>
          <ul className="mt-8 list-none border-t border-line">
            {related.map((rel) => (
              <li key={rel.slug} className="border-b border-line">
                <Link
                  href={`/services/${rel.slug}`}
                  className="group grid gap-2 py-5 transition-colors md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] md:items-baseline md:gap-8"
                >
                  <span className="text-[16px] font-semibold text-ink group-hover:text-brand">{rel.navLabel}</span>
                  <span className="small">{rel.summary}</span>
                  <ArrowRight size={15} className="text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
