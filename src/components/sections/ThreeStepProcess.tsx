import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";

const steps = [
  {
    num: "01",
    title: "We assess where you are",
    description:
      "A free gap analysis identifies exactly what you have, what you need, and how long it will take. No jargon. No surprises. Just a clear starting point, whether you are pursuing ISO 27001, ISO 42001, ISO 9001, Cyber Essentials, or any other standard.",
  },
  {
    num: "02",
    title: "We do the work",
    description:
      "Our consultants write the documentation, build the controls, train your team, and prepare you for the external audit. Your team stays focused on running your business. We handle every aspect of the compliance process.",
  },
  {
    num: "03",
    title: "You get certified",
    description:
      "We stand alongside you through the Stage 1 and Stage 2 audits. When you pass, and our clients pass first time, you have a globally recognised certification that opens doors to enterprise contracts, government frameworks, and new markets.",
  },
];

/**
 * The guide's bordered stage strip: one container, 1px internal dividers, no
 * gaps. step.num was already in the data and becomes the mono stage eyebrow,
 * replacing the numbered circles, the gradient rings and the connecting line.
 */
export default function ThreeStepProcess() {
  return (
    <section className="sec band-alt">
      <div className="wrap">
        <SectionHeading
          label="How We Work"
          title="Certified in Three Steps, So You Can Focus on Winning Deals"
          description="Simple, transparent, and designed to keep your business moving, no matter where you are in the world or what industry you operate in."
        />

        <div className="grid overflow-hidden rounded-card border border-line-card md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="border-b border-line-card bg-page p-7 last:border-b-0 md:border-b-0 md:border-r md:p-[30px] md:last:border-r-0"
            >
              <Eyebrow>{step.num}</Eyebrow>
              <h3 className="h4 mt-3">{step.title}</h3>
              <p className="small mt-2.5">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
