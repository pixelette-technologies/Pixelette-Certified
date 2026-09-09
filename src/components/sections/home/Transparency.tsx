import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import FaqSchema from "@/components/seo/FaqSchema";

/**
 * "Independent assurance stays independent."
 *
 * The commercially counter-intuitive section, and the most valuable one. It
 * tells a buyer what we do NOT do, which is the fastest way to be believed
 * about what we do. A procurement team that has been told plainly who issues
 * the certificate stops wondering whether they are being sold something that
 * cannot be delivered.
 *
 * Answers use Accordion, which keeps panels mounted rather than unmounting
 * them, so all three remain crawlable and findable by in-page search. For a
 * section whose job is disclosure, hiding the text from a crawler would defeat
 * the purpose.
 */
const faqs = [
  {
    question: "Does Pixelette Certified issue ISO certificates?",
    answer:
      "No. We make no claim to be an ISO certification body. We help organisations implement the management system, prepare for audit and coordinate the independent certification route selected for the engagement. The certificate is issued by that independent body.",
  },
  {
    question: "Can you help us with SOC 2?",
    answer:
      "Yes. We support SOC 2 readiness by helping design and implement controls, prepare evidence and organise the operating model required for examination. The SOC 2 examination and the resulting report are performed through the appropriate independent CPA or audit route, never by us.",
  },
  {
    question: "Can you certify us to Cyber Essentials?",
    answer:
      "We provide Cyber Essentials readiness and coordination. We are not an IASME Certification Body, so the formal assessment and certification are handled through the appropriate authorised route.",
  },
];

export default function Transparency() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <FaqSchema faqs={faqs} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHeading
              label="Transparency"
              title="Independent assurance stays independent."
              className="mb-0"
              titleWidth="20ch"
            />
            <div className="mt-6 space-y-4">
              <p className="body">
                Pixelette Certified provides consultancy, implementation, readiness and engagement
                coordination. Where the target framework requires an independent certification,
                scheme assessment or attestation, the formal assessment and the resulting
                certificate or report are performed by the appropriate independent body for that
                engagement.
              </p>
              <p className="body">
                That separation protects the integrity of the assurance process and gives you a
                clear view of who is responsible for implementation and who is responsible for
                independent assessment.
              </p>
            </div>
          </div>

          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
