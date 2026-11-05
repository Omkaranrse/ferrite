"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Train, ArrowRight } from "lucide-react";

interface Milestone {
  platform: string;
  year: string;
  title: string;
  description: string;
  isCurrent?: boolean;
  xPercent: number; // Center percentage of the station & rail node
}

const MILESTONES: Milestone[] = [
  {
    platform: "01",
    year: "1965",
    title: "Foundation of Lineage",
    description: "Trading begins in Mumbai's historic iron & steel hubs",
    xPercent: 13.2,
  },
  {
    platform: "02",
    year: "1988",
    title: "Expansion into Heavy Structural Sections",
    description: "Strategic focus on construction & industrial steel",
    xPercent: 31.6,
  },
  {
    platform: "03",
    year: "2004",
    title: "Establishment of Kalamboli Facility",
    description: "Consolidating operations in Navi Mumbai's premier steel hub",
    xPercent: 50.0,
  },
  {
    platform: "04",
    year: "2014",
    title: "Rebranding to Ferrite Structural Steels Pvt. Ltd.",
    description: "Transition to integrated stockholding & value-added processing",
    xPercent: 69.0,
  },
  {
    platform: "05",
    year: "Present",
    title: "Pan-India Project Partner",
    description: "Advanced CNC profiling, bandsaws & multi-sector supply",
    isCurrent: true,
    xPercent: 87.4,
  },
];

export default function RailwayJourney() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // Platform 05 active by default

  return (
    <section id="journey" className="py-14 sm:py-20 border-t border-white/[0.08] relative bg-[#070A0D]">
      {/* Ambient Warm Orange Highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-64 bg-[#FF7A1A]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================== */}
        {/* TOP HEADER: OUR JOURNEY + DEPARTURES | OUR JOURNEY BADGE   */}
        {/* ========================================================== */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5">
            <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-white uppercase">
              OUR JOURNEY
            </span>
          </div>

          {/* Departures Badge / Pill Button */}
          <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#101419] border border-white/15 hover:border-[#FF7A1A]/50 transition-all shadow-sm select-none group">
            <Train className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.16em] text-white/80">
              DEPARTURES
            </span>
            <span className="text-white/20 font-light text-xs">|</span>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.16em] text-white/90">
              OUR JOURNEY
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF7A1A] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </div>
        </div>

        {/* ========================================================== */}
        {/* RESPONSIVE SCROLL WRAPPER FOR RAILWAY TRACK & MILESTONES   */}
        {/* ========================================================== */}
        <div className="overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
          <div className="min-w-[860px] lg:min-w-0">
            {/* ====================================================== */}
            {/* THE RAILWAY STATION PLATFORM & TRACK SCENE             */}
            {/* ====================================================== */}
            <div className="relative w-full aspect-[2048/280] select-none rounded-xl overflow-hidden bg-[#0A0D11]">
              {/* High-Resolution 2X Railway Platform & Track Illustration */}
              <Image
                src="/images/about/railway-canopy-track@2x.png"
                alt="Ferrite Journey Train Station Platform and Railway Track"
                fill
                priority
                sizes="(max-width: 1024px) 1000px, 1280px"
                className="object-cover object-center pointer-events-none"
              />

              {/* Edge Gradient Blends to seamlessly merge with background */}
              <div className="absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#070A0D] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-[#070A0D] to-transparent pointer-events-none" />

              {/* Interactive Platform Hotspots along the Station Canopy */}
              {MILESTONES.map((m, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={m.platform}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className="absolute top-0 bottom-0 w-[18%] -translate-x-1/2 cursor-pointer z-10 focus:outline-none group"
                    style={{ left: `${m.xPercent}%` }}
                    aria-label={`Platform ${m.platform}: ${m.year} - ${m.title}`}
                  >
                    {/* Subtle warm amber spotlight over platform when active or hovered */}
                    <div
                      className={`absolute top-0 inset-x-2 h-3/4 rounded-b-2xl transition-opacity duration-300 pointer-events-none ${
                        isActive
                          ? "bg-gradient-to-b from-[#FF7A1A]/15 via-[#FF7A1A]/5 to-transparent opacity-100"
                          : "opacity-0 group-hover:opacity-60 bg-gradient-to-b from-white/10 to-transparent"
                      }`}
                    />

                    {/* Illuminated node indicator pulse on the rail track */}
                    <div
                      className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-300 pointer-events-none ${
                        isActive
                          ? "ring-4 ring-[#FF7A1A]/40 shadow-[0_0_15px_#FF7A1A]"
                          : "opacity-0 group-hover:opacity-100 ring-2 ring-white/30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* ====================================================== */}
            {/* VERTICAL CONNECTOR TICKS DESCENDING FROM NODES         */}
            {/* ====================================================== */}
            <div className="relative h-6 w-full select-none">
              {MILESTONES.map((m, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={m.platform}
                    className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                    style={{ left: `${m.xPercent}%` }}
                  >
                    <div
                      className={`w-[1.5px] transition-all duration-300 ${
                        isActive
                          ? "h-5 bg-[#FF7A1A] shadow-[0_0_10px_#FF7A1A]"
                          : "h-3.5 bg-white/20"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* ====================================================== */}
            {/* 5 MILESTONE COLUMNS (ALIGNED WITH NODES)               */}
            {/* ====================================================== */}
            <div className="grid grid-cols-5 gap-3 lg:gap-5 px-1 sm:px-2">
              {MILESTONES.map((m, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={m.platform}
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className="cursor-pointer group space-y-1.5 transition-all text-left"
                  >
                    {/* Milestone Title */}
                    <h3
                      className={`font-heading font-extrabold text-xs sm:text-[14px] lg:text-[15.5px] tracking-tight leading-snug transition-colors ${
                        isActive
                          ? "text-[#FF7A1A]"
                          : "text-white group-hover:text-white/90"
                      }`}
                    >
                      {m.title}
                    </h3>

                    {/* Milestone Description */}
                    <p className="text-[11px] sm:text-xs text-[#9CA3AF] leading-relaxed font-normal">
                      {m.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-4 flex items-center justify-center gap-2 lg:hidden text-[11px] text-[#6B7280]">
          <span>← Swipe horizontally to explore platforms →</span>
        </div>
      </div>
    </section>
  );
}
