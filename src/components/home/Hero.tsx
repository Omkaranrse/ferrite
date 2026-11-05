"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100vh] min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#0A0E11] select-none"
    >
      {/* Background Cinematic Visual — Real Ferrite Stockyard Photograph */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/ferrite-stockyard-hero.png"
          alt="Ferrite Structural Steels stockyard facility and processing complex at Kalamboli"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_55%] md:object-[60%_50%] brightness-[0.75] contrast-[1.08]"
        />

        {/* Directional Gradient Scrim — Guarantees high text contrast on the left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,14,17,0.94) 0%, rgba(10,14,17,0.82) 42%, rgba(10,14,17,0.40) 70%, rgba(10,14,17,0.18) 100%)",
          }}
        />

        {/* Ambient Top Vignette for Floating Navbar Legibility */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0E11]/70 to-transparent pointer-events-none" />

        {/* Bottom Fade for Clean Section Transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0E11] via-[#0A0E11]/60 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content Area — Dual Column Layout */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center pt-28 sm:pt-32 lg:pt-[12vh] pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Narrative & Primary CTAs */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center"
            >
              <div className="inline-flex items-center text-[10px] sm:text-xs font-mono tracking-[0.22em] text-white/85 uppercase font-medium">
                <span className="w-1 h-4 bg-copper rounded-sm inline-block mr-2.5" />
                <span>ABOUT FERRITE STRUCTURAL STEELS</span>
              </div>
            </motion.div>

            {/* Main Headline — Premium Industrial Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[2rem] sm:text-[2.65rem] lg:text-[3.2rem] xl:text-[3.75rem] font-extrabold text-white tracking-[-0.035em] leading-[1.08] [text-shadow:_0_2px_16px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.5)]"
            >
              Structural Steels{" "}
              <br className="hidden sm:block" />
              Manufacturer{" "}
              <br />
              &amp; Supplier in{" "}
              <span className="text-copper bg-gradient-to-r from-copper to-copper-light bg-clip-text text-transparent">
                Mumbai, India
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#B0B8C1] font-body leading-[1.75] max-w-lg [text-shadow:_0_1px_8px_rgba(0,0,0,0.9)]"
            >
              Ferrite Structural Steels Pvt. Ltd. is a steel stockist, manufacturer and supplier in Mumbai,
              with business roots dating to 1965. We supply angles, beams, channels, bars, pipes, sheets
              and plates, with cutting, shaping and sizing to your requirements. Our Ghatkopar office and
              Kalamboli facility support contractors, fabricators and industrial buyers across India.
            </motion.p>

            {/* Dual Conversion CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {/* Primary Orange Button */}
              <a
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
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-copper to-copper-light hover:from-copper-hover hover:to-copper text-white font-heading text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase transition-all duration-300 shadow-[0_4px_24px_rgba(200,121,64,0.35)] hover:shadow-[0_6px_32px_rgba(200,121,64,0.5)] group"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Secondary WhatsApp "Talk to Us" Button */}
              <a
                href={FERRITE_CONTACT.getWhatsAppUrl("Hello Ferrite Team, I would like to talk to an expert.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { location: "hero_secondary_cta", message_type: "talk_to_us" },
                  })
                }
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/20 hover:border-[#25D366]/60 bg-white/[0.04] hover:bg-white/[0.08] text-white font-heading text-xs sm:text-[13px] font-bold tracking-[0.08em] transition-all duration-300 shadow-md group backdrop-blur-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="text-[#25D366] group-hover:scale-110 transition-transform"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Talk to Us</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Featured Facility Card & Floating Stats */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Featured Facility Card with Animated Molten Fire Border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl group"
            >
              {/* Animated Fire / Molten Border Wrapper */}
              <div className="absolute -inset-[2px] rounded-2xl sm:rounded-3xl fire-border-glow overflow-hidden">
                <div className="fire-border-rotate absolute inset-0" />
              </div>

              {/* Inner Card Container */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#12181D] z-[1]">
                <Image
                  src="/images/ferrite-building.jpg"
                  alt="Ferrite Structural Steels commercial headquarters and facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Ambient Glow Behind Card */}
              <div className="absolute -inset-4 rounded-3xl bg-copper/[0.08] blur-2xl pointer-events-none animate-ember z-0" />
            </motion.div>

            {/* Floating Credibility / Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative -mt-7 sm:-mt-9 z-20 mx-auto w-[94%] sm:w-[96%] bg-[#0D1115]/95 border border-white/[0.08] rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.9),_0_0_24px_rgba(200,121,64,0.12)]"
            >
              {/* Subtle Top Accent Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06] gap-3 sm:gap-2">
                {/* Stat 1: 59+ Years of Experience */}
                <div className="flex items-center gap-3 sm:pr-2 pt-1 sm:pt-0">
                  <div className="w-9 h-9 rounded-xl bg-copper/10 border border-copper/25 flex items-center justify-center text-copper shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-heading text-lg sm:text-xl font-extrabold text-white tracking-tighter leading-none mb-0.5">
                      59+
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] font-medium leading-tight">
                      Years of Experience
                    </div>
                  </div>
                </div>

                {/* Stat 2: 1000+ Happy Clients */}
                <div className="flex items-center gap-3 sm:px-3 pt-2 sm:pt-0">
                  <div className="w-9 h-9 rounded-xl bg-copper/10 border border-copper/25 flex items-center justify-center text-copper shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-heading text-lg sm:text-xl font-extrabold text-white tracking-tighter leading-none mb-0.5">
                      1000+
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] font-medium leading-tight">
                      Happy Clients
                    </div>
                  </div>
                </div>

                {/* Stat 3: Quality Standards */}
                <div className="flex items-center gap-3 sm:pl-3 pt-2 sm:pt-0">
                  <div className="w-9 h-9 rounded-xl bg-copper/10 border border-copper/25 flex items-center justify-center text-copper shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-heading text-lg sm:text-xl font-extrabold text-white tracking-tighter leading-none mb-0.5">
                      Quality
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] font-medium leading-tight">
                      IS, ASTM &amp; EN Standards
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
