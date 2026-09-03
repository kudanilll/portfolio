/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Stars from "@/components/svg/stars";
import gsap from "gsap";

function useRandomTilt(range = 10) {
  const [tilt, setTilt] = useState(0);
  useEffect(() => {
    const v = (Math.random() * 2 - 1) * range; // -range .. +range
    setTilt(+v.toFixed(2));
  }, [range]);
  return tilt;
}

function TiltItem({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const tilt = useRandomTilt(10);
  return (
    <div
      style={{ transform: `rotate(${tilt}deg)` }}
      className={cn(
        "transition-all duration-300 ease-out hover:scale-110 hover:!rotate-0 hover:z-20 active:scale-105",
        className,
      )}
    >
      {children}
    </div>
  );
}

function MobileDevelopmentServiceImage() {
  return (
    <div className="flex items-center justify-center md:ml-8 md:mt-16">
      <TiltItem className="bg-blue-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
          alt="Flutter"
          width={220}
          height={220}
          className="p-4 md:p-12"
        />
      </TiltItem>
      <TiltItem className="bg-purple-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"
          alt="Kotlin"
          width={220}
          height={220}
          className="p-4 md:p-8"
        />
      </TiltItem>
      <TiltItem className="bg-blue-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg"
          alt="Android Studio"
          width={220}
          height={220}
          className="p-4 md:p-8"
        />
      </TiltItem>
    </div>
  );
}

function WebsiteDevelopmentServiceImage() {
  return (
    <div className="flex items-center justify-center md:ml-8 md:mt-16">
      <TiltItem className="bg-yellow-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
          alt="Firebase"
          width={220}
          height={220}
          className="p-4 md:p-12"
        />
      </TiltItem>
      <TiltItem className="bg-[#007acc] w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
          alt="TypeScript"
          width={220}
          height={220}
          className="p-4 md:p-8"
        />
      </TiltItem>
      <TiltItem className="bg-blue-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg"
          alt="Go"
          width={220}
          height={220}
          className="p-4 md:p-12"
        />
      </TiltItem>
    </div>
  );
}

type Service = {
  title: string;
  image: ComponentType;
  description: string;
};

export default function ServicesView({ lang }: { lang: any }) {
  const [currentService, setCurrentService] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const starsRef = useRef<HTMLSpanElement>(null);

  const services: Service[] = [
    {
      title: "Mobile Development",
      image: MobileDevelopmentServiceImage,
      description: lang.service_section.mobile,
    },
    {
      title: "Web Development",
      image: WebsiteDevelopmentServiceImage,
      description: lang.service_section.web,
    },
  ];

  // GSAP animation when currentService changes
  useEffect(() => {
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 15, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
        },
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -20, rotate: -2 },
        { opacity: 1, x: 0, rotate: 0, duration: 0.45, ease: "back.out(1.4)" },
      );
    }

    if (starsRef.current) {
      gsap.fromTo(
        starsRef.current,
        { opacity: 0, scale: 0.6, rotate: -15 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.35,
          ease: "back.out(2)",
        },
      );
    }
  }, [currentService]);

  const ImageComp = services[currentService].image;

  return (
    <section
      id="services"
      className="flex flex-col items-center justify-center md:mt-28 md:mb-12"
    >
      <div className="w-screen">
        <h1 className="mb-12 px-4 md:px-8 text-3xl md:text-5xl text-white uppercase">
          {lang.service_section.title}
        </h1>

        <div className="min-h-[75svh] md:min-h-screen relative bg-neutral-900 md:bg-neutral-950">
          {/* List Services */}
          <div className="absolute top-10 right-4 md:top-24 md:right-8 flex flex-col items-end text-right">
            {services.map((service, index) => (
              <div key={service.title} className="pb-1">
                <h1
                  onClick={() => setCurrentService(index)}
                  aria-current={currentService === index ? "true" : undefined}
                  className={`relative inline-flex items-center justify-end gap-3 cursor-pointer text-3xl md:text-[clamp(2.5rem,4vw,5rem)] leading-none font-semibold transition-colors duration-300 ${
                    currentService === index
                      ? "text-lime-400"
                      : "text-white/30 hover:text-white/70"
                  }`}
                >
                  {/* Moving Stars beside active item */}
                  {currentService === index && (
                    <span ref={starsRef} className="inline-flex">
                      <Stars />
                    </span>
                  )}

                  {/* Title text */}
                  <span className="relative">{service.title}</span>
                </h1>
              </div>
            ))}
          </div>

          {/* Image (swap with spring) */}
          <div className="absolute top-[35%] md:top-8 left-4 md:left-8">
            <div ref={imageRef}>
              <ImageComp />
            </div>
          </div>

          {/* Description (blur → fade → slide) */}
          <div
            className={`absolute ${
              lang.lang === "en" ? "bottom-14" : "bottom-20"
            } left-4 right-4 md:bottom-36 md:left-8 md:right-8`}
          >
            <p
              ref={descRef}
              className="text-neutral-200 text-start text-2xl md:text-[clamp(1.5rem,4vw,3rem)] max-w-[90vw] leading-[1.2]"
            >
              {services[currentService].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
