import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Insights on ISO Certification, Cybersecurity & Compliance",
  description:
    "Expert guides and insights on ISO 27001, Cyber Essentials, GDPR, AI governance, and compliance for UK technology companies. Pixelette Certified blog.",
  openGraph: {
    title: "Blog | Pixelette Certified",
    description:
      "Expert guides and insights on ISO certification, cybersecurity, and compliance for UK technology companies.",
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
