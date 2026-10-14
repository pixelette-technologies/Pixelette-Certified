import type { Metadata } from "next";
import Link from "next/link";
import { markets, marketHref } from "@/data/markets";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CTASection from "@/components/sections/CTASection";
import MarketsScope from "@/components/visuals/MarketsScope";
import { ArrowRight } from "@/components/ui/icons";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Markets",
  description:
    "Cyber security, compliance and AI governance support for organisations internationally. Requirements often vary by jurisdiction.",
  path: "/markets",
});

/*
 * Market routes. The United Kingdom, the United States and the GCC explain
 * requirements that differ by jurisdiction. International is the route for
 * requirements elsewhere. None of them is a boundary of the business.
 */
export default function MarketsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Markets" }]} />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Markets" }]} />
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-14">
            <div className="max-w-[56ch]">
              <h1 className="h1p">Markets</h1>
              <p className="lead mt-6">
                Pixelette Certified supports organisations internationally, adapting each engagement to
                the relevant standard, customer requirement and jurisdiction. These pages explain
                requirements that often vary by market.
              </p>
            </div>
            <MarketsScope />
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="border-t border-line">
            {markets.map((market) => (
              <Link
                key={market.slug}
                href={marketHref(market)}
                className="grid gap-2 border-b border-line py-6 transition-colors duration-150 hover:bg-page md:grid-cols-[14rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
              >
                <h2 className="h3">{market.name}</h2>
                <p className="small">{market.cardLine}</p>
                <span className="flink text-sm font-medium text-brand">
                  {market.exploreLabel} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <p className="small mt-8 max-w-[72ch]">
            These routes are not a list of the only places where Pixelette Certified works. If a
            requirement applies elsewhere, we establish the applicable scope and the specialist
            capability it needs.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
