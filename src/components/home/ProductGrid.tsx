"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Custom SVG Icons matching the reference design exactly
const AngleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-[#FF7A1A]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 16L12 7L20 16" />
  </svg>
);

const BeamIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-[#FF7A1A] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 5h14M12 5v14M5 19h14" />
    <path d="M5 3v4M19 3v4M5 17v4M19 17v4" />
  </svg>
);

const ChannelIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-[#FF7A1A] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 7H7a1.5 1.5 0 0 0-1.5 1.5v7A1.5 1.5 0 0 0 7 17h11" />
    <path d="M18 5v4M18 15v4" />
  </svg>
);

const BarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-[#FF7A1A] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="8" x2="21" y2="8" />
    <line x1="3" y1="16" x2="21" y2="16" />
    <line x1="7" y1="5" x2="5" y2="11" strokeWidth="1.5" />
    <line x1="13" y1="5" x2="11" y2="11" strokeWidth="1.5" />
    <line x1="19" y1="5" x2="17" y2="11" strokeWidth="1.5" />
    <line x1="7" y1="13" x2="5" y2="19" strokeWidth="1.5" />
    <line x1="13" y1="13" x2="11" y2="19" strokeWidth="1.5" />
    <line x1="19" y1="13" x2="17" y2="19" strokeWidth="1.5" />
  </svg>
);

const PipeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-[#FF7A1A] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" strokeWidth="1.8" />
  </svg>
);

const SheetIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-[#FF7A1A] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 3 22 8 12 13 2 8 12 3" fill="currentColor" fillOpacity="0.2" />
    <path d="M2 13l10 5 10-5" />
    <path d="M2 17l10 5 10-5" />
  </svg>
);

const PlateIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-[#FF7A1A] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 21 6.5 12 11 3 6.5 12 2" fill="currentColor" fillOpacity="0.2" />
    <path d="M3 6.5v4l9 4.5 9-4.5v-4" />
    <path d="M3 13.5v4l9 4.5 9-4.5v-4" />
  </svg>
);

interface StandardProduct {
  id: string;
  title: string;
  subtext: string;
  image: string;
  href: string;
  icon: React.ComponentType;
}

const FEATURED_PRODUCT = {
  id: "steel-angles",
  title: "Steel Angle",
  subtext: "Strong. Reliable. Versatile.",
  image: "/images/products/steel-angle.png",
  href: "/products#steel-angles",
};

const STANDARD_PRODUCTS: StandardProduct[] = [
  {
    id: "steel-beams",
    title: "Steel Beams",
    subtext: "Durable. Precise. Long-Lasting.",
    image: "/images/products/steel-beams.png",
    href: "/products#structural-beams",
    icon: BeamIcon,
  },
  {
    id: "steel-channels",
    title: "Steel Channels",
    subtext: "Strength with Corrosion Protection.",
    image: "/images/products/steel-channels.jpg",
    href: "/products#steel-channels",
    icon: ChannelIcon,
  },
  {
    id: "steel-bars",
    title: "Steel Bars",
    subtext: "Reliable. Durable. Versatile.",
    image: "/images/products/steel-bars.jpg",
    href: "/products#tmt-merchant-bars",
    icon: BarIcon,
  },
  {
    id: "steel-pipes",
    title: "Steel Pipes",
    subtext: "Built to Carry. Built to Last.",
    image: "/images/products/steel-pipes.png",
    href: "/products#hollow-sections-pipes",
    icon: PipeIcon,
  },
  {
    id: "steel-sheets",
    title: "Steel Sheets",
    subtext: "Smooth Finish. Superior Quality.",
    image: "/images/products/steel-sheets.webp",
    href: "/products#plates-and-sheets",
    icon: SheetIcon,
  },
  {
    id: "steel-plates",
    title: "Steel Plates",
    subtext: "Thick Plates. Strong Foundations.",
    image: "/images/products/steel-plates.jpg",
    href: "/products#plates-and-sheets",
    icon: PlateIcon,
  },
];

