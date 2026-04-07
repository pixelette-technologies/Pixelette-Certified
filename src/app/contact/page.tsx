import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Pixelette Certified | Book Your Assessment | Global Compliance Consultancy",
  description:
    "Book a free 30-minute gap analysis with Pixelette Certified. Global ISO 27001, ISO 42001, Cyber Essentials and GDPR consultancy serving businesses across every industry worldwide. Response within 1 working day.",
  openGraph: {
    title: "Contact Pixelette Certified | Book Your Assessment | Global Compliance Consultancy",
    description:
      "Book a free 30-minute gap analysis with Pixelette Certified. Global ISO 27001, ISO 42001, Cyber Essentials and GDPR consultancy serving businesses across every industry worldwide.",
    url: "https://pixelettecertified.com/contact",
  },
  alternates: { canonical: "https://pixelettecertified.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Pixelette Certified",
          description:
            "Book a free gap analysis with Pixelette Certified, UK ISO 27001 and compliance consultancy.",
          url: "https://pixelettecertified.com/contact",
          mainEntity: {
            "@type": "Organization",
            name: "Pixelette Certified",
            telephone: "+442079460958",
            email: "info@pixelettecertified.com",
          },
        }}
      />
      <ContactContent />
    </>
  );
}
