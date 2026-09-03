"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface DockTextProps {
  text: string;
  down?: boolean;
  className?: string;
}

export function DockText({ text, down = false, className }: DockTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const letters = letterRefs.current;
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;

    let closestIndex = 0;
    let minDistance = Infinity;

    letters.forEach((letter, index) => {
      if (!letter) return;
      const letterRect = letter.getBoundingClientRect();
      const letterCenterX =
        letterRect.left + letterRect.width / 2 - containerRect.left;
      const distance = Math.abs(mouseX - letterCenterX);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    letters.forEach((letter, index) => {
      if (!letter) return;
      const distFromClosest = Math.abs(index - closestIndex);
      const targetScale = Math.max(1, 1.3638 - distFromClosest * 0.1);
      gsap.to(letter, {
        scaleY: targetScale,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  const handleMouseLeave = () => {
    const letters = letterRefs.current;
    letters.forEach((letter) => {
      if (!letter) return;
      gsap.to(letter, {
        scaleY: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  return (
    <h1
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("cursor-pointer", className)}
    >
      {text.split("").map((letter, index) => (
        <span
          key={index}
          ref={(el) => {
            letterRefs.current[index] = el;
          }}
          style={{
            display: "inline-block",
            transformOrigin: down ? "top" : "bottom",
          }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
}
