"use client";

import { TextReveal } from "@/components/typography/text-reveal";
import Dot from "@/components/svg/dot";
import RevealImage from "@/components/ui/reveal-image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutView({ lang }: { lang: any }) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="md:min-h-screen w-full px-4 md:px-8 relative pt-24 pb-0 md:pt-24 md:pb-32 overflow-hidden"
    >
      {/* The design shows no visible section title, but the section still
          needs one so the document outline is not a flat list of divs. */}
      <h2 id="about-heading" className="sr-only">
        {lang.about_section.title}
      </h2>
      {/* Desktop Image */}
      <div className="hidden md:block w-[28vw] h-auto absolute top-3/4 left-24 -translate-y-1/2 aspect-3/4 overflow-hidden">
        <RevealImage
          src="/assets/images/achmad-daniel.webp"
          alt="Achmad Daniel Syahputra"
          width={1043}
          height={1508}
          // Quality 90: the source is already compressed by hand. Shown at
          // 28vw, scaled 125%
          quality={90}
          sizes="35vw"
          style={{ height: "auto" }}
          className="scale-125"
        />
      </div>

      <div className="hidden md:block absolute bottom-0 right-32 w-[18vw] h-[18vh]">
        <Dot />
      </div>

      {/* pointer-events-none: this text layer spans the section and would
          otherwise sit over the dots and swallow their hover */}
      <div className="pointer-events-none w-full flex justify-between relative z-10">
        <div className="w-[85%] md:w-2/5 h-full"></div>
        <div className="flex flex-col">
          {/* Desktop Text */}
          <TextReveal className="hidden md:block max-w-[56vw] text-[clamp(1.2rem,4vw,3.5rem)] leading-[1.2]">
            {lang.about_section.paragraph}
          </TextReveal>

          {/* Mobile Text */}
          <p className="mt-10 md:hidden text-4xl px-4 tracking-tight font-normal text-pretty">
            {lang.about_section.paragraph}
          </p>
        </div>
      </div>
      <div className="md:hidden flex flex-col w-full">
        <div className="mt-12 w-50 self-end">
          <Dot />
        </div>

        {/* Mobile Image */}
        <div className="relative mt-12 w-55 aspect-2/3 overflow-hidden">
          <RevealImage
            src="/assets/images/achmad-daniel.webp"
            alt="Achmad Daniel Syahputra"
            width={1043}
            height={1508}
            quality={90}
            sizes="275px"
            className="size-full object-cover scale-125"
          />
        </div>
      </div>
    </section>
  );
}
