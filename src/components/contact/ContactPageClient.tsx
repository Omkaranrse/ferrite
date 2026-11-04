"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Building2,
  Warehouse,
  ArrowUpRight,
  CheckCircle2,
  FileText,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/ui/Badge";
import { locationsData } from "@/data/locations";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export default function ContactPageClient() {
  const ghatkopar = locationsData[0];
  const kalamboli = locationsData[1];

  return (
    <>
      <PageHeader
        eyebrow="COMMERCIAL & FACILITY HUBS"
        title="Operations positioned around"
        highlightedTitle="your requirements."
        subtitle="Connect directly with our commercial headquarters in Ghatkopar, Mumbai for estimations and contracting, or coordinate material handling and staging directly with our Kalamboli yard."
        breadcrumb="Contact Us"
      />

      {/* Main Section */}
      <section className="bg-graphite py-20 sm:py-28 text-offwhite min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Dual Location Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ghatkopar Hub */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -4 }}
              className="bg-charcoal border border-charcoal-border p-8 sm:p-10 hover:border-copper transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-charcoal-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-graphite border border-charcoal-border flex items-center justify-center text-copper">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-copper block font-semibold">
                        HEAD OFFICE & SALES
                      </span>
                      <h2 className="font-heading text-2xl font-bold text-white">
                        Ghatkopar, Mumbai
                      </h2>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-steel bg-graphite px-2.5 py-1 border border-charcoal-border">
                    {ghatkopar.coordinates.label}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-steel-light font-medium">
                  {ghatkopar.headline}
                </p>

                <div className="space-y-3.5 text-xs text-steel bg-graphite p-5 border border-charcoal-border">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                    <div>
                      {ghatkopar.address.map((line, i) => (
                        <span key={i} className="block text-white">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2 border-t border-charcoal-border">
                    <Phone className="w-4 h-4 text-copper shrink-0" />
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={FERRITE_CONTACT.getTelUrl(FERRITE_CONTACT.phoneRaw)}
                        onClick={() =>
                          trackEvent({
                            name: "phone_click",
                            params: { phone_number: FERRITE_CONTACT.phone, hub: "ghatkopar" },
                          })
                        }
                        className="font-mono text-white hover:text-copper transition-colors font-semibold"
                      >
                        {FERRITE_CONTACT.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-copper shrink-0" />
                    <a
                      href={FERRITE_CONTACT.getEmailUrl()}
                      onClick={() =>
                        trackEvent({
                          name: "email_click",
                          params: { email_address: FERRITE_CONTACT.email, hub: "ghatkopar" },
                        })
                      }
                      className="font-mono text-white hover:text-copper transition-colors font-semibold"
                    >
                      {FERRITE_CONTACT.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-copper shrink-0" />
                    <span>{ghatkopar.hours}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-copper block font-semibold">
                    COMMERCIAL ACTIVITIES
                  </span>
                  <ul className="space-y-1.5 text-xs text-steel-light">
                    {ghatkopar.scope.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-copper mt-1.5 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-charcoal-border flex items-center justify-between">
                <a
                  href="https://maps.google.com/?q=Excel+Plaza+Ghatkopar+East+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-heading font-medium text-copper hover:text-white inline-flex items-center gap-1.5"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-xs font-mono text-steel">Central Mumbai</span>
              </div>
            </motion.div>

            {/* Kalamboli Hub */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-charcoal border border-charcoal-border p-8 sm:p-10 hover:border-copper transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-charcoal-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-graphite border border-charcoal-border flex items-center justify-center text-copper">
                      <Warehouse className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-copper block font-semibold">
                        WAREHOUSE &amp; PROCESSING YARD
                      </span>
                      <h2 className="font-heading text-2xl font-bold text-white">
                        Kalamboli, Navi Mumbai
                      </h2>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-steel bg-graphite px-2.5 py-1 border border-charcoal-border">
                    {kalamboli.coordinates.label}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-steel-light font-medium">
                  {kalamboli.headline}
                </p>

                <div className="space-y-3.5 text-xs text-steel bg-graphite p-5 border border-charcoal-border">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                    <div>
                      {kalamboli.address.map((line, i) => (
                        <span key={i} className="block text-white">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2 border-t border-charcoal-border">
                    <Phone className="w-4 h-4 text-copper shrink-0" />
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={FERRITE_CONTACT.getTelUrl(FERRITE_CONTACT.phoneSecondaryRaw)}
                        onClick={() =>
                          trackEvent({
                            name: "phone_click",
                            params: { phone_number: FERRITE_CONTACT.phoneSecondary, hub: "kalamboli" },
                          })
                        }
                        className="font-mono text-white hover:text-copper transition-colors font-semibold"
                      >
                        {FERRITE_CONTACT.phoneSecondary}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-copper shrink-0" />
                    <a
                      href={FERRITE_CONTACT.getEmailUrl()}
                      onClick={() =>
                        trackEvent({
                          name: "email_click",
                          params: { email_address: FERRITE_CONTACT.email, hub: "kalamboli" },
                        })
                      }
                      className="font-mono text-white hover:text-copper transition-colors font-semibold"
                    >
                      {FERRITE_CONTACT.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-copper shrink-0" />
                    <span>{kalamboli.hours}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-copper block font-semibold">
                    YARD CAPABILITIES &amp; LOGISTICS
                  </span>
                  <ul className="space-y-1.5 text-xs text-steel-light">
                    {kalamboli.scope.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-copper mt-1.5 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-charcoal-border flex items-center justify-between">
                <a
                  href="https://maps.google.com/?q=Kalamboli+Warehousing+Complex+Navi+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-heading font-medium text-copper hover:text-white inline-flex items-center gap-1.5"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-xs font-mono text-steel">Navi Mumbai / Raigad</span>
              </div>
            </motion.div>
          </div>

          {/* Central Direct Communication Hub */}
          <div className="bg-charcoal border border-charcoal-border p-8 sm:p-12 shadow-2xl">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-3 pb-8 border-b border-charcoal-border">
                <Badge variant="copper">DIRECT COMMERCIAL LIAISON</Badge>
                <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
                  Connect Directly with Our Team
                </h2>
                <p className="text-xs sm:text-base text-steel max-w-2xl mx-auto leading-relaxed">
                  Fast-track your procurement without generic web forms. Reach our Ghatkopar estimation
                  desk and Kalamboli logistics team instantly through your preferred channel.
                </p>
              </div>

              {/* 3 Direct Communication Channels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. WhatsApp Instant Desk */}
                <div className="bg-graphite border border-charcoal-border hover:border-[#25D366] transition-colors p-6 sm:p-8 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                        FASTEST RESPONSE
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white mt-1">
                        WhatsApp Enquiry
                      </h3>
                    </div>
                    <p className="text-xs text-steel leading-relaxed">
                      Instant profile stock checks, mill availability confirmation, and live quotations.
                    </p>
                    <div className="font-mono text-sm font-semibold text-white pt-1">
                      {FERRITE_CONTACT.whatsappDisplay}
                    </div>
                  </div>

                  <a
                    href={FERRITE_CONTACT.getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent({
                        name: "whatsapp_click",
                        params: { location: "contact_page", message_type: "quote_request" },
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-heading text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 2. Engineering Mailbox */}
                <div className="bg-graphite border border-charcoal-border hover:border-copper transition-colors p-6 sm:p-8 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-graphite border border-charcoal-border flex items-center justify-center text-copper group-hover:border-copper transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-copper font-bold block">
                        TECHNICAL TRANSMITTALS
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white mt-1">
                        Email Drawings &amp; BOQ
                      </h3>
                    </div>
                    <p className="text-xs text-steel leading-relaxed">
                      Send CAD drawings (.dwg, .dxf), cutting schedules, and tender material specs directly to our estimators.
                    </p>
                    <div className="font-mono text-xs font-semibold text-white pt-1 break-all">
                      {FERRITE_CONTACT.email}
                    </div>
                  </div>

                  <a
                    href={FERRITE_CONTACT.getEmailUrl()}
                    onClick={() =>
                      trackEvent({
                        name: "email_click",
                        params: { email_address: FERRITE_CONTACT.email, hub: "general" },
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-charcoal border border-charcoal-border hover:border-copper text-white font-heading text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>Email Drawings</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-steel" />
                  </a>
                </div>

                {/* 3. Telephone Hotline */}
                <div className="bg-graphite border border-charcoal-border hover:border-white transition-colors p-6 sm:p-8 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-graphite border border-charcoal-border flex items-center justify-center text-copper group-hover:border-copper transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-steel font-bold block">
                        DIRECT CONSULTATION
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white mt-1">
                        Commercial Call Desk
                      </h3>
                    </div>
                    <p className="text-xs text-steel leading-relaxed">
                      Discuss mill pricing tie-ups, custom sizing tolerances, and staged logistics with our project managers.
                    </p>
                    <div className="space-y-1 pt-1 font-mono text-xs">
                      <div className="text-white">HQ: {FERRITE_CONTACT.phone}</div>
                      <div className="text-steel">Yard: {FERRITE_CONTACT.phoneSecondary}</div>
                    </div>
                  </div>

                  <a
                    href={FERRITE_CONTACT.getTelUrl(FERRITE_CONTACT.phoneRaw)}
                    onClick={() =>
                      trackEvent({
                        name: "phone_click",
                        params: { phone_number: FERRITE_CONTACT.phone, hub: "ghatkopar" },
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-charcoal border border-charcoal-border hover:border-copper text-white font-heading text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>Call Ghatkopar HQ</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-steel" />
                  </a>
                </div>
              </div>

              {/* Social Media & Official Company Footprint */}
              <div className="pt-8 border-t border-charcoal-border flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-graphite border border-charcoal-border flex items-center justify-center text-copper">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-steel block">
                      OFFICIAL SOCIAL PROFILE
                    </span>
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
                      className="text-sm font-heading font-medium text-white hover:text-copper inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Ferrite Structural Steels on LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-steel">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-copper" />
                    <span>MTC Supplied for Every Batch</span>
                  </div>
                  <span>•</span>
                  <div>
                    <span className="font-mono">CIN: {FERRITE_CONTACT.cin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
