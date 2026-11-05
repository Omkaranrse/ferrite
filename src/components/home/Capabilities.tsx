"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Disc, Flame, Maximize2, Layers } from "lucide-react";

const CAPABILITY_CARDS = [
  {
    id: "cutting",
    title: "Cutting",
    subtext: "Precision cutting to size",
    icon: Disc,
  },
  {
    id: "shaping",
    title: "Shaping",
    subtext: "Bending, forming & profiling",
    icon: Flame,
  },
  {
    id: "sizing",
    title: "Sizing",
    subtext: "Custom sizes & lengths",
    icon: Maximize2,
  },
  {
    id: "stockholding",
    title: "Stockholding",
    subtext: "Wide range, ready availability",
    icon: Layers,
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-[#0A0E11] py-16 sm:py-20 relative text-offwhite border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono font-medium text-copper tracking-wider uppercase">
              — OUR CAPABILITIES
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-white leading-[1.12]">
              More Than Supply. <br />
              <span className="text-copper">Built for Projects.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md font-body leading-relaxed pt-1">
              Value-added processing and material preparation to meet your exact project requirements.
            </p>
          </div>

          {/* Right 4-Card Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {CAPABILITY_CARDS.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-[#12181D] border border-white/5 hover:border-white/20 rounded-xl p-5 sm:p-6 text-center flex flex-col items-center justify-center space-y-3 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-copper/10 border border-copper/20 flex items-center justify-center text-copper group-hover:scale-110 group-hover:bg-copper group-hover:text-white transition-all duration-300">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-copper transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-[#9CA3AF] leading-tight">
                      {card.subtext}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
