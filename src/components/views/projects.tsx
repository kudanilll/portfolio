"use client";

import GradualSpacing from "@/components/typography/gradual-spacing";
import ProjectParallax from "@/components/ui/project-parallax";
import { motion } from "framer-motion";

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
    title: "FJKT48",
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
  {
    title: "Test Project 1",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Test Project 2",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "Test Project 3",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
];

export default function ProjectsView() {
  return (
    <section id="projects" className="relative h-full w-full">
      <ProjectParallax
        projects={projects}
        header={
          <div className="max-w-7xl relative mx-auto py-20 md:py-40 w-screen md:w-full left-0 top-0">
            <div className="md:pl-8">
              <GradualSpacing
                className="text-4xl md:text-7xl font-bold -tracking-widest text-white md:leading-[4rem]"
                text={"My Awesome\nProjects"}
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
                <p className="max-w-2xl text-base md:text-lg mt-6 text-neutral-400 font-instrument-sans">
                  I build beautiful projects with the latest technologies and
                  frameworks. I am a passionate developer and designer that
                  loves to build amazing projects.
                </p>
              </motion.div>
            </div>
          </div>
        }
      />
    </section>
  );
}
