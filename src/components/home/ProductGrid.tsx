"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRFQ } from "@/context/RFQContext";

interface ProductCard {
  id: string;
  categoryNumber: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  href: string;
}

const PRIMARY_PRODUCT_CARDS: ProductCard[] = [
  {
    id: "structural-sections",
    categoryNumber: "01",
    title: "Structural Sections",
    description:
      "Primary load-bearing structural members for commercial buildings, civil infrastructure, and heavy industrial gantry framing.",
    items: ["Beams", "Columns", "Channels", "Joists"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    href: "/products#structural-beams",
  },
  {
    id: "angles-flats",
    categoryNumber: "02",
    title: "Angles & Flats",
    description:
      "Rigid 90-degree structural sections and solid flat bars for trusses, cross-bracing, and power transmission structures.",
    items: ["MS Angles", "Equal & Unequal Angles", "Flat Bars"],
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=85",
    href: "/products#steel-angles",
  },
  {
    id: "plates-sheets",
    categoryNumber: "03",
    title: "Plates & Sheets",
    description:
      "Prime hot-rolled structural plates and chequered floor sheets with custom CNC profiling, flame cutting, and edge beveling.",
    items: ["MS Plates", "HR Sheets", "Chequered Plates"],
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
    href: "/products#plates-and-sheets",
  },
  {
    id: "pipes-tubes",
    categoryNumber: "04",
    title: "Pipes & Tubes",
    description:
      "High torsional resistance hollow sections (SHS, RHS, CHS) and heavy-wall ERW pipes for architectural forms and engineering.",
    items: ["Round Sections", "Square Sections", "Rectangular Hollow Sections"],
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=85",
    href: "/products#hollow-sections-pipes",
  },
];

export default function ProductGrid() {
  const { openRFQ } = useRFQ();

  return (
    <section id="products" className="bg-industrial-dark py-20 sm:py-28 relative text-offwhite border-t border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-charcoal-border">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal border border-charcoal-border text-[11px] font-mono text-copper uppercase tracking-wider">
              <span>OUR STEEL PRODUCTS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              A Complete Range of <br className="hidden sm:inline" />
              <span className="text-copper">Structural Steels</span>
            </h2>
            <p className="text-sm sm:text-base text-steel max-w-xl font-body leading-relaxed">
              Explore primary structural profiles, merchant stock, and processed plate products
              maintained in rolling buffer inventory at our Kalamboli yard.
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

        {/* 4 Architectural Visual Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {PRIMARY_PRODUCT_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative bg-charcoal border border-charcoal-border hover:border-copper transition-all duration-400 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              {/* Product Visual with Consistent Ratio & Subtle Zoom on Hover */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite-950">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 brightness-90 group-hover:brightness-100"
                />
                {/* Dark Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

                {/* Top Pillar Tag */}
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-industrial-dark/90 border border-charcoal-border text-[10px] font-mono tracking-widest text-copper font-semibold backdrop-blur-sm">
                  CATEGORY {card.categoryNumber}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-copper transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-steel leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* Subcategories Bullet List */}
                <div className="pt-2 border-t border-charcoal-border/70 space-y-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-copper block font-medium">
                    PROFILES INCLUDED:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {card.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-heading px-2 py-0.5 bg-industrial-dark border border-charcoal-border text-steel-light"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation Link with Orange Arrow */}
                <div className="pt-3 border-t border-charcoal-border/50">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-copper group-hover:text-white transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
