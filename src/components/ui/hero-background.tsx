"use client";

import { useEffect, useRef } from "react";

type Quad = ReturnType<typeof import("@/lib/gl").createQuad>;

// Dark liquid marble that slowly drifts: domain-warped noise
// (iquilezles.org/articles/warp), with glossy highlights along the bands of
// the warped field. Drawn, not downloaded: no image behind the hero.
const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAspect;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.6, 1.2, -1.2, 1.6) * p;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 1.9;
    float t = uTime * 0.03;

    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(p + 4.0 * q + vec2(1.7, 9.2) + t),
      fbm(p + 4.0 * q + vec2(8.3, 2.8) - t)
    );
    float f = fbm(p + 4.0 * r);

    float gloss = pow(0.5 + 0.5 * sin(f * 11.0 + r.x * 3.0), 6.0);
    float shade = 0.03 + 0.4 * f * f + 0.9 * gloss * length(r);
    gl_FragColor = vec4(vec3(shade), 1.0);
  }
`;

/** Animated marble behind the hero; one still frame with reduced motion. */
export default function HeroBackground({ className }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;

    const uniforms = { uTime: { value: 0 }, uAspect: { value: 1 } };
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let quad: Quad | undefined;
    let frame = 0;
    let last = 0;
    let visible = false;
    let disposed = false;

    // ~30fps is plenty for a slow drift, and it only runs while on screen
    const loop = (time: number) => {
      frame = 0;
      if (!visible || !quad) return;
      if (time - last > 30) {
        last = time;
        uniforms.uTime.value = time / 1000;
        quad.render();
      }
      frame = requestAnimationFrame(loop);
    };

    const resize = new ResizeObserver(() => {
      quad?.setSize(box.clientWidth, box.clientHeight);
      uniforms.uAspect.value = box.clientWidth / box.clientHeight;
      quad?.render();
    });
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !still;
      if (visible && !frame) frame = requestAnimationFrame(loop);
    });

    // Loaded and compiled once the page is idle, so the shader never
    // competes with the first load; it fades in over the dark hero
    const start = async () => {
      const { createQuad } = await import("@/lib/gl");
      if (disposed) return;
      try {
        // Half resolution: the swirls are soft, and the GPU does a quarter
        // of the work
        quad = createQuad(canvas, fragment, uniforms, { dpr: 0.5 });
      } catch {
        return; // No hardware WebGL: the hero keeps its plain dark background
      }
      resize.observe(box); // reports the size at once: first frame drawn
      onScreen.observe(box);
      canvas.style.opacity = "1";
    };
    // Safari has no requestIdleCallback
    const hasIdle = typeof requestIdleCallback === "function";
    const idle = hasIdle
      ? requestIdleCallback(() => void start(), { timeout: 3000 })
      : window.setTimeout(() => void start(), 1000);

    return () => {
      disposed = true;
      if (hasIdle) cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(frame);
      resize.disconnect();
      onScreen.disconnect();
      quad?.dispose();
    };
  }, []);

  return (
    <div ref={boxRef} aria-hidden="true" className={className}>
      <canvas
        ref={canvasRef}
        className="block opacity-0 transition-opacity duration-1000"
      />
    </div>
  );
}
