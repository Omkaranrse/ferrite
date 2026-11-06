"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowUpRight, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { useTheme } from "@/context/ThemeContext";

interface StickyCardStackProps {
  articles: BlogPost[];
}

const INITIAL_COUNT = 6;

export default function StickyCardStack({ articles }: StickyCardStackProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  const initialArticles = articles.slice(0, INITIAL_COUNT);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* ── Sticky Cards Stack (First 6) ── */}
      <div className="relative">
        {initialArticles.map((article, idx) => {
          const cardNumber = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={article.slug}
              style={{
                position: "sticky",
                /* Vertically centered in the viewport: (50vh - half_card_height ~140px)
                   Safely clamped so it never overlaps the navbar on short viewports */
                top: "max(92px, calc(50vh - 140px))",
                zIndex: idx + 1,
              }}
              className="mb-[45vh]"
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] rounded-2xl"
                aria-label={`Read article: ${article.title}`}
              >
                <div
                  className={`
                    relative overflow-hidden rounded-2xl border transition-all duration-300
                    h-[430px] sm:h-[300px] md:h-[280px] flex flex-col sm:flex-row
                    ${
                      isLight
                        ? "bg-white border-slate-200/90 shadow-[0_16px_40px_rgba(15,23,42,0.1)] hover:border-[#FF7A1A]/50 hover:shadow-[0_24px_55px_rgba(15,23,42,0.16)]"
                        : "bg-[#10151A] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.75)] hover:border-[#FF7A1A]/40 hover:shadow-[0_26px_65px_rgba(0,0,0,0.9)]"
                    }
                  `}
                >
                  {/* Left Column: Featured Image */}
                  <div className="relative w-full sm:w-2/5 h-48 sm:h-full shrink-0 overflow-hidden bg-black/30">
                    <Image
                      src={article.featuredImage}
                      alt={article.featuredImageAlt || article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={idx < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-transparent to-black/25 pointer-events-none" />

                    {/* Category pill on image */}
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-md border border-white/15">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Article Details */}
                  <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 md:p-7 min-w-0">
                    <div>
                      {/* Meta & Index Header */}
                      <div className="flex items-center justify-between gap-3 text-xs font-mono mb-3">
                        <div
                          className={`flex items-center gap-2.5 ${
                            isLight ? "text-slate-500" : "text-steel"
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#FF7A1A]" />
                            {article.formattedDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#FF7A1A]" />
                            {article.readingTime} min read
                          </span>
                        </div>

                        {/* Card counter pill */}
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border shrink-0"
                          style={{
                            borderColor: isLight
                              ? "rgba(255,122,26,0.3)"
                              : "rgba(255,122,26,0.25)",
                            backgroundColor: isLight
                              ? "rgba(255,122,26,0.06)"
                              : "rgba(255,122,26,0.08)",
                            color: "#FF7A1A",
                          }}
                        >
                          {cardNumber} / {String(INITIAL_COUNT).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className={`font-heading font-extrabold text-lg sm:text-xl md:text-2xl leading-snug tracking-tight mb-2.5 line-clamp-2 transition-colors duration-200 group-hover:text-[#FF7A1A] ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}
                      >
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p
                        className={`text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 ${
                          isLight ? "text-slate-600" : "text-[#9CA3AF]"
                        }`}
                      >
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-[#FF7A1A] group-hover:gap-2.5 transition-all duration-300">
                        <span>Read Article</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>

                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest ${
                          isLight ? "text-slate-400" : "text-steel-dark"
                        }`}
                      >
                        FERRITE INSIGHTS
                      </span>
                    </div>
                  </div>

                  {/* Animated orange border accent at bottom on hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF7A1A] transition-all duration-500 group-hover:w-full pointer-events-none" />
                </div>
              </Link>
            </div>
          );
        })}

        {/* Extra bottom scroll clearance to guarantee Card 06 stays 100% stacked over Card 05 */}
        <div className="h-[45vh]" aria-hidden="true" />
      </div>

      {/* ── View All Articles Link Button (Navigates to /blog/all) ── */}
      <div className="pt-4 pb-16 flex justify-center">
        <Link
          href="/blog/all"
          className="group inline-flex items-center gap-3 px-9 py-4 rounded-full font-heading font-bold text-sm uppercase tracking-wider border-2 border-[#FF7A1A] text-[#FF7A1A] hover:bg-[#FF7A1A] hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] focus-visible:ring-offset-2 shadow-sm hover:shadow-lg hover:shadow-[#FF7A1A]/20"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
