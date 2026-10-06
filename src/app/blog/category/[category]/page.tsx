import { notFound, permanentRedirect } from "next/navigation";
import { activeCategories, categorySlug } from "@/data/insights";

export const dynamicParams = false;

export function generateStaticParams() {
  return activeCategories().map((category) => ({ category: categorySlug(category) }));
}

/**
 * Category archives now live on the Insights index as a shareable query.
 * The old path remains so existing links resolve.
 */
export default async function InsightCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const known = activeCategories().some((item) => categorySlug(item) === category);
  if (!known) notFound();
  permanentRedirect(`/blog?category=${category}`);
}
