"use client";

import { bebasNeue } from "@/common/font";
import { TextReveal } from "@/components/ui/text-reveal";
import Dot from "@/components/svg/dot";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutView({ lang }: { lang: any }) {
  return (
    <section
      id="about"
      className="min-h-screen w-full px-4 md:px-8 relative py-24"
    >
      <h1
        className={`${bebasNeue.className} absolute top-8 md:left-4 text-[3rem] md:text-[16rem] font-bold tracking-tight text-white opacity-5`}
      >
        {lang.about_section.title}
      </h1>
      <Image
        src="/assets/images/achmad-daniel.webp"
        alt="Achmad Daniel Syahputra"
        width={450}
        height={450}
        className="absolute top-3/4 md:left-24 -translate-y-1/2 grayscale"
      />

      <div className="absolute bottom-0 md:right-32 w-[200px] h-[200px]">
        <Dot />
      </div>

      <div className="w-full flex justify-between">
        <div className="w-2/5 h-full"></div>
        <div className="">
          {/* Desktop Text */}
          <TextReveal className="hidden md:block max-w-4xl text-5xl tracking-wide font-regular">
            {lang.about_section.paragraph}
          </TextReveal>

          {/* Mobile Text */}
          <h1 className="md:hidden text-5xl px-4 tracking-wide font-semibold min-h-[80vh]">
            {lang.about_section.paragraph}
          </h1>
        </div>
      </div>
    </section>
  );
}
