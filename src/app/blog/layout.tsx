import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Analysis of cyber security, compliance, assurance and AI governance requirements in the UK, United States and GCC, with references to primary sources.",
  alternates: { canonical: `${SITE_CONFIG.url}/blog` },
  openGraph: {
    title: "Insights | Pixelette Certified",
    description:
      "Analysis of cyber security, compliance, assurance and AI governance requirements in the UK, United States and GCC.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
