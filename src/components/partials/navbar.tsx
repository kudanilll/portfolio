"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavigationBar() {
  const [_, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full px-4 md:px-8 absolute top-0 md:top-4 z-50 transition-all duration-300 ease-in-out bg-transparent">
      <div className="w-full h-16 flex items-center justify-end">
        <div className="flex items-center justify-center text-center gap-3">
          <Link
            href="/en"
            className="cursor-pointer w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
          >
            {/* Text */}
            <div className="relative items-center h-6 overflow-hidden uppercase">
              <div className="transition-transform duration-500 ease-out group-hover:-translate-y-7">
                <div className="flex flex-row items-center -translate-y-0.5">
                  EN
                </div>
                <div className="flex flex-row items-center -translate-y-0.5">
                  EN
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="/id"
            className="cursor-pointer w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
          >
            {/* Text */}
            <div className="relative items-center h-6 overflow-hidden uppercase">
              <div className="transition-transform duration-500 ease-out group-hover:-translate-y-7">
                <div className="flex flex-row items-center -translate-y-0.5">
                  ID
                </div>
                <div className="flex flex-row items-center -translate-y-0.5">
                  ID
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
