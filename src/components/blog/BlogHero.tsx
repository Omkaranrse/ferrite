"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Layers, Award } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function BlogHero() {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  return (
    <section
      className={`relative pt-36 pb-16 sm:pt-44 sm:pb-24 border-b overflow-hidden transition-colors duration-300 ${
        isLight
          ? "bg-[#FFFFFF] border-slate-200"
          : "bg-[#070A0D] border-white/10"
      }`}
    >
      {/* Ambient Molten Ember Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF7A1A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[#FF7A1A]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="inline-flex items-center px-3.5 py-1.5 rounded-full border mb-6 text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
          style={{
            borderColor: isLight ? "rgba(200, 121, 64, 0.3)" : "rgba(255, 122, 26, 0.25)",
            backgroundColor: isLight ? "rgba(255, 122, 26, 0.08)" : "rgba(255, 122, 26, 0.08)",
            color: "#FF7A1A",
          }}
        >
        </motion.div>

        {/* Editorial Heading */}
        <div className="overflow-hidden py-3 -my-3">
          <motion.h1
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.15] py-1 text-balance ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Insights &amp;{" "}
            <span className="text-[#FF7A1A] [text-shadow:_0_0_30px_rgba(255,122,26,0.35)]">
              Perspectives
            </span>
          </motion.h1>
        </div>

        {/* Supporting Headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
          className={`text-xl sm:text-2xl font-heading font-medium tracking-tight mt-4 ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
        >
          &ldquo;Knowledge that shapes the way we build.&rdquo;
        </motion.p>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.36, ease: "easeOut" }}
          className={`text-sm sm:text-base max-w-2xl mt-4 font-body leading-relaxed font-normal ${
            isLight ? "text-slate-600" : "text-[#9CA3AF]"
          }`}
        >
          Explore insights on structural steel, material selection, engineering applications and
          industrial developments from Mumbai&apos;s leading structural steel supplier.
        </motion.p>

        {/* Micro-Stats / Editorial Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.44, ease: "easeOut" }}
          className={`grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t max-w-2xl ${
            isLight ? "border-slate-200" : "border-white/10"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A] shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div
                className={`font-heading font-bold text-base leading-tight ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                60 Articles
              </div>
              <div
                className={`text-[11px] font-mono leading-tight mt-0.5 ${
                  isLight ? "text-slate-500" : "text-steel"
                }`}
              >
                Technical Guides
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A] shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div
                className={`font-heading font-bold text-base leading-tight ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                5 Disciplines
              </div>
              <div
                className={`text-[11px] font-mono leading-tight mt-0.5 ${
                  isLight ? "text-slate-500" : "text-steel"
                }`}
              >
                Categorized Archive
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="w-9 h-9 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div
                className={`font-heading font-bold text-base leading-tight ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                IS &amp; ASTM
              </div>
              <div
                className={`text-[11px] font-mono leading-tight mt-0.5 ${
                  isLight ? "text-slate-500" : "text-steel"
                }`}
              >
                Standards Compliant
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
