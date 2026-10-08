"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const COLS = 14;
const ROWS = 9;
const RADIUS = 0.9;
/** How far (in viewBox units) the pointer reaches into the grid. */
const REACH = 22;

const dots = Array.from({ length: COLS * ROWS }, (_, i) => ({
  cx: RADIUS + (i % COLS) * 8.354,
  cy: RADIUS + Math.floor(i / COLS) * 6.8375,
}));

/**
 * A 14 x 9 grid of lime dots. Dots near the pointer swell, less with
 * distance, and settle back when it leaves.
 */
export default function Dot() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const circles = gsap.utils.toArray<SVGCircleElement>("circle", svg);
      // The pointer (in viewBox units) and how strongly it pulls, eased by
      // quickTo; every update redraws the radii. Radii, not transforms: the
      // dots stay crisp vectors.
      const pointer = { x: 0, y: 0, strength: 0 };
      const draw = () =>
        circles.forEach((circle, i) => {
          const distance = Math.hypot(dots[i].cx - pointer.x, dots[i].cy - pointer.y);
          const near = Math.max(0, 1 - distance / REACH);
          circle.setAttribute("r", String(RADIUS * (1 + near * pointer.strength * 2.2)));
        });
      const ease = { duration: 0.4, ease: "power3.out", onUpdate: draw };
      const xTo = gsap.quickTo(pointer, "x", ease);
      const yTo = gsap.quickTo(pointer, "y", ease);
      const strengthTo = gsap.quickTo(pointer, "strength", ease);

      const toViewBox = (event: PointerEvent) =>
        new DOMPoint(event.clientX, event.clientY).matrixTransform(
          svg.getScreenCTM()!.inverse(),
        );
      const enter = (event: PointerEvent) => {
        const { x, y } = toViewBox(event);
        xTo(x, x); // start where the pointer came in, no sweep across
        yTo(y, y);
        strengthTo(1);
      };
      const move = (event: PointerEvent) => {
        const { x, y } = toViewBox(event);
        xTo(x);
        yTo(y);
      };
      const leave = () => strengthTo(0);

      svg.addEventListener("pointerenter", enter);
      svg.addEventListener("pointermove", move);
      svg.addEventListener("pointerleave", leave);
      return () => {
        svg.removeEventListener("pointerenter", enter);
        svg.removeEventListener("pointermove", move);
        svg.removeEventListener("pointerleave", leave);
      };
    },
    { scope: svgRef },
  );

  return (
    <svg ref={svgRef} viewBox="0 0 111 57" aria-hidden="true" className="text-lime-400">
      {dots.map(({ cx, cy }) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={RADIUS} fill="currentColor" />
      ))}
    </svg>
  );
}
