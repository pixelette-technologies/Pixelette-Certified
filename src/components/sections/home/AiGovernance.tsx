import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import GovernedAi from "@/components/visuals/GovernedAi";
import { ArrowRight } from "@/components/ui/icons";

/**
 * The one homepage feature. Four concepts, not a capability checklist.
 * The visual is decorative; the words are in the list.
 */

const CONCEPTS = ["Governance", "Risk and impact", "Accountability", "Assurance"];

export default function AiGovernance() {
  return (
    <section className="sec band-dark">
      <div className="wrap" data-reveal="">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeading
              dark
              label="AI governance"
              title="Govern AI with the same discipline as security and privacy"
              className="mb-0"
              titleWidth="18ch"
            />
            <p className="body mt-6 max-w-[52ch]">
              Build clear accountability, risk controls and evidence around the AI your organisation
              develops or uses, applying ISO 42001, NIST AI RMF and relevant regulation where
              appropriate.
            </p>
            <ul className="mt-8 grid list-none grid-cols-2 gap-x-8 gap-y-4">
              {CONCEPTS.map((concept) => (
                <li key={concept} className="border-t border-panel-line pt-3 text-[15px] font-medium text-footer-heading">
                  {concept}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/services/iso-42001" variant="panel" iconRight={<ArrowRight size={16} />}>
                Explore AI governance
              </Button>
            </div>
          </div>
          <GovernedAi />
        </div>
      </div>
    </section>
  );
}
