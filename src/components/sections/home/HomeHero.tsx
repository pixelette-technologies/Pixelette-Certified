import Button from "@/components/ui/Button";
import { PRIMARY_CTA } from "@/lib/constants";

/**
 * Homepage hero (§4).
 *
 * The H1 is the brand promise and must be retained exactly as written. The
 * trust line underneath is deliberately restrained: headquarters and markets,
 * stated once, with no statistic and no "global" claim.
 */
export default function HomeHero() {
  return (
    <section className="wash">
      <div className="wrap py-20 text-center lg:py-28">
        <p className="mono text-xs uppercase tracking-[0.08em] text-brand">
          Cyber security, compliance &amp; AI governance
        </p>

        <h1 className="h1 mx-auto mt-6 max-w-[22ch]">
          Build the assurance your customers, regulators and partners expect
        </h1>

        <p className="lead mx-auto mt-7 max-w-[62ch]">
          Pixelette Certified helps organisations meet cyber security, compliance and AI governance
          requirements across the UK, United States and GCC. We assess what is required, address the
          gaps, implement appropriate controls and prepare you for independent certification,
          attestation or assessment.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
          <Button href="/services" variant="secondary">
            Explore our services
          </Button>
        </div>

        <p className="small mx-auto mt-10 border-t border-line pt-8">
          UK headquartered. Focused on the UK, United States and GCC.
        </p>
      </div>
    </section>
  );
}
