/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Github, Instagram, Twitter } from "lucide-react";
import { DockText } from "@/components/typography/dock-text";
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
      className="mx-auto md:mx-0 text-base md:text-xl tracking-tight w-36 md:w-56 h-12 md:h-16 bg-transparent border border-neutral-200 md:border-neutral-400 text-white group flex items-center justify-center relative overflow-hidden active:scale-90 transition-all duration-300 ease-in-out"
      data-hero-cta
    >
      <div className="relative items-center h-6 md:h-7 overflow-hidden uppercase">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-7">
          <div className="flex flex-row items-center">
            <span className="font-normal md:font-regular text-center origin-right">
              {lang.home_section.button_text}
            </span>
            <div className="hidden md:block">
              <ArrowDown className="ml-3 text-white" size={24} />
            </div>
          </div>
          <div className="flex flex-row items-center text-base md:text-xl">
            <span className="font-normal md:font-regular text-center origin-left translate-y-0">
              {lang.home_section.button_text}
            </span>
            <div className="hidden md:block">
              <ArrowDown className="ml-3 text-white" size={24} />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function LeftBottomComponent({ lang }: { lang: any }) {
  return (
    <div
      id="left-bottom-component"
      className="absolute flex flex-col md:gap-1.5 bottom-4 left-4 md:bottom-[4%] md:left-8 text-start"
    >
      <h1 className="text-neutral-400 text-lg md:text-[clamp(1rem,1.4vw,1.8rem)] font-semibold uppercase tracking-tight">
        {lang.home_section.location}, Indonesia
      </h1>
      <h1 className="text-neutral-600 text-base md:text-[clamp(1rem,1.2vw,1.8rem)] font-medium uppercase tracking-tight">
        <span>{lang.contact_section.title_2}</span>
      </h1>
    </div>
  );
}

function RightBottomComponent() {
  return (
    <div className="md:absolute md:bottom-[3%] md:right-8">
      <div className="flex items-center justify-center text-center gap-3">
        <Link
          href="https://www.instagram.com/achmaddaniel__"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-12 h-12 md:w-16 md:h-16 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 md:h-8 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <Instagram size={32} />
                </div>
                <div className="md:hidden">
                  <Instagram />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <Instagram size={32} />
                </div>
                <div className="md:hidden">
                  <Instagram />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="https://github.com/kudanilll"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-12 h-12 md:w-16 md:h-16 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 md:h-8 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <Github size={32} />
                </div>
                <div className="md:hidden">
                  <Github />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <Github size={32} />
                </div>
                <div className="md:hidden">
                  <Github />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="https://x.com/achmaddaniel24"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-12 h-12 md:w-16 md:h-16 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 md:h-8 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <Twitter size={32} />
                </div>
                <div className="md:hidden">
                  <Twitter />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <Twitter size={32} />
                </div>
                <div className="md:hidden">
                  <Twitter />
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
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleUpRef = useRef<HTMLSpanElement | null>(null);
  const titleBottomRef = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

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
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      html.style.overflow = "";
      delete body.dataset.scrollY;
      // window.scrollTo(0, 0);
    };

    const prevent = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    lockScroll();
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });

    const ctx = gsap.context(() => {
      // Get elements
      const curtainTop = document.getElementById("curtain-top");
      const curtainBottom = document.getElementById("curtain-bottom");
      const background = document.getElementById("hero-background");
      const navbar = document.getElementById("navigation-bar");
      const location = document.getElementById("left-bottom-component");
      const socialMedia = document.getElementById("social-media");
      const socialMediaMobile = document.getElementById("social-media-mobile");

      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        gsap.set(curtainTop, { display: "none" });
        gsap.set(curtainBottom, { display: "none" });
      } else {
        gsap.set(curtainTop, { display: "block", y: 0 });
        gsap.set(curtainBottom, { display: "block", y: 0 });
      }

      // Set title to center of screen with larger scale
      gsap.set(titleUpRef.current, {
        y: 0,
        opacity: 0,
      });
      gsap.set(titleBottomRef.current, {
        y: 0,
        opacity: 0,
      });

      gsap.set(descRef.current, { opacity: 0 });
      gsap.set(ctaRef.current, { opacity: 0 });
      gsap.set(location, { opacity: 0 });
      gsap.set(socialMedia, { opacity: 0 });
      gsap.set(socialMediaMobile, { opacity: 0 });

      // Create animation timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          window.removeEventListener("wheel", prevent as any);
          window.removeEventListener("touchmove", prevent as any);
          unlockScroll();
        },
      });

      // initial states
      gsap.set(background, { opacity: 0 });
      gsap.set(navbar, { opacity: 0, y: -20 });

      tl
        // curtain split
        .to(curtainTop, { y: "-100%", duration: 1 }, 0)
        .to(curtainBottom, { y: "100%", duration: 1 }, 0)
        .to(curtainBottom, { opacity: 0, duration: 1 }, "-=0.6")

        // background reveal
        .to(background, { opacity: 0.3, duration: 1 }, "-=0.6")

        // title snap-in
        .to(titleUpRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .to(
          titleBottomRef.current,
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6",
        )

        // navbar + desc
        .to(navbar, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .to(descRef.current, { opacity: 1, duration: 0.4 }, "-=0.2")

        // CTA & socials last
        .to(ctaRef.current, { opacity: 1, duration: 0.3 }, "-=0.2")
        .to(location, { opacity: 1, duration: 0.3 }, "-=0.3")
        .to(socialMedia, { opacity: 1, duration: 0.3 }, "-=0.3")
        .to(socialMediaMobile, { opacity: 1, duration: 0.3 }, "-=0.1");
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
      className="relative h-svh md:h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left"
    >
      {/* Main Content */}
      <div className="mt-[-12%] md:mt-28 w-screen px-4 md:px-8 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-4 md:gap-0">
        {/* Title */}
        <div className="w-full">
          <span>
            <span
              className={`${bebasNeue.className} block text-start text-8xl md:text-[clamp(4rem,12vw,14rem)] font-medium text-white leading-[0.95] tracking-tight uppercase`}
            >
              <span
                ref={titleUpRef}
                className="flex flex-col md:flex-row md:items-center md:gap-8"
              >
                <DockText text={"ACHMAD"} down={false} />
                <DockText text={"DANIEL"} down={false} />
              </span>
              <div className="md:flex flex-row items-end gap-2">
                <span ref={titleBottomRef}>
                  <DockText text={"SYAHPUTRA"} down={true} />
                </span>
                <span
                  className={`${satoshi.className} md:ml-4 flex gap-3 md:gap-0 md:inline-block md:translate-y-[-2vw]`}
                >
                  <span ref={ctaRef as any} className="mt-2 md:mt-0">
                    <LetsTalkButton lang={lang} />
                  </span>
                  <div
                    id="social-media-mobile"
                    className="mt-2 md:mt-0 md:hidden"
                  >
                    <RightBottomComponent />
                  </div>
                </span>
              </div>
            </span>
          </span>
        </div>

        {/* Description */}
        <div className="hidden md:block w-full md:w-1/3">
          <p
            ref={descRef}
            className="mt-2 md:mt-0 text-start text-base md:text-[clamp(1rem,1.2vw,1.6rem)] leading-[1.6] text-neutral-400 uppercase"
          >
            {lang.home_section.desc}
          </p>
        </div>
      </div>

      <div>
        <LeftBottomComponent lang={lang} />
        <div id="social-media" className="hidden md:block">
          <RightBottomComponent />
        </div>
      </div>
    </section>
  );
}
