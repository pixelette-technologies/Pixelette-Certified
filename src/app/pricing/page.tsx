import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing | Transparent Compliance Consultancy Fees",
  description:
    "Straightforward pricing for ISO 27001, ISO 22301, ISO 42001, Cyber Essentials, GDPR, vCISO, and penetration testing. No hidden fees. All prices published.",
  openGraph: {
    title: "Pricing | Pixelette Certified",
    description:
      "Transparent, fixed-fee pricing for ISO certification and compliance services. From £1,500 for gap analysis to full enterprise packages.",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
