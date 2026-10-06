"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero field. The requirements orbit as original marks. Official scheme
 * artwork is not used: ISO, AICPA, NCSC and PCI SSC control those logos, and
 * displaying them would imply a licence the firm does not hold. Assurance is
 * awarded independently.
 *
 * The orbit pauses while a mark is hovered or focused. It does not run for
 * reduced motion, or on a device without hover, so the marks stay easy to tap.
 * Decorative rings keep moving in those cases only when motion is allowed.
 */

const RADIUS = 38;

/**
 * Named standards the firm prepares organisations for, taken from the services
 * catalogue and the expertise page. Practitioner credentials are not included:
 * those belong to individuals. Laws and regulatory frameworks that are not
 * certificates, such as UK GDPR, NIST CSF and the GCC controls, are not drawn
 * as marks.
 */
const MARKS = [
  {
    id: "iso-27001",
    href: "/services/iso-27001",
    kicker: "ISO",
    title: "27001",
    label: "ISO 27001",
    line: "Information security",
  },
  {
    id: "iso-42001",
    href: "/services/iso-42001",
    kicker: "ISO",
    title: "42001",
    label: "ISO 42001",
    line: "AI governance",
  },
  {
    id: "soc-2",
    href: "/services/soc-2",
    kicker: "SOC",
    title: "2",
    label: "SOC 2",
    line: "Readiness",
  },
  {
    id: "pci-dss",
    href: "/contact",
    kicker: "PCI",
    title: "DSS",
    label: "PCI DSS",
    line: "Payment card readiness",
  },
  {
    id: "iso-27701",
    href: "/services/privacy",
    kicker: "ISO",
    title: "27701",
    label: "ISO 27701",
    line: "Privacy management",
  },
  {
    id: "iso-22301",
    href: "/services/iso-22301",
    kicker: "ISO",
    title: "22301",
    label: "ISO 22301",
    line: "Business continuity",
  },
  {
    id: "cyber-essentials",
    href: "/services/cyber-essentials",
    kicker: "Cyber",
    title: "CE",
    label: "Cyber Essentials",
    line: "UK scheme",
  },
  {
    id: "cyber-essentials-plus",
    href: "/services/cyber-essentials",
    kicker: "Cyber",
    title: "CE+",
    label: "Cyber Essentials Plus",
    line: "Technical verification",
  },
] as const;

type MarkId = (typeof MARKS)[number]["id"];

const logoClass = "h-8 w-8 text-brand sm:h-9 sm:w-9 lg:h-10 lg:w-10";

