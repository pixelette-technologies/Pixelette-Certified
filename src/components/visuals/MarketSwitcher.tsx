"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/icons";

/**
 * One market at a time. The drawing marks only the United Kingdom, the United
 * States and the Gulf, and lets the unselected regions recede.
 */

const MARKETS = [
  {
    id: "uk",
    label: "United Kingdom",
    href: "/markets/united-kingdom",
    paragraph:
      "Support for UK organisations meeting security, privacy, AI governance and assurance requirements set by customers, public sector buyers and regulators.",
    items: [
      "ISO 27001",
      "AI governance",
      "Cyber Essentials readiness",
      "Privacy",
      "vCISO & GRC",
      "Customer and procurement assurance",
    ],
  },
  {
    id: "us",
    label: "United States",
    href: "/markets/united-states",
    paragraph:
      "Support for US organisations preparing for SOC 2, meeting enterprise security expectations and governing AI and personal data.",
    items: [
      "SOC 2 readiness",
      "ISO 27001",
      "NIST-aligned governance",
      "AI governance",
      "US privacy",
      "vCISO & GRC",
    ],
  },
  {
    id: "gcc",
    label: "GCC",
    href: "/markets/gcc",
    paragraph:
      "Support for organisations meeting cyber security, privacy and governance requirements set by regulators in Saudi Arabia, Qatar and the UAE.",
    items: ["Saudi NCA / SAMA", "Qatar NIA / QCB", "UAE regulatory alignment", "ISO 27001", "Privacy", "GRC"],
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
        <div role="tablist" aria-label="Where we work" className="flex flex-wrap gap-x-1 border-b border-line" onKeyDown={onTabKey}>
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
            Explore the market <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <RegionField active={current} />
    </div>
  );
}

function RegionField({ active }: { active: MarketId }) {
  function tone(id: MarketId) {
    return active === id ? 1 : 0.16;
  }

  return (
    <svg viewBox="0 0 320 220" className="mx-auto h-auto w-full max-w-[280px] text-brand" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.15">
        <path
          d="M28 48 L118 36 L146 78 L132 128 L78 146 L34 118 Z"
          opacity={tone("us")}
          fill={active === "us" ? "var(--color-brand-tint)" : "none"}
        />
        <path
          d="M168 34 L196 28 L204 62 L176 74 Z"
          opacity={tone("uk")}
          fill={active === "uk" ? "var(--color-brand-tint)" : "none"}
        />
        <path
          d="M214 108 L286 96 L304 132 L268 168 L220 150 Z"
          opacity={tone("gcc")}
          fill={active === "gcc" ? "var(--color-brand-tint)" : "none"}
        />
        <path d="M146 90 C160 96 164 40 176 52" opacity="0.35" />
        <path d="M196 70 C210 96 200 110 230 124" opacity="0.35" />
      </g>
      <g fill="currentColor" fontFamily="var(--font-ui)" fontSize="11">
        <text x="48" y="168" opacity={tone("us")}>United States</text>
        <text x="158" y="92" opacity={tone("uk")}>UK</text>
        <text x="228" y="188" opacity={tone("gcc")}>GCC</text>
      </g>
    </svg>
  );
}
