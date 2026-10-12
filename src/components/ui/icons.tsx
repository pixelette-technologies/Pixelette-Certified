import { cn } from "@/lib/utils";

/**
 * Thin-stroke icon set traced from the inline SVGs in
 * docs/Pixelette_Web_Patterns.html. Sizes 11–20px, stroke-width 1.5–1.8,
 * currentColor throughout so they inherit from the surrounding text.
 *
 * lucide-react remains a dependency for the service and industry glyphs it
 * covers, but every use must pin strokeWidth={1.6} at h-4/h-5 — never lucide's
 * default strokeWidth of 2 at h-6/h-7, which reads far too heavy in this system.
 */

export interface IconProps {
  /** px; defaults differ per icon to match the guide's own usage */
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 17 17",
    fill: "none",
    "aria-hidden": true as const,
    focusable: "false" as const,
    className: cn("inline-block shrink-0", className),
  };
}

export const ArrowRight = ({ size = 16, strokeWidth = 1.7, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path
      d="M3 8.5h10M9 4.5l4 4-4 4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowLeft = ({ size = 16, strokeWidth = 1.7, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path
      d="M14 8.5H4M8 4.5l-4 4 4 4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** External / outbound link marker, as used on the guide's dark CTA buttons. */
export const ArrowUpRight = ({ size = 15, strokeWidth = 1.7, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path
      d="M5 12L12 5M6 5h6v6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** The guide's tick: viewBox 0 0 15 15, stroke-width 1.8. */
export const Check = ({ size = 14, strokeWidth = 1.8, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 15 15">
    <path
      d="M3 8l3 3 6-7"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDown = ({ size = 16, strokeWidth = 1.6, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path
      d="M3.5 6l5 5 5-5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRight = ({ size = 13, strokeWidth = 1.6, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path
      d="M6 3.5l5 5-5 5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Plus = ({ size = 17, strokeWidth = 1.6, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M8.5 4v9M4 8.5h9" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const Minus = ({ size = 17, strokeWidth = 1.6, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M4 8.5h9" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const Close = ({ size = 18, strokeWidth = 1.6, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M4 4l9 9M13 4l-9 9" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const Menu = ({ size = 20, strokeWidth = 1.6, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M2.5 5.5h12M2.5 11.5h12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

/**
 * The guide's decorative quote glyph. Filled, not stroked, and deliberately
 * pale — it sits behind the quote rather than competing with it.
 */
export const QuoteGlyph = ({ className }: { className?: string }) => (
  <svg
    width="26"
    height="20"
    viewBox="0 0 26 20"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={cn("inline-block shrink-0", className)}
  >
    <path
      d="M10 0C4.5 2.5 1 7 1 13c0 4 2.5 7 6 7s6-2.7 6-6.2c0-3.3-2.3-5.8-5.4-5.8-.6 0-1.2.1-1.6.2C6.8 5.6 8.2 3.4 10 2V0z"
      fill="currentColor"
    />
    <path
      d="M23 0c-5.5 2.5-9 7-9 13 0 4 2.5 7 6 7s6-2.7 6-6.2c0-3.3-2.3-5.8-5.4-5.8-.6 0-1.2.1-1.6.2 .8-2.6 2.2-4.8 4-6.2V0z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Star, drawn thin-stroke to sit in this system. The guide has no star pattern;
 * ratings are content (a trust signal) so they are kept, restyled.
 */
export const Star = ({ size = 14, strokeWidth = 1.5, className }: IconProps) => (
  <svg {...base(size, className)} viewBox="0 0 16 16">
    <path
      d="M8 1.5l1.9 4 4.3.6-3.1 3 .8 4.3L8 11.4 4.1 13.4l.8-4.3-3.1-3 4.3-.6L8 1.5z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      fill="currentColor"
    />
  </svg>
);
