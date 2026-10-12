"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { markets, marketHref, type MarketSlug } from "@/data/markets";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Header instrument for the markets index.
 *
 * International is the field, not a fourth coastline. The United Kingdom,
 * the United States and the GCC sit inside that field as routes. A signal
 * travels the selected route. With motion reduced, the field stays still
 * and every route remains equally visible until one is chosen.
 */

const ORDER: MarketSlug[] = ["uk", "us", "gcc", "international"];

const LINES: Record<MarketSlug, string> = {
  uk: "Security, privacy, AI governance and assurance requirements that apply in the United Kingdom.",
  us: "SOC 2, enterprise assurance and AI governance under requirements that apply in the United States.",
  gcc: "Cyber, privacy and governance requirements in Saudi Arabia, Qatar and the UAE.",
  international:
    "Standards that apply across borders, with jurisdiction-specific work confirmed before an engagement is defined.",
};

const CX = 270;
const CY = 158;
const RING = 104;
const NODE_R = 70;
const CIRC = Math.round(2 * Math.PI * RING * 100) / 100;

const NODES: Record<Exclude<MarketSlug, "international">, { x: number; y: number }> = {
  uk: polar(0, NODE_R),
  us: polar(240, NODE_R),
  gcc: polar(120, NODE_R),
};

/** Straight down, toward the International label. */
const INTL = polar(180, NODE_R);

/** Short decimals so server and client SVG attributes match. */
function n(value: number) {
  return Math.round(value * 100) / 100;
}

function polar(degFromTop: number, r: number) {
  const a = ((degFromTop - 90) * Math.PI) / 180;
  return { x: n(CX + Math.cos(a) * r), y: n(CY + Math.sin(a) * r) };
}

function spoke(x: number, y: number) {
  const dx = x - CX;
  const dy = y - CY;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: n(CX + ux * 12),
    y1: n(CY + uy * 12),
    x2: n(x - ux * 14),
    y2: n(y - uy * 14),
  };
}

function marketBy(slug: MarketSlug) {
  return markets.find((market) => market.slug === slug) ?? markets[0];
}

