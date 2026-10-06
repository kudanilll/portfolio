"use client";

import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav
      id="navigation-bar"
      className="w-full px-4 md:px-8 absolute top-4 z-50 transition-all duration-300 ease-in-out bg-transparent"
    >
      <div className="w-full h-16 flex items-center justify-end">
        <div className="flex items-center justify-center text-center gap-3">
          <Link
            href="/en"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(
                new CustomEvent("page-transition", { detail: { href: "/en" } }),
              );
            }}
            className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
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
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(
                new CustomEvent("page-transition", { detail: { href: "/id" } }),
              );
            }}
            className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
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
