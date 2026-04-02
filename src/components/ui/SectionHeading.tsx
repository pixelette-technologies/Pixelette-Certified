import { cn } from "@/lib/utils";
import SectionLabel from "./SectionLabel";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  dark?: boolean;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  dark = true,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12 lg:mb-16", className)}>
      {label && (
        <SectionLabel dark={dark} className="mb-4 block">
          {label}
        </SectionLabel>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight",
          dark ? "gradient-text-white" : "gradient-text"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg max-w-2xl leading-relaxed",
            centered && "mx-auto",
            dark ? "text-gray-400" : "text-gray-600"
          )}
        >
          {description}
        </p>
      )}
      {/* Decorative line under heading */}
      <div className={cn("mt-6 mx-auto divider-glow", centered ? "max-w-[120px]" : "max-w-[120px]")} />
    </div>
  );
}
