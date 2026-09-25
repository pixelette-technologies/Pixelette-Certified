import type { Metadata } from "next";
import HomeHero from "@/components/sections/home/HomeHero";
import WorkingTowards from "@/components/sections/home/WorkingTowards";
import CoreServices from "@/components/sections/home/CoreServices";
import HowItWorks from "@/components/sections/home/HowItWorks";
import DeliveryModel from "@/components/sections/home/DeliveryModel";
import Markets from "@/components/sections/home/Markets";
import AiGovernance from "@/components/sections/home/AiGovernance";
import Credentials from "@/components/sections/home/Credentials";
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
 * The homepage, per §9 to §13 of the 25 September 2026 rebuild specification.
 *
 * It contains no copy of its own: every string lives in its section component
 * or under src/data, so there is one place to look for any sentence. Eight
 * sections and a closing call to action, kept deliberately short (§42).
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
      <WorkingTowards />
      <CoreServices />
      <HowItWorks />
      <DeliveryModel />
      <Markets />
      <AiGovernance />
      <Credentials />
      <CTASection />
    </>
  );
}
