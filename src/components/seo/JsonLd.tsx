import { SITE_CONFIG } from "@/lib/constants";

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
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://pixelettecertified.com/#organization",
        name: "Pixelette Certified",
        legalName: SITE_CONFIG.legalEntity,
        url: "https://pixelettecertified.com",
        logo: {
          "@type": "ImageObject",
          url: "https://pixelettecertified.com/logos/logo-white-text.svg",
          width: 200,
          height: 50,
        },
        image: "https://pixelettecertified.com/images/og/default.png",
        telephone: "+442079460958",
        email: "info@pixelettecertified.com",
        /*
         * The closing sentence is the publication rule in machine-readable
         * form. OrganizationSchema renders from app/layout.tsx, so this string
         * is emitted on EVERY url in the sitemap, and it is what a rich result
         * or an AI overview is most likely to lift. Removing that clause would
         * silently strip the disclosure from the whole property, which is why
         * the claims gate asserts it is still here.
         */
        description:
          "UK headquartered compliance consultancy. ISO 27001 and ISO 42001 implementation and certification readiness, Cyber Essentials Readiness and Coordination, GDPR and privacy programmes, SOC 2 Readiness, PCI DSS Readiness and Compliance Support, vCISO and vDPO, and managed compliance. Certification is issued by independent certification bodies, not by Pixelette Certified.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "66 Paul Street",
          addressLocality: "London",
          postalCode: "EC2A 4NA",
          addressRegion: "England",
          addressCountry: "GB",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 51.524,
          longitude: -0.0844,
        },
        areaServed: [
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Ireland" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "Qatar" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Compliance, Cyber Assurance & AI Governance Services",
          /*
           * Offer names must not imply we sell the certificate. An Offer called
           * An offer named for the certificate itself, from an entity with no
           * licence to award it, says in machine-readable form that we issue it. Every
           * name here is the approved public service name from the brief.
           */
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "ISO/IEC 27001 Implementation & Certification Readiness", url: "https://pixelettecertified.com/services/iso-27001" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "ISO/IEC 42001 AI Governance & Certification Readiness", url: "https://pixelettecertified.com/services/iso-42001" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SOC 2 Readiness", url: "https://pixelettecertified.com/services/soc-2" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cyber Essentials Readiness & Coordination", url: "https://pixelettecertified.com/services/cyber-essentials" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "GDPR & Privacy Compliance", url: "https://pixelettecertified.com/services/gdpr-privacy" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "vCISO & GRC Advisory", url: "https://pixelettecertified.com/services/vciso" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Privacy & vDPO", url: "https://pixelettecertified.com/services/vdpo" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed Compliance", url: "https://pixelettecertified.com/services/managed-compliance" } },
          ],
        },
        knowsAbout: [
          "ISO 27001",
          "ISO 42001",
          "ISO 22301",
          "ISO 9001",
          "ISO 14001",
          "Cyber Essentials",
          "SOC 2",
          "PCI DSS",
          "GDPR",
          "Information Security Management",
          "AI Governance",
          "Business Continuity",
          "Virtual CISO",
          "Compliance Consultancy",
        ],
        sameAs: [
          "https://www.linkedin.com/company/pixelette-certified",
          "https://twitter.com/pixelettecert",
        ],
        parentOrganization: {
          "@type": "Organization",
          "@id": "https://pixelette.tech/#organization",
          name: "Pixelette Group",
          legalName: SITE_CONFIG.legalEntity,
        },
      }}
    />
  );
}
