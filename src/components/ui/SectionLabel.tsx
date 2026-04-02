import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export default function SectionLabel({ children, className, dark = true }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "text-sm font-bold uppercase tracking-widest",
        dark ? "text-accent" : "text-accent-dark",
        className
      )}
    >
      {children}
    </span>
  );
}
