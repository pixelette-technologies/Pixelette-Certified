import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what you need to achieve and where the requirement applies. We support organisations internationally.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Pixelette Certified",
          url: `${SITE_CONFIG.url}/contact`,
          about: { "@id": `${SITE_CONFIG.url}/#organization` },
        }}
      />
      <ContactContent />
    </>
  );
}
