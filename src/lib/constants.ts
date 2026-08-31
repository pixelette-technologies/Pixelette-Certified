export const SITE_CONFIG = {
  name: "Pixelette Certified",
  tagline: "Compliance. Governance. Cyber Trust.",
  description:
    "Get certified in as little as 10 weeks. Pixelette Certified delivers ISO 27001, ISO 42001, Cyber Essentials, GDPR, ISO 9001, ISO 22301 and more to businesses across every industry, worldwide. Fixed fee. 98% first-attempt pass rate.",
  url: "https://pixelettecertified.com",
  email: "info@pixelettecertified.com",
  phone: "+44 20 7946 0958",
  phoneTel: "+442079460958",
  address: "66 Paul Street, London, EC2A 4NA, United Kingdom",
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

export const TRUST_STATS: { value: string; suffix?: string; label: string }[] = [
  { value: "50+", label: "ISO Certifications Delivered" },
  { value: "98%", label: "First-Attempt Audit Pass Rate" },
  { value: "10", suffix: " Weeks", label: "Average to Certification" },
  { value: "Global", label: "UK, UAE, Saudi Arabia, Qatar, EU, Americas, APAC" },
];

interface NavChild {
  label: string;
  href: string;
  description: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "ISO 27001", href: "/services/iso-27001", description: "Information Security Management" },
      { label: "ISO 22301", href: "/services/iso-22301", description: "Business Continuity" },
      { label: "ISO 9001", href: "/services/iso-9001", description: "Quality Management" },
      { label: "ISO 14001", href: "/services/iso-14001", description: "Environmental Management" },
      { label: "ISO 42001", href: "/services/iso-42001", description: "AI Governance" },
      { label: "Cyber Essentials", href: "/services/cyber-essentials", description: "UK Government Certification" },
      { label: "vCISO", href: "/services/vciso", description: "Virtual CISO Service" },
      { label: "vDPO", href: "/services/vdpo", description: "Virtual Data Protection Officer" },
      { label: "Penetration Testing", href: "/services/penetration-testing", description: "VAPT & Security Testing" },
      { label: "GDPR & Privacy", href: "/services/gdpr-privacy", description: "Data Protection Compliance" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
