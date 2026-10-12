import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import { publishedCredentials, CREDENTIAL_FOOTNOTE } from "@/data/credentials";
import { ArrowRight } from "@/components/ui/icons";

/**
 * About, compressed to three ideas: who we are, how delivery is structured,
 * and where the credential record lives.
 *
 * The credential footnote must remain. The claims gate requires this file to
 * contain the phrase "not an accredited certification body".
 */

const DELIVERY = [
  "Pixelette Certified",
  "Specialist practitioner",
  "Independent assurance provider where required",
];

export default function AboutContent() {
  const creds = publishedCredentials();

  return (
    <>
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "About" }]} />
          <div className="mt-8 max-w-[30rem]">
            <h1 className="h1p">About Pixelette Certified</h1>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[14ch]">Who we are</h2>
          <div className="mt-6 max-w-[62ch] space-y-4">
            <p className="body">
              Pixelette Certified is a UK-headquartered cyber security, compliance, assurance and AI
              governance consultancy supporting organisations internationally.
            </p>
            <p className="body">
              We shape each engagement around the standards, customer requirements, regulatory context
              and specialist capability required. Organisations come to us when a customer, regulator,
              investor or board expects them to demonstrate how they manage security, privacy, resilience
              or AI.
            </p>
            <p className="body">
              We are part of Pixelette Group. Each group company is engaged separately.
            </p>
          </div>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[16ch]">How we deliver</h2>
          <ol className="mt-8 max-w-md list-none">
            {DELIVERY.map((layer, index) => (
              <li key={layer}>
                {index > 0 && (
                  <p className="py-2 pl-1 text-brand" aria-hidden="true">
                    ↕
                  </p>
                )}
                <p className="border-l-2 border-brand py-2 pl-4 text-[17px] font-medium text-ink">{layer}</p>
              </li>
            ))}
          </ol>
          <p className="body mt-8 max-w-[62ch]">
            Pixelette Certified remains accountable for the engagement and assigns a specialist
            practitioner. Where certification, attestation or scheme assessment must be independent, it
            is carried out by the appropriate accredited or authorised third party.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" data-reveal="">
          <h2 className="h2 max-w-[14ch]">Expertise</h2>
          <p className="mt-6 max-w-[70ch] font-mono text-[13px] leading-relaxed tracking-wide text-ink">
            {creds.map((credential) => credential.label).join(" · ")}
          </p>
          <p className="src mt-4 max-w-[72ch]">{CREDENTIAL_FOOTNOTE}</p>
          <Link href="/expertise" className="flink mt-6 text-sm font-medium text-brand hover:text-brand-hover">
            Explore our expertise <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
