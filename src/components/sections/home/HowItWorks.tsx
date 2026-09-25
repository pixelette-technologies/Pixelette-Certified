import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * How we work (§9, section 4). Four stages, ending at independent assurance
 * rather than at "you get certified", followed by the note that makes clear who
 * takes the certification decision.
 */
const stages = [
  {
    title: "Understand the requirement",
    text: "Define the objective, applicable standards or frameworks, existing position and intended outcome.",
  },
  {
    title: "Assess and plan",
    text: "Identify gaps, establish scope and agree an implementation plan.",
  },
  {
    title: "Implement and evidence",
    text: "Develop the controls, governance, documentation and evidence required for the engagement.",
  },
  {
    title: "Prepare for independent assurance",
    text: "Complete readiness work and support the organisation through the relevant independent certification, attestation or assessment process where required.",
  },
];

export default function HowItWorks() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading label="How we work" title="A clear route from requirement to assurance" titleWidth="24ch" />

        <ol className="grid list-none overflow-hidden rounded-card border border-line-card md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <li
              key={stage.title}
              className="border-b border-line-card bg-page p-7 last:border-b-0 md:p-[30px] lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
              <h3 className="h4 mt-3">{stage.title}</h3>
              <p className="small mt-2.5">{stage.text}</p>
            </li>
          ))}
        </ol>

        <p className="small mt-6 max-w-[72ch]">
          Independent certification, attestation and scheme decisions are made by the relevant
          authorised third party, not by Pixelette Certified.
        </p>
      </div>
    </section>
  );
}
