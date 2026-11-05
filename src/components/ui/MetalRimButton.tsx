"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface MetalRimButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  target?: string;
  rel?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function WhatsAppVectorIcon({ className = "w-5 h-5 text-[#25D366]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function MetalRimButton({
  href,
  onClick,
  target,
  rel,
  title = "Instant WhatsApp Quote",
  className = "",
  style,
  children,
  size = "md",
}: MetalRimButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const paddingClass =
    size === "sm"
      ? "px-4 py-2 gap-2"
      : size === "lg"
      ? "px-7 py-3.5 gap-3"
      : "px-6 py-2.5 sm:py-3 gap-2.5";

  const textClass =
    size === "sm"
      ? "text-xs"
      : size === "lg"
      ? "text-base"
      : "text-sm";

  const innerContent = (
    <motion.div
      className="relative rounded-full p-[2.5px] cursor-pointer select-none transition-transform"
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #34D399 0%, #25D366 25%, #059669 50%, #10B981 75%, #047857 100%)"
          : "linear-gradient(135deg, #25D366 0%, #10B981 25%, #059669 50%, #25D366 75%, #047857 100%)",
        boxShadow: isHovered
          ? "0px 0px 20px rgba(37, 211, 102, 0.55), 0px 10px 26px -4px rgba(0, 0, 0, 0.75)"
          : "0px 0px 10px rgba(37, 211, 102, 0.3), 0px 5px 14px -4px rgba(0, 0, 0, 0.6)",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Face Layer */}
      <div
        className={`relative flex items-center ${paddingClass} rounded-full overflow-hidden transition-colors`}
        style={{
          background: isHovered
            ? "linear-gradient(180deg, rgb(28, 38, 32) 0%, rgb(20, 28, 24) 55%, rgb(14, 18, 16) 100%)"
            : "linear-gradient(180deg, rgb(22, 30, 26) 0%, rgb(16, 22, 19) 55%, rgb(11, 14, 13) 100%)",
          boxShadow: isHovered
            ? "inset 0px 1px 1px 0px rgba(52, 211, 153, 0.35), inset 0px -2px 5px 0px rgba(0, 0, 0, 0.45), inset 0px 0px 0px 1px rgba(37, 211, 102, 0.25)"
            : "inset 0px 1px 1px 0px rgba(52, 211, 153, 0.2), inset 0px -2px 5px 0px rgba(0, 0, 0, 0.4), inset 0px 0px 0px 1px rgba(37, 211, 102, 0.15)",
        }}
      >
        {/* Animated Glint Sheen Track */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
          animate={{
            x: isHovered ? ["-100%", "200%"] : "-100%",
          }}
          transition={{
            duration: 0.75,
            ease: [0.35, 0, 0.15, 1],
          }}
          style={{ width: "80px", height: "100%" }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(37, 211, 102, 0) 0%, rgba(52, 211, 153, 0.3) 40%, rgba(255, 255, 255, 0.5) 55%, rgba(37, 211, 102, 0) 100%)",
              transform: "skewX(-20deg)",
            }}
          />
        </motion.div>

        {/* Rolling WhatsApp Icon Box */}
        <div className="relative w-5 h-5 overflow-hidden shrink-0 flex items-center justify-center">
          {/* Default Icon (slides up-right on hover) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              x: isHovered ? 20 : 0,
              y: isHovered ? -20 : 0,
            }}
            transition={{
              type: "spring",
              bounce: 0.15,
              duration: 0.45,
            }}
          >
            <WhatsAppVectorIcon className="w-5 h-5 text-[#25D366]" />
          </motion.div>

          {/* Next Icon (slides in from bottom-left on hover) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              x: isHovered ? 0 : -20,
              y: isHovered ? 0 : 20,
            }}
            transition={{
              type: "spring",
              bounce: 0.15,
              duration: 0.45,
            }}
          >
            <WhatsAppVectorIcon className="w-5 h-5 text-[#25D366]" />
          </motion.div>
        </div>

        {/* Button Label */}
        <span
          className={`font-heading font-semibold ${textClass} tracking-tight text-[#F2F2F4] whitespace-nowrap z-10`}
          style={{
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.7)",
          }}
        >
          {children || title}
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`inline-block no-underline ${className}`}
        style={style}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-block border-none bg-transparent p-0 ${className}`}
      style={style}
    >
      {innerContent}
    </button>
  );
}
