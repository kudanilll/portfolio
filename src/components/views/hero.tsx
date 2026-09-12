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
import NavigationBar from "@/components/partials/navbar";
import Link from "next/link";
import gsap from "gsap";

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
      rel="noopener"
      aria-label={`${lang.home_section.button_text} - Achmad Daniel Syahputra (PDF)`}
      className="mx-auto md:mx-0 text-base md:text-xl w-36 md:w-56 h-12 md:h-14 bg-transparent border border-neutral-200 md:border-neutral-400 group flex items-center justify-center relative overflow-hidden active:scale-90 transition-all duration-300 ease-in-out"
      data-hero-cta
    >
      <div className="relative items-center h-6 md:h-7 overflow-hidden uppercase">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-7 text-neutral-300 hover:text-white">
          <div className="flex flex-row items-center">
            <span className="font-normal text-center origin-right">
              {lang.home_section.button_text}
            </span>
            <div className="hidden md:block">
              <ArrowUpRightIcon className="ml-3" size={24} />
            </div>
          </div>
          <div className="flex flex-row items-center text-base md:text-xl">
            <span className="font-normal text-center origin-left translate-y-0">
              {lang.home_section.button_text}
            </span>
            <div className="hidden md:block">
              <ArrowUpRightIcon className="ml-3" size={24} />
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
      className="absolute flex flex-col -space-y-1 bottom-4 left-4 md:bottom-[4%] md:left-8 text-start"
    >
      <p className="text-neutral-400 text-lg md:text-[clamp(1rem,1.3vw,1.8rem)] font-semibold uppercase">
        {lang.home_section.location}, Indonesia
      </p>
      <p className="text-neutral-600 text-base md:text-[clamp(1rem,1vw,1.8rem)] font-medium uppercase">
        <span>{lang.contact_section.title_2}</span>
      </p>
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
          rel="noopener noreferrer me"
          aria-label="Instagram: @achmaddaniel__ (opens in a new tab)"
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
          rel="noopener noreferrer me"
          aria-label="GitHub: @kudanilll (opens in a new tab)"
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
          rel="noopener noreferrer me"
          aria-label="LinkedIn: Achmad Daniel Syahputra (opens in a new tab)"
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
      const disableFooterSpacerPointerEvents = () => {
        const spacer = footerRef.current?.parentElement;
        if (spacer?.classList.contains("pin-spacer")) {
          gsap.set(spacer, { pointerEvents: "none" });
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top top",
          end: "+=150%", // Animation finishes at 150%, then pin ends and covering starts!
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: disableFooterSpacerPointerEvents,
        },
      });

      // 1. Move the left area (Name + Button) out and fade
      tl.to(
        ".hero-left-area",
        { xPercent: -30, opacity: 0, duration: 1, ease: "power2.inOut" },
        0,
      );

      // Calculate perfect centering for "CREATIVE DEVELOPER"
      const creativeEl = heroRef.current?.querySelector(
        ".creative-text",
      ) as HTMLElement;
      const devEl = heroRef.current?.querySelector(
        ".developer-text",
      ) as HTMLElement;
      const wrapperEl = heroRef.current?.querySelector(
        ".creative-wrapper",
      ) as HTMLElement;

      if (!creativeEl || !devEl || !wrapperEl) return;

      const getFinalLayout = () => {
        const creativeW = creativeEl.offsetWidth;
        const devW = devEl.offsetWidth;
        const wrapperW = wrapperEl.offsetWidth;
        const wrapperH = wrapperEl.offsetHeight;
        const mergedGap = isMobile ? 12 : 24;
        const mergedW = creativeW + mergedGap + devW;
        const wrapperRect = wrapperEl.getBoundingClientRect();
        const bgRect = bgRef.current?.getBoundingClientRect();
        const availableWidth = (bgRect?.width ?? window.innerWidth) - 64;

        return {
          scale: isMobile ? 1.1 : Math.min(1.2, availableWidth / mergedW),
          wrapperX:
            (bgRect?.left ?? 0) +
            (bgRect?.width ?? window.innerWidth) / 2 -
            (wrapperRect.left + wrapperW / 2),
          wrapperY:
            (bgRect?.top ?? 0) +
            (bgRect?.height ?? window.innerHeight) / 2 -
            (wrapperRect.top + wrapperH / 2),
          creativeX: creativeW - mergedW / 2 - wrapperW / 2,
          developerX: mergedW / 2 - wrapperW / 2,
        };
      };

      // Promote animated elements to GPU layers
      gsap.set([".creative-wrapper", ".creative-text", ".developer-text"], {
        willChange: "transform",
        force3D: true,
      });

      // 2. Animate wrapper to viewport center
      tl.to(
        ".creative-wrapper",
        {
          x: () => getFinalLayout().wrapperX,
          y: () => getFinalLayout().wrapperY,
          scale: () => getFinalLayout().scale,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );

      // 3. Merge into 1 line
      tl.to(
        ".creative-text",
        {
          x: () => getFinalLayout().creativeX,
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
          x: () => getFinalLayout().developerX,
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
        The visible hero type is split into per-letter DockText spans across
        two flex containers, with the CTA sitting between them. Marking any
        of those up as a heading produced 13 <h1> tags and heading text like
        "AchmadDanielSyahputraResumeResume". This is the single real <h1>
        for the page: same wording as what is on screen, just not fragmented.
        If the hero layout is ever restructured, promote the name container
        to <h1> and delete this.
      */}
      <h1 className="sr-only">
        {`Achmad Daniel Syahputra, ${lang.home_section.role}. ${lang.home_section.location}, Indonesia.`}
      </h1>

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
          className="absolute top-0 left-0 w-screen h-[88svh] md:h-[85vh] bg-cover bg-position-[50%_20%] md:bg-center z-0 opacity-45 md:opacity-30 pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/background.webp')" }}
        />
        {/* Main Content */}
        <div className="flex-1 flex flex-col w-screen px-4 md:px-8 pt-[12vh] z-10">
          {/* Title */}
          <div className="hero-left-area w-full">
            <span className="block text-start md:text-[clamp(4rem,5.5vw,14rem)] tracking-[-0.4rem] font-medium text-white leading-[0.85] uppercase">
              <span className="flex flex-col md:flex-row md:items-center md:gap-8">
                <DockText
                  text={"Achmad"}
                  down={false}
                  className="text-neutral-300"
                />
                <DockText
                  text={"Daniel"}
                  down={false}
                  className="text-neutral-300"
                />
              </span>
              <div className="md:flex flex-row items-end gap-2">
                <DockText
                  text={"Syahputra"}
                  down={true}
                  className="text-neutral-300"
                />
                <span
                  className={`${layGrotesk.className} md:ml-4 flex gap-3 md:gap-4 md:inline-block md:translate-y-[-0.6vw]`}
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
                className={`${bebasNeue.className} creative-text block text-end md:text-[clamp(4rem,18vw,16rem)] tracking-[-0.1rem] md:tracking-[-0.4rem] font-medium text-white leading-[0.85] md:leading-[0.8] uppercase opacity-70 md:opacity-100`}
              >
                <span className="flex flex-row items-center space-x-2 justify-end">
                  <DockText text={"CREATIVE"} down={false} />
                  <span className="text-lime-400">✦</span>
                </span>
              </span>
              <span
                className={`${bebasNeue.className} developer-text block text-end md:text-[clamp(4rem,18vw,16rem)] tracking-[-0.1rem] md:tracking-[-0.4rem] font-medium text-white leading-[0.85] md:leading-[0.8] uppercase opacity-70 md:opacity-100`}
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
          <div className="absolute -bottom-0.5 left-0 w-full h-1 bg-[#0a0a0a]"></div>

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
