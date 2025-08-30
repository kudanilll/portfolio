"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Daftarkan plugin di luar komponen
gsap.registerPlugin(ScrollSmoother);

export default function PageClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Inisialisasi ScrollSmoother pada layout utama
    const ctx = gsap.context(() => {
      ScrollSmoother.create({
        wrapper: mainRef.current!,
        content: contentRef.current!,
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });
    }, mainRef);

    // Cleanup saat komponen dibongkar
    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper" ref={mainRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
