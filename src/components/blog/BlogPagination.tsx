"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  if (totalPages <= 1) return null;

  // Generate page numbers to display with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      aria-label="Blog pagination"
      className="flex items-center justify-center gap-2 pt-12 pb-4 select-none"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200 border ${
          currentPage === 1
            ? "opacity-35 cursor-not-allowed border-transparent"
            : isLight
              ? "bg-white border-slate-200 text-slate-700 hover:text-black hover:border-slate-400 shadow-sm"
              : "bg-white/[0.04] border-white/10 text-offwhite hover:text-white hover:border-white/25"
        }`}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page, idx) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className={`w-8 h-8 flex items-center justify-center text-xs font-mono ${
                  isLight ? "text-slate-400" : "text-steel"
                }`}
              >
                …
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? "page" : undefined}
              className={`w-9 h-9 rounded-full text-xs font-heading font-bold transition-all duration-200 flex items-center justify-center ${
                isActive
                  ? "bg-[#FF7A1A] text-white shadow-md shadow-[#FF7A1A]/30 scale-105"
                  : isLight
                    ? "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    : "bg-white/[0.04] border border-white/10 text-steel-light hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200 border ${
          currentPage === totalPages
            ? "opacity-35 cursor-not-allowed border-transparent"
            : isLight
              ? "bg-white border-slate-200 text-slate-700 hover:text-black hover:border-slate-400 shadow-sm"
              : "bg-white/[0.04] border-white/10 text-offwhite hover:text-white hover:border-white/25"
        }`}
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

