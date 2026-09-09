import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About | Compliance, Cyber Assurance & AI Governance",
  description:
    "Pixelette Certified is the accountable front door for compliance programmes, with credentialed specialists matched to the requirement and independent assessment coordinated where required.",
  openGraph: {
    title: "About Pixelette Certified",
    description:
      "One accountable client relationship. The right credentialed specialist for the requirement. Clear separation between implementation and independent assurance.",
  },
  alternates: {
    canonical: "https://pixelettecertified.com/about",
  },
};

/*
 * This page previously emitted three JSON-LD blocks. Two of them have been
 * removed outright rather than rewritten, because the problem was structural
 * rather than a matter of wording:
 *
 *   - Organization.hasCredential asserted a corporate ISO 27001 certification,
 *     a lead-auditor registration, a privacy qualification and an institute
 *     membership as credentials of the LEGAL ENTITY. schema.org has no property
 *     meaning "practitioners in our delivery network hold these", so there is no
 *     compliant rewrite available - only deletion. (CIPP/E was also asserted
 *     nowhere else on the site and matched no supplied certificate.)
 *
 *   - The two Person blocks paired `worksFor` with `hasCredential`, which is
 *     precisely the mechanism that turns an individual's certificates into an
 *     organisational capability in a knowledge graph. That is the exact claim
 *     the brief's publication rule exists to prevent, so both are gone. Two of
 *     the credentials listed there are not publishable at all.
 *
 * Structured data has no obligation to enumerate staff, so removing them costs
 * nothing and is correct regardless of how the staffing question resolves.
 */
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
            "UK headquartered compliance consultancy supporting organisations through ISO, Cyber Essentials, GDPR, SOC 2 and PCI DSS readiness. Certification is issued by independent certification bodies, not by Pixelette Certified.",
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
          knowsAbout: [
            "ISO 27001", "ISO 22301", "ISO 9001", "ISO 14001", "ISO 42001",
            "Cyber Essentials", "SOC 2", "PCI DSS", "GDPR", "AI Governance",
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
