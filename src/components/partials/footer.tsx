"use client";

import { ArrowRight } from "lucide-react";

function BackToTopButton() {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="w-44 h-12 bg-transparent border border-neutral-400 text-white text-base group flex items-center justify-center gap-2 relative overflow-hidden"
    >
      {/* Text */}
      <div className="relative items-center h-5 overflow-hidden uppercase">
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
    <footer className="z-10 bg-transparent pb-4 px-4 md:px-8 w-screen">
      <div className="flex items-center justify-center md:justify-between">
        <div className="flex items-center flex-no-shrink">
          <div className="group">
            <div className="relative items-center h-5 overflow-hidden uppercase">
              <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
                <span className="block leading-[22px] text-center transform origin-right group-hover:rotate-[15deg]">
                  &copy; {new Date().getFullYear()} Achmad Daniel
                </span>
                <span className="block text-center transform origin-left translate-y-0 group-hover:rotate-0">
                  &copy; {new Date().getFullYear()} Achmad Daniel
                </span>
              </div>
            </div>
          </div>
          {/* <span className="font-regular text-neutral-200 text-md md:text-lg tracking-tight uppercase">
            &copy; {new Date().getFullYear()} Achmad Daniel
          </span> */}
        </div>
        <div className="hidden md:flex items-center flex-no-shrink">
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
}
