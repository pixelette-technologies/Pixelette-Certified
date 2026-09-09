import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import { caseStudies, EVIDENCE_STATEMENT, type CaseStudy } from "@/data/caseStudies";

interface EvidenceNoteProps {
  /** Injected so the section is trivially testable and the page controls the source. */
  studies?: CaseStudy[];
}

/**
 * Proof, or an honest account of why there is none yet.
 *
 * This section exists because deleting the case studies left a hole where the
 * proof used to be, and an unexplained absence reads worse than an explained
 * one. Stating the evidence rule turns "they have no case studies" into "they
 * will not publish anything about a client they cannot substantiate", which is
 * information a prospective client can use about their own confidentiality.
 *
 * It switches to the grid automatically once caseStudies is non-empty, so
 * publishing a verified study later is a data change rather than a code change.
 * The type in src/data/caseStudies.ts enforces the evidence record.
 */
export default function EvidenceNote({ studies = caseStudies }: EvidenceNoteProps) {
  const hasStudies = studies.length > 0;

  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="Evidence"
          title="Proof should be earned, not manufactured."
          titleWidth="22ch"
        />

        {hasStudies ? (
          <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((study) => (
              <article key={study.slug} className="card flex h-full flex-col">
                <Eyebrow>{study.sector}</Eyebrow>
                <h3 className="h4 mt-3">{study.client}</h3>
                <p className="small mt-2.5 flex-1">{study.situation}</p>
                <p className="small mt-4 font-medium text-ink">{study.outcome}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="body max-w-[72ch]">{EVIDENCE_STATEMENT}</p>
        )}
      </div>
    </section>
  );
}
