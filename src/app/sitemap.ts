import type { MetadataRoute } from "next";
import { getRoutedServices } from "@/data/services";
import { SITE_CONFIG } from "@/lib/constants";
import { allCategories, categorySlug } from "@/lib/categories";

// Update when site structure/content materially changes; keeps sitemap lastmod
// honest rather than stamping the request time on every fetch.
const SITE_LAST_MODIFIED = new Date("2026-09-08");

const blogPostSlugs: { slug: string; date: string }[] = [
  { slug: "iso-27001-security-questionnaire", date: "2026-04-07" },
  { slug: "iso-27001-fast-track-what-changes", date: "2026-04-06" },
  { slug: "real-cost-not-being-iso-27001-certified", date: "2026-04-05" },
  { slug: "customer-asked-ai-governance", date: "2026-04-04" },
  { slug: "iso-27001-or-soc-2-uk-saas", date: "2026-04-03" },
  { slug: "enterprise-security-questionnaire-without-iso-27001", date: "2026-04-02" },
  { slug: "iso-27001-uk-fintech-fca-dora", date: "2026-04-01" },
  { slug: "iso-27001-uk-healthtech-nhs", date: "2026-03-31" },
  { slug: "iso-27001-ai-companies-iso-42001", date: "2026-03-30" },
  { slug: "iso-27001-legal-firms-sra", date: "2026-03-29" },
  { slug: "investor-asked-security-posture", date: "2026-03-28" },
  { slug: "cyber-insurance-premium-increased", date: "2026-03-27" },
  { slug: "iso-27001-vs-cyber-essentials-plus", date: "2026-03-26" },
  { slug: "vanta-drata-vs-real-consultancy", date: "2026-03-25" },
  { slug: "iso-27001-projects-over-budget", date: "2026-03-24" },
  { slug: "20-person-company-iso-27001", date: "2026-03-23" },
  { slug: "eu-ai-act-uk-companies", date: "2026-03-22" },
  { slug: "iso-42001-vs-eu-ai-act", date: "2026-03-21" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Listed here rather than picked up by getRoutedServices(): it is a hub
      // over the "supporting" services, not a service entry of its own.
      url: `${baseUrl}/services/additional-frameworks`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/who-we-help`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Sourced from services.ts rather than a local list. The previous hardcoded
  // Set still contained penetration-testing, so a withdrawn service would have
  // stayed in the sitemap and kept being submitted for indexing after its route
  // was deleted.
  const servicePages: MetadataRoute.Sitemap = getRoutedServices().map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPostSlugs.map(({ slug, date }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogCategoryPages: MetadataRoute.Sitemap = allCategories().map((c) => ({
    url: `${baseUrl}/blog/category/${categorySlug(c)}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...blogCategoryPages,
  ];
}
