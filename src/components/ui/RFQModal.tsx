"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, ShieldCheck, PhoneCall, Building2, HardHat, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import Button from "./Button";
import Badge from "./Badge";
import { trackEvent } from "@/lib/analytics";

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function RFQModal({ isOpen, onClose, defaultProduct }: RFQModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productCategory: defaultProduct || "Structural Beams (ISMB / Universal Beams)",
    tonnage: "10 – 50 MT",
    destination: "Pan-India Site Dispatch",
    processingNeeds: [] as string[],
    specifications: "",
    botcheck: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState("");

  const productsList = [
    "Structural Beams (ISMB / Universal Beams)",
    "Steel Angles (Equal / Unequal)",
    "Steel Channels (ISMC)",
    "Steel Plates & Sheets (HR / Chequered)",
    "Hollow Sections & Pipes (SHS / RHS / CHS)",
    "TMT & Merchant Bars (Fe 500D / Flats)",
    "Custom Cut & Profiled Material",
  ];

  const processingOptions = [
    "Precision Bandsaw Cutting",
    "CNC Flame / Plasma Profiling",
    "Pre-Weld Beveling",
    "Shot Blasting SA 2.5",
    "Protective Primer Coating",
    "Standard Mill Length Stock",
  ];

  const handleProcessingToggle = (option: string) => {
    setFormData((prev) => {
      const exists = prev.processingNeeds.includes(option);
      return {
        ...prev,
        processingNeeds: exists
          ? prev.processingNeeds.filter((o) => o !== option)
          : [...prev.processingNeeds, option],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorText =
          data.errors && Array.isArray(data.errors)
            ? data.errors.join(" ")
            : data.error || "Failed to submit quotation request. Please check inputs.";
        setErrorMessage(errorText);
        setIsSubmitting(false);
        return;
      }

      setTicketId(data.ticketId);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Track B2B Conversion Event
      trackEvent({
        name: "contact_form_submit",
        params: {
          form_id: "global_rfq_modal",
          product_category: formData.productCategory,
          tonnage: formData.tonnage,
        },
      });

      // Celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#C47A48", "#858B90", "#F4F3EF"],
        });
      } catch {
        // Fallback
      }
    } catch (err) {
      console.error("[Submission Network Error]", err);
      setErrorMessage("Network connection error. Please verify your connection or call our desk at +91 88283 35168.");
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setTicketId("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={resetForm}
            className="fixed inset-0 bg-graphite-950/80 backdrop-blur-sm"
          />

          {/* Modal / Slide-over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl h-full bg-graphite border-l border-charcoal-border shadow-2xl overflow-y-auto flex flex-col justify-between"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 bg-graphite/95 backdrop-blur-md p-6 sm:p-8 border-b border-charcoal-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="copper">COMMERCIAL & TECHNICAL RFQ</Badge>
                  <span className="text-xs text-steel font-mono hidden sm:inline-block">
                    EST. 1965
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl text-white font-bold tracking-tight">
                  Request Material & Processing Quote
                </h3>
                <p className="text-xs text-steel mt-0.5 font-normal">
                  Direct commercial review by our Ghatkopar and Kalamboli engineering desks.
                </p>
              </div>

              <button
                onClick={resetForm}
                className="w-10 h-10 border border-charcoal-border bg-charcoal flex items-center justify-center text-steel hover:text-white hover:border-copper transition-colors focus:outline-none"
                aria-label="Close quote modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 flex-1">
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-copper/10 border border-copper flex items-center justify-center text-copper mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <Badge variant="copper" className="mb-3">
                    RFQ TRANSMITTED SUCCESSFULLY
                  </Badge>
                  <h4 className="font-heading text-2xl text-white font-bold mb-2">
                    Quotation Reference: <span className="text-copper font-mono">{ticketId}</span>
                  </h4>
                  <p className="text-steel text-sm max-w-md mx-auto mb-8 leading-relaxed font-body">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our
                    commercial coordination team at Ghatkopar and facility team at Kalamboli have
                    received your requirements. A structured estimate with Mill Test Certificate (MTC)
                    verification will be sent within 4 business hours.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-8 text-left bg-charcoal p-5 border border-charcoal-border text-xs">
                    <div>
                      <span className="text-steel block font-medium">Assigned Commercial Desk</span>
                      <strong className="text-white font-heading">Ghatkopar HQ (Mumbai)</strong>
                    </div>
                    <div>
                      <span className="text-steel block font-medium">Staging & Dispatch Yard</span>
                      <strong className="text-white font-heading">Kalamboli Complex (Raigad)</strong>
                    </div>
                    <div>
                      <span className="text-steel block font-medium">Direct Telephone</span>
                      <strong className="text-white font-mono">+91 88283 35168</strong>
                    </div>
                    <div>
                      <span className="text-steel block font-medium">Commercial Email</span>
                      <strong className="text-white font-mono">contact@ferrite.in</strong>
                    </div>
                  </div>

                  <Button variant="primary" onClick={resetForm}>
                    Close & Return to Website
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Spam Honeypot - Hidden from humans */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.botcheck}
                      onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
                    />
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-4 bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white mb-0.5">Submission Error</strong>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Contact info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-heading text-steel-light mb-1.5 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-charcoal border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-heading text-steel-light mb-1.5 font-medium">
                        Company / Contractor *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Infrastructure Ltd."
                        className="w-full bg-charcoal border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-heading text-steel-light mb-1.5 font-medium">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-charcoal border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-heading text-steel-light mb-1.5 font-medium">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-charcoal border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Product Category */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-heading text-steel-light mb-1.5 font-medium">
                      Primary Material Requirement *
                    </label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                      className="w-full bg-charcoal border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white outline-none transition-colors"
                    >
                      {productsList.map((item) => (
                        <option key={item} value={item} className="bg-graphite text-white">
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Tonnage & Destination */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-heading text-steel-light mb-1.5 font-medium">
                        Estimated Tonnage
                      </label>
                      <select
                        value={formData.tonnage}
                        onChange={(e) => setFormData({ ...formData, tonnage: e.target.value })}
                        className="w-full bg-charcoal border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white outline-none transition-colors"
                      >
                        <option value="Under 10 MT (Immediate stock)">Under 10 MT (Immediate stock)</option>
                        <option value="10 – 50 MT (Standard project)">10 – 50 MT (Standard project)</option>
                        <option value="50 – 250 MT (Heavy structural)">50 – 250 MT (Heavy structural)</option>
                        <option value="250+ MT (Infrastructure / EPC contract)">
                          250+ MT (Infrastructure / EPC contract)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-heading text-steel-light mb-1.5 font-medium">
                        Delivery Hub / Scope
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full bg-charcoal border border-charcoal-border focus:border-copper px-4 py-3 text-sm text-white outline-none transition-colors"
                      >
                        <option value="Pan-India Site Dispatch">Pan-India Site Dispatch</option>
                        <option value="Kalamboli Yard Ex-Godown Pickup">
                          Kalamboli Yard Ex-Godown Pickup
                        </option>
                        <option value="Mumbai / MMR Direct Delivery">
                          Mumbai / MMR Direct Delivery
                        </option>
                        <option value="Commercial Inquiry via Ghatkopar">
                          Commercial Inquiry via Ghatkopar
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Value Added Processing */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-heading text-steel-light mb-2 font-medium">
                      Required Material Processing (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {processingOptions.map((opt) => {
                        const isChecked = formData.processingNeeds.includes(opt);
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => handleProcessingToggle(opt)}
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-left border transition-all ${
                              isChecked
                                ? "bg-copper/15 border-copper text-white"
                                : "bg-charcoal border-charcoal-border text-steel hover:text-white"
                            }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ${
                                isChecked ? "border-copper bg-copper text-white" : "border-steel-muted"
                              }`}
                            >
                              {isChecked && <span className="w-1.5 h-1.5 bg-white" />}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 6: Specifications / Drawings note */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-heading text-steel-light mb-1.5 font-medium">
                      Material Specifications / Mark Numbers / Grades
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specifications}
                      onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                      placeholder="e.g. ISMB 300 cut to 6.25m, IS 2062 E250 with MTC. Base plates 30mm flame cut as per drawing mark B-12."
                      className="w-full bg-charcoal border border-charcoal-border focus:border-copper p-4 text-sm text-white placeholder-steel-dark outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Trust badges */}
                  <div className="pt-2 border-t border-charcoal-border grid grid-cols-3 gap-2 text-[11px] text-steel">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-copper shrink-0" />
                      <span>100% MTC Included</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HardHat className="w-4 h-4 text-copper shrink-0" />
                      <span>IS / ASTM Standards</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-copper shrink-0" />
                      <span>Pan-India Supply</span>
                    </div>
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
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Transmitting to Commercial Desk...</span>
                        </span>
                      ) : (
                        "Request a Quote"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer with direct phone & assistance */}
            <div className="p-4 sm:p-6 bg-charcoal-light/40 border-t border-charcoal-border flex items-center justify-between text-xs text-steel">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-copper" />
                <span>Prefer direct phone consultation? Call:</span>
                <a
                  href="tel:+918828335168"
                  className="text-white hover:text-copper font-medium transition-colors"
                >
                  +91 88283 35168
                </a>
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px]">
                MUMBAI (IST): 09:30–18:30
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
