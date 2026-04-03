import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ISO Certification Case Studies | Pixelette Certified",
  description:
    "Real results. UK technology companies certified in weeks with measurable ROI. ISO 27001, ISO 42001, and Cyber Essentials case studies.",
  openGraph: {
    title: "ISO Certification Case Studies | Pixelette Certified",
    description:
      "Real results. UK technology companies certified in weeks with measurable ROI. ISO 27001, ISO 42001, and Cyber Essentials case studies.",
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
