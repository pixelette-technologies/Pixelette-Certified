/**
 * The brief's final homepage positioning statement, verbatim.
 *
 * It reads as a summary, but it is doing something more specific: each of the
 * four sentences after the headline is the answer to an objection a procurement
 * team actually raises. Who is accountable. Who is doing the work. Who assesses
 * us. What happens after the certificate.
 *
 * Placed immediately before the closing CTA so the page ends on the proposition
 * rather than on the absence of case studies.
 */
export default function PositioningStatement() {
  return (
    <section className="border-y border-line py-14 lg:py-16">
      <div className="wrap mx-auto max-w-[72ch] text-center" data-reveal="">
        <h2 className="h2">
          Pixelette Certified removes the security, governance and compliance barriers that slow
          enterprise growth.
        </h2>
        <p className="body mt-6">
          One accountable client relationship. The right credentialed specialist for the
          requirement. Clear separation between implementation and independent assurance. Ongoing
          support to stay ready after the audit.
        </p>
      </div>
    </section>
  );
}
