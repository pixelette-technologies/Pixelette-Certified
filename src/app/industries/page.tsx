import type { Metadata } from "next";
import { industries } from "@/data/industries";
import IndustriesContent from "./IndustriesContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Industries We Serve | Sector-Specific Compliance Expertise",
  description:
    "We deliver ISO certification and compliance services tailored to your industry. FinTech, AI, SaaS, Healthcare, Government, E-Commerce, Education, and Professional Services.",
  keywords: [
    "ISO certification by industry",
    "FinTech compliance UK",
    "healthcare cybersecurity",
    "AI governance certification",
    "SaaS ISO 27001",
    "government supplier certification",
  ],
  openGraph: {
    title: "Industries We Serve | Pixelette Certified",
    description:
      "Sector-specific ISO certification and compliance expertise for UK technology companies.",
    url: "https://pixelettecertified.co.uk/industries",
  },
  alternates: {
    canonical: "https://pixelettecertified.co.uk/industries",
  },
};

export default function IndustriesPage() {
  // Strip icon (non-serializable) before passing to client component
  const serializedIndustries = industries.map(({ icon, ...rest }) => rest);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Industries Served by Pixelette Certified",
          description: "Sector-specific compliance and certification services",
          numberOfItems: industries.length,
          itemListElement: industries.map((ind, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: ind.title,
            description: ind.description,
            url: `https://pixelettecertified.co.uk/industries#${ind.slug}`,
          })),
        }}
      />
      <IndustriesContent industries={serializedIndustries} />
    </>
  );
}
