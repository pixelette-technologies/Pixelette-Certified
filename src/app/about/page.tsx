import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pixelette Certified is a UK-headquartered cyber security, compliance, assurance and AI governance consultancy supporting organisations internationally.",
  openGraph: {
    title: "About Pixelette Certified",
    description:
      "A UK-headquartered cyber security, compliance, assurance and AI governance consultancy supporting organisations internationally.",
  },
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
};

/*
 * AboutPage schema only, pointing at the Organization emitted sitewide by the
 * root layout. No hasCredential and no Person blocks: schema.org has no way to
 * say "held by practitioners in our network", and pairing worksFor with
 * hasCredential would turn an individual's certificates into an organisational
 * capability in a knowledge graph.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_CONFIG.url}/about`,
          name: "About Pixelette Certified",
          about: { "@id": `${SITE_CONFIG.url}/#organization` },
        }}
      />
      <AboutContent />
    </>
  );
}
