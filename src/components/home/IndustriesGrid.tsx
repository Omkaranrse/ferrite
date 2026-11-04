"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, HardHat, Factory, Wrench, Layers, ArrowRight } from "lucide-react";

const INDUSTRIES = [
  {
    id: "construction-real-estate",
    name: "Construction & Real Estate",
    description: "Commercial towers, residential high-rises and pre-engineered warehouses.",
    icon: Building2,
  },
  {
    id: "infrastructure-engineering",
    name: "Infrastructure & Engineering",
    description: "Highway flyovers, rail over-bridges (ROB) and elevated metro viaducts.",
    icon: HardHat,
  },
  {
    id: "industrial-projects",
    name: "Industrial Projects",
    description: "Refineries, power complexes, chemical plants and industrial processing skids.",
    icon: Factory,
  },
  {
    id: "fabrication-manufacturing",
    name: "Fabrication & Manufacturing",
    description: "Structural steel fabricators, PEB manufacturers and machinery OEMs.",
    icon: Wrench,
  },
  {
    id: "heavy-industries",
    name: "Heavy Industries",
    description: "Material handling gantries, mining conveyors, ports and marine structures.",
    icon: Layers,
  },
];

export default function IndustriesGrid() {
  return (
    <section id="industries" className="bg-[#F5F3EF] text-[#17191B] py-16 sm:py-20 relative overflow-hidden border-y border-[#DDD9CE]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#DDD9CE]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-copper block font-semibold mb-1">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#17191B]">
              Trusted by Key Infrastructure & Industrial Sectors
            </h2>
          </div>

          <Link
            href="/industries"
            className="text-xs font-heading font-semibold uppercase tracking-wider text-copper hover:text-[#17191B] transition-colors inline-flex items-center gap-1.5 shrink-0 group self-start sm:self-auto"
          >
            <span>EXPLORE ALL SECTORS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Categories Displayed Horizontally on Desktop in One Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                whileHover={{ y: -4 }}
                className="group bg-white border border-[#DDD9CE] hover:border-copper rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Black Outline Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#F5F3EF] border border-[#DDD9CE] flex items-center justify-center text-[#17191B] group-hover:border-copper group-hover:text-copper transition-colors mb-3.5">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-sm font-bold text-[#17191B] group-hover:text-copper transition-colors leading-snug">
                    {ind.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#555C61] mt-1.5 leading-relaxed font-body">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#EAE6DD]">
                  <Link
                    href={`/industries#${ind.id}`}
                    className="text-[11px] font-heading font-semibold uppercase tracking-wider text-copper group-hover:text-[#17191B] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Sector Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
