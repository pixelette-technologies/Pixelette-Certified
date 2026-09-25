import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import CTASection from "@/components/sections/CTASection";
import { experienceAreas } from "@/data/experience";
import { caseStudies, EVIDENCE_STATEMENT } from "@/data/caseStudies";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Practitioner experience across certification, cyber security, privacy and regulatory programmes in the UK, United States and GCC.",
  alternates: { canonical: `${SITE_CONFIG.url}/experience` },
  openGraph: {
    title: "Experience | Pixelette Certified",
    description:
      "Practitioner experience across certification, cyber security, privacy and regulatory programmes in the UK, United States and GCC.",
    url: `${SITE_CONFIG.url}/experience`,
  },
};

/*
 * Experience (§30), replacing the withdrawn case studies. Everything on this
 * page is labelled as practitioner experience. Client engagements contracted
 * through Pixelette Certified appear only once they meet the evidence record
 * enforced by the CaseStudy type.
 */
export default function ExperiencePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Experience" }]} />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Experience" }]} />
          <div className="mt-8 max-w-[58ch]">
            <h1 className="h1p">Experience</h1>
            <p className="lead mt-6">
              Practitioners supporting Pixelette Certified bring delivery experience across
              certification, cyber security, privacy and regulatory programmes in the UK, United
              States and GCC.
            </p>
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <SectionHeading
            label="Practitioner experience"
            title="Areas of delivery experience"
            description="The examples below describe practitioner experience. Some of it was gained before, or independently of, Pixelette Certified, and none of it is presented as work contracted through Pixelette Certified. Client names and outcomes are not published."
          />
          <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {experienceAreas.map((area) => (
              <article key={area.title} className="card flex h-full flex-col">
                <Eyebrow>
                  {area.sector}, {area.jurisdiction}
                </Eyebrow>
                <h2 className="h4 mt-3">{area.title}</h2>
                <p className="small mt-2.5 flex-1">{area.text}</p>
                <ul className="mt-5 flex list-none flex-wrap gap-2">
                  {area.areas.map((a) => (
                    <li key={a} className="pill">
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="src mt-5">Practitioner experience</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <SectionHeading label="Client work" title="How we treat client evidence" />
          {caseStudies.length === 0 ? (
            <p className="body max-w-[72ch]">{EVIDENCE_STATEMENT}</p>
          ) : (
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <article key={study.slug} className="card flex h-full flex-col">
                  <Eyebrow>{study.sector}</Eyebrow>
                  <h3 className="h4 mt-3">{study.client}</h3>
                  <p className="small mt-2.5 flex-1">{study.situation}</p>
                  <p className="small mt-4 font-medium text-ink">{study.outcome}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
