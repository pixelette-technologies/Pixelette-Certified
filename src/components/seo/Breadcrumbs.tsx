import Link from "next/link";
import { ChevronRight } from "@/components/ui/icons";
import JsonLd from "./JsonLd";

export interface Crumb {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  /** Trail WITHOUT the leading Home item; Home is prepended automatically. The final item should omit href (current page). */
  items: Crumb[];
  /** Set true on dark surfaces (.footer, .panel) so the trail stays legible. */
  dark?: boolean;
  /** Emit BreadcrumbList JSON-LD. Set false on pages that already render BreadcrumbSchema so only one BreadcrumbList exists. */
  schema?: boolean;
}

/**
 * Single source of truth for breadcrumbs: renders the visible <nav> trail AND
 * an exactly-matching BreadcrumbList JSON-LD block, so visible and schema can
 * never drift. Always starts at Home and ends at the current page.
 *
 * The JSON-LD below is unchanged from the pre-redesign implementation and must
 * stay that way — only the visible nav is restyled.
 */
export default function Breadcrumbs({ items, dark = false, schema = true }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={dark ? "text-footer-link" : "text-soft"}>
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: trail.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              ...(item.href
                ? { item: `https://pixelettecertified.com${item.href}` }
                : {}),
            })),
          }}
        />
      )}
      <ol className="mono flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] tracking-[0.02em]">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={item.name + i} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={dark ? "hover:text-footer-heading" : "hover:text-brand"}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast ? (dark ? "text-footer-heading" : "text-ink") : undefined
                  }
                >
                  {item.name}
                </span>
              )}
              {!isLast && <ChevronRight size={11} className="opacity-50" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
