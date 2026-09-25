import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { markets, getMarketByPath } from "@/data/markets";
import { getServiceBySlug, type Service } from "@/data/services";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import { ArrowRight, Check } from "@/components/ui/icons";
import { SITE_CONFIG, PRIMARY_CTA } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return markets.map((m) => ({ market: m.path }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}): Promise<Metadata> {
  const { market: path } = await params;
  const market = getMarketByPath(path);
  if (!market) return {};
  const url = `${SITE_CONFIG.url}/markets/${market.path}`;
  return {
    title: market.seo.title,
    description: market.seo.description,
    alternates: { canonical: url },
    openGraph: { title: `${market.seo.title} | Pixelette Certified`, description: market.seo.description, url },
  };
}

/*
 * One template for the three market pages (§26 to §28). The content differs by
 * market in data, not in layout. Service order is the order in
 * src/data/markets.ts, which is how the US page leads with SOC 2 and never with
 * Cyber Essentials or UK GDPR (§27).
 */
export default async function MarketPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: path } = await params;
  const market = getMarketByPath(path);
  if (!market) notFound();

  const serviceEntries = market.services.flatMap((entry) => {
    const service = getServiceBySlug(entry.slug);
    return service ? [{ note: entry.note, service }] : [];
  }) satisfies { note: string; service: Service }[];

  const placeName = market.name === "GCC" ? "the GCC" : `the ${market.name}`;

  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", href: "/" }, { name: "Markets", href: "/markets" }, { name: market.name }]}
      />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs schema={false} items={[{ name: "Markets", href: "/markets" }, { name: market.name }]} />
          <div className="mt-8 max-w-[58ch]">
            <h1 className="h1p">{market.title}</h1>
            <p className="lead mt-6">{market.opening}</p>
            <div className="mt-9">
              <Button href={PRIMARY_CTA.href} size="lg">
                {PRIMARY_CTA.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
            <div className="max-w-[66ch] space-y-4">
              {market.overview.map((para) => (
                <p key={para.slice(0, 32)} className="body">
                  {para}
                </p>
              ))}
            </div>
            {market.audience && (
              <div className="card self-start">
                <h2 className="h4">{market.audience.heading}</h2>
                <ul className="mt-4 list-none space-y-2.5">
                  {market.audience.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 shrink-0 text-brand">
                        <Check size={15} />
                      </span>
                      <span className="small">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <SectionHeading label="Services" title={`Core services in ${placeName}`} />
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceEntries.map(({ note, service }) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card flex h-full flex-col p-6 transition-colors duration-150 hover:border-line-strong"
              >
                <h3 className="h4">{service.navLabel}</h3>
                <p className="small mt-2 flex-1">{note}</p>
                <span className="flink mt-4 text-sm font-medium text-brand">
                  Explore the service <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {market.focus && (
        <section className="sec band-alt">
          <div className="wrap" data-reveal="">
            <SectionHeading label="Focus" title={market.focus.heading} />
            <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-12">
              {market.focus.items.map((item) => (
                <div key={item.title}>
                  <h3 className="h4">{item.title}</h3>
                  <p className="small mt-2.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap" data-reveal="">
          <div className="grid max-w-[900px] gap-6">
            {market.notes.map((note) => (
              <div key={note.title} className="border-l-2 border-brand pl-5">
                <h2 className="h4">{note.title}</h2>
                <p className="small mt-2">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
