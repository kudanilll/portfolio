/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { DockText } from "@/components/typography/dock-text";
import { bebasNeue, layGrotesk } from "@/common/font";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/csr/InstagramLogo";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/csr/GithubLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import Link from "next/link";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

function LetsTalkButton({ lang }: { lang: any }) {
  return (
    <Link
      href={
        lang.lang === "en"
          ? (process.env.NEXT_PUBLIC_CV_EN as string)
          : (process.env.NEXT_PUBLIC_CV_ID as string)
      }
      target="_blank"
      className="mx-auto md:mx-0 text-base md:text-xl w-36 md:w-56 h-12 md:h-16 bg-transparent border border-neutral-200 md:border-neutral-400 text-white group flex items-center justify-center relative overflow-hidden active:scale-90 transition-all duration-300 ease-in-out"
      data-hero-cta
    >
      <div className="relative items-center h-6 md:h-7 overflow-hidden uppercase">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-7">
          <div className="flex flex-row items-center">
            <span className="font-normal md:font-regular text-center origin-right">
              {lang.home_section.button_text}
            </span>
            <div className="hidden md:block">
              <ArrowUpRightIcon className="ml-3 text-white" size={24} />
            </div>
          </div>
          <div className="flex flex-row items-center text-base md:text-xl">
            <span className="font-normal md:font-regular text-center origin-left translate-y-0">
              {lang.home_section.button_text}
            </span>
            <div className="hidden md:block">
              <ArrowUpRightIcon className="ml-3 text-white" size={24} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function LeftBottomComponent({ lang }: { lang: any }) {
  return (
    <div
      id="left-bottom-component"
      className="absolute flex flex-col md:gap-1.5 bottom-4 left-4 md:bottom-[4%] md:left-8 text-start"
    >
      <h1 className="text-neutral-400 text-lg md:text-[clamp(1rem,1.4vw,1.8rem)] font-semibold uppercase">
        {lang.home_section.location}, Indonesia
      </h1>
      <h1 className="text-neutral-600 text-base md:text-[clamp(1rem,1.2vw,1.8rem)] font-medium uppercase">
        <span>{lang.contact_section.title_2}</span>
      </h1>
    </div>
  );
}

function RightBottomComponent() {
  return (
    <div className="md:absolute md:bottom-[3%] md:right-8">
      <div className="flex items-center justify-center text-center gap-3">
        <Link
          href="https://www.instagram.com/achmaddaniel__"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-12 h-12 md:w-16 md:h-16 bg-transparent font-regular text-xl text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 md:h-8 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <InstagramLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <InstagramLogoIcon size={24} />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <InstagramLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <InstagramLogoIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="https://github.com/kudanilll"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-12 h-12 md:w-16 md:h-16 bg-transparent font-regular text-xl text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 md:h-8 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <GithubLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <GithubLogoIcon size={24} />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <GithubLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <GithubLogoIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="https://www.linkedin.com/in/achmaddaniel"
          target="_blank"
          className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-12 h-12 md:w-16 md:h-16 bg-transparent font-regular text-xl text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="relative items-center h-6 md:h-8 overflow-hidden uppercase">
            <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6 md:group-hover:-translate-y-8">
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <LinkedinLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <LinkedinLogoIcon size={24} />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="hidden md:block">
                  <LinkedinLogoIcon size={32} />
                </div>
                <div className="md:hidden">
                  <LinkedinLogoIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function HeroView({ lang }: { lang: any }) {
  return (
    <section
      id="home"
      className="relative h-svh md:h-screen w-screen overflow-x-hidden flex flex-col"
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-screen px-4 md:px-8 pt-[12vh]">
        {/* Title */}
        <div className="w-full">
          <span
            className={`${bebasNeue.className} block text-start text-[clamp(4rem,14vw,6rem)] md:text-[clamp(4rem,8vw,14rem)] tracking-[-0.2rem] font-medium text-white leading-[0.85] uppercase`}
          >
            <span className="flex flex-col md:flex-row md:items-center md:gap-8">
              <DockText
                text={"ACHMAD"}
                down={false}
                className="text-neutral-300"
              />
              <DockText
                text={"DANIEL"}
                down={false}
                className="text-neutral-300"
              />
            </span>
            <div className="md:flex flex-row items-end gap-2">
              <DockText
                text={"SYAHPUTRA"}
                down={true}
                className="text-neutral-300"
              />
              <span
                className={`${layGrotesk.className} md:ml-4 flex gap-3 md:gap-0 md:inline-block md:translate-y-[-1vw]`}
              >
                <span className="mt-2 md:mt-0 tracking-normal">
                  <LetsTalkButton lang={lang} />
                </span>
                <div
                  id="social-media-mobile"
                  className="mt-2 md:mt-0 md:hidden tracking-normal"
                >
                  <RightBottomComponent />
                </div>
              </span>
            </div>
          </span>
        </div>

        {/* CREATIVE DEVELOPER - Push to bottom */}
        <div className="w-full">
          {/* Desktop */}
          <div className="hidden md:block w-full">
            <span
              className={`${bebasNeue.className} block text-end text-[clamp(4rem,11.5vw,14rem)] tracking-[-0.2rem] font-medium text-white leading-[0.8] uppercase`}
            >
              <span className="flex flex-row items-center md:gap-4 justify-end">
                <DockText text={"CREATIVE"} down={false} />
                <span className="text-lime-400">✦</span>
              </span>
              <DockText text={"DEVELOPER"} down={true} />
            </span>
          </div>

          {/* Mobile */}
          <div className="md:hidden w-full text-end mt-8">
            <span
              className={`${bebasNeue.className} block text-end text-[clamp(3rem,12vw,5rem)] tracking-[-0.1rem] font-medium text-white leading-[0.85] uppercase opacity-70`}
            >
              <span className="flex flex-row items-center gap-2 justify-end">
                <DockText text={"CREATIVE"} down={false} />
                <span className="text-lime-400">✦</span>
              </span>
              <DockText text={"DEVELOPER"} down={true} />
            </span>
          </div>
        </div>
      </div>

      <div>
        <LeftBottomComponent lang={lang} />
        <div id="social-media" className="hidden md:block">
          <RightBottomComponent />
        </div>
      </div>
    </section>
  );
}
