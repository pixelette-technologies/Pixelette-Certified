import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { caseStudies, EVIDENCE_STATEMENT } from "@/data/caseStudies";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Newsletter from "@/components/sections/Newsletter";
import CTASection from "@/components/sections/CTASection";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practitioner guides on ISO 27001, ISO 42001, SOC 2 readiness, privacy and AI governance, plus how we treat evidence and client confidentiality.",
  openGraph: {
    title: "Resources | Pixelette Certified",
    description:
      "Practitioner guides on certification, assurance, privacy and AI governance.",
    url: "https://pixelettecertified.com/resources",
  },
  alternates: {
    canonical: "https://pixelettecertified.com/resources",
  },
};

const LATEST_COUNT = 6;

/*
 * The Resources hub.
 *
 * Two jobs. It gives the "Resources" nav item a real destination without
 * building a dropdown that would need three credible children and currently has
 * one. And it rehomes <Newsletter />, which the homepage rebuild would
 * otherwise orphan - it is the only lead capture on the site besides the
 * enquiry form itself.
 *
 * The evidence section is deliberate rather than apologetic. Stating plainly
 * why there are no case studies tells a prospective client exactly how their
 * own confidentiality will be treated, which is a stronger signal in this
 * market than three anonymous success stories would have been. When
 * caseStudies is no longer empty, the grid renders in place of the statement
 * with no code change.
 */
export default function ResourcesPage() {
  const latest = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, LATEST_COUNT);

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Resources" }]} />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Resources" }]} />

          <div className="mt-8 max-w-[56ch]">
            <Eyebrow className="mb-5">Resources</Eyebrow>
            <h1 className="h1p">Guides written by the people who do the work</h1>
            <p className="lead mt-6">
              Practical guidance on certification, assurance, privacy and AI governance, written
              for the person who has just been sent a questionnaire or a tender clause and needs
              to know what happens next.
            </p>
          </div>
        </div>
      </section>

      {/* Latest guides */}
      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="flex items-end justify-between gap-6">
            <h2 className="h2">Latest guides</h2>
            <Link href="/blog" className="flink shrink-0 text-sm font-medium text-brand hover:text-brand-hover">
              View all guides <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-9 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card flex h-full flex-col transition-colors duration-150 hover:border-line-strong"
              >
                <Eyebrow>{post.category}</Eyebrow>
                <h3 className="h4 mt-3">{post.title}</h3>
                <p className="small mt-2.5 flex-1">{post.description}</p>
                <span className="small mt-4 block">{post.readingTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence policy, or case studies once there are any */}
      <section className="sec">
        <div className="wrap" data-reveal="">
          <Eyebrow className="mb-5">Evidence</Eyebrow>
          <h2 className="h2 max-w-[24ch]">Proof should be earned, not manufactured</h2>

          {caseStudies.length === 0 ? (
            <p className="body mt-6 max-w-[72ch]">{EVIDENCE_STATEMENT}</p>
          ) : (
            <div className="mt-9 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
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

      <Newsletter />
      <CTASection />
    </>
  );
}
