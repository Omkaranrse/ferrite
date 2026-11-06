"use client";

import React, { useEffect, useRef } from "react";
import "./WeldButton.css";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  max: number;
  w: number;
  pop: boolean;
  bounced: number;
}

interface WeldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: number; // button diameter in px
  torches?: number; // weld points around the ring
  bounce?: boolean; // sparks bounce off the bottom edge
  isOpen?: boolean; // whether modal/chat is open
  className?: string;
}

export default function WeldButton({
  children,
  onClick,
  size = 56,
  torches = 6,
  bounce = true,
  isOpen = false,
  className = "",
  ...rest
}: WeldButtonProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // When open, don't run particle animation to keep UI calm and performance 100%
    if (isOpen) {
      const cv = canvasRef.current;
      if (cv) {
        const ctx = cv.getContext("2d");
        ctx?.clearRect(0, 0, cv.width, cv.height);
      }
      return;
    }

    const stage = stageRef.current;
    const cv = canvasRef.current;
    const btn = btnRef.current;
    if (!stage || !cv || !btn) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const R = size / 2 + 4;
    let W = 0;
    let H = 0;
    let ta = -Math.PI / 2;
    let intensity = 1;
    let target = 1;
    let raf = 0;
    let last = performance.now();
    const sparks: Spark[] = [];

    const resize = () => {
      const r = cv.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const emit = (big: boolean) => {
      const ang = ta + (Math.floor(Math.random() * torches) * (Math.PI * 2)) / torches;
      const x = W / 2 + Math.cos(ang) * R;
      const y = H / 2 + Math.sin(ang) * R;
      const a = ang + (Math.random() - 0.5) * 2.2;
      const sp = (big ? 3 : 1.5) + Math.random() * (big ? 7 : 5.5);
      sparks.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - Math.random() * 1.2,
        age: 0,
        max: 40 + Math.random() * 55,
        w: 0.7 + Math.random() * 1.3,
        pop: Math.random() < 0.18,
        bounced: 0,
      });
    };

    const child = (p: Spark) => {
      for (let i = 0; i < 4; i++) {
        const a = Math.random() * 6.283;
        const s = 0.8 + Math.random() * 2.2;
        sparks.push({
          x: p.x,
          y: p.y,
          vx: p.vx * 0.4 + Math.cos(a) * s,
          vy: p.vy * 0.4 + Math.sin(a) * s,
          age: 0,
          max: 18 + Math.random() * 20,
          w: 0.6,
          pop: false,
          bounced: 1,
        });
      }
    };

    // white-hot -> yellow -> orange -> red
    const col = (t: number) => {
      const g = t < 0.25 ? 255 : (255 - (t - 0.25) * 330) | 0;
      const b = t < 0.2 ? (235 - t * 900) | 0 : Math.max(0, 60 - t * 80) | 0;
      return `rgba(255,${Math.max(40, g)},${Math.max(0, b)},${1 - t * t})`;
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      intensity += (target - intensity) * 0.08 * dt;
      ta += (0.016 + 0.01 * intensity) * dt;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (let k = 0; k < torches; k++) {
        const ang = ta + (k * Math.PI * 2) / torches;
        const tx = W / 2 + Math.cos(ang) * R;
        const ty = H / 2 + Math.sin(ang) * R;
        const fr = (22 + 6 * intensity) * (0.75 + Math.random() * 0.5);
        const g = ctx.createRadialGradient(tx, ty, 0, tx, ty, fr);
        g.addColorStop(0, "rgba(255,255,255,.95)");
        g.addColorStop(0.12, "rgba(200,225,255,.7)");
        g.addColorStop(0.35, "rgba(255,170,60,.28)");
        g.addColorStop(1, "rgba(255,90,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(tx, ty, fr, 0, 6.283);
        ctx.fill();
      }

      const n = (reduce ? 1 : 6) * intensity * dt;
      for (let i = 0; i < n; i++) if (sparks.length < 800) emit(false);

      ctx.lineCap = "round";
      const floor = H - 8;
      for (let j = sparks.length - 1; j >= 0; j--) {
        const p = sparks[j];
        p.age += dt;
        if (p.age >= p.max) {
          if (p.pop) child(p);
          sparks.splice(j, 1);
          continue;
        }
        const px = p.x;
        const py = p.y;
        p.vy += 0.13 * dt;
        p.vx *= Math.pow(0.985, dt);
        p.vy *= Math.pow(0.992, dt);
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (bounce && p.y > floor && p.bounced < 2) {
          p.y = floor;
          p.vy *= -0.42;
          p.vx *= 0.75;
          p.bounced++;
        }
        const t = p.age / p.max;
        ctx.strokeStyle = col(t);
        ctx.lineWidth = p.w * (1 - t * 0.5);
        ctx.beginPath();
        ctx.moveTo(px - p.vx * 0.8, py - p.vy * 0.8);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };

    const over = () => (target = 2.4);
    const out = () => (target = 1);
    const burst = () => {
      if (!reduce) for (let i = 0; i < 75; i++) emit(true);
    };

    resize();
    window.addEventListener("resize", resize);
    btn.addEventListener("pointerenter", over);
    btn.addEventListener("pointerleave", out);
    btn.addEventListener("focus", over);
    btn.addEventListener("blur", out);
    btn.addEventListener("pointerdown", burst);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      btn.removeEventListener("pointerenter", over);
      btn.removeEventListener("pointerleave", out);
      btn.removeEventListener("focus", over);
      btn.removeEventListener("blur", out);
      btn.removeEventListener("pointerdown", burst);
    };
  }, [size, torches, bounce, isOpen]);

  return (
    <div
      className="weld-stage"
      ref={stageRef}
      style={{
        // @ts-ignore CSS variable
        "--size": `${size}px`,
      }}
    >
      <canvas className="weld-fx" ref={canvasRef} />
      <button
        ref={btnRef}
        className={`weld-btn ${isOpen ? "is-open" : ""} ${className}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
}
