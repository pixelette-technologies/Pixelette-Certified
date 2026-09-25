import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { markets } from "@/data/markets";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import JsonLd from "@/components/seo/JsonLd";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { SITE_CONFIG } from "@/lib/constants";

/*
 * One route for every service, replacing eleven near-identical page files.
 *
 * dynamicParams is false, so any slug not in services.ts is a 404 rather than
 * an on-demand render. Withdrawn slugs never reach this route at all: they are
 * redirected in next.config.ts, which runs before filesystem routing.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const COUNTRY_CODES: Record<string, string[]> = {
  uk: ["GB"],
  us: ["US"],
  gcc: ["SA", "QA", "AE"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const url = `${SITE_CONFIG.url}/services/${service.slug}`;
  return {
    title: service.seo.title,
    description: service.seo.description,
    openGraph: {
      title: `${service.seo.title} | Pixelette Certified`,
      description: service.seo.description,
      url,
    },
    alternates: { canonical: url },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const areaServed = markets
    .filter((m) => service.markets.includes(m.slug))
    .flatMap((m) => COUNTRY_CODES[m.slug]);

  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.shortTitle }]}
      />
      {/* No Offer or price in the Service schema: §6 removes pricing-related
          structured data along with visible pricing. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.seo.description,
          serviceType: service.navLabel,
          provider: { "@id": `${SITE_CONFIG.url}/#organization` },
          url: `${SITE_CONFIG.url}/services/${service.slug}`,
          areaServed,
        }}
      />
      <ServicePageTemplate service={service} />
    </>
  );
}
