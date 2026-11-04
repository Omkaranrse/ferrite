"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

const MEDALLION_VERTEX = `attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;

const MEDALLION_FRAGMENT = `
precision highp float;
varying vec2 uv;
uniform float time, pixels, tube, flow, dispersion, glow, warmth, hover, hoverTone, hoverIntensity, press, response, release;
uniform vec2 pointer;
const float PI=3.14159265;

float pool(float a,float b,float sharp){return exp((cos(a-b)-1.)*sharp);}

float studio(vec3 r,float a,float q,float shift){
    float f=sin(a*2.-time*.53)+.28*sin(3.*a+time*.31)+q*.52+r.z*.12+shift;
    float main=smoothstep(-.5,-.28,f)-smoothstep(.37,.57,f);
    float strip=smoothstep(.84,.95,f);
    float curve=.5+.5*r.z;
    return .12+.75*main+.65*strip+.12*curve;
}

void main(){
    vec2 p=(vec2(uv.x,1.-uv.y)*2.-1.)*1.2;
    float r=max(length(p),.0001);
    float a=atan(p.y,p.x);
    float phase=time*.65;
    float aim=atan(pointer.y+.0001,pointer.x+.0001);
    float attraction=pool(a,aim,2.8)*hover;
    float wave=sin(3.*a-release*11.)*sin(PI*release)*exp(-release*2.7);
    float rip=flow*(.010*sin(3.*a-phase*1.3)+.006*sin(5.*a+phase*.8));
    float radius=.81+rip+attraction*.018*response-press*.012*response+wave*.035*response;
    float width=tube*(1.+flow*.16*sin(2.*a-phase)+attraction*.19*response+press*.24*response);
    float q=(r-radius)/max(width,.018);
    float aa=2.64/max(pixels,1.);
    float coverage=1.-smoothstep(width-aa,width+aa,abs(r-radius));
    float z=sqrt(max(.0001,1.-clamp(q*q,0.,1.)));
    vec2 tangent=vec2(-p.y,p.x)/r;
    vec3 normal=normalize(vec3(p/r*clamp(q,-1.,1.)+tangent*(.10*flow*sin(3.*a-phase)+wave*.35),z));
    vec3 reflected=reflect(vec3(0.,0.,-1.),normal);
    float shift=dispersion*(.08+.13*pool(a,phase+.7,2.));
    vec3 chrome=vec3(studio(reflected,a,q,shift),studio(reflected,a,q,0.),studio(reflected,a,q,-shift));
    float hot=pool(a,phase-1.9,12.)+pool(a,-phase*.71+1.2,20.)*.7;
    chrome+=vec3(.75,.87,1.)*hot*pow(z,2.)*.72;
    float hoverCore=attraction*pow(z,4.)*hoverIntensity;
    vec3 hoverTarget=mix(vec3(.08,.12,.19),vec3(1.),step(0.,hoverTone));
    chrome=mix(chrome,hoverTarget,hoverCore*mix(.50,.46,step(0.,hoverTone)));
    chrome*=mix(vec3(1.),vec3(1.14,.96,.72),max(0.,warmth));
    chrome*=mix(vec3(1.),vec3(.78,.93,1.13),max(0.,-warmth));
    chrome=mix(chrome,vec3(.94,.98,1.),pow(abs(clamp(q,-1.,1.)),14.)*.38);
    float halo=exp(-pow((r-radius)/(width*2.8),2.))*hot*glow*.21*(1.-smoothstep(1.08,1.2,r));
    vec3 haloColor=mix(vec3(.65,.79,1.),vec3(1.,.88,.65),.5+.5*sin(a+phase));
    float alpha=coverage+(1.-coverage)*halo;
    vec3 col=clamp(chrome,0.,1.)*coverage+haloColor*(1.-coverage)*halo;
    gl_FragColor=vec4(col,alpha);
}`;

const MEDALLION_CSS = `
.lm-medallion{position:relative;display:inline-grid;place-items:center;flex-shrink:0;isolation:isolate;user-select:none}
.lm-medallion[data-renderer=pending]{visibility:hidden}
.lm-medallion .lmm-layer{position:absolute;pointer-events:none;user-select:none;border-radius:50%}
.lm-medallion .lmm-torus{background:radial-gradient(ellipse at 24% 10%,#fff,transparent 40%),conic-gradient(from var(--lmm-phase,-44deg),#deedff,#273a58 8%,#fff 20%,#d6e9ff 26%,#182136 34%,#6b81a1 42%,#f8fdff 49%,#bddcff 55%,#263246 66%,#f5d8ae 72%,#fff 79%,#192336 89%,#deedff);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;filter:saturate(var(--lmm-saturation,1.2)) drop-shadow(0 1px 1px #060b1488)}
.lm-medallion[data-renderer=webgl] .lmm-torus{visibility:hidden}
.lm-medallion .lmm-center{transition:transform 150ms cubic-bezier(.2,.8,.2,1)}
.lm-medallion[data-pressed=true]:not([data-still=true]) .lmm-center{transform:scale(.98)}
.lm-medallion[data-still=true] .lmm-center{transition:none;transform:none}
@media(prefers-reduced-motion:reduce){.lm-medallion .lmm-center{transition:none!important;transform:none!important}}
@media(forced-colors:active){.lm-medallion .lmm-torus,.lm-medallion canvas{display:none!important}.lm-medallion .lmm-glass{background:Canvas!important;box-shadow:none!important;border:1px solid CanvasText}.lm-medallion .lmm-center{color:CanvasText!important;filter:none!important}}
`;

const useLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

interface LiquidMedallionProps {
  size: number;
  still: boolean;
  active: boolean;
  pressed: boolean;
  speed: number;
  flow: number;
  prism: number;
  attraction: number;
  brightness: number;
  glow: number;
  children?: React.ReactNode;
}

function LiquidMedallion(props: LiquidMedallionProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const configRef = useRef(props);
  configRef.current = props;

  const releaseCount = useRef(0);
  const previousPress = useRef(props.pressed);
  const phaseRef = useRef(1.4);

  const bound = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo));
  const displaySize = bound(props.size, 24, 160);
  const thickness = Math.min(5.2, displaySize * 0.14);

  useLayout(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || typeof window === "undefined") return;

    const torus = root.querySelector<HTMLElement>(".lmm-torus");
    const showRenderer = (mode: string) => {
      root.dataset.renderer = mode;
      root.style.visibility = mode === "pending" ? "hidden" : "visible";
      canvas.style.visibility = mode === "webgl" ? "visible" : "hidden";
      if (torus) torus.style.visibility = mode === "fallback" ? "visible" : "hidden";
    };

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    const shaders: WebGLShader[] = [];
    const uniforms: Record<string, WebGLUniformLocation | null> = {};

    let stopped = false;
    let lost = false;
    let visible = true;
    let dirty = true;
    let frame = 0;
    let last = 0;
    let lastDraw = 0;

    let hover = 0;
    let pressure = 0;
    let release = 1;
    let seenRelease = releaseCount.current;
    let x = -0.5, y = -0.5, tx = -0.5, ty = -0.5, suppressPress = false;

    showRenderer("pending");
    canvas.style.opacity = "0";

    const cleanupGPU = () => {
      if (!gl) return;
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      shaders.forEach((s) => gl?.deleteShader(s));
      program = null;
      buffer = null;
      shaders.length = 0;
    };

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
          if (!shader) throw new Error("Shader allocation failed");
          shaders.push(shader);
          gl!.shaderSource(shader, source);
          gl!.compileShader(shader);
          if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
            throw new Error(gl!.getShaderInfoLog(shader) || "Shader compilation failed");
          }
          return shader;
        };

        const vertex = compile(gl.VERTEX_SHADER, MEDALLION_VERTEX);
        const fragment = compile(gl.FRAGMENT_SHADER, MEDALLION_FRAGMENT);
        program = gl.createProgram();
        buffer = gl.createBuffer();
        if (!program || !buffer) throw new Error("Renderer allocation failed");

        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program) || "Shader linking failed");
        }

        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        const pos = gl.getAttribLocation(program, "position");
        if (pos >= 0) {
          gl.enableVertexAttribArray(pos);
          gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
        }

        const names = [
          "time", "pixels", "tube", "flow", "dispersion", "glow", "warmth", "hover",
          "hoverTone", "hoverIntensity", "press", "response", "release", "pointer"
        ];
        for (const name of names) {
          uniforms[name] = gl.getUniformLocation(program, name);
        }
      }
    } catch (err) {
      console.warn("LiquidMedallion fallback active", err);
      cleanupGPU();
      gl = null;
    }

    const scalar = (name: string, val: number) => {
      if (gl && uniforms[name]) gl.uniform1f(uniforms[name], val);
    };

    const draw = () => {
      if (stopped || lost) return;
      const c = configRef.current;
      const size = bound(c.size, 24, 160);

      root.style.setProperty("--lmm-phase", `${phaseRef.current * 46 - 85}deg`);
      root.style.setProperty("--lmm-saturation", String(0.1 + bound(c.prism, 0, 1) * 1.7));

      if (!gl || !program) {
        showRenderer("fallback");
        return;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      scalar("pixels", canvas.width);
      scalar("time", phaseRef.current);
      scalar("tube", Math.min(0.14, Math.max(0.022, 5.2 / size)));
      scalar("flow", bound(c.flow, 0, 1.5));
      scalar("dispersion", bound(c.prism, 0, 1));
      scalar("glow", bound(c.glow ?? 0.5, 0, 1));
      scalar("warmth", 0.15); // Subtle warm copper reflect
      scalar("hover", c.still ? 0 : hover * bound(c.attraction, 0, 1));
      scalar("hoverTone", 1);
      scalar("hoverIntensity", 0.72);
      scalar("press", c.still ? 0 : pressure);
      scalar("response", 0.78);
      scalar("release", c.still ? 1 : release);

      if (uniforms.pointer) gl.uniform2f(uniforms.pointer, x, y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (gl.isContextLost()) {
        showRenderer("fallback");
        canvas.style.opacity = "0";
        return;
      }

      canvas.style.opacity = "1";
      showRenderer("webgl");
    };

    const tick = (now: number) => {
      frame = 0;
      if (stopped || lost || !visible || document.hidden) {
        last = 0;
        return;
      }

      const c = configRef.current;
      const dt = last ? Math.min((now - last) / 1000, 0.04) : 1 / 60;
      last = now;

      if (!c.pressed) suppressPress = false;

      if (c.still) {
        hover = pressure = 0;
        release = 1;
        draw();
        last = 0;
        return;
      }

      if (seenRelease !== releaseCount.current) {
        release = 0;
        seenRelease = releaseCount.current;
      }

      const k = 1 - Math.exp(-dt * 10);
      hover += ((c.active ? 1 : 0) - hover) * k;
      pressure += ((c.pressed && !suppressPress ? 1 : 0) - pressure) * (1 - Math.exp(-dt * 18));
      x += (tx - x) * k;
      y += (ty - y) * k;
      release = Math.min(1, release + dt * 1.35);

      phaseRef.current += dt * bound(c.speed, 0, 2);

      if (dirty || now - lastDraw >= 30 || release < 1 || Math.abs(pressure - (c.pressed ? 1 : 0)) > 0.005) {
        draw();
        lastDraw = now;
        dirty = false;
      }

      const evolving = c.speed > 0 || (c.pressed && !suppressPress) || release < 1 || Math.abs(hover - (c.active ? 1 : 0)) > 0.003 || pressure > 0.003;
      if (evolving) frame = requestAnimationFrame(tick);
      else last = 0;
    };

    function wake() {
      dirty = true;
      if (!frame && !stopped && !lost && visible && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    }
    wakeRef.current = wake;

    const resize = () => {
      const size = bound(configRef.current.size, 24, 160);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const px = Math.max(1, Math.min(512, Math.round(size * 1.2 * dpr)));
      if (canvas.width !== px || canvas.height !== px) {
        canvas.width = px;
        canvas.height = px;
      }
      if (!document.hidden && visible) draw();
      wake();
    };

    const pointerMove = (event: PointerEvent) => {
      const c = configRef.current;
      if (c.still || !c.active || event.pointerType === "touch") return;
      const box = root.getBoundingClientRect();
      if (!box.width || !box.height) return;
      tx = bound((event.clientX - box.left) / box.width * 2 - 1, -1.5, 1.5);
      ty = bound((event.clientY - box.top) / box.height * 2 - 1, -1.5, 1.5);
      wake();
    };

    document.addEventListener("pointermove", pointerMove as EventListener, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    resize();

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", pointerMove as EventListener);
      window.removeEventListener("resize", resize);
      cleanupGPU();
    };
  }, []);

  return (
    <span
      ref={rootRef}
      className="lm-medallion"
      data-renderer="pending"
      data-still={props.still}
      data-pressed={props.pressed}
      style={{
        width: displaySize,
        height: displaySize,
        borderRadius: "50%",
        position: "relative",
        display: "inline-grid",
        placeItems: "center",
        flexShrink: 0,
        isolation: "isolate",
        userSelect: "none",
        visibility: "hidden",
      }}
    >
      <style>{MEDALLION_CSS}</style>
      <span
        className="lmm-layer lmm-glass"
        aria-hidden="true"
        style={{
          position: "absolute",
          pointerEvents: "none",
          userSelect: "none",
          borderRadius: "50%",
          inset: "9.5%",
          background: "linear-gradient(140deg, rgba(255,255,255,0.16), transparent 48%, rgba(0,0,0,0.4)), #20242A",
          boxShadow: "inset 0 1px 3px rgba(255,255,255,0.25), inset 0 -1px 3px rgba(0,0,0,0.6), 0 5px 8px -3px rgba(0,0,0,0.38)",
        }}
      />
      <span
        className="lmm-layer lmm-torus"
        aria-hidden="true"
        style={{
          position: "absolute",
          pointerEvents: "none",
          userSelect: "none",
          borderRadius: "50%",
          visibility: "hidden",
          inset: Math.max(1, displaySize * 0.095 - thickness / 2),
          padding: thickness,
        }}
      />
      <canvas
        ref={canvasRef}
        className="lmm-layer"
        aria-hidden="true"
        width={1}
        height={1}
        style={{
          position: "absolute",
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
          borderRadius: "50%",
          visibility: "hidden",
          inset: "-10%",
          width: "120%",
          height: "120%",
          opacity: 0,
          filter: `brightness(${bound(props.brightness ?? 1.05, 0.4, 1.3)})`,
        }}
      />
      <span
        className="lmm-center"
        style={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          color: "#F8FAFC",
          filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))",
          pointerEvents: "none",
        }}
      >
        {props.children}
      </span>
    </span>
  );
}

export interface LiquidMarkProps {
  size?: number;
  imageSrc?: string;
  flow?: number;
  brightness?: number;
  style?: React.CSSProperties;
}

export default function LiquidMark({
  size = 46,
  imageSrc = "/ferrite-icon.svg",
  flow = 0.9,
  brightness = 1.05,
  style,
}: LiquidMarkProps) {
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(q.matches);
    update();
    q.addEventListener("change", update);
    const up = () => setPressed(false);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      q.removeEventListener("change", update);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  // Compute inner icon dimension dynamically to fit comfortably within the liquid metal aperture
  const innerSize = Math.max(20, Math.round(size * 0.62));

  return (
    <div
      aria-hidden="true"
      style={{
        ...style,
        position: "relative",
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
        userSelect: "none",
      }}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => {
        setActive(false);
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
    >
      <LiquidMedallion
        size={size}
        still={reduced}
        active={active}
        pressed={pressed}
        speed={0.8}
        flow={flow}
        prism={0.55}
        attraction={0.8}
        brightness={brightness}
        glow={0.25}
      >
        <div
          style={{
            width: innerSize,
            height: innerSize,
          }}
          className="relative flex items-center justify-center pointer-events-none select-none"
        >
          <img
            src={imageSrc}
            alt="Ferrite Structural Steels"
            width={innerSize}
            height={innerSize}
            className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transform transition-transform duration-300 group-hover:scale-105"
            loading="eager"
            decoding="async"
          />
        </div>
      </LiquidMedallion>
    </div>
  );
}

