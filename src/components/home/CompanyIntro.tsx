"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { History, MapPin, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CompanyIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-charcoal text-offwhite py-20 sm:py-28 relative overflow-hidden border-t border-charcoal-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Split Grid: Left = Genuine Ferrite Building Image, Right = Company Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Genuine Ferrite Facility Building Photograph */}
          <div ref={imageContainerRef} className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden border border-charcoal-border bg-industrial-dark shadow-2xl group"
            >
              <motion.div style={{ y: imageY }} className="absolute inset-0 scale-105 will-change-transform">
                <Image
                  src="/images/ferrite-stockyard-hero.png"
                  alt="Authentic Ferrite facility building and stockyard complex at Kalamboli, Navi Mumbai"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[62%_28%] brightness-[0.88] contrast-[1.08] transition-all duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Gradient Vignette for Photographic Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark/90 via-transparent to-industrial-dark/30 pointer-events-none" />

              {/* Genuine Facility Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 bg-industrial-dark/90 backdrop-blur-md border border-charcoal-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-copper inline-block animate-pulse" />
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-copper block font-semibold">
                      AUTHENTIC FERRITE FACILITY
                    </span>
                    <span className="text-xs font-heading font-bold text-white">
                      Kalamboli Stockyard & Control Complex, Navi Mumbai
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-steel hidden sm:inline-block">EST. 1965</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Company Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-dark border border-charcoal-border text-[11px] font-mono text-copper uppercase tracking-wider font-semibold">
                <span>ABOUT FERRITE</span>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]"
              >
                A Legacy of Trust in <br />
                <span className="text-copper">Structural Steel</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="text-base sm:text-lg text-steel-light leading-relaxed font-body font-normal"
            >
              Ferrite Structural Steels Pvt. Ltd. is a steel stockist, manufacturer and supplier in
              Mumbai, with business roots dating to 1965. We supply structural steel products and
              support industrial buyers with material processing and custom requirements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="text-xs sm:text-sm text-steel leading-relaxed space-y-3 border-l-2 border-copper/60 pl-5"
            >
              <p>
                From foundational origins as <strong>Payal Enterprises</strong> to our strategic corporate
                rebranding as <strong>Ferrite Structural Steels Pvt. Ltd.</strong> in 2014, our dedication
                has remained unchanged: delivering certified, reliable steel prepared for what you build.
              </p>
              <p>
                By linking stockholding at our Kalamboli yard with industrial bandsaw cutting, CNC plate
                profiling, and commercial coordination from our Ghatkopar headquarters, we offer project
                teams nationwide single-source accountability.
              </p>
            </motion.div>

            {/* CTA: KNOW MORE ABOUT US → */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-2"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-copper hover:bg-copper-hover text-white font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-copper/30 group"
              >
                <span>KNOW MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Section 9: Verified Horizontal Company Statistics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-16 sm:mt-20 pt-10 border-t border-charcoal-border/80"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1: 1965 */}
            <div className="p-5 sm:p-6 bg-industrial-dark border border-charcoal-border group hover:border-copper transition-colors">
              <div className="flex items-center justify-between text-copper mb-2">
                <History className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel">FOUNDATION</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                1965
              </div>
              <p className="text-xs text-steel mt-1 leading-snug">
                Lineage established under Payal Enterprises era.
              </p>
            </div>

            {/* Stat 2: Kalamboli Yard */}
            <div className="p-5 sm:p-6 bg-industrial-dark border border-charcoal-border group hover:border-copper transition-colors">
              <div className="flex items-center justify-between text-copper mb-2">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel">STOCKYARD</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Kalamboli
              </div>
              <p className="text-xs text-steel mt-1 leading-snug">
                Material handling complex & overhead cranes in Navi Mumbai.
              </p>
            </div>

            {/* Stat 3: Ghatkopar HQ */}
            <div className="p-5 sm:p-6 bg-industrial-dark border border-charcoal-border group hover:border-copper transition-colors">
              <div className="flex items-center justify-between text-copper mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel">COMMERCIAL</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ghatkopar
              </div>
              <p className="text-xs text-steel mt-1 leading-snug">
                Commercial desk and estimation headquarters in Mumbai.
              </p>
            </div>

            {/* Stat 4: 100% Quality Assured */}
            <div className="p-5 sm:p-6 bg-industrial-dark border border-charcoal-border group hover:border-copper transition-colors">
              <div className="flex items-center justify-between text-copper mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel">TRACEABILITY</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                100% MTC
              </div>
              <p className="text-xs text-steel mt-1 leading-snug">
                Every dispatch accompanied by primary mill test documentation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
