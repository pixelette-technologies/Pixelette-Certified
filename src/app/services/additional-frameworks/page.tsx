import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CTASection from "@/components/sections/CTASection";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Additional Framework Support",
  description:
    "Frameworks we support beyond the core service lines, including ISO 9001, ISO 14001, ISO 22301, ISO 27701 and selected UK, EU and GCC regulatory frameworks. Offered where a named qualified delivery route is assigned.",
  openGraph: {
    title: "Additional Framework Support | Pixelette Certified",
    description:
      "Frameworks we support beyond the core service lines, offered where a named qualified delivery route is assigned.",
    url: "https://pixelettecertified.com/services/additional-frameworks",
  },
  alternates: {
    canonical: "https://pixelettecertified.com/services/additional-frameworks",
  },
};

/*
 * Deliberately NOT built on ServicePageTemplate.
 *
 * That template requires process, pricing and faqs, and inventing those for a
 * page that exists to say "these are also available, scoped case by case" would
 * manufacture exactly the kind of specificity the brief is removing. This is a
 * list page over the "supporting" services: real, sold, but not headline.
 *
 * The distinction matters commercially as well as legally. The brief says these
 * frameworks must not be presented as core, not that they must be hidden. They
 * keep their own pages and their existing search rankings; they simply stop
 * competing with the four pillars for attention.
 */
export default function AdditionalFrameworksPage() {
  const supporting = services.filter((s) => s.status === "supporting");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Additional Framework Support" },
        ]}
      />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs
            items={[{ name: "Services", href: "/services" }, { name: "Additional Framework Support" }]}
          />

          <div className="mt-8 max-w-[56ch]">
            <Eyebrow className="mb-5">Additional Framework Support</Eyebrow>
            <h1 className="h1p">Frameworks we support beyond the core service lines</h1>
            <p className="lead mt-6">
              These are offered where a named qualified delivery route is assigned for your scope,
              sector and jurisdiction. If the framework you have been asked about is not listed,
              tell us what you have been asked to prove and we will tell you honestly whether we
              are the right people for it.
            </p>
            <div className="mt-9">
              <Button href="/contact" size="lg">
                Book a Compliance Diagnostic
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid overflow-hidden rounded-card border border-line-card md:grid-cols-2">
            {supporting.map((service) => {
              const href = service.hasRoute ? `/services/${service.slug}` : "/contact";
              return (
                <Link
                  key={service.slug}
                  href={href}
                  className="group border-b border-line-card bg-page p-7 transition-colors duration-150 last:border-b-0 hover:bg-band md:p-[30px] md:[&:nth-child(odd)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <h2 className="h4">{service.shortTitle}</h2>
                  <p className="small mt-2.5">{service.description}</p>
                  <span className="flink mt-4 inline-flex text-sm font-medium text-brand">
                    {service.hasRoute ? "Learn more" : "Discuss this framework"}{" "}
                    <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="small mt-8 max-w-[72ch]">
            Where a framework requires independent certification, scheme assessment or attestation,
            that assessment is carried out by the appropriate independent body. We prepare,
            implement and coordinate; we do not issue the certificate or the report.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
