import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CTASection from "@/components/sections/CTASection";
import { publishedCredentials, CREDENTIAL_FOOTNOTE } from "@/data/credentials";
import { experienceAreas } from "@/data/experience";
import { caseStudies, EVIDENCE_STATEMENT } from "@/data/caseStudies";
import { markets, marketHref } from "@/data/markets";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Practitioner credentials, selected practitioner experience, and how expertise is assigned across the UK, United States and GCC.",
  alternates: { canonical: `${SITE_CONFIG.url}/expertise` },
  openGraph: {
    title: "Expertise | Pixelette Certified",
    description:
      "Practitioner credentials and delivery experience across cyber security, privacy, AI governance and regulatory programmes.",
    url: `${SITE_CONFIG.url}/expertise`,
  },
};

const FRAMEWORKS: Record<string, string> = {
  uk: "ISO 27001, Cyber Essentials, UK GDPR, AI governance",
  us: "SOC 2, ISO 27001, NIST-aligned governance, US privacy",
  gcc: "NCA, SAMA, NIA, QCB, ISO 27001, privacy",
};

/**
 * Expertise replaces Experience in the primary navigation. Practitioner
 * experience stays labelled as such, and is not presented as historic
 * Pixelette client work.
 */
export default function ExpertisePage() {
  const creds = publishedCredentials();

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Expertise" }]} />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Expertise" }]} />
          <div className="mt-8 max-w-[46ch]">
            <h1 className="h1p">Expertise</h1>
            <p className="lead mt-6">
              Practitioners are assigned to the requirement. Credentials belong to the individuals who
              hold them.
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[18ch]">Practitioner expertise</h2>
          <ul className="mt-8 max-w-[720px] list-none border-t border-line">
            {creds.map((credential) => (
              <li key={credential.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8">
                <p className="text-[16px] font-medium text-ink">{credential.label}</p>
                <p className="small">
                  {credential.area}. {credential.issuer}
                </p>
              </li>
            ))}
          </ul>
          <p className="src mt-6 max-w-[72ch]">{CREDENTIAL_FOOTNOTE}</p>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[18ch]">Selected practitioner experience</h2>
          <p className="body mt-5 max-w-[68ch]">
            The examples below are practitioner experience. Some of it was gained before, or
            independently of, Pixelette Certified. None of it is presented as work contracted through
            Pixelette Certified.
          </p>
          <ul className="mt-8 list-none border-t border-line">
            {experienceAreas.map((area) => (
              <li key={area.title} className="border-b border-line py-6">
                <p className="mono text-xs uppercase tracking-[0.08em] text-brand">
                  {area.sector}, {area.jurisdiction}
                </p>
                <h3 className="h4 mt-2">{area.title}</h3>
                <p className="small mt-2 max-w-[68ch]">{area.text}</p>
                <p className="src mt-3">Practitioner experience. {area.areas.join(", ")}</p>
              </li>
            ))}
          </ul>
          {caseStudies.length === 0 ? (
            <p className="body mt-8 max-w-[72ch]">{EVIDENCE_STATEMENT}</p>
          ) : (
            <ul className="mt-8 list-none border-t border-line">
              {caseStudies.map((study) => (
                <li key={study.slug} className="border-b border-line py-6">
                  <p className="mono text-xs uppercase tracking-[0.08em] text-brand">{study.sector}</p>
                  <h3 className="h4 mt-2">{study.client}</h3>
                  <p className="small mt-2 max-w-[68ch]">{study.situation}</p>
                  <p className="small mt-3 font-medium text-ink">{study.outcome}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[18ch]">Markets and frameworks</h2>
          <ul className="mt-8 list-none border-t border-line">
            {markets.map((market) => (
              <li key={market.slug} className="border-b border-line">
                <Link
                  href={marketHref(market)}
                  className="grid gap-2 py-5 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
                >
                  <span className="text-[16px] font-semibold text-ink">{market.name}</span>
                  <span className="small">{FRAMEWORKS[market.slug]}</span>
                  <ArrowRight size={15} className="text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[18ch]">How expertise is assigned</h2>
          <p className="body mt-5 max-w-[62ch]">
            For each engagement we assign practitioners whose qualifications and experience fit the
            standard, jurisdiction, sector and technical requirement. Pixelette Certified remains the
            point of accountability, and the practitioners leading the work are confirmed before it
            begins.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
