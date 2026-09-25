import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/icons";

/**
 * "What are you working towards?" (§9, section 2).
 *
 * Four routes rather than a list of standards, so a visitor can start from the
 * outcome they need. Each route lists the services that most often answer it.
 */
const routes = [
  {
    title: "Certification or independent assurance",
    text: "ISO certification, SOC 2 and other formal assurance requirements.",
    links: [
      { label: "ISO 27001", href: "/services/iso-27001" },
      { label: "SOC 2 readiness", href: "/services/soc-2" },
      { label: "ISO 42001", href: "/services/iso-42001" },
      { label: "Cyber Essentials", href: "/services/cyber-essentials" },
    ],
  },
  {
    title: "Customer or procurement requirements",
    text: "Evidence required by enterprise customers, procurement teams and supply chains.",
    links: [
      { label: "ISO 27001", href: "/services/iso-27001" },
      { label: "SOC 2 readiness", href: "/services/soc-2" },
      { label: "Cyber assurance & testing", href: "/services/cyber-assurance" },
      { label: "vCISO & GRC advisory", href: "/services/vciso" },
    ],
  },
  {
    title: "Regulatory requirements",
    text: "Requirements arising from the jurisdiction or sector in which the organisation operates.",
    links: [
      { label: "GCC regulatory compliance", href: "/services/gcc-regulatory-compliance" },
      { label: "Privacy & data governance", href: "/services/privacy" },
      { label: "Business continuity", href: "/services/iso-22301" },
    ],
  },
  {
    title: "Stronger governance",
    text: "Improving security, privacy, AI governance, resilience or internal oversight before an external requirement arises.",
    links: [
      { label: "AI governance", href: "/services/iso-42001" },
      { label: "vCISO & GRC advisory", href: "/services/vciso" },
      { label: "Privacy & data governance", href: "/services/privacy" },
      { label: "Business continuity", href: "/services/iso-22301" },
    ],
  },
];

export default function WorkingTowards() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading title="What are you working towards?" />

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((route) => (
            <div key={route.title} className="card flex h-full flex-col p-6">
              <h3 className="text-[17px] font-semibold leading-snug text-ink">{route.title}</h3>
              <p className="small mt-2.5">{route.text}</p>
              <ul className="mt-5 list-none space-y-1.5 border-t border-line pt-4">
                {route.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="flink text-sm font-medium text-brand hover:text-brand-hover"
                    >
                      {link.label} <ArrowRight size={13} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
