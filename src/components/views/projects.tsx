"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { bebasNeue } from "@/common/font";
import { ResponsiveComponents } from "@/lib/responsive";
import Image from "next/image";
import Flower from "@/components/svg/flower";

// Daftarkan plugin GSAP
gsap.registerPlugin(ScrollTrigger, SplitText);

// Data proyek Anda
const projects = [
  {
    id: 1,
    title: "Kupass",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.",
    link: "#",
    thumbnail: "/assets/images/og.png",
    bgColor: "bg-trasnparent",
    scrollLineColor: "bg-trasnparent",
  },
  {
    id: 2,
    title: "Nielcode",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.",
    link: "#",
    thumbnail: "/assets/images/og.png",
    bgColor: "bg-trasnparent",
    scrollLineColor: "bg-trasnparent",
  },
  {
    id: 3,
    title: "Kunime",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.",
    link: "#",
    thumbnail: "/assets/images/og.png",
    bgColor: "bg-trasnparent",
    scrollLineColor: "bg-trasnparent",
  },
  {
    id: 4,
    title: "FJKT48",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.",
    link: "#",
    thumbnail: "/assets/images/og.png",
    bgColor: "bg-trasnparent",
    scrollLineColor: "bg-trasnparent",
  },
];

export default function ProjectsView({ lang }: { lang: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-slide").forEach((slide) => {
        // Animasi teks saat masuk
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: "top 70%", // Animasi dimulai saat 70% bagian atas slide terlihat
          },
        });

        new SplitText(slide.querySelectorAll(".col__content-title"), {
          type: "lines",
          linesClass: "line",
        });

        tl.from(slide.querySelectorAll(".line"), {
          y: 200,
          duration: 1.5,
          ease: "power4",
          stagger: 0.1,
        })
          .from(
            slide.querySelectorAll(".col__content-txt"),
            { x: 100, opacity: 0, duration: 1.5, ease: "power4" },
            "-=1.2"
          )
          .from(
            slide.querySelectorAll(".slide-link"),
            { x: -100, opacity: 0, duration: 1.5, ease: "power4" },
            "<"
          );

        const imageWrapper =
          slide.querySelector<HTMLElement>(".col__image-wrap");
        gsap.fromTo(
          imageWrapper,
          { y: "-20vh" }, // Mulai dari atas
          {
            y: "20vh", // Bergerak ke bawah saat scroll
            scrollTrigger: {
              trigger: slide,
              scrub: true, // Efek mengikuti scroll
              start: "top bottom",
              end: "bottom top",
            },
            ease: "none",
          }
        );
      });

      gsap.to(".flower-rotate", {
        rotation: 360,
        duration: 12,
        ease: "linear",
        repeat: -1, // infinite
        transformOrigin: "50% 50%",
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup otomatis
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="h-[8dvh]"></div>
      <div className="relative md:mx-16">
        <ResponsiveComponents
          desktopComponents={
            <h1 className="py-12 px-4 md:px-6 text-5xl text-white tracking-tighter uppercase">
              {lang.project_section.title}
            </h1>
          }
          mobileComponents={<></>}
        />

        <div className="absolute right-8 top-6">
          <Flower />
        </div>

        {/* <div className="h-16 w-16 bg-lime-400 absolute right-8 top-8"></div>
        <div className="h-14 w-14 border border-lime-400 absolute right-16 top-16"></div> */}
      </div>
      {projects.map((project, i) => (
        <section
          key={i}
          className="project-slide flex-col md:flex-row flex items-stretch h-screen overflow-hidden border-t last:border-b border-neutral-600"
        >
          <div className="col relative w-full md:flex-1 h-screen z-[1]">
            <div
              className={`col__content flex flex-col justify-end h-full overflow-hidden p-[6vw_6vw_10vw] w-full md:w-auto ${project.bgColor} bg-opacity-90 md:bg-opacity-100`}
            >
              <h3 className="col__content-title tracking-tight leading-none mb-[6vw] md:mb-[2vw] text-custom-dark">
                <span className="block overflow-hidden md:text-[2vw] opacity-50 md:ml-2">{`No. ${project.id}`}</span>
                <span className="block overflow-hidden text-[18vw] md:text-[8vw]">
                  {project.title}
                </span>
              </h3>
              <div className="col__content-wrap flex flex-col md:flex-row justify-end items-start md:items-center">
                <a
                  href={project.link}
                  className="slide-link group relative order-2 md:order-1 self-end md:self-auto flex justify-end w-[75px] h-[53px]"
                >
                  {/* <div className="slide-link__circ w-[53px] h-[53px] rounded-full border border-custom-dark"></div>
                  <div className="slide-link__line absolute top-[25px] left-0 w-16 h-0.5 bg-custom-dark transition-all duration-700 ease-in-out group-hover:scale-x-50 group-hover:translate-x-5 transform-origin-right"></div> */}
                </a>
                <p className="md:text-xl col__content-txt order-1 md:order-2 text-custom-dark max-w-[50vw] md:max-w-[22vw] mb-10 md:mb-0 ml-0 md:ml-8">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
          <div className="col absolute md:relative top-0 left-0 w-full md:flex-1 h-screen overflow-hidden z-0">
            <div className="col__image-wrap relative w-full h-[140vh] -top-[20vh]">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
