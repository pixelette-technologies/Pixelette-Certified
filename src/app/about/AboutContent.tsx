import {
  Shield,
  Award,
  Scale,
  Users,
  Zap,
  Puzzle,
  PoundSterling,
  Brain,
  Globe,
  Clock,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Pill from "@/components/ui/Pill";
import StatTile from "@/components/ui/StatTile";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Card from "@/components/ui/Card";
import CTASection from "@/components/sections/CTASection";

const credentials = [
  {
    icon: Shield,
    title: "ISO 27001 Certified Practice",
    description:
      "We hold our own ISO 27001 certification. We practise what we preach and understand the standard from the inside.",
  },
  {
    icon: Award,
    title: "ISO 27001:2022 Lead Auditor (IRCA)",
    description:
      "CQI and IRCA via IQMS Learning / DAS Certification. IRCA-registered, the gold standard for ISO 27001 lead auditors.",
  },
  {
    icon: Brain,
    title: "ISO 42001 Lead Auditor (PECB)",
    description:
      "PECB-certified ISO 42001 Lead Auditor. AI governance certification authority. Among the first in the UK market.",
  },
  {
    icon: Scale,
    title: "IAPP Privacy Certifications",
    description:
      "AIGP (AI Governance Professional), FIP (Fellow of Information Privacy), CIPP/US, and CIPM. The most comprehensive IAPP credential set available.",
  },
  {
    icon: Award,
    title: "CISA and CEH",
    description:
      "ISACA CISA (Certified Information Systems Auditor) and EC-Council CEH (Certified Ethical Hacker), underpinning audit and penetration testing delivery.",
  },
  {
    icon: Users,
    title: "CQI Corporate Member",
    description:
      "Chartered Quality Institute corporate membership demonstrating quality management commitment across all engagements.",
  },
];

const differentiators = [
  {
    icon: Zap,
    title: "10 weeks to certification",
    description:
      "Most consultancies take 5 to 8 months. We have engineered a structured process that gets businesses certified in 10 weeks without cutting corners.",
  },
  {
    icon: Puzzle,
    title: "Technology-first mindset",
    description:
      "Built by the team behind Pixelette Group. We understand SaaS, cloud infrastructure, CI/CD pipelines, AI systems, and modern software architecture from the inside.",
  },
  {
    icon: PoundSterling,
    title: "No pricing surprises",
    description:
      "Fixed-fee proposals before any work begins. No hourly billing. No scope creep. Every engagement scoped to your business, your sector, and your audit body, with 90 days post-certification support included as standard.",
  },
  {
    icon: Brain,
    title: "AI governance pioneers",
    description:
      "Among the first UK consultancies offering ISO 42001 AI governance certification, with a PECB-certified ISO 42001 Lead Auditor on the team.",
  },
  {
    icon: Globe,
    title: "Global delivery, UK credentialled",
    description:
      "UK, UAE, Saudi Arabia, Qatar, EU, Americas, and Asia Pacific. Our UK-based certifications and credentials are recognised worldwide.",
  },
  {
    icon: Clock,
    title: "Post-certification support",
    description:
      "Certification is the beginning, not the end. 90 days post-certification support included. vCISO, vDPO, managed advisory, and surveillance audit support available ongoing.",
  },
];

const team = [
  {
    name: "Asif Rana Ashiq",
    role: "CEO & Founder",
    credentials: [] as string[],
    bio: "Founder of the Pixelette Group with over a decade of experience building technology solutions across the UK, Middle East, and Europe. Established Pixelette Certified to give businesses of every size access to world-class compliance expertise at a fair price, delivered without the delays and overheads of traditional consultancy.",
  },
  {
    name: "Muhammad Waleed",
    role: "Lead Consultant",
    credentials: ["ISO 27001 Lead Auditor (IRCA)", "ISO 42001 Lead Auditor (PECB)", "AIGP", "FIP", "CIPP/US", "CIPM", "CISA", "CEH"],
    bio: "Leads all certification engagements and audit preparation. Holds ISO 27001 Lead Auditor (IRCA), ISO 42001 Lead Auditor (PECB), AIGP, FIP, CIPP/US, CIPM (all IAPP), CISA (ISACA), and CEH (EC-Council) credentials. One of the most comprehensively certified compliance practitioners in the UK market.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "About" }]} />

          <div className="mt-8 max-w-[56ch]">
            <Eyebrow className="mb-5">About Us</Eyebrow>
            <h1 className="h1p">
              We built Pixelette Certified because businesses everywhere deserve better than slow, expensive, generic compliance consultancy.
            </h1>
            <p className="lead mt-6">
              Founded by the team behind Pixelette Group, we combine over a decade of technology and business delivery experience with deep, practitioner-level compliance expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="sec band-alt">
        <div className="wrap">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow className="mb-5">Our Story</Eyebrow>
              <h2 className="h2 max-w-[20ch]">From building businesses to protecting them</h2>
              <div className="mt-6 space-y-4">
                <p className="body">
                  Pixelette Group has spent over 10 years delivering technology solutions for businesses across the UK, Middle East, Europe, North America, and Asia Pacific. We have built platforms, mobile applications, AI systems, and cloud infrastructure for organisations ranging from early-stage startups to large enterprise clients — across banking, healthcare, logistics, manufacturing, professional services, and beyond.
                </p>
                <p className="body">
                  Along the way, we saw a pattern that frustrated us. Businesses across every industry and every geography were losing contracts, failing procurement, and missing growth opportunities — not because their product was poor, but because they could not produce the right certification.
                </p>
                <p className="body">
                  The compliance consultancies they turned to were slow, expensive, and built for a different era. They did not understand modern business models, diverse industries, or the urgency of global regulatory pressure.
                </p>
                <p className="body">
                  We started Pixelette Certified to change that. A compliance consultancy built by practitioners, for businesses of every kind. Fast, structured, and designed for organisations that cannot afford to lose six months waiting for a certificate they needed yesterday — in any industry, in any market, anywhere in the world.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {[
                { value: "10+", label: "Years in technology" },
                { value: "50+", label: "Certifications delivered" },
                { value: "98%", label: "First-attempt pass rate" },
                { value: "Global", label: "Worldwide delivery" },
              ].map((stat) => (
                <StatTile key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="sec">
        <div className="wrap">
          <SectionHeading
            label="Credentials"
            title="Qualified, certified, and accountable"
            description="Our consultants hold the industry's most respected qualifications. We do not just advise on compliance, we live it."
          />
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((item) => (
              <Card key={item.title} className="flex h-full flex-col">
                <item.icon className="h-5 w-5 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="h4 mt-4">{item.title}</h3>
                <p className="small mt-2.5">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="sec band-alt">
        <div className="wrap">
          <SectionHeading
            label="Our Team"
            title="The people behind your certification"
            description="Senior consultants with real-world experience across information security, privacy, AI governance, and ethical hacking."
          />

          <div className="grid max-w-3xl gap-3.5 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.name + member.role} className="card flex h-full flex-col">
                {/* Initials */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line-strong">
                  <span className="mono text-base font-medium text-brand">
                    {member.name === "To Be Announced" ? "?" : member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>

                <h3 className="h4 mt-5">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand">{member.role}</p>

                {/* Credentials */}
                {member.credentials.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.credentials.slice(0, 4).map((cred) => (
                      <Pill key={cred}>{cred}</Pill>
                    ))}
                    {member.credentials.length > 4 && (
                      <Pill>+{member.credentials.length - 4} more</Pill>
                    )}
                  </div>
                )}

                <p className="small mt-4 flex-1">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Capacity statements */}
          <div className="mt-12 max-w-[72ch] space-y-4">
            <p className="small">
              Backed by Pixelette Group&apos;s decade-long technology delivery team across the UK, Middle East, Europe, North America, and Asia Pacific, giving every engagement access to specialist input across SaaS, cloud infrastructure, AI systems, and software architecture.
            </p>
            <p className="small">
              We deliberately operate a low-volume, senior-led model. Every engagement is led by a credentialled practitioner, never handed to a junior. This is the engine behind our 98% first-attempt pass rate.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="sec">
        <div className="wrap">
          <SectionHeading
            label="Why Pixelette Certified"
            title="The unfair advantage your compliance deserves"
          />
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <Card key={item.title} className="flex h-full flex-col">
                <item.icon className="h-5 w-5 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="h4 mt-4">{item.title}</h3>
                <p className="small mt-2.5">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
