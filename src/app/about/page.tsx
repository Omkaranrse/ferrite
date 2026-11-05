import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Calendar,
  Users,
  Layers,
  ShieldCheck,
  Target,
  Flame,
  Snowflake,
  TrendingUp,
  Settings,
  FlaskConical,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";
import { BreadcrumbSchema } from "@/components/shared/JsonLd";
import { FERRITE_CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "About Us | Five Decades of Structural Steel Excellence | Ferrite",
  description:
    "With a lineage back to 1965, Ferrite Structural Steels Pvt. Ltd. (formerly Payal Enterprises) combines extensive stockholding with precision cutting, shaping, and sizing across India.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Ferrite Structural Steels | Five Decades of Excellence",
    description:
      "Business lineage dating back to 1965. Stockholding at Kalamboli Warehousing Complex, commercial coordination at Ghatkopar, Mumbai.",
    url: "https://ferrite.in/about",
  },
};

const TIMELINE_MILESTONES = [
  {
    year: "1965",
    title: "Foundation of Lineage",
    subtitle: "Trading begins in Mumbai's historic iron & steel hubs",
    description:
      "Our business roots began over 59 years ago under Payal Enterprises. The firm established an enduring reputation for integrity, timely delivery, and dependable sourcing of primary iron and steel products.",
  },
  {
    year: "1988",
    title: "Expansion into Heavy Structural Sections",
    subtitle: "Strategic focus on construction & industrial steel",
    description:
      "As India entered modern infrastructural development, we expanded inventory from basic merchant bars to heavy Indian Standard Medium Beams (ISMB), structural angles, and channels.",
  },
  {
    year: "2004",
    title: "Establishment of Kalamboli Facility",
    subtitle: "Consolidating operations in Navi Mumbai's premier steel hub",
    description:
      "To meet rapid urbanization and large-span factory demands, we established our warehousing base in the Kalamboli Warehousing Complex (KWC), outfitting it with overhead gantry cranes.",
  },
  {
    year: "2014",
    title: "Rebranding to Ferrite Structural Steels Pvt. Ltd.",
    subtitle: "Transition to integrated stockholding & value-added processing",
    description:
      "The corporate identity was officially restructured to Ferrite Structural Steels Pvt. Ltd., reflecting our expanded engineering scope: combining stockholding with precision cutting, shaping, and sizing.",
  },
  {
    year: "Present",
    title: "Pan-India Project Partner",
    subtitle: "Advanced CNC profiling, bandsaws & multi-sector supply",
    description:
      "Today, Ferrite supplies steel for high-rise buildings, highway bridges, metro transit viaducts, and pre-engineered buildings nationwide, backed by 100% Mill Test Certificate traceability.",
    isCurrent: true,
  },
];

