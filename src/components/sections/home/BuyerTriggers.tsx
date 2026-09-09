import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/icons";
import { contactHref, type EnquiryReasonValue } from "@/lib/contact/constants";

/**
 * "What brought you here?" - eight buyer triggers.
 *
 * The premise, from the brief: most organisations do not begin with a
 * compliance roadmap. They begin with a customer request, a tender condition, a
 * security questionnaire, an investor question or a regulatory deadline. Asking
 * someone to pick a standard first makes them do the diagnosis themselves,
 * usually badly, and the ones who guess wrong bounce.
 */
interface BuyerTrigger {
  heading: string;
  copy: string;
  ctaLabel: string;
  /** Where the card goes. A service page where one genuinely answers the
   *  trigger, the enquiry form where the answer is "it depends, let us look". */
  href: string;
}

/**
 * `reason` is typed against the enquiry vocabulary, so a renamed option is a
 * build error here rather than a runtime 400 for a visitor who followed the
 * link. The server validates membership, so these two must not drift.
 */
function formLink(reason: EnquiryReasonValue): string {
  return contactHref(reason);
}

const triggers: BuyerTrigger[] = [
  {
    heading: "A customer or tender has asked for certification",
    copy: "We scope the requirement, assess your current position and build the implementation and audit-readiness plan.",
    ctaLabel: "Map my certification route",
    href: formLink("tender-requirement"),
  },
  {
    heading: "We have been sent a security questionnaire",
    copy: "We turn the questions into an evidence plan, close control gaps and prepare a defensible response.",
    ctaLabel: "Review my requirement",
    href: formLink("security-questionnaire"),
  },
  {
    heading: "We need ISO 27001 or ISO 42001",
    copy: "From gap assessment and management-system build through internal readiness and independent audit coordination.",
    ctaLabel: "Start an ISO programme",
    href: "/services/iso-27001",
  },
  {
    heading: "A US customer is asking for SOC 2",
    copy: "We prepare the controls, evidence and operating model needed for a SOC 2 examination.",
    ctaLabel: "Start SOC 2 readiness",
    href: "/services/soc-2",
  },
  {
    heading: "Customers are questioning how we govern AI",
    copy: "Build an AI governance system around risk, accountability, evidence and ISO/IEC 42001 readiness.",
    ctaLabel: "Assess our AI governance",
    href: "/services/iso-42001",
  },
  {
    heading: "We need a CISO, but not a full-time hire",
    copy: "Access senior security governance, risk oversight and board-level support through a scoped vCISO engagement.",
    ctaLabel: "Discuss vCISO",
    href: "/services/vciso",
  },
  {
    heading: "We need privacy leadership or an external DPO",
    copy: "Ongoing privacy governance, DPIA support, RoPA oversight and an externally delivered DPO service where appropriate.",
    ctaLabel: "Discuss vDPO",
    href: "/services/vdpo",
  },
  {
    heading: "We are already certified and need to stay ready",
    copy: "Keep controls, evidence, reviews and improvement activity moving between audits.",
    ctaLabel: "Manage our compliance",
    href: "/services/managed-compliance",
  },
];

export default function BuyerTriggers() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="Your route"
          title="Start with the requirement, not the acronym."
          description="Most organisations do not begin with a compliance roadmap. They begin with a customer request, a tender condition, a security questionnaire, an investor question or a regulatory deadline. Tell us what has happened and we will help you work out what evidence, controls or external assessment you actually need."
        />

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {triggers.map((trigger) => (
            <Link
              key={trigger.heading}
              href={trigger.href}
              className="card flex h-full flex-col p-6 transition-colors duration-150 hover:border-line-strong"
            >
              <h3 className="text-[17px] font-semibold leading-snug text-ink">{trigger.heading}</h3>
              <p className="small mt-2.5 flex-1">{trigger.copy}</p>
              <span className="flink mt-4 text-sm font-medium text-brand">
                {trigger.ctaLabel} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
