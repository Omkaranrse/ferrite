"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, FileCheck, Layers, Truck, ShieldCheck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { approachSteps } from "@/data/approach";
import { useRFQ } from "@/context/RFQContext";

export default function ApproachTimeline() {
  const { openRFQ } = useRFQ();
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [Layers, FileCheck, Clock, Truck];

  return (
    <section id="approach" className="bg-graphite py-24 sm:py-36 relative text-offwhite border-t border-charcoal-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-24 pb-8 border-b border-charcoal-border">
          <div className="max-w-2xl space-y-4">
            <Badge variant="copper">04 / OUR WORKFLOW</Badge>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              From specification <br />
              <span className="text-copper">to supply.</span>
            </h2>
            <p className="text-base sm:text-lg text-steel font-body max-w-xl leading-relaxed">
              An engineered 4-stage methodology ensuring every beam, channel, plate, and custom cut
              member aligns with drawing specifications and site erection schedules.
            </p>
          </div>

          <div className="hidden md:block">
            <Button onClick={() => openRFQ()} variant="primary" withArrow>
              Initiate Material Review
            </Button>
          </div>
        </div>

        {/* Desktop Horizontal Timeline Track */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            {/* Connecting Track Line */}
            <div className="absolute top-7 left-0 right-0 h-0.5 bg-charcoal-border z-0" />
            <motion.div
              className="absolute top-7 left-0 h-0.5 bg-copper z-0 transition-all duration-500"
              style={{ width: `${(activeStep / (approachSteps.length - 1)) * 100}%` }}
            />

            {/* Step Nodes */}
            <div className="relative z-10 grid grid-cols-4 gap-6">
              {approachSteps.map((step, idx) => {
                const isCurrent = activeStep === idx;
                const isPassed = activeStep > idx;
                const Icon = stepIcons[idx] || Layers;

                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStep(idx)}
                    className="text-left group focus:outline-none select-none"
                  >
                    {/* Node Dot */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                          isCurrent
                            ? "bg-copper border-copper text-white shadow-lg copper-glow scale-105"
                            : isPassed
                            ? "bg-charcoal border-copper text-copper"
                            : "bg-graphite border-charcoal-border text-steel group-hover:border-steel"
                        }`}
                      >
                        <span className="font-mono text-sm font-bold">{step.step}</span>
                      </div>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-steel">
                        {step.timing}
                      </span>
                    </div>

                    {/* Step Title & Summary */}
                    <div
                      className={`p-6 border transition-all duration-300 min-h-[170px] flex flex-col justify-between ${
                        isCurrent
                          ? "bg-charcoal border-copper/80 text-white shadow-2xl ring-1 ring-copper/30"
                          : "bg-graphite-900 border-charcoal-border text-steel group-hover:border-steel-dark"
                      }`}
                    >
                      <div>
                        <h3 className="font-heading text-base font-bold text-white group-hover:text-copper transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-xs text-steel mt-2.5 line-clamp-3 leading-relaxed">
                          {step.summary}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-copper font-medium">
                        <span>Inspect stage</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Stage Detailed Breakdown */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-charcoal border border-charcoal-border p-8 sm:p-12 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold text-copper">
                    STAGE {approachSteps[activeStep].step}
                  </span>
                  <span className="w-1.5 h-1.5 bg-steel" />
                  <span className="text-xs font-mono uppercase tracking-widest text-steel-light">
                    {approachSteps[activeStep].timing}
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white">
                  {approachSteps[activeStep].title}
                </h3>

                <p className="text-sm sm:text-base text-steel-light leading-relaxed font-body">
                  {approachSteps[activeStep].description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-2 space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-copper block font-semibold">
                    STAGE DELIVERABLES & TECHNICAL CONTROLS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {approachSteps[activeStep].deliverables.map((deliv, i) => (
                      <div
                        key={i}
                        className="p-3.5 bg-graphite border border-charcoal-border text-xs text-white flex items-start gap-2.5"
                      >
                        <CheckCircle className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                        <span className="leading-snug">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Operational Controls */}
              <div className="lg:col-span-4 lg:border-l lg:border-charcoal-border lg:pl-8 flex flex-col justify-between space-y-6">
                <div className="p-5 bg-graphite border border-charcoal-border text-xs text-steel space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <ShieldCheck className="w-4 h-4 text-copper" />
                    <span>Operational Oversight</span>
                  </div>
                  <p className="leading-relaxed">
                    Commercial contracting via Ghatkopar Commercial Office; shop cutting and staging
                    executed at the Kalamboli Warehousing Complex.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-3 text-xs font-heading font-medium tracking-wider uppercase border border-charcoal-border text-steel hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    Previous Stage
                  </button>
                  <button
                    disabled={activeStep === approachSteps.length - 1}
                    onClick={() =>
                      setActiveStep((prev) => Math.min(approachSteps.length - 1, prev + 1))
                    }
                    className="px-4 py-3 text-xs font-heading font-medium tracking-wider uppercase border border-copper bg-copper/10 text-copper hover:bg-copper hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    Next Stage
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Stage Selector */}
        <div className="mt-8 lg:hidden space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-steel block">
            SELECT WORKFLOW STAGE
          </span>
          <div className="grid grid-cols-4 gap-2">
            {approachSteps.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`py-3 text-xs font-mono font-bold border transition-colors ${
                  activeStep === idx
                    ? "bg-copper border-copper text-white"
                    : "bg-graphite border-charcoal-border text-steel"
                }`}
              >
                {s.step}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
