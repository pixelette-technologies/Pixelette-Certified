import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ProblemSection from "@/components/sections/ProblemSection";
import ThreeStepProcess from "@/components/sections/ThreeStepProcess";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Differentiators from "@/components/sections/Differentiators";
import Testimonials from "@/components/sections/Testimonials";
import Certifications from "@/components/sections/Certifications";
import Newsletter from "@/components/sections/Newsletter";
import CTASection from "@/components/sections/CTASection";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://pixelettecertified.com",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Pixelette Certified",
          url: "https://pixelettecertified.com",
          description:
            "UK-headquartered ISO certification and compliance consultancy. ISO 27001, ISO 42001, Cyber Essentials, GDPR, vCISO, vDPO, SOC 2, penetration testing, and AI governance. Globally delivered across UK, UAE, Saudi Arabia, Qatar, EU, Americas, and APAC.",
        }}
      />
      <Hero />
      <TrustBar />
      <ProblemSection />
      <ThreeStepProcess />
      <ServicesGrid />
      <Differentiators />
      <Testimonials />
      <Certifications />
      <Newsletter />
      <CTASection />
    </>
  );
}
