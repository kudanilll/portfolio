"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { sparklePath } from "@/components/svg/sparkle";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type QuoteViewProps = {
  lang: { quote_section: { quote: string } };
};

export default function QuoteView({ lang }: QuoteViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const text = textRef.current;
      if (!root || !text) return;

      const media = gsap.matchMedia();

      // The section pins while the one-line text slides in from the right;
      // each character starts scattered (random height and tilt) and drops
      // into the line as it crosses the screen (containerAnimation).
      media.add("(prefers-reduced-motion: no-preference)", () => {
        // inline-block: transforms don't apply to inline spans. The SVG star
        // is left out of the split and scattered like a character below.
        const { chars } = SplitText.create(text, {
          type: "chars, words",
          tag: "span",
          wordsClass: "inline-block",
          charsClass: "inline-block",
          ignore: "[data-star]",
        });
        const star = text.querySelector<HTMLElement>("[data-star]")!;

        // The slide stops with the closing star in the middle of the screen.
        // offsetLeft ignores transforms, so a refresh mid-scroll still works.
        const starCenter = () => star.offsetLeft + star.offsetWidth / 2;

        const scrollTween = gsap.to(text, {
          x: () => window.innerWidth / 2 - starCenter(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            pin: true,
            end: "+=5000px",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        [...chars, star].forEach((char) => {
          gsap.from(char, {
            yPercent: "random(-200, 200)",
            rotation: "random(-20, 20)",
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: "left 100%",
              // Land by the middle of the screen, where the ✦ comes to rest
              end: "left 50%",
              scrub: 1,
            },
          });
        });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    // With motion the text is one long line that starts just off screen
    // (pl-[100vw]); with reduced motion it simply wraps and stays put.
    // min-h-lvh, not svh: this is the last section, so the page ends with it.
    // When a phone hides its address bar the screen grows, and with an
    // svh-tall section the page would end ~56px before the pin does, leaving
    // the slide unfinished (the ✦ short of the centre).
    <div
      ref={rootRef}
      className="relative flex min-h-lvh w-full items-center overflow-hidden"
    >
      <p
        ref={textRef}
        data-quote
        // Padding is split by motion-reduce/motion-safe so a breakpoint
        // padding (md:px-8) can't override the off-screen start
        className="text-[26vw] leading-[1.1] tracking-tight md:text-[clamp(3rem,13vw,15rem)] motion-reduce:px-4 md:motion-reduce:px-8 motion-safe:flex motion-safe:w-max motion-safe:gap-[0.4em] motion-safe:whitespace-nowrap motion-safe:pl-[100vw]"
      >
        {lang.quote_section.quote}{" "}
        {/* An SVG rather than the "✦" character: the font has no ✦ glyph,
            and the fallback each phone uses draws it off-centre in its box,
            so the star would not finish in the middle of the screen */}
        <span
          data-star
          className="inline-block self-center align-middle text-lime-400"
        >
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="block size-[0.8em]"
          >
            <path d={sparklePath} fill="currentColor" />
          </svg>
        </span>
      </p>
    </div>
  );
}
