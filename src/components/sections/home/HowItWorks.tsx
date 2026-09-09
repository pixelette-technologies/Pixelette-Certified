import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Four stages, replacing the previous three.
 *
 * The added stage is "Coordinate and sustain", and it is the one that carries
 * the publication rule: the old three-step version ended at "You get
 * certified", which quietly implied we were the ones doing the certifying. This
 * version separates what we do from what the independent body does, and then
 * keeps going past the audit, which is where the retained revenue actually is.
 *
 * Markup is lifted from the old ThreeStepProcess bordered strip. The
 * last:border-* idiom is column-count agnostic, so going from three columns to
 * four needs no other change.
 */
const stages = [
  {
    num: "01",
    title: "Diagnose & scope",
    description:
      "We review the requirement, define the target framework, identify scope and current gaps, and confirm the practitioner capability and independent assessment route required.",
  },
  {
    num: "02",
    title: "Build & embed",
    description:
      "We develop the policies, processes, risk treatment, controls, training and working practices needed to make the framework operate in the real business.",
  },
  {
    num: "03",
    title: "Prove readiness",
    description:
      "We test the evidence, close gaps, prepare management review and internal readiness activity, and make sure the organisation can defend how its controls actually work.",
  },
  {
    num: "04",
    title: "Coordinate & sustain",
    description:
      "Where independent certification, scheme assessment or attestation is required, we coordinate the next step and support findings through closure. We can then stay involved to keep the system audit-ready.",
  },
];

export default function HowItWorks() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="How it works"
          title="Diagnose. Build. Prove. Coordinate. Sustain."
          description="Every engagement begins with scope. We identify what the customer, tender, regulator or framework is actually asking for, then define the right route and the responsibilities on both sides."
          titleWidth="26ch"
        />

        <div className="grid overflow-hidden rounded-card border border-line-card md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="border-b border-line-card bg-page p-7 last:border-b-0 md:p-[30px] lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Eyebrow>{stage.num}</Eyebrow>
              <h3 className="h4 mt-3">{stage.title}</h3>
              <p className="small mt-2.5">{stage.description}</p>
            </div>
          ))}
        </div>

        {/* Fast-track is offered as a possibility, never as a promise. The
            qualifying clause is the point of the block, not a hedge on it. */}
        <div className="tile mt-3.5 p-7 md:p-[30px]">
          <Eyebrow>Urgent requirement</Eyebrow>
          <h3 className="h4 mt-3">Need a fast-track route?</h3>
          <p className="small mt-2.5 max-w-[72ch]">
            When a customer, tender or transaction creates urgency, we can structure a fast-track
            programme where the scope, starting position, client availability and
            independent-assessor timetable make that realistic.
          </p>
          <p className="src mt-3">No universal completion time is promised before scoping.</p>
        </div>
      </div>
    </section>
  );
}
