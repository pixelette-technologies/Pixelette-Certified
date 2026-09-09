export const SITE_CONFIG = {
  name: "Pixelette Certified",
  tagline: "Compliance. Governance. Cyber Trust.",
  description:
    "Pixelette Certified helps organisations meet the security, privacy, AI-governance and assurance requirements standing between them and enterprise customers, tenders, investors and regulated markets. ISO 27001 and ISO 42001 readiness, SOC 2 readiness, vCISO, privacy and vDPO, and managed compliance.",
  url: "https://pixelettecertified.com",
  email: "info@pixelettecertified.com",
  phone: "+44 20 7946 0958",
  phoneTel: "+442079460958",
  address: "66 Paul Street, London, EC2A 4NA, United Kingdom",

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
  legalEntity: "Pixelette Group Ltd",
  companyNumber: "07251823",
  jurisdiction: "England and Wales",
  regions: ["UK", "UAE", "Saudi Arabia", "Qatar", "EU", "Americas", "APAC"],
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
  description: string;
}

interface NavItem {
  label: string;
  href: string;
  /**
   * Path prefix used for the active state, where it differs from href.
   *
   * Required because "AI Governance" points into /services/. Without an
   * explicit match, the old `pathname.startsWith("/services")` test highlights
   * BOTH Services and AI Governance at once on /services/iso-42001. Resolution
   * is longest-match-wins across NAV_ITEMS.
   */
  match?: string;
  children?: NavChild[];
}

/**
 * Top navigation, per the 8 September 2026 brief.
 *
 * Two decisions worth recording:
 *
 * "AI Governance" deep-links to the ISO 42001 service page rather than a new
 * /ai-governance hub. A separate hub would either duplicate that page and
 * cannibalise it in search, or be thin. Neither is worth shipping in a release
 * whose purpose is removing unsubstantiated claims. When there is genuinely
 * distinct advisory-intent content (EU AI Act timeline, model governance), the
 * hub gets built and this href changes. One line.
 *
 * "Resources" is a real route rather than a dropdown, because a dropdown needs
 * three credible children and there is one and a half.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    match: "/services",
    children: [
      { label: "ISO/IEC 27001 Implementation & Certification Readiness", href: "/services/iso-27001", description: "Information security management system" },
      { label: "ISO/IEC 42001 AI Governance & Certification Readiness", href: "/services/iso-42001", description: "AI management system" },
      { label: "SOC 2 Readiness", href: "/services/soc-2", description: "Trust Services Criteria readiness" },
      { label: "vCISO & GRC Advisory", href: "/services/vciso", description: "Fractional security leadership" },
      { label: "Privacy & vDPO", href: "/services/vdpo", description: "UK GDPR, DPIAs, data subject rights" },
      { label: "Managed Compliance", href: "/services/managed-compliance", description: "Continuous governance and evidence" },
      { label: "Additional Framework Support", href: "/services/additional-frameworks", description: "ISO 9001, 14001, 22301, 27701 and regional frameworks" },
    ],
  },
  { label: "Who We Help", href: "/who-we-help" },
  { label: "AI Governance", href: "/services/iso-42001", match: "/services/iso-42001" },
  { label: "Resources", href: "/resources", match: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
