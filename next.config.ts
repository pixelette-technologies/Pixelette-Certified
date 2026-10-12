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

    /*
     * 25 September 2026 rebuild (§24, §39). Every page that was renamed,
     * consolidated or withdrawn points at its closest current equivalent, so
     * no inbound link or bookmark lands on a 404 or on old sales copy.
     */

    // Penetration testing now sits within cyber assurance and testing (§18).
    { source: "/services/penetration-testing", destination: "/services/cyber-assurance", permanent: true },

    // GDPR and vDPO consolidated into privacy and data governance (§19).
    { source: "/services/gdpr-privacy", destination: "/services/privacy", permanent: true },
    { source: "/services/vdpo", destination: "/services/privacy", permanent: true },

    // Managed compliance is ongoing GRC support within vCISO & GRC advisory (§20).
    { source: "/services/managed-compliance", destination: "/services/vciso", permanent: true },

    // The additional-frameworks list is now a section of the services hub (§14).
    { source: "/services/additional-frameworks", destination: "/services", permanent: true },

    // ISO 9001 and ISO 14001 are no longer promoted (§24).
    { source: "/services/iso-9001", destination: "/services", permanent: true },
    { source: "/services/iso-14001", destination: "/services", permanent: true },

    // No public pricing anywhere (§6).
    { source: "/pricing", destination: "/contact", permanent: true },

    // Resources merged into Insights, which keeps the /blog address (§32).
    { source: "/resources", destination: "/blog", permanent: true },

    // Case studies became Experience, then Expertise. Old addresses still resolve.
    { source: "/case-studies", destination: "/expertise", permanent: true },
    { source: "/case-studies/:slug", destination: "/expertise", permanent: true },
    { source: "/experience", destination: "/expertise", permanent: true },

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

    // Insights retired or renamed in the rebuild (§32). The first was built
    // entirely on unsourced cost figures; its sound material now lives in the
    // questionnaire article. The second had a slug that disparaged competitors.
    {
      source: "/blog/real-cost-not-being-iso-27001-certified",
      destination: "/blog/iso-27001-security-questionnaire",
      permanent: true,
    },
    {
      source: "/blog/vanta-drata-vs-real-consultancy",
      destination: "/blog/compliance-automation-platforms-and-consultancy",
      permanent: true,
    },

    // Old Insight category archives, mapped to the five new categories.
    { source: "/blog/category/iso-27001", destination: "/blog?category=cyber-and-grc", permanent: true },
    { source: "/blog/category/advisory", destination: "/blog?category=cyber-and-grc", permanent: true },
    { source: "/blog/category/soc-2", destination: "/blog?category=us-assurance", permanent: true },
    { source: "/blog/category/fintech", destination: "/blog?category=uk-compliance", permanent: true },
    { source: "/blog/category/healthcare", destination: "/blog?category=uk-compliance", permanent: true },
    { source: "/blog/category/legal", destination: "/blog?category=uk-compliance", permanent: true },
    { source: "/blog/category/compliance", destination: "/blog?category=uk-compliance", permanent: true },
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
