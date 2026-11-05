import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import {
  Settings,
  Layers,
  ShieldCheck,
  Zap,
  Check,
} from "lucide-react";
import { SERVICES_PAGE_DATA, SERVICE_FEATURE_PILLS } from "@/data/services";
import { BreadcrumbSchema } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Our Services | Structural Steel Fabrication & Solutions | Ferrite",
  description:
    "End-to-end structural steel solutions — from engineering and design to welded assemblies, bridge walkways, support structures, and primary structural steelwork.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Structural Steel Engineering, Fabrication & Services | Ferrite",
    description:
      "End-to-end structural steel solutions — from design and engineering to fabrication and on-site execution across India.",
    url: "https://ferrite.in/services",
  },
};

export default function ServicesPage() {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "Settings":
        return <Settings className="w-5 h-5 text-[#FF7A1A]" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-[#FF7A1A]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#FF7A1A]" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-[#FF7A1A]" />;
      default:
        return <Settings className="w-5 h-5 text-[#FF7A1A]" />;
    }
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferrite.in" },
          { name: "Services", url: "https://ferrite.in/services" },
        ]}
      />

      <div className="bg-[#070A0D] text-[#9CA3AF] relative overflow-hidden min-h-screen">
        {/* Ambient Warm Orange Highlights */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-[#FF7A1A]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#FF7A1A]/6 rounded-full blur-[150px] pointer-events-none" />

        {/* ========================================================== */}
        {/* HERO SECTION: Title, Subtitle, Orange Bar & Steel Beams   */}
        {/* ========================================================== */}
        <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Heading, Subtitle & Orange Bar */}
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                {/* Main Headline */}
                <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[3.75rem] text-white tracking-[-0.03em] leading-[1.08]">
                  Our{" "}
                  <span className="text-[#FF7A1A] [text-shadow:_0_0_28px_rgba(255,122,26,0.4)]">
                    Services
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-[1.05rem] text-[#9CA3AF] leading-relaxed max-w-xl font-normal pt-1">
                  End-to-end structural steel solutions — from design and engineering to
                  fabrication and on-site execution.
                </p>

                {/* Orange Thick Bar */}
                <div className="pt-2">
                  <div className="w-16 h-1 bg-[#FF7A1A] rounded-full shadow-[0_0_12px_#FF7A1A]" />
                </div>
              </div>

              {/* Right Column: Industrial Steel I-Beams Hero Visual */}
              <div className="lg:col-span-5 relative w-full h-56 sm:h-72 lg:h-80 select-none pointer-events-none">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/services/cta-beam.webp"
                    alt="Structural Steel Heavy Sections"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-right"
                  />
                  {/* Seamless blending gradients */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070A0D] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A0D] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#070A0D]/70 via-transparent to-transparent" />

                  {/* Molten Glow Line on Beam Edge */}
                  <div className="absolute top-1/4 right-0 w-3/4 h-[2px] bg-gradient-to-l from-[#FF7A1A] via-[#FF7A1A]/70 to-transparent shadow-[0_0_15px_#FF7A1A]" />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 4 VALUE PROPOSITION PILLS / STATS BADGES (Exact Mockup) */}
            {/* ======================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-10 sm:pt-14">
              {SERVICE_FEATURE_PILLS.map((pill, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0D1217] border border-white/10 p-4 sm:p-5 flex items-center gap-4 hover:border-[#FF7A1A]/40 transition-all duration-300 shadow-lg group"
                >
                  {/* Icon Box */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_15px_rgba(255,122,26,0.18)] shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {getFeatureIcon(pill.iconName)}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight leading-snug">
                      {pill.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#9CA3AF] mt-0.5 font-normal">
                      {pill.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* MAIN SERVICES LIST: Alternating Zig-Zag 2-Column Sections  */}
        {/* ========================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 relative z-10">
          <div className="space-y-16 sm:space-y-20 lg:space-y-24 pt-8">
            {SERVICES_PAGE_DATA.map((service, index) => {
              const imageOnRight = service.imageOnRight;

              return (
                <section
                  key={service.id}
                  id={service.id}
                  className="pt-12 sm:pt-16 border-t border-white/[0.08] first:border-t-0 first:pt-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Visual Image Container */}
                    <div
                      className={`lg:col-span-6 ${
                        imageOnRight ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#11171D] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`lg:col-span-6 ${
                        imageOnRight ? "lg:order-1" : "lg:order-2"
                      } space-y-4 sm:space-y-5`}
                    >
                      {/* Eyebrow with orange line */}
                      <div className="inline-flex items-center gap-2">
                        <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                          {service.eyebrow}
                        </span>
                      </div>

                      {/* Service Title */}
                      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[2.2rem] text-white tracking-tight leading-tight">
                        {service.title}
                      </h2>

                      {/* Description Paragraph */}
                      <p className="text-xs sm:text-sm lg:text-[14.5px] text-[#9CA3AF] leading-relaxed font-normal max-w-xl">
                        {service.description}
                      </p>

                      {/* Bullet Points with Orange Checkmarks */}
                      <ul className="space-y-2.5 sm:space-y-3 pt-2">
                        {service.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#FF7A1A]">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span className="font-heading font-semibold text-xs sm:text-sm text-white/95 leading-snug">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

