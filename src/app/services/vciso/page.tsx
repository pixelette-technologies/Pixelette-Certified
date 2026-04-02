import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import JsonLd from "@/components/seo/JsonLd";

const service = getServiceBySlug("vciso")!;

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
  keywords: service.seo.keywords,
  openGraph: {
    title: service.seo.title,
    description: service.seo.description,
    url: `https://pixelettecertified.co.uk/services/${service.slug}`,
  },
  alternates: {
    canonical: `https://pixelettecertified.co.uk/services/${service.slug}`,
  },
};

export default function VCISOPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.seo.description,
          provider: {
            "@type": "Organization",
            name: "Pixelette Certified",
            url: "https://pixelettecertified.co.uk",
          },
          url: `https://pixelettecertified.co.uk/services/${service.slug}`,
          areaServed: ["GB", "IE", "AE", "EU"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: service.title,
            itemListElement: service.pricing.map((tier) => ({
              "@type": "Offer",
              name: tier.name,
              description: tier.audience,
              price: tier.price,
              priceCurrency: "GBP",
            })),
          },
        }}
      />
      <ServicePageTemplate service={(({ icon, ...rest }) => rest)(service)} />
    </>
  );
}
