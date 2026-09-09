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
  Lock,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import StatTile from "@/components/ui/StatTile";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Card from "@/components/ui/Card";
import CTASection from "@/components/sections/CTASection";

/**
 * Credentials are stated as INDIVIDUAL or NETWORK practitioner credentials.
 *
 * The previous version presented all six as company credentials, complete with
 * superlatives about the credential set. Four things had to change:
 *
 *   - The corporate ISO 27001 claim is gone. No valid certificate for the
 *     contracting entity was supplied.
 *   - The lead-auditor registration title is gone. The supplied certificate
 *     proves course completion, not current registration, so the capability can
 *     be described but the title cannot be used.
 *   - Two credentials are gone: one is on HOLD pending a current-status check,
 *     the other does not appear in the verification register at all.
 *   - The quality-institute corporate membership is gone. It is a paid
 *     membership, not a practitioner credential, and it padded a credential count.
 *
 * The last card is deliberately a negative disclosure. Saying plainly what we
 * are not is a stronger trust signal than another badge, and it is the sentence
 * the claims gate asserts must remain on this page.
 */
const credentials = [
  {
    icon: Shield,
    title: "ISO/IEC 27001 lead auditor capability",
    description:
      "Our delivery network includes practitioners trained to ISO/IEC 27001 lead auditor level. They plan and run your internal audit before Stage 2. We do not conduct your certification audit; an independent certification body does that.",
  },
  {
    icon: Brain,
    title: "ISO/IEC 42001 Lead Auditor (PECB)",
    description:
      "Our approved delivery network includes a PECB Certified ISO/IEC 42001 Lead Auditor. AI management system engagements are led by a practitioner who holds that credential.",
  },
  {
    icon: Scale,
    title: "Privacy and AI governance credentials",
    description:
      "Network practitioners hold AIGP, CIPM and CIPP/US from the IAPP, covering AI governance, privacy programme management and US privacy law.",
  },
  {
    icon: Award,
    title: "Information systems audit",
    description:
      "A network practitioner holds CISA, the ISACA Certified Information Systems Auditor credential. It underpins our internal audit and evidence work.",
  },
  {
    icon: Lock,
    title: "Cloud security credentials",
    description:
      "Network practitioners hold CCSK and CCZT from the Cloud Security Alliance, covering cloud controls and zero trust architecture.",
  },
  {
    icon: Users,
    title: "What we are not",
    description:
      "We are not UKAS accredited, not an IASME Certification Body, not a PCI QSA and not a SOC 2 auditor. Where an engagement requires an accredited body or a licensed assessor, we coordinate with one and tell you who they are.",
  },
];

/**
 * The governing sentence for every credential surface. Kept as a const so the
 * About page, and anything that later reuses this data, cannot drift apart.
 */
const CREDENTIAL_DISCLAIMER =
  "Accreditation belongs to the entity that holds it. Pixelette Certified is not an accredited certification body and does not issue certificates. The credentials below are held by individual practitioners in our approved delivery network and are stated as individual credentials.";

const differentiators = [
  {
    icon: Zap,
    title: "Scoped before it is priced",
    description:
      "A written scope and a fixed fee before any work begins. No hourly billing, no scope creep, and no completion date promised before we know what we are actually looking at.",
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
      "Fixed-fee proposals before any work begins. Every engagement scoped to your business, your sector, and your audit body, with 90 days post-certification support included as standard.",
  },
  {
    icon: Brain,
    title: "AI governance depth",
    description:
      "Our approved delivery network includes a PECB Certified ISO/IEC 42001 Lead Auditor, so AI management system work is led by someone who audits the standard rather than someone reading it for the first time.",
  },
  {
    icon: Globe,
    title: "One accountable relationship",
    description:
      "We stay accountable for scope, proposal, project governance and quality across the whole programme, and match credentialed specialists to the requirement rather than pretending one person covers everything.",
  },
  {
    icon: Clock,
    title: "Support after the audit",
    description:
      "Certification is a control cycle, not a one-off project. 90 days post-certification support included, with vCISO, vDPO, managed compliance and surveillance support available ongoing.",
  },
];

/**
 * Named individuals and their credentials are not published here.
 *
 * The verification register treats the practitioner certificates supplied for
 * this site as approved-delivery-network credentials, not as those of an
 * employee, and the brief forbids converting either into a corporate
 * accreditation. Presenting a named "Lead Consultant" with an eight-credential
 * badge row did exactly that conversion, so the roster is replaced by a
 * description of how engagements are actually staffed.
 *
 * The founder is named because founding the company is a fact about the company,
 * not a credential claim.
 */
const staffingModel = [
  "Pixelette Certified is the accountable commercial and delivery-management front door. Discovery, scope, commercial proposal, project governance and quality control sit with us for the life of the engagement.",
  "Where specialist capability is required, we assign credentialed practitioners from our approved delivery network according to the framework, sector and jurisdiction. Practitioner assignment depends on scope and availability, and the practitioner leading your engagement is named in the proposal.",
  "Where independent certification, scheme assessment or attestation is required, we coordinate the appropriate independent route rather than blurring consultancy with assurance. Professional credentials belong to the people who hold them and are never presented as Pixelette accreditations.",
  "Pixelette Certified was founded by Asif Rana Ashiq, and is backed by Pixelette Group's technology delivery team across the UK, Middle East, Europe, North America and Asia Pacific.",
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
        <div className="wrap" data-reveal="">
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
                /*
                 * These four tiles previously carried a certification count and
                 * an audit pass rate, neither of which is evidenced. The grid is refilled rather than emptied: it
                 * renders a fixed four-up layout, so an empty array would leave
                 * a padded blank band. Every value here is a fact about how we
                 * are structured, not a claimed outcome.
                 */
                { value: "10+", label: "Years in technology delivery" },
                { value: "Fixed", label: "Fee agreed before work begins" },
                { value: "90 days", label: "Post-certification support included" },
                { value: "Global", label: "UK, UAE, Saudi Arabia, Qatar, EU, Americas, APAC" },
              ].map((stat) => (
                <StatTile key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="sec">
        <div className="wrap" data-reveal="">
          <SectionHeading
            label="Delivery credentials"
            title="The credentials behind your engagement"
            description={CREDENTIAL_DISCLAIMER}
          />
          {/* Six cards, so three columns divide evenly and the closing
              disclosure card lands at the end of a row rather than orphaned. */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="wrap" data-reveal="">
          <SectionHeading
            label="Our Team"
            title="How engagements are staffed"
            description="One accountable client relationship, with the right credentialed specialist matched to the requirement."
          />

          <div className="grid overflow-hidden rounded-card border border-line-card md:grid-cols-2">
            {staffingModel.map((para, i) => (
              <div
                key={para.slice(0, 24)}
                className="border-b border-line-card bg-page p-7 last:border-b-0 md:p-[30px] md:[&:nth-child(odd)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
                <p className="small mt-3">{para}</p>
              </div>
            ))}
          </div>

          {/* Capacity statement */}
          <div className="mt-12 max-w-[72ch]">
            <p className="small">
              We deliberately operate a low-volume, senior-led model. Every engagement is led by a credentialed practitioner, never handed to a junior, and your internal audit is run by us before the certification body&apos;s Stage 2 so that issues surface internally first.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="sec">
        <div className="wrap" data-reveal="">
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
