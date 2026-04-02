import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientShell from "@/components/layout/ClientShell";
import { OrganizationSchema } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#044143",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Pixelette Certified | ISO Certification & Compliance Consultancy UK",
    template: "%s | Pixelette Certified",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "ISO 27001 certification UK",
    "Cyber Essentials certification",
    "ISO compliance consultancy",
    "vCISO UK",
    "GDPR compliance",
    "ISO 42001 AI governance",
    "penetration testing UK",
    "information security certification",
  ],
  authors: [{ name: "Pixelette Certified" }],
  creator: "Pixelette Group",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Pixelette Certified | ISO Certification & Compliance Consultancy UK",
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/images/og/default.png",
        width: 1200,
        height: 630,
        alt: "Pixelette Certified - Compliance. Governance. Cyber Trust.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixelette Certified | ISO Certification & Compliance UK",
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logos/favicon.svg",
    apple: "/logos/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <OrganizationSchema />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ClientShell />
      </body>
    </html>
  );
}
