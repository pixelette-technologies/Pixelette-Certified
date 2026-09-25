import type { Insight, InsightCategory } from "./types";
import { INSIGHT_CATEGORIES } from "./types";

import securityQuestionnaire from "./articles/iso-27001-security-questionnaire";
import fastTrack from "./articles/iso-27001-fast-track-what-changes";
import customerAiGovernance from "./articles/customer-asked-ai-governance";
import iso27001OrSoc2 from "./articles/iso-27001-or-soc-2-uk-saas";
import questionnaireWithout from "./articles/enterprise-security-questionnaire-without-iso-27001";
import fintech from "./articles/iso-27001-uk-fintech-fca-dora";
import healthtech from "./articles/iso-27001-uk-healthtech-nhs";
import aiCompanies from "./articles/iso-27001-ai-companies-iso-42001";
import legal from "./articles/iso-27001-legal-firms-sra";
import investor from "./articles/investor-asked-security-posture";
import insurance from "./articles/cyber-insurance-premium-increased";
import cyberEssentials from "./articles/iso-27001-vs-cyber-essentials-plus";
import automation from "./articles/compliance-automation-platforms-and-consultancy";
import scoping from "./articles/iso-27001-projects-over-budget";
import smallCompany from "./articles/20-person-company-iso-27001";
import euAiAct from "./articles/eu-ai-act-uk-companies";
import iso42001VsAct from "./articles/iso-42001-vs-eu-ai-act";
import gcc from "./articles/gcc-cyber-regulation-saudi-arabia-qatar";

export type { Insight, InsightCategory, InsightBlock, InsightSource } from "./types";
export { INSIGHT_CATEGORIES } from "./types";

/** Every published article, newest first. */
export const insights: Insight[] = [
  securityQuestionnaire,
  fastTrack,
  customerAiGovernance,
  iso27001OrSoc2,
  questionnaireWithout,
  fintech,
  healthtech,
  aiCompanies,
  legal,
  investor,
  insurance,
  cyberEssentials,
  automation,
  scoping,
  smallCompany,
  euAiAct,
  iso42001VsAct,
  gcc,
].sort((a, b) => b.published.localeCompare(a.published));

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getRelatedInsights(insight: Insight): Insight[] {
  return insight.related
    .map((slug) => getInsight(slug))
    .filter((i): i is Insight => Boolean(i))
    .slice(0, 3);
}

/** "Cyber and GRC" -> "cyber-and-grc". */
export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Categories that currently hold at least one article, in the specification's order (§32). */
export function activeCategories(): InsightCategory[] {
  return INSIGHT_CATEGORIES.filter((c) => insights.some((i) => i.category === c));
}

export function insightsByCategorySlug(
  slug: string
): { category: InsightCategory; items: Insight[] } | undefined {
  const category = INSIGHT_CATEGORIES.find((c) => categorySlug(c) === slug);
  if (!category) return undefined;
  const items = insights.filter((i) => i.category === category);
  return items.length > 0 ? { category, items } : undefined;
}

export function formatInsightDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
