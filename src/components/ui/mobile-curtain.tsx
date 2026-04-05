"use client";

import { useEffect, useState } from "react";

export default function MobileCurtain() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="mobile-curtain"
      className="md:hidden"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        backgroundColor: "white",
        transform: animate ? "translateY(-100%)" : "translateY(0%)",
        transition: animate
          ? "transform 1.2s cubic-bezier(0.87, 0, 0.13, 1)"
          : "none",
      }}
    />
  );
}
