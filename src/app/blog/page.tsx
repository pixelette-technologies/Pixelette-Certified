import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Newsletter from "@/components/sections/Newsletter";
import InsightCard from "@/components/insights/InsightCard";
import { insights, activeCategories, categorySlug } from "@/data/insights";

/*
 * Insights (§32). The address stays /blog so that existing article URLs keep
 * working; the section is called Insights everywhere a visitor reads it.
 */
export default function InsightsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Insights" }]} />

      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Insights" }]} />
          <div className="mt-8 max-w-[58ch]">
            <h1 className="h1p">Insights</h1>
            <p className="lead mt-6">
              Analysis of cyber security, compliance, assurance and AI governance requirements in the
              UK, United States and GCC, with references to the underlying legislation, standards
              and regulatory guidance.
            </p>
          </div>

          <nav aria-label="Insight categories" className="mt-10 flex flex-wrap gap-2">
            {activeCategories().map((c) => (
              <Link
                key={c}
                href={`/blog/category/${categorySlug(c)}`}
                className="pill min-h-[44px] transition-colors hover:border-brand hover:text-brand"
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
            {insights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} headingLevel="h2" />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
