import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "ISO 27001", href: "/services/iso-27001" },
  { label: "ISO 22301", href: "/services/iso-22301" },
  { label: "ISO 9001", href: "/services/iso-9001" },
  { label: "ISO 14001", href: "/services/iso-14001" },
  { label: "ISO 42001 (AI)", href: "/services/iso-42001" },
  { label: "Cyber Essentials", href: "/services/cyber-essentials" },
  { label: "vCISO", href: "/services/vciso" },
  { label: "vDPO", href: "/services/vdpo" },
  { label: "Penetration Testing", href: "/services/penetration-testing" },
  { label: "GDPR & Privacy", href: "/services/gdpr-privacy" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#032e2f] to-[#011415] overflow-hidden" role="contentinfo">
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 divider-glow" />
      {/* Floating orb */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[80px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Pixelette Certified Home">
              <img
                src="/logos/logo-white-text.svg"
                alt="Pixelette Certified — ISO 27001 and Compliance Consultancy UK"
                className="h-10 w-auto mb-4"
              />
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {SITE_CONFIG.tagline}
              <br />
              Global ISO certification and compliance consultancy, trusted across every industry.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-accent text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-accent text-white transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">Our Services</h3>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">Contact Us</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-accent transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <a href={`tel:${SITE_CONFIG.phoneTel}`} className="hover:text-accent transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                {SITE_CONFIG.address}
              </li>
            </ul>
            <div className="glass-card rounded-xl p-4">
              <p className="text-sm font-semibold text-white mb-2">Free 30-Minute Consultation</p>
              <p className="text-xs text-gray-400 mb-3">
                Find out which certification is right for your business — wherever you are in the world.
              </p>
              <Link
                href="/contact"
                className="text-xs font-semibold text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1"
              >
                Book Now <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Pixelette Group, Pixelette Certified. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-accent transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
