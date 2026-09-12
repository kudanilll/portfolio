"use client";

import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "@/data/works";
import { useGSAP } from "@gsap/react";
import WorkImage from "@/components/ui/work-image";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type WorksViewProps = {
  lang: {
    lang: string;
    works_section: { title: string };
  };
};

export default function WorksView({ lang }: WorksViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const locale = lang.lang === "id" ? "id" : "en";

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(track, { x: () => -distance(), ease: "none" });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative h-dvh w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      <h2 className="pointer-events-none absolute left-8 top-[8vh] z-0 max-w-[90vw] md:text-[6vw] tracking-tight text-white/20">
        {lang.works_section.title}
      </h2>

      <div className="h-full overflow-x-auto overflow-y-hidden no-scrollbar md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full w-max snap-x snap-mandatory items-center gap-[15vw] px-[14vw] md:gap-[20vw] md:px-[20vw]"
        >
          {works.map((work, index) => (
            <article
              key={work.id}
              className={`w-[72vw] min-w-62.5 max-w-105 shrink-0 snap-center md:w-[40vmin] ${index % 2 === 0 ? "md:translate-y-[12vh]" : "md:translate-y-[-4vh]"}`}
            >
              <a
                href={work.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${work.title}: ${work.description[locale]}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a]"
              >
                <figure className="relative aspect-11/15 overflow-hidden">
                  <WorkImage
                    src={work.image}
                    hoverSrc={work.hoverImage}
                    alt={work.description[locale]}
                  />
                </figure>

                <div className="relative -mt-16 text-white">
                  <h3 className="ml-[-8%] text-[16vw] leading-none tracking-tight md:ml-[-35%] md:text-[6vw]">
                    {work.title}
                  </h3>
                  <div className="mt-4 ml-[7%] flex items-center gap-3 text-base tracking-wide md:ml-[-10%]">
                    <span className="border-b border-current pb-1">
                      {work.category}
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
