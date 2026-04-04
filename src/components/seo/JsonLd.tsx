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
        name: "Pixelette Certified",
        url: "https://pixelettecertified.com",
        logo: "https://pixelettecertified.com/logos/logo-white-text.svg",
        telephone: "+442079460958",
        email: "info@pixelettecertified.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "66 Paul Street",
          addressLocality: "London",
          postalCode: "EC2A 4NA",
          addressRegion: "England",
          addressCountry: "GB",
        },
        areaServed: ["GB", "IE", "AE", "EU"],
        serviceType: [
          "ISO 27001 Certification",
          "ISO 42001 AI Governance Certification",
          "Cyber Essentials Certification",
          "GDPR Compliance",
          "Virtual CISO",
          "Penetration Testing",
        ],
        sameAs: [
          "https://www.linkedin.com/company/pixelette-certified",
        ],
        parentOrganization: {
          "@type": "Organization",
          name: "Pixelette Group",
        },
      }}
    />
  );
}
