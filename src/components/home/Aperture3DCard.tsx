"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Award, Users, ShieldCheck } from "lucide-react";

interface Aperture3DCardProps {
  tiltStrength?: number;
  perspectiveDistance?: number;
  translateAmount?: number;
  restoreDuration?: number;
  trackingSmoothing?: number;
}

export default function Aperture3DCard({
  tiltStrength = 14,
  perspectiveDistance = 1200,
  translateAmount = 40,
  restoreDuration = 500,
  trackingSmoothing = 140,
}: Aperture3DCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Framer-motion values for 3D rotation & glare tracking
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  // Specular sheen / glare gradient that follows cursor
  const glareBackground = useTransform(
    [pointerX, pointerY],
    ([px, py]) =>
      `radial-gradient(circle 380px at ${(Number(px) * 100).toFixed(1)}% ${(
        Number(py) * 100
      ).toFixed(
        1
      )}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 80%)`
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const px = x - 0.5; // -0.5 to 0.5
    const py = y - 0.5; // -0.5 to 0.5

    pointerX.set(x);
    pointerY.set(y);

    animate(rotateY, px * 2 * tiltStrength, {
      duration: trackingSmoothing / 1000,
      ease: "easeOut",
    });
    animate(rotateX, -py * 2 * tiltStrength, {
      duration: trackingSmoothing / 1000,
      ease: "easeOut",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    animate(rotateX, 0, {
      duration: restoreDuration / 1000,
      ease: "easeOut",
    });
    animate(rotateY, 0, {
      duration: restoreDuration / 1000,
      ease: "easeOut",
    });
    animate(pointerX, 0.5, {
      duration: restoreDuration / 1000,
      ease: "easeOut",
    });
    animate(pointerY, 0.5, {
      duration: restoreDuration / 1000,
      ease: "easeOut",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full select-none cursor-pointer"
      style={{
        perspective: perspectiveDistance,
      }}
    >
      {/* 3D Motion Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full rounded-3xl group"
      >
        {/* Animated Molten Fire / Glowing Border */}
        <div className="absolute -inset-[2px] rounded-3xl fire-border-glow overflow-hidden pointer-events-none">
          <div className="fire-border-rotate absolute inset-0" />
        </div>

        {/* Ambient Ember Glow Behind Card */}
        <div className="absolute -inset-4 rounded-3xl bg-copper/[0.12] blur-2xl pointer-events-none animate-ember z-0" />

        {/* Inner Card Body with 3D Depth */}
        <div
          className="relative w-full rounded-3xl overflow-hidden bg-[#0D1115] z-[1] border border-copper/30"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main Visual: Ferrite Commercial Facility Image */}
          <motion.div
            animate={{
              z: isHovered ? translateAmount * 0.4 : 0.01,
              scale: isHovered ? 1.03 : 1,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative aspect-[16/11] sm:aspect-[16/10.5] w-full overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src="/images/ferrite-building.jpg"
              alt="Ferrite Structural Steels Commercial Headquarters & Facility"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {/* Subtle Gradient Scrim at bottom to integrate stats bar */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
          </motion.div>

          {/* Interactive Specular Glare / Sheen Layer */}
          <motion.div
            style={{
              background: glareBackground,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 pointer-events-none z-10 transition-opacity"
          />

          {/* Combined Floating Stats Overlay — Anchored at Bottom Inside Card */}
          <motion.div
            animate={{
              z: isHovered ? translateAmount * 1.2 : 12,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 z-20"
          >
            <div className="bg-[#0B0F13]/95 border border-white/10 rounded-2xl sm:rounded-[20px] p-3.5 sm:p-4 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.95),_0_0_24px_rgba(200,121,64,0.15)]">
              {/* Subtle copper top accent glow line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-copper/60 to-transparent" />

              <div className="grid grid-cols-3 divide-x divide-white/10 items-center">
                {/* Stat 1: 59+ Experience */}
                <motion.div
                  animate={{ z: isHovered ? translateAmount * 0.4 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2.5 sm:gap-3 pr-2"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center text-copper shrink-0">
                    <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <div className="font-heading text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight leading-tight">
                      59+
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] font-medium leading-tight whitespace-nowrap">
                      Years of Experience
                    </div>
                  </div>
                </motion.div>

                {/* Stat 2: 1000+ Clients */}
                <motion.div
                  animate={{ z: isHovered ? translateAmount * 0.4 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-3"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center text-copper shrink-0">
                    <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <div className="font-heading text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight leading-tight">
                      1000+
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] font-medium leading-tight whitespace-nowrap">
                      Happy Clients
                    </div>
                  </div>
                </motion.div>

                {/* Stat 3: Quality Standards */}
                <motion.div
                  animate={{ z: isHovered ? translateAmount * 0.4 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center text-copper shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <div className="font-heading text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight leading-tight">
                      Quality
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] font-medium leading-tight whitespace-nowrap">
                      IS, ASTM &amp; EN
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
