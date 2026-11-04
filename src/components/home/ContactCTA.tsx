"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export default function ContactCTA() {
  return (
    <section className="bg-[#0E1215] py-14 sm:py-16 relative text-offwhite border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wide Horizontal Quotation Panel with Rounded Container & Thin Border */}
        <div className="rounded-2xl border border-white/10 bg-[#161A1D] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Left: Close-Up Structural Steel Photograph */}
          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-[320px] w-full overflow-hidden bg-black">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85"
              alt="Heavy structural steel sections and columns staged for fabrication"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center brightness-90 contrast-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-[#161A1D]/80 pointer-events-none" />
          </div>

          {/* Right: Quotation Content & Action */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-copper block font-semibold">
                COMMERCIAL ENQUIRY
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Get a Steel Quotation Today
              </h2>
              <p className="text-sm sm:text-base text-[#A9AFB2] font-body leading-relaxed max-w-xl">
                Share your requirements and our team will help you find the right steel products and availability.
              </p>
            </div>

            {/* Quick Contact Line */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-steel-light pt-1">
              <a
                href={FERRITE_CONTACT.getTelUrl()}
                className="inline-flex items-center gap-1.5 hover:text-copper transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-copper" />
                <span>{FERRITE_CONTACT.phone}</span>
              </a>
              <span className="text-white/20 hidden sm:inline">•</span>
              <a
                href={FERRITE_CONTACT.getEmailUrl()}
                className="inline-flex items-center gap-1.5 hover:text-copper transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-copper" />
                <span>{FERRITE_CONTACT.email}</span>
              </a>
            </div>

            {/* Orange CTA Button */}
            <div className="pt-2">
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
                    params: { location: "quotation_panel_cta", message_type: "quote_request" },
                  })
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-copper hover:bg-copper-hover text-white font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-copper/30 group"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
