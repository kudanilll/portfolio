"use client";

import {
  ComponentPropsWithoutRef,
  FC,
  useRef,
  useEffect,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }
  const words = children.split(" ");

  useEffect(() => {
    if (!containerRef.current || !textContainerRef.current) return;

    const ctx = gsap.context(() => {
      const activeWordElements = wordRefs.current.filter(Boolean);

      gsap.fromTo(
        activeWordElements,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: textContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <div ref={containerRef} className={cn("relative h-[200vh]", className)}>
      <div
        ref={textContainerRef}
        className="flex h-screen items-center justify-center bg-transparent py-[5rem]"
      >
        <span className="flex flex-wrap p-0 text-white/20 md:py-8">
          {words.map((word, i) => (
            <span key={i} className="relative mx-1 lg:mx-1.5">
              <span className="absolute opacity-20">{word}</span>
              <span
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="text-white inline-block opacity-20"
              >
                {word}
              </span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};
