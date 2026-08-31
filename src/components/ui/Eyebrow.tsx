import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  /** brand = #056F62 (default) · muted = #62707F · dark = on .panel / .footer */
  tone?: "brand" | "muted" | "dark";
  as?: "span" | "div" | "p";
}

/**
 * The guide's section label: IBM Plex Mono 11px, .18em tracking, uppercase.
 * Replaces the old SectionLabel, which was uppercase sans in accent teal.
 */
export default function Eyebrow({
  children,
  className,
  tone = "brand",
  as: Tag = "div",
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "eyebrow",
        tone === "muted" && "text-soft",
        tone === "dark" && "text-footer-accent",
        className
      )}
    >
      {children}
    </Tag>
  );
}
