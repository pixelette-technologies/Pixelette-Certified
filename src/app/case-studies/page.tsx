import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import { caseStudies } from "@/data/caseStudies";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function CaseStudiesPage() {
  return (
    <>
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Case Studies" }]} />

          <SectionHeading
            as="h1"
            variant="h1p"
            label="Case Studies"
            title="Real Results for Real Companies"
            description="How UK technology companies achieved certification faster, won enterprise deals, and built lasting compliance programmes."
            className="mt-8 mb-0"
          />
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid gap-3.5 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="card flex h-full flex-col transition-colors duration-150 hover:border-line-strong"
              >
                {/* Client snapshot */}
                <div>
                  <h2 className="h3">{study.client}</h2>
                  <p className="small mt-1.5">
                    {study.industry}, {study.employees}
                  </p>
                </div>

                {/* Certification badges */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.certifications.split(" + ").map((cert) => (
                    <Pill key={cert} tone="brand">{cert}</Pill>
                  ))}
                  <Pill>{study.timeline}</Pill>
                </div>

                {/* Challenge */}
                <div className="mt-6 flex-1">
                  <Eyebrow as="p" tone="muted" className="mb-2">Challenge</Eyebrow>
                  <p className="small">{study.challenge}</p>
                </div>

                {/* Result */}
                <div className="mt-5">
                  <Eyebrow as="p" className="mb-2">Result</Eyebrow>
                  <p className="small">{study.result}</p>
                </div>

                {/* Footer */}
                <div className="mt-5 border-t border-line pt-4">
                  <span className="text-sm font-medium text-brand">
                    Read case study &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16">
            <div className="card mx-auto max-w-2xl text-center">
              <h2 className="h3">Want results like these?</h2>
              <p className="body mx-auto mt-4">
                Every engagement starts with a free consultation. Let us assess
                your current position and design a roadmap to certification.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary" size="lg">
                  See Your 10-Week Certification Roadmap
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
