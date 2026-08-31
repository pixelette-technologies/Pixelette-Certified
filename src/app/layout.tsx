import type { Metadata, Viewport } from "next";
import { Newsreader, Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientShell from "@/components/layout/ClientShell";
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
  description: "Get ISO 27001, ISO 42001, Cyber Essentials, GDPR and more in as little as 10 weeks. Fixed-fee compliance consultancy. 98% first-attempt pass rate, worldwide.",
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
    title: "Pixelette Certified | ISO Certification & Global Compliance Consultancy",
    description: "Get certified in as little as 10 weeks. Pixelette Certified delivers ISO 27001, ISO 42001, Cyber Essentials, GDPR, ISO 9001, ISO 22301 and more to businesses across every industry, worldwide. Fixed fee. 98% first-attempt pass rate.",
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
    title: "Pixelette Certified | ISO Certification & Compliance UK",
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VX5PH3RWRB" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VX5PH3RWRB');
            `,
          }}
        />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="NrhMy8upP8sv8uHS6EOSmg" async />
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
      </body>
    </html>
  );
}
