"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, HardHat, Warehouse, Factory, CheckCircle2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { industriesData } from "@/data/industries";
import { useRFQ } from "@/context/RFQContext";

export default function IndustriesGrid() {
  const { openRFQ } = useRFQ();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const icons = [Building2, HardHat, Warehouse, Factory];

  return (
    <section id="industries" className="bg-graphite-950 py-24 sm:py-36 relative text-offwhite border-t border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-24 pb-8 border-b border-charcoal-border">
          <div className="max-w-2xl space-y-4">
            <Badge variant="copper">05 / SECTORS & APPLICATIONS</Badge>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Supporting the industries <br />
              <span className="text-copper">that build tomorrow.</span>
            </h2>
            <p className="text-base sm:text-lg text-steel font-body max-w-xl leading-relaxed">
              From heavy infrastructure arteries to iconic skyscrapers, we engineer our supply
              chain around the demanding technical requirements of each sector.
            </p>
          </div>

          <div>
            <Button href="/industries" variant="outline" withArrow>
              Explore All Sectors
            </Button>
          </div>
        </div>

        {/* 2x2 High-Impact Editorial Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {industriesData.map((ind, idx) => {
            const Icon = icons[idx] || Building2;
            const isHovered = hoveredId === ind.id;

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-charcoal border border-charcoal-border hover:border-copper transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl"
              >
                {/* Visual Backdrop with Parallax Scale */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-graphite-950">
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 brightness-75 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

                  {/* Icon & Index Badge */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <div className="w-11 h-11 bg-graphite/90 backdrop-blur-sm border border-charcoal-border flex items-center justify-center text-copper">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-steel-light bg-graphite/90 px-3 py-1 border border-charcoal-border font-medium">
                      SECTOR 0{idx + 1}
                    </span>
                  </div>

                  {/* Title overlay on bottom of image */}
                  <div className="absolute bottom-5 left-6 right-6 z-10">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-copper transition-colors duration-300">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-copper font-medium mt-1">
                      {ind.tagline}
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-steel leading-relaxed font-body">
                    {ind.description}
                  </p>

                  {/* Challenges Solved Preview */}
                  <div className="space-y-2 pt-3 border-t border-charcoal-border/80">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-copper block font-semibold">
                      ENGINEERING FOCUS
                    </span>
                    <div className="text-xs text-steel-light flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                      <span>{ind.challengesSolved[0]}</span>
                    </div>
                  </div>

                  {/* Materials Supplied Tags */}
                  <div className="space-y-2 pt-2 border-t border-charcoal-border/80">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-steel block font-semibold">
                      SUPPLIED STRUCTURAL GRADES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.materialsSupplied.map((mat, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[11px] bg-graphite border border-charcoal-border text-steel-light font-mono"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 border-t border-charcoal-border flex items-center justify-between text-xs">
                    <Link
                      href={`/industries#${ind.id}`}
                      className="font-heading uppercase tracking-wider text-white hover:text-copper inline-flex items-center gap-1.5 transition-colors font-medium"
                    >
                      <span>Sector Specifications</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    <button
                      onClick={() => openRFQ(`Sector Requirement: ${ind.name}`)}
                      className="font-mono text-copper hover:text-white uppercase tracking-wider font-semibold underline underline-offset-4 transition-colors"
                    >
                      RFQ for this Sector
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
