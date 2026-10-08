"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { localeCookie, localeCookieMaxAge, type AppLocale } from "@/common/i18n";
import { useLenis } from "lenis/react";
import gsap from "gsap";

type LocaleSwitchEvent = CustomEvent<{ locale: AppLocale }>;

/** Every language shares one URL: remember the choice, then reload. */
function switchLocale(locale: AppLocale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=${localeCookieMaxAge}; samesite=lax`;
  window.location.reload();
}

const halves = { top: "top-0", bottom: "bottom-0" } as const;
const columns = ["left-0", "left-1/4", "left-2/4", "left-3/4"];

/**
 * Intro curtain, split at the middle: the top half slides up, the bottom
 * half down. Desktop has four columns that go right to left; mobile has one
 * full-width pair. Before a language switch it closes the same way.
 */
export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);
  const lenis = useLenis();

  // Lenis scrolls programmatically, so body overflow alone can't lock it
  useEffect(() => {
    if (isActive) lenis?.stop();
    else lenis?.start();
  }, [lenis, isActive]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setIsActive(false));
      // No curtain to close: switch the language straight away
      const switchNow = (e: Event) =>
        switchLocale((e as LocaleSwitchEvent).detail.locale);
      window.addEventListener("page-transition", switchNow);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("page-transition", switchNow);
      };
    }

    document.body.style.overflow = "hidden";

    const skipDelay = sessionStorage.getItem("skipIntroDelay") === "true";
    sessionStorage.removeItem("skipIntroDelay");

    // CSS shows either the mobile or the desktop blocks; move the shown ones
    const blocks = (half: keyof typeof halves) =>
      gsap.utils
        .toArray<HTMLElement>(`[data-half=${half}]`, containerRef.current)
        .filter((block) => block.offsetParent);

    const move = (open: boolean, vars: gsap.TimelineVars) => {
      const tween = {
        duration: 0.8,
        ease: "power4.inOut",
        stagger: { from: open ? "end" : "start", each: 0.1 },
      } as const;
      return gsap
        .timeline(vars)
        .to(blocks("top"), { ...tween, yPercent: open ? -100 : 0 }, 0)
        .to(blocks("bottom"), { ...tween, yPercent: open ? 100 : 0 }, 0);
    };

    const ctx = gsap.context(() => {
      move(true, {
        delay: skipDelay ? 0 : 0.5,
        onComplete: () => {
          document.body.style.overflow = "";
          setIsActive(false);
        },
      });
    }, containerRef);

    // Close the curtain, then switch the language behind it
    const handlePageTransition = (e: Event) => {
      const { locale } = (e as LocaleSwitchEvent).detail;

      sessionStorage.setItem("skipIntroDelay", "true");
      setIsActive(true);
      document.body.style.overflow = "hidden";

      // Wait for React to remove the 'hidden' class
      setTimeout(() => {
        ctx.add(() => move(false, { onComplete: () => switchLocale(locale) }));
      }, 10);
    };

    window.addEventListener("page-transition", handlePageTransition);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("page-transition", handlePageTransition);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="intro-curtain"
      className={`fixed inset-0 z-9999 ${isActive ? "" : "hidden"}`}
      aria-hidden="true"
    >
      {(Object.keys(halves) as (keyof typeof halves)[]).map((half) => (
        <Fragment key={half}>
          <div
            data-half={half}
            className={`absolute ${halves[half]} left-0 h-[50.5%] w-full bg-primary md:hidden`}
          />
          {columns.map((left) => (
            <div
              key={left}
              data-half={half}
              className={`absolute ${halves[half]} ${left} hidden h-[50.5%] w-1/4 bg-primary md:block`}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
