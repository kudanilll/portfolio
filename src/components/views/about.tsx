"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import GradualSpacing from "@/components/typography/gradual-spacing";
import ParallaxImage from "@/components/ui/parallax-image";

// Animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutView({ lang }: { lang: any }) {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Trigger animations when section is in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen w-full relative py-24 md:py-24"
    >
      <div className="container mx-auto">
        {/* Desktop layout with flex-row */}
        <div className="hidden md:flex flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left content column */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={controls}
            variants={fadeInLeftVariants}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.1,
            }}
          >
            <GradualSpacing
              className="text-5xl lg:text-7xl font-bold -tracking-widest text-white lg:leading-[5rem]"
              text={lang.about_section.title}
            />
            <p className="max-w-xl text-base lg:text-lg mt-8 text-neutral-400 font-instrument-sans">
              {lang.about_section.paragraph_1}
            </p>
            <p className="max-w-xl text-base lg:text-lg mt-4 text-neutral-400 font-instrument-sans">
              {lang.about_section.paragraph_2}
            </p>
          </motion.div>

          {/* Right image column with explicit dimensions */}
          <motion.div
            className="flex-1 h-[550px] relative"
            initial="hidden"
            animate={controls}
            variants={fadeInRightVariants}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.3,
            }}
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              <ParallaxImage
                src="/assets/images/achmad-daniel.webp"
                alt="Achmad Daniel Syahputra"
                width={1500}
                height={1500}
                direction="up"
                speed={1.8}
                className="scale-125"
                containerClassName="h-full w-full rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile layout with flex-col */}
        <div className="md:hidden flex flex-col gap-8">
          {/* Top content */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={fadeInUpVariants}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            <GradualSpacing
              className="text-4xl font-bold -tracking-widest text-white"
              text={lang.about_section.title}
            />
          </motion.div>

          {/* Middle image */}
          <motion.div
            className="w-full h-[350px] relative"
            initial="hidden"
            animate={controls}
            variants={fadeInUpVariants}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.2,
            }}
          >
            <div className="h-full w-full rounded-xl overflow-hidden">
              <ParallaxImage
                src="/assets/images/achmad-daniel.webp"
                alt="Achmad Daniel Syahputra"
                width={1500}
                height={1500}
                className="scale-125"
                direction="up"
                speed={0.9}
                containerClassName="h-full w-full"
              />
            </div>
          </motion.div>

          {/* Bottom content */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={fadeInUpVariants}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.3,
            }}
          >
            <p className="text-base mt-4 text-neutral-400 font-instrument-sans">
              {lang.about_section.paragraph_1}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
