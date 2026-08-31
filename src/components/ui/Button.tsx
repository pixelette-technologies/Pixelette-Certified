import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  /** primary -> .btn (filled brand) · secondary -> .btn2 (outline) · ghost -> .btn-ghost (text only) */
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /** trailing icon, e.g. <ArrowRight /> */
  iconRight?: React.ReactNode;
  /** stretch to the container — mobile stacked CTA rows */
  fullWidth?: boolean;
  ariaLabel?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn",
  secondary: "btn2",
  ghost: "btn-ghost",
};

/**
 * The guide has exactly one button size, and it is this `lg` — 16px/26px
 * padding on a 52px minimum height. Most call sites already pass size="lg",
 * so they land on-spec unchanged. `sm` and `md` are proportional reductions
 * that never drop below a 44px tap target.
 */
const sizeClass: Record<ButtonSize, string> = {
  sm: "text-[14.5px] px-[18px] py-3 min-h-[44px] gap-2",
  md: "text-[15.5px] px-[22px] py-3.5 min-h-[48px] gap-2.5",
  lg: "",
};

/**
 * Deliberately NOT a client component. It takes an onClick, but that is safe:
 * imported into a client tree it bundles normally, and imported by a server
 * component no handler is passed. Keeping the directive off means server pages
 * rendering <Button href="..."> emit pure HTML rather than opening a client
 * boundary — and this is one of the most widely imported files on the site.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
  disabled = false,
  iconRight,
  fullWidth = false,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    variantClass[variant],
    sizeClass[size],
    fullWidth && "w-full",
    "transition-colors duration-150",
    disabled && "pointer-events-none opacity-60",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
      >
        {children}
        {iconRight}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
      {iconRight}
    </button>
  );
}
