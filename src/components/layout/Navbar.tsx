"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "@/components/shared/BrandLogo";
import Button from "@/components/ui/Button";
import { useRFQ } from "@/context/RFQContext";
import { FERRITE_CONTACT } from "@/lib/contact";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Capabilities", href: "/capabilities" },
  { name: "Industries", href: "/industries" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openRFQ } = useRFQ();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-graphite/90 backdrop-blur-md py-4 border-b border-charcoal-border shadow-xl shadow-graphite-950/20"
            : "bg-gradient-to-b from-graphite-950/80 to-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <BrandLogo />
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-xs xl:text-sm font-heading font-medium tracking-[0.08em] uppercase transition-colors duration-200 group select-none",
                    isActive ? "text-white" : "text-steel hover:text-offwhite"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-x-2 bottom-0 h-0.5 bg-copper"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="absolute inset-x-2 bottom-0 h-0.5 bg-copper/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                onClick={() => openRFQ()}
                withArrow
              >
                Request a Quote
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 border border-charcoal-border bg-charcoal/80 flex items-center justify-center text-offwhite hover:text-white hover:border-copper transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden flex flex-col bg-graphite"
          >
            {/* Mobile Header Bar */}
            <div className="p-5 sm:p-6 border-b border-charcoal-border flex items-center justify-between">
              <BrandLogo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 border border-charcoal-border bg-charcoal flex items-center justify-center text-steel hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-between">
              <nav className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-copper block mb-2">
                  EXPLORE ARCHITECTURE & SUPPLY
                </span>
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-3 text-xl font-heading font-medium tracking-tight border-b border-charcoal/80 transition-colors",
                          isActive ? "text-copper pl-2 border-copper/40" : "text-offwhite hover:text-copper"
                        )}
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-steel" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile Quick Info & Action */}
              <div className="pt-6 border-t border-charcoal-border space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={FERRITE_CONTACT.getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-heading text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    <span>WhatsApp Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={FERRITE_CONTACT.getTelUrl()}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-charcoal border border-charcoal-border text-white hover:border-copper font-heading text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-copper" />
                    <span>Call Commercial Desk</span>
                  </a>
                </div>

                <div className="space-y-2.5 text-xs text-steel pt-2 border-t border-charcoal-border/50">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-copper shrink-0" />
                    <span>Commercial Desk:</span>
                    <a href={FERRITE_CONTACT.getTelUrl()} className="text-white hover:text-copper font-mono">
                      {FERRITE_CONTACT.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-copper shrink-0" />
                    <span>Inquiries:</span>
                    <a href={FERRITE_CONTACT.getEmailUrl()} className="text-white hover:text-copper font-mono">
                      {FERRITE_CONTACT.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-copper shrink-0" />
                    <span>Hubs: Ghatkopar HQ & Kalamboli Facility</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

