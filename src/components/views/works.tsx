"use client";

import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "@/data/works";
import { useGSAP } from "@gsap/react";
import { LinkButton } from "@/components/ui/link-button";
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const locale = lang.lang === "id" ? "id" : "en";

  useGSAP(
    () => {
      const root = rootRef.current;
      const title = titleRef.current;
      const track = trackRef.current;
      if (!root || !title || !track) return;

      // Desktop: the title fills white from left to right (--fill) with the
      // pinned horizontal scroll. Mobile keeps it plain white (--fill: 100%).
      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        // The pin outlasts the horizontal scroll by one screen, so the last
        // card holds in place for a beat before the next section comes up.
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight}`,
          pin: true,
          invalidateOnRefresh: true,
        });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(track, { x: () => -distance() })
          .to(title, { "--fill": "100%" }, 0);
      });

      // Mobile cards reveal as they scroll in: a lime panel wipes up from the
      // bottom (clip-path), the image follows over it while zooming out, then
      // the caption rises in.
      media.add(
        "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
        () => {
          const hidden = { clipPath: "inset(100% 0% 0% 0%)" };
          const shown = { clipPath: "inset(0% 0% 0% 0%)" };

          gsap.utils.toArray<HTMLElement>("article", track).forEach((article) => {
            const panel = article.querySelector("[data-reveal-panel]");
            const image = article.querySelector("[data-reveal-panel] + *");
            const img = image?.querySelector("img");
            const caption = article.querySelector("figure + div");
            if (!panel || !image || !img || !caption) return;

            gsap
              .timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: article,
                  // Spread over most of the screen, eased a little, so the
                  // reveal does not rush by
                  start: "top bottom",
                  end: "top 15%",
                  scrub: 0.5,
                },
              })
              .fromTo(panel, hidden, shown)
              .fromTo(image, hidden, shown, 0.25)
              .fromTo(img, { scale: 1.25 }, { scale: 1 }, 0.25)
              .fromTo(
                caption,
                { yPercent: 40, opacity: 0 },
                { yPercent: 0, opacity: 1, ease: "power2.out" },
                0.55,
              );
          });
        },
      );

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    // Mobile: a vertical list, clipped sideways so nothing scrolls horizontally
    <div
      ref={rootRef}
      className="relative w-full overflow-x-clip bg-[#0a0a0a] text-white md:h-dvh md:overflow-hidden"
    >
      {/* md:contents drops this wrapper's box on desktop */}
      <div className="px-4 pt-12 pb-2 md:contents">
        {/* 12vw keeps the longer "Pekerjaan pilihan" (~6.8em) on one line */}
        <h2
          ref={titleRef}
          className="pointer-events-none text-[12vw] md:absolute md:left-8 md:top-[8vh] md:z-0 md:max-w-[90vw] md:text-[6vw] tracking-tight [--fill:100%] md:[--fill:0%] bg-[linear-gradient(90deg,#fff_var(--fill),rgb(255_255_255/0.2)_var(--fill))] bg-clip-text text-transparent"
        >
          {lang.works_section.title}
        </h2>
      </div>

      <div className="md:h-full md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-20 px-4 pt-6 pb-24 md:h-full md:w-max md:flex-row md:items-center md:gap-[20vw] md:px-[20vw] md:py-0"
        >
          {works.map((work, index) => (
            <article
              key={work.id}
              className={`w-[80%] min-w-62.5 max-w-105 shrink-0 md:w-[40vmin] md:self-auto ${index % 2 === 0 ? "self-start md:translate-y-[12vh]" : "self-end md:translate-y-[-4vh]"}`}
            >
              <a
                href={work.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${work.title}: ${work.description[locale]}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a]"
              >
                <figure className="relative aspect-11/15 overflow-hidden">
                  {/* Mobile reveal: lime panel shown before the image */}
                  <div
                    data-reveal-panel
                    aria-hidden="true"
                    className="absolute inset-0 bg-lime-400 md:hidden"
                  />
                  <WorkImage
                    src={work.image}
                    hoverSrc={work.hoverImage}
                    alt={work.description[locale]}
                  />
                </figure>

                <div className="relative -mt-16 text-white">
                  {/* Mobile: caption leans toward the screen center (zigzag) */}
                  <h3
                    className={`text-[16vw] leading-none tracking-tight md:ml-[-35%] md:mr-0 md:text-left md:text-[6vw] ${index % 2 === 0 ? "ml-[8%]" : "mr-[8%] text-right"}`}
                  >
                    {work.title}
                  </h3>
                  {/* No onClick: renders a label driven by the card link's hover */}
                  <LinkButton
                    className={`mt-2 text-xl md:ml-[-10%] md:mr-0 opacity-75 group-hover:opacity-100 ${index % 2 === 0 ? "ml-[8%]" : "ml-auto mr-[8%]"}`}
                  >
                    {work.category}
                  </LinkButton>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
