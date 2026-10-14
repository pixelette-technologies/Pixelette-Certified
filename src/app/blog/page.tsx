import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Newsletter from "@/components/sections/Newsletter";
import FeaturedInsight from "@/components/insights/FeaturedInsight";
import InsightEntry from "@/components/insights/InsightEntry";
import InsightSearch from "@/components/insights/InsightSearch";
import {
  activeCategories,
  categoryFromParam,
  categoryLabel,
  categorySlug,
  composeInsightIndex,
  filterInsights,
  insightsHref,
} from "@/data/insights";
import { pageMetadata } from "@/lib/seo";

const INTRO =
  "Analysis of cyber security, compliance and AI governance requirements, including standards that apply internationally and rules that depend on the jurisdiction.";

type Search = { category?: string | string[]; q?: string | string[]; more?: string | string[] };

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Search>;
}): Promise<Metadata> {
  const params = await searchParams;
  const q = first(params.q)?.trim();
  const category = categoryFromParam(first(params.category));

  if (q) {
    return pageMetadata({
      title: "Insights",
      description: INTRO,
      path: "/blog",
    });
  }

  if (category) {
    return pageMetadata({
      title: `${categoryLabel(category)} insights`,
      description: INTRO,
      path: insightsHref({ category: categorySlug(category) }),
    });
  }

  return pageMetadata({
    title: "Insights",
    description: INTRO,
    path: "/blog",
  });
}

export default async function InsightsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const category = categoryFromParam(first(params.category));
  const q = first(params.q)?.trim() ?? "";
  const more = first(params.more) === "1";
  const categoryParam = category ? categorySlug(category) : undefined;
  const items = filterInsights({ category: categoryParam, q });
  const view = composeInsightIndex(items, more);

  const crumbs = category
    ? [
        { name: "Home", href: "/" },
        { name: "Insights", href: "/blog" },
        { name: categoryLabel(category) },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Insights" },
      ];

  return (
    <>
      <BreadcrumbSchema items={crumbs} />

      <section>
        <div className="wrap pb-2 pt-10 lg:pt-14">
          <Breadcrumbs
            schema={false}
            items={
              category
                ? [{ name: "Insights", href: "/blog" }, { name: categoryLabel(category) }]
                : [{ name: "Insights" }]
            }
          />
          <div className="mt-5 max-w-[58ch]">
            <h1 className="h1p">Insights</h1>
            <p className="lead mt-4">{INTRO}</p>
          </div>

          <div className="mt-8 flex flex-col gap-5 lg:mt-10 lg:flex-row lg:items-center lg:justify-between">
            <nav aria-label="Insight categories" className="-mx-1 overflow-x-auto px-1">
              <ul className="flex w-max items-center md:w-auto md:flex-wrap md:gap-y-2">
                <CategoryLink href={insightsHref({ q })} current={!category} dot={false}>
                  All
                </CategoryLink>
                {activeCategories().map((item) => (
                  <CategoryLink
                    key={item}
                    href={insightsHref({ category: categorySlug(item), q })}
                    current={item === category}
                  >
                    {categoryLabel(item)}
                  </CategoryLink>
                ))}
              </ul>
            </nav>
            <InsightSearch query={q} category={categoryParam} />
          </div>
        </div>
      </section>

      {view.lead ? (
        <section className="sec" aria-label={view.lead.featured ? "Featured insight" : "Lead insight"}>
          <div className="wrap">
            <FeaturedInsight insight={view.lead} />
          </div>
        </section>
      ) : (
        <section className="sec">
          <div className="wrap">
            <p className="body">No insights match this search.</p>
            <Link href={insightsHref({ category: categoryParam })} className="flink mt-3 font-medium text-brand">
              Clear search
            </Link>
          </div>
        </section>
      )}

      {view.latest.length > 0 && (
        <section className="sec" aria-labelledby="latest-heading">
          <div className="wrap">
            <h2 id="latest-heading" className="h2">
              Latest
            </h2>
            <div className="mt-2 grid md:grid-cols-2 md:gap-x-14">
              {view.latest.map((insight) => (
                <InsightEntry key={insight.slug} insight={insight} prominence="latest" />
              ))}
            </div>
          </div>
        </section>
      )}

      {view.browse.length > 0 && (
        <section className="sec" aria-labelledby="browse-heading">
          <div className="wrap">
            <h2 id="browse-heading" className="h2">
              Browse insights
            </h2>
            <div className="mt-2 grid md:grid-cols-2 md:gap-x-16">
              {view.browse.map((insight) => (
                <InsightEntry key={insight.slug} insight={insight} />
              ))}
            </div>
            {view.hiddenCount > 0 && (
              <div className="mt-8">
                <Link href={insightsHref({ category: categoryParam, q, more: true })} className="btn2">
                  Load more insights
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      <Newsletter />
    </>
  );
}

function CategoryLink({
  href,
  current,
  dot = true,
  children,
}: {
  href: string;
  current: boolean;
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <li className="flex shrink-0 items-center">
      {dot ? (
        <span aria-hidden="true" className="px-2.5 text-soft">
          ·
        </span>
      ) : null}
      <Link
        href={href}
        aria-current={current ? "page" : undefined}
        className={
          current
            ? "inline-flex min-h-11 items-center text-[15px] font-semibold text-ink underline decoration-brand decoration-2 underline-offset-[7px]"
            : "inline-flex min-h-11 items-center text-[15px] text-muted hover:text-ink"
        }
      >
        {children}
      </Link>
    </li>
  );
}
