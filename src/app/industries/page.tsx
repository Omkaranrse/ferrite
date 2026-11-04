import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Building2, HardHat, Warehouse, Factory, ArrowUpRight, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { industriesData } from "@/data/industries";
import { BreadcrumbSchema } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Industries Served | Structural Steel for Infrastructure, PEB & High-Rise",
  description:
    "Supplying certified structural steel and material processing for commercial high-rises, civil bridges, highway flyovers, PEB fabrication, and heavy manufacturing across India.",
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industries Served | Construction, Infrastructure & Fabrication | Ferrite",
    description:
      "Engineered supply chains and certified structural steel profiles aligned with BIS and ASTM building codes across Indian industry.",
    url: "https://ferrite.in/industries",
  },
};

export default function IndustriesPage() {
  const icons = [Building2, HardHat, Warehouse, Factory];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferrite.in" },
          { name: "Industries Served", url: "https://ferrite.in/industries" },
        ]}
      />

      <PageHeader
        eyebrow="SECTORS & STRUCTURAL APPLICATIONS"
        title="Supporting the industries that"
        highlightedTitle="build tomorrow."
        subtitle="Every industry imposes distinct mechanical, metallurgical, and scheduling demands. Explore how Ferrite aligns material preparation with your project’s structural reality."
        breadcrumb="Industries"
      />

      {/* Industries Showcase Section */}
      <section className="bg-graphite py-20 sm:py-28 text-offwhite min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {industriesData.map((ind, idx) => {
            const Icon = icons[idx] || Building2;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={ind.id}
                id={ind.id}
                className="bg-charcoal border border-charcoal-border hover:border-copper/70 transition-colors p-8 sm:p-12 shadow-2xl scroll-mt-28"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Visual Col */}
                  <div
                    className={`lg:col-span-5 relative aspect-[16/11] w-full overflow-hidden bg-graphite-950 border border-charcoal-border ${
                      isEven ? "" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center brightness-90"
                    />
                    <div className="absolute top-4 left-4 z-10 w-11 h-11 bg-graphite/90 backdrop-blur-sm border border-charcoal-border flex items-center justify-center text-copper">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white p-3.5 bg-graphite/90 backdrop-blur-sm border border-charcoal-border">
                      <span className="text-[10px] font-mono text-copper uppercase block font-semibold">
                        SECTOR CODE 0{idx + 1}
                      </span>
                      <span className="font-heading font-bold text-sm text-white">
                        {ind.name}
                      </span>
                    </div>
                  </div>

                  {/* Text & Specs Col */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      isEven ? "" : "lg:order-1"
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs text-copper tracking-widest uppercase font-semibold">
                        {ind.tagline}
                      </span>
                      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">
                        {ind.name}
                      </h2>
                      <p className="text-sm sm:text-base text-steel leading-relaxed mt-3 font-body">
                        {ind.description}
                      </p>
                    </div>

                    {/* Challenges Solved */}
                    <div className="space-y-2 pt-2 border-t border-charcoal-border">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-copper block font-semibold">
                        PROJECT CHALLENGES RESOLVED
                      </span>
                      <ul className="space-y-1.5 text-xs text-steel-light font-body">
                        {ind.challengesSolved.map((ch, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-copper">✓</span>
                            <span>{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Materials & Applications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                      <div className="bg-graphite p-4 border border-charcoal-border space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-steel block font-semibold">
                          COMMONLY SUPPLIED MATERIALS
                        </span>
                        <ul className="space-y-1 text-steel-light font-mono text-[11px]">
                          {ind.materialsSupplied.map((m, i) => (
                            <li key={i}>• {m}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-graphite p-4 border border-charcoal-border space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-steel block font-semibold">
                          TYPICAL STRUCTURE TYPES
                        </span>
                        <ul className="space-y-1 text-steel-light font-body text-[11px]">
                          {ind.keyApplications.map((app, i) => (
                            <li key={i}>• {app}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-4 border-t border-charcoal-border flex flex-wrap items-center justify-between gap-4">
                      <div className="flex gap-3">
                        <Button
                          href="/contact"
                          variant="primary"
                          size="sm"
                          withArrow
                        >
                          Request a Quote
                        </Button>
                        <Button
                          href="/contact"
                          variant="outline"
                          size="sm"
                        >
                          Discuss Your Requirements
                        </Button>
                      </div>
                      <span className="text-xs font-mono text-steel">
                        Pan-India Staged Supply
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
