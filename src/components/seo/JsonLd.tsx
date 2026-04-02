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
        "@type": "Organization",
        name: "Pixelette Certified",
        url: "https://pixelettecertified.com",
        logo: "https://pixelettecertified.com/logos/logo-green-text.svg",
        description:
          "UK-based ISO certification and compliance consultancy. ISO 27001, Cyber Essentials, GDPR, vCISO, AI Governance.",
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@pixelettecertified.com",
          contactType: "sales",
          availableLanguage: "English",
        },
        sameAs: [
          "https://www.linkedin.com/company/pixelette-certified",
        ],
        parentOrganization: {
          "@type": "Organization",
          name: "Pixelette Group",
        },
        areaServed: ["GB", "IE", "AE", "EU"],
      }}
    />
  );
}
