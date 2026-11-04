"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Search, SlidersHorizontal, ShieldCheck, Download, HelpCircle } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { productsData, Product } from "@/data/products";
import { useRFQ } from "@/context/RFQContext";

export default function ProductsPage() {
  const { openRFQ } = useRFQ();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Primary Structural",
    "Structural Profiles",
    "Flat Rolled",
    "Tubular Steel",
    "Reinforcing & Merchant",
  ];

  const filteredProducts = useMemo(() => {
    return productsData.filter((prod) => {
      const matchesCategory =
        selectedCategory === "All" || prod.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.profiles.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prod.standards.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <PageHeader
        eyebrow="PRODUCT CATALOG & SPECIFICATIONS"
        title="Engineered structural steel"
        highlightedTitle="portfolio."
        subtitle="Sourced from primary integrated steel manufacturers and prepared to order. Explore profiles, dimensions, grades, and finishes conforming to BIS and ASTM standards."
        breadcrumb="Products"
      />

      {/* Main Catalog Section */}
      <section className="bg-charcoal py-20 sm:py-32 text-offwhite min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter & Live Search Toolbar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pb-10 border-b border-charcoal-border">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 text-xs font-heading font-medium tracking-wider uppercase whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? "bg-copper text-white border-copper copper-glow-sm"
                      : "bg-graphite text-steel border-charcoal-border hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-steel absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search profiles, ISMB, E250..."
                className="w-full bg-graphite border border-charcoal-border focus:border-copper pl-10 pr-4 py-2.5 text-xs text-white placeholder-steel-dark outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-steel hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="py-4 flex items-center justify-between text-xs font-mono text-steel">
            <span>
              Showing {filteredProducts.length} of {productsData.length} Material Categories
            </span>
            <span className="hidden sm:inline-block">100% Mill Test Certified (MTC)</span>
          </div>

          {/* Product Deep-Dive Cards */}
          <div className="space-y-16 pt-8">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-graphite border border-charcoal-border p-8">
                <p className="text-steel text-sm">
                  No structural material matched &ldquo;{searchQuery}&rdquo;. Try adjusting your keywords.
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              filteredProducts.map((prod, idx) => (
                <div
                  key={prod.id}
                  id={prod.id}
                  className="bg-graphite border border-charcoal-border hover:border-copper/70 transition-colors p-6 sm:p-10 shadow-2xl scroll-mt-28"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Visual Col */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-graphite-950 border border-charcoal-border">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover object-center brightness-95 transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-graphite/90 backdrop-blur-sm border border-charcoal-border text-copper font-medium">
                            {prod.category}
                          </span>
                        </div>
                      </div>

                      {/* Finish Options Pill Strip */}
                      <div className="p-4 bg-charcoal border border-charcoal-border text-xs">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-steel block mb-2 font-medium">
                          SURFACE FINISHES & PREPARATION
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {prod.finishOptions.map((f, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-graphite border border-charcoal-border text-[11px] text-steel-light"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Specification & Content Col */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white">
                            {prod.name}
                          </h2>
                          <span className="font-mono text-xs text-copper font-bold bg-charcoal px-2 py-1 border border-charcoal-border">
                            SPEC-0{idx + 1}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-copper font-medium mt-1">
                          {prod.tagline}
                        </p>
                        <p className="text-sm text-steel leading-relaxed mt-3 font-body">
                          {prod.description}
                        </p>
                      </div>

                      {/* Profiles & Grades Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-charcoal-border text-xs">
                        <div className="bg-charcoal p-4 border border-charcoal-border space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-copper block font-medium">
                            AVAILABLE PROFILES
                          </span>
                          <ul className="space-y-1.5 text-steel-light font-medium">
                            {prod.profiles.map((pr, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-copper shrink-0" />
                                <span>{pr}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-charcoal p-4 border border-charcoal-border space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-copper block font-medium">
                            GOVERNING STANDARDS & CODES
                          </span>
                          <ul className="space-y-1.5 text-steel-light font-mono">
                            {prod.standards.map((st, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-copper shrink-0" />
                                <span>{st}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Dimensional Scope & Key Features */}
                      <div className="space-y-3 pt-2 text-xs">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-2 border-b border-charcoal-border">
                          <span className="text-steel font-medium">Dimensional Range:</span>
                          <span className="text-white font-mono">{prod.sizeRange}</span>
                        </div>
                        <div className="py-2">
                          <span className="text-steel font-medium block mb-2">
                            Engineering Highlights:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-steel-light">
                            {prod.keyFeatures.map((kf, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="text-copper mt-0.5">•</span>
                                <span>{kf}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 border-t border-charcoal-border flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-steel">
                          <ShieldCheck className="w-4 h-4 text-copper" />
                          <span>MTC Supplied with Every Order</span>
                        </div>
                        <Button
                          onClick={() => openRFQ(prod.name)}
                          variant="primary"
                          size="md"
                          withArrow
                        >
                          Request Quote for {prod.name}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Reference Standards Table */}
          <div className="mt-20 p-8 sm:p-12 bg-graphite border border-charcoal-border">
            <div className="space-y-2 mb-6">
              <Badge variant="copper">METALLURGICAL STANDARDS REFERENCE</Badge>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Indian & International Structural Steel Equivalents
              </h3>
              <p className="text-xs text-steel">
                All materials supplied by Ferrite conform strictly to mechanical and chemical
                thresholds stipulated below.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-charcoal-border text-steel font-mono uppercase tracking-wider">
                    <th className="py-3 pr-4">Indian Standard (BIS)</th>
                    <th className="py-3 px-4">Yield Strength (Min)</th>
                    <th className="py-3 px-4">Tensile Strength</th>
                    <th className="py-3 px-4">ASTM Equivalent</th>
                    <th className="py-3 px-4">EN Equivalent</th>
                    <th className="py-3 pl-4">Typical Product</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-border text-steel-light font-mono">
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">IS 2062 E250 (Fe 410W)</td>
                    <td className="py-3 px-4">250 MPa</td>
                    <td className="py-3 px-4">410 MPa</td>
                    <td className="py-3 px-4">ASTM A36</td>
                    <td className="py-3 px-4">EN 10025 S275JR</td>
                    <td className="py-3 pl-4">Beams, Angles, Channels</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">IS 2062 E350 (Fe 490)</td>
                    <td className="py-3 px-4">350 MPa</td>
                    <td className="py-3 px-4">490 MPa</td>
                    <td className="py-3 px-4">ASTM A572 Gr 50</td>
                    <td className="py-3 px-4">EN 10025 S355JR</td>
                    <td className="py-3 pl-4">High-Rise Columns, Bridge Girders</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">IS 4923 / IS 1161</td>
                    <td className="py-3 px-4">210 – 310 MPa</td>
                    <td className="py-3 px-4">330 – 450 MPa</td>
                    <td className="py-3 px-4">ASTM A500 Gr B</td>
                    <td className="py-3 px-4">EN 10219 S275J0H</td>
                    <td className="py-3 pl-4">Square & Rectangular Hollow Sections</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">IS 1786 Fe 500D</td>
                    <td className="py-3 px-4">500 MPa</td>
                    <td className="py-3 px-4">565 MPa</td>
                    <td className="py-3 px-4">ASTM A615 Gr 60</td>
                    <td className="py-3 px-4">BS 4449 Grade B500B</td>
                    <td className="py-3 pl-4">High Ductility Seismic Rebars</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
