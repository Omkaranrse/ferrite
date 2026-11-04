"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Building2, Warehouse, Route, Scale, Shield } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { locationsData } from "@/data/locations";
import { useRFQ } from "@/context/RFQContext";

export default function Facilities() {
  const { openRFQ } = useRFQ();
  const ghatkopar = locationsData[0];
  const kalamboli = locationsData[1];

  return (
    <section id="locations" className="bg-offwhite text-graphite py-24 sm:py-36 relative overflow-hidden bg-grid-pattern-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 sm:mb-24">
          <Badge variant="light" className="text-graphite font-bold">
            06 / STRATEGIC INFRASTRUCTURE
          </Badge>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-graphite leading-[1.06]">
            Operations positioned <br />
            <span className="text-copper">around your requirements.</span>
          </h2>
          <p className="text-base sm:text-xl text-steel-dark leading-relaxed font-body font-normal">
            Two specialized operational hubs serving clients across Mumbai, Maharashtra, and
            pan-India — pairing corporate commercial responsiveness with heavy yard handling
            power.
          </p>
        </div>

        {/* Corridor Metric Banner */}
        <div className="mb-12 p-6 sm:p-7 bg-white border border-offwhite-border shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-offwhite border border-offwhite-border flex items-center justify-center text-copper shrink-0">
              <Route className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper block font-semibold">
                DIRECT TRANSIT CORRIDOR
              </span>
              <h4 className="font-heading font-bold text-base sm:text-lg text-graphite">
                Ghatkopar HQ $\longleftrightarrow$ Kalamboli Complex (~28 km)
              </h4>
              <p className="text-xs text-steel-dark mt-0.5">
                Connected via Eastern Express Highway & Sion-Panvel Expressway for immediate site dispatches.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-steel-dark font-mono border-t md:border-t-0 md:border-l border-offwhite-border pt-4 md:pt-0 md:pl-8">
            <div>
              <span className="text-graphite font-bold block text-sm">20-TON</span>
              <span>Crane Capacity</span>
            </div>
            <div>
              <span className="text-graphite font-bold block text-sm">100-TON</span>
              <span>Weighbridge</span>
            </div>
            <div>
              <span className="text-graphite font-bold block text-sm">24/7</span>
              <span>Staged Dispatch</span>
            </div>
          </div>
        </div>

        {/* Dual Hub Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Hub 1: GHATKOPAR (Commercial Headquarters) */}
          <div className="bg-white border border-offwhite-border shadow-xl p-8 sm:p-12 flex flex-col justify-between group hover:border-copper transition-all duration-300">
            <div className="space-y-6">
              {/* Badge & Monogram */}
              <div className="flex items-center justify-between pb-5 border-b border-offwhite-border">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-offwhite border border-offwhite-border flex items-center justify-center text-copper">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-copper block font-semibold">
                      COMMERCIAL HEADQUARTERS
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-graphite">
                      GHATKOPAR
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xs text-steel-dark bg-offwhite px-2.5 py-1 border border-offwhite-border">
                  {ghatkopar.coordinates.label}
                </span>
              </div>

              {/* Key Scope Headline */}
              <p className="text-sm font-heading font-medium text-graphite leading-relaxed">
                {ghatkopar.headline}
              </p>

              {/* Address & Direct Contacts */}
              <div className="space-y-3.5 text-xs text-steel-dark bg-offwhite p-5 sm:p-6 border border-offwhite-border">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <div>
                    {ghatkopar.address.map((line, i) => (
                      <span key={i} className="block leading-relaxed">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-offwhite-border">
                  <Phone className="w-4 h-4 text-copper shrink-0" />
                  <div className="flex flex-wrap gap-x-4">
                    {ghatkopar.phone.map((ph, i) => (
                      <a
                        key={i}
                        href={`tel:${ph.replace(/\s+/g, "")}`}
                        className="font-mono text-graphite hover:text-copper transition-colors font-medium"
                      >
                        {ph}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-copper shrink-0" />
                  <a
                    href={`mailto:${ghatkopar.email}`}
                    className="font-mono text-graphite hover:text-copper transition-colors font-medium"
                  >
                    {ghatkopar.email}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-copper shrink-0" />
                  <span>{ghatkopar.hours}</span>
                </div>
              </div>

              {/* Operational Responsibilities */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel-dark block font-semibold">
                  HUB RESPONSIBILITIES
                </span>
                <ul className="space-y-2 text-xs text-graphite">
                  {ghatkopar.scope.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-copper shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-8 mt-6 border-t border-offwhite-border flex items-center justify-between">
              <Button
                onClick={() => openRFQ("Ghatkopar Commercial Enquiry")}
                variant="primary"
                size="sm"
                withArrow
              >
                Connect with Sales Team
              </Button>
              <a
                href="https://maps.google.com/?q=Excel+Plaza+Ghatkopar+East+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-heading font-medium text-steel-dark hover:text-copper inline-flex items-center gap-1.5"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
              </a>
            </div>
          </div>

          {/* Hub 2: KALAMBOLI (Warehousing & Processing Complex) */}
          <div className="bg-white border border-offwhite-border shadow-xl p-8 sm:p-12 flex flex-col justify-between group hover:border-copper transition-all duration-300">
            <div className="space-y-6">
              {/* Badge & Monogram */}
              <div className="flex items-center justify-between pb-5 border-b border-offwhite-border">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-offwhite border border-offwhite-border flex items-center justify-center text-copper">
                    <Warehouse className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-copper block font-semibold">
                      PROCESSING & LOGISTICS COMPLEX
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-graphite">
                      KALAMBOLI
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xs text-steel-dark bg-offwhite px-2.5 py-1 border border-offwhite-border">
                  {kalamboli.coordinates.label}
                </span>
              </div>

              {/* Key Scope Headline */}
              <p className="text-sm font-heading font-medium text-graphite leading-relaxed">
                {kalamboli.headline}
              </p>

              {/* Address & Direct Contacts */}
              <div className="space-y-3.5 text-xs text-steel-dark bg-offwhite p-5 sm:p-6 border border-offwhite-border">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                  <div>
                    {kalamboli.address.map((line, i) => (
                      <span key={i} className="block leading-relaxed">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-offwhite-border">
                  <Phone className="w-4 h-4 text-copper shrink-0" />
                  <div className="flex flex-wrap gap-x-4">
                    {kalamboli.phone.map((ph, i) => (
                      <a
                        key={i}
                        href={`tel:${ph.replace(/\s+/g, "")}`}
                        className="font-mono text-graphite hover:text-copper transition-colors font-medium"
                      >
                        {ph}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-copper shrink-0" />
                  <a
                    href={`mailto:${kalamboli.email}`}
                    className="font-mono text-graphite hover:text-copper transition-colors font-medium"
                  >
                    {kalamboli.email}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-copper shrink-0" />
                  <span>{kalamboli.hours}</span>
                </div>
              </div>

              {/* Operational Responsibilities */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-steel-dark block font-semibold">
                  FACILITY CAPABILITIES
                </span>
                <ul className="space-y-2 text-xs text-graphite">
                  {kalamboli.scope.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-copper shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-8 mt-6 border-t border-offwhite-border flex items-center justify-between">
              <Button
                onClick={() => openRFQ("Kalamboli Yard Pickup / Dispatch")}
                variant="primary"
                size="sm"
                withArrow
              >
                Coordinate Yard Material
              </Button>
              <a
                href="https://maps.google.com/?q=Kalamboli+Warehousing+Complex+Navi+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-heading font-medium text-steel-dark hover:text-copper inline-flex items-center gap-1.5"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-copper" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