const PRODUCT_RANGE = [
  { name: "Steel Angles", image: "/images/products/steel-angle.png", href: "/products#steel-angles" },
  { name: "Steel Beams", image: "/images/products/steel-beams.png", href: "/products#structural-beams" },
  { name: "Steel Channels", image: "/images/products/steel-channels.jpg", href: "/products#steel-channels" },
  { name: "Steel Bars", image: "/images/products/steel-bars.jpg", href: "/products#tmt-merchant-bars" },
  { name: "Steel Pipes", image: "/images/products/steel-pipes.png", href: "/products#hollow-sections-pipes" },
  { name: "Steel Sheets", image: "/images/products/steel-sheets.webp", href: "/products#plates-and-sheets" },
  { name: "Steel Plates", image: "/images/products/steel-plates.jpg", href: "/products#plates-and-sheets" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferrite.in" },
          { name: "About Us", url: "https://ferrite.in/about" },
        ]}
      />

      <div className="bg-[#070A0D] text-[#9CA3AF] relative overflow-hidden min-h-screen">
        {/* Ambient Warm Orange Highlights */}
        <div className="absolute top-24 -left-32 w-96 h-96 bg-[#FF7A1A]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#FF7A1A]/6 rounded-full blur-[150px] pointer-events-none" />

        {/* ========================================================== */}
        {/* 1. HERO SECTION: Title, Subtitle, CTAs & Steel Beam Visual */}
        {/* ========================================================== */}
        <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Eyebrow, Heading, Paragraph & Action CTAs */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                    ABOUT FERRITE
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[3.6rem] text-white tracking-[-0.03em] leading-[1.08]">
                  Five decades of
                  <br />
                  structural steel
                  <br />
                  <span className="text-[#FF7A1A] [text-shadow:_0_0_28px_rgba(255,122,26,0.4)]">
                    excellence.
                  </span>
                </h1>

                {/* Subtitle Paragraph */}
                <p className="text-sm sm:text-base lg:text-[15.5px] text-[#9CA3AF] leading-relaxed max-w-xl font-normal pt-1">
                  With a lineage back to 1965, Ferrite Structural Steels Pvt. Ltd. combines
                  extensive stockholding with precision cutting, shaping, and sizing for builders
                  across India.
                </p>

                {/* Button Action Row */}
                <div className="pt-3 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#FF882E] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_25px_rgba(255,122,26,0.45)] hover:shadow-[0_4px_35px_rgba(255,122,26,0.65)] hover:scale-105 active:scale-95 transition-all group"
                  >
                    <span>Request a Quote</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#12161B]/80 hover:bg-[#181F26] border border-white/20 hover:border-white/40 text-white font-heading font-semibold text-xs sm:text-sm tracking-wide transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Explore Products</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Perspective Steel I-Beams */}
              <div className="lg:col-span-5 relative w-full h-64 sm:h-80 lg:h-96 select-none pointer-events-none">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/services/cta-beam.webp"
                    alt="Ferrite Structural Steel Beams"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-right"
                  />
                  {/* Blending Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070A0D] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A0D] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#070A0D]/70 via-transparent to-transparent" />

                  {/* Molten Amber Glow Line on Flange */}
                  <div className="absolute top-1/4 right-0 w-3/4 h-[2px] bg-gradient-to-l from-[#FF7A1A] via-[#FF7A1A]/70 to-transparent shadow-[0_0_15px_#FF7A1A]" />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 2. STATS BAR: 4 Metrics (Exact Match to Mockup)          */}
            {/* ======================================================== */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-12 sm:pt-16 border-t border-white/[0.08]">
              {/* Stat 1: 59+ Years */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#131920] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5 text-[#FF7A1A]" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-none">
                    59+
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#9CA3AF] mt-1 font-normal leading-tight">
                    Years of experience
                    <br />
                    since 1965
                  </p>
                </div>
              </div>

              {/* Stat 2: 1,000+ Customers */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#131920] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shrink-0 mt-0.5">
                  <Users className="w-5 h-5 text-[#FF7A1A]" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-none">
                    1,000+
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#9CA3AF] mt-1 font-normal leading-tight">
                    B2B customers
                  </p>
                </div>
              </div>

              {/* Stat 3: 45 Sectors */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#131920] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shrink-0 mt-0.5">
                  <Layers className="w-5 h-5 text-[#FF7A1A]" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-none">
                    45
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#9CA3AF] mt-1 font-normal leading-tight">
                    Sectors served
                  </p>
                </div>
              </div>

              {/* Stat 4: ISO 9001:2015 */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#131920] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-[#FF7A1A]" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">
                    ISO 9001:2015
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#9CA3AF] mt-1 font-normal leading-tight">
                    Quality management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 3. OUR HERITAGE SECTION: Story Narrative & Welder Image    */}
        {/* ========================================================== */}
        <section className="py-14 sm:py-20 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                    OUR HERITAGE
                  </span>
                </div>

                {/* Headline */}
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[2.2rem] text-white tracking-tight leading-tight">
                  From Payal Enterprises to an
                  <br />
                  integrated industrial partner.
                </h2>

                {/* Paragraph */}
                <div className="space-y-3.5 text-xs sm:text-sm lg:text-[14.5px] text-[#9CA3AF] leading-relaxed font-normal">
                  <p>
                    Ferrite Structural Steels Pvt. Ltd. traces its lineage back to 1965 when
                    operations first commenced as Payal Enterprises Pvt. Ltd. Founded on
                    principles of transparency, quality and commercial clarity, our firm evolved
                    alongside India&apos;s post-independence industrial boom.
                  </p>
                  <p>
                    Over five decades, we grew from a trusted Mumbai trading desk into an
                    authorized distributor and MoU partner for primary steel giants like SAIL and RINL.
                    Operating today from our commercial headquarters in Ghatkopar, Mumbai, and heavy
                    stockholding yards in Kalamboli, Navi Mumbai, we supply high-integrity structural
                    steel with 100% Mill Test Certificate (MTC) traceability.
                  </p>
                </div>

                {/* Button */}
                <div className="pt-2">
                  <Link
                    href="#journey"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141A20] hover:bg-[#1A2228] border border-white/20 hover:border-[#FF7A1A]/60 text-white font-heading font-semibold text-xs tracking-wide transition-all"
                  >
                    <span>Our Legacy</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Industrial Welder Workshop Visual */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#11171D] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
                  <Image
                    src="/images/services/welded-assemblies.jpg"
                    alt="Ferrite Industrial Steel Welding and Processing Heritage"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 4. OUR JOURNEY SECTION: Interactive Timeline               */}
        {/* ========================================================== */}
        <section id="journey" className="py-14 sm:py-20 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-10 sm:mb-12">
              <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                OUR JOURNEY
              </span>
            </div>

            {/* Horizontal Timeline Track */}
            <div className="relative">
              {/* Connecting Horizontal Line (desktop) */}
              <div className="hidden lg:block absolute top-[11px] left-3 right-6 h-[2px] bg-white/15 -z-0">
                <div className="h-full bg-gradient-to-r from-white/20 via-white/40 to-[#FF7A1A]" />
              </div>

              {/* 5 Milestone Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
                {TIMELINE_MILESTONES.map((m, idx) => {
                  const isCurrent = m.isCurrent;

                  return (
                    <div key={idx} className="space-y-3 relative">
                      {/* Node Circle */}
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? "bg-[#FF7A1A] ring-4 ring-[#FF7A1A]/30 shadow-[0_0_15px_#FF7A1A]"
                              : "bg-white/90 ring-4 ring-white/10"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isCurrent ? "bg-white" : "bg-[#070A0D]"
                            }`}
                          />
                        </div>
                        <span
                          className={`font-heading font-extrabold text-lg sm:text-xl tracking-tight ${
                            isCurrent ? "text-[#FF7A1A]" : "text-white"
                          }`}
                        >
                          {m.year}
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight leading-snug">
                        {m.title}
                      </h3>

                      {/* Milestone Description */}
                      <p className="text-xs text-[#9CA3AF] leading-relaxed font-normal">
                        {m.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5. GUIDING PRINCIPLES SECTION: 3 Core Value Cards          */}
        {/* ========================================================== */}
        <section className="py-14 sm:py-20 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Heading */}
              <div className="lg:col-span-4 space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                    GUIDING PRINCIPLES
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[2.2rem] text-white tracking-tight leading-tight">
                  Built on values
                  <br />
                  that endure.
                </h2>
              </div>

              {/* Right Column: 3 Value Cards */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {/* Value 1: Complete Traceability */}
                <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-5 sm:p-6 space-y-3 hover:border-[#FF7A1A]/40 transition-all shadow-lg group">
                  <div className="w-10 h-10 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_12px_rgba(255,122,26,0.18)]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight">
                    Complete Traceability
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed font-normal">
                    Genuine Mill Test Certificates (MTC) linked to primary manufacturer heat numbers.
                  </p>
                </div>

                {/* Value 2: Dimensional Precision */}
                <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-5 sm:p-6 space-y-3 hover:border-[#FF7A1A]/40 transition-all shadow-lg group">
                  <div className="w-10 h-10 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_12px_rgba(255,122,26,0.18)]">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight">
                    Dimensional Precision
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed font-normal">
                    Materials within millimeter tolerances, saving clients costly on-site modifications.
                  </p>
                </div>

                {/* Value 3: Commercial Transparency */}
                <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-5 sm:p-6 space-y-3 hover:border-[#FF7A1A]/40 transition-all shadow-lg group">
                  <div className="w-10 h-10 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_12px_rgba(255,122,26,0.18)]">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight">
                    Commercial Transparency
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed font-normal">
                    Clear weight tickets, structured billing, and open communication on delivery timelines and stock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 6. WHAT WE SUPPLY: Product Range Row                       */}
        {/* ========================================================== */}
        <section className="py-14 sm:py-20 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="space-y-2 mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                  WHAT WE SUPPLY
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[2.2rem] text-white tracking-tight">
                Product Range
              </h2>
            </div>

            {/* 7 Product Range Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
              {PRODUCT_RANGE.map((prod, idx) => (
                <Link
                  key={idx}
                  href={prod.href}
                  className="rounded-2xl bg-[#0D1217] border border-white/10 overflow-hidden hover:border-[#FF7A1A]/60 transition-all duration-300 shadow-md group flex flex-col hover:scale-105"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-black/40">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="180px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1217] via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Title */}
                  <div className="p-3 text-center">
                    <span className="font-heading font-bold text-xs text-white group-hover:text-[#FF7A1A] transition-colors truncate block">
                      {prod.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 7. PRODUCTION TECHNOLOGIES: Hot & Cold Processing          */}
        {/* ========================================================== */}
        <section className="py-14 sm:py-20 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="space-y-2 mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                  PRODUCTION TECHNOLOGIES
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[2.2rem] text-white tracking-tight leading-tight">
                Advanced processing
                <br />
                for modern construction.
              </h2>
            </div>

            {/* 2 Technology Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* Card 1: Hot Manufacturing */}
              <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-6 sm:p-8 flex items-start gap-4 hover:border-[#FF7A1A]/40 transition-all shadow-lg group">
                <div className="w-12 h-12 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_15px_rgba(255,122,26,0.2)] shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight">
                    Hot Manufacturing Technologies
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed font-normal">
                    Hot processes use heat to shape steel and support profiles that require
                    specific strength and structural properties.
                  </p>
                </div>
              </div>

              {/* Card 2: Cold Manufacturing */}
              <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-6 sm:p-8 flex items-start gap-4 hover:border-[#FF7A1A]/40 transition-all shadow-lg group">
                <div className="w-12 h-12 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] shadow-[0_0_15px_rgba(255,122,26,0.2)] shrink-0">
                  <Snowflake className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight">
                    Cold Manufacturing Technologies
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed font-normal">
                    Cold processes shape steel at or near room temperature and are selected where
                    the form, finish and tolerance require that route.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 8. QUALITY MANAGEMENT: Certified Quality & 5 Pillars       */}
        {/* ========================================================== */}
        <section className="py-14 sm:py-20 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="space-y-2 mb-8 sm:mb-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                  QUALITY MANAGEMENT
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[2.2rem] text-white tracking-tight">
                Certified quality. Consistent performance.
              </h2>
            </div>

            {/* 5 Quality Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {/* Pillar 1 */}
              <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-5 text-center space-y-3 hover:border-[#FF7A1A]/40 transition-all shadow-md group">
                <div className="w-11 h-11 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] mx-auto shadow-[0_0_12px_rgba(255,122,26,0.18)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-xs sm:text-[13px] text-white block leading-snug">
                  Integrated quality assurance
                </span>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-5 text-center space-y-3 hover:border-[#FF7A1A]/40 transition-all shadow-md group">
                <div className="w-11 h-11 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] mx-auto shadow-[0_0_12px_rgba(255,122,26,0.18)]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-xs sm:text-[13px] text-white block leading-snug">
                  Customer satisfaction
                </span>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-5 text-center space-y-3 hover:border-[#FF7A1A]/40 transition-all shadow-md group">
                <div className="w-11 h-11 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] mx-auto shadow-[0_0_12px_rgba(255,122,26,0.18)]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-xs sm:text-[13px] text-white block leading-snug">
                  Proactive quality production
                </span>
              </div>

              {/* Pillar 4 */}
              <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-5 text-center space-y-3 hover:border-[#FF7A1A]/40 transition-all shadow-md group">
                <div className="w-11 h-11 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] mx-auto shadow-[0_0_12px_rgba(255,122,26,0.18)]">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-xs sm:text-[13px] text-white block leading-snug">
                  Production coordination
                </span>
              </div>

              {/* Pillar 5 */}
              <div className="rounded-2xl bg-[#0D1217] border border-white/10 p-5 text-center space-y-3 hover:border-[#FF7A1A]/40 transition-all shadow-md col-span-2 sm:col-span-1 group">
                <div className="w-11 h-11 rounded-xl bg-[#141B22] border border-[#FF7A1A]/35 flex items-center justify-center text-[#FF7A1A] mx-auto shadow-[0_0_12px_rgba(255,122,26,0.18)]">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-xs sm:text-[13px] text-white block leading-snug">
                  Advanced testing capabilities
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 9. PARTNER WITH FERRITE: Bottom Conversion Card            */}
        {/* ========================================================== */}
        <section className="py-14 sm:py-20 border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#11171D] via-[#101418] to-[#11171D] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Background Steel Warehouse Structure Accent */}
              <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 md:w-5/12 overflow-hidden pointer-events-none opacity-25 select-none">
                <Image
                  src="/images/services/structural-steelwork.jpg"
                  alt="Ferrite Structural Steel Work"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#11171D] via-[#11171D]/80 to-transparent" />
              </div>

              {/* Left Content */}
              <div className="relative z-10 space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-[2.5px] bg-[#FF7A1A] rounded-full inline-block shadow-[0_0_8px_#FF7A1A]" />
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/90 uppercase">
                    PARTNER WITH FERRITE
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  Ready to review
                  <br />
                  project specifications?
                </h3>
              </div>

              {/* Right CTA Buttons */}
              <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#FF882E] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_25px_rgba(255,122,26,0.45)] hover:shadow-[0_4px_35px_rgba(255,122,26,0.65)] hover:scale-105 active:scale-95 transition-all group"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#141A20] hover:bg-[#1A2228] border border-white/20 hover:border-white/40 text-white font-heading font-semibold text-xs sm:text-sm tracking-wide transition-all hover:scale-105 active:scale-95"
                >
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
