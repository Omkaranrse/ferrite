"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Precision SVG Icons matching the reference design
const DraftingCompassIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-[#FF7A1A]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v3" />
    <path d="M7 21l4-10" />
    <path d="M17 21l-4-10" />
    <path d="M8 15h8" />
  </svg>
);

const WeldedAssembliesIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-[#FF7A1A]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 22 7 12 12 2 7 12 2" fill="currentColor" fillOpacity="0.2" />
    <path d="M2 12l10 5 10-5" />
    <path d="M2 17l10 5 10-5" />
  </svg>
);

const BridgeTrussIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-[#FF7A1A]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 17h18" />
    <path d="M3 9h18" />
    <path d="M6 9v8" />
    <path d="M18 9v8" />
    <path d="M6 13h12" />
    <path d="M6 9l6 8 6-8" />
  </svg>
);

const StructuralFrameIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-[#FF7A1A]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="16" rx="1" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="9" y1="4" x2="9" y2="20" />
    <line x1="15" y1="4" x2="15" y2="20" />
  </svg>
);

const OrangeCheck = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" fill="currentColor">
    <circle cx="8" cy="8" r="8" fill="#FF7A1A" />
    <path
      d="M11.5 5.5L6.5 10.5L4.5 8.5"
      fill="none"
      stroke="#0A0E11"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  bullets: [string, string];
  image: string;
  href: string;
  icon: React.ComponentType;
  featured?: boolean;
}

const SERVICES: ServiceCard[] = [
  {
    id: "engineering-solutions",
    title: "Engineering Solutions",
    description: "Seamless communication, innovative design and fast response.",
    bullets: ["Concept & Design", "Structural Analysis"],
    image: "/images/services/engineering-solutions.jpg",
    href: "/services",
    icon: DraftingCompassIcon,
    featured: true,
  },
  {
    id: "welded-assemblies",
    title: "Welded Engineering Assemblies",
    description: "Custom and heavy steel fabrications built with precision.",
    bullets: ["Custom Fabrication", "Heavy Steel Assemblies"],
    image: "/images/services/welded-assemblies.jpg",
    href: "/services",
    icon: WeldedAssembliesIcon,
  },
  {
    id: "bridge-walkways",
    title: "Bridge Walkways & Support Structures",
    description: "Built for safety and long-term performance.",
    bullets: ["Bridge Walkways", "Support Structures"],
    image: "/images/services/bridge-walkways.jpg",
    href: "/services",
    icon: BridgeTrussIcon,
  },
  {
    id: "structural-steelwork",
    title: "Primary Structural Steelwork",
    description: "Complete steelwork from design to erection.",
    bullets: ["Structural Steel Design", "Steel Fabrication"],
    image: "/images/services/structural-steelwork.jpg",
    href: "/services",
    icon: StructuralFrameIcon,
  },
];

