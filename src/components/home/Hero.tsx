"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, Shield } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import ArrowFillButton from "@/components/ui/ArrowFillButton";
import FluidGlassButton from "@/components/ui/FluidGlassButton";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100vh] min-h-[100svh] flex flex-col justify-between overflow-hidden transition-colors duration-300 select-none bg-[#0A0E11]" data-hero="true"
    >
      {/* Background Cinematic Visual — Real Ferrite Stockyard Photograph */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/ferrite-stockyard-hero.png"
          alt="Ferrite Structural Steels stockyard facility and processing complex at Kalamboli"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_55%] md:object-[60%_50%] brightness-[0.82] contrast-[1.05]"
        />

        {/* Localized Soft Text Mask — Strictly behind bottom-left content, leaving the rest natural */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 0% 100%, rgba(10,14,17,0.78) 0%, rgba(10,14,17,0.38) 50%, transparent 80%)",
          }}
        />

        {/* Ambient Top Vignette for Floating Navbar Legibility */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        {/* Bottom Fade for Clean Section Transition */}
        <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${isLight ? "from-[#F8FAFC] via-[#F8FAFC]/50" : "from-[#0A0E11] via-[#0A0E11]/40"} to-transparent pointer-events-none`} />
      </div>

      {/* Main Hero Content Area — Anchored at Bottom Left (Portfolio Style) */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-end pb-8 sm:pb-12 lg:pb-14 pt-32">
        <div className="max-w-xl sm:max-w-2xl space-y-3 sm:space-y-4">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center"
          >
            <div className="inline-flex items-center text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase font-semibold text-white [text-shadow:_0_0_12px_#000000,_0_2px_6px_rgba(0,0,0,0.95)]">
              <span className="w-1.5 h-3.5 bg-[#FF7A1A] rounded-full inline-block mr-2.5 shadow-[0_0_10px_#FF7A1A]" />
              <span>FERRITE STRUCTURAL STEELS PVT LTD</span>
            </div>
          </motion.div>

          {/* Main Headline — Premium Industrial Typography with Vibrant Orange Accent & Black Glow */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[2.15rem] sm:text-[2.85rem] lg:text-[3.4rem] xl:text-[3.85rem] font-extrabold tracking-[-0.035em] leading-[1.08] text-white [text-shadow:_0_0_24px_#000000,_0_0_48px_#000000,_0_2px_8px_#000000,_0_4px_16px_rgba(0,0,0,0.95)]"
          >
            Structural Steels{" "}
            <br className="hidden sm:block" />
            Manufacturer{" "}
            <br />
            &amp; Supplier in{" "}
            <span className="text-[#FF7A1A] [text-shadow:_0_0_24px_#000000,_0_0_40px_#000000,_0_2px_8px_#000000]">
              Mumbai, India
            </span>
          </motion.h1>

          {/* Credibility Stats Box with Frosted Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 w-full max-w-xl group bg-white/[0.07] hover:bg-white/[0.10] border border-white/[0.15] shadow-[0_12px_36px_0_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.15)]"
          >
            {/* Subtle Specular Top Highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center">
              {/* 59+ Experience */}
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 shrink-0 text-[#F4F3EF] stroke-[1.6]" />
                <div>
                  <div className="font-heading text-xl sm:text-2xl font-extrabold leading-tight text-white">
                    59+
                  </div>
                  <div className="text-xs sm:text-[13px] font-medium leading-tight text-[#C4C9CE]">
                    Years of Experience
                  </div>
                  <div className="text-[11px] sm:text-xs leading-tight text-[#8E959B]">
                    Since 1965
                  </div>
                </div>
              </div>

              {/* 1000+ Clients */}
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 shrink-0 text-[#F4F3EF] stroke-[1.6]" />
                <div>
                  <div className="font-heading text-xl sm:text-2xl font-extrabold leading-tight text-white">
                    1000+
                  </div>
                  <div className="text-xs sm:text-[13px] font-medium leading-tight text-[#C4C9CE]">
                    Happy Clients
                  </div>
                  <div className="text-[11px] sm:text-xs leading-tight text-[#8E959B]">
                    Across India
                  </div>
                </div>
              </div>

              {/* Quality */}
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 shrink-0 text-[#F4F3EF] stroke-[1.6]" />
                <div>
                  <div className="font-heading text-xl sm:text-2xl font-extrabold leading-tight text-white">
                    Quality
                  </div>
                  <div className="text-xs sm:text-[13px] font-medium leading-tight text-[#C4C9CE]">
                    Products as per IS,
                  </div>
                  <div className="text-[11px] sm:text-xs leading-tight text-[#8E959B]">
                    ASTM &amp; EN Standards
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dual Conversion CTA Row — Equal Width to Box Above */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1"
          >
            {/* Primary Orange ArrowFillButton Component */}
            <ArrowFillButton
              btnText="REQUEST A QUOTE"
              href={FERRITE_CONTACT.getWhatsAppUrl(
                "Hello Ferrite Team, I would like to request a quotation for structural steel."
              )}
              newTab={true}
              bgColor="#FF7A1A"
              textColor="#ffffff"
              fillBgColor="#ffffff"
              fillTextColor="#FF7A1A"
              hoverFillBgColor="#ffffff"
              hoverFillTextColor="#FF7A1A"
              arrowColor="#FF7A1A"
              hoverArrowColor="#FF7A1A"
              className="w-full justify-center"
              onClick={() =>
                trackEvent({
                  name: "whatsapp_click",
                  params: { location: "hero_primary_cta", message_type: "quote_request" },
                })
              }
            />

            {/* Secondary WhatsApp Button — WebGL Fluid Glass Button */}
            <FluidGlassButton
              text="Talk to Us"
              href={FERRITE_CONTACT.getWhatsAppUrl(
                "Hello Ferrite Team, I would like to talk to an expert."
              )}
              newTab={true}
              baseColor="#0B0F13"
              glassColor="#25D366"
              hoverSpeed={0.8}
              className="w-full"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                  className="text-[#25D366] transition-transform group-hover:scale-110"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              }
              onClick={() =>
                trackEvent({
                  name: "whatsapp_click",
                  params: { location: "hero_secondary_cta", message_type: "talk_to_us" },
                })
              }
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
