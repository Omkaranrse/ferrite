"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

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

// Interactive Snapshot Polaroid Card Component (from Framer Snapshot-Footer)
function SnapshotCard({
  image,
  caption,
  rotate = 0,
  zIndex = 1,
}: {
  image: string;
  caption: string;
  rotate?: number;
  zIndex?: number;
}) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -15, right: 15, top: -15, bottom: 15 }}
      initial={{ rotate }}
      whileHover={{
        rotate: 0,
        scale: 1.08,
        zIndex: 30,
        transition: { type: "spring", stiffness: 350, damping: 25 },
      }}
      whileTap={{ scale: 0.96 }}
      style={{ zIndex }}
      className="cursor-grab active:cursor-grabbing bg-[#181E24] p-2.5 pb-3.5 rounded-lg border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.55)] select-none shrink-0 w-36 sm:w-44"
    >
      <div className="relative aspect-square w-full rounded overflow-hidden bg-black/50 shadow-inner">
        <Image
          src={image}
          alt={caption}
          fill
          sizes="200px"
          className="object-cover pointer-events-none"
        />
      </div>
      <p className="mt-2 text-[10px] sm:text-[11px] font-mono text-center text-[#9CA3AF] truncate">
        {caption}
      </p>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0E11] text-[#9CA3AF] relative border-t border-white/10 overflow-hidden">
      {/* Top Ambient Glow Accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF7A1A]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[#FF7A1A]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 relative z-10">
        {/* ======================================================== */}
        {/* 1. TOP CALL TO ACTION BLOCK (As shown in screenshot)    */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 sm:mb-20">
          {/* Left Card: GET A QUOTE */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#161D24] via-[#11171D] to-[#0D1216] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Subtle Top-Left Glow */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-[#FF7A1A]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 relative z-10 max-w-xl">
              <div className="text-xs font-mono font-bold text-[#FF7A1A] tracking-wider uppercase">
                GET A QUOTE
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-white tracking-tight leading-tight">
                Still have a question about your steel requirement?
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed pt-1">
                Share your requirement and our experts will help you with the right steel solution,
                best price and on-time delivery.
              </p>
            </div>

            <div className="pt-6 sm:pt-8 relative z-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#D9651E] to-[#FF7A1A] hover:from-[#E66E24] hover:to-[#FF882E] text-white font-heading text-xs sm:text-sm font-bold shadow-lg hover:shadow-[0_0_24px_rgba(255,122,26,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <span>Request a Quote</span>
                <span className="font-bold text-base transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Right Card: TALK TO OUR SALES TEAM */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="text-xs font-mono font-bold text-[#9CA3AF] tracking-wider uppercase pl-1">
              TALK TO OUR SALES TEAM
            </div>

            {/* 3 Interactive Communication Rows */}
            <div className="space-y-2.5 flex-1 flex flex-col justify-between">
              {/* Call us */}
              <a
                href={FERRITE_CONTACT.getTelUrl()}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#12181D]/90 hover:bg-[#161F26] border border-white/10 hover:border-[#FF7A1A]/50 transition-all duration-300 group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#FF7A1A] group-hover:border-[#FF7A1A] transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#9CA3AF] font-medium leading-none mb-1">
                      Call us
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FF7A1A] transition-colors">
                      {FERRITE_CONTACT.phone}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#FF7A1A] transition-transform group-hover:translate-x-1" />
              </a>

              {/* Email us */}
              <a
                href={FERRITE_CONTACT.getEmailUrl()}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#12181D]/90 hover:bg-[#161F26] border border-white/10 hover:border-[#FF7A1A]/50 transition-all duration-300 group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#FF7A1A] group-hover:border-[#FF7A1A] transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#9CA3AF] font-medium leading-none mb-1">
                      Email us
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FF7A1A] transition-colors">
                      {FERRITE_CONTACT.email}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#FF7A1A] transition-transform group-hover:translate-x-1" />
              </a>

              {/* WhatsApp */}
              <a
                href={FERRITE_CONTACT.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { location: "footer_cta", message_type: "general_inquiry" },
                  })
                }
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#12181D]/90 hover:bg-[#161F26] border border-white/10 hover:border-[#25D366]/50 transition-all duration-300 group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                    <WhatsAppIcon />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#9CA3AF] font-medium leading-none mb-1">
                      WhatsApp
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#25D366] transition-colors">
                      Chat with our team
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#FF7A1A] transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. SNAPSHOT POLAROID PILE (Framer Snapshot Footer Spec)  */}
        {/* ======================================================== */}
        <div className="mb-16 sm:mb-20 overflow-x-auto no-scrollbar py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center justify-start lg:justify-center gap-4 sm:gap-6 min-w-max lg:min-w-0">
            {/* Snapshot 1: Angles */}
            <SnapshotCard
              image="/images/products/steel-angle.png"
              caption="Stockyard Angles · 9:04 AM"
              rotate={-5}
              zIndex={1}
            />

            {/* Snapshot 2: Beams */}
            <SnapshotCard
              image="/images/products/steel-beams.png"
              caption="Heavy Beams Mill · 11:30 AM"
              rotate={4}
              zIndex={2}
            />

            {/* Central Sticky NoteCard */}
            <motion.div
              drag
              dragConstraints={{ left: -15, right: 15, top: -15, bottom: 15 }}
              initial={{ rotate: -2 }}
              whileHover={{
                rotate: 0,
                scale: 1.08,
                zIndex: 30,
                transition: { type: "spring", stiffness: 350, damping: 25 },
              }}
              whileTap={{ scale: 0.96 }}
              style={{ zIndex: 3 }}
              className="relative cursor-grab active:cursor-grabbing bg-[#1C242C] p-3.5 pb-4 rounded-xl border border-white/15 shadow-[0_6px_24px_rgba(0,0,0,0.6)] select-none shrink-0 w-44 sm:w-52"
            >
              {/* Tape Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/20 backdrop-blur-sm rounded-sm border border-white/20 rotate-[-2deg]" />
              <div className="pt-1 space-y-1 text-center">
                <span className="text-[10px] font-mono font-bold text-[#FF7A1A] tracking-wider uppercase">
                  FERRITE HQ
                </span>
                <p className="text-xs font-bold text-white leading-tight">
                  Mumbai &amp; Kalamboli
                </p>
                <div className="pt-1.5 border-t border-white/10 text-[10px] text-[#9CA3AF] leading-tight space-y-0.5">
                  <div>Mon – Sat: 08:30 AM – 07:30 PM</div>
                  <div className="text-[#FF7A1A] font-semibold">{FERRITE_CONTACT.phone}</div>
                </div>
              </div>
            </motion.div>

            {/* Snapshot 3: Pipes */}
            <SnapshotCard
              image="/images/products/steel-pipes.png"
              caption="Kalamboli Yard · 2:15 PM"
              rotate={-6}
              zIndex={2}
            />

            {/* Snapshot 4: Welded Assemblies */}
            <SnapshotCard
              image="/images/services/welded-assemblies.jpg"
              caption="Fabrication Shop · 4:45 PM"
              rotate={5}
              zIndex={1}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. MAIN FOOTER COLUMNS & HELP CARD (Exact Screenshot)    */}
        {/* ======================================================== */}
        <div className="pt-12 sm:pt-16 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Col 1: QUICK LINKS */}
          <div className="lg:col-span-2 space-y-3.5">
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
          <div className="lg:col-span-2 space-y-3.5">
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

          {/* Col 3: HEAD OFFICE / SALES */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-heading text-xs font-bold text-white tracking-wider uppercase">
              HEAD OFFICE / SALES
            </h3>
            <div className="space-y-2.5 text-xs text-[#9CA3AF]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF7A1A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Excel Plaza, 803/B wing, 90 Feet Rd, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra, India - 400075
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0" />
                <a
                  href={FERRITE_CONTACT.getTelUrl()}
                  className="hover:text-white transition-colors"
                >
                  {FERRITE_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0" />
                <a
                  href={`mailto:${FERRITE_CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {FERRITE_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: FACTORY ADDRESS */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="font-heading text-xs font-bold text-white tracking-wider uppercase">
              FACTORY ADDRESS
            </h3>
            <div className="space-y-2.5 text-xs text-[#9CA3AF]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF7A1A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Plot 18, KWC Kalamboli, Dist. - Raigad, Navi Mumbai, India - 410218
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0" />
                <a
                  href={FERRITE_CONTACT.getTelUrl(FERRITE_CONTACT.phoneSecondaryRaw)}
                  className="hover:text-white transition-colors"
                >
                  {FERRITE_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0" />
                <a
                  href={`mailto:${FERRITE_CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {FERRITE_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 5: NEED HELP? CALL NOW! CARD */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl bg-[#11171D] border border-white/10 p-5 sm:p-6 text-center space-y-3.5 shadow-xl overflow-hidden">
              {/* Orange Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-[#FF7A1A] shadow-[0_0_10px_#FF7A1A]" />

              {/* Phone Icon */}
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FF7A1A]/15 border border-[#FF7A1A]/30 flex items-center justify-center text-[#FF7A1A]">
                <Phone className="w-5 h-5" />
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

              {/* Stay Connected */}
              <div className="pt-2 border-t border-white/10 space-y-2.5">
                <div className="text-[10px] font-bold text-[#9CA3AF] tracking-widest uppercase">
                  STAY CONNECTED
                </div>
                <div className="flex items-center justify-center gap-2.5">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all flex items-center justify-center"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={FERRITE_CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all flex items-center justify-center"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#E4405F]/20 border border-[#E4405F]/40 text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={FERRITE_CONTACT.getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all flex items-center justify-center"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. GIANT FERRITE WORDMARK (Snapshot-Footer signature)    */}
        {/* ======================================================== */}
        <div className="relative mt-12 sm:mt-16 overflow-hidden pointer-events-none select-none text-center">
          <span className="font-heading font-black text-[14vw] tracking-tighter text-white/[0.03] uppercase leading-none block">
            FERRITE
          </span>
        </div>

        {/* ======================================================== */}
        {/* 5. BOTTOM BAR (Exact Screenshot)                         */}
        {/* ======================================================== */}
        <div className="pt-8 border-t border-white/5 text-center text-xs text-[#6B7280]">
          © {new Date().getFullYear()} Ferrite Structural Steels Pvt Ltd. All rights reserved. &nbsp;|&nbsp; Designed by <span className="text-white/80 font-medium">Vebiotic Web Solutions</span> Marketing by <span className="text-white/80 font-medium">Adinads</span>
        </div>
      </div>
    </footer>
  );
}
