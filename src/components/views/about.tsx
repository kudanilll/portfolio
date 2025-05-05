/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import GradualSpacing from "@/components/typography/gradual-spacing";
import ParallaxImage from "@/components/ui/parallax-image";

export default function AboutView({ lang }: { lang: any }) {
  return (
    <section id="about" className="min-h-screen">
      <div className="md:py-36">
        <div className="z-10 relative flex flex-row items-center justify-center gap-x-28">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate="visible"
            exit="hidden"
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.5,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <GradualSpacing
              className="text-4xl font-bold -tracking-widest text-white md:text-7xl md:leading-[5rem]"
              text={lang.about_section.title}
            />
            <p className="max-w-2xl text-base md:text-lg mt-12 text-neutral-400 font-instrument-sans">
              {lang.about_section.paragraph_1}
            </p>
            <p className="hidden md:block max-w-2xl text-base md:text-lg mt-6 text-neutral-400 font-instrument-sans">
              {lang.about_section.paragraph_1}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate="visible"
            exit="hidden"
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.5,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="rounded-xl shadow-xl overflow-hidden w-[700px] h-[550px]"
          >
            <ParallaxImage
              src="/assets/images/achmad-daniel.jpg"
              alt="Achmad Daniel Syahputra"
              width={2000}
              height={2000}
              direction="up"
              className="rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
