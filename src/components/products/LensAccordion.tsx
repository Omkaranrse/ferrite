"use client";

import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, CheckCircle2, X, ShieldCheck, ChevronRight, GripVertical } from "lucide-react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import MetalRimButton from "@/components/ui/MetalRimButton";

export interface LensAccordionItem {
  id?: string;
  title: string;
  tag: string;
  year?: string;
  image: {
    src: string;
    srcSet?: string;
    alt?: string;
  };
  excerpt?: string;
  body?: string;
  link?: string;
  profiles?: string[];
  standards?: string[];
  sizeRange?: string;
  keyFeatures?: string[];
  applications?: string[];
  finishOptions?: string[];
}

export interface LensAccordionProps {
  items?: LensAccordionItem[];
  startIndex?: number;
  trigger?: "hover" | "click";
  autoplay?: number;
  direction?: "auto" | "row" | "column";
  openSize?: number;
  curve?: number;
  gap?: number;
  radius?: number;
  dim?: number;
  showCaption?: boolean;
  showYear?: boolean;
  background?: string;
  textColor?: string;
  accent?: string;
  duration?: number;
  ripple?: number;
  popup?: boolean;
  reorder?: boolean;
  linkLabel?: string;
  panel?: string;
  backdrop?: string;
  font?: React.CSSProperties;
  className?: string;
  onSelectProduct?: (item: LensAccordionItem) => void;
  onOpenRFQ?: (productName: string) => void;
}

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const MORPH_EASE = "cubic-bezier(0.87, 0, 0.13, 1)";
const MORPH_MS = 750;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface OriginRect {
  cx: number;
  cy: number;
  w: number;
  h: number;
  angle: number;
  radius: number;
  heroRatio?: number;
  el?: HTMLElement | null;
}

interface ArticleProps {
  item: LensAccordionItem;
  pic?: { src: string; srcSet?: string; alt?: string };
  origin?: OriginRect;
  onClose: () => void;
  linkLabel: string;
  panel: string;
  textColor: string;
  accent: string;
  backdrop: string;
  radius: number;
  font?: React.CSSProperties;
  onOpenRFQ?: (productName: string) => void;
}

