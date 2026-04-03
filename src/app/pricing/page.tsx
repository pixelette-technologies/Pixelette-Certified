import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing | Transparent Global Compliance Consultancy Fees | Pixelette Certified",
  description:
    "Fixed-fee compliance certification pricing for businesses worldwide. ISO 27001, ISO 42001, Cyber Essentials, GDPR, ISO 9001 and more. No hidden fees. Essentials from £8,500. Globally delivered.",
  openGraph: {
    title: "Pricing | Transparent Global Compliance Consultancy Fees | Pixelette Certified",
    description:
      "Fixed-fee compliance certification pricing for businesses worldwide. ISO 27001, ISO 42001, Cyber Essentials, GDPR, ISO 9001 and more. No hidden fees. Essentials from £8,500. Globally delivered.",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
