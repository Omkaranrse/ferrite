"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight, PhoneCall } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import { useTheme } from "@/context/ThemeContext";

interface BlogContactCTAProps {
  articleTitle?: string;
}

export default function BlogContactCTA({ articleTitle }: BlogContactCTAProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  const whatsappMessage = articleTitle
    ? `Hello Ferrite Team, I was reading your article on "${articleTitle}" and would like to discuss material requirements and pricing.`
    : "Hello Ferrite Team, I would like to discuss my structural steel requirements.";

  return (
    <section
      className={`rounded-3xl p-8 sm:p-10 lg:p-12 border relative overflow-hidden transition-all duration-300 my-14 ${
        isLight
          ? "bg-gradient-to-br from-slate-50 via-white to-orange-50/40 border-slate-200/90 shadow-xl shadow-slate-900/5"
          : "bg-gradient-to-br from-[#10151A] via-[#121820] to-[#10151A] border-white/10 shadow-2xl"
      }`}
    >
      {/* Ambient Molten Ember Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7A1A]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Brand Accent Line */}
      <div className="absolute top-0 inset-x-8 sm:inset-x-12 h-1 bg-gradient-to-r from-transparent via-[#FF7A1A] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-4 h-[2px] bg-[#FF7A1A] rounded-full inline-block" />
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF7A1A]">
            DIRECT CONSULTATION
          </span>
        </div>

        {/* Main Headline */}
        <h3
          className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-3 ${
            isLight ? "text-slate-900" : "text-white"
          }`}
        >
          Looking for the right structural steel for your project?
        </h3>

        {/* Supporting text */}
        <p
          className={`text-sm sm:text-base leading-relaxed mb-8 ${
            isLight ? "text-slate-600" : "text-[#9CA3AF]"
          }`}
        >
          Discuss your material requirements with the Ferrite team.
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Primary Contact CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#FF7A1A] hover:bg-[#FF882E] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(255,122,26,0.4)] hover:shadow-[0_4px_30px_rgba(255,122,26,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={() =>
              trackEvent({
                name: "discuss_requirements_click",
                params: { location: "blog_article_bottom_cta" },
              })
            }
          >
            <span>Contact Ferrite</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Secondary WhatsApp Enquiry */}
          <a
            href={FERRITE_CONTACT.getWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={() =>
              trackEvent({
                name: "whatsapp_click",
                params: {
                  location: "blog_article_bottom_cta",
                  message_type: "article_inquiry",
                },
              })
            }
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Enquiry</span>
          </a>

          {/* Call direct link */}
          <a
            href={FERRITE_CONTACT.getTelUrl()}
            className={`hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full border text-xs font-heading font-semibold transition-colors ${
              isLight
                ? "border-slate-300 bg-white text-slate-800 hover:border-slate-400"
                : "border-white/10 bg-white/[0.04] text-white hover:border-white/20"
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#FF7A1A]" />
            <span>Call: {FERRITE_CONTACT.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