export default function Capabilities() {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";
  return (
    <section
      id="capabilities"
      className={`py-16 sm:py-24 relative overflow-hidden transition-colors duration-300 border-t ${isLight ? "bg-[#FFFFFF] text-slate-800 border-slate-200" : "bg-[#0A0E11] text-offwhite border-white/5"}`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#FF7A1A]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#FF7A1A]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[3px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
              <span className={`text-xs sm:text-[13px] font-mono font-bold tracking-[0.22em] uppercase ${isLight ? "text-slate-500" : "text-[#9CA3AF]"}`}>
                OUR SERVICES
              </span>
            </div>

            {/* Main Heading with Orange Accent */}
            <h2 className={`font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-extrabold tracking-[-0.03em] leading-[1.15] ${isLight ? "text-slate-900" : "text-white"}`}>
              End-to-End Steel Solutions for{" "}
              <span className="text-[#FF7A1A] [text-shadow:_0_0_24px_rgba(255,122,26,0.35)]">
                Every Project
              </span>
            </h2>

            {/* Subtitle */}
            <p className={`text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-2xl font-normal ${isLight ? "text-slate-600" : "text-[#9CA3AF]"}`}>
              From concept to completion, Ferrite Structural Steels Pvt Ltd offers specialized services,
              engineering expertise, and turnkey solutions tailored to your needs.
            </p>
          </div>

          {/* Top Right "View Our Services →" Pill CTA */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#141A1F]/80 hover:bg-[#1A2228] border border-white/10 hover:border-[#FF7A1A]/60 backdrop-blur-md text-xs sm:text-sm font-semibold text-white transition-all duration-300 group shadow-lg shrink-0 self-start md:self-auto hover:shadow-[0_0_20px_rgba(255,122,26,0.2)]"
          >
            <span>View Our Services</span>
            <span className="text-[#FF7A1A] font-bold text-sm sm:text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const isFeatured = service.featured;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col"
              >
                <div
                  className={`group relative flex flex-col justify-between h-full rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-500 shadow-xl ${
                    isFeatured
                      ? "border-2 border-[#FF7A1A] shadow-[0_0_35px_rgba(255,122,26,0.35),0_0_70px_rgba(255,122,26,0.12)] bg-[#11171B]/95"
                      : "bg-[#11171B]/90 hover:bg-[#141C22] border border-white/[0.08] hover:border-white/20 hover:shadow-2xl"
                  }`}
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-95 group-hover:brightness-100"
                    />
                    {/* Bottom gradient fade into card body */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? "from-white via-transparent" : "from-[#11171B] via-transparent"} to-transparent pointer-events-none`} />
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-5.5 flex flex-col justify-between flex-1">
                    <div>
                      {/* Orange Icon Container */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[#FF7A1A] mb-3.5 ${isLight ? "bg-orange-50 border border-orange-200" : "bg-[#1A120B]/90 border border-[#FF7A1A]/40 shadow-[0_0_12px_rgba(255,122,26,0.25)]"}`}>
                        <Icon />
                      </div>

                      {/* Card Title */}
                      <h3 className={`font-heading font-extrabold text-base sm:text-lg group-hover:text-[#FF7A1A] transition-colors leading-snug ${isLight ? "text-slate-900" : "text-white"}`}>
                        {service.title}
                      </h3>

                      {/* Card Subtitle */}
                      <p className={`text-xs leading-relaxed mt-1.5 min-h-[34px] ${isLight ? "text-slate-600" : "text-[#9CA3AF]"}`}>
                        {service.description}
                      </p>

                      {/* Bullet Features with Orange Check */}
                      <div className="space-y-2 my-4">
                        {service.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className={`flex items-center gap-2.5 text-xs font-medium ${isLight ? "text-slate-700" : "text-white/90"}`}>
                            <OrangeCheck />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="pt-2">
                      {isFeatured ? (
                        <Link
                          href={service.href}
                          className="w-full py-2.5 sm:py-3 px-4 rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#E66200] text-white font-semibold text-xs sm:text-sm flex items-center justify-between shadow-[0_4px_16px_rgba(255,122,26,0.4)] hover:brightness-110 active:scale-[0.98] transition-all"
                        >
                          <span>Read More</span>
                          <span className="font-bold text-base">→</span>
                        </Link>
                      ) : (
                        <Link
                          href={service.href}
                          className={`w-full py-2.5 sm:py-3 px-4 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-between transition-all duration-300 group/btn shadow-sm active:scale-[0.98] ${isLight ? "bg-slate-100 hover:bg-[#FF7A1A] border border-slate-200 hover:border-[#FF7A1A] text-slate-800 hover:text-white" : "bg-black/40 hover:bg-[#FF7A1A] border border-white/10 hover:border-[#FF7A1A] text-white hover:text-black"}`}
                        >
                          <span>Read More</span>
                          <span className="text-[#FF7A1A] group-hover/btn:text-black font-bold text-base transition-colors">
                            →
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Wide Conversion Banner: "Need a Custom Steel Solution?" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`relative mt-10 sm:mt-12 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors duration-300 ${isLight ? "bg-white border border-slate-200" : "bg-[#0D1216]/95 border border-white/10 backdrop-blur-xl"}`}
        >
          {/* Background Right Side Steel Beams Accent */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 md:w-5/12 overflow-hidden pointer-events-none opacity-40 sm:opacity-60">
            <Image
              src="/images/services/cta-beam.webp"
              alt="Structural Steel Beam"
              fill
              className="object-cover object-right"
            />
            {/* Dark gradient overlay blending the beam into the banner */}
            <div className={`absolute inset-0 bg-gradient-to-r ${isLight ? "from-white via-white/80" : "from-[#0D1216] via-[#0D1216]/80"} to-transparent`} />
          </div>

          {/* Diagonal Molten Glow Line */}
          <div className="absolute top-0 right-1/3 w-32 h-full bg-gradient-to-r from-transparent via-[#FF7A1A]/15 to-transparent skew-x-[-30deg] pointer-events-none" />

          {/* Left Text Block with Vertical Orange Bar */}
          <div className="relative z-10 flex items-start sm:items-center gap-3.5 sm:gap-4 max-w-2xl">
            <span className="w-1.5 h-10 sm:h-12 bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_12px_#FF7A1A] shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <h3 className={`font-heading font-extrabold text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight leading-snug ${isLight ? "text-slate-900" : "text-white"}`}>
                Need a Custom Steel Solution?
              </h3>
              <p className={`text-xs sm:text-sm mt-1 font-normal ${isLight ? "text-slate-600" : "text-[#9CA3AF]"}`}>
                Talk to our experts today and get the right solution for your project.
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="relative z-10 shrink-0 self-stretch sm:self-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#FF7A1A] hover:bg-[#FF882E] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(255,122,26,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
