"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, Flame, Maximize2, Warehouse, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRFQ } from "@/context/RFQContext";

const CAPABILITIES = [
  {
    id: "cutting",
    number: "01",
    title: "Cutting",
    tagline: "Precision cutting to size",
    description:
      "Semi-automatic bandsawing and cold sawing capable of ±1.0 mm linear tolerance, square 90° cuts, and compound miter sawing up to 60° to eliminate on-site cutting scrap.",
    icon: Scissors,
    highlights: ["±1.0 mm linear accuracy", "Miter cuts up to 60°", "Burr-free cold saw finish"],
  },
  {
    id: "shaping",
    number: "02",
    title: "Shaping",
    tagline: "Bending, forming and profiling",
    description:
      "Multi-torch computerized CNC flame cutting and high-definition plasma profiling to shape plates into custom base plates, stiffeners, gussets, and pre-weld bevels.",
    icon: Flame,
    highlights: ["Plates up to 120 mm thickness", "V, X, and K weld bevels", "CAD/DXF direct nesting"],
  },
  {
    id: "sizing",
    number: "03",
    title: "Sizing",
    tagline: "Custom sizes and lengths",
    description:
      "Custom length sizing, hydraulic roller leveling to remove residual mill waviness, and surface blast cleaning to Swedish SA 2.5 with protective primer coating.",
    icon: Maximize2,
    highlights: ["Hydraulic plate leveling", "Shot blasting to SA 2.5", "Protective shop primer"],
  },
  {
    id: "stockholding",
    number: "04",
    title: "Stockholding",
    tagline: "Wide range and ready availability",
    description:
      "Multi-acre stockholding at Kalamboli Warehousing Complex with rolling buffer inventory across beams, channels, angles, plates, and pipes backed by 20-ton overhead cranes.",
    icon: Warehouse,
    highlights: ["Buffer stock in Kalamboli", "20-ton crane handling", "100% MTC heat traceability"],
  },
];

export default function Capabilities() {
  const { openRFQ } = useRFQ();

  return (
    <section id="capabilities" className="bg-charcoal py-20 sm:py-28 relative text-offwhite border-t border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-10 border-b border-charcoal-border">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-dark border border-charcoal-border text-[11px] font-mono text-copper uppercase tracking-wider">
              <span>OUR CAPABILITIES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              More Than Supply. <br className="hidden sm:inline" />
              <span className="text-copper">Built for Projects.</span>
            </h2>
            <p className="text-sm sm:text-base text-steel max-w-xl font-body leading-relaxed">
              We combine stockholding with cutting, shaping, and sizing so steel arrives prepared for
              its structural purpose — eliminating site bottlenecks and fabrication scrap.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="/capabilities" variant="outline" withArrow>
              Explore Full Capabilities
            </Button>
            <Button onClick={() => openRFQ()} variant="primary" withExternalArrow>
              Discuss Processing
            </Button>
          </div>
        </div>

        {/* 4 Minimal Bordered Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="group relative bg-industrial-dark border border-charcoal-border hover:border-copper p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-lg"
              >
                <div className="space-y-5">
                  {/* Top Bar: Icon + Pillar Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-charcoal border border-charcoal-border flex items-center justify-center text-copper group-hover:border-copper group-hover:bg-copper group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-steel group-hover:text-copper transition-colors">
                      {cap.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-copper transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-copper font-medium">
                      {cap.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-steel-light leading-relaxed font-body">
                    {cap.description}
                  </p>

                  {/* Technical Highlights */}
                  <ul className="pt-3 border-t border-charcoal-border/70 space-y-2">
                    {cap.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[11px] text-steel">
                        <CheckCircle2 className="w-3.5 h-3.5 text-copper shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-6 mt-6 border-t border-charcoal-border/50">
                  <Link
                    href={`/capabilities#${cap.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-copper group-hover:text-white transition-colors"
                  >
                    <span>View Technical Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
