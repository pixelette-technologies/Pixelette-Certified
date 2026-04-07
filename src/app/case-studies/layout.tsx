import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | ISO Certification Results | Pixelette Certified",
  description:
    "Real results for real businesses. ISO 27001, ISO 42001, Cyber Essentials and GDPR certification case studies across FinTech, AI, healthcare, and more. See how Pixelette Certified delivers.",
  alternates: {
    canonical: "https://pixelettecertified.com/case-studies",
  },
  openGraph: {
    title: "Case Studies | ISO Certification Results | Pixelette Certified",
    description:
      "Real results for real businesses. ISO 27001, ISO 42001, Cyber Essentials and GDPR certification case studies across FinTech, AI, healthcare, and more. See how Pixelette Certified delivers.",
    type: "website",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
