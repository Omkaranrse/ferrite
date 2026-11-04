"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export default function ContactCTA() {
  return (
    <section className="relative py-24 sm:py-32 bg-graphite border-t border-charcoal-border overflow-hidden">
      {/* Background Graphic Asset */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=80"
          alt="Heavy structural steel cutting and material preparation operations at Ferrite Kalamboli facility"
          fill
          sizes="100vw"
          className="object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/90 to-graphite" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Narrative & Facility Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Badge variant="copper">QUOTATION ENQUIRY</Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] font-heading">
                Get a Steel <br />
                <span className="text-copper">Quotation Today</span>
              </h2>
              <p className="text-base sm:text-lg text-steel-light font-body leading-relaxed font-normal">
                Share your requirements and our team will help you find the right steel products and availability.
                Backed by a legacy dating back to 1965, we review drawings, grades, and steel cutting schedules
                to structure competitive project pricing.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-4 border-t border-charcoal-border">
              {/* WhatsApp Quick Link */}
              <a
                href={FERRITE_CONTACT.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { location: "contact_cta_card", message_type: "general_inquiry" },
                  })
                }
                className="p-4 bg-charcoal border border-charcoal-border hover:border-[#25D366] flex items-center justify-between group transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block font-medium">
                      INSTANT WHATSAPP ENQUIRY
                    </span>
                    <span className="text-sm font-heading font-bold text-white font-mono">
                      {FERRITE_CONTACT.whatsappDisplay}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-steel group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Telephone */}
              <div className="p-4 bg-charcoal border border-charcoal-border flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-graphite border border-charcoal-border flex items-center justify-center text-copper shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-steel block font-medium">
                      COMMERCIAL HOTLINES
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-sm font-heading font-bold text-white font-mono mt-0.5">
                      <a
                        href={FERRITE_CONTACT.getTelUrl(FERRITE_CONTACT.phoneRaw)}
                        onClick={() =>
                          trackEvent({
                            name: "phone_click",
                            params: { phone_number: FERRITE_CONTACT.phone, hub: "ghatkopar" },
                          })
                        }
                        className="hover:text-copper transition-colors"
                      >
                        {FERRITE_CONTACT.phone}
                      </a>
                      <span className="text-steel-muted">/</span>
                      <a
                        href={FERRITE_CONTACT.getTelUrl(FERRITE_CONTACT.phoneSecondaryRaw)}
                        onClick={() =>
                          trackEvent({
                            name: "phone_click",
                            params: { phone_number: FERRITE_CONTACT.phoneSecondary, hub: "kalamboli" },
                          })
                        }
                        className="hover:text-copper transition-colors"
                      >
                        {FERRITE_CONTACT.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <a
                href={FERRITE_CONTACT.getEmailUrl()}
                onClick={() =>
                  trackEvent({
                    name: "email_click",
                    params: { email_address: FERRITE_CONTACT.email, hub: "general" },
                  })
                }
                className="p-4 bg-charcoal border border-charcoal-border hover:border-copper flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-graphite border border-charcoal-border flex items-center justify-center text-copper shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-steel block font-medium">
                      TECHNICAL DRAWINGS & SPECIFICATIONS
                    </span>
                    <span className="text-sm font-heading font-bold text-white font-mono">
                      {FERRITE_CONTACT.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-steel group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* LinkedIn */}
              <a
                href={FERRITE_CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent({
                    name: "social_click",
                    params: { platform: "linkedin", url: FERRITE_CONTACT.linkedin },
                  })
                }
                className="p-4 bg-charcoal border border-charcoal-border hover:border-copper flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-graphite border border-charcoal-border flex items-center justify-center text-copper shrink-0">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-steel block font-medium">
                      OFFICIAL CORPORATE PROFILE
                    </span>
                    <span className="text-sm font-heading font-medium text-white">
                      Ferrite Structural Steels on LinkedIn
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-steel group-hover:text-copper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Communication & Dispatch Station */}
          <div className="lg:col-span-7 bg-charcoal border border-charcoal-border p-6 sm:p-10 shadow-2xl relative">
            <div className="border-b border-charcoal-border pb-6 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-copper block font-semibold">
                DIRECT COMMUNICATION CHANNELS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                Fast-Track Project Material Quoting
              </h3>
              <p className="text-xs sm:text-sm text-steel mt-2 leading-relaxed">
                Choose your preferred communication channel to initiate quotations, verify inventory in stock, or transmit technical drawings.
              </p>
            </div>

            {/* 3 Prominent Communication Blocks */}
            <div className="space-y-6">
              {/* Channel 1: WhatsApp */}
              <div className="p-6 bg-graphite border border-charcoal-border hover:border-[#25D366]/60 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                        PRIMARY DESK — FASTEST RESPONSE
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-white">
                      Direct WhatsApp Project Enquiry
                    </h4>
                    <p className="text-xs text-steel leading-relaxed">
                      Connect instantly with our sales and estimating engineers for price confirmation, mill schedules, and profile sizes.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <a
                      href={FERRITE_CONTACT.getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent({
                          name: "whatsapp_click",
                          params: { location: "contact_cta_box", message_type: "quote_request" },
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-heading text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
                    >
                      <span>Request a Quote</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Channel 2: Email Technical Specifications */}
              <div className="p-6 bg-graphite border border-charcoal-border hover:border-copper/60 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-md">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-copper font-semibold block">
                      BOQ &amp; TENDER TRANSMITTALS
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white">
                      Email Drawings &amp; Schedules
                    </h4>
                    <p className="text-xs text-steel leading-relaxed">
                      Send CAD drawings (.dwg, .dxf), cutting schedules, and technical requirements directly to our engineering mailbox.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <a
                      href={FERRITE_CONTACT.getEmailUrl()}
                      onClick={() =>
                        trackEvent({
                          name: "email_click",
                          params: { email_address: FERRITE_CONTACT.email, hub: "general" },
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-3 bg-charcoal border border-charcoal-border hover:border-copper text-white font-heading text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-copper" />
                      <span>Email Drawings</span>
                      <ArrowUpRight className="w-4 h-4 text-steel" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Channel 3: Telephone Hotline */}
              <div className="p-6 bg-graphite border border-charcoal-border hover:border-white/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-md">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-steel font-semibold block">
                      COMMERCIAL COORDINATION
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white">
                      Call Commercial Headquarters
                    </h4>
                    <p className="text-xs text-steel leading-relaxed">
                      Discuss high-tonnage mill contracts, project specifications, and urgent warehouse dispatches with our senior desk.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <a
                      href={FERRITE_CONTACT.getTelUrl()}
                      onClick={() =>
                        trackEvent({
                          name: "phone_click",
                          params: { phone_number: FERRITE_CONTACT.phone, hub: "ghatkopar" },
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-3 bg-charcoal border border-charcoal-border hover:border-copper text-white font-heading text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-copper" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Traceability Affirmations */}
            <div className="mt-8 pt-6 border-t border-charcoal-border/70 flex flex-wrap items-center justify-between gap-4 text-xs text-steel">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-copper" />
                <span className="text-white font-medium">100% Original MTC</span>
                <span>with heat numbers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-copper" />
                <span className="text-white font-medium">Ghatkopar HQ</span>
                <span>&amp;</span>
                <span className="text-white font-medium">Kalamboli Yard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
