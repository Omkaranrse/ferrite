"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Clock, ShieldCheck, User } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { useTheme } from "@/context/ThemeContext";

interface ArticleHeaderProps {
  article: BlogPost;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  return (
    <header className="relative pt-32 sm:pt-40 pb-8 sm:pb-12 border-b transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          className={`flex flex-wrap items-center gap-2 text-xs font-mono mb-6 ${
            isLight ? "text-slate-500" : "text-steel"
          }`}
        >
          <Link href="/" className="hover:text-copper transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-steel-dark shrink-0" />
          <Link href="/blog" className="hover:text-copper transition-colors">
            BLOG
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-steel-dark shrink-0" />
          <span
            className="text-[#FF7A1A] font-semibold uppercase tracking-wider"
          >
            {article.category}
          </span>
        </motion.nav>

        {/* Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-4"
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider"
            style={{
              backgroundColor: isLight ? "rgba(255, 122, 26, 0.12)" : "rgba(255, 122, 26, 0.18)",
              color: "#FF7A1A",
              border: isLight ? "1px solid rgba(255, 122, 26, 0.25)" : "1px solid rgba(255, 122, 26, 0.3)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A]" />
            {article.category}
          </span>
        </motion.div>

        {/* Main Article Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] mb-6 text-balance ${
            isLight ? "text-slate-900" : "text-white"
          }`}
        >
          {article.title}
        </motion.h1>

        {/* Metadata Bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className={`flex flex-wrap items-center gap-4 sm:gap-6 py-4 border-y text-xs font-mono mb-8 sm:mb-12 ${
            isLight
              ? "border-slate-200 text-slate-600"
              : "border-white/10 text-[#9CA3AF]"
          }`}
        >
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FF7A1A]/15 border border-[#FF7A1A]/30 flex items-center justify-center text-[#FF7A1A]">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-heading font-semibold text-xs tracking-wide">
              Ferrite Technical Engineering Team
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#FF7A1A]" />
            <span>{article.formattedDate}</span>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#FF7A1A]" />
            <span>{article.readingTime} min read</span>
          </div>

          {/* Certified Badge */}
          <div className="hidden sm:flex items-center gap-1.5 ml-auto text-copper font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] uppercase tracking-wider">
              Technical Authority
            </span>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className={`relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-2xl ${
            isLight
              ? "border-slate-200 shadow-slate-900/10"
              : "border-white/10 shadow-black/80"
          }`}
        >
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt || article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </header>
  );
}

