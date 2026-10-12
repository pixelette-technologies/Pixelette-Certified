import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";
import PrivacyChoices from "@/components/privacy/PrivacyChoices";

/*
 * The group footer, following the Pixelette Technologies footer so the sister
 * sites share one shape. Top to bottom, as theirs:
 *
 *   1. A grid: a wide brand column, then Services and Company, each an h2 over
 *      a <ul>. The Company column ends with the Privacy choices dialog.
 *   2. The group band: "Part of Pixelette Group", an intro, and the four group
 *      companies, this one marked "You are here".
 *   3. The legal line: entity, registration, company number, registered office.
 *
 * Where it differs, deliberately:
 *   - No certificate ledger. Technologies lists its own ISO certificates in the
 *     brand column; Pixelette Certified holds none, and the 8 September brief
 *     bans implying it does. The social links sit in that slot instead.
 *   - The Company column links only pages that exist. Terms, Modern slavery and
 *     Accessibility join it when their pages do.
 *   - No VAT number: none is recorded for this entity. The legal values come
 *     from SITE_CONFIG, still a go-live blocker pending written confirmation.
 *
 * Group descriptions are the group's own wording, verbatim from the
 * Technologies footer, so every sister site describes every company alike.
 */

/*
 * Footer navigation mirrors the primary navigation (§7, §39): the Services
 * column is the eight core services plus the hub, and the Company column
 * carries the remaining top-level sections and the legal pages.
 */
const serviceLinks = [
  ...NAV_ITEMS.find((item) => item.label === "Services")!.children!,
  { label: "View all services", href: "/services" },
];

const companyLinks = [
  { label: "United Kingdom", href: "/markets/united-kingdom" },
  { label: "United States", href: "/markets/united-states" },
  { label: "GCC", href: "/markets/gcc" },
  { label: "International", href: "/markets/international" },
  { label: "Who we help", href: "/who-we-help" },
  { label: "Expertise", href: "/expertise" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Cookies and analytics", href: "/cookie-policy" },
];

const group = [
  {
    name: "Pixelette Certified",
    current: true,
    what: "UK-headquartered cyber security, compliance, assurance and AI governance consultancy supporting organisations internationally.",
  },
  {
    name: "Pixelette Technologies",
    href: "https://pixelettetech.com",
    what: "Software engineering, AI & automation, blockchain and ongoing product engineering.",
  },
  {
    name: "Pixelette Holdings",
    href: "https://pixeletteholdings.com",
    what: "Group-level venture partnerships, HSE/equity structures, portfolio and strategic relationships.",
  },
  {
    name: "Pixelette Marketing",
    href: "https://pixelettemarketing.com",
    what: "Demand, pipeline, conversion, revenue and accountable growth systems.",
  },
];

const socialClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-footer-line text-footer-link transition-colors hover:border-footer-accent hover:text-footer-accent";

function OutwardArrow() {
  return (
    <svg width="12" height="12" fill="none" aria-hidden="true" focusable="false" viewBox="0 0 14 14">
      <path d="M4 10L10 4M10 4H5M10 4v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer site-footer" role="contentinfo">
      <div className="wrap">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" aria-label="Pixelette Certified home" className="site-footer__logo">
              <Image
                src="/logos/logo-white-text.svg"
                alt="Pixelette Certified"
                width={200}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p>
              UK-headquartered cyber security, compliance, assurance and AI governance consultancy supporting
              organisations internationally.
            </p>
            <div className="site-footer__social">
              <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="Twitter / X">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h2>Services</h2>
            <ul className="site-footer__list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Company</h2>
            <ul className="site-footer__list">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <PrivacyChoices />
              </li>
            </ul>
          </div>
        </div>

        {/* Hidden for now. The group band stays in the markup so it can be restored. */}
        <section className="groupband hidden" hidden aria-labelledby="group-heading">
          <div className="groupband__intro">
            <h2 id="group-heading">Part of Pixelette Group</h2>
            <p>
              Pixelette Certified is one of four companies in Pixelette Group, a UK technology group. Each company
              is engaged separately and none is a condition of another: Technologies engineers it, and we help you
              govern, evidence and prepare it for independent assessment.
            </p>
          </div>
          <ul className="groupband__list">
            {group.map((company) => (
              <li key={company.name}>
                {company.href ? (
                  <a className="groupband__name" href={company.href} target="_blank" rel="noopener noreferrer">
                    {company.name}
                    <OutwardArrow />
                  </a>
                ) : (
                  <span className="groupband__name groupband__name--current">
                    {company.name}
                    <span className="groupband__here">You are here</span>
                  </span>
                )}
                <span className="groupband__what">{company.what}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="site-footer__legal">
          <p className="site-footer__id">
            <span>{SITE_CONFIG.legalEntity}</span>
            <span>Registered in {SITE_CONFIG.jurisdiction}</span>
            <span>Company number {SITE_CONFIG.companyNumber}</span>
          </p>
          <p className="site-footer__id site-footer__id--end">
            <span>Registered office {SITE_CONFIG.address}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
