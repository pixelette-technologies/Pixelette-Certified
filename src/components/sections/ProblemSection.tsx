import { AlertTriangle, TrendingDown, ShieldOff } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Lost Contracts",
    description:
      "Every day, businesses across every sector and every geography lose enterprise deals because they cannot answer: 'Are you ISO 27001 certified?' Procurement teams reject uncertified suppliers automatically. The question is never even asked twice.",
  },
  {
    icon: TrendingDown,
    title: "Stalled Investment",
    description:
      "Investors move on when your data governance is unclear. Compliance gaps signal operational risk that venture capital firms, private equity, and strategic investors will not accept, regardless of how strong your product is.",
  },
  {
    icon: ShieldOff,
    title: "Failed Onboarding",
    description:
      "Enterprise clients, government bodies, regulated industries, and healthcare networks worldwide cannot onboard uncertified suppliers. Without the right certifications, you are locked out before the conversation starts, in every market, in every sector.",
  },
];

/**
 * 3-up card grid. The per-card red/amber gradient chips were off-palette
 * decoration and are gone; the guide states an icon as a small thin-stroke
 * glyph in brand green directly above the card heading.
 */
export default function ProblemSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeading
          label="The Problem"
          title="Your next big deal is waiting on a certificate you don't have yet."
          description="The cost of not being certified is not the fee you save. It is every deal that goes to a competitor who is already certified. Every procurement gate you fail. Every contract you lose before you even get to a conversation."
        />

        <div className="grid gap-3.5 md:grid-cols-3">
          {painPoints.map((point) => (
            <Card key={point.title} className="flex h-full flex-col">
              <point.icon className="h-5 w-5 text-brand" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="h4 mt-4">{point.title}</h3>
              <p className="small mt-2.5">{point.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
