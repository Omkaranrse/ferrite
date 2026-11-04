"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Layers, Box, Maximize2, Shield } from "lucide-react";

interface ProductCard {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRODUCT_CARDS: ProductCard[] = [
  {
    id: "structural-sections",
    title: "Structural Sections",
    description: "Beams, Columns, Channels, Joists & more.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    href: "/products#structural-beams",
    icon: Layers,
  },
  {
    id: "angles-flats",
    title: "Angles & Flats",
    description: "MS Angles, Equal & Unequal Angles, Flat Bars.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    href: "/products#steel-angles",
    icon: Box,
  },
  {
    id: "plates-sheets",
    title: "Plates & Sheets",
    description: "MS Plates, HR Sheets, Chequered Plates.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    href: "/products#plates-and-sheets",
    icon: Shield,
  },
  {
    id: "pipes-tubes",
    title: "Pipes & Tubes",
    description: "Round, Square & Rectangular Hollow Sections.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    href: "/products#hollow-sections-pipes",
    icon: Maximize2,
  },
];

export default function ProductGrid() {
  return (
    <section id="products" className="bg-[#111619] py-12 sm:py-14 relative text-offwhite border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-copper block font-semibold mb-1">
              OUR STEEL PRODUCTS
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              A Complete Range of Structural Steels
            </h2>
          </div>

          <Link
            href="/products"
            className="text-xs font-heading font-semibold uppercase tracking-wider text-copper hover:text-white transition-colors inline-flex items-center gap-1.5 shrink-0 group self-start sm:self-auto"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Compact Product Cards in One Row on Desktop (~220-240px height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {PRODUCT_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative h-[230px] rounded-xl overflow-hidden border border-white/10 hover:border-copper/70 bg-[#161A1D] transition-all duration-300 shadow-md flex flex-col justify-end p-4 select-none cursor-pointer"
              >
                <Link href={card.href} className="absolute inset-0 z-20" aria-label={card.title} />

                {/* Background Photography — takes up ~65% of the card */}
                <div className="absolute inset-0 z-0 bg-[#0A0E11] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108 brightness-90 group-hover:brightness-100"
                  />
                  {/* Dark gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111619] via-[#111619]/65 to-transparent" />
                </div>

                {/* Card Content at Bottom */}
                <div className="relative z-10 flex items-end justify-between gap-3">
                  <div className="space-y-1">
                    {/* Small Orange Outlined Icon */}
                    <div className="w-6 h-6 rounded-md bg-black/40 border border-copper/50 flex items-center justify-center text-copper mb-1">
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <h3 className="font-heading text-base font-bold text-white group-hover:text-copper transition-colors leading-tight">
                      {card.title}
                    </h3>

                    <p className="text-xs text-[#A9AFB2] line-clamp-1 font-body">
                      {card.description}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 group-hover:bg-copper group-hover:border-copper flex items-center justify-center text-white transition-colors shrink-0 shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