function Article({
  item,
  pic,
  origin,
  onClose,
  linkLabel,
  panel,
  textColor,
  accent,
  backdrop,
  radius,
  font,
  onOpenRFQ,
}: ArticleProps) {
  const isLight = textColor === "#0F172A" || textColor.toLowerCase() === "#0f172a";
  const dialogRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closing = useRef(false);

  const reduce = () =>
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const morph = useCallback(
    (open: boolean, animDuration: number) => {
      const a = panelRef.current;
      if (!a || !origin || typeof a.animate !== "function") return null;
      const F = a.getBoundingClientRect();
      const s = origin.w / F.width;
      const visible = Math.min(F.height, origin.h / s);
      const ox = F.width / 2;
      const oy = visible / 2;
      a.style.transformOrigin = `${ox}px ${oy}px`;

      const card = {
        transform: `translate(${origin.cx - (F.left + ox)}px, ${
          origin.cy - (F.top + oy)
        }px) rotate(${origin.angle}rad) scale(${s})`,
        clipPath: `inset(0px 0px ${F.height - visible}px 0px round ${radius}px)`,
      };
      const full = {
        transform: "translate(0px, 0px) rotate(0rad) scale(1)",
        clipPath: `inset(0px 0px 0px 0px round ${radius}px)`,
      };

      return a.animate(open ? [card, full] : [full, card], {
        duration: animDuration,
        easing: MORPH_EASE,
        fill: "both",
      });
    },
    [origin, radius]
  );

  const fadeBackdrop = useCallback(
    (open: boolean, animDuration: number) => {
      if (!dialogRef.current || typeof dialogRef.current.animate !== "function") return;
      const clear = { background: "rgba(0,0,0,0)", backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" };
      const dim = { background: backdrop, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" };
      dialogRef.current.animate(open ? [clear, dim] : [dim, clear], {
        duration: animDuration,
        easing: "ease",
        fill: "both",
      });
    },
    [backdrop]
  );

  const handleClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const d = reduce() ? 0 : MORPH_MS;
    const a = panelRef.current;
    if (a) a.scrollTop = 0;
    fadeBackdrop(false, d);
    const anim = morph(false, d);
    const el = origin?.el;

    const done = () => {
      if (el) {
        if (typeof el.getAnimations === "function") {
          el.getAnimations().forEach((x) => x.cancel());
        }
        el.style.opacity = "";
      }
      onClose();
    };

    if (anim) {
      const fade: KeyframeAnimationOptions = { duration: d, easing: "linear", fill: "forwards" };
      a?.animate?.([{ opacity: 1 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }], fade);
      if (el && typeof el.animate === "function") {
        if (typeof el.getAnimations === "function") {
          el.getAnimations().forEach((x) => x.cancel());
        }
        el.animate([{ opacity: 0 }, { opacity: 0, offset: 0.75 }, { opacity: 1 }], fade);
      }
      anim.onfinish = done;
    } else {
      a?.animate?.([{ opacity: 1 }, { opacity: 0 }], { duration: d * 0.4, fill: "forwards" });
      window.setTimeout(done, d * 0.4);
    }
  }, [fadeBackdrop, morph, onClose, origin]);

  useIsomorphicLayoutEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });
    const d = reduce() ? 0 : MORPH_MS;
    fadeBackdrop(true, d * 0.7);
    const anim = morph(true, d);

    panelRef.current?.animate?.([{ opacity: 0 }, { opacity: 1 }], {
      duration: anim ? d * 0.25 : d * 0.5,
      fill: "both",
    });

    const el = origin?.el;
    if (el && typeof el.animate === "function") {
      const elAnim = el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: d * 0.25,
        fill: "forwards",
      });
      elAnim.onfinish = () => {
        el.style.opacity = "0";
      };
    }
  }, [fadeBackdrop, morph, origin]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (origin?.el) origin.el.style.opacity = "";
    };
  }, [handleClose, origin]);

  const paragraphs = (item.body || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      tabIndex={-1}
      onPointerDown={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) handleClose();
      }}
      onPointerMove={stop}
      onPointerUp={stop}
      onClick={stop}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Escape") handleClose();
      }}
      onWheel={stop}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3vh 16px",
        boxSizing: "border-box",
        background: backdrop,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        outline: "none",
        fontFamily: "'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif",
        ...font,
      }}
    >
      <article
        ref={panelRef}
        data-lenis-prevent="true"
        style={{
          position: "relative",
          width: "min(900px, 100%)",
          maxHeight: "92vh",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          touchAction: "pan-y",
          background: panel,
          color: textColor,
          borderRadius: `${radius}px`,
          border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: isLight ? "0 25px 70px rgba(15,23,42,0.18)" : "0 40px 120px rgba(0,0,0,0.85)",
        }}
      >
        <style>{`
          .article-close:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
        `}</style>

        {/* Sticky Close Button */}
        <button
          type="button"
          className="article-close"
          aria-label="Close"
          onClick={handleClose}
          style={{
            position: "sticky",
            top: 16,
            float: "right",
            marginRight: 16,
            marginBottom: -56,
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: isLight ? "1px solid #CBD5E1" : "1px solid rgba(255, 255, 255, 0.2)",
            background: isLight ? "#F1F5F9" : "rgba(17, 22, 25, 0.85)",
            color: textColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "all 0.2s ease",
          }}
        >
          <X className={`w-5 h-5 hover:scale-110 transition-transform ${isLight ? "text-slate-800" : "text-white"}`} />
        </button>

        {/* Hero Image */}
        {pic && (
          <div style={{ position: "relative", width: "100%", height: "280px", overflow: "hidden", background: "#0D0E10" }}>
            <img
              src={pic.src}
              srcSet={pic.srcSet}
              alt={pic.alt || item.title}
              sizes="(max-width: 900px) 100vw, 900px"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                fontSize: 0,
                color: "transparent",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(23, 25, 27, 1) 0%, rgba(23, 25, 27, 0.3) 40%, transparent 100%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 20, left: "clamp(20px, 4vw, 36px)", zIndex: 2 }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  fontSize: 11,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  background: "rgba(200, 121, 64, 0.25)",
                  border: "1px solid rgba(200, 121, 64, 0.5)",
                  color: "#F28A35",
                  fontWeight: 600,
                  borderRadius: "4px",
                }}
              >
                {item.tag}
              </span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div style={{ padding: "clamp(24px, 4vw, 36px)", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Metadata Badges */}
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {item.standards && item.standards[0] && (
              <span className="font-mono text-[11px] text-[#A9AFB2]">
                Standard: <strong className="text-white">{item.standards[0]}</strong>
              </span>
            )}
            {item.sizeRange && (
              <span className="font-mono text-[11px] text-[#A9AFB2]">
                Scope: <strong className="text-white">{item.sizeRange.split(" ")[0]}</strong>
              </span>
            )}
            <span className="flex items-center gap-1 text-[11px] font-mono text-[#F28A35]">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Mill Test Certified
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                color: "#FFFFFF",
                wordBreak: "break-word",
              }}
            >
              {item.title}
            </h2>
            {item.excerpt && (
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(15px, 1.6vw, 17px)",
                  lineHeight: 1.5,
                  color: "#F28A35",
                  fontWeight: 500,
                }}
              >
                {item.excerpt}
              </p>
            )}
          </div>

          {/* Paragraphs */}
          {paragraphs.length > 0 && (
            <div
              style={{
                borderTop: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: 18,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                color: "#A9AFB2",
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              {paragraphs.map((p, i) => (
                <p key={i} style={{ margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* Steel Technical Scope Blocks */}
          {(item.profiles || item.standards) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {item.profiles && (
                <div
                  style={{
                    background: isLight ? "#F8FAFC" : "#111619",
                    padding: 16,
                    border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: accent,
                      display: "block",
                      marginBottom: 10,
                      fontWeight: 700,
                    }}
                  >
                    AVAILABLE PROFILES & SECTIONS
                  </span>
                  <ul className={`space-y-1.5 text-xs ${isLight ? "text-slate-700" : "text-[#D8DCDE]"}`}>
                    {item.profiles.slice(0, 5).map((pr, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#C87940] shrink-0" />
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.standards && (
                <div
                  style={{
                    background: isLight ? "#F8FAFC" : "#111619",
                    padding: 16,
                    border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: accent,
                      display: "block",
                      marginBottom: 10,
                      fontWeight: 700,
                    }}
                  >
                    GOVERNING STANDARDS & GRADES
                  </span>
                  <ul className={`space-y-1.5 text-xs font-mono ${isLight ? "text-slate-700" : "text-[#D8DCDE]"}`}>
                    {item.standards.map((st, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C87940] shrink-0" />
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Size Range & Finish Options */}
          {(item.sizeRange || item.finishOptions) && (
            <div
              style={{
                background: isLight ? "#F8FAFC" : "rgba(17, 22, 25, 0.6)",
                padding: 16,
                border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
                fontSize: 12,
              }}
              className="space-y-3"
            >
              {item.sizeRange && (
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                  <span className="text-[#858B90] font-medium">Dimensional Range:</span>
                  <span className={`font-mono ${isLight ? "text-slate-900" : "text-white"}`}>{item.sizeRange}</span>
                </div>
              )}
              {item.finishOptions && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#858B90] block mb-2 font-medium">
                    Surface Finishes Available:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.finishOptions.map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#17191B] border border-white/10 text-[11px] text-[#A9AFB2] rounded"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Row */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: 20,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div className="flex items-center gap-3">
              <MetalRimButton
                href={FERRITE_CONTACT.getProductWhatsAppUrl(item.title)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent({
                    name: "product_enquiry_click",
                    params: { product_name: item.title, category: item.tag },
                  });
                }}
                title="Instant WhatsApp Quote"
              />
            </div>
          </div>
        </div>
      </article>
    </div>,
    document.body
  );
}

export default function LensAccordion({
  items: rawItems = [],
  startIndex = 1,
  trigger = "hover",
  autoplay = 0,
  direction = "auto",
  openSize = 6.5,
  curve = 0,
  gap = 8,
  radius = 12,
  dim = 40,
  showCaption = true,
  showYear = true,
  background = "transparent",
  textColor = "#F5F3EF",
  accent = "#C87940",
  duration = 800,
  ripple = 35,
  popup = true,
  reorder = false,
  linkLabel = "Request Quotation",
  panel = "#17191B",
  backdrop = "rgba(10, 14, 17, 0.85)",
  font,
  className = "",
  onSelectProduct,
  onOpenRFQ,
}: LensAccordionProps) {
  const [mounted, setMounted] = useState(false);
  const items = rawItems;

  const [openItem, setOpenItem] = useState<number | null>(null);
  const [origin, setOrigin] = useState<OriginRect | undefined>(undefined);

  const clampIndex = useCallback(
    (i: number) => Math.min(Math.max(0, items.length - 1), Math.max(0, i)),
    [items.length]
  );

  const [active, setActive] = useState<number>(() => clampIndex(startIndex - 1));
  const [hovering, setHovering] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActive(clampIndex(startIndex - 1));
  }, [startIndex, clampIndex]);

  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));

  useEffect(() => {
    setOrder(items.map((_, i) => i));
  }, [items.length]);

  const ord = order.length === items.length ? order : items.map((_, i) => i);
  const stripRefs = useRef<Record<number, HTMLElement | null>>({});
  const drag = useRef<{
    pos: number;
    idx: number;
    x: number;
    y: number;
    moved: boolean;
    target: number | null;
  } | null>(null);
  const suppressClick = useRef(false);
  const prevRects = useRef<Record<number, DOMRect> | null>(null);
  const [flip, setFlip] = useState(0);

  // FLIP animation: strips slide smoothly after drop
  useIsomorphicLayoutEffect(() => {
    const before = prevRects.current;
    if (!before) return;
    prevRects.current = null;
    for (const key of Object.keys(before)) {
      const numKey = Number(key);
      const el = stripRefs.current[numKey];
      const old = before[numKey];
      if (!el || !old || typeof el.animate !== "function") continue;
      const now = el.getBoundingClientRect();
      const dx = old.left - now.left;
      const dy = old.top - now.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)` },
          { transform: "none" },
        ],
        { duration: 500, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
      );
    }
  }, [flip]);

  const onRootPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const el = stripRefs.current[d.idx];
    if (!el) return;

    if (!d.moved) {
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6) return;
      d.moved = true;
      try {
        rootRef.current?.setPointerCapture(e.pointerId);
      } catch {
        // pointer capture fallback
      }
      el.style.pointerEvents = "none";
      el.style.zIndex = "10";
      el.style.boxShadow = "0 24px 50px rgba(0,0,0,0.6)";
    }

    el.style.transform = `translate(${e.clientX - d.x}px, ${
      e.clientY - d.y
    }px) scale(0.97)`;
    const under = document
      .elementFromPoint(e.clientX, e.clientY)
      ?.closest("[data-pos]");
    d.target =
      under && rootRef.current?.contains(under)
        ? Number((under as HTMLElement).dataset.pos)
        : null;
  };

  const onRootPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved) return;

    try {
      if (rootRef.current?.hasPointerCapture(e.pointerId)) {
        rootRef.current.releasePointerCapture(e.pointerId);
      }
    } catch {
      // release pointer capture fallback
    }

    suppressClick.current = true;
    const rects: Record<number, DOMRect> = {};
    for (const idx of ord) {
      const el = stripRefs.current[idx];
      if (el) rects[idx] = el.getBoundingClientRect();
    }

    const el = stripRefs.current[d.idx];
    if (el) {
      el.style.transform = "";
      el.style.pointerEvents = "";
      el.style.zIndex = "";
      el.style.boxShadow = "";
    }

    prevRects.current = rects;
    const t = d.target;
    if (t !== null && t !== d.pos) {
      setOrder(() => {
        const next = ord.slice();
        [next[d.pos], next[t]] = [next[t], next[d.pos]];
        return next;
      });
      setActive(t);
    }
    setFlip((f) => f + 1);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => setNarrow(root.clientWidth < 640));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || hovering || items.length <= 1) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % items.length),
      autoplay * 1000
    );
    return () => window.clearInterval(id);
  }, [autoplay, hovering, items.length]);

  const column = direction === "column" || (direction === "auto" && narrow);

  // Clean, straight rectangular corners with consistent radius (NO CURVED LENS DISTORTION)
  const cardRadius = `${radius}px`;

  return (
    <div
      ref={rootRef}
      role="tablist"
      aria-orientation={column ? "vertical" : "horizontal"}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onPointerMove={onRootPointerMove}
      onPointerUp={onRootPointerUp}
      onPointerCancel={onRootPointerUp}
      className={`relative select-none ${className}`}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: column ? "column" : "row",
        gap: `${gap}px`,
        background,
        boxSizing: "border-box",
        ...font,
      }}
    >
      <style>{`
        .lens-strip {
          transition-property: flex-grow;
          transition-timing-function: ${EASE};
        }
        .lens-strip img {
          transition: transform ${duration}ms ${EASE}, filter ${duration}ms ${EASE};
        }
        .lens-cap {
          transition: opacity ${duration * 0.4}ms ease, transform ${duration * 0.5}ms ${EASE};
        }
        .lens-strip:focus-visible {
          outline: 2px solid ${accent};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .lens-strip, .lens-strip img, .lens-cap {
            transition-duration: 0ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>

      {ord.map((idx, i) => {
        const item = items[idx];
        if (!item) return null;
        const open = i === active;
        const pic = item.image;
        const distance = Math.abs(i - active);

        return (
          <button
            key={item.id || idx}
            ref={(el) => {
              stripRefs.current[idx] = el;
            }}
            data-pos={i}
            type="button"
            className="lens-strip group"
            role="tab"
            aria-selected={open}
            aria-label={popup && open ? `Read ${item.title}` : item.title}
            onPointerEnter={(e) => {
              if (trigger === "hover" && e.pointerType === "mouse" && !drag.current?.moved) {
                setActive(i);
                onSelectProduct?.(item);
              }
            }}
            onPointerDown={(e) => {
              if (reorder && e.button === 0) {
                drag.current = {
                  pos: i,
                  idx,
                  x: e.clientX,
                  y: e.clientY,
                  moved: false,
                  target: null,
                };
              }
            }}
            onFocus={() => {
              setActive(i);
              onSelectProduct?.(item);
            }}
            onClick={(e) => {
              if (suppressClick.current) {
                suppressClick.current = false;
                return;
              }
              if (popup && (open || trigger === "hover")) {
                const r = e.currentTarget.getBoundingClientRect();
                setOrigin({
                  cx: r.left + r.width / 2,
                  cy: r.top + r.height / 2,
                  w: r.width,
                  h: r.height,
                  angle: 0,
                  radius,
                  el: e.currentTarget,
                });
                setOpenItem(idx);
              }
              setActive(i);
              onSelectProduct?.(item);
            }}
            style={{
              position: "relative",
              flexGrow: open ? openSize : 1,
              flexShrink: 1,
              flexBasis: 0,
              minWidth: 0,
              minHeight: 0,
              padding: 0,
              margin: 0,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              overflow: "hidden",
              cursor: popup && open ? "zoom-in" : "pointer",
              background: "#17191B",
              borderRadius: cardRadius,
              transitionDuration: mounted ? `${duration}ms` : "0ms",
              transitionDelay: mounted ? `${distance * ripple}ms` : "0ms",
              color: textColor,
              textAlign: "left",
              textDecoration: "none",
              font: "inherit",
              WebkitTapHighlightColor: "transparent",
              touchAction: column ? "pan-x" : "pan-y",
              userSelect: "none",
            }}
          >
            {/* Background image */}
            {pic && (
              <img
                src={pic.src}
                srcSet={pic.srcSet}
                alt=""
                draggable={false}
                sizes="(max-width: 640px) 100vw, 70vw"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: open ? "scale(1)" : "scale(1.15)",
                  filter: open ? "none" : `brightness(${1 - dim / 100}) saturate(0.85)`,
                  pointerEvents: "none",
                  fontSize: 0,
                  color: "transparent",
                }}
              />
            )}

            {/* Gradient Overlays for perfect legibility */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: open
                  ? "linear-gradient(to top, rgba(13, 14, 16, 0.95) 0%, rgba(13, 14, 16, 0.45) 45%, rgba(13, 14, 16, 0.15) 100%)"
                  : "linear-gradient(to top, rgba(13, 14, 16, 0.9) 0%, rgba(13, 14, 16, 0.4) 50%, transparent 80%)",
                pointerEvents: "none",
              }}
            />

            {/* Active Strip Caption: Title + Tag + Year (Never clipped) */}
            {showCaption && (
              <div
                className="lens-cap"
                aria-hidden={!open}
                style={{
                  position: "absolute",
                  left: 20,
                  bottom: 20,
                  right: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(12px)",
                  transitionDelay: mounted ? (open ? `${duration * 0.4}ms` : "0ms") : "0ms",
                  pointerEvents: "none",
                  textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.9)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(1.25rem, 2vw, 1.85rem)",
                    lineHeight: 1.15,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                    wordBreak: "break-word",
                  }}
                >
                  {item.title}
                </span>

                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span
                    style={{
                      color: accent,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.tag}
                  </span>
                  {showYear && item.year && (
                    <span className="text-[#A9AFB2] font-mono text-[11px]">
                      · {item.year}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Inactive vertical text indicator on collapsed desktop strips */}
            {!open && !column && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: 22,
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontSize: 11,
                    fontFamily: "monospace",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.75)",
                    textShadow: "0 2px 4px rgba(0,0,0,0.95)",
                    whiteSpace: "nowrap",
                    maxHeight: "180px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </span>
              </div>
            )}

            {/* Inactive horizontal title on collapsed mobile strips */}
            {!open && column && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 18,
                  paddingRight: 18,
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    textShadow: "0 1px 3px rgba(0,0,0,0.9)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </span>
              </div>
            )}
          </button>
        );
      })}

      {/* Morphing Modal Dialog */}
      {popup && openItem !== null && items[openItem] && mounted && (
        <Article
          item={items[openItem]}
          pic={items[openItem].image}
          origin={origin}
          onClose={() => setOpenItem(null)}
          linkLabel={linkLabel}
          panel={panel}
          textColor={textColor}
          accent={accent}
          backdrop={backdrop}
          radius={radius}
          font={font}
          onOpenRFQ={onOpenRFQ}
        />
      )}
    </div>
  );
}
