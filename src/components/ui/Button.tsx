"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "copper-outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  withArrow?: boolean;
  withExternalArrow?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  withArrow = false,
  withExternalArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-heading font-medium tracking-[0.08em] uppercase transition-all duration-300 relative select-none group focus:outline-none focus:ring-1 focus:ring-copper disabled:opacity-50 disabled:pointer-events-none overflow-hidden";

  const sizeStyles = {
    sm: "text-[11px] px-4 py-2.5 gap-2",
    md: "text-xs sm:text-sm px-6 py-3.5 gap-2.5",
    lg: "text-xs sm:text-sm px-8 py-4 gap-3",
  };

  const variantStyles = {
    primary:
      "bg-copper text-white hover:bg-copper-hover border border-copper hover:border-copper-hover copper-glow-sm hover:copper-glow active:scale-[0.98]",
    secondary:
      "bg-charcoal text-offwhite border border-charcoal-border hover:border-steel hover:bg-charcoal-light active:scale-[0.98]",
    outline:
      "bg-transparent text-offwhite border border-steel-muted hover:border-white hover:text-white hover:bg-white/5 active:scale-[0.98]",
    "copper-outline":
      "bg-transparent text-copper border border-copper/60 hover:bg-copper hover:text-white hover:border-copper hover:copper-glow-sm active:scale-[0.98]",
    white:
      "bg-white text-graphite border border-white hover:bg-offwhite active:scale-[0.98]",
    ghost:
      "bg-transparent text-steel hover:text-offwhite hover:bg-charcoal/40 active:scale-[0.98]",
  };

  const content = (
    <>
      {/* Subtle Luminous Shimmer Effect on Primary Buttons */}
      {variant === "primary" && (
        <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
      )}
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
        {children}
      </span>
      {withArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-copper group-hover:text-white shrink-0" />
      )}
      {withExternalArrow && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-copper group-hover:text-white shrink-0" />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
}
