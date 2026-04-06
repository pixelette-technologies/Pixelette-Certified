import type { Metadata } from "next";
import { industries } from "@/data/industries";
import IndustriesContent from "./IndustriesContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Industries We Serve | Global Compliance Expertise | Pixelette Certified",
  description:
    "Pixelette Certified delivers ISO certification and compliance consultancy to businesses across every industry, FinTech, healthcare, manufacturing, logistics, legal, energy, education, retail, and more. Globally delivered.",
  keywords: [
    "ISO certification by industry",
    "FinTech compliance UK",
    "healthcare cybersecurity",
    "AI governance certification",
    "SaaS ISO 27001",
    "government supplier certification",
  ],
  openGraph: {
    title: "Industries We Serve | Global Compliance Expertise | Pixelette Certified",
    description:
      "Pixelette Certified delivers ISO certification and compliance consultancy to businesses across every industry, FinTech, healthcare, manufacturing, logistics, legal, energy, education, retail, and more. Globally delivered.",
    url: "https://pixelettecertified.com/industries",
  },
  alternates: {
    canonical: "https://pixelettecertified.com/industries",
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
            url: `https://pixelettecertified.com/industries#${ind.slug}`,
          })),
        }}
      />
      <IndustriesContent industries={serializedIndustries} />
    </>
  );
}
