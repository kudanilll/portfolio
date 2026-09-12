"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Mesh, Program, Renderer, Texture, Triangle, Vec2 } from "ogl";
import Image from "next/image";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform sampler2D uMap;
  uniform sampler2D uHoverMap;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uMapRatio;
  uniform vec2 uHoverRatio;
  varying vec2 vUv;

  float random(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(mix(random(i), random(i + vec3(1.0, 0.0, 0.0)), f.x),
          mix(random(i + vec3(0.0, 1.0, 0.0)), random(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
      mix(mix(random(i + vec3(0.0, 0.0, 1.0)), random(i + vec3(1.0, 0.0, 1.0)), f.x),
          mix(random(i + vec3(0.0, 1.0, 1.0)), random(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
      f.z
    );
  }

  void main() {
    vec2 mapUv = (vUv - 0.5) * uMapRatio + 0.5;
    vec2 hoverUv = (vUv - 0.5) * uHoverRatio + 0.5;
    float distortion = noise(vec3(vUv * 7.0, uTime * 0.35));
    float radius = mix(-0.12, 1.15, uProgress);
    float mask = 1.0 - smoothstep(radius - 0.12, radius + 0.08, distance(vUv, uMouse) + distortion * 0.1);

    hoverUv += (distortion - 0.5) * 0.08 * uProgress;
    vec4 base = texture2D(uMap, mapUv);
    vec4 hover = texture2D(uHoverMap, hoverUv);
    gl_FragColor = mix(base, hover, mask);
  }
`;

const getCoverRatio = (
  width: number,
  height: number,
  image: HTMLImageElement,
) => {
  const containerRatio = width / height;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  return containerRatio > imageRatio
    ? new Vec2(1, imageRatio / containerRatio)
    : new Vec2(containerRatio / imageRatio, 1);
};

export default function WorkImage({
  src,
  hoverSrc,
  alt,
}: {
  src: string;
  hoverSrc: string;
  alt: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const canvas = canvasRef.current;
      if (
        !root ||
        !canvas ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      let disposed = false;
      let frame = 0;
      let running = false;
      let hoverTween: gsap.core.Tween | undefined;
      let renderer: Renderer | undefined;
      let geometry: Triangle | undefined;
      let program: Program | undefined;
      const progress = { value: 0 };
      const optimized = (path: string) =>
        `/_next/image?url=${encodeURIComponent(path)}&w=1080&q=75`;
      const loadImage = (path: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new window.Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = optimized(path);
        });

      const setup = async () => {
        try {
          const [baseImage, hoverImage] = await Promise.all([
            loadImage(src),
            loadImage(hoverSrc),
          ]);
          if (disposed) return;

          renderer = new Renderer({
            canvas,
            alpha: true,
            dpr: Math.min(window.devicePixelRatio, 2),
          });
          const gl = renderer.gl;
          const map = new Texture(gl, {
            image: baseImage,
            generateMipmaps: false,
            minFilter: gl.LINEAR,
          });
          const hoverMap = new Texture(gl, {
            image: hoverImage,
            generateMipmaps: false,
            minFilter: gl.LINEAR,
          });
          const uniforms = {
            uMap: { value: map },
            uHoverMap: { value: hoverMap },
            uProgress: progress,
            uTime: { value: 0 },
            uMouse: { value: new Vec2(0.5, 0.5) },
            uMapRatio: { value: new Vec2(1, 1) },
            uHoverRatio: { value: new Vec2(1, 1) },
          };

          geometry = new Triangle(gl);
          program = new Program(gl, {
            vertex,
            fragment,
            uniforms,
            depthTest: false,
            depthWrite: false,
          });
          const mesh = new Mesh(gl, { geometry, program });

          const render = (time = performance.now()) => {
            frame = 0;
            uniforms.uTime.value = time * 0.001;
            renderer?.render({ scene: mesh });
            if (running) frame = requestAnimationFrame(render);
          };
          const resize = () => {
            const { width, height } = root.getBoundingClientRect();
            renderer?.setSize(width, height);
            uniforms.uMapRatio.value = getCoverRatio(width, height, baseImage);
            uniforms.uHoverRatio.value = getCoverRatio(
              width,
              height,
              hoverImage,
            );
            render();
          };
          const resizeObserver = new ResizeObserver(resize);
          const enter = () => {
            running = true;
            if (!frame) frame = requestAnimationFrame(render);
            hoverTween = gsap.to(progress, {
              value: 1,
              duration: 0.8,
              ease: "power2.inOut",
              overwrite: true,
            });
          };
          const leave = () => {
            hoverTween = gsap.to(progress, {
              value: 0,
              duration: 0.8,
              ease: "power2.inOut",
              overwrite: true,
              onComplete: () => {
                running = false;
              },
            });
          };
          const move = (event: PointerEvent) => {
            const bounds = root.getBoundingClientRect();
            uniforms.uMouse.value.set(
              (event.clientX - bounds.left) / bounds.width,
              1 - (event.clientY - bounds.top) / bounds.height,
            );
          };

          resizeObserver.observe(root);
          root.addEventListener("pointerenter", enter);
          root.addEventListener("pointerleave", leave);
          root.addEventListener("pointermove", move);
          resize();
          gsap.set(canvas, { opacity: 1 });

          // ponytail: Keep cleanup beside async setup; one WebGL context per card is enough for this four-item gallery.
          cleanupAsync = () => {
            resizeObserver.disconnect();
            root.removeEventListener("pointerenter", enter);
            root.removeEventListener("pointerleave", leave);
            root.removeEventListener("pointermove", move);
            gl.deleteTexture(map.texture);
            gl.deleteTexture(hoverMap.texture);
          };
        } catch {
          // The Next.js image remains visible when WebGL or texture loading fails.
        }
      };

      let cleanupAsync = () => {};
      void setup();

      return () => {
        disposed = true;
        running = false;
        cancelAnimationFrame(frame);
        hoverTween?.kill();
        cleanupAsync();
        geometry?.remove();
        program?.remove();
        renderer?.gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    },
    { scope: rootRef, dependencies: [src, hoverSrc], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="relative size-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 72vw, 40vmin"
        className="object-cover"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full opacity-0"
      />
    </div>
  );
}
