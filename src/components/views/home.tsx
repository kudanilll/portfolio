/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { bebasNeue, satoshi } from "@/common/font";
import { Download, Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

function Title({ lang }: { lang: any }) {
  return (
    <div>
      <span
        className={`${bebasNeue.className} text-[3rem] md:text-[12rem] font-bold text-white text-start leading-[0.9] tracking-tight uppercase`}
      >
        ACHMAD DANIEL <br /> SYAHPUTRA{" "}
        <span
          className={`${satoshi.className} inline-block translate-y-[-16px]`}
        >
          <LetsTalkButton lang={lang} />
        </span>
      </span>
    </div>
  );
}

function Description({ lang, className }: { lang: any; className?: string }) {
  return (
    <div className={className}>
      <p className="md:text-xl text-neutral-400">{lang.home_section.desc}</p>
    </div>
  );
}

function LetsTalkButton({ lang }: { lang: any }) {
  return (
    <div>
      <a
        href={process.env.NEXT_PUBLIC_CV_EN}
        className="tracking-normal text-base w-48 h-12 bg-transparent border border-neutral-400 text-white mt-6 group flex items-center justify-center gap-3 relative overflow-hidden active:scale-90 transition-all duration-300 ease-in-out"
      >
        {/* Text */}
        <div className="relative items-center h-5 overflow-hidden">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
            <div className="flex flex-row items-center">
              <span className="block leading-[20px] text-center transform origin-right group-hover:rotate-[15deg]">
                {lang.home_section.button_text}
              </span>
              <Download className="ml-3 text-white" size={22} />
            </div>
            <div className="flex flex-row items-center">
              <span className="block text-center transform origin-left translate-y-0 group-hover:rotate-0">
                {lang.home_section.button_text}
              </span>
              <Download className="ml-3 text-white" size={22} />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

function LeftBottomComponent({ lang }: { lang: any }) {
  return (
    <div className="hidden md:block absolute bottom-8 md:left-8">
      <h1 className="text-neutral-400 text-xl font-semibold uppercase">
        {lang.home_section.location}, Indonesia
      </h1>
      <h1 className="text-neutral-600 text-base font-medium uppercase">
        <span>{lang.contact_section.title_2}</span>
      </h1>
    </div>
  );
}

function RightBottomComponent() {
  return (
    <div className="hidden md:block absolute bottom-6 md:right-8">
      <div className="flex items-center justify-center text-center gap-3">
        <Link
          href=""
          className="cursor-pointer w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
              <div className="flex flex-row items-center">
                <Instagram />
              </div>
              <div className="flex flex-row items-center">
                <Instagram />
              </div>
            </div>
          </div>
        </Link>
        <Link
          href=""
          className="cursor-pointer w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
              <div className="flex flex-row items-center">
                <Github />
              </div>
              <div className="flex flex-row items-center">
                <Github />
              </div>
            </div>
          </div>
        </Link>
        <Link
          href=""
          className="cursor-pointer w-14 h-14 bg-transparent font-regular text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
              <div className="flex flex-row items-center">
                <Twitter />
              </div>
              <div className="flex flex-row items-center">
                <Twitter />
              </div>
            </div>
          </div>
        </Link>
        {/* <div className="active:scale-75 font-regular text-xl tracking-tight text-neutral-200 p-4 border border-neutral-200 hover:bg-neutral-200/10 hover:scale-110 hover:shadow-lg transition-all duration-500 ease-in-out cursor-pointer transform hover:-translate-y-1">
          <Instagram />
        </div>
        <div className="active:scale-75 font-regular text-xl tracking-tight text-neutral-200 p-4 border border-neutral-200 hover:bg-neutral-200/10 hover:scale-110 hover:shadow-lg transition-all duration-500 ease-in-out cursor-pointer transform hover:-translate-y-1">
          <Github />
        </div>
        <div className="active:scale-75 font-regular text-xl tracking-tight text-neutral-200 p-4 border border-neutral-200 hover:bg-neutral-200/10 hover:scale-110 hover:shadow-lg transition-all duration-500 ease-in-out cursor-pointer transform hover:-translate-y-1">
          <Twitter />
        </div> */}
      </div>
    </div>
  );
}

export default function HomeView({ lang }: { lang: any }) {
  return (
    <section
      id="home"
      className="h-screen w-screen flex flex-col items-start justify-start relative"
    >
      {/* Main Content */}
      <div className="mt-0 md:mt-28 w-screen px-4 md:px-8 flex flex-row items-start justify-between">
        <Title lang={lang} />
        <Description lang={lang} className="w-full md:w-1/4 text-end" />
      </div>

      {/* Bottom */}
      <div>
        <LeftBottomComponent lang={lang} />
        <RightBottomComponent />
      </div>
    </section>
  );
}
