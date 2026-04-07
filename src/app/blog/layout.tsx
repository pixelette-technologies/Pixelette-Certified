import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance & ISO Certification Blog | Pixelette Certified",
  description:
    "Expert insights on ISO 27001, Cyber Essentials, GDPR and AI governance for UK technology companies. Written by certified compliance practitioners.",
  alternates: {
    canonical: "https://pixelettecertified.com/blog",
  },
  openGraph: {
    title: "Compliance & ISO Certification Blog | Pixelette Certified",
    description:
      "Expert insights on ISO 27001, Cyber Essentials, GDPR and AI governance for UK technology companies. Written by certified compliance practitioners.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
