"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, PhoneCall, Mail, ShieldCheck, UploadCloud, AlertCircle, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "Structural Beams (ISMB / Universal Beams)",
    message: "",
    botcheck: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File exceeds 10MB limit. Please compress or provide drawing link in notes.");
        return;
      }
      setSelectedFile(file);
      setErrorMessage(null);
      trackEvent({
        name: "drawing_upload",
        params: { file_name: file.name, file_size_kb: Math.round(file.size / 1024) },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("company", formData.company);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("productCategory", formData.requirement);
      data.append("message", formData.message);
      data.append("botcheck", formData.botcheck);

      if (selectedFile) {
        data.append("attachment", selectedFile);
      }

      const response = await fetch("/api/enquiry", {
        method: "POST",
        body: data,
      });

      const resJson = await response.json();

      if (!response.ok || !resJson.success) {
        const errorText =
          resJson.errors && Array.isArray(resJson.errors)
            ? resJson.errors.join(" ")
            : resJson.error || "Failed to submit quotation. Please check required fields.";
        setErrorMessage(errorText);
        setIsSubmitting(false);
        return;
      }

      setReferenceId(resJson.ticketId);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Track B2B Conversion Event
      trackEvent({
        name: "contact_form_submit",
        params: {
          form_id: "homepage_contact_cta",
          product_category: formData.requirement,
        },
      });

      try {
        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.7 },
          colors: ["#C47A48", "#858B90", "#FFFFFF"],
        });
      } catch {
        // Safe fallback
      }
    } catch (err) {
      console.error("[Submission Network Exception]", err);
      setErrorMessage("Network error connecting to the server. Please call our Ghatkopar desk directly at +91 88283 35168.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-cta" className="relative py-24 sm:py-36 bg-graphite text-offwhite overflow-hidden border-t border-charcoal-border">
      {/* Background Industrial Visual & Gradients */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
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
          {/* Left Column: Direct Narrative & Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Badge variant="copper">07 / DIRECT COMMERCIAL ENQUIRIES</Badge>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Have a project <br />
                <span className="text-copper">in mind?</span>
              </h2>
              <p className="text-base sm:text-lg text-steel-light font-body leading-relaxed font-normal">
                Tell us what you&apos;re building. As a leading <strong>structural steel supplier</strong> and <strong>stockist</strong>,
                our engineering desks review drawings, grades, and steel cutting schedules to structure competitive project pricing.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-4 border-t border-charcoal-border">
              {/* Telephone */}
              <div className="p-5 bg-charcoal border border-charcoal-border flex items-center gap-4 hover:border-copper transition-colors">
                <div className="w-11 h-11 bg-graphite border border-charcoal-border flex items-center justify-center text-copper shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-steel block font-medium">
                    COMMERCIAL HOTLINE (GHATKOPAR HQ)
                  </span>
                  <div className="flex flex-wrap gap-x-3 text-sm font-heading font-bold text-white mt-0.5">
                    <a
                      href="tel:+918828335168"
                      onClick={() => trackEvent({ name: "phone_click", params: { phone_number: "+91 88283 35168", hub: "ghatkopar" } })}
                      className="hover:text-copper transition-colors"
                    >
                      +91 88283 35168
                    </a>
                    <span className="text-steel">/</span>
                    <a
                      href="tel:+919920777336"
                      onClick={() => trackEvent({ name: "phone_click", params: { phone_number: "+91 99207 77336", hub: "kalamboli" } })}
                      className="hover:text-copper transition-colors"
                    >
                      +91 99207 77336
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 bg-charcoal border border-charcoal-border flex items-center gap-4 hover:border-copper transition-colors">
                <div className="w-11 h-11 bg-graphite border border-charcoal-border flex items-center justify-center text-copper shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-steel block font-medium">
                    DRAWINGS & BOQ SUBMISSIONS
                  </span>
                  <div className="flex flex-wrap gap-x-3 text-sm font-heading font-bold text-white mt-0.5">
                    <a
                      href="mailto:contact@ferrite.in"
                      onClick={() => trackEvent({ name: "email_click", params: { email_address: "contact@ferrite.in", hub: "general" } })}
                      className="hover:text-copper transition-colors"
                    >
                      contact@ferrite.in
                    </a>
                    <span className="text-steel">/</span>
                    <a
                      href="mailto:accounts@ferrite.in"
                      onClick={() => trackEvent({ name: "email_click", params: { email_address: "accounts@ferrite.in", hub: "ghatkopar" } })}
                      className="hover:text-copper transition-colors"
                    >
                      accounts@ferrite.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Traceability Note */}
            <div className="p-5 bg-charcoal/60 border border-charcoal-border text-xs text-steel flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-copper shrink-0" />
              <span className="leading-relaxed">
                All material quotes include manufacturer Mill Test Certificates (MTC) and standard
                test conformity as per IS 2062 / ASTM.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-charcoal border border-charcoal-border p-8 sm:p-12 shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-copper/15 border border-copper flex items-center justify-center text-copper mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <Badge variant="copper">ENQUIRY TRANSMITTED</Badge>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  Thank You, {formData.name}
                </h3>
                <p className="text-sm text-steel max-w-md mx-auto leading-relaxed">
                  Your project enquiry has been logged with reference number{" "}
                  <strong className="text-copper font-mono">{referenceId}</strong>. Our commercial
                  engineering desk will evaluate your requirements and contact you within 4 business hours.
                </p>

                <div className="pt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSelectedFile(null);
                      setFormData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        requirement: "Structural Beams (ISMB / Universal Beams)",
                        message: "",
                        botcheck: "",
                      });
                    }}
                  >
                    Submit Another Enquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot Spam Protection */}
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

                <div className="border-b border-charcoal-border pb-4 mb-2 flex items-center justify-between">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    Submit Project Requirements
                  </h3>
                  <span className="text-xs font-mono text-copper font-medium">EST. RESPONSE: &lt;4 HRS</span>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-0.5">Submission Error</strong>
                      <span>{errorMessage}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Mehta"
                      className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3.5 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5 font-medium">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Sterling Fabricators"
                      className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3.5 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5 font-medium">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3.5 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 XXXXX"
                      className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3.5 text-sm text-white placeholder-steel-dark outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5 font-medium">
                    Primary Material Requirement *
                  </label>
                  <select
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full bg-graphite border border-charcoal-border focus:border-copper px-4 py-3.5 text-sm text-white outline-none transition-colors"
                  >
                    <option value="Structural Beams (ISMB / Universal Beams)">Structural Beams (ISMB / Universal Beams)</option>
                    <option value="Steel Angles (Equal & Unequal)">Steel Angles (Equal & Unequal)</option>
                    <option value="Steel Channels (ISMC)">Steel Channels (ISMC)</option>
                    <option value="Steel Plates & Sheets (HR / Chequered)">Steel Plates & Sheets (HR / Chequered)</option>
                    <option value="Hollow Sections & Pipes (SHS / RHS / CHS)">Hollow Sections & Pipes (SHS / RHS / CHS)</option>
                    <option value="TMT & Merchant Bars">TMT & Merchant Bars</option>
                    <option value="Custom Cutting & CNC Profiling Service">Custom Cutting & CNC Profiling Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5 font-medium">
                    Project Message / Dimensions / Drawing Details
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify tonnage, profile dimensions, cutting tolerances, delivery location (Mumbai, Maharashtra, or Pan-India), and desired dispatch date."
                    className="w-full bg-graphite border border-charcoal-border focus:border-copper p-4 text-sm text-white placeholder-steel-dark outline-none transition-colors resize-none"
                  />
                </div>

                {/* Optional Drawing / Schedule Attachment */}
                <div>
                  <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5 font-medium">
                    Attach Drawing / Schedule / BOQ (Optional, Max 10MB)
                  </label>
                  <label className="border border-dashed border-charcoal-border hover:border-copper/80 p-3.5 flex items-center justify-between cursor-pointer bg-graphite/60 transition-colors">
                    <div className="flex items-center gap-2.5 text-xs text-steel">
                      <UploadCloud className="w-4 h-4 text-copper" />
                      <span>{selectedFile ? selectedFile.name : "Upload CAD drawing (.dwg, .dxf) or PDF schedule"}</span>
                    </div>
                    <span className="text-[10px] font-mono text-copper bg-charcoal px-2.5 py-1 border border-charcoal-border font-medium">
                      {selectedFile ? "Replace File" : "Browse File"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.dwg,.dxf,.xlsx,.xls,.doc,.docx"
                    />
                  </label>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:flex-1"
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
                  <Button
                    href="/contact"
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => trackEvent({ name: "discuss_requirements_click", params: { location: "contact_cta_form" } })}
                  >
                    Discuss Your Requirements
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
