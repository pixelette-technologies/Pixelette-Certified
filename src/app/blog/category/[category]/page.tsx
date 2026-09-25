import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import InsightCard from "@/components/insights/InsightCard";
import { activeCategories, categorySlug, insightsByCategorySlug } from "@/data/insights";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return activeCategories().map((c) => ({ category: categorySlug(c) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const result = insightsByCategorySlug(slug);
  if (!result) return {};

  const url = `${SITE_CONFIG.url}/blog/category/${slug}`;
  return {
    title: `${result.category} Insights`,
    description: `Pixelette Certified insights on ${result.category}, with references to primary sources.`,
    alternates: { canonical: url },
    openGraph: { title: `${result.category} | Insights | Pixelette Certified`, url, type: "website" },
  };
}

export default async function InsightCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const result = insightsByCategorySlug(slug);
  if (!result) notFound();

  const { category, items } = result;

  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Home", href: "/" }, { name: "Insights", href: "/blog" }, { name: category }]}
      />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs schema={false} items={[{ name: "Insights", href: "/blog" }, { name: category }]} />
          <h1 className="h1p mt-8">{category}</h1>

          <nav aria-label="Insight categories" className="mt-10 flex flex-wrap gap-2">
            {activeCategories().map((c) => (
              <Link
                key={c}
                href={`/blog/category/${categorySlug(c)}`}
                aria-current={c === category ? "page" : undefined}
                className={
                  c === category
                    ? "pill pill-brand min-h-[44px]"
                    : "pill min-h-[44px] transition-colors hover:border-brand hover:text-brand"
                }
              >
                {c}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} headingLevel="h2" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
