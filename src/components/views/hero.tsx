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
import { cn } from "@/lib/utils";
import NavigationBar from "@/components/partials/navbar";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const socials = [
  {
    href: "https://www.instagram.com/achmaddaniel__",
    label: "Instagram: @achmaddaniel__",
    Icon: InstagramLogoIcon,
  },
  {
    href: "https://github.com/kudanilll",
    label: "GitHub: @kudanilll",
    Icon: GithubLogoIcon,
  },
  {
    href: "https://www.linkedin.com/in/achmaddaniel",
    label: "LinkedIn: Achmad Daniel Syahputra",
    Icon: LinkedinLogoIcon,
  },
];

const displayText = `${bebasNeue.className} block text-end text-[24vw] md:text-[clamp(4rem,18vw,16rem)] tracking-[-0.025em] font-medium text-white leading-[0.85] md:leading-[0.8] uppercase opacity-70 md:opacity-100 will-change-transform`;

function ResumeButton({ lang }: { lang: any }) {
  const label = lang.home_section.button_text;

  return (
    <a
      href={
        lang.lang === "en"
          ? process.env.NEXT_PUBLIC_CV_EN
          : process.env.NEXT_PUBLIC_CV_ID
      }
      target="_blank"
      rel="noopener"
      aria-label={`${label} - Achmad Daniel Syahputra (PDF)`}
      className="text-base md:text-xl w-36 md:w-56 h-12 md:h-14 shrink-0 border border-neutral-200 md:border-neutral-400 group flex items-center justify-center relative overflow-hidden uppercase active:scale-90 transition-all duration-300 ease-in-out"
    >
      <span className="relative h-6 md:h-7 overflow-hidden">
        <span className="flex flex-col text-neutral-300 hover:text-white transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-7">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center">
              {label}
              <ArrowUpRightIcon className="hidden md:block ml-3 size-6" />
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socials.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={`${label} (opens in a new tab)`}
          className="size-12 md:size-16 shrink-0 border border-neutral-200 text-neutral-200 opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out group flex items-center justify-center relative overflow-hidden"
        >
          <span className="relative h-6 md:h-8 overflow-hidden">
            <span className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <Icon className="size-6 md:size-8" />
              <Icon className="size-6 md:size-8" />
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}

export default function HeroView({ lang }: { lang: any }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const leftAreaRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const creativeRef = useRef<HTMLSpanElement>(null);
  const developerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const bg = bgRef.current;
      const wrapper = wrapperRef.current;
      const creative = creativeRef.current;
      const developer = developerRef.current;
      if (!bg || !wrapper || !creative || !developer) return;

      // 1. Background & text layer stays pinned for 250% while the footer
      // and the next section slide over it (pinSpacing: false keeps it out of the flow).
      ScrollTrigger.create({
        trigger: bg,
        start: "top top",
        end: "+=250%",
        pin: true,
        pinSpacing: false,
      });

      // 2. Footer layer is pinned for 150% and scrubs the merge animation.
      // When its pin ends the text is centered and the footer scrolls away.
      const disableFooterSpacerPointerEvents = () => {
        const spacer = footerRef.current?.parentElement;
        if (spacer?.classList.contains("pin-spacer")) {
          gsap.set(spacer, { pointerEvents: "none" });
        }
      };

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut", force3D: true },
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: disableFooterSpacerPointerEvents,
        },
      });

      // Final state: "CREATIVE ✦ DEVELOPER" on one line, centered in the hero
      // and scaled to fit its width. offset* values ignore transforms and
      // scroll, so a refresh mid-animation still measures the start layout.
      const layout = () => {
        const gap = parseFloat(getComputedStyle(creative).fontSize) * 0.1;
        const mergedW = creative.offsetWidth + gap + developer.offsetWidth;
        const wrapperW = wrapper.offsetWidth;

        return {
          x: bg.clientWidth / 2 - (wrapper.offsetLeft + wrapperW / 2),
          y:
            bg.clientHeight / 2 -
            (wrapper.offsetTop + wrapper.offsetHeight / 2),
          scale: Math.min(1.2, (bg.clientWidth - 64) / mergedW),
          creativeX: creative.offsetWidth - mergedW / 2 - wrapperW / 2,
          developerX: mergedW / 2 - wrapperW / 2,
        };
      };

      tl.to(leftAreaRef.current, { xPercent: -30, opacity: 0 }, 0)
        .to(
          wrapper,
          {
            x: () => layout().x,
            y: () => layout().y,
            scale: () => layout().scale,
          },
          0,
        )
        .to(creative, { x: () => layout().creativeX, yPercent: 50 }, 0)
        .to(developer, { x: () => layout().developerX, yPercent: -50 }, 0);
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

      {/* 1. Background & text layer (pinned for 250%, see useGSAP above) */}
      <div
        ref={bgRef}
        className="absolute top-0 w-full h-svh md:h-screen overflow-x-hidden flex flex-col z-0"
      >
        <NavigationBar />
        <div
          className="absolute top-0 left-0 w-screen h-[88svh] md:h-[85vh] bg-cover bg-position-[50%_20%] md:bg-center opacity-45 md:opacity-30 pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/background.webp')" }}
        />

        <div className="flex-1 flex flex-col w-screen px-4 md:px-8 pt-[12vh] z-10">
          {/* Name + CTA */}
          <div
            ref={leftAreaRef}
            className="w-full text-[16vw] md:text-[clamp(4rem,5.5vw,14rem)] tracking-[-0.06em] font-medium leading-[0.85] uppercase text-neutral-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <DockText text="Achmad" />
              <DockText text="Daniel" />
            </div>
            <div className="md:flex md:items-end md:gap-2 md:mt-2">
              <DockText text="Syahputra" down />
              <div
                className={`${layGrotesk.className} mt-6 md:mt-0 md:ml-4 md:translate-y-[-0.6vw] flex flex-wrap items-center gap-3 text-base leading-normal tracking-normal`}
              >
                <ResumeButton lang={lang} />
                <SocialLinks className="md:hidden" />
              </div>
            </div>
          </div>

          {/* CREATIVE ✦ DEVELOPER */}
          <div
            ref={wrapperRef}
            data-testid="hero-title"
            className="absolute bottom-[18vh] md:bottom-[16vh] right-4 md:right-8 flex flex-col items-end will-change-transform"
          >
            <span ref={creativeRef} className={displayText}>
              <span className="flex flex-row items-center space-x-2 justify-end">
                <DockText text="CREATIVE" />
                <span className="text-lime-400">✦</span>
              </span>
            </span>
            <span ref={developerRef} className={displayText}>
              <DockText text="DEVELOPER" down />
            </span>
          </div>
        </div>
      </div>

      {/* 2. Footer layer (pinned for 150%, drives the scroll height) */}
      <div
        ref={footerRef}
        className="relative w-full h-svh md:h-screen flex flex-col justify-end pointer-events-none z-10"
      >
        <div className="bg-[#0a0a0a] w-full px-4 md:px-8 pt-8 pb-6 md:pb-[4vh] flex justify-between items-end gap-4 pointer-events-auto relative">
          {/* Subpixel gap fix: overhang to cover GSAP pin-spacer rounding errors */}
          <div className="absolute -bottom-0.5 left-0 w-full h-1 bg-[#0a0a0a]" />

          <div className="flex flex-col -space-y-1 uppercase">
            <p className="text-neutral-400 text-lg md:text-[clamp(1rem,1.3vw,1.8rem)] font-semibold">
              {lang.home_section.location}, Indonesia
            </p>
            <p className="text-neutral-600 text-base md:text-[clamp(1rem,1vw,1.8rem)] font-medium">
              {lang.contact_section.title_2}
            </p>
          </div>
          <SocialLinks className="hidden md:flex" />
        </div>
      </div>
    </div>
  );
}
