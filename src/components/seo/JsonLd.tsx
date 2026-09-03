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
        legalName: "Pixelette Group Ltd",
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
        description:
          "UK headquartered ISO certification and compliance consultancy. ISO 27001, ISO 42001, Cyber Essentials, GDPR, vCISO, vDPO, and penetration testing. Fixed fee. 98% first-attempt pass rate. Globally delivered.",
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
          name: "ISO Certification & Compliance Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "ISO 27001 Certification", url: "https://pixelettecertified.com/services/iso-27001" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "ISO 42001 AI Governance Certification", url: "https://pixelettecertified.com/services/iso-42001" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cyber Essentials Certification", url: "https://pixelettecertified.com/services/cyber-essentials" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "GDPR & Privacy Compliance", url: "https://pixelettecertified.com/services/gdpr-privacy" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Virtual CISO (vCISO)", url: "https://pixelettecertified.com/services/vciso" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Penetration Testing", url: "https://pixelettecertified.com/services/penetration-testing" } },
          ],
        },
        knowsAbout: [
          "ISO 27001",
          "ISO 42001",
          "ISO 22301",
          "ISO 9001",
          "ISO 14001",
          "Cyber Essentials",
          "GDPR",
          "Information Security Management",
          "AI Governance",
          "Business Continuity",
          "Penetration Testing",
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
          legalName: "Pixelette Group Ltd",
        },
      }}
    />
  );
}
