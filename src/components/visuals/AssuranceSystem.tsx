"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hero diagram. Three external requirements pass through controls, governance
 * and evidence, and resolve as assurance. SVG only: no WebGL, no raster.
 *
 * With motion reduced, every route stays equally visible and nothing cycles.
 * The diagram still reads as a static structure.
 */

const ROUTES = [
  { id: "customers", label: "Customers" },
  { id: "regulators", label: "Regulators" },
  { id: "partners", label: "Partners" },
] as const;

type RouteId = (typeof ROUTES)[number]["id"];

function diamond(cx: number, cy: number, hw = 72, hh = 18) {
  return `M ${cx} ${cy - hh} L ${cx + hw} ${cy} L ${cx} ${cy + hh} L ${cx - hw} ${cy} Z`;
}

export default function AssuranceSystem() {
  const reduce = useReducedMotion();
  const layer = useRef<SVGGElement>(null);
  const [hover, setHover] = useState<RouteId | null>(null);
  const [locked, setLocked] = useState<RouteId | null>(null);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce || locked || hover) return;
    const id = window.setInterval(() => setCycle((n) => (n + 1) % ROUTES.length), 4600);
    return () => window.clearInterval(id);
  }, [reduce, locked, hover]);

  const shown: RouteId | null = hover ?? locked ?? (reduce ? null : ROUTES[cycle].id);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 7;
    if (layer.current) layer.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function onPointerLeave() {
    setHover(null);
    if (layer.current) layer.current.style.transform = "translate3d(0, 0, 0)";
  }

  function opacityFor(id: RouteId) {
    if (!shown) return 0.9;
    return shown === id ? 1 : 0.16;
  }

  function widthFor(id: RouteId) {
    return shown === id ? 1.7 : 1.05;
  }

  return (
    <figure className="w-full">
      <figcaption className="sr-only">
        Customers, regulators and partners connect through controls, governance and evidence to
        assurance. Choose a requirement to trace its route.
      </figcaption>

      <div
        className="grid items-center gap-4 sm:grid-cols-[7.5rem_minmax(0,1fr)_5.5rem] sm:gap-3"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div role="group" aria-label="Requirements" className="flex flex-row justify-between gap-2 sm:flex-col sm:justify-center sm:gap-10">
          {ROUTES.map((route) => {
            const active = shown === route.id;
            return (
              <button
                key={route.id}
                type="button"
                aria-pressed={active}
                className="min-h-11 rounded-[4px] px-2 text-left text-[14px] font-medium text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                onMouseEnter={() => setHover(route.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(route.id)}
                onBlur={() => setHover(null)}
                onClick={() => setLocked((current) => (current === route.id ? null : route.id))}
              >
                <span
                  className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-brand align-middle"
                  style={{ opacity: active || !shown ? 1 : 0.35 }}
                  aria-hidden="true"
                />
                {route.label}
              </button>
            );
          })}
        </div>

        <svg viewBox="0 0 420 300" className="h-auto w-full text-brand" role="img" aria-hidden="true">
          <g ref={layer} style={{ transition: reduce ? "none" : "transform 180ms linear" }}>
            <g fill="var(--color-brand-tint)" stroke="currentColor" strokeWidth="1" opacity="0.95">
              <path d={diamond(200, 56)} />
              <path d={diamond(214, 150)} />
              <path d={diamond(200, 244)} />
            </g>

            <g fill="currentColor" fontFamily="var(--font-ui)" fontSize="11" textAnchor="middle">
              <text x="200" y="60">Controls</text>
              <text x="214" y="154">Governance</text>
              <text x="200" y="248">Evidence</text>
            </g>

            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <g stroke="currentColor" opacity={opacityFor("customers")} strokeWidth={widthFor("customers")}>
                <path d="M0 56 H128" />
                <path d="M272 56 C318 56 330 210 272 244" />
                <path d="M272 244 C330 244 370 168 420 150" />
              </g>
              <g stroke="currentColor" opacity={opacityFor("regulators")} strokeWidth={widthFor("regulators")}>
                <path d="M0 150 H144" />
                <path d="M284 150 C330 150 318 230 272 244" />
                <path d="M272 244 C340 244 380 160 420 150" />
              </g>
              <g stroke="currentColor" opacity={opacityFor("partners")} strokeWidth={widthFor("partners")}>
                <path d="M0 244 H128" />
                <path d="M272 244 C330 220 370 168 420 150" />
              </g>
            </g>

            <circle cx="420" cy="150" r="3.5" fill="currentColor" />
          </g>
        </svg>

        <p className="text-[14px] font-medium text-ink sm:text-right">Assurance</p>
      </div>
    </figure>
  );
}
