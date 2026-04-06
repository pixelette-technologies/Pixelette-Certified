import type { Metadata } from "next";
import { services } from "@/data/services";
import JsonLd from "@/components/seo/JsonLd";
import ServicesOverviewContent from "./ServicesOverviewContent";

export const metadata: Metadata = {
  title: "Our Services | ISO Certification & Global Compliance Consultancy | Pixelette Certified",
  description:
    "ISO 27001, ISO 42001, ISO 9001, ISO 22301, ISO 14001, Cyber Essentials, GDPR, vCISO, vDPO, and Penetration Testing. Global compliance consultancy for businesses across every industry.",
  keywords: [
    "ISO certification services UK",
    "cybersecurity services",
    "compliance consultancy",
    "ISO 27001",
    "Cyber Essentials",
    "vCISO",
    "GDPR compliance",
  ],
  openGraph: {
    title: "Our Services | Pixelette Certified",
    description:
      "ISO certification, cybersecurity, and compliance services for UK technology companies.",
    url: "https://pixelettecertified.com/services",
  },
  alternates: {
    canonical: "https://pixelettecertified.com/services",
  },
};

const categories = [
  {
    key: "iso" as const,
    label: "ISO Certification",
    description: "International standards that open doors to enterprise clients and government contracts.",
  },
  {
    key: "cyber" as const,
    label: "Cybersecurity & Testing",
    description: "UK government-backed certifications, vulnerability assessments, and penetration testing.",
  },
  {
    key: "advisory" as const,
    label: "Advisory Services",
    description: "Senior security and privacy leadership on a flexible retainer.",
  },
  {
    key: "privacy" as const,
    label: "Privacy & Data Protection",
    description: "Turn your data obligations into a competitive advantage.",
  },
  {
    key: "grc" as const,
    label: "GRC & Regulatory Frameworks",
    description: "SOC 2, SAMA CSF, NCA ECC/CCC, QCB/NIA, sector-specific and regional regulatory compliance.",
  },
  {
    key: "architecture" as const,
    label: "Security Architecture",
    description: "Zero Trust, Active Directory hardening, and cloud security architecture design.",
  },
  {
    key: "bcdr" as const,
    label: "Business Continuity & Disaster Recovery",
    description: "BIA, BRA, and DR planning to ensure your organisation can withstand disruption.",
  },
  {
    key: "ai-governance" as const,
    label: "AI Governance",
    description: "AI risk assessment and governance aligned to NIST AI RMF and the EU AI Act.",
  },
  {
    key: "managed" as const,
    label: "Managed Advisory",
    description: "Continuous GRC advisory subscription. White-label available for partners and MSPs.",
  },
];

const groupedServices = categories
  .map((cat) => ({
    ...cat,
    services: services
      .filter((s) => s.category === cat.key)
      .map(({ icon, ...rest }) => rest),
  }))
  .filter((cat) => cat.services.length > 0);

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Pixelette Certified Services",
          description: "ISO certification, cybersecurity, and compliance services.",
          url: "https://pixelettecertified.com/services",
          itemListElement: services.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: `https://pixelettecertified.com/services/${service.slug}`,
            },
          })),
        }}
      />
      <ServicesOverviewContent groupedServices={groupedServices} />
    </>
  );
}
