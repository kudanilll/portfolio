/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import GradualSpacing from "@/components/typography/gradual-spacing";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

function ContactButton({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        type: "tween",
        duration: 0.3,
        delay: 0.3,
      }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <a
        href="mailto:achmad24daniel@gmail.com, achmad24daniel@gmail.com?subject=I am interested in working with you."
        className="font-inter-tight w-36 h-10 rounded-full bg-transparent border border-neutral-400 text-neutral-200 text-md mt-6 group flex items-center justify-center gap-3 relative overflow-hidden"
      >
        {/* Text */}
        <div className="relative items-center h-5 overflow-hidden">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
            <div className="flex flex-row items-center">
              <span className="block leading-[20px] text-center transform origin-right group-hover:rotate-[15deg]">
                {text}
              </span>
              <Mail className="ml-3 text-neutral-200" size={20} />
            </div>
            <div className="flex flex-row items-center">
              <span className="block text-center transform origin-left translate-y-0 group-hover:rotate-0">
                {text}
              </span>
              <Mail className="ml-3 text-neutral-200" size={20} />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function ContactView({ lang }: { lang: any }) {
  return (
    <section
      id="contact"
      className="h-screen mx-auto flex flex-col items-center justify-center relative"
    >
      <div className="min-h-screen flex flex-col items-center justify-center">
        <GradualSpacing
          className="text-3xl font-bold -tracking-widest text-neutral-200 md:text-7xl md:leading-[5rem]"
          text={lang.contact_section.title_1}
        />
        <GradualSpacing
          className="text-3xl font-bold -tracking-widest text-neutral-500 md:text-7xl md:leading-[5rem]"
          text={lang.contact_section.title_2}
        />
        <ContactButton text={lang.contact_section.button} />
      </div>
    </section>
  );
}
