import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /*
   * redirects() is evaluated BEFORE filesystem routing, which is what makes the
   * withdrawal order safe: these rules can ship in an earlier deploy than the
   * page deletions, and the deletions can ship after, with no 404 window in
   * either direction.
   *
   * `permanent: true` emits 308, not 301. Google treats the two equivalently.
   * Noted so nobody "fixes" it later.
   */
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.pixelettecertified.com" }],
      destination: "https://pixelettecertified.com/:path*",
      permanent: true,
    },

    // Withdrawn: penetration testing is HOLD for the first release. No qualifying
    // corporate or tester evidence was supplied, and the page carried a
    // "CREST-certified testers" claim.
    {
      source: "/services/penetration-testing",
      destination: "/services",
      permanent: true,
    },

    // Withdrawn: all three case studies were anonymous, with no client identity,
    // permission or source evidence. Detail pages point at the service the study
    // concerned so the redirect stays topically relevant rather than dumping
    // every inbound link on one page.
    { source: "/case-studies", destination: "/services", permanent: true },
    {
      source: "/case-studies/uk-fintech-iso-27001",
      destination: "/services/iso-27001",
      permanent: true,
    },
    {
      source: "/case-studies/ai-saas-iso-42001-iso-27001",
      destination: "/services/iso-42001",
      permanent: true,
    },
    {
      source: "/case-studies/healthcare-tech-cyber-essentials-iso-27001",
      destination: "/services/iso-27001",
      permanent: true,
    },
    // Catch-all for any case-study URL not listed above.
    { source: "/case-studies/:slug", destination: "/services", permanent: true },

    /*
     * Renamed, not withdrawn. The page's own eyebrow already read "Who We Help",
     * and the new URL matches both the nav label and the buyer's language.
     *
     * The canonical tag and the ItemList JSON-LD URLs in the page moved with it.
     * Leaving either pointing at /industries would have published a canonical
     * that redirects away from itself, which is a self-contradicting signal that
     * can stall the transfer for weeks.
     */
    { source: "/industries", destination: "/who-we-help", permanent: true },

    /*
     * The one blog post that could not be rewritten in place: the banned timing
     * claim was in the slug itself, and a URL is published copy. The replacement
     * serves the same search intent and reuses the genuinely claim-free material
     * (the compression levers, the ISO/IEC 27006 point, the five questions to
     * ask a consultant), so a 301 to it passes essentially all link equity while
     * removing the claim from the address bar.
     */
    {
      source: "/blog/iso-27001-10-weeks-vs-6-months",
      destination: "/blog/iso-27001-fast-track-what-changes",
      permanent: true,
    },
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
};

export default nextConfig;
