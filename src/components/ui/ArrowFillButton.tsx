"use client";

import React, { useRef, useState } from "react";

interface ArrowFillButtonProps {
  btnText?: string;
  href?: string;
  newTab?: boolean;
  bgColor?: string;
  textColor?: string;
  fillBgColor?: string;
  fillTextColor?: string;
  hoverFillBgColor?: string;
  hoverFillTextColor?: string;
  arrowColor?: string;
  hoverArrowColor?: string;
  animationDuration?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function ArrowFillButton({
  btnText = "REQUEST A QUOTE",
  href = "#",
  newTab = false,
  bgColor = "#FF7A1A",
  textColor = "#ffffff",
  fillBgColor = "#ffffff",
  fillTextColor = "#FF7A1A",
  hoverFillBgColor = "#ffffff",
  hoverFillTextColor = "#FF7A1A",
  arrowColor,
  hoverArrowColor,
  animationDuration = 450,
  className = "",
  style,
  onClick,
}: ArrowFillButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const releaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearPressedState = () => {
    if (releaseTimeoutRef.current) {
      clearTimeout(releaseTimeoutRef.current);
    }
    releaseTimeoutRef.current = setTimeout(() => {
      setIsPressed(false);
      releaseTimeoutRef.current = null;
    }, animationDuration);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "mouse") return;
    if (releaseTimeoutRef.current) {
      clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }
    setIsPressed(true);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "mouse") return;
    clearPressedState();
  };

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      data-pressed={isPressed ? "true" : "false"}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={clearPressedState}
      onClick={onClick}
      className={`hpx-afb ${className}`}
      style={{
        ...style,
        ["--btn-bg" as string]: bgColor,
        ["--btn-text" as string]: textColor,
        ["--btn-fill-bg" as string]: fillBgColor,
        ["--btn-fill-text" as string]: fillTextColor,
        ["--btn-fill-bg-hover" as string]: hoverFillBgColor,
        ["--btn-fill-text-hover" as string]: hoverFillTextColor,
        ["--btn-arrow" as string]: arrowColor || fillTextColor,
        ["--btn-arrow-hover" as string]: hoverArrowColor || hoverFillTextColor,
        ["--btn-duration" as string]: `${animationDuration}ms`,
      }}
    >
      {/* Base Label (visible before hover) */}
      <span className="hpx-afb__label">{btnText}</span>

      {/* Expanding Circle Background */}
      <div aria-hidden="true" className="hpx-afb__circle" />

      {/* Mask Layer (reveals inverted color during fill) */}
      <div aria-hidden="true" className="hpx-afb__mask">
        <span className="hpx-afb__mask-label">{btnText}</span>
      </div>

      {/* Animated Arrow Icon with Swap */}
      <span aria-hidden="true" className="hpx-afb__icon">
        <ArrowRightIcon className="hpx-afb__icon-svg hpx-afb__icon-svg--enter" />
        <ArrowRightIcon className="hpx-afb__icon-svg hpx-afb__icon-svg--exit" />
      </span>
    </a>
  );
}
