"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, Flame, Maximize2, Warehouse, ArrowRight } from "lucide-react";

const CAPABILITIES = [
  {
    id: "cutting",
    title: "Cutting",
    description: "Precision bandsawing and cold miter cutting to size with ±1.0 mm linear accuracy.",
    icon: Scissors,
  },
  {
    id: "shaping",
    title: "Shaping",
    description: "Multi-torch CNC gas & plasma profiling, weld beveling and plate forming straight from CAD.",
    icon: Flame,
  },
  {
    id: "sizing",
    title: "Sizing",
    description: "Custom lengths, hydraulic plate roller leveling and surface shot blasting to SA 2.5.",
    icon: Maximize2,
  },
  {
    id: "stockholding",
    title: "Stockholding",
    description: "Multi-acre Kalamboli buffer inventory with 20-ton crane handling and 100% MTC documentation.",
    icon: Warehouse,
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-[#14181B] py-16 sm:py-20 relative text-offwhite border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Part Layout: Header on Top/Left */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-copper block font-semibold">
              OUR CAPABILITIES
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.12]">
              More Than Supply. <br className="hidden sm:inline" />
              <span className="text-copper">Built for Projects.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A9AFB2] font-body leading-relaxed pt-1">
              Value-added processing and material preparation to meet your project requirements.
            </p>
          </div>

          <Link
            href="/capabilities"
            className="text-xs font-heading font-semibold uppercase tracking-wider text-copper hover:text-white transition-colors inline-flex items-center gap-1.5 shrink-0 group self-start lg:self-auto"
          >
            <span>DISCUSS PROCESSING</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right/Bottom Side: Four Compact Bordered Cards in Horizontal 4-Column Arrangement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group border border-white/10 hover:border-copper/70 rounded-xl bg-[#161A1D] p-6 text-center transition-all duration-300 shadow-md flex flex-col items-center justify-between"
              >
                <div className="space-y-3 w-full flex flex-col items-center">
                  {/* Centered Orange Outlined Icon */}
                  <div className="w-12 h-12 rounded-xl bg-black/40 border border-copper/50 flex items-center justify-center text-copper group-hover:bg-copper group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Heading */}
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-copper transition-colors">
                    {cap.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-[#A9AFB2] leading-relaxed font-body">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 w-full">
                  <Link
                    href={`/capabilities#${cap.id}`}
                    className="text-[11px] font-heading font-medium uppercase tracking-wider text-copper hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
