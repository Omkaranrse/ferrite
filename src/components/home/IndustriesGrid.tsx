"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, HardHat, Factory, Wrench, Layers, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";

const INDUSTRIES = [
  {
    id: "construction-real-estate",
    number: "01",
    name: "Construction & Real Estate",
    tagline: "Commercial towers, residential high-rises & PEB warehouses",
    description: "Certified beams, columns, and ductile rebars engineered for high seismic integrity and strict erection schedules.",
    icon: Building2,
    materials: "Universal Beams, Heavy Columns, Fe 500D Rebars",
  },
  {
    id: "infrastructure-engineering",
    number: "02",
    name: "Infrastructure & Engineering",
    tagline: "Highway flyovers, railway bridges & metro viaducts",
    description: "Heavy structural plates with ultrasonic testing (UT) and Charpy impact compliance for national transport corridors.",
    icon: HardHat,
    materials: "IS 2062 E350 Plates, Parallel Flange Beams",
  },
  {
    id: "industrial-projects",
    number: "03",
    name: "Industrial Projects",
    tagline: "Refineries, power complexes & chemical processing plants",
    description: "Tough structural channels, heavy plates, and seamless conduit pipes built for corrosive operating environments.",
    icon: Factory,
    materials: "Boiler Quality Plates, ISMC Channels, SHS/RHS",
  },
  {
    id: "fabrication-manufacturing",
    number: "04",
    name: "Fabrication & Manufacturing",
    tagline: "Steel fabricators, PEB plants & industrial machinery OEMs",
    description: "Custom cut-to-length beams, compound miter-sawed sections, and CNC plasma-cut base plates ready for assembly.",
    icon: Wrench,
    materials: "Cut Bandsaw Sections, Profiled Gussets, Flats",
  },
  {
    id: "heavy-industries",
    number: "05",
    name: "Heavy Industries",
    tagline: "Material handling gantries, mining conveyors & ports",
    description: "High-tonnage load-bearing profiles and wear-resistant steel members for continuous 24/7 industrial duty.",
    icon: Layers,
    materials: "Heavy Column Joists, Chequered Deck Plates",
  },
];

export default function IndustriesGrid() {
  return (
    <section id="industries" className="bg-offwhite text-graphite py-20 sm:py-28 relative overflow-hidden border-t border-offwhite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-offwhite-border">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-offwhite-border text-[11px] font-mono text-copper uppercase tracking-wider font-semibold shadow-xs">
              <span>INDUSTRIES WE SERVE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-graphite leading-[1.1]">
              Trusted by Key Infrastructure & <br className="hidden sm:inline" />
              <span className="text-copper">Industrial Sectors</span>
            </h2>
            <p className="text-sm sm:text-base text-steel-dark max-w-xl font-body leading-relaxed">
              We align rolling stock, cutting schedules, and quality documentation around the
              specialized engineering requirements of each sector.
            </p>
          </div>

          <div>
            <Button
              href="/industries"
              variant="outline"
              withArrow
              className="border-graphite text-graphite hover:bg-graphite hover:text-white"
            >
              Explore All Sectors
            </Button>
          </div>
        </div>

        {/* 5 Industry Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group bg-white border border-offwhite-border hover:border-copper p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-offwhite border border-offwhite-border flex items-center justify-center text-copper group-hover:bg-copper group-hover:text-white group-hover:border-copper transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-steel-dark group-hover:text-copper transition-colors">
                      {ind.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="font-heading text-lg font-bold text-graphite group-hover:text-copper transition-colors leading-snug">
                      {ind.name}
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-copper font-medium">
                      {ind.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-steel-dark leading-relaxed font-body">
                    {ind.description}
                  </p>
                </div>

                {/* Footer: Key Materials & Link */}
                <div className="pt-4 mt-4 border-t border-offwhite-border space-y-2">
                  <div className="text-[10px] font-mono uppercase text-steel-dark">
                    <span className="font-semibold text-graphite">Supplied: </span>
                    <span>{ind.materials}</span>
                  </div>

                  <Link
                    href={`/industries#${ind.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-heading font-semibold uppercase tracking-wider text-copper group-hover:text-graphite transition-colors pt-1"
                  >
                    <span>Sector Details</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
