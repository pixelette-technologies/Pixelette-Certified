import type { Metadata } from "next";
import HomeHero from "@/components/sections/home/HomeHero";
import HomeServices from "@/components/sections/home/HomeServices";
import FromRequirement from "@/components/sections/home/FromRequirement";
import HomeMarkets from "@/components/sections/home/HomeMarkets";
import AiGovernance from "@/components/sections/home/AiGovernance";
import ExpertiseStrip from "@/components/sections/home/ExpertiseStrip";
import CTASection from "@/components/sections/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import { OG_IMAGE, SITE_CONFIG } from "@/lib/constants";

/** Extractable for the site assistant KB builder (exact literals only). */
const pageMetadata = (m: { title: string; description: string; path: string }) => m;
const homeMeta = pageMetadata({
  title: "Pixelette Certified | Cyber Security, Compliance & AI Governance",
  description:
    "Pixelette Certified helps organisations meet cyber security, compliance and AI governance requirements. We support organisations internationally, adapting each engagement to the relevant standard, customer requirement and jurisdiction.",
  path: "/",
});

export const metadata: Metadata = {
  /*
   * `absolute` because the root layout applies a "%s | Pixelette Certified"
   * template, which would otherwise repeat the name.
   */
  title: {
    absolute: homeMeta.title,
  },
  description: homeMeta.description,
  alternates: { canonical: SITE_CONFIG.url },
  openGraph: {
    title: homeMeta.title,
    description: homeMeta.description,
    url: SITE_CONFIG.url,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: homeMeta.title,
    description: homeMeta.description,
    images: [OG_IMAGE.url],
  },
};

const faqs = [
  {
    q: "What does Pixelette Certified do?",
    a: "Pixelette Certified helps organisations meet cyber security, compliance and AI governance requirements. We support organisations internationally, adapting each engagement to the relevant standard, customer requirement and jurisdiction.",
  },
  {
    q: "Do you help with ISO 27001?",
    a: "Yes. We provide ISO 27001 readiness and implementation: scope, risk assessment, ISMS, Statement of Applicability, internal audit and support through independent certification.",
  },
  {
    q: "What is AI governance and ISO 42001?",
    a: "AI governance is accountable structure for the AI your organisation builds, buys and uses. ISO 42001 readiness is one recognised route where certification is sought; other frameworks may apply depending on your market.",
  },
  {
    q: "How do you approach privacy and data governance?",
    a: "We help organisations establish privacy and data governance that matches the jurisdictions and customer requirements that apply to them, including programmes that sit alongside information security management.",
  },
  {
    q: "How is an engagement agreed?",
    a: "Following an initial review, we define the scope, delivery approach and proposed engagement in writing before work begins.",
  },
];
void faqs; // kept for scripts/build-pix-kb.mjs

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
