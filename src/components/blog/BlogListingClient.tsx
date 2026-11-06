"use client";

import React from "react";
import BlogHero from "@/components/blog/BlogHero";
import StickyCardStack from "@/components/blog/StickyCardStack";
import { BlogPost } from "@/types/blog";
import { useTheme } from "@/context/ThemeContext";

interface BlogListingClientProps {
  initialPosts: BlogPost[];
}

export default function BlogListingClient({ initialPosts }: BlogListingClientProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isLight ? "bg-[#F8FAFC]" : "bg-[#070A0D]"
      }`}
    >
      {/* Editorial Hero */}
      <BlogHero />

      {/* All Articles — Sticky Card Stack */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Section label */}
        <div className="max-w-4xl mx-auto flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FF7A1A]/30 to-transparent" />
          <span
            className={`text-xs font-mono font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full border ${
              isLight
                ? "text-slate-500 border-slate-200 bg-white shadow-sm"
                : "text-[#9CA3AF] border-white/10 bg-[#10151A]"
            }`}
          >
            {initialPosts.length} Articles
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FF7A1A]/30 to-transparent" />
        </div>

        <StickyCardStack articles={initialPosts} />
      </section>
    </div>
  );
}
