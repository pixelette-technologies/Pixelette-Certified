import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { categoryLabel, formatInsightDate, type Insight } from "@/data/insights";

interface InsightEntryProps {
  insight: Insight;
  /** Latest sits between the feature and the archive. Browse is the default. */
  prominence?: "latest" | "browse";
}

/** Typographic archive row. No thumbnail, no card chrome. */
export default function InsightEntry({ insight, prominence = "browse" }: InsightEntryProps) {
  const titleClass =
    prominence === "latest"
      ? "font-[family-name:var(--font-ui)] text-[1.375rem] font-semibold leading-snug text-ink"
      : "font-[family-name:var(--font-ui)] text-[1.25rem] font-semibold leading-snug text-ink";

  return (
    <article className="border-t border-line py-7">
      <p className="eyebrow">{categoryLabel(insight.category)}</p>
      <h3 className={`mt-3 ${titleClass}`}>
        <Link href={`/blog/${insight.slug}`} className="inline-flex items-start gap-3 hover:text-brand">
          <span>{insight.title}</span>
          <ArrowRight size={15} className="mt-1.5 shrink-0" />
        </Link>
      </h3>
      <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-muted">{insight.summary}</p>
      <p className="mono mt-4 flex flex-wrap items-center gap-x-3 text-[12px] text-soft">
        <time dateTime={insight.published}>{formatInsightDate(insight.published)}</time>
        <span aria-hidden="true">·</span>
        <span>{insight.readingTime}</span>
      </p>
    </article>
  );
}