/** Original marks. Not the official scheme logos. */
function MarkLogo({ id }: { id: MarkId }) {
  switch (id) {
    case "iso-27001":
      return (
        <svg viewBox="0 0 32 32" className={logoClass} aria-hidden="true">
          <path fill="currentColor" d="M16 3.2 27.2 8v7.6c0 6.4-4.6 11-11.2 13.4C9.4 26.6 4.8 22 4.8 15.6V8L16 3.2Z" />
        </svg>
      );
    case "iso-42001":
      return (
        <svg viewBox="0 0 32 32" className={logoClass} aria-hidden="true">
          <circle cx="16" cy="16" r="3.2" fill="currentColor" />
          <circle cx="16" cy="6.2" r="2.3" fill="currentColor" />
          <circle cx="25.2" cy="19.4" r="2.3" fill="currentColor" />
          <circle cx="6.8" cy="19.4" r="2.3" fill="currentColor" />
          <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M16 8.5V12.8M18.6 17.4l4.2 1.4M13.4 17.4 9.2 18.8" />
        </svg>
      );
    case "soc-2":
      return (
        <svg viewBox="0 0 32 32" className={logoClass} aria-hidden="true">
          <path fill="currentColor" d="M8 4.5h11.2L24 9.2V27.5H8V4.5Z" />
          <path fill="var(--color-page)" d="M19.2 4.5V9.2H24" />
        </svg>
      );
    case "pci-dss":
      return (
        <svg viewBox="0 0 32 32" className={logoClass} aria-hidden="true">
          <rect x="3.5" y="8" width="25" height="16" rx="2.5" fill="currentColor" />
          <rect x="7" y="13" width="6" height="4.5" rx="0.8" fill="var(--color-page)" />
        </svg>
      );
    case "iso-27701":
      return (
        <svg viewBox="0 0 32 32" className={logoClass} aria-hidden="true">
          <rect x="8" y="14" width="16" height="12" rx="2" fill="currentColor" />
          <path fill="none" stroke="currentColor" strokeWidth="2.4" d="M11.5 14V11a4.5 4.5 0 0 1 9 0v3" />
        </svg>
      );
    case "iso-22301":
      return (
        <svg viewBox="0 0 32 32" className={logoClass} aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 4.5a11.5 11.5 0 0 1 9.8 17.5l-2.6-1.5A8.7 8.7 0 0 0 16 7.3V4.5Zm0 23a11.5 11.5 0 0 1-9.8-17.5l2.6 1.5A8.7 8.7 0 0 0 16 24.7v2.8Z"
          />
          <path fill="currentColor" d="m25.2 15.2 3.3 5.2-5.8.6 2.5-5.8Zm-18.4 1.6L3.5 11.6l5.8-.6-2.5 5.8Z" />
        </svg>
      );
    case "cyber-essentials":
      return (
        <svg viewBox="0 0 32 32" className={logoClass} aria-hidden="true">
          <circle cx="16" cy="6.5" r="2.4" fill="currentColor" />
          <circle cx="25.2" cy="13.2" r="2.4" fill="currentColor" />
          <circle cx="21.6" cy="24.2" r="2.4" fill="currentColor" />
          <circle cx="10.4" cy="24.2" r="2.4" fill="currentColor" />
          <circle cx="6.8" cy="13.2" r="2.4" fill="currentColor" />
        </svg>
      );
    case "cyber-essentials-plus":
      return (
        <svg viewBox="0 0 32 32" className={logoClass} aria-hidden="true">
          <circle cx="16" cy="16" r="11" fill="currentColor" />
          <path fill="var(--color-page)" d="M14.2 8.5h3.6V14.2H23.5v3.6H17.8V23.5h-3.6V17.8H8.5v-3.6h5.7V8.5Z" />
        </svg>
      );
  }
}

const CENTRE = 50;

function place(index: number) {
  const angle = (index / MARKS.length) * Math.PI * 2 - Math.PI / 2;
  return {
    left: CENTRE + Math.cos(angle) * RADIUS,
    top: CENTRE + Math.sin(angle) * RADIUS,
  };
}

const MOTION_CSS = `
.assurance-orbit { animation: assurance-spin 42s linear infinite; transform-origin: 50% 50%; }
.assurance-face { animation: assurance-spin-rev 42s linear infinite; }
.assurance-ring { animation: assurance-spin 96s linear infinite; transform-origin: 50% 50%; }
.assurance-beacon { animation: assurance-spin-rev 28s linear infinite; transform-origin: 50% 50%; }
@keyframes assurance-spin { to { transform: rotate(360deg); } }
@keyframes assurance-spin-rev { to { transform: rotate(-360deg); } }
.assurance-field:has(a:hover) .assurance-orbit,
.assurance-field:has(a:focus-visible) .assurance-orbit,
.assurance-field:has(a:hover) .assurance-face,
.assurance-field:has(a:focus-visible) .assurance-face { animation-play-state: paused; }
@media (hover: none) {
  .assurance-orbit, .assurance-face { animation: none; }
}
@media (prefers-reduced-motion: reduce) {
  .assurance-orbit, .assurance-face, .assurance-ring, .assurance-beacon { animation: none; }
}
`;

