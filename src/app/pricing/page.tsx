import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing | Fixed-Fee Compliance Consultancy | Pixelette Certified",
  description:
    "Fixed-fee proposals. No hourly billing. No scope creep. 90 days post-certification support included.",
  alternates: {
    canonical: "https://pixelettecertified.com/pricing",
  },
  openGraph: {
    title: "Pricing | Fixed-Fee Compliance Consultancy | Pixelette Certified",
    description:
      "Fixed-fee proposals. No hourly billing. No scope creep. 90 days post-certification support included.",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
