"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo";
import { useRFQ } from "@/context/RFQContext";
import { productsData } from "@/data/products";

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
        {/* Top Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-charcoal-border">
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
            {/* Live IST clock */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-charcoal border border-charcoal-border text-xs font-mono text-steel-light">
              <Clock className="w-3.5 h-3.5 text-copper" />
              <span>MUMBAI (IST): {istTime || "12:00:00 PM"}</span>
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
              <p className="text-white font-medium">Excel Plaza, Pant Nagar, Ghatkopar East</p>
              <p className="text-steel text-[11px]">Enquiries, Contracting & Commercial Desk</p>
              <p className="text-steel font-mono text-[11px]">+91 88283 35168</p>
            </div>

            {/* Kalamboli Hub */}
            <div className="space-y-1.5 text-xs border-l-2 border-charcoal-border pl-3 hover:border-copper transition-colors">
              <span className="text-[10px] uppercase font-mono tracking-wider text-copper block">
                KALAMBOLI (PROCESSING FACILITY)
              </span>
              <p className="text-white font-medium">Bina Complex, KWC, Navi Mumbai</p>
              <p className="text-steel text-[11px]">Material Yard, Bandsaw Cutting & Pan-India Dispatch</p>
              <p className="text-steel font-mono text-[11px]">+91 99207 77336</p>
            </div>
          </div>
        </div>

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

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel">
          <div>
            © {new Date().getFullYear()} Ferrite Structural Steels Pvt. Ltd. (Formerly Payal
            Enterprises Pvt. Ltd. — Lineage Est. 1965). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono">CIN: U27100MH2014PTC254823</span>
            <Link href="/contact" className="hover:text-copper transition-colors">
              Commercial Enquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