export default function AssuranceSystem() {
  const [activeId, setActiveId] = useState<MarkId | null>(null);
  const active = MARKS.find((mark) => mark.id === activeId) ?? null;

  return (
    <figure
      className="assurance-field w-full"
      onMouseLeave={() => setActiveId(null)}
    >
      <style>{MOTION_CSS}</style>
      <figcaption className="sr-only">
        Requirements Pixelette Certified helps organisations prepare for: ISO 27001, ISO 42001,
        SOC 2, PCI DSS, ISO 27701, ISO 22301, Cyber Essentials and Cyber Essentials Plus. Each
        mark opens the relevant service. Independent certification bodies, licensed firms and
        authorised assessors award the assurance.
      </figcaption>

      <div className="relative mx-auto aspect-square w-full">
        <div
          className="pointer-events-none absolute inset-[2%] rounded-full bg-[radial-gradient(circle_at_50%_42%,var(--color-brand-tint),transparent_70%)]"
          aria-hidden="true"
        />

        <svg
          className="assurance-ring pointer-events-none absolute inset-0 h-full w-full text-brand"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.22"
            strokeDasharray="0.55 1.7"
            opacity="0.4"
          />
        </svg>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-brand"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="0.22" opacity="0.22" />
        </svg>

        <div className="assurance-beacon pointer-events-none absolute inset-[3%]" aria-hidden="true">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-signal" />
        </div>

        <div className="assurance-orbit absolute inset-0">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full text-brand"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            {MARKS.map((mark, index) => {
              const point = place(index);
              const on = active?.id === mark.id;
              return (
                <line
                  key={mark.id}
                  x1="50"
                  y1="50"
                  x2={point.left}
                  y2={point.top}
                  stroke="currentColor"
                  strokeWidth={on ? 0.42 : 0.2}
                  style={{
                    opacity: active == null ? 0.28 : on ? 0.95 : 0.08,
                    transition: "opacity 240ms ease",
                  }}
                />
              );
            })}
          </svg>

          {MARKS.map((mark, index) => {
            const point = place(index);
            const on = active?.id === mark.id;
            return (
              <div
                key={mark.id}
                className={cn(
                  "absolute transition-opacity duration-300",
                  active && !on && "opacity-30"
                )}
                style={{
                  left: `${point.left}%`,
                  top: `${point.top}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: on ? 2 : 1,
                }}
              >
                <div className="assurance-face">
                  <Link
                    href={mark.href}
                    aria-label={`${mark.label}, ${mark.line}`}
                    className={cn(
                      "relative grid h-16 w-16 place-items-center rounded-full border border-line-strong bg-page text-center shadow-card transition-[transform,border-color,background-color,box-shadow] duration-200 sm:h-[4.75rem] sm:w-[4.75rem] lg:h-[5.5rem] lg:w-[5.5rem]",
                      "hover:border-brand hover:bg-brand-tint",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
                      on && "scale-105 border-brand bg-brand-tint shadow-[0_0_0_3px_var(--color-brand-signal)]"
                    )}
                    onMouseEnter={() => setActiveId(mark.id)}
                    onFocus={() => setActiveId(mark.id)}
                    onBlur={() => setActiveId(null)}
                  >
                    <span
                      className="pointer-events-none absolute inset-[5px] rounded-full border border-brand/20 sm:inset-[7px]"
                      aria-hidden="true"
                    />
                    <MarkLogo id={mark.id} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line-strong bg-page px-2 text-center shadow-card sm:w-[28%]"
        >
          <p className="max-w-[12ch] text-balance font-mono text-[8px] uppercase tracking-[0.14em] text-brand sm:text-[10px]">
            {active ? active.label : "Assurance"}
          </p>
          <p className="mt-1 max-w-[12ch] text-balance font-serif text-xs leading-tight text-ink sm:text-base lg:text-lg">
            {active ? active.line : "Requirements"}
          </p>
        </div>
      </div>

      <p className="mx-auto mt-5 max-w-[38ch] text-center text-sm leading-relaxed text-muted">
        Select a requirement. Assurance is awarded independently.
      </p>
    </figure>
  );
}
