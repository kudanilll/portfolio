"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { expertise } from "@/data/expertise";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

type ExpertiseViewProps = {
  lang: { expertise_section: { title: string } };
};

export default function ExpertiseView({ lang }: ExpertiseViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const starPathRef = useRef<SVGPathElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const star = starRef.current;
      const starPath = starPathRef.current;
      const media = gsap.matchMedia();

      // The lime star next to the title draws its outline, fills in, then
      // keeps spinning slowly (paused while off screen to save frames).
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (!star || !starPath) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: star,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          })
          .fromTo(
            starPath,
            { drawSVG: "0%", fillOpacity: 0 },
            { drawSVG: "100%", duration: 1.2, ease: "power2.inOut" },
          )
          .to(
            starPath,
            { fillOpacity: 1, duration: 0.4, ease: "power1.out" },
            "-=0.3",
          );

        const spin = gsap.to(star, {
          rotation: 360,
          duration: 10,
          ease: "none",
          repeat: -1,
          paused: true,
        });
        ScrollTrigger.create({
          trigger: star,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? spin.play() : spin.pause()),
        });
      });

      // Touch screens have no hover, so the item crossing the middle of the
      // screen lights up lime instead (data-active), following the scroll.
      media.add("(hover: none)", () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-tech]",
          listRef.current,
        );

        items.forEach((item) => {
          ScrollTrigger.create({
            // The <li> is exactly one line tall; the inline span's box is
            // taller and overlaps the next line, lighting up two at once
            trigger: item.parentElement,
            start: "top center",
            end: "bottom center",
            onToggle: (self) =>
              item.toggleAttribute("data-active", self.isActive),
          });
        });

        return () =>
          items.forEach((item) => item.removeAttribute("data-active"));
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="flex min-h-screen flex-col px-4 pt-12 pb-24 md:px-8 md:pt-[8vh] md:pb-32"
    >
      {/* Same title treatment and spot as "Selected works" */}
      <h2 className="flex items-center gap-[0.2em] text-[12vw] tracking-tight md:text-[6vw]">
        {lang.expertise_section.title}
        {/* Same four-point star as the hero's lime ✦ */}
        <svg
          ref={starRef}
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="size-[0.8em] shrink-0 overflow-visible text-lime-400"
        >
          <path
            ref={starPathRef}
            d="M50 2C54 36 64 46 98 50C64 54 54 64 50 98C46 64 36 54 2 50C36 46 46 36 50 2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </h2>

      {/* Same dimmed white as the unfilled "Selected works" title; on mobile
          the same size as the title too. Each "/" sits in the gap after its
          item. The last item of every line ends flush with the right edge, so
          its "/" falls outside the list and overflow-x-clip hides it: a "/"
          only ever shows between two items on the same line. */}
      <ul
        ref={listRef}
        className="my-auto ml-auto flex flex-wrap justify-end gap-x-[0.8em] overflow-x-clip pt-12 text-right text-[10vw] leading-[1.1] tracking-tight text-white/20 md:max-w-[80vw] md:pt-16 md:text-[4.5vw]"
      >
        {expertise.map((name) => (
          <li key={name} className="relative">
            <span
              data-tech
              className="transition-colors duration-300 hover:text-lime-400 data-active:text-lime-400"
            >
              {name}
            </span>
            <span
              aria-hidden="true"
              className="absolute top-0 left-full w-[0.8em] text-center"
            >
              /
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
