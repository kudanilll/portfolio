"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isMobileViewport } from "@/hooks/use-is-mobile";

/**
 * Intro curtain animation:
 * - Desktop: Split horizontal di tengah, terbagi 4 kolom vertikal (total 4 blok atas & 4 blok bawah).
 *   Membuka dari tengah (center) ke arah luar, atas meluncur ke atas dan bawah meluncur ke bawah.
 * - Mobile: Split curtain tengah (1 blok atas meluncur ke atas, 1 blok bawah meluncur ke bawah).
 */
export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileTopRef = useRef<HTMLDivElement>(null);
  const mobileBottomRef = useRef<HTMLDivElement>(null);
  const topBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsVisible(false);
        },
      });

      // Hold sebentar sebelum mulai buka
      tl.to({}, { duration: 0.3 });

      const isMobile = isMobileViewport();

      if (isMobile) {
        // Mobile: Split atas & bawah dari tengah
        tl.to(
          mobileTopRef.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
          },
          0.3
        ).to(
          mobileBottomRef.current,
          {
            yPercent: 100,
            duration: 0.8,
            ease: "power4.inOut",
          },
          0.3
        );
      } else {
        // Desktop: 4 blok ke atas & 4 blok ke bawah, animasi berurutan dari kanan ke kiri
        const topBlocks = topBlocksRef.current.filter(Boolean);
        const bottomBlocks = bottomBlocksRef.current.filter(Boolean);

        tl.to(
          topBlocks,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            stagger: {
              from: "end",
              each: 0.1,
            },
          },
          0.3
        ).to(
          bottomBlocks,
          {
            yPercent: 100,
            duration: 0.8,
            ease: "power4.inOut",
            stagger: {
              from: "end",
              each: 0.1,
            },
          },
          0.3
        );
      }
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {/* Mobile: Split 2 blok (atas & bawah) */}
      <div
        ref={mobileTopRef}
        className="absolute top-0 left-0 w-full h-[50.5%] bg-primary md:hidden"
      />
      <div
        ref={mobileBottomRef}
        className="absolute bottom-0 left-0 w-full h-[50.5%] bg-primary md:hidden"
      />

      {/* Desktop: 4 blok ATAS (slide ke atas) */}
      <div
        ref={(el) => {
          topBlocksRef.current[0] = el;
        }}
        className="absolute top-0 left-0 w-1/4 h-[50.5%] bg-primary hidden md:block"
      />
      <div
        ref={(el) => {
          topBlocksRef.current[1] = el;
        }}
        className="absolute top-0 left-1/4 w-1/4 h-[50.5%] bg-primary hidden md:block"
      />
      <div
        ref={(el) => {
          topBlocksRef.current[2] = el;
        }}
        className="absolute top-0 left-2/4 w-1/4 h-[50.5%] bg-primary hidden md:block"
      />
      <div
        ref={(el) => {
          topBlocksRef.current[3] = el;
        }}
        className="absolute top-0 left-3/4 w-1/4 h-[50.5%] bg-primary hidden md:block"
      />

      {/* Desktop: 4 blok BAWAH (slide ke bawah) */}
      <div
        ref={(el) => {
          bottomBlocksRef.current[0] = el;
        }}
        className="absolute bottom-0 left-0 w-1/4 h-[50.5%] bg-primary hidden md:block"
      />
      <div
        ref={(el) => {
          bottomBlocksRef.current[1] = el;
        }}
        className="absolute bottom-0 left-1/4 w-1/4 h-[50.5%] bg-primary hidden md:block"
      />
      <div
        ref={(el) => {
          bottomBlocksRef.current[2] = el;
        }}
        className="absolute bottom-0 left-2/4 w-1/4 h-[50.5%] bg-primary hidden md:block"
      />
      <div
        ref={(el) => {
          bottomBlocksRef.current[3] = el;
        }}
        className="absolute bottom-0 left-3/4 w-1/4 h-[50.5%] bg-primary hidden md:block"
      />
    </div>
  );
}
