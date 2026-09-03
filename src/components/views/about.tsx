"use client";

import { TextReveal } from "@/components/typography/text-reveal";
import Dot from "@/components/svg/dot";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutView({ lang }: { lang: any }) {
  return (
    <section
      id="about"
      className="md:min-h-screen w-full px-4 md:px-8 relative pt-24 pb-0 md:pt-24 md:pb-24"
    >
      {/* Desktop Image */}
      <div className="hidden md:block w-[28vw] h-auto absolute top-3/4 left-24 -translate-y-1/2 aspect-[3/4] overflow-hidden">
        <Image
          src="/assets/images/achmad-daniel.webp"
          alt="Achmad Daniel Syahputra"
          width={500}
          height={500}
          className="grayscale scale-125"
        />
      </div>

      <div className="hidden md:block absolute bottom-0 right-32 w-[18vw] h-[18vh]">
        <Dot />
      </div>

      <div className="w-full flex justify-between">
        <div className="w-[85%] md:w-2/5 h-full"></div>
        <div className="flex flex-col">
          {/* Desktop Text */}
          <TextReveal className="hidden md:block max-w-[56vw] text-[clamp(1.2rem,4vw,3.5rem)] leading-[1.2]">
            {lang.about_section.paragraph}
          </TextReveal>

          {/* Mobile Text */}
          <h1 className="mt-10 md:hidden text-neutral-400 text-3xl px-4 tracking-tight font-normal">
            {lang.about_section.paragraph}
          </h1>
        </div>
      </div>
      <div className="md:hidden flex flex-col w-full">
        <div className="mt-10 w-[200px] self-end">
          <Dot />
        </div>

        {/* Mobile Image */}
        <div className="flex justify-start">
          <Image
            src="/assets/images/achmad-daniel.webp"
            alt="Achmad Daniel Syahputra"
            width={250}
            height={250}
            className="grayscale mt-10 items-start"
          />
        </div>
      </div>
    </section>
  );
}
