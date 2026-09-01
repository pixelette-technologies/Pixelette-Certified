import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";

const certifications = [
  "ISO 27001",
  "ISO 42001",
  "Cyber Essentials",
  "GDPR",
  "ISO 9001",
  "ISO 22301",
  "ISO 14001",
  "vCISO",
  "vDPO",
  "Penetration Testing",
  "SOC 2",
  "AI Governance",
];

/**
 * The guide's front-page hero (pattern guide page 01): centred, on the mint
 * radial wash. The previous version was a two-column split with an animated
 * concentric-ring medallion on the right; the guide has no such ornament, and
 * removing it leaves the copy centred as the guide intends.
 *
 * Content and its order are unchanged: certification pills, then the two-part
 * heading, then the lead, then the button pair.
 */
export default function Hero() {
  return (
    <section className="wash">
      <div className="wrap py-20 text-center lg:py-28">
        <div className="flex flex-wrap justify-center gap-2.5">
          {certifications.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>

        <h1 className="h1 mx-auto mt-8 max-w-[22ch]">
          <span className="block">
            Your Next Enterprise Deal Is Waiting on a Certificate You Don&apos;t Have Yet.
          </span>
          <span className="mt-2 block text-brand">We Fix That in 10 Weeks.</span>
        </h1>

        <p className="lead mx-auto mt-7">
          Enterprise contracts. Government frameworks. Investor due diligence. The deals
          you&apos;re losing because you&apos;re not yet certified, we close that gap in 10 weeks.
          Fixed fee. 98% first-attempt pass rate. UK-headquartered. Globally delivered.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Button href="/contact">See Your 10-Week Certification Roadmap</Button>
          <Button href="/services" variant="secondary">
            Talk to a Consultant
          </Button>
        </div>
      </div>
    </section>
  );
}
