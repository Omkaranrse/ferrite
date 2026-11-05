"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
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
    // Aspect-corrected coordinates for perfect pill shape math
    float aspect = uResolution.x / max(uResolution.y, 0.001);
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= aspect;

    // Center calculations for the liquid click surge
    vec2 center = vec2(0.5);
    vec2 dirToCenter = normalize(vUv - center + vec2(0.0001));
    float distToCenter = length(vUv - center);

    // 1. SDF (Signed Distance Field) for a Pill Shape
    float r = 1.0; 
    vec2 b = vec2(max(aspect - 1.0, 0.0), 0.0);
    vec2 d = abs(p) - b;
    float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
    
    // Normalized distance from edge (0 = edge, 1 = center)
    float innerDist = clamp(abs(dist), 0.0, 1.0);

    // 2. Dynamic Liquid Noise Field
    float t = uTime;
    
    // Stretch noise horizontally
    vec2 noiseUv = vUv * vec2(2.0, 1.0); 
    
    // Dynamic warping on hover + Liquid Surge on Click
    vec2 warp = vec2(fbm(noiseUv + t * 0.5), fbm(noiseUv + t * 0.5 + 12.34)) * mix(0.0, 0.4, uHover);
    warp -= dirToCenter * uClick * 0.25 * smoothstep(0.8, 0.0, distToCenter); 
    
    float n1 = fbm(noiseUv + warp + vec2(t, 0.0));
    float n2 = fbm(noiseUv + warp + vec2(n1, t * 1.2));

    // 3. Glassy Rim & Specular Highlights
    float rimWidth = mix(0.15, 0.35, n2) * mix(1.0, 1.4, uHover);
    rimWidth += uClick * 0.15; // Rim expands on click
    float rim = smoothstep(rimWidth, 0.0, innerDist);
    
    float specDist = abs(innerDist - 0.12 + n1 * 0.08);
    float specular = smoothstep(0.03, 0.0, specDist);

    float rightBias = smoothstep(0.2, 1.0, vUv.x);
    rim *= mix(0.6, 1.5, rightBias);
    specular *= mix(0.5, 2.0, rightBias);

    // 4. Highly Dynamic Stars / Particles
    vec2 starUv = vUv * vec2(aspect * 6.0, 6.0);
    
    // Drift uses the accumulated uTime so it accelerates smoothly without jumping
    starUv.x -= uTime * 0.2; 
    starUv.y += sin(uTime * 0.5 + starUv.x) * mix(0.2, 0.6, uHover); 
    
    // Star Burst on Click
    starUv += dirToCenter * uClick * 1.5;

    vec2 id = floor(starUv);
    vec2 gv = fract(starUv) - 0.5;
    float nStar = hash(id);
    float star = 0.0;
    
    float starThreshold = mix(0.94, 0.86, uHover); 
    
    if (nStar > starThreshold) { 
        // Randomize size per star
        float sizeMod = mix(0.5, 2.5, hash(id + 13.37)); 
        
        // Local micro-movements (wiggling inside their cell on hover)
        vec2 localWiggle = vec2(
            sin(uTime * 2.0 + nStar * 50.0),
            cos(uTime * 2.3 + nStar * 40.0)
        ) * 0.25 * uHover;

        float starDist = length(gv - localWiggle) * sizeMod;
        
        // Core brightness + Outer glow
        star = smoothstep(0.12, 0.0, starDist);
        star += smoothstep(0.25, 0.0, starDist) * 0.3;

        // Twinkle phase uses accumulated time to naturally speed up
        float twinklePhase = uTime * mix(5.0, 15.0, hash(id + 42.0));
        star *= sin(twinklePhase + nStar * 100.0) * 0.5 + 0.5; 
        
        // Fade stars out near the edge
        star *= smoothstep(0.05, 0.2, innerDist); 
    }

    // 5. Compositing
    vec3 color = uBaseColor;
    
    float innerLiquid = smoothstep(0.2, 0.9, n2) * (1.0 - innerDist) * mix(0.2, 0.45, uHover);
    color += uGlassColor * innerLiquid;
    
    color += uGlassColor * rim * mix(0.6, 1.2, uHover);
    color += vec3(1.0) * specular * mix(0.8, 2.0, uHover);
    
    color += vec3(1.0) * star * mix(0.8, 1.5, uHover);

    // Click Flash Effects
    color += uGlassColor * rim * uClick * 0.8;
    color += vec3(1.0) * specular * uClick * 1.5;
    color += uGlassColor * exp(-distToCenter * 6.0) * uClick * 0.6; // Volumetric center glow

    color *= smoothstep(1.5, 0.2, length(vUv - 0.5));

    gl_FragColor = vec4(color, 1.0);
}
`;

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

export interface FluidGlassButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  target?: string;
  rel?: string;
  text?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  baseColor?: string;
  glassColor?: string;
  hoverSpeed?: number;
  borderRadius?: number;
  padding?: string;
  showIcon?: boolean;
}

export default function FluidGlassButton({
  href,
  onClick,
  target,
  rel,
  text = "Talk to Us",
  title,
  className = "",
  style,
  children,
  baseColor = "#080C0E",
  glassColor = "#25D366",
  hoverSpeed = 0.6,
  borderRadius = 999,
  padding = "10px 24px sm:12px 28px",
  showIcon = true,
}: FluidGlassButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const hoverRef = useRef(0);
  const clickRef = useRef(0);

  const uniformsRef = useRef({
    uTime: { value: 0 },
    uHover: { value: 0 },
    uClick: { value: 0 },
    uBaseColor: { value: new THREE.Color(baseColor) },
    uGlassColor: { value: new THREE.Color(glassColor) },
    uResolution: { value: new THREE.Vector2(1, 1) },
  });

  // Update uniform colors when props change
  useEffect(() => {
    uniformsRef.current.uBaseColor.value.set(baseColor);
    uniformsRef.current.uGlassColor.value.set(glassColor);
  }, [baseColor, glassColor]);

  // Three.js WebGL shader canvas loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // WebGL not supported, fallback cleanly
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    let timeAccumulator = 0;
    let lastTime = performance.now();
    let isIntersecting = true;
    let currentHoverValue = 0;
    let currentClickValue = 0;

    const renderLoop = (time: number) => {
      animationFrameId = requestAnimationFrame(renderLoop);
      if (!isIntersecting) {
        lastTime = time;
        return;
      }
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const targetHover = hoverRef.current;
      currentHoverValue = THREE.MathUtils.lerp(currentHoverValue, targetHover, delta * 4);

      if (clickRef.current > 0) {
        currentClickValue = clickRef.current;
        clickRef.current = 0;
      }
      currentClickValue = THREE.MathUtils.lerp(currentClickValue, 0, delta * 6);

      const currentSpeed = THREE.MathUtils.lerp(0.15, hoverSpeed, currentHoverValue);
      timeAccumulator += delta * currentSpeed;

      uniformsRef.current.uTime.value = timeAccumulator;
      uniformsRef.current.uHover.value = currentHoverValue;
      uniformsRef.current.uClick.value = currentClickValue;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          renderer.setSize(width, height);
          uniformsRef.current.uResolution.value.set(width, height);
        }
      }
    });
    resizeObserver.observe(container);

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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hoverSpeed]);

  const handleMouseDownEvt = useCallback(() => {
    clickRef.current = 1;
    if (outerRef.current) {
      outerRef.current.style.transform = "scale(0.96)";
    }
  }, []);

  const handleMouseUpEvt = useCallback(() => {
    if (outerRef.current) {
      outerRef.current.style.transform = "scale(1.02)";
    }
  }, []);

  const handleMouseEnterEvt = useCallback(() => {
    hoverRef.current = 1;
    if (outerRef.current) {
      outerRef.current.style.transform = "scale(1.02)";
      outerRef.current.style.zIndex = "10";
    }
  }, []);

  const handleMouseLeaveEvt = useCallback(() => {
    hoverRef.current = 0;
    if (outerRef.current) {
      outerRef.current.style.transform = "scale(1)";
      outerRef.current.style.zIndex = "1";
    }
  }, []);

  const buttonText = title || text;

  const content = (
    <>
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          borderRadius: `${borderRadius}px`,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          pointerEvents: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          color: "white",
          textShadow: "0px 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        {showIcon && <WhatsAppVectorIcon className="w-5 h-5 text-[#25D366] shrink-0" />}
        <span className="font-heading font-semibold text-xs sm:text-sm text-white tracking-wide whitespace-nowrap">
          {children || buttonText}
        </span>
      </div>
    </>
  );

  const containerStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: `${borderRadius}px`,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    backgroundColor: baseColor,
    boxShadow:
      "inset 0 0 0 1px rgba(37, 211, 102, 0.45), 0 0 16px rgba(37, 211, 102, 0.35), 0 10px 25px -10px rgba(0,0,0,0.6)",
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
    textDecoration: "none",
    outline: "none",
    border: "none",
    userSelect: "none",
    overflow: "hidden",
    padding: "10px 24px",
    ...style,
  };

  if (href) {
    return (
      <a
        href={href}
        ref={outerRef}
        target={target}
        rel={rel}
        style={containerStyle}
        className={`group select-none ${className}`}
        onMouseEnter={handleMouseEnterEvt}
        onMouseLeave={handleMouseLeaveEvt}
        onMouseDown={handleMouseDownEvt}
        onMouseUp={handleMouseUpEvt}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      ref={outerRef}
      style={containerStyle}
      className={`group select-none ${className}`}
      onMouseEnter={handleMouseEnterEvt}
      onMouseLeave={handleMouseLeaveEvt}
      onMouseDown={handleMouseDownEvt}
      onMouseUp={handleMouseUpEvt}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

