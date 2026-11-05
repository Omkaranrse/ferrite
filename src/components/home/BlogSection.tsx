"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Document icon for the folder tab
const BlogDocIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-[#FF7A1A]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

// Calendar icon for metadata
const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "coastal-construction",
    title: "Why Choose Stainless Steel Channels for Coastal Construction?",
    date: "Mar 18, 2025",
    readTime: "5 min read",
    image: "/images/blogs/coastal-construction.jpg",
    href: "/capabilities",
  },
  {
    id: "marine-chemical",
    title: "Why Stainless Steel Channels Are Crucial for Marine and Chemical Industries",
    date: "Apr 18, 2025",
    readTime: "6 min read",
    image: "/images/blogs/marine-chemical.jpg",
    href: "/capabilities",
    featured: true,
  },
  {
    id: "galvanized-angles",
    title: "What Makes Galvanized Steel Angles Ideal for Outdoor Construction",
    date: "Feb 25, 2025",
    readTime: "4 min read",
    image: "/images/blogs/galvanized-angles.jpg",
    href: "/capabilities",
  },
];

export default function BlogSection() {
  return (
    <section
      id="insights"
      className="bg-[#0A0E11] py-16 sm:py-24 relative text-offwhite border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-16 -right-16 w-96 h-96 bg-[#FF7A1A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-[#FF7A1A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 mb-12 sm:mb-14 max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-[3px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
            <span className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.22em] text-[#9CA3AF] uppercase">
              INSIGHTS
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-[-0.03em] leading-[1.12]">
            Our{" "}
            <span className="text-[#FF7A1A] [text-shadow:_0_0_24px_rgba(255,122,26,0.35)]">
              Blogs
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#9CA3AF] font-normal leading-relaxed">
            Articles &amp; blog posts with useful information.
          </p>
        </div>

        {/* 3 Folder-Tab Styled Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {BLOG_POSTS.map((post, idx) => {
            const isFeatured = post.featured;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group h-full flex flex-col"
              >
                {/* Floor Reflection Light Pool for Middle Featured Card */}
                {isFeatured && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-[#FF7A1A]/35 blur-xl rounded-full pointer-events-none" />
                )}

                {/* Ambient Subsurface Reflection for all cards */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-5 bg-white/[0.03] blur-md rounded-full pointer-events-none" />

                <Link
                  href={post.href}
                  className="relative flex flex-col justify-between h-full w-full min-h-[440px] sm:min-h-[460px] cursor-pointer"
                >
                  {/* SVG Folder Silhouette Background & Continuous Glowing Border */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <svg
                      viewBox="0 0 360 480"
                      preserveAspectRatio="none"
                      className={`w-full h-full transition-all duration-500 ${
                        isFeatured
                          ? "drop-shadow-[0_0_20px_rgba(255,122,26,0.55)] drop-shadow-[0_0_45px_rgba(255,122,26,0.22)]"
                          : "group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                      }`}
                    >
                      <path
                        d="M 0 456 L 0 24 A 24 24 0 0 1 24 0 L 114 0 Q 130 0 136 12 Q 142 36 160 36 L 336 36 A 24 24 0 0 1 360 60 L 360 456 A 24 24 0 0 1 336 480 L 24 480 A 24 24 0 0 1 0 456 Z"
                        fill="rgba(17, 23, 27, 0.88)"
                        stroke={isFeatured ? "#FF7A1A" : "rgba(255, 255, 255, 0.12)"}
                        strokeWidth={isFeatured ? 2.5 : 1.2}
                        vectorEffect="non-scaling-stroke"
                        className="transition-colors duration-300 group-hover:stroke-[#FF7A1A]"
                      />
                    </svg>
                  </div>

                  {/* Card Content Interior */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-5">
                    {/* Top Folder Tab Header Content */}
                    <div className="flex items-center gap-2 pl-2 pt-1 h-7">
                      <BlogDocIcon />
                      <span className="text-xs sm:text-[13px] font-bold text-white tracking-wide">
                        Blog
                      </span>
                    </div>

                    {/* Main Body (below tab drop) */}
                    <div className="pt-3 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Blog Thumbnail Image */}
                        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/50 shadow-md">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-95 group-hover:brightness-100"
                          />
                          {/* Inner image subtle gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Blog Post Title */}
                        <h3 className="font-heading font-extrabold text-[15px] sm:text-base lg:text-[17px] text-white tracking-tight leading-snug mt-4 group-hover:text-[#FF7A1A] transition-colors line-clamp-3">
                          {post.title}
                        </h3>
                      </div>

                      {/* Card Meta Footer Bar */}
                      <div className="flex items-center justify-between pt-4 mt-6 border-t border-white/[0.08]">
                        {/* Date & Read Time */}
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF] font-medium">
                          <CalendarIcon />
                          <span>{post.date}</span>
                          <span className="text-white/20">|</span>
                          <span>{post.readTime}</span>
                        </div>

                        {/* Circular Action Arrow Button */}
                        <div className="w-8 h-8 rounded-full border border-[#FF7A1A] flex items-center justify-center text-[#FF7A1A] group-hover:bg-[#FF7A1A] group-hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(255,122,26,0.25)] shrink-0">
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Left "View All Blogs →" Button */}
        <div className="mt-10 sm:mt-12">
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#0A0E11]/90 hover:bg-[#FF7A1A]/10 border border-[#FF7A1A] text-xs sm:text-sm font-bold text-white transition-all duration-300 group shadow-[0_0_15px_rgba(255,122,26,0.18)] hover:shadow-[0_0_25px_rgba(255,122,26,0.4)] hover:scale-105 active:scale-95"
          >
            <span>View All Blogs</span>
            <span className="text-[#FF7A1A] font-bold text-sm sm:text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

