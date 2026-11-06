"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface CategoryFilterProps {
  categories: readonly string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
}: CategoryFilterProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2 select-none">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
          const count = categoryCounts[cat] ?? 0;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-xs font-heading font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 focus:outline-none ${
                isActive
                  ? "text-white shadow-md shadow-[#FF7A1A]/20"
                  : isLight
                    ? "text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/60"
                    : "text-steel-light hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08]"
              }`}
            >
              {/* Active Background Pill with Spring Animation */}
              {isActive && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full bg-[#FF7A1A] -z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}

              <span className="relative z-10">{cat}</span>

              {/* Count badge */}
              <span
                className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none transition-colors ${
                  isActive
                    ? "bg-white/25 text-white"
                    : isLight
                      ? "bg-slate-200 text-slate-600"
                      : "bg-white/10 text-steel"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

