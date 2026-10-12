import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { categoryLabel, formatInsightDate, type Insight } from "@/data/insights";
import GccRegulationVisual from "./GccRegulationVisual";

const VISUALS = {
  "gcc-landscape": GccRegulationVisual,
} as const;

/** The lead article. A diagram renders only when the article names one. */
export default function FeaturedInsight({ insight }: { insight: Insight }) {
  const Visual = insight.visual ? VISUALS[insight.visual] : null;
  const kicker = insight.featured
    ? `Featured insight · ${categoryLabel(insight.category)}`
    : categoryLabel(insight.category);

  return (
    <article className={Visual ? "grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14" : "max-w-[68ch]"}>
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2 className="h2 mt-4">
          <Link href={`/blog/${insight.slug}`} className="hover:text-brand">
            {insight.title}
          </Link>
        </h2>
        <p className="body mt-4 line-clamp-2 max-w-[54ch]">{insight.standfirst}</p>
        <p className="mono mt-5 flex flex-wrap items-center gap-x-3 text-[12px] text-soft">
          <time dateTime={insight.published}>{formatInsightDate(insight.published)}</time>
          <span aria-hidden="true">·</span>
          <span>{insight.readingTime}</span>
        </p>
        <Link
          href={`/blog/${insight.slug}`}
          className="flink mt-2 text-[15px] font-medium text-brand hover:text-brand-hover"
        >
          Read the insight
          <ArrowRight size={15} />
        </Link>
      </div>
      {Visual ? <Visual /> : null}
    </article>
  );
}
