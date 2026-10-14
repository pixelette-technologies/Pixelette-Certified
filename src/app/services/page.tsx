import type { Metadata } from "next";
import Link from "next/link";
import { getCoreServices, specialistCapabilities, ENGAGEMENT_TERMS } from "@/data/services";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import { ArrowRight } from "@/components/ui/icons";
import { SITE_CONFIG } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

/** Extractable for the site assistant KB builder (exact literals only). */
export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "ISO 27001, AI governance and ISO 42001, SOC 2 readiness, cyber assurance and testing, privacy, vCISO, business continuity and GCC regulatory compliance.",
  path: "/services",
});

const faqs = [
  {
    q: "What services does Pixelette Certified offer?",
    a: "Core services include ISO 27001 and information security, AI governance and ISO 42001, SOC 2 readiness, cyber assurance and testing, privacy and data governance, vCISO and GRC advisory, business continuity and ISO 22301, and GCC regulatory compliance.",
  },
];
void faqs; // kept for scripts/build-pix-kb.mjs

/*
 * The services hub (§14). Eight core services first, then the specialist
 * capabilities that sit behind them. Nothing here is presented as a product with
 * a price or a duration, and ISO 9001 and ISO 14001 are no longer promoted.
 */
export default function ServicesPage() {
  const core = getCoreServices();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Pixelette Certified services",
          url: `${SITE_CONFIG.url}/services`,
          itemListElement: core.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_CONFIG.url}/services/${service.slug}`,
            name: service.title,
          })),
        }}
      />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Services" }]} />
          <div className="mt-8 max-w-[56ch]">
            <h1 className="h1p">Services</h1>
            <p className="lead mt-6">
              We help organisations meet cyber security, compliance and AI governance requirements,
              and we support organisations internationally. Each engagement is adapted to the relevant
              standard, customer requirement and jurisdiction.
            </p>
            <div className="mt-9">
              <Button href="/contact" size="lg">
                Discuss your requirements
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <SectionHeading label="Core services" title="Compliance and assurance built around the requirement" />
          <div className="border-t border-line">
            {core.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="grid gap-2 border-b border-line py-5 transition-colors duration-150 hover:bg-band md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] md:items-baseline md:gap-8 md:px-2"
              >
                <h2 className="text-[16px] font-semibold leading-snug text-ink">{service.navLabel}</h2>
                <p className="small">{service.summary}</p>
                <span className="shrink-0 text-brand" aria-hidden="true">
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="additional-capabilities">
        <div className="wrap" data-reveal="">
          <SectionHeading
            label="Specialist capabilities"
            title="Additional specialist capabilities"
            description="Offered where appropriately qualified practitioners are available for the scope, sector and jurisdiction. Each sits within one of the core services above."
          />
          <div className="border-t border-line">
            {specialistCapabilities.map((cap) => (
              <Link
                key={cap.title}
                href={cap.href}
                className="grid gap-2 border-b border-line py-5 transition-colors duration-150 hover:bg-band md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-baseline md:gap-8 md:px-2"
              >
                <span className="text-[16px] font-semibold leading-snug text-ink">{cap.title}</span>
                <span className="small">{cap.text}</span>
                <span className="shrink-0 text-brand" aria-hidden="true">
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
          <p className="small mt-8 max-w-[72ch]">{ENGAGEMENT_TERMS}</p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
