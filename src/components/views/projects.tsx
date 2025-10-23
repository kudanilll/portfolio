/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Flower from "@/components/svg/flower";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ProjectsView({ lang }: { lang: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Nielcode",
      description: lang.project_section.project_1,
      link: "https://www.nielcode.my.id",
      thumbnail: "/assets/images/nielcode.webp",
      bgColor: "bg-trasnparent",
      scrollLineColor: "bg-trasnparent",
    },
    {
      id: 2,
      title: "Kunime",
      description: lang.project_section.project_2,
      link: "https://github.com/kudanilll/kunime",
      thumbnail: "/assets/images/kunime.webp",
      bgColor: "bg-trasnparent",
      scrollLineColor: "bg-trasnparent",
    },
    {
      id: 3,
      title: "Kupass",
      description: lang.project_section.project_3,
      link: "#https://github.com/kudanilll/kupass",
      thumbnail: "/assets/images/kupass.webp",
      bgColor: "bg-trasnparent",
      scrollLineColor: "bg-trasnparent",
    },
    {
      id: 4,
      title: "Favget",
      description: lang.project_section.project_4,
      link: "https://github.com/kudanilll/favget",
      thumbnail: "/assets/images/favget.webp",
      bgColor: "bg-trasnparent",
      scrollLineColor: "bg-trasnparent",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-slide").forEach((slide) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: "top 70%",
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
          { y: "-20vh" },
          {
            y: "20vh",
            scrollTrigger: {
              trigger: slide,
              scrub: true,
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

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="md:h-[8dvh]"></div>
      <div className="relative md:mx-16">
        <h1 className="md:py-12 px-4 md:px-6 text-3xl md:text-5xl text-white tracking-tighter uppercase">
          {lang.project_section.title}
        </h1>
        <div className="absolute top-14 right-4 md:top-6 md:right-8">
          <Flower />
        </div>
      </div>
      {projects.map((project, i) => (
        <section
          key={i}
          className="hidden md:flex project-slide flex-col md:flex-row items-stretch h-screen overflow-hidden border-t last:border-b border-neutral-600"
        >
          <div className="col relative w-full md:flex-1 h-screen z-[1]">
            <div
              className={`col__content flex flex-col justify-end h-full overflow-hidden p-[6vw_6vw_10vw] w-full md:w-auto ${project.bgColor} bg-opacity-90 md:bg-opacity-100`}
            >
              <h3 className="col__content-title tracking-tight leading-none mb-[6vw] md:mb-[2vw] text-custom-dark">
                <span className="block overflow-hidden md:text-[2vw] opacity-50 md:ml-2">{`No. ${project.id}`}</span>
                <span className="block text-[18vw] md:text-[8vw] md:tracking-tight">
                  {project.title}
                </span>
              </h3>
              <div className="col__content-wrap flex flex-col md:flex-row justify-end items-start md:items-center">
                <Link
                  href={project.link}
                  target="_blank"
                  className="slide-link group relative order-2 md:order-1 self-end md:self-auto flex justify-end w-[75px] h-[53px]"
                >
                  <div className="slide-link__circ w-[53px] h-[53px] rounded-full border-2 border-lime-400"></div>
                  <div className="slide-link__line absolute top-[25px] left-0 w-16 h-0.5 bg-lime-400 transition-all duration-700 ease-in-out group-hover:scale-x-50 group-hover:translate-x-4 transform-origin-right"></div>
                </Link>
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
