import { cn } from "@/lib/utils";

type CardVariant =
  | "default" // .card
  | "feature" // .card + 3px brand top border — highlighted card
  | "flat" // .tile geometry: 4px radius, tighter padding, single hairline shadow
  | "band" // card sitting on the alternate band
  | "dark"; // .panel

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  /**
   * Interactive affordance. The system is static, so this only strengthens the
   * border on hover — no lift, no shadow change. Note the default is now false;
   * it was true, which put hover:-translate-y-2 on every card on the site.
   */
  hover?: boolean;
  as?: "div" | "article" | "li";
}

export default function Card({
  children,
  variant = "default",
  className,
  hover = false,
  as: Tag = "div",
}: CardProps) {
  const resolved = variant;

  return (
    <Tag
      className={cn(
        resolved === "flat" ? "tile" : "card",
        resolved === "feature" && "card-feature",
        resolved === "band" && "bg-band",
        resolved === "dark" && "panel",
        hover && "transition-colors duration-150",
        hover && resolved !== "dark" && "hover:border-line-strong",
        hover && resolved === "dark" && "hover:border-panel-cta-line",
        className
      )}
    >
      {children}
    </Tag>
  );
}
