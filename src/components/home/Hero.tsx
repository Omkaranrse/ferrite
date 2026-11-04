"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ShieldCheck, Layers, ArrowUpRight, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRFQ } from "@/context/RFQContext";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const { openRFQ } = useRFQ();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Staggered architectural line reveal variants
  const lineVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (custom: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.9,
        delay: 0.1 + custom * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[660px] lg:h-[730px] xl:h-[760px] flex flex-col justify-between overflow-hidden bg-industrial-dark pt-28 sm:pt-32 pb-8 sm:pb-10 select-none"
    >
      {/* Background Cinematic Visual — Real Ferrite Stockyard Photograph */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      >
        <Image
          src="/images/ferrite-stockyard-hero.png"
          alt="Ferrite Structural Steels stockyard facility and processing complex at Kalamboli"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-[62%_center] brightness-[0.72] contrast-[1.08]"
        />

        {/* Cinematic Directional Gradient Overlay — Keeps Ferrite Building & Crane Visible While Giving Contrast to Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-dark/95 via-industrial-dark/80 to-industrial-dark/35 sm:to-industrial-dark/25 pointer-events-none" />

        {/* Ambient Top & Bottom Depth Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-transparent to-industrial-dark/75 pointer-events-none" />

        {/* Subtle Ambient Copper Glow on Accent Focus */}
        <div className="absolute -top-24 right-1/4 w-[480px] h-[480px] bg-copper/15 rounded-full blur-[140px] pointer-events-none" />
      </motion.div>

      {/* Main Hero Content Area */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-6 sm:py-10"
      >
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          {/* Eyebrow Label — Matches Industrial Badge Design */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-industrial-dark/85 border border-copper/50 text-xs font-mono font-semibold tracking-wider text-copper uppercase backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 bg-copper inline-block rounded-none animate-pulse" />
              <span>— STRUCTURAL STEEL SUPPLIER | EST. 1965</span>
            </div>
          </motion.div>

          {/* Headline with Ferrite Orange Highlight */}
          <div className="space-y-0.5 sm:space-y-1">
            <div className="overflow-hidden">
              <motion.h1
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white tracking-[-0.03em] leading-[1.08]"
              >
                Steel, prepared for
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                custom={2}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white tracking-[-0.03em] leading-[1.08]"
              >
                what <span className="text-copper">you build.</span>
              </motion.h1>
            </div>
          </div>

          {/* Supporting Copy */}
          <div className="overflow-hidden">
            <motion.p
              custom={3}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="text-sm sm:text-base md:text-lg text-steel-light max-w-2xl font-body leading-relaxed font-normal"
            >
              From structural steel supply to precision material processing, Ferrite delivers dependable
              steel solutions for construction, infrastructure, fabrication and industrial projects.
              Backed by a legacy dating to 1965, we combine extensive stockholding with cutting,
              shaping and custom sizing capabilities.
            </motion.p>
          </div>

          {/* Two Clean Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            {/* 1. Primary Orange Button: Request a Quote */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={FERRITE_CONTACT.getWhatsAppUrl(
                "Hello Ferrite Team, I would like to request a quotation for structural steel products."
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({
                  name: "whatsapp_click",
                  params: { location: "hero_primary_cta", message_type: "quote_request" },
                })
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-copper hover:bg-copper-hover text-white font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-copper/30 group"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            {/* 2. Secondary Outlined Button: Explore Our Capabilities */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                href="/capabilities"
                variant="outline"
                size="md"
                className="border-charcoal-border hover:border-white bg-industrial-dark/60 hover:bg-white/10 text-offwhite hover:text-white rounded-full px-6 py-3 text-xs sm:text-sm font-heading tracking-wider uppercase"
              >
                Explore Our Capabilities
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Trust Indicators — Horizontal Strip at Bottom */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-5 sm:pt-6 border-t border-charcoal-border/70"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Indicator 1: Since 1965 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-industrial-dark border border-charcoal-border flex items-center justify-center text-copper shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-heading font-bold text-xs sm:text-sm block">Since 1965</span>
              <span className="text-[11px] font-mono text-steel block">Industry experience</span>
            </div>
          </div>

          {/* Indicator 2: Kalamboli Yard */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-industrial-dark border border-charcoal-border flex items-center justify-center text-copper shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-heading font-bold text-xs sm:text-sm block">Kalamboli Yard</span>
              <span className="text-[11px] font-mono text-steel block">Stockyard & processing</span>
            </div>
          </div>

          {/* Indicator 3: Quality Assured */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-industrial-dark border border-charcoal-border flex items-center justify-center text-copper shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-heading font-bold text-xs sm:text-sm block">Quality Assured</span>
              <span className="text-[11px] font-mono text-steel block">Material documentation</span>
            </div>
          </div>

          {/* Indicator 4: Ghatkopar HQ */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-industrial-dark border border-charcoal-border flex items-center justify-center text-copper shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-heading font-bold text-xs sm:text-sm block">Ghatkopar HQ</span>
              <span className="text-[11px] font-mono text-steel block">Commercial desk (Mumbai)</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
