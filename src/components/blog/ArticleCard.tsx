"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { useTheme } from "@/context/ThemeContext";

interface ArticleCardProps {
  article: BlogPost;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min((index % 4) * 0.05, 0.2),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 ${
        isLight
          ? "bg-white border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)] hover:border-[#FF7A1A]/40"
          : "bg-[#10151A] border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-[#FF7A1A]/35 hover:shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
      }`}
    >
      {/* Featured Image with Aspect Ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
        <Link
          href={`/blog/${article.slug}`}
          className="block w-full h-full focus:outline-none"
          tabIndex={-1}
        >
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt || article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-600 ease-out group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isLight
                ? "bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                : "bg-gradient-to-t from-[#10151A] via-transparent to-transparent opacity-60 group-hover:opacity-40"
            }`}
          />
        </Link>

        {/* Category Pill Floating on Image */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-md border border-white/15">
            {article.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div
            className={`flex items-center gap-2 text-[11px] font-mono mb-2.5 ${
              isLight ? "text-slate-500" : "text-steel"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#FF7A1A]" />
              <span>{article.formattedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#FF7A1A]" />
              <span>{article.readingTime} min</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-2">
            <Link
              href={`/blog/${article.slug}`}
              className={`font-heading font-extrabold text-base tracking-tight leading-snug line-clamp-2 transition-colors group-hover:text-[#FF7A1A] ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              {article.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p
            className={`text-xs leading-relaxed line-clamp-2 font-normal mb-4 ${
              isLight ? "text-slate-600" : "text-[#9CA3AF]"
            }`}
          >
            {article.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-[#FF7A1A] group-hover:gap-2 transition-all"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <span
            className={`text-[9px] font-mono uppercase tracking-widest ${
              isLight ? "text-slate-400" : "text-steel-dark"
            }`}
          >
            FERRITE
          </span>
        </div>
      </div>
    </motion.article>
  );
}
