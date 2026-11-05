"use client";

import React, { useRef, useEffect, useCallback } from "react";

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uHover;
uniform float uClick;
uniform vec3 uBaseColor;
uniform vec3 uGlassColor;
uniform vec2 uResolution;

// Hash function for pseudo-randomness
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Simplex-style noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Fractal Brownian Motion for liquid distortion
float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    for(int i = 0; i < 4; i++) {
        f += amp * noise(p);
        p *= 2.0;
        amp *= 0.5;
    }
    return f;
}

void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= aspect;

    vec2 center = vec2(0.5);
    vec2 dirToCenter = normalize(vUv - center + vec2(0.0001));
    float distToCenter = length(vUv - center);

    float r = 1.0; 
    vec2 b = vec2(max(aspect - 1.0, 0.0), 0.0);
    vec2 d = abs(p) - b;
    float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
    
    float innerDist = clamp(abs(dist), 0.0, 1.0);
    float t = uTime;
    
    vec2 noiseUv = vUv * vec2(2.0, 1.0); 
    
    vec2 warp = vec2(fbm(noiseUv + t * 0.5), fbm(noiseUv + t * 0.5 + 12.34)) * mix(0.0, 0.4, uHover);
    warp -= dirToCenter * uClick * 0.25 * smoothstep(0.8, 0.0, distToCenter); 
    
    float n1 = fbm(noiseUv + warp + vec2(t, 0.0));
    float n2 = fbm(noiseUv + warp + vec2(n1, t * 1.2));

    float rimWidth = mix(0.15, 0.35, n2) * mix(1.0, 1.4, uHover);
    rimWidth += uClick * 0.15;
    float rim = smoothstep(rimWidth, 0.0, innerDist);
    
    float specDist = abs(innerDist - 0.12 + n1 * 0.08);
    float specular = smoothstep(0.03, 0.0, specDist);

    float rightBias = smoothstep(0.2, 1.0, vUv.x);
    rim *= mix(0.6, 1.5, rightBias);
    specular *= mix(0.5, 2.0, rightBias);

    vec2 starUv = vUv * vec2(aspect * 6.0, 6.0);
    starUv.x -= uTime * 0.2; 
    starUv.y += sin(uTime * 0.5 + starUv.x) * mix(0.2, 0.6, uHover); 
    starUv += dirToCenter * uClick * 1.5;

    vec2 id = floor(starUv);
    vec2 gv = fract(starUv) - 0.5;
    float nStar = hash(id);
    float star = 0.0;
    
    float starThreshold = mix(0.94, 0.86, uHover); 
    
    if (nStar > starThreshold) { 
        float sizeMod = mix(0.5, 2.5, hash(id + 13.37)); 
        vec2 localWiggle = vec2(
            sin(uTime * 2.0 + nStar * 50.0),
            cos(uTime * 2.3 + nStar * 40.0)
        ) * 0.25 * uHover;

        float starDist = length(gv - localWiggle) * sizeMod;
        star = smoothstep(0.12, 0.0, starDist);
        star += smoothstep(0.25, 0.0, starDist) * 0.3;

        float twinklePhase = uTime * mix(5.0, 15.0, hash(id + 42.0));
        star *= sin(twinklePhase + nStar * 100.0) * 0.5 + 0.5; 
        star *= smoothstep(0.05, 0.2, innerDist); 
    }

    vec3 color = uBaseColor;
    float innerLiquid = smoothstep(0.2, 0.9, n2) * (1.0 - innerDist) * mix(0.2, 0.45, uHover);
    color += uGlassColor * innerLiquid;
    color += uGlassColor * rim * mix(0.6, 1.2, uHover);
    color += vec3(1.0) * specular * mix(0.8, 2.0, uHover);
    color += vec3(1.0) * star * mix(0.8, 1.5, uHover);

    color += uGlassColor * rim * uClick * 0.8;
    color += vec3(1.0) * specular * uClick * 1.5;
    color += uGlassColor * exp(-distToCenter * 6.0) * uClick * 0.6;

    color *= smoothstep(1.5, 0.2, length(vUv - 0.5));

    float alpha = smoothstep(0.02, -0.02, dist);
    gl_FragColor = vec4(color, alpha * 0.95);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return [r, g, b];
}

