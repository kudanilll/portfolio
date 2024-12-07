"use client";

import { useState, useEffect } from "react";

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 -left-6 -right-6 md:left-0 md:right-0 z-10 flex items-center justify-between flex-wrap px-10 py-6 transition-all duration-300 ease-in-out bg-transparent">
      <div className="flex items-center flex-no-shrink">
        <span
          className={`
          font-semibold text-2xl tracking-tight
          ${isScrolled ? "text-neutral-400" : "text-neutral-200"}
          transition-colors duration-300
        `}
        >
          Web Portfolio.
        </span>
      </div>
      <div className="flex items-center flex-no-shrink">
        <button
          className={`
            font-inter-tight w-24 h-10 rounded-full 
            text-md transition-all duration-300
            ${
              isScrolled
                ? "bg-neutral-200/30 hover:bg-neutral-200/50 backdrop-blur-md text-white"
                : "bg-neutral-200 hover:bg-neutral-300 text-black"
            }
          `}
        >
          Menu
        </button>
      </div>
    </nav>
  );
}
