import Button from "@/components/ui/Button";
import { contactHref } from "@/lib/contact/constants";

/**
 * Verified service categories, rendered as a text line rather than badges.
 *
 * The previous hero opened with twelve standard names as pills. That reads as a
 * catalogue of accreditations the company holds, which is exactly the
 * impression the publication rule exists to prevent, and it front-loads
 * acronyms at the one moment the visitor is deciding whether this is even the
 * right kind of company. The capability line does the same orientation job
 * without looking like a badge wall.
 */
const capabilities = [
  "ISO 27001 readiness",
  "ISO 42001 & AI governance",
  "SOC 2 readiness",
  "vCISO",
  "Privacy & vDPO",
  "Managed compliance",
];

export default function HomeHero() {
  return (
    <section className="wash">
      <div className="wrap py-20 text-center lg:py-28">
        <p className="mono text-xs uppercase tracking-[0.08em] text-brand">
          Compliance, cyber assurance &amp; AI governance
        </p>

        <h1 className="h1 mx-auto mt-6 max-w-[22ch]">
          Turn compliance from a deal blocker into proof you&rsquo;re ready.
        </h1>

        <p className="lead mx-auto mt-7">
          Pixelette Certified helps organisations meet the security, privacy, AI-governance and
          assurance requirements standing between them and enterprise customers, tenders,
          investors and regulated markets. We manage the engagement from initial gap assessment
          through implementation, audit readiness and ongoing compliance, matching each
          requirement to the right credentialed specialists and coordinating independent
          assessment where required.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Button href="/contact">Book a 30-Minute Compliance Diagnostic</Button>
          <Button href={contactHref("tender-requirement")} variant="secondary">
            Tell Us What You&rsquo;ve Been Asked to Prove
          </Button>
        </div>

        <p className="small mx-auto mt-6 max-w-[64ch]">
          Already have a questionnaire, tender clause, customer email or compliance requirement?
          Send it to us and we will help you identify the practical route forward.
        </p>

        <p className="small mx-auto mt-10 max-w-[68ch] border-t border-line pt-8">
          {capabilities.join(" • ")}
        </p>
      </div>
    </section>
  );
}
