"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Shield, Layers, ArrowUpRight, Activity } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useRFQ } from "@/context/RFQContext";

export default function Hero() {
  const { openRFQ } = useRFQ();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.16]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Staggered architectural line reveal variants
  const lineVariants = {
    hidden: { y: "120%", opacity: 0 },
    visible: (custom: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.95,
        delay: 0.12 + custom * 0.14,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-graphite pt-32 pb-10 sm:pb-14 select-none"
    >
      {/* Background Cinematic Visual with layered parallax & ambient breathing */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2560&q=90"
          alt="Heavy structural steel fabrication and warehouse complex"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.32] contrast-[1.18]"
        />

        {/* Ambient Molten Copper Glow (Architectural Industrial Ember) */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-copper/20 rounded-full blur-[140px] pointer-events-none animate-ember" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-copper/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite-950/80" />
      </motion.div>

      {/* Layered Architectural Grid Overlay (Independent Parallax) */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 z-[1] pointer-events-none bg-grid-pattern opacity-40 will-change-transform"
      />

      {/* Main Hero Content Area */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-8 sm:py-16"
      >
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Eyebrow with Live Facility Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3"
          >
            <Badge variant="copper">STRUCTURAL STEEL | EST. 1965</Badge>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-950/80 border border-charcoal-border backdrop-blur-sm text-[11px] font-mono text-steel">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none inline-block animate-ping" />
              <span>KALAMBOLI STOCKYARD: ACTIVE DISPATCH</span>
            </div>
          </motion.div>

          {/* Staggered Masked Headline */}
          <div className="space-y-1">
            <div className="overflow-hidden">
              <motion.h1
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-[-0.035em] leading-[1.02]"
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
                className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[1.02] text-transparent bg-clip-text bg-gradient-to-r from-white via-offwhite to-steel-light"
              >
                what you build.
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
              className="text-base sm:text-xl text-steel-light max-w-2xl font-body leading-relaxed font-normal"
            >
              Structural steel supply and material processing for construction, fabrication,
              infrastructure, and heavy industry. Business lineage dating back to 1965. Stockholding
              integrated with cutting, shaping, and custom sizing.
            </motion.p>
          </div>

          {/* CTAs with Staggered Entrance and Micro-Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-3"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                href="/capabilities"
                variant="outline"
                size="lg"
                withArrow
                className="border-steel-muted/80 text-white hover:border-white hover:bg-white/5"
              >
                Explore Our Capabilities
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => openRFQ()}
                variant="primary"
                size="lg"
                withExternalArrow
              >
                Request a Quote
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar: Operational Metadata & Animated Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-8 border-t border-charcoal-border/70 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        {/* Left: Location & Scope Markers */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-6 sm:gap-10 text-xs text-steel">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-copper shrink-0" />
            <div>
              <span className="text-white font-medium block">Ghatkopar HQ</span>
              <span className="text-[10px] font-mono text-steel">Commercial Desk (Mumbai)</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-6 bg-charcoal-border" />

          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-copper shrink-0" />
            <div>
              <span className="text-white font-medium block">Kalamboli Yard</span>
              <span className="text-[10px] font-mono text-steel">Stock & Processing Complex</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-6 bg-charcoal-border" />

          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-copper shrink-0" />
            <div>
              <span className="text-white font-medium block">100% Traceability</span>
              <span className="text-[10px] font-mono text-steel">Mill Test Certificates (MTC)</span>
            </div>
          </div>
        </div>

        {/* Right: Engineered Precision Scroll Indicator */}
        <motion.a
          whileHover={{ y: 2 }}
          href="#introduction"
          className="inline-flex items-center gap-3 text-xs uppercase font-mono tracking-widest text-steel hover:text-white transition-colors group select-none self-start md:self-auto cursor-pointer"
        >
          <span className="text-[11px] tracking-[0.16em]">SCROLL TO EXPLORE</span>
          <div className="w-5 h-9 border border-charcoal-border group-hover:border-copper group-hover:shadow-[0_0_12px_rgba(196,122,72,0.35)] rounded-full flex items-start justify-center p-1 transition-all duration-300">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-2 bg-copper rounded-full shadow-[0_0_6px_#C47A48]"
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
