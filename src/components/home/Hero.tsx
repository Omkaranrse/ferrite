"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Layers, ArrowUpRight, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Line mask reveal animation variants for text
  const lineVariants = {
    hidden: { y: "115%", opacity: 0 },
    visible: (custom: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        delay: 0.1 + custom * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100vh] min-h-[100svh] lg:h-[100svh] flex flex-col justify-between overflow-hidden bg-[#0A0E11] select-none"
    >
      {/* Background Cinematic Visual — Real Ferrite Stockyard Photograph (Full Coverage, Natural & Unmasked) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/ferrite-stockyard-hero.png"
          alt="Ferrite Structural Steels stockyard facility and processing complex at Kalamboli"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_55%] md:object-[60%_55%] brightness-[0.92] contrast-[1.04]"
        />

        {/* Ambient Top Vignette for Floating Navbar Legibility */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0E11]/60 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center pt-28 sm:pt-32 lg:pt-[16vh] pb-10 sm:pb-12">
        <div className="relative max-w-[620px] space-y-4 sm:space-y-5">
          {/* Contrast Mask Applied Strictly to Text Area Only */}
          <div
            className="absolute -inset-4 sm:-inset-8 -z-10 rounded-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 40% 45%, rgba(10,14,17,0.78) 0%, rgba(10,14,17,0.52) 55%, transparent 100%)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />
          {/* Eyebrow Label with Mask Reveal */}
          <div className="overflow-hidden">
            <motion.div
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A0E11]/80 border border-copper/50 rounded-sm text-xs font-mono font-semibold tracking-wider text-copper uppercase backdrop-blur-sm shadow-sm">
                <span className="w-1.5 h-1.5 bg-copper inline-block rounded-none animate-pulse" />
                <span>— STRUCTURAL STEEL SUPPLIER | EST. 1965</span>
              </div>
            </motion.div>
          </div>

          {/* Main Headline with Text Mask Reveal */}
          <div className="space-y-0.5 sm:space-y-1">
            <div className="overflow-hidden">
              <motion.h1
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-bold text-white tracking-[-0.03em] leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
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
                className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-bold text-white tracking-[-0.03em] leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
              >
                what <span className="text-copper">you build.</span>
              </motion.h1>
            </div>
          </div>

          {/* Supporting Copy with Text Mask Reveal */}
          <div className="overflow-hidden">
            <motion.p
              custom={3}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="text-sm sm:text-base text-[#CBD5E1] max-w-[580px] font-body leading-relaxed font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]"
            >
              From structural steel supply to precision material processing, Ferrite delivers dependable
              steel solutions for construction, infrastructure, fabrication and industrial projects.
              Backed by a legacy dating to 1965, we combine extensive stockholding with cutting,
              shaping and custom sizing capabilities.
            </motion.p>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Primary Orange Button */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={FERRITE_CONTACT.getWhatsAppUrl(
                "Hello Ferrite Team, I would like to request a quotation for structural steel."
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({
                  name: "whatsapp_click",
                  params: { location: "hero_primary_cta", message_type: "quote_request" },
                })
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-copper hover:bg-copper-hover text-white font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-lg hover:shadow-copper/30 group"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            {/* Secondary Outlined Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                href="/capabilities"
                variant="outline"
                size="md"
                className="border-white/20 hover:border-white bg-[#0A0E11]/60 hover:bg-white/10 text-white rounded-full px-6 py-3 text-xs sm:text-sm font-heading tracking-wider uppercase"
              >
                Explore Our Capabilities
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Trust Indicators — Anchored at Bottom Across Desktop */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#0A0E11]/85 backdrop-blur-sm">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4.5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
            {/* Item 1: Since 1965 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-copper shrink-0" />
                <div>
                  <span className="text-white font-heading font-bold text-xs sm:text-sm block">Since 1965</span>
                  <span className="text-[11px] font-body text-[#A9AFB2] block">Industry experience</span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10 hidden lg:block mr-2" />
            </div>

            {/* Item 2: Kalamboli Yard */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-copper shrink-0" />
                <div>
                  <span className="text-white font-heading font-bold text-xs sm:text-sm block">Kalamboli Yard</span>
                  <span className="text-[11px] font-body text-[#A9AFB2] block">Stockyard & processing</span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10 hidden lg:block mr-2" />
            </div>

            {/* Item 3: Quality Assured */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-copper shrink-0" />
                <div>
                  <span className="text-white font-heading font-bold text-xs sm:text-sm block">Quality Assured</span>
                  <span className="text-[11px] font-body text-[#A9AFB2] block">Material documentation</span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10 hidden lg:block mr-2" />
            </div>

            {/* Item 4: Ghatkopar HQ */}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-copper shrink-0" />
              <div>
                <span className="text-white font-heading font-bold text-xs sm:text-sm block">Ghatkopar HQ</span>
                <span className="text-[11px] font-body text-[#A9AFB2] block">Commercial desk (Mumbai)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
