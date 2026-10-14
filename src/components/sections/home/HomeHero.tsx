import Button from "@/components/ui/Button";
import AssuranceSystem from "@/components/visuals/AssuranceSystem";
import { HOMEPAGE_POSITIONING } from "@/content/company";
import { PRIMARY_CTA } from "@/lib/constants";

/**
 * Homepage hero. The H1 is the approved brand promise and is not rewritten.
 * Kept in step with HOMEPAGE_POSITIONING (social card + alt text).
 * The diagram is the memorable element; the copy stays to two sentences.
 */
export default function HomeHero() {
  return (
    <section className="wash">
      <div className="wrap grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 lg:py-24">
        <div>
          <p className="mono text-xs uppercase tracking-[0.08em] text-brand">
            Cyber security, compliance and AI governance
          </p>

          <h1 className="h1 mt-6 max-w-[16ch]">{HOMEPAGE_POSITIONING.h1}</h1>

          <p className="lead mt-7 max-w-[48ch]">
            Pixelette Certified helps organisations meet cyber security, compliance and AI governance
            requirements. We support organisations internationally, adapting each engagement to the
            relevant standard, customer requirement and jurisdiction.
          </p>
          <p className="body mt-4 max-w-[48ch]">
            We assess the requirement, address the gaps and prepare organisations for independent
            assurance.
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
            <Button href="#services" variant="secondary">
              Explore our services
            </Button>
          </div>
        </div>

        <AssuranceSystem />
      </div>
    </section>
  );
}