export interface FluidGlassButtonProps {
  text?: string;
  href?: string;
  newTab?: boolean;
  baseColor?: string;
  glassColor?: string;
  hoverSpeed?: number;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function FluidGlassButton({
  text = "Talk to Us",
  href,
  newTab = true,
  baseColor = "#0B0F13",
  glassColor = "#25D366",
  hoverSpeed = 0.6,
  icon,
  className = "",
  style,
  onClick,
}: FluidGlassButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const hoverRef = useRef(0);
  const clickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false }) ||
      (canvas.getContext("experimental-webgl", {
        alpha: true,
        antialias: false,
      }) as WebGLRenderingContext | null);

    if (!gl) return;

    // Compile Shader Helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    // Full screen quad geometry
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uHoverLoc = gl.getUniformLocation(program, "uHover");
    const uClickLoc = gl.getUniformLocation(program, "uClick");
    const uBaseColorLoc = gl.getUniformLocation(program, "uBaseColor");
    const uGlassColorLoc = gl.getUniformLocation(program, "uGlassColor");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");

    const baseRgb = hexToRgb(baseColor);
    const glassRgb = hexToRgb(glassColor);

    gl.uniform3f(uBaseColorLoc, baseRgb[0], baseRgb[1], baseRgb[2]);
    gl.uniform3f(uGlassColorLoc, glassRgb[0], glassRgb[1], glassRgb[2]);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let animationFrameId: number;
    let timeAccumulator = 0;
    let lastTime = performance.now();
    let isIntersecting = true;
    let currentHoverValue = 0;
    let currentClickValue = 0;

    const renderLoop = (now: number) => {
      animationFrameId = requestAnimationFrame(renderLoop);
      if (!isIntersecting) {
        lastTime = now;
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const targetHover = hoverRef.current;
      currentHoverValue += (targetHover - currentHoverValue) * delta * 4;

      if (clickRef.current > 0) {
        currentClickValue = clickRef.current;
        clickRef.current = 0;
      }
      currentClickValue += (0 - currentClickValue) * delta * 6;

      const currentSpeed = 0.15 + (hoverSpeed - 0.15) * currentHoverValue;
      timeAccumulator += delta * currentSpeed;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, timeAccumulator);
      gl.uniform1f(uHoverLoc, currentHoverValue);
      gl.uniform1f(uClickLoc, currentClickValue);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Dynamic ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(width * dpr, 1);
        canvas.height = Math.max(height * dpr, 1);
      }
    });
    resizeObserver.observe(container);

    // Viewport IntersectionObserver
    const intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isIntersecting = entry.isIntersecting;
      }
    });
    intersectionObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, [baseColor, glassColor, hoverSpeed]);

  const handleMouseEnter = useCallback(() => {
    hoverRef.current = 1;
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverRef.current = 0;
    const targetEl = anchorRef.current || buttonRef.current;
    if (targetEl) {
      targetEl.style.transform = "scale(1)";
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    clickRef.current = 1;
    const targetEl = anchorRef.current || buttonRef.current;
    if (targetEl) {
      targetEl.style.transform = "scale(0.97)";
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    const targetEl = anchorRef.current || buttonRef.current;
    if (targetEl) {
      targetEl.style.transform = "scale(1)";
    }
  }, []);

  const sharedClassName = `relative inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full overflow-hidden select-none cursor-pointer transition-transform duration-300 backdrop-blur-xl border border-white/20 hover:border-[#25D366]/70 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] group ${className}`;

  const innerContent = (
    <>
      {/* WebGL Fluid Liquid Glass Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 pointer-events-none rounded-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Button Content Foreground */}
      <span className="relative z-10 flex items-center justify-center gap-2.5 text-white font-heading text-xs sm:text-[13px] font-bold tracking-[0.08em] pointer-events-none transition-transform duration-200 group-hover:scale-[1.02]" style={{ color: "#FFFFFF" }}>
        {icon}
        <span>{text}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
        className={sharedClassName}
        style={style}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      className={sharedClassName}
      style={style}
    >
      {innerContent}
    </button>
  );
}
