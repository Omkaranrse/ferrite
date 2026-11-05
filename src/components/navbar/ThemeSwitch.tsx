"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface ThemeSwitchProps {
  className?: string;
  darkBackgroundColor?: string;
  lightBackgroundColor?: string;
  moonIconColor?: string;
  sunIconColor?: string;
  scale?: number;
}

// Material Design Moon Icon (Brightness2 from Framer component)
function MoonIcon({ color = "#0F172A", className = "w-3.5 h-3.5" }: { color?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ color }}
      aria-hidden="true"
    >
      <path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z" />
    </svg>
  );
}

// Material Design Sun Icon (WbSunny from Framer component)
function SunIcon({ color = "#FF7A1A", className = "w-3.5 h-3.5" }: { color?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ color }}
      aria-hidden="true"
    >
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zm-9.95 2.25v2.95h2v-2.95h-2zm-7.45-3.9l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8zM12 5.5c-3.58 0-6.5 2.92-6.5 6.5s2.92 6.5 6.5 6.5 6.5-2.92 6.5-6.5-2.92-6.5-6.5-6.5zm0 11c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zM20 10.5v2h3v-2h-3z" />
    </svg>
  );
}

export default function ThemeSwitch({
  className = "",
  darkBackgroundColor = "rgb(26, 25, 25)",
  lightBackgroundColor = "rgba(255, 122, 26, 0.15)",
  moonIconColor = "#0F172A",
  sunIconColor = "#FF7A1A",
}: ThemeSwitchProps) {
  const { theme, toggleTheme, isMounted } = useTheme();

  // If not yet mounted on client, default visually to dark mode
  const isLight = isMounted && theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`relative inline-flex items-center shrink-0 cursor-pointer select-none rounded-full transition-colors duration-300 focus:outline-none ${className}`}
      style={{
        width: 60,
        height: 32,
        backgroundColor: isLight ? lightBackgroundColor : darkBackgroundColor,
        border: isLight
          ? "2px solid rgba(255, 122, 26, 0.55)"
          : "2px solid rgba(80, 80, 90, 0.5)",
        boxShadow: isLight
          ? "0 0 10px rgba(255, 122, 26, 0.2), inset 0 1px 2px rgba(0,0,0,0.06)"
          : "0 0 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.4)",
      }}
    >
      {/* Track Background Station Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        {/* Left station: Moon */}
        <motion.div
          animate={{
            opacity: isLight ? 0.45 : 0,
            scale: isLight ? 0.85 : 0.6,
          }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center w-4 h-4"
        >
          <MoonIcon color={moonIconColor} className="w-3.5 h-3.5" />
        </motion.div>

        {/* Right station: Sun */}
        <motion.div
          animate={{
            opacity: !isLight ? 0.45 : 0,
            scale: !isLight ? 0.85 : 0.6,
          }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center w-4 h-4"
        >
          <SunIcon color={sunIconColor} className="w-3.5 h-3.5" />
        </motion.div>
      </div>

      {/* Floating Sliding White Knob */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 32,
        }}
        animate={{
          x: isLight ? 30 : 2,
        }}
        className="relative z-10 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.35),0_0_2px_rgba(0,0,0,0.2)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <motion.div
              key="sun-active"
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <SunIcon color={sunIconColor} className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="moon-active"
              initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <MoonIcon color={moonIconColor} className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}

