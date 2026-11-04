"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Scissors, ShieldCheck, Box, Flame, Maximize2, Gauge, Check } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { capabilitiesData } from "@/data/capabilities";
import { useRFQ } from "@/context/RFQContext";

export default function Capabilities() {
  const { openRFQ } = useRFQ();
  const [selectedCapIndex, setSelectedCapIndex] = useState(0);
  const activeCap = capabilitiesData[selectedCapIndex];

  const icons = [Box, Scissors, Flame, Maximize2];

  return (
    <section id="capabilities" className="bg-offwhite text-graphite py-24 sm:py-36 relative overflow-hidden bg-grid-pattern-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 sm:mb-24">
          <Badge variant="light" className="text-graphite font-bold">
            03 / PROCESSING & CAPABILITIES
          </Badge>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-graphite leading-[1.06]">
            More than <br />
            <span className="text-copper">material supply.</span>
          </h2>
          <p className="text-base sm:text-xl text-steel-dark leading-relaxed font-body font-normal">
            We combine stockholding with cutting, shaping, and sizing to deliver material in the
            forms and dimensions your project requires — eliminating site wastage, shop bottlenecks,
            and uncalibrated tolerances.
          </p>
        </div>

        {/* Interactive Capability Switcher & Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Capability List Cards with Staggered Entrance */}
          <div className="lg:col-span-5 space-y-4">
            {capabilitiesData.map((cap, idx) => {
              const Icon = icons[idx] || Box;
              const isSelected = selectedCapIndex === idx;

              return (
                <motion.button
                  key={cap.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 3 }}
                  onClick={() => setSelectedCapIndex(idx)}
                  className={`w-full text-left p-6 sm:p-7 border transition-all duration-300 relative group select-none ${
                    isSelected
                      ? "bg-white border-copper shadow-xl ring-1 ring-copper/30"
                      : "bg-offwhite-card border-offwhite-border hover:bg-white hover:border-steel-dark/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 border flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isSelected
                            ? "bg-copper text-white border-copper shadow-md"
                            : "bg-white text-graphite border-offwhite-border group-hover:border-copper group-hover:text-copper"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-steel-dark block font-medium">
                          PILLAR {cap.number}
                        </span>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-graphite">
                          {cap.title.split("&")[0]}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold transition-colors ${
                        isSelected ? "text-copper" : "text-steel"
                      }`}
                    >
                      {cap.number}
                    </span>
                  </div>

                  <p className="text-xs text-steel-dark mt-3 leading-relaxed font-body">
                    {cap.subtitle}
                  </p>

                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="capActiveBar"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-copper"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Visual Stage with Full Breakdown */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-offwhite-border p-6 sm:p-10 shadow-2xl space-y-8"
              >
                {/* Visual Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal border border-offwhite-border group">
                  <motion.div
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeCap.image}
                      alt={activeCap.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-center brightness-95 transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-copper block font-semibold">
                      FACILITY SCOPE • KALAMBOLI COMPLEX
                    </span>
                    <div className="font-heading text-lg sm:text-2xl font-bold mt-0.5">
                      {activeCap.title}
                    </div>
                  </div>
                </div>

                {/* Narrative */}
                <div>
                  <p className="text-sm sm:text-base text-steel-dark leading-relaxed font-body">
                    {activeCap.description}
                  </p>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-offwhite-border text-xs">
                  {activeCap.specs.map((sp) => (
                    <div key={sp.label}>
                      <span className="text-steel-dark font-medium block">{sp.label}</span>
                      <strong className="text-graphite font-heading text-sm mt-1 block">
                        {sp.value}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Highlights Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-copper font-semibold">
                    PROCESSING HIGHLIGHTS & QUALITY CONTROLS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCap.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-graphite/90"
                      >
                        <span className="w-4 h-4 rounded-none bg-copper/15 text-copper flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                          ✓
                        </span>
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-offwhite-border">
                  <Button
                    href="/capabilities"
                    variant="outline"
                    size="sm"
                    className="border-graphite text-graphite hover:bg-graphite hover:text-white"
                    withArrow
                  >
                    Explore All Capabilities
                  </Button>
                  <Button
                    onClick={() => openRFQ(`Processing Service: ${activeCap.title}`)}
                    variant="primary"
                    size="sm"
                    withExternalArrow
                  >
                    Request Processing Quote
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
