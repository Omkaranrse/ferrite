import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  highlightedTitle?: string;
  subtitle: string;
  breadcrumb: string;
}

export default function PageHeader({
  eyebrow,
  title,
  highlightedTitle,
  subtitle,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-graphite border-b border-charcoal-border overflow-hidden bg-grid-pattern">
      {/* Ambient Molten Ember Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-copper/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-steel mb-6">
          <Link href="/" className="hover:text-copper transition-colors">
            FERRITE
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-copper font-medium">{breadcrumb.toUpperCase()}</span>
        </div>

        {/* Eyebrow */}
        <div className="mb-4">
          <Badge variant="copper">{eyebrow}</Badge>
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.06] text-balance">
          {title}{" "}
          {highlightedTitle && <span className="text-copper">{highlightedTitle}</span>}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-steel-light max-w-2xl mt-6 font-body leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
