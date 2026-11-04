"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

interface NavLinkItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "Capabilities", href: "/capabilities" },
  { name: "Industries", href: "/industries" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Floating Pill Navigation Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-3.5 sm:pt-4 pointer-events-none"
      >
        <nav
          aria-label="Ferrite Main Navigation"
          className={cn(
            "pointer-events-auto relative w-full max-w-[1240px] rounded-full transition-all duration-300",
            "h-14 sm:h-[60px] flex items-center px-4 sm:px-6",
            "bg-[#111619]/90 backdrop-blur-md border border-white/12 shadow-xl shadow-black/40",
            isScrolled && "bg-[#0E1215]/95 border-white/15 shadow-2xl"
          )}
        >
          {/* Navigation Interior */}
          <div className="w-full flex items-center justify-between gap-3">
            {/* Left: Brand Logo & Lineage */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group select-none focus:outline-none shrink-0"
              aria-label="Ferrite Structural Steels Home"
            >
              {/* Ferrite Logo Icon Mark */}
              <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center">
                <img
                  src="/ferrite-icon.svg"
                  alt="Ferrite"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <span className="font-heading font-black text-sm sm:text-base tracking-[0.12em] uppercase text-copper group-hover:text-copper-light transition-colors leading-none">
                  FERRITE
                </span>
                <span className="text-[7.5px] sm:text-[8px] font-mono tracking-[0.16em] uppercase text-steel-light leading-none mt-1">
                  STRUCTURAL STEELS PVT. LTD.
                </span>
              </div>

              {/* Vertical Divider & EST. 1965 */}
              <div className="hidden xl:flex items-center gap-2.5 pl-1.5">
                <div className="h-4 w-px bg-white/15" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-steel font-medium">
                  EST. 1965
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-1.5 text-xs font-heading font-medium tracking-normal transition-colors duration-200 group select-none rounded-full",
                      isActive
                        ? "bg-copper text-white shadow-sm"
                        : "text-[#A9AFB2] hover:text-white"
                    )}
                  >
                    <span className="relative z-10 inline-flex items-center gap-1">
                      {link.name}
                      {link.hasDropdown && (
                        <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right: Primary Quotation CTA & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Primary "Request a Quote" CTA Button */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={FERRITE_CONTACT.getWhatsAppUrl(
                  "Hello Ferrite Team, I would like to request a quotation for structural steel."
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { location: "navbar_pill", message_type: "quote_request" },
                  })
                }
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-copper hover:bg-copper-hover text-white font-heading text-xs font-semibold tracking-wider transition-all duration-200 shadow-md hover:shadow-copper/30"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-offwhite hover:text-white hover:border-copper transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden bg-[#111619] border border-white/12 p-6 shadow-2xl rounded-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-4 py-2.5 text-sm font-heading font-medium uppercase tracking-wider rounded-lg transition-colors",
                      isActive
                        ? "bg-copper text-white"
                        : "text-steel-light hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={FERRITE_CONTACT.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 bg-copper text-white font-heading text-xs font-semibold uppercase tracking-wider rounded-full shadow-md"
                >
                  Request a Quote ↗
                </a>
                <a
                  href={`tel:${FERRITE_CONTACT.phoneRaw}`}
                  className="w-full text-center py-2.5 border border-white/15 text-white font-heading text-xs font-medium uppercase tracking-wider rounded-full"
                >
                  Direct Call: {FERRITE_CONTACT.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
