import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import JsonLd from "@/components/seo/JsonLd";
import { OG_IMAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you need to achieve and where the requirement applies. We support organisations internationally.",
  openGraph: {
    title: "Contact | Pixelette Certified",
    description: "Tell us what you need to achieve and where the requirement applies.",
    url: `${SITE_CONFIG.url}/contact`,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  alternates: { canonical: `${SITE_CONFIG.url}/contact` },
};

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
