import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The delivery model (§10).
 *
 * Restrained on purpose. It explains that expertise is matched to the
 * engagement and that the client keeps one accountable relationship, without
 * describing subcontracting arrangements, naming delivery partners or implying
 * that every practitioner is a permanent employee.
 */
const concepts = [
  {
    title: "Appropriate expertise",
    text: "Practitioners are selected according to the standard, jurisdiction, sector and technical requirement.",
  },
  {
    title: "One accountable engagement",
    text: "The client retains a clear Pixelette Certified relationship throughout delivery.",
  },
  {
    title: "Independent assurance where required",
    text: "Formal certification, attestation and authorised assessments remain independent of consultancy and implementation work.",
  },
];

export default function DeliveryModel() {
  return (
    <section className="sec band-alt">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="Delivery model"
          title="The right expertise for each requirement"
          description="Pixelette Certified brings together specialist practitioners across cyber security, information security, privacy, AI governance and regulatory compliance. We match the appropriate expertise to each engagement while maintaining a clear point of accountability for the client."
          titleWidth="22ch"
        />

        <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-12">
          {concepts.map((concept) => (
            <div key={concept.title}>
              <h3 className="h4">{concept.title}</h3>
              <p className="small mt-2.5">{concept.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
