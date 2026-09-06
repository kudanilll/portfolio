/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { DockText } from "@/components/typography/dock-text";
import { bebasNeue, layGrotesk } from "@/common/font";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/csr/InstagramLogo";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/csr/GithubLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import gsap from "gsap";
import NavigationBar from "@/components/partials/navbar";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

function LetsTalkButton({ lang }: { lang: any }) {
  return (
    <Link
      href={
        lang.lang === "en"
          ? (process.env.NEXT_PUBLIC_CV_EN as string)
          : (process.env.NEXT_PUBLIC_CV_ID as string)
      }
      target="_blank"
      className="mx-auto md:mx-0 text-base md:text-xl w-36 md:w-56 h-12 md:h-16 bg-transparent border border-neutral-200 md:border-neutral-400 text-white group flex items-center justify-center relative overflow-hidden active:scale-90 transition-all duration-300 ease-in-out"
      data-hero-cta
    >
      <div className="relative items-center h-6 md:h-7 overflow-hidden uppercase">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-7">
          <div className="flex flex-row items-center">
            <span className="font-normal md:font-regular text-center origin-right">
              {lang.home_section.button_text}
            </span>
            <div className="hidden md:block">
              <ArrowUpRightIcon className="ml-3 text-white" size={24} />
            </div>
          </div>
          <div className="flex flex-row items-center text-base md:text-xl">
            <span className="font-normal md:font-regular text-center origin-left translate-y-0">
              {lang.home_section.button_text}
            </span>
            <div className="hidden md:block">
              <ArrowUpRightIcon className="ml-3 text-white" size={24} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function LeftBottomComponent({ lang }: { lang: any }) {
  return (
    <div
      id="left-bottom-component"
      className="absolute flex flex-col md:gap-1.5 bottom-4 left-4 md:bottom-[4%] md:left-8 text-start"
    >
      <h1 className="text-neutral-400 text-lg md:text-[clamp(1rem,1.4vw,1.8rem)] font-semibold uppercase">
        {lang.home_section.location}, Indonesia
      </h1>
      <h1 className="text-neutral-600 text-base md:text-[clamp(1rem,1.2vw,1.8rem)] font-medium uppercase">
        <span>{lang.contact_section.title_2}</span>
      </h1>
    </div>
  );
}

function RightBottomComponent() {
  return (
    <div className="md:absolute md:bottom-[4%] md:right-8">
      <div className="flex items-center justify-center text-center gap-3">
        <Link
          href="https://www.instagram.com/achmaddaniel__"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-12 h-12 md:w-16 md:h-16 bg-transparent font-regular text-xl text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 md:h-8 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <InstagramLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <InstagramLogoIcon size={24} />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <InstagramLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <InstagramLogoIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="https://github.com/kudanilll"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-12 h-12 md:w-16 md:h-16 bg-transparent font-regular text-xl text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 md:h-8 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <GithubLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <GithubLogoIcon size={24} />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <GithubLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <GithubLogoIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="https://www.linkedin.com/in/achmaddaniel"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-12 h-12 md:w-16 md:h-16 bg-transparent font-regular text-xl text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 md:h-8 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <LinkedinLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <LinkedinLogoIcon size={24} />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <LinkedinLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <LinkedinLogoIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function HeroView({ lang }: { lang: any }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      // 1. Pin Background & Text Layer for 250%
      // This stays fixed while the footer and next section slide over it.
      // pinSpacing: false ensures it doesn't affect document flow.
      ScrollTrigger.create({
        trigger: bgRef.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        pinSpacing: false,
      });

      // 2. Pin Footer Layer for 150% and drive animation
      // This drives the document scroll height. Pinned for 150%.
      // Once the pin ends (at 150%, exactly when text is centered), it scrolls up naturally!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top top",
          end: "+=150%", // Animation finishes at 150%, then pin ends and covering starts!
          pin: true,
          scrub: 1,
        },
      });

      // 1. Move the left area (Name + Button) out and fade
      tl.to(
        ".hero-left-area",
        { xPercent: -30, opacity: 0, duration: 1, ease: "power2.inOut" },
        0,
      );

      // Calculate perfect centering for "CREATIVE DEVELOPER"
      const creativeEl = document.querySelector(
        ".creative-text",
      ) as HTMLElement;
      const devEl = document.querySelector(".developer-text") as HTMLElement;
      const wrapperEl = document.querySelector(
        ".creative-wrapper",
      ) as HTMLElement;

      if (!creativeEl || !devEl || !wrapperEl) return;

      const creativeW = creativeEl.offsetWidth;
      const devW = devEl.offsetWidth;
      const wrapperW = wrapperEl.offsetWidth;
      const wrapperH = wrapperEl.offsetHeight;
      const finalScale = isMobile ? 1.1 : 1.2;

      // The visual gap between CREATIVE✦ and DEVELOPER when merged (1 line)
      const mergedGap = isMobile ? 12 : 24;

      // Width of the final merged line: CREATIVE✦ + gap + DEVELOPER
      const mergedW = creativeW + mergedGap + devW;

      // --- Step 2: Move the wrapper from its initial position to viewport center ---
      // Get current position (initial: absolute, bottom-right area)
      const wrapperRect = wrapperEl.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // Target: center of merged content in background center
      // Find background height to properly vertically center against it
      const bgEl = document.getElementById("hero-background");
      const bgHeight = bgEl
        ? bgEl.offsetHeight
        : isMobile
          ? viewportH * 0.88
          : viewportH * 0.85;

      const currentCenterX = wrapperRect.left + wrapperW / 2;
      const currentCenterY = wrapperRect.top + wrapperH / 2;
      const targetCenterX = viewportW / 2;
      const targetCenterY = bgHeight / 2;

      // Delta to move
      const deltaX = targetCenterX - currentCenterX;
      const deltaY = targetCenterY - currentCenterY;

      // Promote animated elements to GPU layers
      gsap.set([".creative-wrapper", ".creative-text", ".developer-text"], {
        willChange: "transform",
        force3D: true,
      });

      // 2. Animate wrapper to viewport center
      tl.to(
        ".creative-wrapper",
        {
          x: deltaX,
          y: deltaY,
          scale: finalScale,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );

      // 3. Merge into 1 line
      const creativeTargetX = creativeW - mergedW / 2 - wrapperW / 2;
      const devTargetX = mergedW / 2 - wrapperW / 2;

      tl.to(
        ".creative-text",
        {
          x: creativeTargetX,
          yPercent: 50,
          duration: 1,
          ease: "power2.inOut",
          force3D: true,
        },
        0,
      );

      tl.to(
        ".developer-text",
        {
          x: devTargetX,
          yPercent: -50,
          duration: 1,
          ease: "power2.inOut",
          force3D: true,
        },
        0,
      );
    },
    { scope: heroRef },
  );

  return (
    <div id="home" ref={heroRef} className="relative w-screen">
      {/* 
        1. Background & Text Layer (GSAP Pinned for 250vh)
        This layer is pinned with pinSpacing: false, so it stays fixed for the entire 250vh scroll distance,
        allowing the footer and next section to scroll up over it!
      */}
      <div
        ref={bgRef}
        className="absolute top-0 w-full h-svh md:h-screen overflow-x-hidden flex flex-col pointer-events-auto z-0"
      >
        <NavigationBar />
        <div
          id="hero-background"
          className="absolute top-0 left-0 w-screen h-[88svh] md:h-[85vh] bg-cover bg-[position:50%_20%] md:bg-center z-0 opacity-45 md:opacity-30 pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/background.webp')" }}
        />
        {/* Main Content */}
        <div className="flex-1 flex flex-col w-screen px-4 md:px-8 pt-[12vh] z-10">
          {/* Title */}
          <div className="hero-left-area w-full">
            <span
              className={`${bebasNeue.className} block text-start text-[clamp(4rem,14vw,6rem)] md:text-[clamp(4rem,8vw,14rem)] tracking-[-0.2rem] font-medium text-white leading-[0.85] uppercase`}
            >
              <span className="flex flex-col md:flex-row md:items-center md:gap-8">
                <DockText
                  text={"ACHMAD"}
                  down={false}
                  className="text-neutral-300"
                />
                <DockText
                  text={"DANIEL"}
                  down={false}
                  className="text-neutral-300"
                />
              </span>
              <div className="md:flex flex-row items-end gap-2">
                <DockText
                  text={"SYAHPUTRA"}
                  down={true}
                  className="text-neutral-300"
                />
                <span
                  className={`${layGrotesk.className} md:ml-4 flex gap-3 md:gap-0 md:inline-block md:translate-y-[-1vw]`}
                >
                  <span className="mt-2 md:mt-0 tracking-normal">
                    <LetsTalkButton lang={lang} />
                  </span>
                  <div
                    id="social-media-mobile"
                    className="mt-2 md:mt-0 md:hidden tracking-normal"
                  >
                    <RightBottomComponent />
                  </div>
                </span>
              </div>
            </span>
          </div>

          {/* CREATIVE DEVELOPER - Push to bottom */}
          <div className="w-full">
            <div className="creative-wrapper absolute bottom-[18vh] md:bottom-[16vh] right-4 md:right-8 flex flex-col items-end">
              <span
                className={`${bebasNeue.className} creative-text block text-end text-[clamp(3rem,12vw,5rem)] md:text-[clamp(4rem,11.5vw,14rem)] tracking-[-0.1rem] md:tracking-[-0.2rem] font-medium text-white leading-[0.85] md:leading-[0.8] uppercase opacity-70 md:opacity-100`}
              >
                <span className="flex flex-row items-center md:gap-6 justify-end">
                  <DockText text={"CREATIVE"} down={false} />
                  <span className="text-lime-400">✦</span>
                </span>
              </span>
              <span
                className={`${bebasNeue.className} developer-text block text-end text-[clamp(3rem,12vw,5rem)] md:text-[clamp(4rem,11.5vw,14rem)] tracking-[-0.1rem] md:tracking-[-0.2rem] font-medium text-white leading-[0.85] md:leading-[0.8] uppercase opacity-70 md:opacity-100`}
              >
                <DockText text={"DEVELOPER"} down={true} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        2. Footer Layer (GSAP Pinned for 150vh)
        This drives the document scroll height. Pinned for 150%.
        Once the pin ends (at 150%, exactly when text is centered), it scrolls up naturally!
      */}
      <div
        ref={footerRef}
        className="relative w-full h-svh md:h-screen flex flex-col justify-end pointer-events-none z-10"
      >
        <div className="hero-social-area bg-[#0a0a0a] w-full pt-24 pb-[4vh] flex justify-between items-end pointer-events-auto relative">
          {/* Subpixel gap fix: Overhang to cover GSAP pin-spacer rounding errors */}
          <div className="absolute -bottom-[2px] left-0 w-full h-[4px] bg-[#0a0a0a]"></div>

          <div className="relative z-10 w-full">
            <LeftBottomComponent lang={lang} />
          </div>
          <div id="social-media" className="hidden md:block relative z-10">
            <RightBottomComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
