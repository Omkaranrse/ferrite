import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "copper" | "steel" | "dark" | "light";
  withDot?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = "copper",
  withDot = true,
  className,
}: BadgeProps) {
  const variantStyles = {
    copper: "bg-copper/10 border-copper/30 text-copper",
    steel: "bg-steel-dark/20 border-steel-muted text-steel-light",
    dark: "bg-charcoal border-charcoal-border text-steel",
    light: "bg-white border-offwhite-border text-graphite",
  };

  const dotStyles = {
    copper: "bg-copper",
    steel: "bg-steel",
    dark: "bg-copper",
    light: "bg-copper",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 text-[11px] font-heading font-medium tracking-[0.18em] uppercase border transition-colors",
        variantStyles[variant],
        className
      )}
    >
      {withDot && (
        <span
          className={cn("w-1.5 h-1.5 shrink-0 rounded-none", dotStyles[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

