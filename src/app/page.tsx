import type { Metadata } from "next";
import HomeHero from "@/components/sections/home/HomeHero";
import BuyerTriggers from "@/components/sections/home/BuyerTriggers";
import DeliveryModel from "@/components/sections/home/DeliveryModel";
import CommercialPillars from "@/components/sections/home/CommercialPillars";
import HowItWorks from "@/components/sections/home/HowItWorks";
import WhoWeHelp from "@/components/sections/home/WhoWeHelp";
import AiGovernance from "@/components/sections/home/AiGovernance";
import Credentials from "@/components/sections/home/Credentials";
import EngagementModels from "@/components/sections/home/EngagementModels";
import Transparency from "@/components/sections/home/Transparency";
import EvidenceNote from "@/components/sections/home/EvidenceNote";
import PositioningStatement from "@/components/sections/home/PositioningStatement";
import CTASection from "@/components/sections/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import { contactHref } from "@/lib/contact/constants";

export const metadata: Metadata = {
  /*
   * `absolute` because the root layout applies a "%s | Pixelette Certified"
   * template. A bare string here would render "... | Pixelette Certified |
   * Pixelette Certified".
   */
  title: {
    absolute: "Pixelette Certified | Compliance, ISO Readiness, Cyber Assurance & AI Governance",
  },
  description:
    "Pixelette Certified helps organisations become enterprise-ready through ISO 27001 and ISO 42001 readiness, SOC 2 readiness, vCISO, privacy, AI governance and managed compliance support.",
  alternates: {
    canonical: "https://pixelettecertified.com",
  },
};

/**
 * The homepage.
 *
 * Contains no copy of its own. Every string lives in the section that renders
 * it or in a file under src/data, which is what makes a claims sweep tractable:
 * there is exactly one place to look for any given sentence.
 *
 * Section order follows the 8 September 2026 brief, and the ordering is an
 * argument rather than a layout. It opens with the visitor's problem, lets them
 * self-identify by trigger, explains who is accountable before naming any
 * service, and only then sells. Proof comes last, and says plainly that there
 * is none yet.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://pixelettecertified.com/#website",
          name: "Pixelette Certified",
          url: "https://pixelettecertified.com",
          description:
            "UK headquartered compliance consultancy. ISO 27001 and ISO 42001 implementation and certification readiness, SOC 2 readiness, Cyber Essentials readiness and coordination, GDPR and privacy, vCISO, vDPO and managed compliance. Delivered across UK, UAE, Saudi Arabia, Qatar, EU, Americas and APAC.",
          publisher: { "@id": "https://pixelettecertified.com/#organization" },
        }}
      />

      <HomeHero />
      <BuyerTriggers />
      <DeliveryModel />
      <CommercialPillars />
      <HowItWorks />
      <WhoWeHelp />
      <AiGovernance />
      <Credentials />
      <EngagementModels />
      <Transparency />
      <EvidenceNote />
      <PositioningStatement />

      <CTASection
        headline="Tell us what you've been asked to prove."
        description="A customer, tender, investor or regulator has already given you the starting point. Send us the requirement or book a 30-minute compliance diagnostic, and we will help you identify the right route, the likely work involved and the specialist capability required."
        primaryCta="Book a 30-Minute Compliance Diagnostic"
        primaryHref="/contact"
        secondaryCta="Send Us the Requirement"
        secondaryHref={contactHref("tender-requirement")}
      />
    </>
  );
}
