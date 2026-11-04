"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Send, PhoneCall, Mail, Building, MapPin, ShieldCheck, UploadCloud, FileCode } from "lucide-react";
import confetti from "canvas-confetti";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "Structural Beams (ISMB / Universal Beams)",
    message: "",
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generated = `FSS-ENQ-${Math.floor(10000 + Math.random() * 90000)}`;
      setReferenceId(generated);
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.7 },
          colors: ["#C47A48", "#858B90", "#FFFFFF"],
        });
      } catch {
        // Fallback
      }
    }, 850);
  };

  return (
    <section id="contact-cta" className="relative py-24 sm:py-36 bg-graphite text-offwhite overflow-hidden border-t border-charcoal-border">
      {/* Background Industrial Visual & Gradients */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=80"
          alt="Heavy industrial steel cutting and processing"
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
              <Badge variant="copper">07 / DIRECT ENQUIRIES</Badge>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Have a project <br />
                <span className="text-copper">in mind?</span>
              </h2>
              <p className="text-base sm:text-lg text-steel-light font-body leading-relaxed font-normal">
                Tell us what you&apos;re building. Let&apos;s discuss the material and processing requirements.
                Our Ghatkopar and Kalamboli engineering desks review drawings, grades, and schedules.
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
                    COMMERCIAL HOTLINE
                  </span>
                  <div className="flex flex-wrap gap-x-3 text-sm font-heading font-bold text-white mt-0.5">
                    <a href="tel:+918828335168" className="hover:text-copper transition-colors">
                      +91 88283 35168
                    </a>
                    <span className="text-steel">/</span>
                    <a href="tel:+919920777336" className="hover:text-copper transition-colors">
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
                    <a href="mailto:contact@ferrite.in" className="hover:text-copper transition-colors">
                      contact@ferrite.in
                    </a>
                    <span className="text-steel">/</span>
                    <a href="mailto:accounts@ferrite.in" className="hover:text-copper transition-colors">
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
                <Badge variant="copper">ENQUIRY DISPATCHED</Badge>
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
                      setFileName(null);
                      setFormData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        requirement: "Structural Beams (ISMB / Universal Beams)",
                        message: "",
                      });
                    }}
                  >
                    Submit Another Enquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-charcoal-border pb-4 mb-2 flex items-center justify-between">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    Submit Project Requirements
                  </h3>
                  <span className="text-xs font-mono text-copper font-medium">EST. RESPONSE: &lt;4 HRS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
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
                    <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
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
                    <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                      Email Address *
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
                    <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
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
                  <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                    Primary Product / Material Category *
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
                  <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
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

                {/* Optional Drawing / Schedule Attachment Mockup */}
                <div>
                  <label className="block text-xs uppercase font-heading tracking-wider text-steel-light mb-1.5">
                    Attach Drawing / Schedule / BOQ (Optional)
                  </label>
                  <label className="border border-dashed border-charcoal-border hover:border-copper/80 p-3.5 flex items-center justify-between cursor-pointer bg-graphite/60 transition-colors">
                    <div className="flex items-center gap-2.5 text-xs text-steel">
                      <UploadCloud className="w-4 h-4 text-copper" />
                      <span>{fileName ? fileName : "Upload CAD drawing (.dwg, .dxf) or PDF schedule"}</span>
                    </div>
                    <span className="text-[10px] font-mono text-copper bg-charcoal px-2 py-0.5 border border-charcoal-border">
                      Browse File
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.dwg,.dxf,.xlsx,.xls,.doc,.docx"
                    />
                  </label>
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
                    {isSubmitting ? "Dispatching To Commercial Desk..." : "Request a Quote"}
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
