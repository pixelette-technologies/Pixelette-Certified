import { cn } from "@/lib/utils";

interface PillProps {
  children: React.ReactNode;
  /** default = grey outline · brand = green outline and text · dark = on .panel / .footer */
  tone?: "default" | "brand" | "dark";
  className?: string;
  as?: "span" | "li" | "div";
}

/**
 * The guide's pill: mono 11px uppercase, 999px radius, hairline border.
 * Used for certification tags, category chips and filter chips.
 */
export default function Pill({
  children,
  tone = "default",
  className,
  as: Tag = "span",
}: PillProps) {
  return (
    <Tag
      className={cn(
        "pill",
        tone === "brand" && "pill-brand",
        tone === "dark" && "border-panel-line text-panel-pill",
        className
      )}
    >
      {children}
    </Tag>
  );
}
