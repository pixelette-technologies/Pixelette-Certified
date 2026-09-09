import SectionHeading from "@/components/ui/SectionHeading";
import { Check } from "@/components/ui/icons";

/**
 * "One accountable route" - the delivery model.
 *
 * This section is doing legal work as well as commercial work, and the two
 * happen to point the same way. It explains why one company can front a
 * programme that draws on credentialed specialists, without implying that every
 * professional qualification and independent accreditation sits inside that one
 * company. That distinction is the whole basis of the publication rule, and
 * stating it plainly reads as confidence rather than a disclaimer.
 */
const understandings = [
  "Pixelette Certified is the accountable commercial and delivery-management front door.",
  "Practitioners are matched to the engagement based on competence, availability and jurisdiction.",
  "Professional credentials belong to the people who hold them. They are not converted into Pixelette corporate accreditations.",
  "Independent certification or attestation remains independent.",
  "You receive one scoped plan, one project route and one accountable Pixelette relationship.",
];

export default function DeliveryModel() {
  return (
    <section className="sec band-dark">
      <div className="wrap" data-reveal="">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              dark
              label="How Pixelette delivers"
              title="One client relationship. The right specialist for the requirement."
              className="mb-0"
              titleWidth="24ch"
            />
          </div>

          <div className="space-y-5">
            <p className="body">
              Pixelette Certified remains accountable for the client engagement: discovery, scope,
              commercial proposal, project governance, quality control and the ongoing
              relationship.
            </p>
            <p className="body">
              Where specialist capability is required, we assign credentialed practitioners from
              our approved delivery network according to the framework, sector and jurisdiction.
              Where an independent certification, scheme assessment or attestation is required, we
              coordinate the appropriate independent route rather than blurring consultancy with
              assurance.
            </p>
            <p className="body">
              The result is a simpler client journey without pretending that every professional
              qualification or independent accreditation sits inside one company.
            </p>
          </div>
        </div>

        {/* Bare list rather than .card: a white card ground inside a dark band
            fights the section it sits in. */}
        <div className="mt-14 border-t border-panel-line pt-10">
          <p className="eyebrow mb-6">What the customer should understand</p>
          <ul className="list-none grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {understandings.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-1 shrink-0 text-footer-accent">
                  <Check size={16} />
                </span>
                <span className="small">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
