import { SITE_CONFIG } from "@/lib/constants";
import { getCoreServices } from "@/data/services";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const url = SITE_CONFIG.url;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${url}/#organization`,
        name: SITE_CONFIG.name,
        legalName: SITE_CONFIG.legalEntity,
        url,
        logo: {
          "@type": "ImageObject",
          url: `${url}/logos/logo-white-text.svg`,
          width: 200,
          height: 50,
        },
        image: `${url}/images/og/default.png`,
        email: SITE_CONFIG.email,
        /*
         * The closing sentence is the independence rule in machine-readable
         * form. OrganizationSchema renders from app/layout.tsx on every URL, so
         * removing the clause would strip the disclosure sitewide, which is why
         * the claims gate asserts it is still here.
         */
        description:
          "UK-headquartered cyber security, compliance, assurance and AI governance consultancy focused on the UK, United States and GCC. ISO 27001 readiness and implementation, AI governance and ISO 42001, SOC 2 readiness, cyber assurance and testing, privacy and data governance, vCISO and GRC advisory, business continuity and GCC regulatory compliance. Certification is issued by independent certification bodies and SOC 2 reports by licensed CPA firms, not by Pixelette Certified.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "66 Paul Street",
          addressLocality: "London",
          postalCode: "EC2A 4NA",
          addressRegion: "England",
          addressCountry: "GB",
        },
        areaServed: [
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "Qatar" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
        /*
         * Services without offers or prices (§6). Names are the public service
         * names and none implies that Pixelette Certified issues a certificate.
         */
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cyber security, compliance, assurance and AI governance services",
          itemListElement: getCoreServices().map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, url: `${url}/services/${s.slug}` },
          })),
        },
        knowsAbout: [
          "ISO/IEC 27001",
          "ISO/IEC 42001",
          "SOC 2",
          "ISO 22301",
          "Cyber Essentials",
          "UK GDPR",
          "NIST Cybersecurity Framework",
          "NIST AI Risk Management Framework",
          "AI governance",
          "Penetration testing",
          "Business continuity",
          "NCA Essential Cybersecurity Controls",
          "SAMA Cyber Security Framework",
          "Qatar National Information Assurance",
        ],
        sameAs: ["https://www.linkedin.com/company/pixelette-certified", SITE_CONFIG.social.twitter],
        parentOrganization: {
          "@type": "Organization",
          name: "Pixelette Group",
        },
      }}
    />
  );
}
