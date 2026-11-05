"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";

// Social Media SVG Icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
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

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Authentic White Polaroid Snapshot Component (from Framer Snapshot-Footer Spec)
function SnapshotPolaroid({
  image,
  caption,
  rotate = 0,
  zIndex = 1,
  className = "",
}: {
  image: string;
  caption: string;
  rotate?: number;
  zIndex?: number;
  className?: string;
}) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
      initial={{ rotate }}
      whileHover={{
        rotate: 0,
        scale: 1.12,
        zIndex: 50,
        transition: { type: "spring", stiffness: 350, damping: 22 },
      }}
      whileTap={{ scale: 0.95 }}
      style={{ zIndex }}
      className={`relative cursor-grab active:cursor-grabbing bg-[#FAFAFA] p-2.5 sm:p-3 pb-8 sm:pb-9 rounded-[3px] shadow-[0_16px_36px_-6px_rgba(0,0,0,0.65),0_2px_6px_rgba(0,0,0,0.2)] select-none shrink-0 w-[170px] sm:w-[200px] lg:w-[210px] transition-shadow hover:shadow-[0_24px_48px_rgba(0,0,0,0.85)] ${className}`}
    >
      {/* Inner Photo Frame */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-[2px] overflow-hidden bg-zinc-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]">
        <Image
          src={image}
          alt={caption}
          fill
          sizes="220px"
          className="object-cover pointer-events-none"
        />
      </div>
      {/* Handwritten / Monospace Caption */}
      <p className="mt-2.5 text-[11px] font-mono tracking-tight text-zinc-700 text-center truncate select-none px-1">
        {caption}
      </p>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0E11] text-[#9CA3AF] relative py-12 sm:py-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#FF7A1A]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#FF7A1A]/4 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Contained Framer Snapshot-Footer Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] sm:rounded-[36px] bg-[#12161A] border border-white/10 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative flex flex-col">
          {/* ========================================================== */}
          {/* TOP STAGE: Large Heading, Paragraph & Snapshot Photo Fan   */}
          {/* ========================================================== */}
          <div className="px-6 pt-10 sm:px-12 sm:pt-16 lg:px-14 lg:pt-20 pb-16 sm:pb-24 relative overflow-hidden bg-gradient-to-b from-[#14191F] to-[#101418]">
            {/* Heading and Intro Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
              {/* Left Heading */}
              <div className="max-w-xl">
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-white tracking-[-0.03em] leading-[1.12]">
                  Still have a question about your{" "}
                  <span className="text-[#FF7A1A] [text-shadow:_0_0_24px_rgba(255,122,26,0.35)]">
                    steel requirement?
                  </span>
                </h2>
              </div>

              {/* Right Paragraph & Quick CTA */}
              <div className="max-w-md space-y-4">
                <p className="text-xs sm:text-sm lg:text-[15px] text-[#9CA3AF] leading-relaxed">
                  Share your requirement and our experts will help you with the right steel solution,
                  best price and on-time delivery across India.
                </p>
                <div className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D9651E] to-[#FF7A1A] hover:from-[#E66E24] hover:to-[#FF882E] text-white font-heading text-xs sm:text-sm font-bold shadow-lg hover:shadow-[0_0_20px_rgba(255,122,26,0.4)] transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Request a Quote</span>
                    <span className="font-bold text-base">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SNAPSHOT PHOTO PILE (Framer Snapshot Footer Signature)    */}
            {/* Straddles the boundary between top stage and bottom body */}
            {/* ======================================================== */}
            <div className="relative pt-6 sm:pt-10 overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
              <div className="flex items-center justify-start lg:justify-center gap-3 sm:gap-4 lg:gap-5 min-w-max lg:min-w-0 pb-4">
                {/* Photo 1: Angles */}
                <SnapshotPolaroid
                  image="/images/products/steel-angle.png"
                  caption="Stockyard Angles · 9:04 AM"
                  rotate={-6}
                  zIndex={2}
                />

                {/* Photo 2: Beams */}
                <SnapshotPolaroid
                  image="/images/products/steel-beams.png"
                  caption="Heavy Sections Mill · 11:30 AM"
                  rotate={4}
                  zIndex={3}
                  className="-ml-4 sm:-ml-6"
                />

                {/* Central Sticky NoteCard */}
                <motion.div
                  drag
                  dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                  initial={{ rotate: -2 }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.12,
                    zIndex: 50,
                    transition: { type: "spring", stiffness: 350, damping: 22 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ zIndex: 10 }}
                  className="relative cursor-grab active:cursor-grabbing bg-[#1C232B] p-4 pb-5 rounded-xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.7)] select-none shrink-0 w-[190px] sm:w-[220px] -ml-4 sm:-ml-6 text-left"
                >
                  {/* Adhesive Tape Header */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/20 backdrop-blur-sm rounded-sm border border-white/25 rotate-[-2deg]" />

                  {/* Note Card Content */}
                  <div className="pt-1.5 space-y-1.5 font-mono">
                    <div className="text-[10px] font-bold text-[#FF7A1A] tracking-wider uppercase">
                      FERRITE HQ
                    </div>
                    <div className="text-xs font-bold text-white leading-snug">
                      Excel Plaza, 803/B wing
                      <br />
                      Ghatkopar, Mumbai 400075
                    </div>
                    <div className="pt-2 border-t border-white/10 text-[10px] text-[#9CA3AF] space-y-0.5">
                      <div>Mon – Sat: 08:30 AM – 07:30 PM</div>
                      <div className="text-white font-semibold pt-0.5">{FERRITE_CONTACT.phone}</div>
                      <div className="text-[#9CA3AF] truncate">{FERRITE_CONTACT.email}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Photo 3: Pipes */}
                <SnapshotPolaroid
                  image="/images/products/steel-pipes.png"
                  caption="Kalamboli Yard · 2:15 PM"
                  rotate={5}
                  zIndex={4}
                  className="-ml-4 sm:-ml-6"
                />

                {/* Photo 4: Fabrication */}
                <SnapshotPolaroid
                  image="/images/services/welded-assemblies.jpg"
                  caption="Fabrication Shop · 4:45 PM"
                  rotate={-5}
                  zIndex={3}
                  className="-ml-4 sm:-ml-6"
                />

                {/* Photo 5: Erection */}
                <SnapshotPolaroid
                  image="/images/services/structural-steelwork.jpg"
                  caption="Site Erection · 6:10 PM"
                  rotate={7}
                  zIndex={2}
                  className="-ml-4 sm:-ml-6"
                />
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* BOTTOM BODY: Navigation Columns, Content & Help Card       */}
          {/* ========================================================== */}
          <div className="bg-[#0A0D10] px-6 sm:px-12 lg:px-14 py-12 sm:py-16 border-t border-white/[0.08]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-8">
              {/* Left Column: Brand Wordmark & Lineage Statement */}
              <div className="md:col-span-12 lg:col-span-3 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A1A] shadow-[0_0_8px_#FF7A1A]" />
                    <span className="font-heading font-extrabold text-xl text-white tracking-wider">
                      FERRITE
                    </span>
                  </div>
                  <div className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-snug space-y-0.5">
                    <div>Built for projects.</div>
                    <div>Stocked in Mumbai.</div>
                    <div className="text-[#FF7A1A]">Lineage since 1965.</div>
                  </div>
                </div>

                {/* Quick Call Desk */}
                <div className="pt-4 border-t border-white/10 text-xs text-[#9CA3AF] space-y-1">
                  <div className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">
                    Direct Sales Desk
                  </div>
                  <a
                    href={FERRITE_CONTACT.getTelUrl()}
                    className="text-white hover:text-[#FF7A1A] transition-colors font-bold text-sm block"
                  >
                    {FERRITE_CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${FERRITE_CONTACT.email}`}
                    className="hover:text-white transition-colors block text-xs"
                  >
                    {FERRITE_CONTACT.email}
                  </a>
                </div>
              </div>

              {/* Col 1: QUICK LINKS */}
              <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-3.5">
                <h3 className="font-heading text-xs font-bold text-white tracking-wider uppercase">
                  QUICK LINKS
                </h3>
                <ul className="space-y-2 text-xs">
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
                        <span className="text-[#FF7A1A] group-hover:translate-x-0.5 transition-transform">
                          ›
                        </span>
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2: STEEL PRODUCTS */}
              <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-3.5">
                <h3 className="font-heading text-xs font-bold text-white tracking-wider uppercase">
                  STEEL PRODUCTS
                </h3>
                <ul className="space-y-2 text-xs">
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
                        <span className="text-[#FF7A1A] group-hover:translate-x-0.5 transition-transform">
                          ›
                        </span>
                        <span>{prod.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: ADDRESSES (Head Office & Factory) */}
              <div className="sm:col-span-6 md:col-span-6 lg:col-span-2 space-y-5">
                {/* HEAD OFFICE */}
                <div className="space-y-2">
                  <h3 className="font-heading text-xs font-bold text-white tracking-wider uppercase">
                    HEAD OFFICE / SALES
                  </h3>
                  <div className="flex items-start gap-1.5 text-xs text-[#9CA3AF]">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-[11px]">
                      Excel Plaza, 803/B wing, 90 Feet Rd, Pant Nagar, Ghatkopar East, Mumbai - 400075
                    </span>
                  </div>
                </div>

                {/* FACTORY ADDRESS */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  <h3 className="font-heading text-xs font-bold text-white tracking-wider uppercase">
                    FACTORY ADDRESS
                  </h3>
                  <div className="flex items-start gap-1.5 text-xs text-[#9CA3AF]">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-[11px]">
                      Plot 18, KWC Kalamboli, Dist. - Raigad, Navi Mumbai - 410218
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 4: NEED HELP? CALL NOW! CARD (From Screenshot) */}
              <div className="sm:col-span-6 md:col-span-6 lg:col-span-3">
                <div className="rounded-2xl bg-[#11171D] border border-white/10 p-5 sm:p-6 text-center space-y-3.5 shadow-xl relative overflow-hidden">
                  {/* Orange Top Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#FF7A1A] shadow-[0_0_10px_#FF7A1A]" />

                  {/* Phone Icon */}
                  <div className="w-11 h-11 mx-auto rounded-full bg-[#FF7A1A]/15 border border-[#FF7A1A]/30 flex items-center justify-center text-[#FF7A1A]">
                    <Phone className="w-4 h-4" />
                  </div>

                  {/* Title & Call Now */}
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-bold text-[#9CA3AF] tracking-wider uppercase">
                      NEED HELP?
                    </div>
                    <div className="font-heading text-lg font-extrabold text-white tracking-tight">
                      CALL NOW!
                    </div>
                  </div>

                  {/* Call Button */}
                  <a
                    href={FERRITE_CONTACT.getTelUrl()}
                    className="block w-full py-2.5 rounded-full bg-[#D9651E] hover:bg-[#FF7A1A] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-[0_0_20px_rgba(255,122,26,0.4)] transition-all active:scale-95"
                  >
                    {FERRITE_CONTACT.phone}
                  </a>

                  {/* Stay Connected & Socials */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <div className="text-[10px] font-bold text-[#9CA3AF] tracking-widest uppercase">
                      STAY CONNECTED
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all flex items-center justify-center"
                        aria-label="Facebook"
                      >
                        <FacebookIcon />
                      </a>
                      <a
                        href={FERRITE_CONTACT.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all flex items-center justify-center"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-[#E4405F]/20 border border-[#E4405F]/40 text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all flex items-center justify-center"
                        aria-label="Instagram"
                      >
                        <InstagramIcon />
                      </a>
                      <a
                        href={FERRITE_CONTACT.getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center"
                        aria-label="WhatsApp"
                      >
                        <WhatsAppIcon />
                      </a>
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all flex items-center justify-center"
                        aria-label="YouTube"
                      >
                        <YouTubeIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Credits Line */}
            <div className="pt-10 sm:pt-14 mt-10 sm:mt-14 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
              <div>
                © {new Date().getFullYear()} Ferrite Structural Steels Pvt Ltd. All rights reserved.
              </div>
              <div>
                Designed by <span className="text-white/80 font-medium">Vebiotic Web Solutions</span> Marketing by <span className="text-white/80 font-medium">Adinads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
