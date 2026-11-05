"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";

// Social Media SVG Icons
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

// Fanned Polaroid Component matching the exact reference mockup
interface PolaroidCardProps {
  image: string;
  caption: string;
  rotate: number;
  zIndex: number;
  className?: string;
}

function PolaroidCard({ image, caption, rotate, zIndex, className = "" }: PolaroidCardProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -25, right: 25, top: -25, bottom: 25 }}
      initial={{ rotate }}
      whileHover={{
        rotate: 0,
        scale: 1.16,
        zIndex: 50,
        transition: { type: "spring", stiffness: 380, damping: 24 },
      }}
      whileTap={{ scale: 0.96 }}
      style={{ zIndex }}
      className={`relative cursor-grab active:cursor-grabbing bg-white p-2 sm:p-2.5 pb-4 sm:pb-5 rounded-[2px] shadow-[0_16px_36px_rgba(0,0,0,0.65),0_2px_8px_rgba(0,0,0,0.25)] select-none shrink-0 w-[120px] sm:w-[140px] md:w-[155px] lg:w-[168px] xl:w-[178px] transition-shadow hover:shadow-[0_24px_50px_rgba(0,0,0,0.9)] ${className}`}
    >
      {/* Inner Image Frame */}
      <div className="relative aspect-[4/3] w-full rounded-[1px] overflow-hidden bg-black shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
        <Image
          src={image}
          alt={caption}
          fill
          sizes="200px"
          className="object-cover pointer-events-none"
        />
      </div>
      {/* Dark Bold Label matching the mockup */}
      <p className="mt-2 text-[10px] sm:text-[11.5px] font-heading font-bold text-zinc-900 text-center tracking-tight truncate select-none px-0.5">
        {caption}
      </p>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#070A0D] text-[#9CA3AF] relative pt-8 sm:pt-12 pb-8 overflow-hidden">
      {/* Ambient Deep Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[300px] bg-[#FF7A1A]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-96 h-96 bg-[#FF7A1A]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================== */}
        {/* TOP FLOATING CARD BANNER (Exact Match to Mockup)          */}
        {/* ========================================================== */}
        <div className="relative">
          {/* Underglow Reflection */}
          <div className="absolute -bottom-6 left-12 right-12 h-16 bg-[#FF7A1A]/20 blur-2xl rounded-full pointer-events-none" />

          <div className="rounded-[28px] sm:rounded-[32px] md:rounded-[36px] bg-gradient-to-r from-[#10151A] via-[#12171D] to-[#10151A] border border-white/10 p-6 sm:p-9 md:p-11 lg:p-12 xl:p-14 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden">
            {/* Orange Backlight for the Polaroid Reel */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#FF7A1A]/15 blur-[90px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              {/* Left Column: Heading, Paragraph & CTA Button */}
              <div className="lg:col-span-5 xl:col-span-5 space-y-4 sm:space-y-5 text-left relative z-10">
                {/* Eyebrow with orange line */}
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                  <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                    GET IN TOUCH
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] text-white tracking-[-0.03em] leading-[1.12]">
                  Still have a question about your{" "}
                  <span className="text-[#FF7A1A] [text-shadow:_0_0_24px_rgba(255,122,26,0.4)]">
                    steel requirement?
                  </span>
                </h2>

                {/* Subtitle Paragraph */}
                <p className="text-xs sm:text-sm lg:text-[14px] text-[#9CA3AF] leading-relaxed max-w-lg font-normal">
                  Share your requirement and our experts will help you with the right steel solution,
                  best price and on-time delivery across India.
                </p>

                {/* Orange Pill Button */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#FF882E] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_25px_rgba(255,122,26,0.45)] hover:shadow-[0_4px_35px_rgba(255,122,26,0.65)] hover:scale-105 active:scale-95 transition-all group"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 5 Fanned-Out White Polaroids */}
              <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center lg:justify-end overflow-visible pt-4 pb-4 sm:py-2">
                <div className="relative flex items-center justify-center -space-x-4 sm:-space-x-6 md:-space-x-7 lg:-space-x-8 xl:-space-x-9">
                  {/* Photo 1: Steel Angles */}
                  <PolaroidCard
                    image="/images/products/steel-angle.png"
                    caption="Steel Angles"
                    rotate={-9}
                    zIndex={10}
                  />

                  {/* Photo 2: Heavy Sections */}
                  <PolaroidCard
                    image="/images/products/steel-beams.png"
                    caption="Heavy Sections"
                    rotate={-3}
                    zIndex={20}
                  />

                  {/* Photo 3: Steel Pipes */}
                  <PolaroidCard
                    image="/images/products/steel-pipes.png"
                    caption="Steel Pipes"
                    rotate={2}
                    zIndex={30}
                  />

                  {/* Photo 4: Fabrication */}
                  <PolaroidCard
                    image="/images/services/welded-assemblies.jpg"
                    caption="Fabrication"
                    rotate={5}
                    zIndex={20}
                  />

                  {/* Photo 5: Site Erection */}
                  <PolaroidCard
                    image="/images/services/structural-steelwork.jpg"
                    caption="Site Erection"
                    rotate={9}
                    zIndex={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* LOWER FOOTER: 5-Column Navigation & Contact Block         */}
        {/* ========================================================== */}
        <div className="pt-14 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
            {/* Column 1: Brand Wordmark, Lineage & Description (3.5 cols) */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-4">
              {/* Brand Logo with ferrite-icon.svg */}
              <Link href="/" className="inline-flex items-center gap-3 group select-none">
                <div className="relative w-8 h-8 shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/ferrite-icon.svg"
                    alt="Ferrite Structural Steels"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-lg sm:text-xl tracking-wider text-white uppercase leading-none">
                    FERRITE
                  </span>
                  <span className="text-[8.5px] uppercase tracking-[0.22em] font-medium text-[#9CA3AF] mt-1">
                    STRUCTURAL STEELS PVT. LTD.
                  </span>
                </div>
              </Link>

              {/* Lineage Statement matching screenshot */}
              <div className="font-heading font-extrabold text-lg sm:text-xl text-white tracking-tight leading-snug space-y-0.5 pt-2">
                <div>Built for projects.</div>
                <div>Stocked in Mumbai.</div>
                <div className="text-[#FF7A1A]">Lineage since 1965.</div>
              </div>

              {/* Tagline Paragraph */}
              <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-xs pt-1">
                Your trusted partner for structural steel products, fabrication and complete steel
                solutions across India.
              </p>
            </div>

            {/* Column 2: QUICK LINKS (1.5 cols) */}
            <div className="lg:col-span-2 xl:col-span-2 space-y-3.5">
              <h3 className="font-heading text-xs font-extrabold text-white tracking-wider uppercase">
                QUICK LINKS
              </h3>
              <ul className="space-y-2.5 text-xs">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Services", href: "/capabilities" },
                  { name: "Blogs", href: "/#insights" },
                  { name: "FAQs", href: "/contact" },
                  { name: "Contact Us", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 text-[#9CA3AF] hover:text-white transition-colors group"
                    >
                      <span className="text-[#FF7A1A] text-sm leading-none font-bold group-hover:translate-x-0.5 transition-transform">
                        ›
                      </span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: STEEL PRODUCTS (2 cols) */}
            <div className="lg:col-span-2 xl:col-span-2 space-y-3.5">
              <h3 className="font-heading text-xs font-extrabold text-white tracking-wider uppercase">
                STEEL PRODUCTS
              </h3>
              <ul className="space-y-2.5 text-xs">
                {[
                  { name: "Steel Angle", href: "/products#steel-angles" },
                  { name: "Steel Beams", href: "/products#structural-beams" },
                  { name: "Steel Channels", href: "/products#steel-channels" },
                  { name: "Steel Bars", href: "/products#tmt-merchant-bars" },
                  { name: "Steel Pipes", href: "/products#hollow-sections-pipes" },
                  { name: "Steel Sheets", href: "/products#plates-and-sheets" },
                  { name: "Steel Plates", href: "/products#plates-and-sheets" },
                ].map((prod) => (
                  <li key={prod.name}>
                    <Link
                      href={prod.href}
                      className="flex items-center gap-1.5 text-[#9CA3AF] hover:text-white transition-colors group"
                    >
                      <span className="text-[#FF7A1A] text-sm leading-none font-bold group-hover:translate-x-0.5 transition-transform">
                        ›
                      </span>
                      <span>{prod.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: LOCATIONS (2.5 cols) */}
            <div className="lg:col-span-2 xl:col-span-2 space-y-5">
              <h3 className="font-heading text-xs font-extrabold text-white tracking-wider uppercase">
                LOCATIONS
              </h3>

              {/* Head Office */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-white font-heading font-bold text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0 fill-[#FF7A1A]/20" />
                  <span>Head Office / Sales</span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] leading-relaxed pl-5">
                  Excel Plaza, 803/8 wing, 90 Feet Rd, Pant Nagar, Ghatkopar East, Mumbai – 400075
                </p>
              </div>

              {/* Factory Address */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-white font-heading font-bold text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0 fill-[#FF7A1A]/20" />
                  <span>Factory Address</span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] leading-relaxed pl-5">
                  Plot 18, KWC Kalamboli, Dist. – Raigad, Navi Mumbai – 410218
                </p>
              </div>
            </div>

            {/* Column 5: NEED HELP? CALL NOW! Card (3 cols) */}
            <div className="lg:col-span-2 xl:col-span-3">
              <div className="rounded-2xl bg-[#11161B] border border-white/10 p-5 sm:p-6 text-center shadow-2xl relative overflow-hidden">
                {/* Glowing Molten Top Edge Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-[#FF7A1A] shadow-[0_0_15px_#FF7A1A]" />

                {/* Telephone Icon Box */}
                <div className="w-11 h-11 rounded-xl bg-[#1A2129] border border-[#FF7A1A]/30 flex items-center justify-center mx-auto text-[#FF7A1A] shadow-[0_0_15px_rgba(255,122,26,0.2)] mb-3">
                  <Phone className="w-4 h-4" />
                </div>

                {/* Title */}
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-[#9CA3AF] tracking-wider uppercase">
                    NEED HELP?
                  </div>
                  <div className="font-heading text-lg font-extrabold text-white tracking-tight">
                    CALL NOW!
                  </div>
                </div>

                {/* Phone Call Button */}
                <a
                  href={FERRITE_CONTACT.getTelUrl()}
                  className="mt-3.5 block w-full py-2.5 rounded-full bg-[#FF7A1A] hover:bg-[#FF882E] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_16px_rgba(255,122,26,0.4)] hover:shadow-[0_4px_25px_rgba(255,122,26,0.6)] hover:scale-105 active:scale-95 transition-all"
                >
                  {FERRITE_CONTACT.phone}
                </a>

                {/* Stay Connected */}
                <div className="mt-4 pt-3.5 border-t border-white/[0.08] space-y-2.5">
                  <div className="text-[9.5px] font-bold text-[#9CA3AF] tracking-widest uppercase">
                    STAY CONNECTED
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {/* LinkedIn */}
                    <a
                      href={FERRITE_CONTACT.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon />
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
                      aria-label="YouTube"
                    >
                      <YouTubeIcon />
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
                      aria-label="Instagram"
                    >
                      <InstagramIcon />
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={FERRITE_CONTACT.getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
                      aria-label="WhatsApp"
                    >
                      <WhatsAppIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* BOTTOM ATMOSPHERE: Stacked Beams & Molten Glowing Line     */}
        {/* ========================================================== */}
        <div className="relative">
          {/* Bottom Left Beam Graphic */}
          <div className="absolute -left-12 -bottom-4 w-72 sm:w-96 lg:w-[440px] h-32 sm:h-44 pointer-events-none opacity-30 select-none overflow-hidden -z-0">
            <Image
              src="/images/services/cta-beam.webp"
              alt="Structural Steel Beams"
              fill
              className="object-cover object-left-bottom -scale-x-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A0D] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#070A0D]" />
          </div>

          {/* Glowing Molten Top Edge Accent Line across bottom-left */}
          <div className="absolute -bottom-2 left-0 w-64 sm:w-80 h-[2px] bg-gradient-to-r from-[#FF7A1A] via-[#FF7A1A]/70 to-transparent shadow-[0_0_12px_#FF7A1A] pointer-events-none" />

          {/* Bottom Copyright & Credits Bar */}
          <div className="pt-8 mt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280] relative z-10">
            <div>
              © 2026 Ferrite Structural Steels Pvt. Ltd. All rights reserved.
            </div>
            <div>
              Designed by <span className="text-white/80 font-medium">Vebiotic Web Solutions</span>{" "}
              | Marketing by <span className="text-white/80 font-medium">Adinads</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
