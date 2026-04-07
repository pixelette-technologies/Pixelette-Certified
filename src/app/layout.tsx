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
    default: "Pixelette Certified | ISO Certification & Global Compliance Consultancy",
    template: "%s | Pixelette Certified",
  },
  description: "Get certified in as little as 10 weeks. Pixelette Certified delivers ISO 27001, ISO 42001, Cyber Essentials, GDPR, ISO 9001, ISO 22301 and more to businesses across every industry, worldwide. Fixed fee. 98% first-attempt pass rate.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","REPLACE_WITH_CLARITY_ID");
            `,
          }}
        />
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
