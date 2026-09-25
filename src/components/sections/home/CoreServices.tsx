import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/icons";
import { getCoreServices } from "@/data/services";

/**
 * Core services (§9, section 3). Eight cards, each with a name, one sentence
 * and a link. No timelines, prices or certification promises, which is why the
 * card copy comes straight from `summary` in services.ts and nowhere else.
 */
export default function CoreServices() {
  const core = getCoreServices();

  return (
    <section className="sec band-alt">
      <div className="wrap" data-reveal="">
        <SectionHeading title="Compliance and assurance built around the requirement" titleWidth="24ch" />

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {core.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card flex h-full flex-col p-6 transition-colors duration-150 hover:border-line-strong"
              >
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="h4 mt-4">{service.navLabel}</h3>
                <p className="small mt-2 flex-1">{service.summary}</p>
                <span className="flink mt-4 text-sm font-medium text-brand">
                  Explore service <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
