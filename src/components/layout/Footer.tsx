"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, Clock } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

const FOOTER_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Capabilities", href: "/capabilities" },
  { name: "Industries", href: "/industries" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
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
    <footer className="bg-[#0A0D10] border-t border-white/10 text-steel py-12 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Three-Column Minimal Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10 items-start">
          {/* Left: Ferrite Logo & Company Descriptor */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-7 h-7 relative flex items-center justify-center">
                <img
                  src="/ferrite-icon.svg"
                  alt="Ferrite"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-sm tracking-wider uppercase text-copper leading-none">
                  FERRITE
                </span>
                <span className="text-[7.5px] font-mono tracking-widest uppercase text-steel-light leading-none mt-1">
                  STRUCTURAL STEELS PVT. LTD.
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#A9AFB2] leading-relaxed max-w-sm font-body">
              Structural steel supply and precision material processing for construction,
              infrastructure, fabrication and heavy industry. Business lineage dating back to 1965.
            </p>

            <div className="text-[11px] font-mono text-steel pt-1">
              <span>Kalamboli Yard • Ghatkopar Commercial HQ, Mumbai</span>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest font-mono text-copper font-semibold">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-heading">
              {FOOTER_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#A9AFB2] hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-copper" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Verified Social Links & Contact Options */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest font-mono text-copper font-semibold">
              CONTACT &amp; PROFILES
            </h4>
            <div className="space-y-2.5 text-xs font-body">
              <div>
                <a
                  href={FERRITE_CONTACT.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent({
                      name: "whatsapp_click",
                      params: { location: "footer", message_type: "general_inquiry" },
                    })
                  }
                  className="text-white hover:text-copper transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>WhatsApp: {FERRITE_CONTACT.whatsappDisplay}</span>
                </a>
              </div>

              <div>
                <a
                  href={FERRITE_CONTACT.getTelUrl()}
                  className="text-[#A9AFB2] hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-copper" />
                  <span>{FERRITE_CONTACT.phone}</span>
                </a>
              </div>

              <div>
                <a
                  href={FERRITE_CONTACT.getEmailUrl()}
                  className="text-[#A9AFB2] hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-copper" />
                  <span>{FERRITE_CONTACT.email}</span>
                </a>
              </div>

              <div className="pt-1">
                <a
                  href={FERRITE_CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steel hover:text-white transition-colors inline-flex items-center gap-1.5 text-[11px] font-heading font-medium"
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className="text-copper">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn Corporate Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-steel" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Live IST Clock */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-steel">
          <div>
            © {new Date().getFullYear()} Ferrite Structural Steels Pvt. Ltd. (Lineage Est. 1965). All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>CIN: {FERRITE_CONTACT.cin}</span>
            <span>•</span>
            <div className="inline-flex items-center gap-1.5 text-steel-light">
              <Clock className="w-3 h-3 text-copper" />
              <span suppressHydrationWarning className="tabular-nums">
                MUMBAI (IST): {istTime || "12:00:00 PM"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
