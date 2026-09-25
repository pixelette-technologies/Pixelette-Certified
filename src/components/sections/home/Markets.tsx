import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { markets, marketHref } from "@/data/markets";

/**
 * Three equal market cards (§11). Only the three headline markets appear.
 */
export default function Markets() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading label="Markets" title="Where we work" />

        <div className="grid gap-3.5 md:grid-cols-3">
          {markets.map((market) => (
            <Link
              key={market.slug}
              href={marketHref(market)}
              className="card flex h-full flex-col transition-colors duration-150 hover:border-line-strong"
            >
              <h3 className="h3">{market.name}</h3>
              <p className="small mt-3 flex-1">{market.cardLine}</p>
              <span className="flink mt-5 text-sm font-medium text-brand">
                Explore the market <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Button href="/markets" variant="secondary">
            Explore our markets
          </Button>
        </div>
      </div>
    </section>
  );
}
