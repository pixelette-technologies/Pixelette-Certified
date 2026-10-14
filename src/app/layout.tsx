import type { Metadata, Viewport } from "next";
import { Newsreader, Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "@/components/assistant.css";
import "@/components/pixsignal.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientShell from "@/components/layout/ClientShell";
import Analytics from "@/components/privacy/Analytics";
import { OrganizationSchema } from "@/components/seo/JsonLd";
import { OG_IMAGE, SITE_CONFIG } from "@/lib/constants";
import { AssistantBoundary } from "@/components/AssistantBoundary";
import { SiteAssistant } from "@/components/SiteAssistant";
import { pixContext } from "@/lib/pix/server-context";

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
    default: "Pixelette Certified | Cyber Security, Compliance & AI Governance",
    template: "%s | Pixelette Certified",
  },
  // This is the DEFAULT description, inherited by every page that does not set
  // its own. It is therefore the single highest-leverage string on the property,
  // and the reason a source grep is not sufficient verification: a page with no
  // description of its own silently republishes whatever is written here.
  description: SITE_CONFIG.description,
  authors: [{ name: "Pixelette Certified" }],
  creator: "Pixelette Group",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Pixelette Certified | Cyber Security, Compliance & AI Governance",
    description: SITE_CONFIG.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pixelettecert",
    creator: "@pixelettecert",
    title: "Pixelette Certified | Cyber Security, Compliance & AI Governance",
    description: SITE_CONFIG.description,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logos/favicon.png",
    apple: "/logos/favicon.png",
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
        <AssistantBoundary>
          <SiteAssistant context={pixContext()} />
        </AssistantBoundary>
        <Analytics />
      </body>
    </html>
  );
}
