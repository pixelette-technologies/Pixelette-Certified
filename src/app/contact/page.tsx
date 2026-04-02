import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Book a Free Gap Analysis",
  description:
    "Get in touch with Pixelette Certified. Book a free gap analysis, request a quote, or speak with a compliance consultant. London, UK.",
  openGraph: {
    title: "Contact Pixelette Certified",
    description:
      "Book a free 30-minute gap analysis. No obligation, no sales pressure. Find out where your compliance gaps are and what certification requires.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
