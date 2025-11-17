"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useRef,
  useLayoutEffect,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Plugin GSAP
gsap.registerPlugin(ScrollTrigger);

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollProgress = useMotionValue(0);

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }
  const words = children.split(" ");

  useLayoutEffect(() => {
    const smootherReady = ScrollTrigger.getAll().find((st) => st.scroller);

    const setup = () => {
      if (containerRef.current && textContainerRef.current) {
        const tl = ScrollTrigger.create({
          trigger: containerRef.current,
          pin: textContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            scrollProgress.set(self.progress);
          },
        });

        // Cleanup
        return () => {
          tl.kill();
        };
      }
    };

    if (smootherReady) {
      setup();
    } else {
      setTimeout(setup, 100);
    }
  }, [scrollProgress]);

  return (
    <div ref={containerRef} className={cn("relative h-[200vh]", className)}>
      <div
        ref={textContainerRef}
        className={
          "flex h-screen items-center justify-center bg-transparent py-[5rem]"
        }
      >
        <span className={"flex flex-wrap p-0 text-white/20 md:py-8"}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }} className={"text-white"}>
        {children}
      </motion.span>
    </span>
  );
};
