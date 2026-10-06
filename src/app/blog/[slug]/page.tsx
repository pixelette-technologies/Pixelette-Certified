import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import Eyebrow from "@/components/ui/Eyebrow";
import InsightCard from "@/components/insights/InsightCard";
import { ArrowRight } from "@/components/ui/icons";
import {
  insights,
  getInsight,
  getRelatedInsights,
  categorySlug,
  categoryLabel,
  insightsHref,
  formatInsightDate,
  type InsightBlock,
} from "@/data/insights";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  const url = `${SITE_CONFIG.url}/blog/${insight.slug}`;
  return {
    title: insight.seoTitle,
    description: insight.description,
    alternates: { canonical: url },
    openGraph: {
      title: insight.title,
      description: insight.description,
      type: "article",
      url,
      publishedTime: insight.published,
      modifiedTime: insight.updated ?? insight.published,
    },
    twitter: { card: "summary_large_image", title: insight.title, description: insight.description },
  };
}

function Block({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }
    case "callout":
      return (
        <aside className="rounded-card border border-line-card bg-band px-6 py-5">
          <p className="text-[15px] font-semibold text-ink">{block.title}</p>
          <p className="small mt-2">{block.text}</p>
        </aside>
      );
  }
}

/*
 * The article template (§19). Category, title, standfirst, dates and reading
 * time up front; a structured body; numbered sources; one restrained service
 * link at the end, and nothing that interrupts the article to sell.
 */
export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const related = getRelatedInsights(insight);
  const url = `${SITE_CONFIG.url}/blog/${insight.slug}`;

  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", href: "/" }, { name: "Insights", href: "/blog" }, { name: insight.title }]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          description: insight.description,
          datePublished: insight.published,
          dateModified: insight.updated ?? insight.published,
          articleSection: insight.category,
          author: { "@id": `${SITE_CONFIG.url}/#organization` },
          publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
          mainEntityOfPage: url,
          citation: insight.sources.map((s) => s.url),
        }}
      />

      <article className="py-16 lg:py-24">
        <div className="wrap max-w-[820px]">
          <Breadcrumbs schema={false} items={[{ name: "Insights", href: "/blog" }, { name: insight.title }]} />

          <header className="mb-12 mt-8">
            <Link href={insightsHref({ category: categorySlug(insight.category) })} className="inline-block">
              <Eyebrow>{categoryLabel(insight.category)}</Eyebrow>
            </Link>
            <h1 className="h1p mt-5">{insight.title}</h1>
            <p className="lead mt-6">{insight.standfirst}</p>
            <p className="mono mt-7 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-soft">
              <span>
                Published <time dateTime={insight.published}>{formatInsightDate(insight.published)}</time>
              </span>
              {insight.updated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={insight.updated}>{formatInsightDate(insight.updated)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{insight.readingTime}</span>
              <span aria-hidden="true">·</span>
              <span>{insight.jurisdiction}</span>
            </p>
          </header>

          <div className="prose">
            {insight.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <section aria-labelledby="sources-heading" className="mt-14 border-t border-line pt-8">
            <h2 id="sources-heading" className="h4">
              Sources
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5">
              {insight.sources.map((source) => (
                <li key={source.url} className="small">
                  <a href={source.url} className="link" target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                  , {source.publisher}
                </li>
              ))}
            </ol>
            <p className="src mt-5">
              This article is general information as at its publication or update date. It is not
              legal advice.
            </p>
          </section>

          <div className="mt-12 border-t border-line pt-8">
            <Link href={insight.service.href} className="flink text-[15px] font-medium text-brand hover:text-brand-hover">
              {insight.service.label} <ArrowRight size={15} />
            </Link>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="h3 mb-8">Related insights</h2>
              <div className="grid gap-3.5 md:grid-cols-3">
                {related.map((r) => (
                  <InsightCard key={r.slug} insight={r} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
