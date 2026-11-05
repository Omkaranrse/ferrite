"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export default function ContactCTA() {
  return (
    <section className="py-10 sm:py-14 bg-[#0A0E11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#12181D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Left Photographic Column — Metallic Structural Steel Beams */}
            <div className="md:col-span-5 relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85"
                alt="Structural steel I-beams ready for dispatch"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center brightness-90 contrast-110"
              />
              {/* Fade Gradient transitioning seamlessly into right card background */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#12181D]/40 to-[#12181D]" />
            </div>

            {/* Right Narrative & CTA Column */}
            <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-lg">
                <div className="text-xs font-mono font-semibold text-copper tracking-wider uppercase">
                  —
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  Get a Steel Quotation Today
                </h2>
                <p className="text-xs sm:text-sm text-[#9CA3AF] font-body leading-relaxed">
                  Share your requirements and our team will get back with the best offer and availability.
                </p>
              </div>

              <div className="shrink-0">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href={FERRITE_CONTACT.getWhatsAppUrl(
                    "Hello Ferrite Team, I would like to request a quotation for structural steel."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent({
                      name: "whatsapp_click",
                      params: { location: "cta_banner", message_type: "quote_request" },
                    })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-copper hover:bg-copper-hover text-white font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-lg hover:shadow-copper/30 group whitespace-nowrap"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
