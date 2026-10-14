import type { Metadata } from "next";
import { OG_IMAGE, SITE_CONFIG } from "@/lib/constants";

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
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
