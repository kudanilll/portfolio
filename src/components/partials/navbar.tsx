"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 -left-6 -right-6 md:left-0 md:right-0 z-10 flex items-center justify-between flex-wrap px-10 py-6 transition-all duration-300 ease-in-out bg-transparent">
      <div className="flex items-center flex-no-shrink">
        <span
          className={`font-semibold text-2xl tracking-tight ${
            isScrolled ? "text-neutral-400" : "text-neutral-200"
          } transition-colors duration-300`}
        >
          Web Portfolio.
        </span>
      </div>
      <div className="flex items-center justify-center text-center flex-no-shrink">
        <Link
          href="/en"
          className="font-regular text-xl tracking-tight text-neutral-200"
        >
          EN
        </Link>
        <span className="mx-2 font-regular text-lg tracking-tight text-neutral-200">
          |
        </span>
        <Link
          href="/id"
          className="font-regular text-xl tracking-tight text-neutral-200"
        >
          ID
        </Link>
      </div>
    </nav>
  );
}
