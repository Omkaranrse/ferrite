"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Warehouse,
  User,
  Layers,
  ChevronDown,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

const REQUIREMENT_OPTIONS = [
  "Requirement Type *",
  "Structural Steel Angles (Equal / Unequal)",
  "Heavy Structural Beams (ISMB, UC, UB)",
  "Steel Channels (ISMC)",
  "TMT Bars & Merchant Rounds/Squares",
  "Hollow Sections & Steel Pipes (MS/GI)",
  "Plates & HR/CR Sheets",
  "Custom Fabrication & Processing",
  "Project BOQ / Bulk Supply",
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    requirementType: "Requirement Type *",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      setFormError("Please provide either a phone number or email address.");
      return;
    }
    if (!formData.message.trim()) {
      setFormError("Please enter your message or project requirements.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    trackEvent({
      name: "contact_form_submit",
      params: {
        form_id: "contact_page_quote_request",
        product_category: formData.requirementType || "general",
      },
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const getWhatsAppEnquiryUrl = () => {
    const reqText =
      formData.requirementType && formData.requirementType !== "Requirement Type *"
        ? formData.requirementType
        : "General Steel Enquiry";
    const msg = `Hello Ferrite Team,\n\nI submitted an enquiry:\n• Name: ${formData.fullName}\n• Phone: ${formData.phone}\n• Email: ${formData.email}\n• Requirement: ${reqText}\n• Message: ${formData.message}`;
    return `https://wa.me/918828335168?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="bg-[#070A0D] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 text-[#9CA3AF] relative overflow-hidden min-h-[calc(100vh-80px)]">
      {/* Ambient Warm Orange Highlights */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF7A1A]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#FF7A1A]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* ======================================================== */}
          {/* LEFT COLUMN: GET IN TOUCH, CONTACT DETAILS & MAP CARD     */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                GET IN TOUCH
              </span>
            </div>

            {/* Contact Details Stack */}
            <div className="space-y-6 sm:space-y-7">
              {/* 1. Head Office / Sales */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#131920] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_12px_rgba(255,122,26,0.15)] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#FF7A1A]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight leading-snug">
                    Head Office / Sales
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#9CA3AF] leading-relaxed mt-1">
                    Excel Plaza, 803/8 wing, 90 Feet Rd, Pant Nagar,
                    <br />
                    Ghatkopar East, Mumbai – 400075
                  </p>
                </div>
              </div>

              {/* 2. Factory Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#131920] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_12px_rgba(255,122,26,0.15)] shrink-0 mt-0.5">
                  <Warehouse className="w-5 h-5 text-[#FF7A1A]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight leading-snug">
                    Factory Address
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#9CA3AF] leading-relaxed mt-1">
                    Plot 18, KWC Kalamboli, Dist. – Raigad,
                    <br />
                    Navi Mumbai, India – 410218
                  </p>
                </div>
              </div>

              {/* 3. Telephone */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#131920] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_12px_rgba(255,122,26,0.15)] shrink-0">
                  <Phone className="w-5 h-5 text-[#FF7A1A]" />
                </div>
                <div>
                  <a
                    href={FERRITE_CONTACT.getTelUrl()}
                    className="font-heading font-extrabold text-base sm:text-lg text-white hover:text-[#FF7A1A] transition-colors tracking-wide block leading-none"
                  >
                    {FERRITE_CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* 4. Email */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#131920] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_12px_rgba(255,122,26,0.15)] shrink-0">
                  <Mail className="w-5 h-5 text-[#FF7A1A]" />
                </div>
                <div>
                  <a
                    href={FERRITE_CONTACT.getEmailUrl()}
                    className="font-heading font-extrabold text-base sm:text-lg text-white hover:text-[#FF7A1A] transition-colors tracking-tight block leading-none"
                  >
                    {FERRITE_CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Horizontal Separator */}
            <div className="border-b border-white/[0.08] my-8 sm:my-10" />

            {/* Styled Light Vector Map Card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F3F4F6] border border-white/20 shadow-2xl w-full aspect-[16/9] sm:aspect-[16/8.5] max-w-md group select-none">
              {/* SVG Light Road Grid Pattern */}
              <svg
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 220"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="400" height="220" fill="#F4F5F7" />

                {/* City Blocks (soft grey fills) */}
                <rect x="20" y="20" width="80" height="60" fill="#EAECEF" rx="4" />
                <rect x="115" y="25" width="70" height="40" fill="#E5E8EB" rx="4" />
                <rect x="200" y="15" width="90" height="55" fill="#EAECEF" rx="4" />
                <rect x="305" y="20" width="80" height="70" fill="#E5E8EB" rx="4" />

                <rect x="25" y="95" width="65" height="50" fill="#E5E8EB" rx="4" />
                <rect x="105" y="80" width="80" height="55" fill="#EAECEF" rx="4" />
                <rect x="200" y="85" width="90" height="50" fill="#E5E8EB" rx="4" />
                <rect x="305" y="105" width="75" height="55" fill="#EAECEF" rx="4" />

                <rect x="30" y="160" width="70" height="45" fill="#EAECEF" rx="4" />
                <rect x="115" y="150" width="65" height="55" fill="#E5E8EB" rx="4" />
                <rect x="195" y="150" width="85" height="55" fill="#EAECEF" rx="4" />

                {/* Secondary Streets */}
                <line x1="0" y1="90" x2="400" y2="85" stroke="#DCE0E5" strokeWidth="6" />
                <line x1="0" y1="145" x2="400" y2="140" stroke="#DCE0E5" strokeWidth="6" />
                <line x1="105" y1="0" x2="110" y2="220" stroke="#DCE0E5" strokeWidth="6" />
                <line x1="195" y1="0" x2="190" y2="220" stroke="#DCE0E5" strokeWidth="6" />
                <line x1="300" y1="0" x2="295" y2="220" stroke="#DCE0E5" strokeWidth="6" />

                {/* Primary Diagonal Arterial Roads */}
                <path
                  d="M-20,40 Q150,110 420,130"
                  stroke="#FFFFFF"
                  strokeWidth="10"
                  fill="none"
                />
                <path
                  d="M-20,40 Q150,110 420,130"
                  stroke="#CBD2D9"
                  strokeWidth="4"
                  fill="none"
                />

                <path
                  d="M140,-20 L270,240"
                  stroke="#FFFFFF"
                  strokeWidth="10"
                  fill="none"
                />
                <path
                  d="M140,-20 L270,240"
                  stroke="#CBD2D9"
                  strokeWidth="4"
                  fill="none"
                />

                {/* Local Road Grid Intersections */}
                <line x1="5" y1="35" x2="395" y2="35" stroke="#FFFFFF" strokeWidth="3" />
                <line x1="5" y1="180" x2="395" y2="180" stroke="#FFFFFF" strokeWidth="3" />
              </svg>

              {/* Orange Teardrop Location Pin & Marker Label */}
              <div className="absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 drop-shadow-md">
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#FF7A1A] flex items-center justify-center shadow-[0_4px_16px_rgba(255,122,26,0.6)]">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex flex-col text-left">
                  <span className="font-heading font-extrabold text-xs sm:text-[13px] text-zinc-900 leading-tight">
                    Ferrite Structural
                  </span>
                  <span className="font-heading font-extrabold text-xs sm:text-[13px] text-zinc-900 leading-tight">
                    Steels Pvt Ltd
                  </span>
                </div>
              </div>

              {/* Open in Maps Pill Button (Bottom Right) */}
              <a
                href="https://maps.google.com/?q=Excel+Plaza+Ghatkopar+East+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200/90 text-zinc-900 font-heading font-bold text-[11px] sm:text-xs shadow-md hover:bg-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Open in Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700" />
              </a>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: REQUEST A QUOTE (SEND ENQUIRY FORM CARD)   */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-[28px] sm:rounded-[34px] bg-[#10151A] border border-white/10 p-6 sm:p-9 md:p-11 lg:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                  SEND ENQUIRY
                </span>
              </div>

              {/* Form Heading */}
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[2.65rem] text-white tracking-tight leading-tight mt-2.5">
                Request a Quote
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mt-2 mb-7 sm:mb-8 max-w-xl font-normal">
                Share your requirements and our team will get back to you with the right solution,
                price and delivery timeline.
              </p>

              {/* Form State Handler */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 sm:p-10 rounded-2xl bg-[#0B0F13] border border-emerald-500/30 text-center space-y-4 my-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-heading font-extrabold text-xl text-white">
                      Enquiry Received Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-semibold">{formData.fullName}</span>.
                      Our Mumbai estimation desk will review your specifications and get back to you within 2–4 business hours.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppEnquiryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#22bf5b] text-white font-heading font-bold text-xs tracking-wide shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                      <span>Also Send via WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: "",
                          email: "",
                          phone: "",
                          requirementType: "Requirement Type *",
                          message: "",
                        });
                      }}
                      className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-heading font-bold text-xs transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Banner */}
                  {formError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
                      {formError}
                    </div>
                  )}

                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="rounded-xl bg-[#0B0F13] border border-white/10 px-4 py-3.5 flex items-center gap-3 focus-within:border-[#FF7A1A] focus-within:ring-1 focus-within:ring-[#FF7A1A]/40 transition-all">
                      <User className="w-4 h-4 text-zinc-400 shrink-0" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name *"
                        required
                        className="bg-transparent text-white placeholder-zinc-500 text-xs sm:text-sm w-full focus:outline-none"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="rounded-xl bg-[#0B0F13] border border-white/10 px-4 py-3.5 flex items-center gap-3 focus-within:border-[#FF7A1A] focus-within:ring-1 focus-within:ring-[#FF7A1A]/40 transition-all">
                      <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address *"
                        className="bg-transparent text-white placeholder-zinc-500 text-xs sm:text-sm w-full focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Requirement Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div className="rounded-xl bg-[#0B0F13] border border-white/10 px-4 py-3.5 flex items-center gap-3 focus-within:border-[#FF7A1A] focus-within:ring-1 focus-within:ring-[#FF7A1A]/40 transition-all">
                      <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        required
                        className="bg-transparent text-white placeholder-zinc-500 text-xs sm:text-sm w-full focus:outline-none"
                      />
                    </div>

                    {/* Requirement Type Dropdown */}
                    <div className="rounded-xl bg-[#0B0F13] border border-white/10 px-4 py-3.5 flex items-center gap-3 focus-within:border-[#FF7A1A] focus-within:ring-1 focus-within:ring-[#FF7A1A]/40 transition-all relative">
                      <Layers className="w-4 h-4 text-zinc-400 shrink-0 pointer-events-none" />
                      <select
                        name="requirementType"
                        value={formData.requirementType}
                        onChange={handleChange}
                        className="bg-transparent text-white text-xs sm:text-sm w-full focus:outline-none appearance-none cursor-pointer pr-6 [&>option]:bg-[#0B0F13] [&>option]:text-white"
                      >
                        {REQUIREMENT_OPTIONS.map((opt, i) => (
                          <option
                            key={i}
                            value={opt}
                            disabled={i === 0}
                            className="bg-[#0B0F13] text-white py-1"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 pointer-events-none" />
                    </div>
                  </div>

                  {/* Row 3: Your Message */}
                  <div className="rounded-xl bg-[#0B0F13] border border-white/10 px-4 py-3.5 focus-within:border-[#FF7A1A] focus-within:ring-1 focus-within:ring-[#FF7A1A]/40 transition-all flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Your Message *"
                      required
                      className="bg-transparent text-white placeholder-zinc-500 text-xs sm:text-sm w-full resize-none focus:outline-none min-h-[120px] sm:min-h-[135px]"
                    />
                  </div>

                  {/* Row 4: Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#FF882E] hover:from-[#FF8429] hover:to-[#FF9540] text-white font-heading font-bold text-sm sm:text-base tracking-wide shadow-[0_4px_25px_rgba(255,122,26,0.45)] hover:shadow-[0_4px_35px_rgba(255,122,26,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
                    >
                      <span>{isSubmitting ? "Submitting Enquiry..." : "Submit Enquiry"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Row 5: Privacy Reassurance */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-zinc-500 pt-1 text-center">
                    <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>
                      Your information is safe with us. We never share it with third parties.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
