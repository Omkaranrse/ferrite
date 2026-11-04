import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Scissors, Flame, Box, Maximize2, ShieldCheck, Ruler, Truck, ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { capabilitiesData } from "@/data/capabilities";
import { BreadcrumbSchema } from "@/components/shared/JsonLd";
import { FERRITE_CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Steel Processing & Precision Cutting Services | Ferrite Structural Steels",
  description:
    "Explore Ferrite's structural steel processing capabilities: precision bandsaw cutting, CNC flame and plasma plate profiling, beveling, leveling, and stockholding at Kalamboli, Navi Mumbai.",
  alternates: {
    canonical: "/capabilities",
  },
  openGraph: {
    title: "Structural Steel Processing, Cutting & CNC Profiling | Ferrite",
    description:
      "Eliminating site bottlenecks with semi-automatic bandsaws, multi-torch flame cutting, and custom plate profiling at Kalamboli yard.",
    url: "https://ferrite.in/capabilities",
  },
};

export default function CapabilitiesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferrite.in" },
          { name: "Capabilities", url: "https://ferrite.in/capabilities" },
        ]}
      />

      <PageHeader
        eyebrow="VALUE-ADDED PROCESSING"
        title="More than structural material"
        highlightedTitle="supply."
        subtitle="We combine heavy inventory stockholding with semi-automatic cutting, CNC profiling, and sizing to deliver steel in the exact geometry and dimensions your project demands."
        breadcrumb="Capabilities"
      />

      {/* Overview Intro (Off-white) */}
      <section className="bg-offwhite text-graphite py-20 sm:py-28 relative bg-grid-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="light" className="text-graphite font-bold">
                ENGINEERED PROCESSING FACILITY
              </Badge>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-graphite leading-tight">
                Eliminating on-site cutting bottlenecks and material wastage.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-steel-dark font-body leading-relaxed">
                <p>
                  Traditional site erection often suffers from makeshift cutting setups, uneven torch
                  cuts, and high scrap rates that compromise timelines and structural fit-ups.
                </p>
                <p>
                  At Ferrite&apos;s Kalamboli facility, we invert this paradigm. By operating industrial
                  bandsaws, computerized flame-profiling tables, and plate-leveling equipment within
                  a controlled environment, we dispatch components that arrive site-ready with
                  identified mark numbers.
                </p>
                <p>
                  Whether you require compound miter cuts for complex space trusses, 50mm base plates
                  with precision bolt holes, or shot-blasted primed beams, our facility handles the
                  entire material preparation sequence.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-offwhite-border">
                <div className="p-4 bg-white border border-offwhite-border">
                  <span className="font-mono text-2xl font-bold text-copper block">±1.0 mm</span>
                  <span className="text-xs text-graphite font-medium">Cut Tolerance</span>
                </div>
                <div className="p-4 bg-white border border-offwhite-border">
                  <span className="font-mono text-2xl font-bold text-copper block">Up to 120mm</span>
                  <span className="text-xs text-graphite font-medium">Plate Profiling</span>
                </div>
                <div className="p-4 bg-white border border-offwhite-border col-span-2 sm:col-span-1">
                  <span className="font-mono text-2xl font-bold text-copper block">SA 2.5</span>
                  <span className="text-xs text-graphite font-medium">Shot Blast Profile</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl bg-charcoal border border-offwhite-border">
                <Image
                  src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85"
                  alt="Industrial steel flame cutting and processing operations at Ferrite"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-graphite/95 backdrop-blur-md border border-charcoal-border text-white">
                  <span className="text-xs font-mono text-copper uppercase block font-semibold">
                    LOCATION SPOTLIGHT
                  </span>
                  <div className="font-heading font-bold text-lg text-white mt-1">
                    Kalamboli Warehousing Complex (KWC)
                  </div>
                  <p className="text-xs text-steel-light mt-1">
                    Heavy material staging, bandsaws, 20-ton cranes, and highway-connected dispatch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Capabilities Deep-Dive (Graphite) */}
      <section className="bg-graphite py-24 sm:py-32 text-offwhite border-t border-charcoal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-16">
            <Badge variant="copper">FOUR PROCESSING PILLARS</Badge>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
              End-to-End Preparation Portfolio
            </h2>
            <p className="text-steel text-sm sm:text-base">
              A comprehensive breakdown of equipment, capacities, and quality deliverables.
            </p>
          </div>

          <div className="space-y-16">
            {capabilitiesData.map((cap, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={cap.id}
                  className="bg-charcoal border border-charcoal-border p-8 sm:p-12 hover:border-copper transition-colors"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Visual */}
                    <div className="lg:col-span-5 relative aspect-[16/10] w-full overflow-hidden bg-graphite-950 border border-charcoal-border">
                      <Image
                        src={cap.image}
                        alt={cap.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center brightness-95"
                      />
                      <div className="absolute top-4 left-4 z-10 font-mono text-xs text-copper bg-graphite/90 px-2.5 py-1 border border-charcoal-border font-medium">
                        PILLAR {cap.number}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-7 space-y-5">
                      <div>
                        <span className="font-mono text-xs text-copper tracking-widest uppercase font-semibold">
                          {cap.subtitle}
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                          {cap.title}
                        </h3>
                        <p className="text-sm text-steel leading-relaxed mt-3 font-body">
                          {cap.description}
                        </p>
                      </div>

                      {/* Specs Matrix */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-charcoal-border text-xs">
                        {cap.specs.map((sp) => (
                          <div key={sp.label}>
                            <span className="text-steel block">{sp.label}</span>
                            <strong className="text-white font-heading text-sm block mt-0.5">
                              {sp.value}
                            </strong>
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-copper block font-semibold">
                          CONTROL BENCHMARKS
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-steel-light">
                          {cap.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-copper">✓</span>
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submissions for Nesting & Cutting Banner */}
          <div className="mt-20 p-8 sm:p-12 bg-graphite-950 border border-charcoal-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="copper">DRAWINGS & CUT-LISTS</Badge>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Submit Your Structural Mark-List for Estimation
              </h3>
              <p className="text-sm text-steel leading-relaxed">
                Send your cutting schedule, Tekla/AutoCAD drawing mark numbers, or Bill of
                Quantities. Our Kalamboli estimating desk optimizes material yields to reduce scrap
                costs.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-3">
              <a
                href={FERRITE_CONTACT.getWhatsAppUrl("Hello Ferrite Team, I would like to enquire about your steel processing, cutting, and shaping capabilities.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-copper hover:bg-copper-hover text-white font-heading text-sm font-semibold uppercase tracking-wider transition-colors shadow-lg group"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <Button href="/contact" variant="outline" size="lg">
                Discuss Your Requirements
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
