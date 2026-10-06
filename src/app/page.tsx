import type { Metadata } from "next";
import HomeHero from "@/components/sections/home/HomeHero";
import HomeServices from "@/components/sections/home/HomeServices";
import FromRequirement from "@/components/sections/home/FromRequirement";
import HomeMarkets from "@/components/sections/home/HomeMarkets";
import AiGovernance from "@/components/sections/home/AiGovernance";
import ExpertiseStrip from "@/components/sections/home/ExpertiseStrip";
import CTASection from "@/components/sections/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  /*
   * `absolute` because the root layout applies a "%s | Pixelette Certified"
   * template, which would otherwise repeat the name.
   */
  title: {
    absolute: "Pixelette Certified | Cyber Security, Compliance & AI Governance",
  },
  description: SITE_CONFIG.description,
  alternates: { canonical: SITE_CONFIG.url },
};

/**
 * Six sections, then the footer: hero, services, pathway, markets, AI
 * governance, expertise and the closing invitation. Detail lives on the
 * service, market and expertise pages.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_CONFIG.url}/#website`,
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
          description: SITE_CONFIG.description,
          publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
        }}
      />

      <HomeHero />
      <HomeServices />
      <FromRequirement />
      <HomeMarkets />
      <AiGovernance />
      <ExpertiseStrip />
      <CTASection />
    </>
  );
}
