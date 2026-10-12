import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import { formatInsightDate, type Insight } from "@/data/insights";

interface InsightCardProps {
  insight: Insight;
  headingLevel?: "h2" | "h3";
}

/** One card per article, shared by the index, the category archives and related articles. */
export default function InsightCard({ insight, headingLevel = "h3" }: InsightCardProps) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/blog/${insight.slug}`}
      className="card flex h-full flex-col transition-colors duration-150 hover:border-line-strong"
    >
      <Eyebrow>{insight.category}</Eyebrow>
      <Heading className="h4 mt-4 leading-snug">{insight.title}</Heading>
      <p className="small mt-3 flex-1">{insight.standfirst}</p>
      <div className="mono mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 text-[11px] text-soft">
        <time dateTime={insight.published}>{formatInsightDate(insight.published)}</time>
        <span aria-hidden="true">·</span>
        <span>{insight.readingTime}</span>
      </div>
    </Link>
  );
}
