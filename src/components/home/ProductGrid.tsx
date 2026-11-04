"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Layers, ChevronRight, SlidersHorizontal } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { productsData, Product } from "@/data/products";
import { useRFQ } from "@/context/RFQContext";

export default function ProductGrid() {
  const { openRFQ } = useRFQ();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Primary Structural",
    "Structural Profiles",
    "Flat Rolled",
    "Tubular Steel",
    "Reinforcing & Merchant",
  ];

  const filteredProducts =
    activeCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="bg-charcoal py-24 sm:py-36 relative text-offwhite border-t border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-charcoal-border">
          <div className="max-w-2xl space-y-4">
            <Badge variant="copper">02 / CORE INVENTORY</Badge>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Materials that <br />
              <span className="text-copper">build industries.</span>
            </h2>
            <p className="text-base sm:text-lg text-steel font-body max-w-xl leading-relaxed">
              Explore structural steel products and material categories for demanding applications,
              stocked and sized in accordance with BIS and international standards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="/products" variant="outline" withArrow>
              View Full Specifications
            </Button>
            <Button onClick={() => openRFQ()} variant="primary" withExternalArrow>
              Instant Quote
            </Button>
          </div>
        </div>

        {/* Filter Navigation Bar with Fluid Active Indicator */}
        <div className="pt-8 pb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/50">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 text-xs font-heading font-medium tracking-wider uppercase whitespace-nowrap transition-all border relative select-none ${
                    isSelected
                      ? "text-white border-copper"
                      : "bg-graphite text-steel border-charcoal-border hover:text-white hover:border-steel-dark"
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="categoryActivePill"
                      className="absolute inset-0 bg-copper copper-glow-sm z-0"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-steel flex items-center gap-2">
            <span className="w-2 h-2 bg-copper rounded-none inline-block animate-pulse" />
            <span>Showing {filteredProducts.length} Profiles</span>
          </div>
        </div>

        {/* Architectural Product Spec-Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-graphite border border-charcoal-border hover:border-copper/80 hover:shadow-2xl hover:shadow-copper/5 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Product Image Container with 16:10 Ratio & Curtain Zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-graphite-950 border-b border-charcoal-border">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 brightness-90 group-hover:brightness-100 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent opacity-80" />

                  {/* Technical Index Tags */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-graphite/90 backdrop-blur-sm border border-charcoal-border text-copper font-medium">
                      {product.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10 font-mono text-xs text-steel/70 bg-graphite/80 px-2 py-0.5 border border-charcoal-border">
                    SPEC-0{idx + 1}
                  </div>
                </div>

                {/* Spec Content Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-copper transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-xs text-copper font-medium line-clamp-1">
                      {product.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-steel leading-relaxed pt-1 line-clamp-3 font-normal">
                      {product.description}
                    </p>
                  </div>

                  {/* Standard & Dimensional Specifications */}
                  <div className="pt-4 border-t border-charcoal-border space-y-2 text-xs">
                    <div className="flex items-baseline justify-between text-[11px]">
                      <span className="text-steel font-medium">Standard:</span>
                      <span className="text-steel-light font-mono text-right max-w-[200px] truncate">
                        {product.standards[0]}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between text-[11px]">
                      <span className="text-steel font-medium">Size Range:</span>
                      <span className="text-steel-light font-mono text-right max-w-[200px] truncate">
                        {product.sizeRange.split("(")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-3 border-t border-charcoal-border flex items-center justify-between">
                    <Link
                      href={`/products#${product.id}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase font-heading font-medium tracking-wider text-steel group-hover:text-white transition-colors"
                    >
                      <span>Inspect Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-copper group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </Link>

                    <button
                      onClick={() => openRFQ(product.name)}
                      className="text-xs font-mono text-copper hover:text-white uppercase tracking-wider font-semibold underline underline-offset-4 transition-colors"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* High-Impact Bottom Callout for Custom Fabrication */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-12 bg-graphite border border-charcoal-border flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-copper block font-semibold">
              BESPOKE STRUCTURAL SIZING
            </span>
            <h4 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Do not see your exact profile, grade, or cutting length?
            </h4>
            <p className="text-xs sm:text-sm text-steel leading-relaxed">
              We procure heavy non-standard profiles directly from primary mills and perform
              precision cutting, CNC plate profiling, and edge preparation at our Kalamboli yard.
            </p>
          </div>
          <div className="shrink-0">
            <Button
              onClick={() => openRFQ("Custom Engineering Specification")}
              variant="primary"
              size="lg"
              withArrow
            >
              Submit Drawing for Estimate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
