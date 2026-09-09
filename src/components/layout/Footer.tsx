import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Who We Help", href: "/who-we-help" },
  { label: "AI Governance", href: "/services/iso-42001" },
  { label: "Resources", href: "/resources" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/*
 * One services column mirroring the seven top-level menu items, replacing the
 * previous ISO / Advisory split.
 *
 * That split carried two live defects: a "Pen Testing" link to a route that is
 * now withdrawn, and a "SOC 2" entry that pointed at /contact - a service link
 * with no service page behind it. Both now resolve properly.
 */
const serviceLinks = [
  { label: "ISO 27001 Readiness", href: "/services/iso-27001" },
  { label: "ISO 42001 & AI Governance", href: "/services/iso-42001" },
  { label: "SOC 2 Readiness", href: "/services/soc-2" },
  { label: "vCISO & GRC Advisory", href: "/services/vciso" },
  { label: "Privacy & vDPO", href: "/services/vdpo" },
  { label: "Managed Compliance", href: "/services/managed-compliance" },
  { label: "Additional Frameworks", href: "/services/additional-frameworks" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flink text-sm text-footer-link transition-colors hover:text-footer-heading">
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap py-16">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Pixelette Certified Home">
              <Image
                src="/logos/logo-white-text.svg"
                alt="Pixelette Certified, ISO 27001 and Compliance Consultancy UK"
                width={200}
                height={40}
                className="mb-4 h-9 w-auto"
              />
            </Link>
            <p className="max-w-[34ch] text-sm leading-relaxed text-footer-link">
              {SITE_CONFIG.tagline}
              <br />
              Compliance, cyber assurance and AI governance. Implementation and readiness, with independent assessment coordinated where required.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-footer-line text-footer-link transition-colors hover:border-footer-accent hover:text-footer-accent"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-footer-line text-footer-link transition-colors hover:border-footer-accent hover:text-footer-accent"
                aria-label="Twitter / X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-1">
            <Eyebrow tone="dark" className="mb-2">Quick Links</Eyebrow>
            {quickLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>

          {/* Services */}
          <div className="flex flex-col gap-1">
            <Eyebrow tone="dark" className="mb-2">Our Services</Eyebrow>
            {serviceLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
            <FooterLink href="/services">
              View all services <ArrowRight size={13} />
            </FooterLink>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <Eyebrow tone="dark" className="mb-2">Contact Us</Eyebrow>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flink text-sm text-footer-link transition-colors hover:text-footer-heading"
            >
              {SITE_CONFIG.email}
            </a>
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="flink text-sm text-footer-link transition-colors hover:text-footer-heading"
            >
              {SITE_CONFIG.phone}
            </a>
            <p className="py-2 text-sm leading-relaxed text-footer-link">{SITE_CONFIG.address}</p>

            <div className="mt-3 rounded-lg border border-footer-line p-4">
              <p className="text-sm font-semibold text-footer-heading">Free 30-Minute Compliance Diagnostic</p>
              <p className="mt-2 text-[13px] leading-relaxed text-footer-link">
                Tell us what you have been asked to prove, and we will help you work out the route forward.
              </p>
              <Link
                href="/contact"
                className="flink mt-1 text-[13px] font-semibold text-footer-accent hover:text-footer-heading"
              >
                Book Now <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        <div className="my-11 h-px bg-footer-line" />

        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="mono text-xs leading-relaxed text-footer-legal">
            <p>
              {SITE_CONFIG.legalEntity} &middot; Company No. {SITE_CONFIG.companyNumber} &middot; Registered in {SITE_CONFIG.jurisdiction}
            </p>
            <p className="mt-1">
              &copy; {new Date().getFullYear()} Pixelette Group, Pixelette Certified. All rights reserved.
            </p>
          </div>
          <div className="mono flex gap-5 text-xs text-footer-legal">
            <Link href="/privacy-policy" className="transition-colors hover:text-footer-heading">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="transition-colors hover:text-footer-heading">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
