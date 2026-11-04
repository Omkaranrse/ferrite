"use client";

import React, { useRef, useState, useEffect, useLayoutEffect, useId } from "react";

const SURFACE_VERTEX = `attribute vec2 position; varying vec2 vUv; void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;

const SURFACE_FRAGMENT = `precision highp float;
varying vec2 vUv;
uniform vec2 resolution,pointer;
uniform float time,edgeWidth,flow,prism,glow,brightness,energy,pull,press,radius,release,material,lightAmount,lightSize,hoverDark;
uniform vec4 lightColor,shadeColor,accentColor;
const float PI=3.14159265359;

float boxDistance(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

vec2 boxNormal(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    vec2 outside = max(q, 0.0);
    vec2 side = q.x > q.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    return (length(outside) > 0.0001 ? normalize(outside) : side) * sign(p + vec2(0.00001));
}

float gaussian(float x, float c, float w) {
    float q = (x - c) / w;
    return exp(-q * q);
}

float reflectionPool(float angle, float aim, float sharpness) {
    return exp((cos(angle - aim) - 1.0) * sharpness);
}

float studioBand(float field) {
    float main = smoothstep(-.50, -.28, field) - smoothstep(.37, .57, field);
    float strip = smoothstep(.84, .95, field);
    return clamp(.035 + .95 * main + .70 * strip, 0.0, 1.0);
}

vec2 perimeter(vec2 p, vec2 b, float r) {
    vec2 c = max(b - r, vec2(0.0));
    vec2 a = abs(p);
    vec2 q = a - c;
    float quadrant = c.x + c.y + r * PI * 0.5;
    float s;
    if (q.y <= 0.0) s = a.y;
    else if (q.x >= 0.0) s = c.y + r * atan(max(q.y, 0.0), max(q.x, 0.00001));
    else s = c.y + r * PI * 0.5 + c.x - a.x;
    if (p.x < 0.0 && p.y >= 0.0) s = quadrant * 2.0 - s;
    else if (p.x < 0.0 && p.y < 0.0) s = quadrant * 2.0 + s;
    else if (p.x >= 0.0 && p.y < 0.0) s = quadrant * 4.0 - s;
    return vec2(s, max(quadrant * 4.0, 1.0));
}

void main() {
    vec2 p = vec2(vUv.x, 1.0 - vUv.y) * resolution;
    vec2 center = resolution * .5;
    float width = max(edgeWidth, .01);
    float inset = .7;
    vec2 b = max(center - inset, vec2(1.0));
    float corner = clamp(radius - inset, 1.0, min(b.x, b.y));
    vec2 local = p - center;
    float d = boxDistance(local, b, corner);
    float aa = .57;
    vec3 color = vec3(0.0);
    float alpha = 0.0;

    float inside = 1.0 - smoothstep(-aa, aa, d);
    float reach = max(lightSize, 24.0);
    float py = clamp(pointer.y / max(resolution.y, 1.0), 0.0, 1.0);
    vec2 upperOffset = vec2((p.x - pointer.x) / reach, p.y / max(22.0, resolution.y * .64));
    vec2 lowerOffset = vec2((p.x - pointer.x) / (reach * .84), (resolution.y - p.y) / max(18.0, resolution.y * .48));
    float upper = exp(-dot(upperOffset, upperOffset));
    float lower = exp(-dot(lowerOffset, lowerOffset));
    vec2 lightDelta = (p - pointer) / vec2(reach, min(reach * .72, max(28.0, resolution.y * .75)));
    float localSpot = exp(-dot(lightDelta, lightDelta));
    float edgeReflection = upper * mix(.86, .27, py) + lower * mix(.22, .80, py);
    float spot = localSpot * .82 + edgeReflection * .18;
    float edgeSheen = exp(-max(-d - edgeWidth, 0.0) / mix(19.0, 11.0, material));
    float idle = mix(.008, .022, material);
    float lightA = inside * lightColor.a * (spot * energy * lightAmount * mix(.25, .34, material) * (1.0 - hoverDark) + idle * edgeSheen);
    color = mix(lightColor.rgb, accentColor.rgb, .14 * prism) * lightA;
    alpha = lightA;

    if (hoverDark > .5) {
        float shadowA = inside * min(.6, energy * lightAmount * (localSpot * .34 + edgeReflection * edgeSheen * .18));
        vec3 shadowInk = mix(vec3(.259, .376, .541), vec3(.094, .141, .227), localSpot);
        color = shadowInk * shadowA + color * (1.0 - shadowA);
        alpha = shadowA + alpha * (1.0 - shadowA);
    }

    if (edgeWidth > .05 && abs(d) < width * 1.4 + 5.0) {
        vec2 planar = boxNormal(local, b, corner);
        vec2 arc = perimeter(local - d * planar, b, corner);
        float angle = arc.x / arc.y * PI * 2.0;
        float phase = time * .65;
        float tide = sin(angle * 2.0 - phase) * .64 + sin(angle * 3.0 + phase * .71) * .36;
        vec2 nearMouse = (p - pointer) / vec2(72.0, 58.0);
        float proximity = exp(-dot(nearMouse, nearMouse)) * energy;
        float attraction = proximity * pull;
        float wave = sin(angle * 3.0 - release * 10.0) * sin(PI * release) * exp(-release * 2.7);
        float pooling = .08 * flow * tide + .07 * attraction + press * .035 + wave * .04;
        float halfTube = width * .5;
        float radial = d + halfTube;
        float coverage = 1.0 - smoothstep(halfTube - aa, halfTube + aa, abs(radial));
        float crossSection = clamp(radial / max(halfTube, .1), -.999, .999);
        vec2 tangent = vec2(-planar.y, planar.x);
        float tension = .035 * flow * sin(angle * 3.0 - phase) + pooling * .4;
        vec3 n = normalize(vec3(planar * crossSection + tangent * tension, sqrt(max(.001, 1.0 - crossSection * crossSection))));
        float mainField = sin(angle * 2.0 - time * .53);
        float counterField = sin(angle * 3.0 + time * .31);
        vec3 eye = normalize(vec3(-.04, -.14, 1.0));
        vec3 r = reflect(-eye, n);
        float field = mainField + counterField * .18 + crossSection * .52 + r.z * .12;
        float softbox = studioBand(field);
        float pool = .5 + .5 * mainField;
        float dispersion = prism * (.08 + .10 * reflectionPool(angle, phase + .7, 2.0));
        vec3 spectral = vec3(studioBand(field + dispersion), studioBand(field), studioBand(field - dispersion));
        float warmEdge = max(spectral.r - spectral.b, 0.0);
        spectral *= mix(vec3(1.0), accentColor.rgb, warmEdge * accentColor.a * .24);
        vec3 response = mix(vec3(.22), vec3(.94), spectral);
        vec3 chrome = mix(shadeColor.rgb * .72, lightColor.rgb, response);
        float hot = reflectionPool(angle, phase - 1.9, 12.0);
        chrome += lightColor.rgb * hot * pow(max(n.z, 0.0), 2.0) * .12;
        float key = pow(max(dot(n, normalize(vec3(-.26, -.60, .76))), 0.0), 24.0);
        chrome += lightColor.rgb * key * (.055 + proximity * .30 * lightAmount * (1.0 - hoverDark));
        chrome += lightColor.rgb * proximity * lightAmount * .16 * pow(max(n.z, 0.0), 3.0) * (1.0 - hoverDark);
        chrome = mix(chrome, vec3(.08, .12, .19), clamp(proximity * lightAmount * .50 * pow(max(n.z, 0.0), 4.0) * hoverDark, 0.0, 1.0));
        chrome = clamp(chrome * brightness * mix(1.0, .82, material), 0.0, 1.0);
        float halo = exp(-abs(radial) * .70) * glow * .055 * (.5 + pool * .5);
        halo *= 1.0 - smoothstep(.0, .65, d);
        coverage *= mix(shadeColor.a, lightColor.a, softbox);
        float ringA = coverage + (1.0 - coverage) * halo;
        vec3 ringColor = chrome * coverage + lightColor.rgb * halo * (1.0 - coverage);
        color = ringColor + color * (1.0 - ringA);
        alpha = ringA + alpha * (1.0 - ringA);
    }

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
}`;

const SURFACE_COLORS = {
  highlight: "#EEF6FF",
  shade: "#111A28",
  accent: "#C47A48", // Signature Ferrite Industrial Copper
};

const SURFACE_LIGHT = { intensity: 0.65, size: 120, glow: 0.18 };
const SURFACE_MOTION = { playback: "ambient" as const, speed: 1, flow: 0.9, attraction: 0.8 };

const surfaceClamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo));

function findSurfaceHost(root: HTMLElement): HTMLElement {
  let host = root.parentElement || root;
  if (host !== root && host.childElementCount === 1 && host.parentElement) host = host.parentElement;
  for (let i = 0; i < 3 && host.parentElement; i++) {
    if (host.matches("a,button,[role=button],nav,[data-framer-name]")) break;
    if (host.childElementCount > 1 || host.parentElement === document.body) break;
    host = host.parentElement;
  }
  return host;
}

export interface LiquidSurfaceProps {
  material?: "navigation" | "dark";
  edgeWidth?: number;
  hoverLight?: number;
  liquid?: number;
  colors?: {
    highlight?: string;
    shade?: string;
    accent?: string;
  };
  brightness?: number;
  prism?: number;
  light?: {
    size?: number;
    glow?: number;
    intensity?: number;
  };
  motion?: {
    playback?: "ambient" | "hover" | "off";
    speed?: number;
    flow?: number;
    attraction?: number;
  };
  radius?: number;
  style?: React.CSSProperties;
  className?: string;
}

const useLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function LiquidSurface(props: LiquidSurfaceProps) {
  const { material = "navigation", edgeWidth = 3.4, brightness = 1.05, prism = 0.6, radius = 0, style } = props;
  const colors = { ...SURFACE_COLORS, ...props.colors };
  const light = {
    ...SURFACE_LIGHT,
    ...props.light,
    intensity: props.hoverLight ?? props.light?.intensity ?? 0.65,
  };
  const motion = {
    ...SURFACE_MOTION,
    ...props.motion,
    flow: props.liquid ?? props.motion?.flow ?? 0.9,
  };

  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  const rawId = useId();
  const unique = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const scopeAttribute = `data-liquid-surface-${unique}`;

  const still = !mounted || reduced || motion.playback === "off";
  const config = { material, edgeWidth, brightness, prism, radius, colors, light, motion, still };
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayout(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || typeof window === "undefined") return;

    const host = (configRef.current.material === "navigation" ? root.parentElement?.closest("nav") : null) || findSurfaceHost(root);
    host.setAttribute(scopeAttribute, "");

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    const shaders: WebGLShader[] = [];
    const uniforms: Record<string, WebGLUniformLocation | null> = {};

    let stopped = false;
    let lost = false;
    let visible = true;
    let frame = 0;
    let last = 0;

    let w = 880;
    let h = 84;
    let round = 42;
    let elapsed = 1.8;
    let energy = 0;
    let pressure = 0;
    let release = 1;
    let phaseVelocity = 0;
    let backingWidth = 1;
    let backingHeight = 1;

    const input = {
      hovered: false,
      focused: false,
      pressed: false,
      x: 0.32,
      y: 0.2,
      sx: 0.32,
      sy: 0.2,
      clientX: 0,
      clientY: 0,
      hasPointer: false,
    };

    let hoverDark = 0;
    let palette = [
      [0.93, 0.96, 1.0, 1.0],
      [0.06, 0.1, 0.16, 1.0],
      [0.77, 0.48, 0.28, 1.0], // Industrial Copper
    ];

    const colorCanvas = document.createElement("canvas");
    colorCanvas.width = colorCanvas.height = 1;
    const colorContext = colorCanvas.getContext("2d", { willReadFrequently: true });

    const showRenderer = (mode: "webgl" | "fallback" | "pending") => {
      root.dataset.renderer = mode;
      canvas.style.visibility = mode === "webgl" ? "visible" : "hidden";
      const fallback = root.querySelectorAll<HTMLElement>(".ls-fallback");
      fallback.forEach((f) => (f.style.visibility = mode === "fallback" ? "visible" : "hidden"));
    };

    const cleanupGPU = () => {
      if (!gl) return;
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      shaders.forEach((s) => gl?.deleteShader(s));
      shaders.length = 0;
      program = null;
      buffer = null;
    };

    const setupGPU = () => {
      try {
        gl = canvas.getContext("webgl", {
          alpha: true,
          premultipliedAlpha: true,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "low-power",
        });

        if (gl) {
          const compile = (kind: number, source: string) => {
            const shader = gl!.createShader(kind);
            if (!shader) throw new Error("Shader unavailable");
            shaders.push(shader);
            gl!.shaderSource(shader, source);
            gl!.compileShader(shader);
            if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
              throw new Error(gl!.getShaderInfoLog(shader) || "Shader compilation failed");
            }
            return shader;
          };

          const vertex = compile(gl.VERTEX_SHADER, SURFACE_VERTEX);
          const fragment = compile(gl.FRAGMENT_SHADER, SURFACE_FRAGMENT);
          program = gl.createProgram();
          buffer = gl.createBuffer();
          if (!program || !buffer) throw new Error("Renderer unavailable");

          gl.attachShader(program, vertex);
          gl.attachShader(program, fragment);
          gl.linkProgram(program);
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program) || "Shader linking failed");
          }

          gl.useProgram(program);
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

          const loc = gl.getAttribLocation(program, "position");
          if (loc >= 0) {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
          }

          const names = [
            "resolution", "pointer", "time", "edgeWidth", "flow", "prism", "glow",
            "brightness", "energy", "pull", "press", "radius", "release", "material",
            "lightAmount", "lightSize", "hoverDark", "lightColor", "shadeColor", "accentColor"
          ];
          for (const name of names) {
            uniforms[name] = gl.getUniformLocation(program, name);
          }
        }
      } catch (err) {
        console.warn("LiquidSurface WebGL fallback active", err);
        cleanupGPU();
        gl = null;
      }
    };

    setupGPU();

    const updatePalette = () => {
      const c = configRef.current;
      const values = [c.colors.highlight || SURFACE_COLORS.highlight, c.colors.shade || SURFACE_COLORS.shade, c.colors.accent || SURFACE_COLORS.accent];
      if (colorContext) {
        palette = values.map((val) => {
          colorContext.clearRect(0, 0, 1, 1);
          colorContext.fillStyle = val;
          colorContext.fillRect(0, 0, 1, 1);
          const d = colorContext.getImageData(0, 0, 1, 1).data;
          return [d[0] / 255, d[1] / 255, d[2] / 255, d[3] / 255];
        });
      }
    };

    const projectPointer = () => {
      const box = root.getBoundingClientRect();
      if (!box.width || !box.height) return false;
      const px = (input.clientX - box.left) / box.width;
      const py = (input.clientY - box.top) / box.height;
      input.x = surfaceClamp(px, 0, 1);
      input.y = surfaceClamp(py, 0, 1);
      if (energy < 0.025) {
        input.sx = input.x;
        input.sy = input.y;
      }
      return px >= 0 && px <= 1 && py >= 0 && py <= 1;
    };

    const readSize = () => {
      const c = configRef.current;
      const rootStyle = getComputedStyle(root);
      const hostStyle = getComputedStyle(host);

      const localW = parseFloat(rootStyle.width) || root.clientWidth;
      const localH = parseFloat(rootStyle.height) || root.clientHeight;
      if (localW <= 0 || localH <= 0) return false;

      let scaleX = 1;
      let scaleY = 1;
      if (hostStyle.transform !== "none") {
        try {
          const matrix = new DOMMatrixReadOnly(hostStyle.transform);
          scaleX = Math.max(Math.hypot(matrix.a, matrix.b), 0.001);
          scaleY = Math.max(Math.hypot(matrix.c, matrix.d), 0.001);
        } catch {}
      }

      const nativeRadius = hostStyle.borderTopLeftRadius.trim().split(/\s+/);
      const resolveRadius = (val: string, sz: number) =>
        (parseFloat(val) || 0) * (val.includes("%") ? sz / 100 : 1);

      const rx = c.radius > 0 ? c.radius : resolveRadius(nativeRadius[0], localW);
      const ry = c.radius > 0 ? c.radius : resolveRadius(nativeRadius[1] || nativeRadius[0], localH);

      w = localW * scaleX;
      h = localH * scaleY;
      round = surfaceClamp(Math.min(rx * scaleX, ry * scaleY), 0, Math.min(w, h) / 2);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      backingWidth = Math.max(1, Math.round(localW * dpr));
      backingHeight = Math.max(1, Math.round(localH * dpr));

      if (input.hasPointer && (input.hovered || input.pressed)) {
        const inside = projectPointer();
        if (input.hovered) input.hovered = inside;
      }
      return true;
    };

    const paint = () => {
      const c = configRef.current;
      if (stopped || lost) return false;
      if (!readSize()) {
        showRenderer("pending");
        return false;
      }

      updatePalette();

      root.style.setProperty("--ls-width", `${surfaceClamp(c.edgeWidth, 0, 8)}px`);
      root.style.setProperty("--ls-light", c.colors.highlight);
      root.style.setProperty("--ls-shade", c.colors.shade);
      root.style.setProperty("--ls-accent", c.colors.accent);
      root.style.setProperty("--ls-phase", `${elapsed * 27 - 45}deg`);
      root.style.setProperty("--ls-x", `${input.sx * 100}%`);
      root.style.setProperty("--ls-y", `${input.sy * 100}%`);
      root.style.setProperty("--ls-energy", String(energy * c.light.intensity));
      root.style.setProperty("--ls-size", `${c.light.size}px`);

      if (!gl || !program) {
        showRenderer("fallback");
        return true;
      }

      if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
        canvas.width = backingWidth;
        canvas.height = backingHeight;
      }

      gl.useProgram(program);
      gl.viewport(0, 0, canvas.width, canvas.height);

      const setF = (name: string, val: number) => {
        if (uniforms[name]) gl!.uniform1f(uniforms[name], val);
      };

      if (uniforms.resolution) gl.uniform2f(uniforms.resolution, w, h);
      if (uniforms.pointer) gl.uniform2f(uniforms.pointer, input.sx * w, input.sy * h);

      setF("time", elapsed);
      setF("edgeWidth", surfaceClamp(c.edgeWidth, 0, 8));
      setF("flow", surfaceClamp(c.motion.flow, 0, 1.5));
      setF("prism", surfaceClamp(c.prism, 0, 1));
      setF("glow", surfaceClamp(c.light.glow, 0, 1));
      setF("brightness", surfaceClamp(c.brightness, 0.4, 1.3));
      setF("energy", energy);
      setF("pull", surfaceClamp(c.motion.attraction, 0, 1));
      setF("press", pressure);
      setF("radius", round);
      setF("release", release);
      setF("material", c.material === "dark" ? 1 : 0);
      setF("hoverDark", hoverDark);
      setF("lightAmount", surfaceClamp(c.light.intensity, 0, 1.5));
      setF("lightSize", surfaceClamp(c.light.size, 30, 300));

      if (uniforms.lightColor) gl.uniform4fv(uniforms.lightColor, new Float32Array(palette[0]));
      if (uniforms.shadeColor) gl.uniform4fv(uniforms.shadeColor, new Float32Array(palette[1]));
      if (uniforms.accentColor) gl.uniform4fv(uniforms.accentColor, new Float32Array(palette[2]));

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      showRenderer(gl.isContextLost() ? "fallback" : "webgl");
      return true;
    };

    const tick = (now: number) => {
      frame = 0;
      if (stopped || lost || !visible || document.hidden) {
        last = 0;
        return;
      }

      const c = configRef.current;
      const active = input.hovered || input.focused || input.pressed;
      const dt = last ? Math.min((now - last) / 1000, 0.04) : 1 / 60;
      last = now;

      if (c.still) {
        energy = pressure = phaseVelocity = 0;
        release = 1;
        paint();
        last = 0;
        return;
      }

      energy += ((active ? 1 : 0) - energy) * (1 - Math.exp(-dt * 8));
      pressure += ((input.pressed ? 1 : 0) - pressure) * (1 - Math.exp(-dt * 18));
      input.sx += (input.x - input.sx) * (1 - Math.exp(-dt * 24));
      input.sy += (input.y - input.sy) * (1 - Math.exp(-dt * 24));
      release = Math.min(1, release + dt * 1.35);

      const speed = surfaceClamp(c.motion.speed, 0.1, 2);
      const targetVelocity = active || c.motion.playback === "ambient" ? speed : 0;
      const decay = Math.exp(-dt * 6);
      elapsed += targetVelocity * dt + (phaseVelocity - targetVelocity) * (1 - decay) / 6;
      phaseVelocity = targetVelocity + (phaseVelocity - targetVelocity) * decay;

      paint();

      const moving = Math.abs(phaseVelocity - targetVelocity) > 0.0005;
      const settling = Math.abs(energy - (active ? 1 : 0)) > 0.003 || Math.abs(pressure - (input.pressed ? 1 : 0)) > 0.003 || release < 1;

      if (targetVelocity > 0 || moving || settling) {
        frame = requestAnimationFrame(tick);
      } else {
        last = 0;
      }
    };

    function wake() {
      if (stopped || lost) return;
      if (!frame && visible && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    }
    wakeRef.current = wake;

    const point = (event: PointerEvent) => {
      input.clientX = event.clientX;
      input.clientY = event.clientY;
      input.hasPointer = true;
      return projectPointer();
    };

    const enter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      input.hovered = point(e);
      wake();
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      input.hovered = point(e);
      wake();
    };

    const leave = () => {
      input.hovered = false;
      wake();
    };

    const down = (e: PointerEvent) => {
      point(e);
      input.pressed = true;
      wake();
    };

    const up = () => {
      if (input.pressed) release = 0;
      input.pressed = false;
      wake();
    };

    const resize = () => {
      readSize();
      wake();
    };

    host.addEventListener("pointerenter", enter as EventListener);
    host.addEventListener("pointermove", move as EventListener, { passive: true });
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointerdown", down as EventListener, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("resize", resize, { passive: true });

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(root);
    if (host !== root) ro?.observe(host);

    readSize();
    paint();
    wake();

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      ro?.disconnect();
      host.removeEventListener("pointerenter", enter as EventListener);
      host.removeEventListener("pointermove", move as EventListener);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerdown", down as EventListener);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("resize", resize);
      cleanupGPU();
      gl = null;
    };
  }, [mounted, material, unique]);

  const layerStyle: React.CSSProperties = {
    position: "absolute",
    display: "block",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    pointerEvents: "none",
    userSelect: "none",
    visibility: "hidden",
  };

  return (
    <div
      ref={rootRef}
      className={`liquid-surface ${props.className || ""}`}
      data-renderer="pending"
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        ...style,
        position: "relative",
        pointerEvents: "none",
        userSelect: "none",
        overflow: "visible",
      }}
    >
      <style>{`
        .liquid-surface > canvas, .liquid-surface > .ls-fallback {
          visibility: hidden;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
        }
        .liquid-surface .ls-edge {
          inset: .7px;
          padding: var(--ls-width, 3.4px);
          background: radial-gradient(ellipse at var(--ls-x, 32%) 0%, var(--ls-light, #eef6ff), transparent 40%),
                      conic-gradient(from var(--ls-phase, -45deg), var(--ls-shade, #111a28), var(--ls-light, #eef6ff) 21%, var(--ls-shade, #111a28) 37%, var(--ls-accent, #c47a48) 51%, var(--ls-light, #eef6ff) 68%, var(--ls-shade, #111a28) 85%, var(--ls-light, #eef6ff));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          filter: brightness(1.05);
        }
        .liquid-surface .ls-light {
          background: radial-gradient(ellipse 120px 80% at var(--ls-x, 32%) var(--ls-y, 20%), var(--ls-light, #eef6ff), transparent 80%);
          opacity: calc(var(--ls-energy, 0) * .25);
        }
        .liquid-surface[data-renderer=webgl] > .ls-gpu,
        .liquid-surface[data-renderer=fallback] > .ls-fallback {
          visibility: visible;
        }
      `}</style>
      <span className="ls-fallback ls-light" style={layerStyle} />
      <span className="ls-fallback ls-edge" style={{ ...layerStyle, inset: 0.7 }} />
      <canvas ref={canvasRef} className="ls-gpu" width={1} height={1} style={layerStyle} />
    </div>
  );
}
