import { Zap, Puzzle, PoundSterling, Brain } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const differentiators = [
  {
    icon: Zap,
    title: "10 weeks to certification",
    description:
      "Most consultancies take 5 to 8 months. We have engineered a structured process that gets businesses certified in 10 weeks without cutting corners.",
  },
  {
    icon: Puzzle,
    title: "One partner for everything",
    description:
      "ISO certification, penetration testing, vCISO, vDPO, GDPR, AI governance, SOC 2, and managed advisory under one commercial relationship.",
  },
  {
    icon: PoundSterling,
    title: "No pricing surprises",
    description:
      "Fixed-fee proposals before any work begins. No hourly billing. No scope creep. Every engagement scoped to your business, your sector, and your audit body, with 90 days post-certification support included as standard.",
  },
  {
    icon: Brain,
    title: "AI governance pioneers",
    description:
      "Among the first UK consultancies offering ISO 42001 AI governance certification, with a PECB-certified ISO 42001 Lead Auditor on the team.",
  },
];

export default function Differentiators() {
  return (
    <section className="sec band-alt">
      <div className="wrap">
        <SectionHeading
          label="Why Pixelette Certified"
          title="The unfair advantage your compliance deserves"
        />

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <Card key={item.title} className="flex h-full flex-col">
              <item.icon className="h-5 w-5 text-brand" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="h4 mt-4">{item.title}</h3>
              <p className="small mt-2.5">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
