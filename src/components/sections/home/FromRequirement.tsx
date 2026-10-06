import SectionHeading from "@/components/ui/SectionHeading";
import AssurancePathway from "@/components/visuals/AssurancePathway";

/**
 * Replaces the separate "how we work" and "delivery model" sections. The
 * pathway carries the sequence; one sentence underneath carries accountability.
 */
export default function FromRequirement() {
  return (
    <section className="sec band-alt">
      <div className="wrap" data-reveal="">
        <SectionHeading
          title="From requirement to assurance"
          description="We establish what is required, bring in the appropriate expertise and support the organisation through implementation and independent assurance."
          titleWidth="18ch"
        />
        <AssurancePathway />
        <p className="small mt-8 max-w-[68ch] border-t border-line pt-6">
          Pixelette Certified remains your point of accountability throughout, bringing in
          appropriately qualified specialists and independent assurance providers where the engagement
          requires them.
        </p>
      </div>
    </section>
  );
}
