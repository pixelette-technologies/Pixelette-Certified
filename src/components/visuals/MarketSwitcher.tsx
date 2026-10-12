"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/icons";

/**
 * One route at a time. Selecting a region highlights it. International shows
 * the wider drawing at an even tone, without pins and without implying that
 * unmarked places are out of scope.
 */

const MARKETS = [
  {
    id: "uk",
    label: "United Kingdom",
    href: "/markets/united-kingdom",
    cta: "Explore UK requirements",
    paragraph:
      "Support for organisations meeting security, privacy, AI governance and assurance requirements that apply in the United Kingdom.",
    items: [
      "ISO 27001",
      "AI governance and ISO 42001",
      "Cyber Essentials readiness",
      "Privacy and data governance",
      "vCISO and GRC",
      "Customer and procurement assurance",
    ],
  },
  {
    id: "us",
    label: "United States",
    href: "/markets/united-states",
    cta: "Explore US requirements",
    paragraph:
      "Support for organisations preparing for SOC 2, meeting enterprise security expectations and governing AI and personal data under US requirements.",
    items: [
      "SOC 2 readiness",
      "ISO 27001",
      "NIST-aligned cyber governance",
      "AI governance",
      "US privacy",
      "vCISO and GRC",
    ],
  },
  {
    id: "gcc",
    label: "GCC",
    href: "/markets/gcc",
    cta: "Explore GCC requirements",
    paragraph:
      "Support for cyber, compliance and regulatory requirements in Saudi Arabia, Qatar and the UAE. The requirements differ by country.",
    items: ["Saudi Arabia: NCA, SAMA, privacy", "Qatar: NIA, QCB, privacy", "UAE: applicable requirements", "ISO", "AI governance", "Cyber and GRC"],
  },
  {
    id: "international",
    label: "International",
    href: "/markets/international",
    cta: "Explore international requirements",
    paragraph:
      "Support for organisations internationally. Many standards are international in scope. Jurisdiction-specific requirements are confirmed before an engagement is defined.",
    items: [
      "ISO 27001",
      "ISO 42001 and AI governance",
      "ISO 22301",
      "ISO 27701",
      "vCISO and GRC",
      "SOC 2 readiness",
    ],
  },
] as const;

type MarketId = (typeof MARKETS)[number]["id"];

export default function MarketSwitcher() {
  const uid = useId();
  const [current, setCurrent] = useState<MarketId>("uk");
  const market = MARKETS.find((item) => item.id === current) ?? MARKETS[0];

  function onTabKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = MARKETS.findIndex((item) => item.id === current);
    const next =
      event.key === "Home"
        ? MARKETS[0].id
        : event.key === "End"
          ? MARKETS[MARKETS.length - 1].id
          : event.key === "ArrowRight"
            ? MARKETS[(index + 1) % MARKETS.length].id
            : MARKETS[(index - 1 + MARKETS.length) % MARKETS.length].id;
    setCurrent(next);
    document.getElementById(`${uid}-${next}`)?.focus();
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] lg:gap-16">
      <div>
        <div role="tablist" aria-label="Markets" className="flex flex-wrap gap-x-1 border-b border-line" onKeyDown={onTabKey}>
          {MARKETS.map((item) => {
            const selected = item.id === current;
            return (
              <button
                key={item.id}
                id={`${uid}-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "min-h-11 px-3 text-[15px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  selected ? "border-b-2 border-brand font-medium text-ink" : "text-muted hover:text-ink"
                )}
                onClick={() => setCurrent(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-${market.id}`} className="pt-8">
          <ul className="grid list-none gap-x-8 gap-y-2 sm:grid-cols-2">
            {market.items.map((item) => (
              <li key={item} className="border-t border-line py-2.5 text-[15px] text-ink">
                {item}
              </li>
            ))}
          </ul>
          <p className="body mt-6 max-w-[58ch]">{market.paragraph}</p>
          <Link href={market.href} className="flink mt-6 text-sm font-medium text-brand hover:text-brand-hover">
            {market.cta} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <RegionField active={current} />
    </div>
  );
}

function RegionField({ active }: { active: MarketId }) {
  const open = active === "international";

  function tone(id: Exclude<MarketId, "international">) {
    if (open) return 0.38;
    return active === id ? 1 : 0.2;
  }

  function fill(id: Exclude<MarketId, "international">) {
    if (open || active !== id) return "none";
    return "var(--color-brand-tint)";
  }

  return (
    <svg viewBox="0 0 320 220" className="mx-auto h-auto w-full max-w-[280px] text-brand" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.7" opacity={open ? 0.45 : 0.22}>
        <path d="M8 36 C 80 28, 160 44, 312 32" />
        <path d="M8 78 C 90 66, 180 90, 312 72" />
        <path d="M8 120 C 100 108, 200 132, 312 114" />
        <path d="M8 162 C 90 176, 190 150, 312 168" />
        <path d="M64 12 C 52 70, 76 150, 48 208" />
        <path d="M160 10 C 172 80, 148 150, 168 210" />
        <path d="M248 12 C 236 78, 260 148, 236 208" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1.15">
        <path d="M28 48 L118 36 L146 78 L132 128 L78 146 L34 118 Z" opacity={tone("us")} fill={fill("us")} />
        <path d="M168 34 L196 28 L204 62 L176 74 Z" opacity={tone("uk")} fill={fill("uk")} />
        <path d="M214 108 L286 96 L304 132 L268 168 L220 150 Z" opacity={tone("gcc")} fill={fill("gcc")} />
      </g>
      <g fill="currentColor" fontFamily="var(--font-ui)" fontSize="11">
        {open ? (
          <text x="160" y="112" textAnchor="middle">
            International
          </text>
        ) : (
          <>
            <text x="48" y="168" opacity={tone("us")}>
              United States
            </text>
            <text x="158" y="92" opacity={tone("uk")}>
              UK
            </text>
            <text x="228" y="188" opacity={tone("gcc")}>
              GCC
            </text>
          </>
        )}
      </g>
    </svg>
  );
}
