import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  /** Semantic level. */
  as?: "h1" | "h2" | "h3";
  /** Visual size, independent of level. Defaults to match `as`. */
  variant?: "h1" | "h1p" | "h2" | "h3";
  /**
   * Was true. NOW DEFAULTS TO FALSE — the guide's heading blocks are
   * left-aligned throughout; centred is the exception (hero, closing CTA).
   */
  centered?: boolean;
  /** Set only inside a dark surface (.footer / .panel). */
  dark?: boolean;
  /** ch-constraint on the heading. The guide runs 16ch–24ch. */
  titleWidth?: string;
  className?: string;
  id?: string;
}

/**
 * Eyebrow + serif heading + lead. The old version emitted gradient text and a
 * glowing divider bar beneath every heading; the guide has neither.
 */
export default function SectionHeading({
  label,
  title,
  description,
  as: Tag = "h2",
  variant,
  centered = false,
  dark = false,
  titleWidth,
  className,
  id,
}: SectionHeadingProps) {
  const visual = variant ?? (Tag === "h1" ? "h1" : Tag === "h3" ? "h3" : "h2");
  const width = titleWidth ?? (visual === "h1" || visual === "h1p" ? "20ch" : "22ch");

  return (
    <div className={cn("mb-10 lg:mb-14", centered && "text-center", className)}>
      {label && (
        <Eyebrow tone={dark ? "dark" : "brand"} className="mb-5">
          {label}
        </Eyebrow>
      )}
      <Tag
        id={id}
        className={cn(visual, dark && "text-footer-heading", centered && "mx-auto")}
        style={{ maxWidth: width }}
      >
        {title}
      </Tag>
      {description && (
        <p className={cn("lead mt-5", centered && "mx-auto", dark && "text-panel-body")}>
          {description}
        </p>
      )}
    </div>
  );
}
