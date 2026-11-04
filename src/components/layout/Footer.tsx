"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo";
import { useRFQ } from "@/context/RFQContext";
import { productsData } from "@/data/products";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  const { openRFQ } = useRFQ();
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString("en-IN", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-graphite-950 border-t border-charcoal-border text-steel pt-16 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Architectural Grid with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-charcoal-border"
        >
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <BrandLogo />
            <p className="text-sm leading-relaxed text-steel-light max-w-sm">
              Structural steel supply and precision material processing for construction,
              fabrication, infrastructure, and heavy industry. Business lineage dating back to 1965.
            </p>
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper block">
                CORE BRAND POSITIONING
              </span>
              <p className="font-heading font-medium text-white text-base">
                &ldquo;Structural Steel. Prepared for Purpose.&rdquo;
              </p>
            </div>

            {/* Direct WhatsApp CTA in Footer */}
            <div className="pt-2">
              <motion.a
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                href={FERRITE_CONTACT.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { location: "footer", message_type: "general_inquiry" },
                  })
                }
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 group shadow-lg"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="0"
                  fill="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>

            {/* Live IST clock with pulsating status dot */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-charcoal border border-charcoal-border text-xs font-mono text-steel-light">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <Clock className="w-3.5 h-3.5 text-copper" />
              <span suppressHydrationWarning>MUMBAI (IST): {istTime || "12:00:00 PM"}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-heading font-bold text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-heading">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Products", href: "/products" },
                { name: "Processing & Capabilities", href: "/capabilities" },
                { name: "Industries Served", href: "/industries" },
                { name: "Contact & Locations", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-copper transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-copper" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-heading font-bold text-white">
              Structural Inventory
            </h4>
            <ul className="space-y-2.5 text-xs font-heading">
              {productsData.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/products#${prod.id}`}
                    className="hover:text-copper transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-charcoal-border group-hover:bg-copper transition-colors" />
                    <span>{prod.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => openRFQ()}
                  className="text-xs font-heading text-copper hover:text-white uppercase tracking-wider font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>Request Custom Sizing</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Operational Hubs */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-heading font-bold text-white">
              Operations & Hubs
            </h4>

            {/* Ghatkopar Hub */}
            <div className="space-y-1.5 text-xs border-l-2 border-charcoal-border pl-3 hover:border-copper transition-colors">
              <span className="text-[10px] uppercase font-mono tracking-wider text-copper block">
                GHATKOPAR (HEAD OFFICE)
              </span>
              <p className="text-white font-medium">{FERRITE_CONTACT.ghatkopar.address}</p>
              <p className="text-steel text-[11px]">Enquiries, Contracting & Commercial Desk</p>
              <div className="flex flex-col gap-1 pt-0.5">
                <a
                  href={FERRITE_CONTACT.ghatkopar.phoneRaw ? `tel:${FERRITE_CONTACT.ghatkopar.phoneRaw}` : "tel:+918828335168"}
                  onClick={() =>
                    trackEvent({
                      name: "phone_click",
                      params: { phone_number: FERRITE_CONTACT.ghatkopar.phone, hub: "ghatkopar" },
                    })
                  }
                  className="text-white hover:text-copper font-mono text-[11px] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-copper" />
                  <span>{FERRITE_CONTACT.ghatkopar.phone}</span>
                </a>
                <a
                  href={FERRITE_CONTACT.getEmailUrl()}
                  onClick={() =>
                    trackEvent({
                      name: "email_click",
                      params: { email_address: FERRITE_CONTACT.email, hub: "ghatkopar" },
                    })
                  }
                  className="text-steel hover:text-copper font-mono text-[11px] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3 h-3 text-copper" />
                  <span>{FERRITE_CONTACT.email}</span>
                </a>
              </div>
            </div>

            {/* Kalamboli Hub */}
            <div className="space-y-1.5 text-xs border-l-2 border-charcoal-border pl-3 hover:border-copper transition-colors">
              <span className="text-[10px] uppercase font-mono tracking-wider text-copper block">
                KALAMBOLI (PROCESSING FACILITY)
              </span>
              <p className="text-white font-medium">Bina Complex, KWC, Navi Mumbai</p>
              <p className="text-steel text-[11px]">Material Yard, Bandsaw Cutting & Pan-India Dispatch</p>
              <div className="flex flex-col gap-1 pt-0.5">
                <a
                  href={FERRITE_CONTACT.kalamboli.phoneRaw ? `tel:${FERRITE_CONTACT.kalamboli.phoneRaw}` : "tel:+919920777336"}
                  onClick={() =>
                    trackEvent({
                      name: "phone_click",
                      params: { phone_number: FERRITE_CONTACT.kalamboli.phone, hub: "kalamboli" },
                    })
                  }
                  className="text-white hover:text-copper font-mono text-[11px] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-copper" />
                  <span>{FERRITE_CONTACT.kalamboli.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quality, Standards & BIS Affirmation */}
        <div className="py-8 border-b border-charcoal-border/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-copper" />
            <span className="text-white font-medium">Standard Compliance:</span>
            <span className="text-steel">
              IS 2062 | IS 808 | IS 1852 | IS 4923 | IS 1786 | ASTM A36 | ASTM A516
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-steel">
            <span>100% Mill Test Certificates (MTC)</span>
            <span>•</span>
            <span>Weighbridge Verified</span>
            <span>•</span>
            <span>Pan-India Transit Logistics</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Social Profiles & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel">
          <div>
            © {new Date().getFullYear()} Ferrite Structural Steels Pvt. Ltd. (Formerly Payal
            Enterprises Pvt. Ltd. — Lineage Est. 1965). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono">CIN: {FERRITE_CONTACT.cin}</span>

            {/* Verified LinkedIn Corporate Profile */}
            <motion.a
              whileHover={{ scale: 1.05, y: -1 }}
              href={FERRITE_CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent({
                  name: "social_click",
                  params: { platform: "linkedin", url: FERRITE_CONTACT.linkedin },
                })
              }
              className="inline-flex items-center gap-1.5 text-steel hover:text-white transition-colors"
              aria-label="Ferrite Structural Steels on LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="currentColor"
                className="w-3.5 h-3.5 text-copper"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-steel-muted" />
            </motion.a>

            <Link href="/contact" className="hover:text-copper transition-colors">
              Commercial Enquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
