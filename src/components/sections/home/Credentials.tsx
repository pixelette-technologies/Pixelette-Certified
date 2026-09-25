import SectionHeading from "@/components/ui/SectionHeading";
import { publishedCredentials, CREDENTIAL_STATEMENT, CREDENTIAL_FOOTNOTE } from "@/data/credentials";

/**
 * Practitioner-led expertise (§12).
 *
 * Replaces anonymous statistics and client quotations. Credentials render as
 * text labels from src/data/credentials.ts, so this section cannot drift from
 * the About page, and the footnote makes plain that they belong to individuals.
 */
export default function Credentials() {
  const creds = publishedCredentials();

  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="Expertise"
          title="Practitioner-led expertise"
          description={`Engagements are delivered by practitioners with relevant professional qualifications and practical delivery experience. ${CREDENTIAL_STATEMENT}`}
          titleWidth="22ch"
        />

        <ul className="list-none grid overflow-hidden rounded-card border border-line-card sm:grid-cols-2 lg:grid-cols-3">
          {creds.map((c) => (
            <li key={c.label} className="border-b border-line-card bg-page px-6 py-5 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r">
              <p className="text-[15px] font-semibold leading-snug text-ink">{c.label}</p>
              <p className="small mt-1">{c.area}</p>
            </li>
          ))}
        </ul>

        <p className="src mt-6 max-w-[80ch]">{CREDENTIAL_FOOTNOTE}</p>
      </div>
    </section>
  );
}
