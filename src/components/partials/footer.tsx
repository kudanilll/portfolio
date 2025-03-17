"use client";

import { ArrowRight } from "lucide-react";

function BackToTopButton() {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="font-inter-tight w-40 h-10 rounded-full bg-transparent border border-neutral-400 text-white text-base group flex items-center justify-center gap-3 relative overflow-hidden"
    >
      {/* Text */}
      <div className="relative items-center h-5 overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
          <span className="block leading-[22px] text-center transform origin-right group-hover:rotate-[15deg]">
            Back to Top
          </span>
          <span className="block text-center transform origin-left translate-y-0 group-hover:rotate-0">
            Back to Top
          </span>
        </div>
      </div>

      {/* Icon */}
      <ArrowRight
        className="text-white transition-transform duration-500 ease-out group-hover:-rotate-90"
        size={20}
      />
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="md:left-0 md:right-0 z-10 flex items-center justify-between flex-wrap bg-transparent px-10 pb-2 md:pb-4">
      <div className="flex items-center flex-no-shrink">
        <span className="font-regular font-instrument-sans text-neutral-200 text-md md:text-lg tracking-tight uppercase">
          &copy; {new Date().getFullYear()} Achmad Daniel
        </span>
      </div>
      <div className="hidden md:flex items-center flex-no-shrink">
        <BackToTopButton />
      </div>
    </footer>
  );
}
