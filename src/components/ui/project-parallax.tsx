"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProjectParallax({
  projects,
  header,
}: {
  projects: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  header: ReactNode;
}) {
  const firstRow = projects.slice(0, 5);
  const secondRow = projects.slice(5, 10);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 0]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[250vh] w-[100vw] pt-80 mt-40 md:-ml-8 py-40 antialiased overflow-hidden relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {header}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 mb-8">
          {firstRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateX}
              key={project.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 space-x-8">
          {secondRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateXReverse}
              key={project.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ProjectCard({
  project,
  translate,
}: {
  project: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={project.title}
      className="group/project h-96 w-[30rem] relative flex-shrink-0 rounded-md"
    >
      <Link
        href={project.link}
        className="block group-hover/project:shadow-2xl"
      >
        <Image
          src={project.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-md"
          alt={project.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/project:opacity-50 bg-neutral-900 pointer-events-none rounded-md"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/project:opacity-100 text-white font-instrument-sans">
        {project.title}
      </h2>
    </motion.div>
  );
}
