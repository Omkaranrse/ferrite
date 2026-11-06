"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LiquidSurface from "@/components/navbar/LiquidSurface";
import LiquidMark from "@/components/navbar/LiquidMark";
import ThemeSwitch from "@/components/navbar/ThemeSwitch";
import { useTheme } from "@/context/ThemeContext";
import { useRFQ } from "@/context/RFQContext";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openRFQ } = useRFQ();
  const { theme, isMounted } = useTheme();

  const isLight = isMounted && theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Floating Liquid Metal Navbar Header with Smooth Entrance */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-5 pointer-events-none"
      >
        <nav
          aria-label="Ferrite Main Navigation"
          className={cn(
            "pointer-events-auto relative w-full max-w-6xl rounded-full transition-all duration-500",
            isLight
              ? isScrolled
                ? "py-2 px-3 sm:px-5 bg-white/95 backdrop-blur-2xl border-2 border-slate-400/80 shadow-2xl shadow-slate-900/10"
                : "py-2.5 px-4 sm:px-6 bg-white/85 backdrop-blur-xl border-2 border-slate-400/60 shadow-xl shadow-slate-900/5"
              : isScrolled
                ? "py-2 px-3 sm:px-5 bg-[#111315]/95 backdrop-blur-2xl border border-charcoal-border/90 shadow-2xl shadow-graphite-950/90"
                : "py-2.5 px-4 sm:px-6 bg-[#16181B]/80 backdrop-blur-xl border border-charcoal-border/60 shadow-xl shadow-graphite-950/60"
          )}
        >
          {/* Framer Liquid Metal Surface Layer */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <LiquidSurface
              material="navigation"
              edgeWidth={3.4}
              brightness={isLight ? 1.25 : 1.08}
              prism={0.65}
              radius={100}
              hoverLight={0.7}
              liquid={0.9}
              colors={
                isLight
                  ? {
                      highlight: "#FFFFFF",
                      shade: "#CBD5E1",
                      accent: "#C47A48", // Ferrite signature copper
                    }
                  : {
                      highlight: "#EEF6FF",
                      shade: "#111A28",
                      accent: "#C47A48", // Ferrite signature copper
                    }
              }
              motion={{
                playback: "ambient",
                speed: 1,
                flow: 0.9,
                attraction: 0.85,
              }}
            />
          </div>

          {/* Navigation Interior Flex Grid */}
          <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Brand Monogram with LiquidMark Medallion + Icon Image */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group select-none focus:outline-none"
              aria-label="Ferrite Structural Steels Home"
            >
              {/* LiquidMark Medallion Torus featuring ferrite-icon.svg */}
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                <LiquidMark size={46} imageSrc="/ferrite-icon.svg" flow={0.9} brightness={isLight ? 1.22 : 1.1} />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-heading font-bold text-sm sm:text-base tracking-[0.14em] uppercase transition-colors leading-tight",
                    isLight ? "text-slate-900 group-hover:text-copper" : "text-white group-hover:text-copper"
                  )}
                >
                  FERRITE
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
                      "relative px-3.5 py-2 text-xs font-heading font-medium tracking-[0.08em] uppercase transition-colors duration-200 group select-none rounded-full",
                      isLight
                        ? isActive
                          ? "text-slate-950 font-bold"
                          : "text-slate-600 hover:text-slate-950"
                        : isActive
                          ? "text-white"
                          : "text-steel hover:text-offwhite"
                    )}
                  >
                    <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5 inline-block">
                      {link.name}
                    </span>

                    {/* Active Pill Glow */}
                    {isActive && (
                      <motion.span
                        layoutId="navActiveIndicator"
                        className={cn(
                          "absolute inset-0 rounded-full -z-0",
                          isLight
                            ? "bg-slate-200/90 border border-slate-300/80 shadow-sm"
                            : "bg-charcoal border border-charcoal-border"
                        )}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}

                    {/* Animated Underline on Hover */}
                    <span className="absolute inset-x-3 bottom-1.5 h-[2px] bg-copper scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 rounded-full pointer-events-none" />
                  </Link>
                );
              })}
            </div>

            {/* Right: Quick Actions (Theme Switch + WhatsApp Quote + Mobile Menu) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button placed between Contact and Request a Quote */}
              <div className="hidden sm:flex items-center">
                <ThemeSwitch />
              </div>

              {/* Primary "Request a Quote" Liquid Copper CTA */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={FERRITE_CONTACT.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent({
                    name: "whatsapp_click",
                    params: { location: "navbar_pill", message_type: "quote_request" },
                  })
                }
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-copper hover:bg-copper-hover text-white font-heading text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-copper/30 group"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              {/* Mobile: Compact Theme Toggle Button */}
              <div className="sm:hidden flex items-center">
                <ThemeSwitch />
              </div>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "lg:hidden w-9 h-9 rounded-full border flex items-center justify-center transition-colors focus:outline-none",
                  isLight
                    ? "border-slate-300 bg-white/90 text-slate-800 hover:text-black hover:border-copper"
                    : "border-charcoal-border bg-charcoal/90 text-offwhite hover:text-white hover:border-copper"
                )}
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
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed inset-x-0 top-0 z-40 lg:hidden backdrop-blur-2xl pt-24 pb-8 px-6 shadow-2xl transition-colors",
              isLight
                ? "bg-white/98 border-b border-slate-200 text-slate-900"
                : "bg-graphite/98 border-b border-charcoal-border text-offwhite"
            )}
          >
            <div className="max-w-md mx-auto space-y-6">
              {/* Navigation Links with Staggered Entrance */}
              <nav className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-copper block mb-3">
                  EXPLORE ARCHITECTURE &amp; SUPPLY
                </span>
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-3 px-3.5 text-base font-heading font-medium rounded-lg transition-colors group",
                          isLight
                            ? isActive
                              ? "bg-slate-100 text-copper border-l-2 border-copper"
                              : "text-slate-800 hover:bg-slate-50 hover:text-black"
                            : isActive
                              ? "bg-charcoal text-copper border-l-2 border-copper"
                              : "text-offwhite hover:bg-charcoal/50 hover:text-white"
                        )}
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                        <ArrowUpRight
                          className={cn(
                            "w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                            isLight
                              ? "text-slate-400 group-hover:text-copper"
                              : "text-steel group-hover:text-copper"
                          )}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Theme Switch Row in Mobile Drawer */}
              <div
                className={cn(
                  "flex items-center justify-between py-2.5 px-3.5 rounded-lg border",
                  isLight
                    ? "bg-slate-50 border-slate-200"
                    : "bg-charcoal/60 border-charcoal-border"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-heading font-semibold uppercase tracking-wider",
                    isLight ? "text-slate-700" : "text-steel-light"
                  )}
                >
                  Theme ({isLight ? "Light Mode" : "Dark Mode"})
                </span>
                <ThemeSwitch />
              </div>

              {/* Direct Actions with Slide Up */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className={cn(
                  "pt-4 border-t space-y-3",
                  isLight ? "border-slate-200" : "border-charcoal-border"
                )}
              >
                <a
                  href={FERRITE_CONTACT.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    trackEvent({
                      name: "whatsapp_click",
                      params: { location: "mobile_menu", message_type: "quote_request" },
                    });
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-heading text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-[#25D366]/20 active:scale-98"
                >
                  <span>WhatsApp Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={FERRITE_CONTACT.getTelUrl()}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2.5 px-3 rounded-full border font-heading font-semibold transition-colors",
                      isLight
                        ? "bg-slate-100 border-slate-200 text-slate-900 hover:border-copper"
                        : "bg-charcoal border-charcoal-border text-white hover:border-copper"
                    )}
                  >
                    <Phone className="w-3.5 h-3.5 text-copper" />
                    <span>Call HQ</span>
                  </a>
                  <a
                    href={FERRITE_CONTACT.getEmailUrl()}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2.5 px-3 rounded-full border font-heading font-semibold transition-colors",
                      isLight
                        ? "bg-slate-100 border-slate-200 text-slate-900 hover:border-copper"
                        : "bg-charcoal border-charcoal-border text-white hover:border-copper"
                    )}
                  >
                    <Mail className="w-3.5 h-3.5 text-copper" />
                    <span>Email Us</span>
                  </a>
                </div>

                <div
                  className={cn(
                    "space-y-1.5 text-[11px] pt-2 font-mono",
                    isLight ? "text-slate-500" : "text-steel"
                  )}
                >
                  <div>HQ: {FERRITE_CONTACT.phone}</div>
                  <div>Yard: {FERRITE_CONTACT.phoneSecondary}</div>
                  <div>Email: {FERRITE_CONTACT.email}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
