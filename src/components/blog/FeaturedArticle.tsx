"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { useTheme } from "@/context/ThemeContext";

interface FeaturedArticleProps {
  article: BlogPost;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 z-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 ${
          isLight
            ? "bg-white border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)] hover:border-slate-300"
            : "bg-[#10151A] border-white/10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] hover:border-white/20"
        }`}
      >
        {/* Subtle Specular Top Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF7A1A]/40 to-transparent pointer-events-none z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Left / Top: Featured Image (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] overflow-hidden bg-black/40">
            <Link
              href={`/blog/${article.slug}`}
              className="block absolute inset-0 focus:outline-none"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={article.featuredImage}
                alt={article.featuredImageAlt || article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isLight
                    ? "bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/20"
                    : "bg-gradient-to-t from-[#10151A]/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#10151A]"
                }`}
              />
            </Link>

            {/* Featured Badge floating on image */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#FF7A1A] text-white shadow-[0_4px_16px_rgba(255,122,26,0.45)]">
                <Sparkles className="w-3 h-3" />
                <span>LATEST PERSPECTIVE</span>
              </span>
            </div>
          </div>

          {/* Right / Bottom: Article Details & CTA (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative z-10">
            <div>
              {/* Category & Meta Row */}
              <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                <span
                  className="px-2.5 py-1 rounded-md font-mono font-semibold uppercase text-[10px] tracking-wider"
                  style={{
                    backgroundColor: isLight
                      ? "rgba(255, 122, 26, 0.12)"
                      : "rgba(255, 122, 26, 0.15)",
                    color: "#FF7A1A",
                  }}
                >
                  {article.category}
                </span>

                <div
                  className={`flex items-center gap-1.5 text-xs font-mono ${
                    isLight ? "text-slate-500" : "text-steel"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  <span>{article.formattedDate}</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 text-xs font-mono ${
                    isLight ? "text-slate-500" : "text-steel"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  <span>{article.readingTime} min read</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="mb-4">
                <Link
                  href={`/blog/${article.slug}`}
                  className={`font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug transition-colors group-hover:text-[#FF7A1A] ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  {article.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p
                className={`text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4 font-normal ${
                  isLight ? "text-slate-600" : "text-[#9CA3AF]"
                }`}
              >
                {article.excerpt}
              </p>
            </div>

            {/* Read Article CTA */}
            <div className="pt-6 sm:pt-8 mt-4 border-t border-slate-200/80 dark:border-white/10">
              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FF7A1A] hover:bg-[#FF882E] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(255,122,26,0.4)] hover:shadow-[0_4px_30px_rgba(255,122,26,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

