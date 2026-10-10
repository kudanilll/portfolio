/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { bebasNeue } from "@/common/font";
import gsap from "gsap";
import { inOwnTask } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const roles = [
  { field: "FRONTEND", title: "SPECIALIST", className: "" },
  {
    field: "ANDROID",
    title: "ENGINEER",
    className: "text-right text-white/50",
  },
  {
    field: "CREATIVE",
    title: "DEVELOPER",
    className: "md:ml-[10%] text-lime-400",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ServicesView({ lang }: { lang: any }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    // Below the fold: set up after hydration, in a task of its own
    (_, contextSafe) =>
      inOwnTask(
        contextSafe!(() => {
          const section = sectionRef.current;
          if (!section) return;

          const media = gsap.matchMedia();

          // Characters slide in skewed from their heading's side (FRONTEND and
          // CREATIVE from the left, ANDROID from the right), staggered per line:
          // on mobile each word is a line, on desktop the whole heading is.
          // The left-side version mirrors the right one (skew and stagger order).
          // Each line scrubs over its own scroll range, so the reveal happens
          // while that line is on screen.
          media.add(
            {
              isMobile: "(max-width: 767.98px)",
              isDesktop: "(min-width: 768px)",
              reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
              const { isMobile, reduceMotion } = context.conditions!;
              if (reduceMotion) return;

              gsap.utils.toArray<HTMLElement>("h2", section).forEach((heading, index) => {
                const fromLeft = index % 2 === 0;
                const lines = isMobile
                  ? gsap.utils.toArray<HTMLElement>(":scope > span", heading)
                  : [heading];
                // Created inside matchMedia, so it is reverted on breakpoint change
                // inline-block: transforms (slide + skew) don't apply to inline spans
                const { chars } = SplitText.create(heading, {
                  type: "words,chars",
                  tag: "span",
                  wordsClass: "inline-block",
                  charsClass: "inline-block",
                });

                lines.forEach((line) => {
                  gsap.fromTo(
                    chars.filter((char) => line.contains(char)),
                    {
                      // % of each glyph's width, so the travel scales with the type
                      xPercent: fromLeft ? -150 : 150,
                      skewX: fromLeft ? -20 : 20,
                      opacity: 0,
                    },
                    {
                      xPercent: 0,
                      skewX: 0,
                      opacity: 1,
                      duration: 0.65,
                      ease: "power3.out",
                      stagger: { each: 0.05, from: fromLeft ? "end" : "start" },
                      scrollTrigger: {
                        trigger: line,
                        start: "top 90%",
                        end: "top 45%",
                        scrub: true,
                      },
                    },
                  );
                });
              });
            },
          );
        }),
      ),
    { scope: sectionRef },
  );

  return (
    // One composition scaled to the viewport: the type is sized in vw, the
    // indent in % and the line pitch in em, so nothing is fixed in px.
    // Mobile: each role breaks onto two lines like a poster. The widest word,
    // "DEVELOPER", is ~3.18em, so 28% of the padded width keeps it at ~89% of
    // the line. From md the size matches the approved 1920px layout and stops
    // growing at 14rem. Kerning is off so the per-character split
    // (SplitText) does not shift the letters when it kicks in.
    <section
      ref={sectionRef}
      id="services"
      className={`${bebasNeue.className} px-4 md:px-8 flex flex-col justify-center gap-[0.3em] md:gap-0 w-full h-screen overflow-hidden uppercase [font-kerning:none] tracking-tight leading-[0.86] text-nowrap text-[calc((100vw-2rem)*0.28)] md:text-[min(11.6vw,14rem)]`}
    >
      {roles.map(({ field, title, className }) => (
        <h2 key={field} className={className}>
          <span className="max-md:block">{field}</span>{" "}
          <span className="max-md:block">{title}</span>
        </h2>
      ))}
    </section>
  );
}
