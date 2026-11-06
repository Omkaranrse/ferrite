"use client";

import React, { useMemo } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { productsData } from "@/data/products";
import LensAccordion, { LensAccordionItem } from "./LensAccordion";
import { useTheme } from "@/context/ThemeContext";

export default function ProductsCatalogClient() {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";

  const accordionItems: LensAccordionItem[] = useMemo(() => {
    return productsData.map((prod) => ({
      id: prod.id,
      title: prod.name,
      tag: prod.category,
      year: prod.standards[0] ? prod.standards[0].replace(/:.*$/, "") : "IS 2062",
      image: {
        src: prod.image,
        alt: `${prod.name} structural steel supply`,
      },
      excerpt: prod.tagline,
      body: `${prod.description}\n\nManufactured to the highest industry standards with 100% manufacturer Mill Test Certificate (MTC) traceability. Sourced from primary integrated producers with cut-to-length staging and surface preparation available at our Kalamboli yard.`,
      profiles: prod.profiles,
      standards: prod.standards,
      sizeRange: prod.sizeRange,
      keyFeatures: prod.keyFeatures,
      applications: prod.applications,
      finishOptions: prod.finishOptions,
    }));
  }, []);

  return (
    <>
      <PageHeader
        title="Steel"
        highlightedTitle="Products."
        subtitle="At Ferrite Structural Steels Pvt Ltd, we offer an extensive range of high-quality steel products designed to meet the diverse needs of our clients. Our product portfolio includes Steel Angles, Steel Beams, Steel Channels, Steel Bars, Steel Pipes, Steel Sheets, and Steel Plates, all manufactured to the highest industry standards."
        showBreadcrumb={false}
      />

      {/* Main Products Section - Only the Accordion */}
      <section className={`py-12 sm:py-16 lg:py-20 min-h-[calc(100vh-280px)] transition-colors duration-300 ${isLight ? "bg-[#F8FAFC] text-slate-800" : "bg-charcoal text-offwhite"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introductory Paragraph from Specification */}
          <div className="mb-8 max-w-4xl">
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-steel-light"}`}>
              Whether you require robust steel beams for construction, precise steel sheets for manufacturing, or durable steel pipes for industrial applications, we have the right solution for you. Each product is crafted using advanced production technologies, ensuring exceptional strength, durability, and performance. Explore our wide range of products below.
            </p>
          </div>

          {/* Clean 7-Product Accordion Viewport */}
          <div className={`relative w-full h-[540px] sm:h-[620px] lg:h-[680px] rounded-2xl overflow-hidden p-2 sm:p-3 shadow-xl transition-all duration-300 ${isLight ? "border border-slate-200 bg-white" : "border border-charcoal-border bg-graphite-950"}`}>
            <LensAccordion
              items={accordionItems}
              startIndex={1}
              trigger="hover"
              openSize={6}
              curve={0}
              gap={8}
              radius={12}
              dim={35}
              duration={750}
              ripple={30}
              reorder={false}
              popup={true}
              panel={isLight ? "#FFFFFF" : "#17191B"}
              backdrop={isLight ? "rgba(15, 23, 42, 0.55)" : "rgba(10, 14, 17, 0.85)"}
              textColor={isLight ? "#0F172A" : "#F5F3EF"}
              accent="#C87940"
            />
          </div>
        </div>
      </section>
    </>
  );
}
