"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import ArticleCard from "@/components/blog/ArticleCard";
import BlogPagination from "@/components/blog/BlogPagination";
import { BlogPost } from "@/types/blog";
import { useTheme } from "@/context/ThemeContext";

interface AllArticlesClientProps {
  initialPosts: BlogPost[];
}

const ITEMS_PER_PAGE = 20;

export default function AllArticlesClient({ initialPosts }: AllArticlesClientProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const gridSectionRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(initialPosts.length / ITEMS_PER_PAGE));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return initialPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [initialPosts, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (gridSectionRef.current) {
      const top = gridSectionRef.current.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, initialPosts.length);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isLight ? "bg-[#F8FAFC]" : "bg-[#070A0D]"
      }`}
    >
      {/* Editorial Header Section */}
      <section
        className={`relative pt-36 pb-14 sm:pt-40 sm:pb-16 border-b transition-colors duration-300 ${
          isLight
            ? "bg-[#FFFFFF] border-slate-200"
            : "bg-[#070A0D] border-white/10"
        }`}
      >
        {/* Glow Accents */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF7A1A]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[#FF7A1A]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div>
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 text-xs font-mono font-semibold uppercase tracking-wider"
                style={{
                  borderColor: isLight ? "rgba(200, 121, 64, 0.3)" : "rgba(255, 122, 26, 0.25)",
                  backgroundColor: isLight ? "rgba(255, 122, 26, 0.08)" : "rgba(255, 122, 26, 0.08)",
                  color: "#FF7A1A",
                }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>COMPLETE KNOWLEDGE ARCHIVE</span>
              </div>

              {/* Title */}
              <h1
                className={`font-heading text-3xl sm:text-5xl font-extrabold tracking-tight ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                All Published{" "}
                <span className="text-[#FF7A1A]">Articles</span>
              </h1>

              <p
                className={`text-sm sm:text-base max-w-2xl mt-3 font-body ${
                  isLight ? "text-slate-600" : "text-[#9CA3AF]"
                }`}
              >
                Comprehensive technical library of structural steel guides, material specifications,
                fabrication tolerances and industrial engineering insights.
              </p>
            </div>

            {/* Back to Featured / Highlights link */}
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider border transition-all ${
                isLight
                  ? "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                  : "bg-white/[0.05] border-white/15 text-white hover:bg-white/10 hover:border-[#FF7A1A]/40"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FF7A1A]" />
              <span>Back to Featured</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section
        ref={gridSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24"
      >
        {/* Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-8 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span
              className={`px-3 py-1 rounded-full border ${
                isLight
                  ? "bg-white border-slate-200 text-slate-700"
                  : "bg-[#10151A] border-white/10 text-offwhite"
              }`}
            >
              Showing {startIndex}–{endIndex} of {initialPosts.length} Articles
            </span>
          </div>

          <div
            className={`text-xs font-mono ${
              isLight ? "text-slate-500" : "text-steel"
            }`}
          >
            Page {currentPage} of {totalPages} • 4 Columns Layout
          </div>
        </div>

        {/* 4 Articles in 1 Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedPosts.map((article, idx) => (
            <ArticleCard
              key={article.slug}
              article={article}
              index={idx}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8">
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
}
