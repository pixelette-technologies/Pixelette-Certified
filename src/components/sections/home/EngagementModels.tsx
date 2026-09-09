import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/icons";
import { contactHref } from "@/lib/contact/constants";

/**
 * Three ways to buy.
 *
 * The point of naming them is that "consultancy" is otherwise an unbounded
 * commitment, and an unbounded commitment is hard to say yes to. A diagnostic
 * that costs nothing, a project with a defined end, and a retainer are three
 * different risk profiles, and a visitor can self-select.
 */
const models = [
  {
    name: "Compliance Diagnostic",
    copy: "A focused scoping conversation to identify what you have been asked to prove, what standard or evidence route applies, your current readiness and the next practical steps.",
    bestFor: "New enquiries, tender or customer requirements, unclear scope",
    highlight: true,
  },
  {
    name: "Implementation & Readiness Programme",
    copy: "A project-based engagement to design and embed the required controls, policies, evidence and governance, and prepare the organisation for the relevant independent assessment.",
    bestFor: "ISO 27001, ISO 42001, SOC 2 readiness, major compliance programmes",
    highlight: false,
  },
  {
    name: "Managed Governance & Compliance",
    copy: "Ongoing access to security, privacy and compliance leadership to keep risk, evidence, reviews and audit readiness moving after the initial project.",
    bestFor: "vCISO, vDPO, managed GRC, surveillance and maintenance",
    highlight: false,
  },
];

export default function EngagementModels() {
  return (
    <section className="sec band-alt">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="Engagement models"
          title="Three ways to work with Pixelette Certified"
          description="Start with the level of support the business actually needs. Every engagement is scoped before a commercial proposal is issued."
        />

        <div className="grid gap-3.5 lg:grid-cols-3">
          {models.map((model) => (
            <Card
              key={model.name}
              variant={model.highlight ? "feature" : "default"}
              className="flex h-full flex-col"
            >
              <h3 className="h4">{model.name}</h3>
              <p className="small mt-2.5 flex-1">{model.copy}</p>
              <div className="mt-6 border-t border-line pt-4">
                <Eyebrow as="p" className="mb-2">Best for</Eyebrow>
                <p className="small">{model.bestFor}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Lead magnet. The highest-intent visitors already have the document
            that triggered the search; asking for it beats asking them to
            summarise it into a textarea. */}
        <div className="card mt-3.5 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-[62ch]">
            <Eyebrow as="p" className="mb-3">Conversion tool</Eyebrow>
            <h3 className="h4">Send us the requirement</h3>
            <p className="small mt-2.5">
              Been sent an RFP clause, customer security questionnaire, supplier-onboarding request
              or compliance email? Send it over or paste the wording. We will use it to scope the
              conversation around the actual requirement rather than guessing from an acronym.
            </p>
          </div>
          <div className="shrink-0">
            <Button href={contactHref("tender-requirement")} size="lg" iconRight={<ArrowRight size={16} />}>
              Send Us the Requirement
            </Button>
          </div>
        </div>

        <p className="small mt-8">
          <Link href="/pricing" className="flink font-medium text-brand hover:text-brand-hover">
            How our pricing works <ArrowRight size={14} />
          </Link>
        </p>
      </div>
    </section>
  );
}
