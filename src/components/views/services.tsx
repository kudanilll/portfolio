/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import type { ComponentType, ReactNode } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Stars from "@/components/svg/stars";

const listItem = {
  initial: { opacity: 0, x: 8 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(6px)",
    transition: { duration: 0.25 },
  },
};

const imageSwap = {
  hidden: { opacity: 0, x: -16, rotate: -2 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, x: -16, rotate: 2, transition: { duration: 0.2 } },
};

const imgRow = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const imgItem = {
  hidden: (_: number) => ({
    opacity: 0,
    scale: 0.85,
    rotate: 0,
    y: 8,
  }),
  show: (tilt: number) => ({
    opacity: 1,
    scale: 1,
    rotate: tilt,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 18 },
  }),
  hover: { scale: 1.08, rotate: 0, zIndex: 10 },
  tap: { scale: 1.06, rotate: 0, zIndex: 10 },
};

function useRandomTilt(range = 10) {
  const [tilt, setTilt] = useState(0);
  useEffect(() => {
    const v = (Math.random() * 2 - 1) * range; // -range .. +range
    setTilt(+v.toFixed(2));
  }, [range]);
  return tilt;
}

function TiltItem({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const tilt = useRandomTilt(10);
  return (
    <motion.div
      variants={imgItem}
      custom={tilt}
      whileHover="hover"
      whileTap="tap"
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MobileDevelopmentServiceImage() {
  return (
    <motion.div
      className="flex items-center justify-center md:ml-8 md:mt-16"
      variants={imgRow}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <TiltItem className="bg-blue-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
          alt="Flutter"
          width={220}
          height={220}
          className="p-4 md:p-12"
        />
      </TiltItem>
      <TiltItem className="bg-purple-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"
          alt="Kotlin"
          width={220}
          height={220}
          className="p-4 md:p-8"
        />
      </TiltItem>
      <TiltItem className="bg-blue-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg"
          alt="Android Studio"
          width={220}
          height={220}
          className="p-4 md:p-8"
        />
      </TiltItem>
    </motion.div>
  );
}

function WebsiteDevelopmentServiceImage() {
  return (
    <motion.div
      className="flex items-center justify-center md:ml-8 md:mt-16"
      variants={imgRow}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <TiltItem className="bg-yellow-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
          alt="Firebase"
          width={220}
          height={220}
          className="p-4 md:p-12"
        />
      </TiltItem>
      <TiltItem className="bg-[#007acc] w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
          alt="TypeScript"
          width={220}
          height={220}
          className="p-4 md:p-8"
        />
      </TiltItem>
      <TiltItem className="bg-blue-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg"
          alt="Go"
          width={220}
          height={220}
          className="p-4 md:p-12"
        />
      </TiltItem>
    </motion.div>
  );
}

function IoTDevelopmentServiceImage() {
  return (
    <motion.div
      className="flex items-center justify-center md:ml-8 md:mt-16"
      variants={imgRow}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <TiltItem className="bg-blue-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg"
          alt="Arduino"
          width={220}
          height={220}
          className="p-4 md:p-8"
        />
      </TiltItem>
      <TiltItem className="bg-yellow-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
          alt="Firebase"
          width={220}
          height={220}
          className="p-4 md:p-12"
        />
      </TiltItem>
      <TiltItem className="bg-blue-100 w-24 h-24 md:w-fit md:h-fit rounded-lg md:rounded-2xl -mr-4 shadow-xl hover:shadow-2xl shrink-0 overflow-hidden">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
          alt="C++"
          width={220}
          height={220}
          className="p-4 md:p-8"
        />
      </TiltItem>
    </motion.div>
  );
}

type Service = {
  title: string;
  image: ComponentType;
  description: string;
};

export default function ServicesView({ lang }: { lang: any }) {
  const [currentService, setCurrentService] = useState<number>(0);

  const services: Service[] = [
    {
      title: "Mobile Development",
      image: MobileDevelopmentServiceImage,
      description: lang.service_section.mobile,
    },
    {
      title: "Web Development",
      image: WebsiteDevelopmentServiceImage,
      description: lang.service_section.web,
    },
    {
      title: "Internet of Things",
      image: IoTDevelopmentServiceImage,
      description: lang.service_section.iot,
    },
  ];

  const ImageComp = services[currentService].image;

  return (
    <section
      id="services"
      className="flex flex-col items-center justify-center md:mt-36 md:mb-12"
    >
      <div className="w-screen">
        <h1 className="mb-12 px-4 md:px-8 text-3xl md:text-5xl text-white tracking-tighter uppercase">
          {lang.service_section.title}
        </h1>

        <div className="min-h-[75svh] md:min-h-screen relative bg-neutral-900 md:bg-neutral-950">
          {/* List Services */}
          <LayoutGroup>
            <div className="absolute top-10 right-4 md:top-24 md:right-8 flex flex-col items-end text-right">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={listItem}
                  initial="initial"
                  animate="animate"
                  className="pb-1"
                >
                  <h1
                    onClick={() => setCurrentService(index)}
                    aria-current={currentService === index ? "true" : undefined}
                    className={`relative inline-flex items-center justify-end gap-3 cursor-pointer text-4xl md:text-6xl leading-none font-semibold tracking-tighter
                    ${
                      currentService === index
                        ? "text-lime-400"
                        : "text-white/30 hover:text-white/70 transition-colors duration-300"
                    }`}
                  >
                    {/* Moving Stars beside active item */}
                    <AnimatePresence mode="sync">
                      {currentService === index && (
                        <motion.span
                          key="stars"
                          layoutId="active-stars"
                          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 26,
                          }}
                          className="inline-flex"
                        >
                          <Stars />
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Title text */}
                    <span className="relative">
                      {service.title}
                      {currentService === index && (
                        <motion.span
                          layoutId="active"
                          className="absolute -bottom-1 right-0 h-[3px] w-full"
                        />
                      )}
                    </span>
                  </h1>
                </motion.div>
              ))}
            </div>
          </LayoutGroup>

          {/* Image (swap with spring + staggered children) */}
          <div className="absolute top-[35%] md:top-8 left-4 md:left-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService}
                variants={imageSwap}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <ImageComp />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description (blur → fade → slide) */}
          <div className="absolute bottom-20 left-4 right-4 md:bottom-36 md:left-8 md:right-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentService}
                variants={descVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="text-neutral-200 text-start text-2xl md:text-4xl max-w-7xl tracking-tight"
              >
                {services[currentService].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
