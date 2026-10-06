import type { Metadata } from "next";
import Link from "next/link";
import { audienceGroups } from "@/data/industries";
import { getServiceBySlug } from "@/data/services";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CTASection from "@/components/sections/CTASection";
import { ArrowRight } from "@/components/ui/icons";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Who We Help",
  description:
    "Typical requirements and relevant services for SaaS, AI, financial services, healthcare, professional services and regulated supply chains.",
  alternates: { canonical: `${SITE_CONFIG.url}/who-we-help` },
  openGraph: {
    title: "Who We Help | Pixelette Certified",
    description:
      "Typical requirements and relevant services for six groups of organisations.",
    url: `${SITE_CONFIG.url}/who-we-help`,
  },
};

export default function WhoWeHelpPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Who we help" }]} />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Who we help" }]} />
          <div className="mt-8 max-w-[40ch]">
            <h1 className="h1p">Who we help</h1>
            <p className="lead mt-6">
              Six groups of organisations whose customers, partners or regulators expect evidence of
              how security, privacy and governance are managed.
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          {audienceGroups.map((group) => (
            <article key={group.slug} id={group.slug} className="scroll-mt-28 border-t border-line py-10 last:border-b">
              <h2 className="h3">{group.title}</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-16">
                <div>
                  <h3 className="text-[15px] font-medium text-ink">Typical requirements</h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5">
                    {group.requirements.map((req) => (
                      <li key={req} className="small">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-ink">Relevant services</h3>
                  <ul className="mt-3 list-none space-y-2">
                    {group.services.map((slug) => {
                      const service = getServiceBySlug(slug);
                      if (!service) return null;
                      return (
                        <li key={slug}>
                          <Link href={`/services/${slug}`} className="flink text-[15px] font-medium text-ink hover:text-brand">
                            {service.navLabel} <ArrowRight size={13} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
