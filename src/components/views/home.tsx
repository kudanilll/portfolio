"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

function Title() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 125,
        duration: 0.7,
      }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <h1 className="text-[3rem] md:text-[6rem] font-bold font-instrument-sans text-white text-center leading-[1.0] uppercase">
        ACHMAD DANIEL <br /> SYAHPUTRA
      </h1>
    </motion.div>
  );
}

function Description() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 125,
        duration: 0.7,
      }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <p className="md:text-xl font-inter-tight text-neutral-400 text-center mt-6 md:mt-10">
        I am always excited to create innovative solutions and engaging user
        experiences.
      </p>
    </motion.div>
  );
}

function LetsTalkButton() {
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
        href="https://drive.usercontent.google.com/u/0/uc?id=1RvDMkBMcXlsDzbHIW3UzjZKM9tzpQ5lo&export=download"
        className="font-inter-tight w-48 h-12 rounded-full bg-transparent border border-neutral-400 text-white text-lg mt-6 group flex items-center justify-center gap-3 relative overflow-hidden"
      >
        {/* Text */}
        <div className="relative items-center h-5 overflow-hidden">
          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">
            <div className="flex flex-row items-center">
              <span className="block leading-[20px] text-center transform origin-right group-hover:rotate-[15deg]">
                Download CV
              </span>
              <Download className="ml-3 text-white" size={22} />
            </div>
            <div className="flex flex-row items-center">
              <span className="block text-center transform origin-left translate-y-0 group-hover:rotate-0">
                Download CV
              </span>
              <Download className="ml-3 text-white" size={22} />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

function LeftBottomComponent() {
  return (
    <motion.div>
      <h1 className="absolute md:block hidden bottom-6 left-0 text-neutral-400 md:text-lg font-semibold font-inter-tight uppercase">
        <span>Based in bekasi</span>
        <span className="text-neutral-600">, Indonesia</span>
      </h1>
    </motion.div>
  );
}

function RightBottomComponent() {
  return (
    <motion.div>
      <h1 className="absolute md:block hidden bottom-6 right-0 text-neutral-400 md:text-lg font-semibold font-inter-tight uppercase">
        <span></span>
        <span className="text-neutral-600"></span>
      </h1>
    </motion.div>
  );
}

export default function HomeView() {
  return (
    <section
      id="home"
      className="h-full mx-auto flex flex-col items-center justify-center relative"
    >
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center">
        <Title />
        <Description />
        <LetsTalkButton />
      </div>

      {/* Bottom */}
      <div>
        <LeftBottomComponent />
        <RightBottomComponent />
      </div>
    </section>
  );
}