export const SITE_CONFIG = {
  name: "Pixelette Certified",
  tagline: "Compliance. Governance. Cyber Trust.",
  description:
    "UK-based ISO certification and compliance consultancy. ISO 27001, Cyber Essentials, GDPR, vCISO, AI Governance. Expert-led. Built for technology companies.",
  url: "https://pixelettecertified.co.uk",
  email: "info@pixelettecertified.co.uk",
  phone: "+44 (0) 000 000 0000",
  phoneTel: "+440000000000",
  // TODO: Replace with real phone number before go-live
  address: "London, United Kingdom",
  regions: ["UK", "Ireland", "UAE", "EU"],
  social: {
    linkedin: "https://www.linkedin.com/company/pixelette-certified",
    twitter: "https://twitter.com/pixelettecert",
  },
} as const;

export const BRAND_COLORS = {
  primary: "#044143",
  primaryLight: "#065456",
  primaryDark: "#032e2f",
  accent: "#14AAA9",
  accentLight: "#1cc4c3",
  accentDark: "#0e8786",
  black: "#000000",
  white: "#FFFFFF",
} as const;

export const TRUST_STATS: { value: string; suffix?: string; label: string }[] = [
  { value: "50+", label: "ISO Certifications Delivered" },
  { value: "98%", label: "First-Attempt Audit Pass Rate" },
  { value: "10", suffix: " Weeks", label: "Average to Certification" },
  { value: "4", suffix: " Regions", label: "UK · Ireland · UAE · EU" },
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
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
