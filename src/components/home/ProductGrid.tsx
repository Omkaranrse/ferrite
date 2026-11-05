"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, CornerDownRight, Sheet, CircleDot } from "lucide-react";

interface ProductCard {
  id: string;
  title: string;
  subtext: string;
  image: string;
  href: string;
  icon: React.ElementType;
}

const PRIMARY_PRODUCT_CARDS: ProductCard[] = [
  {
    id: "structural-sections",
    title: "Structural Sections",
    subtext: "Beams, Columns, Channels, Joists & more",
    image: "/images/products/structural-sections.png",
    href: "/products#structural-beams",
    icon: Layers,
  },
  {
    id: "angles-flats",
    title: "Angles & Flats",
    subtext: "MS Angles, Equal & Unequal Angles, Flat Bars",
    image: "/images/products/angles-flats.png",
    href: "/products#steel-angles",
    icon: CornerDownRight,
  },
  {
    id: "plates-sheets",
    title: "Plates & Sheets",
    subtext: "MS Plates, HR Sheets, Chequered Plates",
    image: "/images/products/plates-sheets.png",
    href: "/products#plates-and-sheets",
    icon: Sheet,
  },
  {
    id: "pipes-tubes",
    title: "Pipes & Tubes",
    subtext: "Round, Square & Rectangular Hollow Sections",
    image: "/images/products/pipes-tubes.png",
    href: "/products#hollow-sections-pipes",
    icon: CircleDot,
  },
];

export default function ProductGrid() {
  return (
    <section id="products" className="bg-[#0A0E11] py-16 sm:py-20 relative text-offwhite border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-medium text-copper tracking-wider uppercase">
              — OUR STEEL PRODUCTS
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              A Complete Range of Structural Steels
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-copper hover:text-copper-hover transition-colors group self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Architectural Visual Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRIMARY_PRODUCT_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={card.href}
                className="group block bg-[#12181D] border border-white/5 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Product Visual with 16:10 Ratio & Smooth Zoom on Hover */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-95 group-hover:brightness-100"
                  />
                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12181D]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Bottom Meta Bar */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <card.icon className="w-4 h-4 text-copper shrink-0" />
                      <h3 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-copper transition-colors truncate">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#9CA3AF] truncate">
                      {card.subtext}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-copper group-hover:text-white group-hover:border-copper transition-all shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
