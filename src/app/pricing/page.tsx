import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing | Fixed-Fee Compliance Consultancy | Pixelette Certified",
  description:
    "Every engagement is scoped individually and priced as a fixed-fee project. No hourly billing, no scope creep. We commit to beating any comparable quote by at least 10%. Book a free 30-minute gap analysis.",
  openGraph: {
    title: "Pricing | Fixed-Fee Compliance Consultancy | Pixelette Certified",
    description:
      "Every engagement is scoped individually and priced as a fixed-fee project. No hourly billing, no scope creep. We commit to beating any comparable quote by at least 10%. Book a free 30-minute gap analysis.",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
