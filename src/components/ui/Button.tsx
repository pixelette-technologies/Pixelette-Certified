"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-accent via-accent-light to-accent text-white shadow-glow-accent hover:shadow-glow-lg hover:from-accent-light hover:via-accent hover:to-accent-dark",
  secondary:
    "border border-accent/40 text-accent bg-accent/5 backdrop-blur-sm hover:bg-accent/15 hover:border-accent/70 hover:shadow-glow",
  ghost: "text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-9 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = cn(
    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl",
    "transition-all duration-500 ease-out overflow-hidden group",
    "hover:-translate-y-1 active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const shineElement =
    variant === "primary" ? (
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent
        -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out
        skew-x-12 pointer-events-none"
        aria-hidden="true"
      />
    ) : null;

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {shineElement}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {shineElement}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
