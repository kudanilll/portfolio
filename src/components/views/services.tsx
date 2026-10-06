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
    // One composition scaled to the viewport: the type is sized in vw, the
    // indent in % and the line pitch in em, so nothing is fixed in px. The
    // longest line ("FRONTEND DEVELOPER") is ~6.2em wide, so 13vw still fits a
    // 320px phone; from md the size matches the approved 1920px layout and
    // stops growing at 14rem.
    <section
      ref={sectionRef}
      id="services"
      className={`${bebasNeue.className} px-4 md:px-8 flex flex-col justify-center w-full h-screen overflow-hidden uppercase tracking-tight leading-[0.86] text-nowrap text-[13vw] md:text-[min(11.6vw,14rem)]`}
    >
      <h2>FRONTEND DEVELOPER</h2>
      <h2 className="text-right text-white/50">ANDROID DEVELOPER</h2>
      <h2 className="ml-[10%] text-lime-400">CREATIVE DEVELOPER</h2>
    </section>
  );
}
