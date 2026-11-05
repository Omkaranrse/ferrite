"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Layers, Users, ShieldCheck, ArrowRight } from "lucide-react";

const STATS = [
  {
    id: "established",
    value: "1965",
    label: "Year of Establishment",
    icon: Calendar,
  },
  {
    id: "capacity",
    value: "10,000+ MT",
    label: "Stocking Capacity",
    icon: Layers,
  },
  {
    id: "projects",
    value: "500+",
    label: "Projects Supplied",
    icon: Users,
  },
  {
    id: "traceability",
    value: "100%",
    label: "Material Traceability",
    icon: ShieldCheck,
  },
];

export default function CompanyIntro() {
  return (
    <section id="about" className="bg-[#0A0E11] py-16 sm:py-24 relative text-offwhite border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split: Building Visual + Brand Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Ferrite Facility Photograph */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#12181D] shadow-2xl group"
            >
              <Image
                src="/images/ferrite-building.jpg"
                alt="Ferrite Structural Steels headquarters and commercial operations facility"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div className="text-xs font-mono font-medium text-copper tracking-wider uppercase">
              — ABOUT FERRITE
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              A Legacy of Trust in Structural Steel
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] font-body leading-relaxed">
              Ferrite Structural Steels Pvt. Ltd. is a steel stockist, manufacturer and supplier in Mumbai,
              with business roots dating to 1965. We supply angles, beams, channels, bars, pipes, sheets
              and plates, with cutting, shaping and custom sizing to your project requirements.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-copper hover:text-copper-hover transition-colors group"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Stats Row */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-lg bg-copper/10 border border-copper/20 flex items-center justify-center text-copper shrink-0 group-hover:bg-copper group-hover:text-white transition-all">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#9CA3AF] font-body">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
