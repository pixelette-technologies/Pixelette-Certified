import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Analysis of cyber security, compliance and AI governance requirements, including standards that apply internationally and rules that depend on the jurisdiction.",
  alternates: { canonical: `${SITE_CONFIG.url}/blog` },
  openGraph: {
    title: "Insights | Pixelette Certified",
    description:
      "Analysis of cyber security, compliance and AI governance requirements, including standards that apply internationally and rules that depend on the jurisdiction.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
