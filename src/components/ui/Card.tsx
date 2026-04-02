import { cn } from "@/lib/utils";

type CardVariant = "glass" | "white" | "dark" | "glow";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  variant = "glass",
  className,
  hover = true,
}: CardProps) {
  if (variant === "glow") {
    return (
      <div
        className={cn(
          "glow-border rounded-2xl p-8 text-white transition-all duration-500",
          hover && "hover:-translate-y-2 hover:shadow-glow-lg",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl p-8 transition-all duration-500",
        variant === "glass" && "glass-card text-white",
        variant === "white" && "white-glass text-primary",
        variant === "dark" && "bg-gradient-to-br from-primary-dark to-primary border border-white/10 text-white shadow-glow",
        hover && "hover:-translate-y-2",
        hover && variant === "glass" && "hover:shadow-glow-lg",
        hover && variant === "white" && "hover:shadow-glow",
        className
      )}
    >
      {children}
    </div>
  );
}
