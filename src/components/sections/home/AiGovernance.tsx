import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import { ArrowRight } from "@/components/ui/icons";

/**
 * AI governance, as the flagship proposition.
 *
 * The credential sentence is quoted verbatim from the brief's approved wording
 * and must not be paraphrased. "Our approved delivery network includes a PECB
 * Certified ISO/IEC 42001 Lead Auditor" is precise about three things at once:
 * the credential is individual, it sits in the network rather than in the
 * company, and it is the scheme's own title. Loosening any of those turns a
 * verified fact into a corporate accreditation claim.
 *
 * Note what is absent: no primacy claim, no market-position claim, no
 * superlative of any kind. The credential is the differentiator; it does not need
 * a superlative attached to it.
 */
export default function AiGovernance() {
  return (
    <section className="sec band-dark">
      <div className="wrap" data-reveal="">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-16">
          <div className="max-w-[62ch]">
            <Pill tone="dark">ISO/IEC 42001</Pill>

            <SectionHeading
              dark
              label="Flagship capability"
              title="Innovate with AI. Prove how you govern it."
              className="mb-0 mt-6"
              titleWidth="22ch"
            />

            <div className="mt-6 space-y-4">
              <p className="body">
                AI adoption is moving faster than many organisations&rsquo; governance. Customers,
                boards and procurement teams increasingly want evidence of accountability, risk
                ownership, data governance, human oversight and responsible use.
              </p>
              <p className="body">
                We help organisations design and implement AI governance controls, assess AI risk
                and prepare for ISO/IEC 42001 certification through an independent certification
                route.
              </p>
              <p className="body">
                Our approved delivery network includes a PECB Certified ISO/IEC 42001 Lead Auditor
                and professionals holding recognised AI-governance and privacy credentials.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Button href="/services/iso-42001" variant="panel" size="lg" iconRight={<ArrowRight size={16} />}>
              Book an AI Governance Readiness Review
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
