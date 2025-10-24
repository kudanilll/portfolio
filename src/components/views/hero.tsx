/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useRef } from "react";
import { Download, Github, Instagram, Twitter } from "lucide-react";
import { bebasNeue, satoshi } from "@/common/font";
import gsap from "gsap";
import Link from "next/link";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

function LetsTalkButton({ lang }: { lang: any }) {
  return (
    <a
      href={
        lang.lang === "en"
          ? process.env.NEXT_PUBLIC_CV_EN
          : process.env.NEXT_PUBLIC_CV_ID
      }
      className="mx-auto md:mx-0 tracking-tight text-base w-44 md:w-48 h-14 md:h-12 bg-transparent border border-neutral-200 md:border-neutral-400 text-white group flex items-center justify-center gap-3 relative overflow-hidden active:scale-90 transition-all duration-300 ease-in-out"
      data-hero-cta
    >
      <div className="relative items-center h-5 overflow-hidden uppercase">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
          <div className="flex flex-row items-center">
            <span className="font-normal md:font-regular block leading-[20px] text-center origin-right group-hover:rotate-[15deg]">
              {lang.home_section.button_text}
            </span>
            <Download className="ml-3 text-white" size={20} />
          </div>
          <div className="flex flex-row items-center">
            <span className="font-normal md:font-regular block text-center origin-left translate-y-0 group-hover:rotate-0">
              {lang.home_section.button_text}
            </span>
            <Download className="ml-3 text-white" size={20} />
          </div>
        </div>
      </div>
    </a>
  );
}

function LeftBottomComponent({ lang }: { lang: any }) {
  return (
    <div className="absolute bottom-2 left-4 md:bottom-8 md:left-8 text-start">
      <h1 className="text-neutral-400 text-lg md:text-xl font-semibold uppercase tracking-tight">
        {lang.home_section.location}, Indonesia
      </h1>
      <h1 className="text-neutral-600 text-base md:text-base font-medium uppercase tracking-tight">
        <span>{lang.contact_section.title_2}</span>
      </h1>
    </div>
  );
}

function RightBottomComponent() {
  return (
    <div className="md:absolute md:bottom-6 md:right-8">
      <div className="flex items-center justify-center text-center gap-3">
        <Link
          href="https://www.instagram.com/achmaddaniel__"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
              <div className="flex flex-row items-center">
                <Instagram />
              </div>
              <div className="flex flex-row items-center">
                <Instagram />
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="https://github.com/kudanilll"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
              <div className="flex flex-row items-center">
                <Github />
              </div>
              <div className="flex flex-row items-center">
                <Github />
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="https://x.com/achmaddaniel24"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
              <div className="flex flex-row items-center">
                <Twitter />
              </div>
              <div className="flex flex-row items-center">
                <Twitter />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function HeroView({ lang }: { lang: any }) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const html = document.documentElement;
    const body = document.body;

    // Lock scroll
    const lockScroll = () => {
      const y = window.scrollY;
      body.dataset.scrollY = String(y);
      body.style.position = "fixed";
      body.style.top = `-${y}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      html.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      const y = Number(body.dataset.scrollY || 0);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      html.style.overflow = "";
      delete body.dataset.scrollY;
      window.scrollTo(0, 0);
    };

    const prevent = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    lockScroll();
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });

    const ctx = gsap.context(() => {
      // Determine initial scale based on screen size
      const isMobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint
      const initialScale = isMobile ? 1 : 1.4;

      // Initial
      gsap.set(heroRef.current, { autoAlpha: 0 });
      // gsap.set(titleRef.current, { y: 120, opacity: 0, scale: initialScale });
      // gsap.set(descRef.current, { y: 0, opacity: 0 });
      // gsap.set(ctaRef.current, { y: 0, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.removeEventListener("wheel", prevent as any);
          window.removeEventListener("touchmove", prevent as any);
          unlockScroll();
        },
      });

      tl.to(heroRef.current, { autoAlpha: 1, duration: 0.01 })
        .from(titleRef.current, { autoAlpha: 0, y: 120, duration: 0.6 })
        .from(
          descRef.current,
          { autoAlpha: 0, y: 18, duration: 0.45 },
          "-=0.25"
        )
        .from(ctaRef.current, { autoAlpha: 0, y: 12, duration: 0.35 }, "-=0.2");

      // tl.to(titleRef.current, {
      //   opacity: 1,
      //   duration: 0.5,
      //   ease: "power3.out",
      // });
    }, heroRef);

    return () => {
      window.removeEventListener("wheel", prevent as any);
      window.removeEventListener("touchmove", prevent as any);
      ctx.revert();
      unlockScroll();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-[100svh] md:h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left"
    >
      {/* Main Content */}
      <div className="mt-0 md:mt-28 w-screen px-4 md:px-8 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-4 md:gap-0">
        {/* Title */}
        <div className="w-full">
          <span
            ref={titleRef}
            className={`${bebasNeue.className} block text-start text-7xl md:text-[12rem] font-medium text-white leading-[0.95] tracking-tight uppercase`}
          >
            ACHMAD DANIEL <br /> <span>SYAHPUTRA</span>
            <span
              className={`${satoshi.className} mt-4 md:mt-0 md:ml-4 flex gap-3 md:gap-0 md:inline-block md:translate-y-[-18px]`}
            >
              <span ref={ctaRef as any}>
                <LetsTalkButton lang={lang} />
              </span>
              <div className="md:hidden">
                <RightBottomComponent />
              </div>
            </span>
          </span>
        </div>

        {/* Description */}
        <div className="w-full md:w-1/3">
          <p
            ref={descRef}
            className="mt-2 md:mt-0 text-start text-base sm:text-lg md:text-xl text-neutral-400 uppercase"
          >
            {lang.home_section.desc}
          </p>
        </div>
      </div>

      <div>
        <LeftBottomComponent lang={lang} />
        <div className="hidden md:block">
          <RightBottomComponent />
        </div>
      </div>
    </section>
  );
}