export default function ProductGrid() {
  return (
    <section
      id="products"
      className="bg-[#0A0E11] py-16 sm:py-24 relative text-offwhite border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FF7A1A]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#FF7A1A]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[3px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
              <span className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.22em] text-[#9CA3AF] uppercase">
                STEEL PRODUCTS
              </span>
            </div>

            {/* Main Heading with Orange Accent */}
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-extrabold text-white tracking-[-0.03em] leading-[1.15]">
              High-Quality Steel for{" "}
              <span className="text-[#FF7A1A] [text-shadow:_0_0_24px_rgba(255,122,26,0.35)]">
                Every Project
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-[#9CA3AF] leading-relaxed max-w-2xl font-normal">
              Ferrite Structural Steels Pvt Ltd offers a wide range of steel products,
              manufactured to the highest industry standards for strength, durability,
              and performance.
            </p>
          </div>

          {/* Top Right "View All Steel Products →" Pill CTA */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#141A1F]/80 hover:bg-[#1A2228] border border-white/10 hover:border-[#FF7A1A]/60 backdrop-blur-md text-xs sm:text-sm font-semibold text-white transition-all duration-300 group shadow-lg shrink-0 self-start md:self-auto hover:shadow-[0_0_20px_rgba(255,122,26,0.2)]"
          >
            <span>View All Steel Products</span>
            <span className="text-[#FF7A1A] font-bold text-sm sm:text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Bento Product Grid: 1 Tall Featured Card (Left) + 6 Standard Cards (Right 3x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.22fr_3fr] gap-4 sm:gap-5 items-stretch">
          {/* Featured Card (Left) — Steel Angle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full flex flex-col"
          >
            <Link
              href={FEATURED_PRODUCT.href}
              className="group relative block w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-full rounded-3xl overflow-hidden border-2 border-[#FF7A1A] shadow-[0_0_35px_rgba(255,122,26,0.35),0_0_70px_rgba(255,122,26,0.12)] transition-all duration-500 hover:shadow-[0_0_45px_rgba(255,122,26,0.5),0_0_90px_rgba(255,122,26,0.2)]"
            >
              {/* "Featured" Badge Top-Left */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                <span className="px-3.5 py-1 rounded-full bg-[#FF7A1A] text-white text-[11px] sm:text-xs font-bold tracking-wide shadow-[0_2px_12px_rgba(255,122,26,0.5)] inline-block">
                  Featured
                </span>
              </div>

              {/* Background Product Image */}
              <div className="absolute inset-0 bg-black/60">
                <Image
                  src={FEATURED_PRODUCT.image}
                  alt={FEATURED_PRODUCT.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Multi-layered dark gradient overlay for crystal clear text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E11] via-[#0A0E11]/60 to-transparent z-10" />

              {/* Bottom Content Area */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-20 flex items-end justify-between gap-4">
                <div className="space-y-1">
                  {/* Angle Icon */}
                  <div className="mb-2">
                    <AngleIcon />
                  </div>
                  {/* Title */}
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-[#FF7A1A] transition-colors">
                    {FEATURED_PRODUCT.title}
                  </h3>
                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-[#9CA3AF] font-medium">
                    {FEATURED_PRODUCT.subtext}
                  </p>
                </div>

                {/* Circular Orange Arrow Button */}
                <div className="w-10 h-10 rounded-full bg-[#FF7A1A] text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(255,122,26,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(255,122,26,0.7)] transition-all duration-300 shrink-0">
                  <ArrowRight className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Standard Cards Grid (Right) — 3 Columns x 2 Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
            {STANDARD_PRODUCTS.map((prod, idx) => {
              const Icon = prod.icon;
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={prod.href}
                    className="group flex flex-col justify-between h-full bg-[#11171B]/90 hover:bg-[#141C22] border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    {/* Card Image Area with 16:10 Aspect Ratio */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-95 group-hover:brightness-100"
                      />
                      {/* Gradient Shadow along the bottom of the image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11171B] via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Card Meta Footer Bar */}
                    <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 bg-[#11171B]/95">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Icon />
                          <h3 className="font-heading text-sm sm:text-[15px] font-bold text-white group-hover:text-[#FF7A1A] transition-colors truncate">
                            {prod.title}
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#9CA3AF] truncate">
                          {prod.subtext}
                        </p>
                      </div>

                      {/* Circular CTA Button */}
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1A2127] border border-white/10 flex items-center justify-center text-[#FF7A1A] group-hover:bg-[#FF7A1A] group-hover:text-black group-hover:border-[#FF7A1A] transition-all duration-300 shrink-0 shadow-sm">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ambient bottom molten horizon accent line */}
        <div className="relative mt-12 sm:mt-16 w-full h-4 overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF7A1A]/35 to-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-4 bg-[#FF7A1A]/10 blur-xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
