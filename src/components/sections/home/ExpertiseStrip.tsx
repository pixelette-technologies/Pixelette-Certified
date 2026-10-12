import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

/**
 * A narrow credibility line. The full credential record, including the
 * individual-holder qualification, lives on the Expertise page.
 */
export default function ExpertiseStrip() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <h2 className="h2 max-w-[18ch]">Practitioner-led expertise</h2>
        <p className="body mt-5 max-w-[58ch]">
          Our specialist delivery network brings professional expertise across information security, AI
          governance, privacy, cloud security and GRC.
        </p>
        <p className="mt-6 font-mono text-[13px] leading-relaxed tracking-wide text-ink">
          CISA · ISO/IEC 42001 Lead Auditor · AIGP · CIPP/US · CIPM · FIP · CCSK · CCZT
        </p>
        <p className="src mt-4 max-w-[62ch]">
          Credentials are held by the individual practitioners to whom they were issued.
        </p>
        <Link href="/expertise" className="flink mt-6 text-sm font-medium text-brand hover:text-brand-hover">
          Explore our expertise <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
