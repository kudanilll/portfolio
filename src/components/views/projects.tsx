/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import GradualSpacing from "@/components/typography/gradual-spacing";
// import Image from "next/image";

const projects = [
  {
    title: "KuPass - Password Manager",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Kunime - Watch Anime For Free",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "FJKT48 - JKT48 Fans Website",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Avatar Anime Maker",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "LinkHub Profile - Linktree Clone",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Wallfaper - Search Wallpapers Online",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "IR Remote Arduino - Control Your Lamp",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
];

export default function ProjectsView({ lang }: { lang: any }) {
  return (
    <section id="projects" className="relative h-full w-full px-4 md:px-0">
      <div className="relative mx-auto pt-24 md:pt-40 pb-8 md:pb-10 w-full left-0 top-0">
        <div className="">
          <GradualSpacing
            className="text-4xl md:text-7xl font-bold -tracking-widest text-white md:leading-[4rem]"
            text={lang.project_section.title}
          />
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate="visible"
            exit="hidden"
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.5,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <p className="text-base md:text-lg mt-6 text-neutral-400 font-instrument-sans">
              {lang.project_section.desc}
            </p>
          </motion.div>
        </div>
      </div>
      <BentoGrid className="mx-auto pb-12 md:pb-0">
        {projects.map((project, i) => (
          <BentoGridItem
            key={i}
            title={project.title}
            // description={project.description}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </section>
  );
}
