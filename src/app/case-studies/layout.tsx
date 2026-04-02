import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | ISO Certification Success Stories",
  description:
    "See how UK technology companies achieved ISO 27001, Cyber Essentials, and ISO 42001 certification with Pixelette Certified. Real results, real timelines.",
  openGraph: {
    title: "Case Studies | Pixelette Certified",
    description:
      "ISO certification success stories from UK technology companies.",
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
