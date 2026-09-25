import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import { publishedCredentials, CREDENTIAL_STATEMENT, CREDENTIAL_FOOTNOTE } from "@/data/credentials";

/**
 * About (§31).
 *
 * Four parts: who we are, how we work, our approach and practitioner
 * credentials. There is no staff directory, no founder story built on
 * superlatives, and no statistic. Credentials come from src/data/credentials.ts
 * and are stated as individual practitioner credentials.
 *
 * The negative disclosure ("not an accredited certification body") must remain
 * on this page: the claims gate asserts it.
 */
const approach = [
  { title: "Understand the requirement", text: "Establish what the organisation needs to demonstrate, to whom, and under which standard, framework or regulation." },
  { title: "Match appropriate expertise", text: "Assign practitioners whose qualifications and experience fit the standard, jurisdiction, sector and technical requirement." },
  { title: "Implement proportionately", text: "Put in place controls and governance that fit the size and risk of the organisation, rather than a template." },
  { title: "Build evidence", text: "Establish records that show controls operating, so that customers, auditors and regulators can rely on them." },
  { title: "Prepare for independent assurance", text: "Where certification, attestation or assessment is required, prepare the organisation and support it through the independent process." },
  { title: "Support ongoing governance", text: "Keep governance, risk management and evidence current as the organisation and its obligations change." },
];

const notList = [
  "Pixelette Certified is not an accredited certification body and does not issue certificates.",
  "We do not perform SOC 2 examinations or issue SOC 2 reports. Those are performed by licensed CPA firms.",
  "We are not a Cyber Essentials Certification Body, and we do not hold PCI Qualified Security Assessor status.",
  "Where an engagement requires an accredited or licensed third party, we tell you who it is and coordinate with them.",
];

export default function AboutContent() {
  const creds = publishedCredentials();

  return (
    <>
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "About" }]} />
          <div className="mt-8 max-w-[58ch]">
            <h1 className="h1p">About Pixelette Certified</h1>
            <p className="lead mt-6">
              Pixelette Certified is a UK-headquartered compliance, cyber assurance and AI governance
              consultancy, focused principally on the United Kingdom, the United States and the GCC.
            </p>
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow className="mb-5">Who we are</Eyebrow>
              <h2 className="h2 max-w-[20ch]">A consultancy built around the requirement</h2>
            </div>
            <div className="space-y-4">
              <p className="body">
                Organisations come to us because a customer, regulator, investor or board expects them
                to demonstrate how they manage security, privacy, resilience or AI. We help them
                understand what is required, put appropriate controls and governance in place, and
                prepare for independent certification, attestation or assessment where it applies.
              </p>
              <p className="body">
                Pixelette Certified is part of Pixelette Group, a UK technology group. Each group
                company is engaged separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow className="mb-5">How we work</Eyebrow>
              <h2 className="h2 max-w-[20ch]">Specialist practitioners, one accountable engagement</h2>
            </div>
            <div className="space-y-4">
              <p className="body">
                We work through a specialist delivery network. For each engagement we select
                appropriately qualified practitioners, and where required selected specialist
                partners such as certification bodies, CPA firms or accredited testing providers,
                according to the standard, jurisdiction, sector and technical requirement.
              </p>
              <p className="body">
                Pixelette Certified remains the client&rsquo;s principal point of accountability
                throughout: for scope, delivery, quality and the ongoing relationship. The
                practitioners leading your engagement are confirmed with you before work begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <SectionHeading label="Our approach" title="How we approach each engagement" />
          <ol className="grid list-none overflow-hidden rounded-card border border-line-card md:grid-cols-2 lg:grid-cols-3">
            {approach.map((step, i) => (
              <li
                key={step.title}
                className="border-b border-line-card bg-page p-7 md:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r"
              >
                <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
                <h3 className="h4 mt-3">{step.title}</h3>
                <p className="small mt-2.5">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <SectionHeading
            label="Credentials"
            title="Practitioner credentials"
            description={CREDENTIAL_STATEMENT}
          />
          <ul className="list-none grid overflow-hidden rounded-card border border-line-card sm:grid-cols-2 lg:grid-cols-3">
            {creds.map((c) => (
              <li key={c.label} className="border-b border-line-card bg-page px-6 py-5 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r">
                <p className="text-[15px] font-semibold leading-snug text-ink">{c.label}</p>
                <p className="small mt-1">
                  {c.area}. {c.issuer}
                </p>
              </li>
            ))}
          </ul>
          <p className="src mt-6 max-w-[80ch]">{CREDENTIAL_FOOTNOTE}</p>

          <div className="mt-14 max-w-[72ch]">
            <h3 className="h4">Where independent assurance begins</h3>
            <ul className="mt-4 list-none space-y-3">
              {notList.map((item) => (
                <li key={item} className="small border-l-2 border-line-strong pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
