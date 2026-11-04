"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollTextRevealProps {
  children: string;
  className?: string;
  highlightWords?: string[];
}

export default function ScrollTextReveal({
  children,
  className,
  highlightWords = [],
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const words = children.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 40%"],
  });

  return (
    <h2
      ref={containerRef}
      className={cn("flex flex-wrap gap-x-[0.28em] gap-y-1 font-heading", className)}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const isHighlight = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            isHighlight={isHighlight}
          />
        );
      })}
    </h2>
  );
}

function Word({
  word,
  progress,
  range,
  isHighlight,
}: {
  word: string;
  progress: any;
  range: [number, number];
  isHighlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={cn(
        "inline-block transition-colors duration-200",
        isHighlight ? "text-copper" : "text-white"
      )}
    >
      {word}
    </motion.span>
  );
}
