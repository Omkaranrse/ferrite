"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Factory, Wrench, Construction } from "lucide-react";

// Bridge outline icon SVG for Infrastructure & Engineering
function BridgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 18h18" />
      <path d="M5 18V9" />
      <path d="M19 18V9" />
      <path d="M5 9c4-4 10-4 14 0" />
      <path d="M9 11v7" />
      <path d="M15 11v7" />
      <path d="M2 18h20" />
    </svg>
  );
}

const INDUSTRIES = [
  {
    id: "construction",
    title: "Construction & Real Estate",
    icon: Building2,
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Engineering",
    icon: BridgeIcon,
  },
  {
    id: "industrial",
    title: "Industrial Projects",
    icon: Factory,
  },
  {
    id: "fabrication",
    title: "Fabrication & Manufacturing",
    icon: Wrench,
  },
  {
    id: "heavy-industries",
    title: "Heavy Industries",
    icon: Construction,
  },
];

export default function IndustriesGrid() {
  return (
    <section id="industries" className="py-6 sm:py-10 bg-[#0A0E11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F2EDE4] text-[#111827] rounded-xl sm:rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-mono font-semibold text-copper tracking-wider uppercase">
                — INDUSTRIES WE SERVE
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2rem] font-bold text-[#111827] leading-tight tracking-tight">
                Trusted by Key Infrastructure & Industrial Sectors
              </h2>
            </div>

            {/* Right 5-Column Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 text-center">
                {INDUSTRIES.map((ind, idx) => (
                  <motion.div
                    key={ind.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    className="flex flex-col items-center justify-start space-y-2.5 p-2 rounded-lg hover:bg-black/[0.04] transition-colors"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-[#111827]">
                      <ind.icon className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <span className="font-heading text-xs sm:text-xs font-bold text-[#111827] leading-snug">
                      {ind.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
