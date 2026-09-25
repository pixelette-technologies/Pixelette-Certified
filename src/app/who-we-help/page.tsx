import type { Metadata } from "next";
import Link from "next/link";
import { audienceGroups } from "@/data/industries";
import { getServiceBySlug } from "@/data/services";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CTASection from "@/components/sections/CTASection";
import { ArrowRight, Check } from "@/components/ui/icons";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Who We Help",
  description:
    "Support for SaaS and technology firms, AI companies, financial services, healthcare, professional services and suppliers to government and regulated organisations.",
  alternates: { canonical: `${SITE_CONFIG.url}/who-we-help` },
  openGraph: {
    title: "Who We Help | Pixelette Certified",
    description:
      "Security, compliance and AI governance support for six groups of organisations with specific assurance requirements.",
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
          <div className="mt-8 max-w-[56ch]">
            <h1 className="h1p">Who we help</h1>
            <p className="lead mt-6">
              We work principally with six groups of organisations whose customers, partners or
              regulators expect them to demonstrate how security, privacy and governance are managed.
            </p>
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid gap-3.5 md:grid-cols-2">
            {audienceGroups.map((group) => (
              <div key={group.slug} id={group.slug} className="card flex h-full scroll-mt-28 flex-col">
                <h2 className="h3">{group.title}</h2>
                <p className="small mt-3">{group.summary}</p>

                <ul className="mb-6 mt-5 flex-1 list-none space-y-2.5">
                  {group.requirements.map((req) => (
                    <li key={req} className="flex gap-3">
                      <span className="mt-1 shrink-0 text-brand">
                        <Check size={15} />
                      </span>
                      <span className="small">{req}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
                  {group.services.map((slug) => {
                    const service = getServiceBySlug(slug);
                    if (!service) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        className="flink text-sm font-medium text-brand hover:text-brand-hover"
                      >
                        {service.navLabel} <ArrowRight size={13} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <p className="body mt-10 max-w-[72ch]">
            We also support organisations in other sectors where our standards, cyber security and
            regulatory expertise match the requirement.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
