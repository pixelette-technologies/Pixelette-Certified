import type { Metadata, Viewport } from "next";
import { Newsreader, Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientShell from "@/components/layout/ClientShell";
import Analytics from "@/components/privacy/Analytics";
import { OrganizationSchema } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

/* Display serif. Variable, so one file covers 300/400/500, and the opsz axis
   (6..72) lets the browser adjust contrast with size — which is what the
   pattern guide's own Google Fonts request asks for. */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  style: "normal",
  variable: "--font-newsreader",
  display: "swap",
});

/* Body and UI sans. Variable: one file covers 300–700. */
const outfit = Outfit({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-outfit",
  display: "swap",
});

/* Eyebrows, stat figures, table headers, form labels, metadata, citations.
   IBM Plex Mono has no variable build on Google Fonts, so weight is required;
   we ship only the two statics the system uses. preload:false because it never
   carries the LCP element and this saves two blocking fetches on first paint. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: "normal",
  variable: "--font-ibm-plex-mono",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "ISO Certification & Compliance | Pixelette Certified",
    template: "%s | Pixelette Certified",
  },
  // This is the DEFAULT description, inherited by every page that does not set
  // its own. It is therefore the single highest-leverage string on the property,
  // and the reason a source grep is not sufficient verification: a page with no
  // description of its own silently republishes whatever is written here.
  description: "Pixelette Certified helps organisations meet the security, privacy, AI-governance and assurance requirements standing between them and enterprise customers, tenders, investors and regulated markets.",
  keywords: [
    "ISO 27001 readiness UK",
    "Cyber Essentials readiness",
    "compliance consultancy UK",
    "vCISO UK",
    "GDPR compliance",
    "ISO 42001 AI governance",
    "SOC 2 readiness",
    "managed compliance",
  ],
  authors: [{ name: "Pixelette Certified" }],
  creator: "Pixelette Group",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Pixelette Certified | Compliance, Cyber Assurance & AI Governance",
    description: "Turn compliance from a deal blocker into proof you are ready. ISO 27001 and ISO 42001 readiness, SOC 2 readiness, vCISO, privacy and vDPO, and managed compliance, with independent assessment coordinated where required.",
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
    site: "@pixelettecert",
    creator: "@pixelettecert",
    title: "Pixelette Certified | Compliance, Cyber Assurance & AI Governance",
    description: SITE_CONFIG.description,
    images: ["/images/og/default.png"],
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
    <html
      lang="en"
      className={`${newsreader.variable} ${outfit.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-site-verification" content="C7bI6NnGsWlyxSL7Ax2Ii72eg_y9UtjRDR2KbJCu4gg" />
        {/* Google Analytics and Ahrefs load from <Analytics /> below, and only
            while the visitor's Privacy choices setting allows it. */}
      </head>
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
        <Analytics />
      </body>
    </html>
  );
}
