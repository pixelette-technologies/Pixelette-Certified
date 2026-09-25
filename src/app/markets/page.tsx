import type { Metadata } from "next";
import Link from "next/link";
import { markets, marketHref } from "@/data/markets";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CTASection from "@/components/sections/CTASection";
import { ArrowRight } from "@/components/ui/icons";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Markets",
  description:
    "Cyber security, compliance and AI governance support for organisations in the United Kingdom, the United States and the GCC.",
  alternates: { canonical: `${SITE_CONFIG.url}/markets` },
  openGraph: {
    title: "Markets | Pixelette Certified",
    description: "Support for organisations in the United Kingdom, the United States and the GCC.",
    url: `${SITE_CONFIG.url}/markets`,
  },
};

/*
 * The destination for "Explore our markets" (§11). Three markets, equal weight,
 * and a plain statement that organisations elsewhere can still get in touch.
 */
export default function MarketsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Markets" }]} />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Markets" }]} />
          <div className="mt-8 max-w-[56ch]">
            <h1 className="h1p">Our markets</h1>
            <p className="lead mt-6">
              Pixelette Certified is headquartered in the UK and focuses on three markets: the United
              Kingdom, the United States and the GCC. Each has its own customer expectations,
              regulators and assurance routes, and we assign practitioners with the relevant
              experience.
            </p>
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid gap-3.5 md:grid-cols-3">
            {markets.map((market) => (
              <Link
                key={market.slug}
                href={marketHref(market)}
                className="card flex h-full flex-col transition-colors duration-150 hover:border-line-strong"
              >
                <h2 className="h3">{market.name}</h2>
                <p className="small mt-3 flex-1">{market.cardLine}</p>
                <span className="flink mt-5 text-sm font-medium text-brand">
                  Explore the market <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <p className="small mt-8 max-w-[72ch]">
            Organisations in other jurisdictions are welcome to contact us. We will tell you plainly
            whether we have the appropriate expertise for the requirement.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
