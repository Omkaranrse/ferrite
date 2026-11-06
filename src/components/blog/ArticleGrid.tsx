"use client";

import React from "react";
import ArticleCard from "@/components/blog/ArticleCard";
import { BlogPost } from "@/types/blog";
import { useTheme } from "@/context/ThemeContext";
import { FileQuestion } from "lucide-react";

interface ArticleGridProps {
  articles: BlogPost[];
  onResetFilter?: () => void;
}

export default function ArticleGrid({ articles, onResetFilter }: ArticleGridProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  if (articles.length === 0) {
    return (
      <div
        className={`py-16 text-center rounded-2xl border ${
          isLight ? "bg-slate-50 border-slate-200" : "bg-[#10151A] border-white/10"
        }`}
      >
        <FileQuestion className="w-12 h-12 text-[#FF7A1A] mx-auto mb-4 opacity-80" />
        <h3
          className={`font-heading text-lg font-bold ${
            isLight ? "text-slate-900" : "text-white"
          }`}
        >
          No articles found in this category
        </h3>
        <p className="text-xs text-steel mt-2 max-w-sm mx-auto">
          We couldn&apos;t find any technical insights matching your current filter.
        </p>
        {onResetFilter && (
          <button
            type="button"
            onClick={onResetFilter}
            className="mt-6 px-5 py-2.5 rounded-full bg-[#FF7A1A] text-white font-heading text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#FF882E] transition-colors"
          >
            View All Articles
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {articles.map((article, idx) => (
        <ArticleCard key={article.slug} article={article} index={idx} />
      ))}
    </div>
  );
}

