import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Six profiles, anchored into /who-we-help.
 *
 * Rows rather than cards. Six cards would compete visually with the four
 * pillars directly above; a definition list reads as supporting detail, which
 * is what it is.
 *
 * Six curated, not the full thirteen from industries.ts. The homepage job is
 * recognition ("that is us"), and thirteen options is a menu, not a mirror.
 * Each row anchors into the full sector page.
 */
const profiles = [
  {
    slug: "saas-technology",
    profile: "Scale-ups & mid-market businesses",
    need: "Enterprise customers are asking for stronger security assurance, certification or formal governance.",
  },
  {
    slug: "ai-technology",
    profile: "SaaS, AI & digital businesses",
    need: "ISO 27001, SOC 2, AI governance, privacy and customer security questionnaires are becoming sales gates.",
  },
  {
    slug: "fintech",
    profile: "Financial services & FinTech",
    need: "Security, privacy, operational resilience and jurisdiction-specific governance requirements need specialist support.",
  },
  {
    slug: "healthcare",
    profile: "Healthcare & data-intensive organisations",
    need: "Sensitive-data environments require stronger privacy, information-security and assurance controls.",
  },
  {
    slug: "professional-services",
    profile: "Technology & managed-service providers",
    need: "Customers expect evidence of secure operations, third-party risk management and continual assurance.",
  },
  {
    slug: "government-suppliers",
    profile: "Businesses entering regulated or enterprise markets",
    need: "A tender, supplier onboarding process or new geography has created a specific evidence requirement.",
  },
];

export default function WhoWeHelp() {
  return (
    <section className="sec band-alt">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="Who we help"
          title="For organisations where trust has become a commercial requirement."
          description="Pixelette Certified is designed for growing and established organisations that need to prove security, governance or compliance to customers, procurement teams, investors, boards or regulators, without building every specialist role internally."
          titleWidth="26ch"
        />

        <div className="border-t border-line">
          {profiles.map((profile) => (
            <Link
              key={profile.slug}
              href={`/who-we-help#${profile.slug}`}
              className="group grid gap-2 border-b border-line py-6 transition-colors duration-150 hover:bg-band md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-baseline md:gap-8"
            >
              <span className="text-[17px] font-semibold leading-snug text-ink">
                {profile.profile}
              </span>
              <span className="small">{profile.need}</span>
              <span className="shrink-0 text-brand md:pl-4" aria-hidden="true">
                <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
