/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { bebasNeue } from "@/common/font";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ServicesView({ lang }: { lang: any }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("h2", {
          xPercent: (index) => (index % 2 === 0 ? -100 : 100),
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.16,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="px-4 md:px-8 flex flex-col justify-center gap-48 w-full h-screen overflow-hidden"
    >
      <h2
        className={`${bebasNeue.className} uppercase md:text-[clamp(4rem,14vw,14rem)] tracking-tight leading-0 text-nowrap`}
      >
        FRONTEND DEVELOPER
      </h2>
      <h2
        className={`${bebasNeue.className} uppercase text-right md:text-[clamp(4rem,14vw,14rem)] tracking-tight leading-0 text-nowrap text-white/50`}
      >
        ANDROID DEVELOPER
      </h2>
      <h2
        className={`${bebasNeue.className} uppercase text-lime-400 ml-48 md:text-[clamp(4rem,14vw,14rem)] tracking-tight leading-0 text-nowrap`}
      >
        CREATIVE DEVELOPER
      </h2>
    </section>
  );
}
