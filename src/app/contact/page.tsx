"use client";

import React, { useState } from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, Building2, Warehouse, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { locationsData } from "@/data/locations";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"all" | "ghatkopar" | "kalamboli">("all");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    material: "Structural Beams (ISMB / Universal Beams)",
    tonnage: "10 – 50 MT",
    destination: "Pan-India Site Dispatch",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const ghatkopar = locationsData[0];
  const kalamboli = locationsData[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generated = `FSS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setRefId(generated);
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C47A48", "#858B90", "#FFFFFF"],
        });
      } catch {
        // Fallback
      }
    }, 850);
  };

  return (
    <>
      <PageHeader
        eyebrow="COMMERCIAL & FACILITY HUBS"
        title="Operations positioned around"
        highlightedTitle="your requirements."
        subtitle="Contact our commercial headquarters in Ghatkopar, Mumbai for estimations and contracting, or coordinate material handling and staging directly with our Kalamboli yard."
        breadcrumb="Contact Us"
      />

      {/* Main Section */}
      <section className="bg-graphite py-20 sm:py-28 text-offwhite min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dual Location Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* Ghatkopar Hub */}
            <div className="bg-charcoal border border-charcoal-border p-8 sm:p-10 hover:border-copper transition-colors flex flex-col justify-between">
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
                      <h3 className="font-heading text-2xl font-bold text-white">
                        Ghatkopar, Mumbai
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-steel bg-graphite px-2.5 py-1 border border-charcoal-border">
                    {ghatkopar.coordinates.label}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-steel-light font-medium">
                  {ghatkopar.headline}
                </p>

                <div className="space-y-3 text-xs text-steel bg-graphite p-5 border border-charcoal-border">
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
                    <div className="flex flex-wrap gap-x-4">
                      {ghatkopar.phone.map((ph, i) => (
                        <a
                          key={i}
                          href={`tel:${ph.replace(/\s+/g, "")}`}
                          className="font-mono text-white hover:text-copper transition-colors font-medium"
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
                      className="font-mono text-white hover:text-copper transition-colors font-medium"
                    >
                      {ghatkopar.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-copper shrink-0" />
                    <span>{ghatkopar.hours}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-copper block">
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
            </div>

            {/* Kalamboli Hub */}
            <div className="bg-charcoal border border-charcoal-border p-8 sm:p-10 hover:border-copper transition-colors flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-charcoal-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-graphite border border-charcoal-border flex items-center justify-center text-copper">
                      <Warehouse className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-copper block font-semibold">
                        WAREHOUSE & PROCESSING YARD
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-white">
                        Kalamboli, Navi Mumbai
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-steel bg-graphite px-2.5 py-1 border border-charcoal-border">
                    {kalamboli.coordinates.label}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-steel-light font-medium">
                  {kalamboli.headline}
                </p>

                <div className="space-y-3 text-xs text-steel bg-graphite p-5 border border-charcoal-border">
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
                    <div className="flex flex-wrap gap-x-4">
                      {kalamboli.phone.map((ph, i) => (
                        <a
                          key={i}
                          href={`tel:${ph.replace(/\s+/g, "")}`}
                          className="font-mono text-white hover:text-copper transition-colors font-medium"
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
                      className="font-mono text-white hover:text-copper transition-colors font-medium"
                    >
                      {kalamboli.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-copper shrink-0" />
                    <span>{kalamboli.hours}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-copper block">
                    YARD CAPABILITIES & LOGISTICS
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
            </div>
          </div>

          {/* Central RFQ Form Container */}
          <div className="bg-charcoal border border-charcoal-border p-8 sm:p-12 shadow-2xl">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-3 pb-6 border-b border-charcoal-border">
                <Badge variant="copper">CENTRALIZED ESTIMATION DESK</Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                  Submit Formal RFQ / Tender Enquiry
                </h2>
                <p className="text-xs sm:text-sm text-steel">
                  Receive a structured commercial estimate with material grades, mill origin,
                  cutting tolerances, and dispatch milestones within 4 business hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-copper/15 border border-copper flex items-center justify-center text-copper mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    Request Received — Reference #{refId}
                  </h3>
                  <p className="text-sm text-steel max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our
                    commercial estimating team has received your submission. We will review your
                    material requirements and get in touch shortly.
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          company: "",
                          email: "",
                          phone: "",
                          material: "Structural Beams (ISMB / Universal Beams)",
                          tonnage: "10 – 50 MT",
                          destination: "Pan-India Site Dispatch",
                          message: "",
                        });
                      }}
                    >
                      Submit Another Tender Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sunil Kulkarni"
                        className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                        Company / EPC Contractor *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Infra Projects"
                        className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sunil@apexinfra.com"
                        className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200 XXXXX"
                        className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                        Material Category
                      </label>
                      <select
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white outline-none transition-colors"
                      >
                        <option value="Structural Beams (ISMB / Universal Beams)">
                          Structural Beams (ISMB / UB / UC)
                        </option>
                        <option value="Steel Angles (Equal & Unequal)">
                          Steel Angles (Equal & Unequal)
                        </option>
                        <option value="Steel Channels (ISMC)">
                          Steel Channels (ISMC)
                        </option>
                        <option value="Steel Plates & Sheets (HR / Chequered)">
                          Steel Plates & Sheets (HR / Chequered)
                        </option>
                        <option value="Hollow Sections & Pipes (SHS / RHS / CHS)">
                          Hollow Sections & Pipes
                        </option>
                        <option value="TMT & Merchant Bars">
                          TMT & Merchant Bars
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                        Estimated Tonnage
                      </label>
                      <select
                        value={formData.tonnage}
                        onChange={(e) => setFormData({ ...formData, tonnage: e.target.value })}
                        className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white outline-none transition-colors"
                      >
                        <option value="Under 10 MT (Immediate stock)">Under 10 MT</option>
                        <option value="10 – 50 MT (Standard project)">10 – 50 MT</option>
                        <option value="50 – 250 MT (Heavy structural)">50 – 250 MT</option>
                        <option value="250+ MT (Mega project / EPC)">250+ MT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                        Delivery Destination
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white outline-none transition-colors"
                      >
                        <option value="Pan-India Site Dispatch">Pan-India Site Dispatch</option>
                        <option value="Mumbai / MMR Direct">Mumbai / MMR Direct</option>
                        <option value="Kalamboli Ex-Godown Pickup">Kalamboli Ex-Godown</option>
                        <option value="Maharashtra Regional Supply">Maharashtra Regional</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                      Detailed Specifications / Cutting Notes / Drawing Ref
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify beam profiles (e.g., ISMB 400 cut to 8.5m), steel grades (IS 2062 E250 / E350), beveling, primer needs, and target site delivery date."
                      className="w-full bg-graphite border border-charcoal-border focus:border-copper p-4 text-sm text-white placeholder-steel-dark outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                      withArrow
                    >
                      {isSubmitting ? "Submitting Quotation..." : "Transmit RFQ to Commercial Desk"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

