export const SITE_CONFIG = {
  name: "Pixelette Certified",
  tagline: "Cyber security, compliance, assurance and AI governance",
  description:
    "Pixelette Certified helps organisations meet cyber security, compliance and AI governance requirements. We support organisations internationally, adapting each engagement to the relevant standard, customer requirement and jurisdiction.",
  url: "https://pixelettecertified.com",
  email: "info@pixelettecertified.com",
  phone: "+44 20 7946 0958",
  phoneTel: "+442079460958",
  address: "77 Fulham Palace Road, London W6 8JA",

  /*
   * GO-LIVE BLOCKER, and the last thing outstanding before this release ships.
   *
   * The 8 September 2026 brief (§13, footer legal wording) instructs that the
   * contracting legal entity must be confirmed and that the company number
   * currently displayed must not be reused. The values below are the ones the
   * site has been publishing; they are deliberately left in place rather than
   * blanked, because a privacy policy is required to identify the data
   * controller, and an unnamed controller is a worse breach than an unverified
   * one.
   *
   * These three fields are the single source for the footer, the privacy policy
   * and the Organization JSON-LD, so confirming the entity is a one-place edit.
   * Do not deploy to production until it has been confirmed in writing.
   */
  legalEntity: "Pixelette Certified",
  companyNumber: "17506745",
  jurisdiction: "England and Wales",
  /** Navigation routes. Not a limit on where an engagement can be supported. */
  regions: ["United Kingdom", "United States", "GCC", "International"],
  social: {
    linkedin: "https://www.linkedin.com/company/pixelette-certified/about/?viewAsMember=true",
    twitter: "https://twitter.com/pixelettecert",
  },
} as const;

/**
 * Palette for HTML email, which cannot read CSS custom properties and so needs
 * literal hexes inline. These mirror the dark-family tokens in globals.css —
 * keep the two in step, and change globals.css first.
 *
 * Previously this held stale guide values and had no importers at all, which is
 * how the transactional emails drifted a full palette behind the site.
 */
export const EMAIL_COLORS = {
  ground: "#052A2B",   /* --color-footer      : card ground */
  mid: "#0A3433",      /* --color-footer-hover: header gradient midpoint */
  line: "#123A38",     /* --color-footer-line : header gradient end */
  deep: "#031A18",     /* --color-panel-from  : footer strip */
  accent: "#6FE3CB",   /* --color-footer-accent */
  brand: "#065456",    /* --color-brand       : CTA button fill */
  white: "#FFFFFF",
} as const;

/*
 * TRUST_STATS is gone.
 *
 * It held four tiles: a certification count, an audit pass rate, an average
 * time to certification, and a global-delivery marker. The first three are
 * unevidenced. The 8 September 2026 brief requires them removed
 * and explicitly forbids replacing them with invented proof, so the section that
 * rendered them (components/sections/TrustBar.tsx) is deleted rather than
 * refilled. Proof returns when it can be substantiated and attributed.
 *
 * Do not reintroduce a stats array here. If a figure becomes evidenced, it goes
 * through the claims register in src/lib/claims/register.mjs first.
 */

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  /** Path prefix used for the active state, where it differs from href. */
  match?: string;
  children?: NavChild[];
  /** Label for the link to the full listing under a dropdown. */
  allLabel?: string;
}

/**
 * Primary navigation. Services and Markets keep short dropdowns. Who we help
 * stays as a page but is not in this bar. Contact is the header button only.
 *
 * Cyber Essentials is absent from the Services menu on purpose. It sits inside
 * the UK and cyber assurance architecture (§8) and is reached from there.
 *
 * Insights points at /blog because existing article URLs are retained for
 * continuity (§32). The label changed; the address did not.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    match: "/services",
    allLabel: "View all services",
    children: [
      { label: "ISO 27001 & information security", href: "/services/iso-27001" },
      { label: "AI governance & ISO 42001", href: "/services/iso-42001" },
      { label: "SOC 2 readiness", href: "/services/soc-2" },
      { label: "Cyber assurance & testing", href: "/services/cyber-assurance" },
      { label: "Privacy & data governance", href: "/services/privacy" },
      { label: "vCISO & GRC advisory", href: "/services/vciso" },
      { label: "Business continuity & ISO 22301", href: "/services/iso-22301" },
      { label: "GCC regulatory compliance", href: "/services/gcc-regulatory-compliance" },
    ],
  },
  {
    label: "Markets",
    href: "/markets",
    match: "/markets",
    allLabel: "View markets",
    children: [
      { label: "United Kingdom", href: "/markets/united-kingdom" },
      { label: "United States", href: "/markets/united-states" },
      { label: "GCC", href: "/markets/gcc" },
      { label: "International", href: "/markets/international" },
    ],
  },
  { label: "Expertise", href: "/expertise" },
  { label: "Insights", href: "/blog", match: "/blog" },
  { label: "About", href: "/about" },
];

/** The principal call to action, used in the header and closing sections (§4, §34). */
export const PRIMARY_CTA = { label: "Discuss your requirements", href: "/contact" } as const;

/** How an engagement is agreed, in place of any published price or package (§6). */
export const ENGAGEMENT_TERMS =
  "Following an initial review, we define the scope, delivery approach and proposed engagement in writing before work begins.";