export default function MarketsScope() {
  const uid = useId();
  const layer = useRef<SVGGElement>(null);
  const [reduce, setReduce] = useState(false);
  const [cycle, setCycle] = useState(3);
  const [hover, setHover] = useState<MarketSlug | null>(null);
  const [locked, setLocked] = useState<MarketSlug | null>(null);
  const [over, setOver] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduce || locked || hover || over) return;
    const id = window.setInterval(() => setCycle((n) => (n + 1) % ORDER.length), 5600);
    return () => window.clearInterval(id);
  }, [reduce, locked, hover, over]);

  const shown: MarketSlug | null = hover ?? locked ?? (reduce ? null : ORDER[cycle]);
  const market = shown ? marketBy(shown) : null;

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
    if (layer.current) layer.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function onPointerLeave() {
    setOver(false);
    setHover(null);
    if (layer.current) layer.current.style.transform = "translate3d(0, 0, 0)";
  }

  function onTabKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const current = shown ?? ORDER[0];
    const index = ORDER.indexOf(current);
    const next =
      event.key === "Home"
        ? ORDER[0]
        : event.key === "End"
          ? ORDER[ORDER.length - 1]
          : event.key === "ArrowDown" || event.key === "ArrowRight"
            ? ORDER[(index + 1) % ORDER.length]
            : ORDER[(index - 1 + ORDER.length) % ORDER.length];
    setHover(null);
    setLocked(next);
    document.getElementById(`${uid}-${next}`)?.focus();
  }

  function select(id: MarketSlug) {
    setLocked((current) => (current === id ? null : id));
  }

  function weight(id: Exclude<MarketSlug, "international">) {
    if (!shown || shown === "international") return shown === "international" ? 0.72 : 0.9;
    return shown === id ? 1 : 0.28;
  }

  const intlLine = spoke(INTL.x, INTL.y);
  const field = !shown ? 0.55 : shown === "international" ? 1 : 0.16;
  const ringOpacity = shown === "international" || !shown ? 0.95 : 0.32;

  return (
    <figure
      className="mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none"
      onPointerEnter={() => setOver(true)}
      onPointerLeave={onPointerLeave}
    >
      <style>{`
        @keyframes markets-spoke {
          to { stroke-dashoffset: -52; }
        }
        @keyframes markets-ring {
          to { stroke-dashoffset: calc(var(--markets-circ) * -1); }
        }
        .markets-spoke {
          stroke-dasharray: 8 44;
          animation: markets-spoke 1.8s linear infinite;
        }
        .markets-ring {
          animation: markets-ring 16s linear infinite;
        }
      `}</style>

      <figcaption className="sr-only">
        International scope, with the United Kingdom, the United States and the GCC as routes inside
        it. Choose a route to trace it.
      </figcaption>

      <div
        className="relative"
        role="group"
        aria-label="Market routes"
        onPointerMove={onPointerMove}
        onKeyDown={onTabKey}
      >
        <svg viewBox="0 0 540 332" className="h-auto w-full text-brand" aria-hidden="true">
          <g ref={layer} style={{ transition: reduce ? "none" : "transform 180ms linear" }}>
            <circle
              cx={CX}
              cy={CY}
              r={RING}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHover("international")}
              onClick={() => select("international")}
            />

            <g style={{ pointerEvents: "none" }}>
              <circle
                cx={CX}
                cy={CY}
                r={RING - 1}
                fill="var(--color-brand-tint)"
                opacity={field}
                style={{ transition: "opacity 280ms linear" }}
              />

              <g fill="none" stroke="currentColor" opacity="0.35">
                {Array.from({ length: 24 }, (_, i) => {
                  const major = i % 6 === 0;
                  const a = ((i * 15 - 90) * Math.PI) / 180;
                  const inner = RING - (major ? 11 : 6);
                  return (
                    <line
                      key={i}
                      x1={n(CX + Math.cos(a) * inner)}
                      y1={n(CY + Math.sin(a) * inner)}
                      x2={n(CX + Math.cos(a) * (RING - 1))}
                      y2={n(CY + Math.sin(a) * (RING - 1))}
                      strokeWidth={major ? 1.15 : 0.75}
                    />
                  );
                })}
              </g>

              <circle cx={CX} cy={CY} r={34} fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.22" />
              <circle
                cx={CX}
                cy={CY}
                r={RING}
                fill="none"
                stroke="currentColor"
                strokeWidth={shown === "international" ? 1.5 : 1.05}
                opacity={ringOpacity}
                style={{ transition: "opacity 280ms linear" }}
              />

              {shown === "international" && !reduce && (
                <circle
                  className="markets-ring"
                  cx={CX}
                  cy={CY}
                  r={RING}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: `22 ${CIRC - 22}`,
                    ["--markets-circ" as string]: String(CIRC),
                  }}
                />
              )}

              {(Object.keys(NODES) as (keyof typeof NODES)[]).map((id) => {
                const node = NODES[id];
                const line = spoke(node.x, node.y);
                const active = shown === id;
                return (
                  <g key={id} opacity={weight(id)} style={{ transition: "opacity 280ms linear" }}>
                    <line
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="currentColor"
                      strokeWidth={active ? 1.5 : 1}
                      strokeLinecap="round"
                    />
                    {active && !reduce && (
                      <line
                        className="markets-spoke"
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={13}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity={active ? 0.9 : 0}
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={6}
                      fill={active ? "var(--color-brand-tint)" : "var(--color-page)"}
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </g>
                );
              })}

              <g
                opacity={!shown ? 0.9 : shown === "international" ? 1 : 0.28}
                style={{ transition: "opacity 280ms linear" }}
              >
                <line
                  x1={intlLine.x1}
                  y1={intlLine.y1}
                  x2={intlLine.x2}
                  y2={intlLine.y2}
                  stroke="currentColor"
                  strokeWidth={shown === "international" ? 1.5 : 1}
                  strokeLinecap="round"
                />
                {shown === "international" && !reduce && (
                  <line
                    className="markets-spoke"
                    x1={intlLine.x1}
                    y1={intlLine.y1}
                    x2={intlLine.x2}
                    y2={intlLine.y2}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                )}
                <circle
                  cx={INTL.x}
                  cy={INTL.y}
                  r={13}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity={shown === "international" ? 0.9 : 0}
                />
                <circle
                  cx={INTL.x}
                  cy={INTL.y}
                  r={6}
                  fill={shown === "international" ? "var(--color-brand-tint)" : "var(--color-page)"}
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </g>

              <circle cx={CX} cy={CY} r="3.5" fill="currentColor" />
            </g>

            <circle
              cx={INTL.x}
              cy={INTL.y}
              r={20}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHover("international")}
              onClick={() => select("international")}
            />

            {(Object.keys(NODES) as (keyof typeof NODES)[]).map((id) => {
              const node = NODES[id];
              return (
                <circle
                  key={id}
                  cx={node.x}
                  cy={node.y}
                  r={20}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHover(id)}
                  onMouseLeave={() => setHover("international")}
                  onClick={() => select(id)}
                />
              );
            })}
          </g>
        </svg>

        {(
          [
            ["uk", "left-1/2 top-[4%] -translate-x-1/2"],
            ["us", "left-[28%] top-[54%] -translate-x-full"],
            ["gcc", "left-[72%] top-[54%]"],
            ["international", "left-1/2 top-[82%] -translate-x-1/2"],
          ] as const
        ).map(([id, place]) => {
          const active = shown === id;
          const quiet = shown && shown !== id && !(shown === "international" && id !== "international");
          return (
            <button
              key={id}
              id={`${uid}-${id}`}
              type="button"
              aria-pressed={active}
              className={cn(
                "absolute min-h-11 whitespace-nowrap px-1 text-[13px] font-medium text-brand transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                place,
                quiet ? "opacity-40" : shown === "international" && id !== "international" ? "opacity-70" : "opacity-100"
              )}
              onMouseEnter={() => setHover(id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(id)}
              onBlur={() => setHover(null)}
              onClick={() => select(id)}
            >
              {marketBy(id).name}
            </button>
          );
        })}
      </div>

      <p
        className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-ink"
        aria-live={hover || locked ? "polite" : "off"}
      >
        {market ? LINES[market.slug] : "The ring is international scope. The three marks are routes where requirements differ."}
      </p>
      <p className="small mt-2 max-w-[48ch]">
        These are routes through the site, not offices, and not a limit on where support is available.
      </p>
      {market && (
        <Link href={marketHref(market)} className="flink mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-hover">
          {market.exploreLabel} <ArrowRight size={14} />
        </Link>
      )}
    </figure>
  );
}
