"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { History, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatCounter from "@/components/ui/StatCounter";

export default function CompanyIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="introduction"
      ref={sectionRef}
      className="bg-offwhite text-graphite py-24 sm:py-36 relative overflow-hidden bg-grid-pattern-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Strip */}
        <div className="flex items-center justify-between border-b border-offwhite-border pb-6 mb-12 sm:mb-20">
          <Badge variant="light" className="text-graphite font-bold">
            01 / COMPANY INTRODUCTION
          </Badge>
          <span className="text-xs font-mono tracking-widest text-steel-dark uppercase hidden sm:inline-block">
            MUMBAI • NAVI MUMBAI • PAN-INDIA
          </span>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Narrative & Typography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-copper block font-semibold">
                SIX DECADES OF STRUCTURAL PEDIGREE
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-graphite leading-[1.06]"
              >
                Built on experience. <br />
                <span className="text-copper">Driven by precision.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="text-lg sm:text-xl text-steel-dark leading-relaxed font-body max-w-2xl font-normal"
            >
              With a business lineage dating back to 1965, Ferrite Structural Steels has evolved
              into a structural steel supply and material-processing partner for businesses across
              India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="text-sm sm:text-base text-steel-dark/90 leading-relaxed space-y-4 border-l-2 border-copper/60 pl-6 max-w-2xl"
            >
              <p>
                From foundational beginnings as <strong>Payal Enterprises Pvt. Ltd.</strong> to our
                strategic restructuring as <strong>Ferrite Structural Steels Pvt. Ltd.</strong> in 2014,
                our focus has remained constant: ensuring steel arrives prepared for its exact
                structural purpose.
              </p>
              <p>
                We integrate stockholding at our Kalamboli yard with precision bandsaw cutting,
                plate profiling, and commercial coordination from our Ghatkopar headquarters —
                giving builders and fabricators a single accountable supply chain.
              </p>
            </motion.div>

            {/* Prominent Animated Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-offwhite-border max-w-2xl"
            >
              {/* Stat 1: 1965 */}
              <div className="bg-white p-6 sm:p-7 border border-offwhite-border shadow-sm group hover:border-copper transition-all duration-300">
                <div className="flex items-center justify-between text-copper mb-3">
                  <History className="w-5 h-5" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-steel-dark font-medium">
                    ORIGIN
                  </span>
                </div>
                <div className="font-heading text-4xl sm:text-5xl font-bold text-graphite tracking-tight">
                  <StatCounter value={1965} duration={1800} />
                </div>
                <div className="text-xs sm:text-sm font-heading font-medium text-steel-dark mt-2.5 leading-snug">
                  Business lineage begins as Payal Enterprises. Over 59 years of steel market leadership.
                </div>
              </div>

              {/* Stat 2: 2014 */}
              <div className="bg-white p-6 sm:p-7 border border-offwhite-border shadow-sm group hover:border-copper transition-all duration-300">
                <div className="flex items-center justify-between text-copper mb-3">
                  <Award className="w-5 h-5" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-steel-dark font-medium">
                    EXPANSION
                  </span>
                </div>
                <div className="font-heading text-4xl sm:text-5xl font-bold text-graphite tracking-tight">
                  <StatCounter value={2014} duration={1800} />
                </div>
                <div className="text-xs sm:text-sm font-heading font-medium text-steel-dark mt-2.5 leading-snug">
                  Ferrite Structural Steels established under current name to scale modern material processing.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="pt-3 flex flex-wrap items-center gap-4"
            >
              <Button href="/about" variant="primary" withArrow>
                Discover Our Heritage & Team
              </Button>
              <Button href="/contact" variant="outline" className="border-graphite text-graphite hover:bg-graphite hover:text-white">
                Contact Commercial Desk
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Industrial Photography with Reveal Effects & Parallax */}
          <div ref={imageContainerRef} className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl bg-charcoal border border-offwhite-border"
            >
              <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                <Image
                  src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1400&q=85"
                  alt="Ferrite Structural Steels warehouse handling and precision material preparation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-graphite/95 via-graphite/30 to-transparent" />

              {/* Overlay Badge Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 bg-graphite/95 backdrop-blur-md border border-charcoal-border text-white">
                <div className="flex items-center gap-2 mb-2 text-copper text-xs font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>QUALITY ASSURANCE</span>
                </div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                  Mill Test Certified Traceability
                </h4>
                <p className="text-xs text-steel-light mt-1.5 leading-relaxed">
                  Every structural batch is verified against IS 2062, ASTM, and EN standards with
                  matching heat numbers.
                </p>
              </div>
            </motion.div>

            {/* Secondary Floating Architectural Metric Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block absolute -top-6 -right-6 bg-white p-6 border border-offwhite-border shadow-xl max-w-[220px]"
            >
              <div className="font-heading font-bold text-3xl text-copper">
                100%
              </div>
              <div className="text-xs font-heading font-semibold text-graphite uppercase mt-1">
                Batch Verification
              </div>
              <div className="text-[11px] text-steel-dark mt-1 leading-normal">
                Physical, chemical & ultrasonic conformity before dispatch.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
