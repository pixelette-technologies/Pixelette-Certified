import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowRight, Check } from "@/components/ui/icons";
import { pillars } from "@/data/pillars";
import { contactHref } from "@/lib/contact/constants";

/**
 * The four commercial pillars, replacing the equal-weight service catalogue.
 *
 * A twenty-three-item grid asks the visitor to map their problem onto our
 * taxonomy. Four outcomes ask them to recognise their own situation, which is
 * the job the homepage should be doing.
 */
export default function CommercialPillars() {
  return (
    <section className="sec band-alt">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="What we do"
          title="Four outcomes, not a catalogue of standards"
          description="Certification readiness, enterprise assurance, governance and sustainment. Most engagements start in one and grow into another."
        />

        <div className="grid gap-3.5 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div key={pillar.slug} id={pillar.slug} className="card flex h-full flex-col">
              <Eyebrow>{pillar.index}</Eyebrow>
              <h3 className="h3 mt-3">{pillar.title}</h3>
              <p className="small mt-2.5">{pillar.summary}</p>

              <ul className="list-none mt-6 flex-1 space-y-2.5">
                {pillar.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-1 shrink-0 text-brand">
                      <Check size={15} />
                    </span>
                    <span className="small">{bullet}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={contactHref(pillar.ctaReason)}
                className="flink mt-7 text-sm font-medium text-brand hover:text-brand-hover"
              >
                {pillar.ctaLabel} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
