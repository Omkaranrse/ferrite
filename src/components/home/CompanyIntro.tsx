"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { History, MapPin, Layers, ShieldCheck, ArrowRight } from "lucide-react";

export default function CompanyIntro() {
  return (
    <section id="about" className="bg-[#111619] text-white py-16 sm:py-20 relative overflow-hidden border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column About Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Large Actual Ferrite Building Photograph with Rounded Corners */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0E1215] shadow-2xl group"
            >
              <Image
                src="/images/ferrite-stockyard-hero.png"
                alt="Actual Ferrite facility building and stockyard complex at Kalamboli, Navi Mumbai"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[62%_28%] brightness-[0.88] contrast-[1.06] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Vignette for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E11]/90 via-transparent to-[#0A0E11]/30 pointer-events-none" />

              {/* Facility Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#0A0E11]/90 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-copper inline-block animate-pulse" />
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-copper block font-semibold">
                      AUTHENTIC FERRITE FACILITY
                    </span>
                    <span className="text-xs font-heading font-bold text-white">
                      Kalamboli Stockyard &amp; Control Complex, Navi Mumbai
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#A9AFB2] hidden sm:inline-block">EST. 1965</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Company Introduction Content */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-copper block font-semibold">
                ABOUT FERRITE
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                A Legacy of Trust in <br />
                <span className="text-copper">Structural Steel</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#D4D8DC] leading-relaxed font-body">
              Ferrite Structural Steels Pvt. Ltd. is a steel stockist, manufacturer and supplier in
              Mumbai, with business roots dating to 1965. We supply angles, beams, channels, bars,
              pipes, sheets and plates, with cutting, shaping and custom sizing to your project
              requirements.
            </p>

            <p className="text-xs sm:text-sm text-[#A9AFB2] leading-relaxed font-body">
              From foundational beginnings under <strong>Payal Enterprises</strong> to our corporate
              rebranding in 2014 as <strong>Ferrite Structural Steels Pvt. Ltd.</strong>, we connect primary
              steel mills with infrastructure contractors, builders and fabrication shops nationwide.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-copper hover:bg-copper-hover text-white font-heading text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-copper/30 group"
              >
                <span>KNOW MORE ABOUT US</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section 10: Horizontal Four-Column Statistics Strip Below About */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1: 1965 */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#161A1D] border border-white/10 group hover:border-copper transition-colors">
              <div className="flex items-center justify-between text-copper mb-1.5">
                <History className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel">FOUNDATION</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                1965
              </div>
              <p className="text-xs text-[#A9AFB2] mt-1 leading-snug">
                Year of establishment under Payal Enterprises era.
              </p>
            </div>

            {/* Stat 2: Kalamboli */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#161A1D] border border-white/10 group hover:border-copper transition-colors">
              <div className="flex items-center justify-between text-copper mb-1.5">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel">STOCKYARD</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Kalamboli
              </div>
              <p className="text-xs text-[#A9AFB2] mt-1 leading-snug">
                Stockyard location &amp; material processing facility.
              </p>
            </div>

            {/* Stat 3: Ghatkopar */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#161A1D] border border-white/10 group hover:border-copper transition-colors">
              <div className="flex items-center justify-between text-copper mb-1.5">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel">COMMERCIAL</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ghatkopar
              </div>
              <p className="text-xs text-[#A9AFB2] mt-1 leading-snug">
                Commercial headquarters and estimation desk, Mumbai.
              </p>
            </div>

            {/* Stat 4: Quality Assured */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#161A1D] border border-white/10 group hover:border-copper transition-colors">
              <div className="flex items-center justify-between text-copper mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel">DOCUMENTATION</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Verified
              </div>
              <p className="text-xs text-[#A9AFB2] mt-1 leading-snug">
                Quality documentation &amp; Mill Test Certificates (MTC).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
