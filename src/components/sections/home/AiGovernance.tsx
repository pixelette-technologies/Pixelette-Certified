import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/icons";

/**
 * AI governance feature (§13).
 *
 * Presented as governance first and ISO 42001 second. The standard is one
 * route among several, and the copy says so, because a buyer governed by the
 * NIST AI RMF or the EU AI Act should not come away thinking certification is
 * the only answer.
 */
const capabilities = [
  "AI governance frameworks",
  "ISO 42001 readiness",
  "AI risk and impact assessment",
  "AI inventories",
  "Roles and accountability",
  "Policies and control frameworks",
  "NIST AI RMF alignment where relevant",
  "EU AI Act alignment where applicable",
  "Integration with ISO 27001 and privacy governance",
];

export default function AiGovernance() {
  return (
    <section className="sec band-dark">
      <div className="wrap" data-reveal="">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              dark
              label="AI governance"
              title="Govern AI with the same discipline as security and privacy"
              className="mb-0"
              titleWidth="22ch"
            />
            <p className="body mt-6">
              Customers, boards and regulators increasingly want to understand how AI is used, who
              is accountable for it and how its risks are managed. We help organisations put that
              governance in place, using ISO/IEC 42001 where certification is sought and other
              recognised frameworks where they fit the requirement better.
            </p>
            <div className="mt-8">
              <Button href="/services/iso-42001" variant="panel" iconRight={<ArrowRight size={16} />}>
                Explore AI governance
              </Button>
            </div>
          </div>

          <ul className="list-none grid content-start gap-3.5 sm:grid-cols-2">
            {capabilities.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 shrink-0 text-footer-accent">
                  <Check size={16} />
                </span>
                <span className="small">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
