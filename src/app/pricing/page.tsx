import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Compliance Certification Pricing | Pixelette Certified UK",
  description:
    "Transparent, fixed-fee pricing for ISO 27001, ISO 42001, Cyber Essentials and GDPR. No hidden fees. Essentials from £8,500. Published pricing — no surprises.",
  openGraph: {
    title: "Compliance Certification Pricing | Pixelette Certified UK",
    description:
      "Transparent, fixed-fee pricing for ISO 27001, ISO 42001, Cyber Essentials and GDPR. No hidden fees. Essentials from £8,500. Published pricing — no surprises.",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
