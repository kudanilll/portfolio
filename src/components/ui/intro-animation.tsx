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

const halves = {
  top: { position: "top-0", open: "animate-curtain-up", yPercent: -100 },
  bottom: { position: "bottom-0", open: "animate-curtain-down", yPercent: 100 },
} as const;
const columns = ["left-0", "left-1/4", "left-2/4", "left-3/4"];

/**
 * Intro curtain, split at the middle: the top half slides up, the bottom
 * half down, after a short hold. Desktop has four columns that go right to
 * left; mobile has one full-width pair. CSS opens it from the first paint,
 * so a slow phone never waits on the JS behind a white screen. Before a
 * language switch, GSAP closes it again.
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
    const container = containerRef.current!;
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

    // Done once the CSS has opened every block (maybe before this ran)
    document.body.style.overflow = "hidden";
    let disposed = false;
    Promise.all(container.getAnimations({ subtree: true }).map((a) => a.finished))
      .then(() => {
        if (disposed) return;
        document.body.style.overflow = "";
        setIsActive(false);
      })
      .catch(() => {}); // cancelled by a language switch

    const ctx = gsap.context(() => {}, container);
    const blocks = (half: keyof typeof halves) =>
      gsap.utils.toArray<HTMLElement>(`[data-half=${half}]`, container);

    // Close the curtain, then switch the language behind it
    const handlePageTransition = (e: Event) => {
      const { locale } = (e as LocaleSwitchEvent).detail;

      // Hand the blocks from CSS to GSAP while they are still open: showing
      // the curtain again would otherwise restart the CSS animation
      for (const half of ["top", "bottom"] as const) {
        gsap.set(blocks(half), { yPercent: halves[half].yPercent, animation: "none" });
      }
      setIsActive(true);
      document.body.style.overflow = "hidden";

      // Wait for React to remove the 'hidden' class, then close the shown blocks
      setTimeout(() => {
        ctx.add(() => {
          const tween = {
            yPercent: 0,
            duration: 0.8,
            ease: "power4.inOut",
            stagger: { from: "start", each: 0.1 },
          } as const;
          const shown = (half: keyof typeof halves) =>
            blocks(half).filter((block) => block.offsetParent);
          gsap
            .timeline({ onComplete: () => switchLocale(locale) })
            .to(shown("top"), tween, 0)
            .to(shown("bottom"), tween, 0);
        });
      }, 10);
    };

    window.addEventListener("page-transition", handlePageTransition);

    return () => {
      disposed = true;
      document.body.style.overflow = "";
      window.removeEventListener("page-transition", handlePageTransition);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="intro-curtain"
      className={`fixed inset-0 z-9999 motion-reduce:hidden ${isActive ? "" : "hidden"}`}
      aria-hidden="true"
    >
      {(Object.keys(halves) as (keyof typeof halves)[]).map((half) => {
        const { position, open } = halves[half];
        return (
          <Fragment key={half}>
            <div
              data-half={half}
              style={{ animationDelay: "0.5s" }}
              className={`absolute ${position} ${open} left-0 h-[50.5%] w-full bg-primary md:hidden`}
            />
            {columns.map((left, i) => (
              <div
                key={left}
                data-half={half}
                // Right to left: the last column opens first
                style={{ animationDelay: `${0.5 + (columns.length - 1 - i) * 0.1}s` }}
                className={`absolute ${position} ${open} ${left} hidden h-[50.5%] w-1/4 bg-primary md:block`}
              />
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
