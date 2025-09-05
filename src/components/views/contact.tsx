/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { bebasNeue } from "@/common/font";
import { Mail } from "lucide-react";

function ContactButton({ text }: { text: string }) {
  return (
    <div>
      <a
        href="mailto:achmad24daniel@gmail.com, achmad24daniel@gmail.com?subject=I am interested in working with you."
        className="w-36 h-10 bg-transparent border border-neutral-400 text-neutral-200 text-md mt-6 group flex items-center justify-center gap-3 relative overflow-hidden"
      >
        {/* Text */}
        <div className="relative items-center h-5 overflow-hidden uppercase">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
            <div className="flex flex-row items-center">
              <span className="block leading-[20px] text-center transform origin-right group-hover:rotate-[15deg]">
                {text}
              </span>
              <Mail className="ml-3 text-white" size={22} />
            </div>
            <div className="flex flex-row items-center">
              <span className="block text-center transform origin-left translate-y-0 group-hover:rotate-0">
                {text}
              </span>
              <Mail className="ml-3 text-white" size={22} />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function ContactView({ lang }: { lang: any }) {
  return (
    <section
      id="contact"
      className="h-screen w-screen flex flex-col items-center justify-center relative"
    >
      <div className="min-h-screen mx-auto flex flex-col items-center justify-center z-10">
        <h1
          className={`${bebasNeue.className} text-3xl font-bold tracking-tight text-neutral-200 md:text-9xl md:leading-[6rem]`}
        >
          {lang.contact_section.title_1}
        </h1>
        <h2
          className={`${bebasNeue.className} text-3xl font-bold tracking-tight text-neutral-500 md:text-9xl md:leading-[6rem]`}
        >
          {lang.contact_section.title_2}
        </h2>
        <ContactButton text={lang.contact_section.button} />
      </div>
    </section>
  );
}
