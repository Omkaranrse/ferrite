"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import ArticleCard from "@/components/blog/ArticleCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface RelatedArticlesProps {
  articles: BlogPost[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  if (!articles || articles.length === 0) return null;

  return (
    <section className="pt-12 pb-16 border-t border-slate-200 dark:border-white/10 mt-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#FF7A1A] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONTINUE READING</span>
          </div>
          <h3
            className={`font-heading text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Related Engineering Insights
          </h3>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-[#FF7A1A] hover:text-[#FF882E] transition-colors group"
        >
          <span>Browse All Articles</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {articles.map((article, idx) => (
          <ArticleCard key={article.slug} article={article} index={idx} />
        ))}
      </div>
    </section>
  );
}

