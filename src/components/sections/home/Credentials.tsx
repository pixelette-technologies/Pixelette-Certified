import SectionHeading from "@/components/ui/SectionHeading";
import {
  publishedCredentials,
  CREDENTIAL_DISCLAIMER,
  CREDENTIAL_FOOTNOTE,
} from "@/data/credentials";

/**
 * Delivery credentials, as text labels.
 *
 * No logos, deliberately and permanently until logo-use rights are separately
 * confirmed for each mark. A third-party badge does two unhelpful things at
 * once: it implies a corporate relationship that does not exist, and it uses a
 * trademark we have not been licensed to use.
 *
 * Rendered from src/data/credentials.ts, filtered by its `verifiable` gate, so
 * this section cannot drift from the About page or from Alice. Adding a
 * credential means adding it to the register too, or the build fails.
 */
export default function Credentials() {
  const credentials = publishedCredentials();

  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="Delivery credentials"
          title="Credentialed specialists matched to the work."
          description={CREDENTIAL_DISCLAIMER}
          titleWidth="24ch"
        />

        <div className="grid overflow-hidden rounded-card border border-line-card sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((credential) => (
            <div
              key={credential.label}
              className="border-b border-line-card bg-page p-6 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r"
            >
              <p className="text-[15px] font-semibold leading-snug text-ink">{credential.label}</p>
              <p className="mono mt-1.5 text-xs uppercase tracking-[0.06em] text-brand">
                {credential.issuer}
              </p>
              <p className="small mt-2.5">{credential.scope}</p>
            </div>
          ))}
        </div>

        <p className="src mt-6 max-w-[80ch]">{CREDENTIAL_FOOTNOTE}</p>
      </div>
    </section>
  );
}
