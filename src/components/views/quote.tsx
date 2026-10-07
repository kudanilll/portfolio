"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
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
        // inline-block: transforms don't apply to inline spans
        const { chars } = SplitText.create(text, {
          type: "chars, words",
          tag: "span",
          wordsClass: "inline-block",
          charsClass: "inline-block",
        });

        // The slide stops with the closing ✦ in the middle of the screen.
        // offsetLeft ignores transforms, so a refresh mid-scroll still works.
        // The ✦ is looked up here, not via a ref: SplitText rebuilds the
        // nested <span>, so a ref taken before the split points at a
        // detached node.
        const starCenter = () => {
          const star = text.querySelector<HTMLElement>("[data-star]")!;
          return star.offsetLeft + star.offsetWidth / 2;
        };

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

        chars.forEach((char) => {
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
    <div
      ref={rootRef}
      className="relative flex min-h-svh w-full items-center overflow-hidden"
    >
      <p
        ref={textRef}
        data-quote
        // Padding is split by motion-reduce/motion-safe so a breakpoint
        // padding (md:px-8) can't override the off-screen start
        className="text-[26vw] leading-[1.1] tracking-tight md:text-[clamp(3rem,15vw,18rem)] motion-reduce:px-4 md:motion-reduce:px-8 motion-safe:flex motion-safe:w-max motion-safe:gap-[0.4em] motion-safe:whitespace-nowrap motion-safe:pl-[100vw]"
      >
        {lang.quote_section.quote}{" "}
        <span data-star className="text-lime-400">
          ✦
        </span>
      </p>
    </div>
  );
}
