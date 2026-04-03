import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Pixelette Certified | ISO Compliance Experts UK",
  description:
    "Pixelette Certified is a UK compliance consultancy built by technologists. ISO 27001 certified practice with IRCA Lead Auditors. 50+ certifications delivered. 98% pass rate.",
  openGraph: {
    title: "About Pixelette Certified | ISO Compliance Experts UK",
    description:
      "Pixelette Certified is a UK compliance consultancy built by technologists. ISO 27001 certified practice with IRCA Lead Auditors. 50+ certifications delivered. 98% pass rate.",
  },
  alternates: {
    canonical: "https://pixelettecertified.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Pixelette Certified",
          url: "https://pixelettecertified.com",
          logo: "https://pixelettecertified.com/logos/logo-green-text.svg",
          description:
            "UK-based ISO certification and compliance consultancy specialising in technology companies.",
          foundingDate: "2024",
          parentOrganization: {
            "@type": "Organization",
            name: "Pixelette Group",
          },
          areaServed: [
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Ireland" },
            { "@type": "Country", name: "United Arab Emirates" },
          ],
          hasCredential: [
            { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ISO 27001 Certified Practice" },
            { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "IRCA Certified ISO 27001 Lead Auditors" },
            { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "IAPP CIPP/E Qualified" },
            { "@type": "EducationalOccupationalCredential", credentialCategory: "membership", name: "CQI Corporate Member" },
          ],
          knowsAbout: [
            "ISO 27001", "ISO 22301", "ISO 9001", "ISO 14001", "ISO 42001",
            "Cyber Essentials", "GDPR", "Penetration Testing", "AI Governance",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "info@pixelettecertified.com",
            availableLanguage: "English",
          },
        }}
      />
      <AboutContent />
    </>
  );
}
