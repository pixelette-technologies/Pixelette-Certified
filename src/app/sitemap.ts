import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { markets } from "@/data/markets";
import { insights, activeCategories, categorySlug } from "@/data/insights";
import { SITE_CONFIG } from "@/lib/constants";

// Update when site structure or content materially changes, so lastmod stays
// honest rather than stamping the request time on every fetch.
const SITE_LAST_MODIFIED = new Date("2026-10-14");

/*
 * Every list below is derived from the data that drives the routes, so a page
 * cannot be in the sitemap without existing, or exist without being listed.
 * Withdrawn URLs (pricing, resources, ISO 9001 and 14001, the consolidated
 * service pages) are absent because they are redirects now.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;

  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly"
  ): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency,
    priority,
  });

  return [
    page("", 1.0, "weekly"),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, s.tier === "core" ? 0.8 : 0.6)),
    page("/markets", 0.7),
    ...markets.map((m) => page(`/markets/${m.path}`, 0.8)),
    page("/who-we-help", 0.6),
    page("/expertise", 0.6),
    page("/about", 0.6),
    page("/contact", 0.7),
    page("/blog", 0.7, "weekly"),
    ...activeCategories().map((c) => page(`/blog?category=${categorySlug(c)}`, 0.4, "weekly")),
    ...insights.map((i) => ({
      url: `${base}/blog/${i.slug}`,
      lastModified: new Date(i.updated ?? i.published),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    page("/privacy-policy", 0.2, "yearly"),
    page("/cookie-policy", 0.2, "yearly"),
  ];
}
