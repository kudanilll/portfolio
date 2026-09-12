"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { layGrotesk } from "@/common/font";
import gsap from "gsap";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cubePositions = [
  { initial: [-55, 37.5, 360, -360, -48], final: [25, 25, -1, 2, 0] },
  { initial: [-35, 32.5, -360, 360, 90], final: [25, 75, -1, -2, 0] },
  { initial: [-65, 50, -360, -360, -180], final: [50, 15, 0, 3, 0] },
  { initial: [-35, 50, -360, -360, -180], final: [50, 85, 0, -3, 0] },
  { initial: [-55, 62.5, 360, 360, -135], final: [75, 25, 1, 2, 0] },
  { initial: [-35, 67.5, -180, -360, -180], final: [75, 75, 1, -2, 0] },
] as const;

const devicon = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const technologies = [
  {
    name: "NEXT.JS",
    icon: `${devicon}/nextjs/nextjs-original.svg`,
    color: "bg-black border border-white/10",
  },
  {
    name: "TYPESCRIPT",
    icon: `${devicon}/typescript/typescript-original.svg`,
    color: "bg-[#3178C6] border border-blue-400",
  },
  {
    name: "REACT",
    icon: `${devicon}/react/react-original.svg`,
    color: "bg-sky-100 border border-sky-400",
  },
  {
    name: "TAILWIND CSS",
    icon: `${devicon}/tailwindcss/tailwindcss-original.svg`,
    color: "bg-black border border-white/20",
  },
  {
    name: "KOTLIN",
    icon: `${devicon}/kotlin/kotlin-original.svg`,
    color: "bg-purple-200 border border-purple-300",
  },
  {
    name: "JETPACK COMPOSE",
    icon: `${devicon}/jetpackcompose/jetpackcompose-original.svg`,
    color: "bg-black border border-white/20",
  },
];

const faceTransforms = [
  "[transform:translateZ(2.5rem)] md:[transform:translateZ(4.6875rem)]",
  "[transform:translateZ(-2.5rem)_rotateY(180deg)] md:[transform:translateZ(-4.6875rem)_rotateY(180deg)]",
  "[transform:translateX(2.5rem)_rotateY(90deg)] md:[transform:translateX(4.6875rem)_rotateY(90deg)]",
  "[transform:translateX(-2.5rem)_rotateY(-90deg)] md:[transform:translateX(-4.6875rem)_rotateY(-90deg)]",
  "[transform:translateY(-2.5rem)_rotateX(90deg)] md:[transform:translateY(-4.6875rem)_rotateX(90deg)]",
  "[transform:translateY(2.5rem)_rotateX(-90deg)] md:[transform:translateY(4.6875rem)_rotateX(-90deg)]",
];

const interpolate = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

function TechCube({ index }: { index: number }) {
  const technology = technologies[index];
  return (
    <div
      className="tech-cube absolute size-20 transform-3d md:size-37.5"
      aria-hidden="true"
    >
      {faceTransforms.map((transform) => (
        <div
          key={transform}
          className={`absolute inset-0 flex flex-col items-center justify-center backface-visible transform-3d ${technology.color} ${transform}`}
        >
          <Image
            src={technology.icon}
            alt=""
            width={76}
            height={76}
            className="size-10 object-contain object-center md:size-20"
          />
        </div>
      ))}
    </div>
  );
}

export default function ExpertiseView({ lang }: { lang: { lang: string } }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isIndonesian = lang.lang === "id";

  useGSAP(
    () => {
      const section = sectionRef.current;
      const logo = section?.querySelector<HTMLElement>(".expertise-logo");
      const cubes = gsap.utils.toArray<HTMLElement>(".tech-cube");
      const intro = section?.querySelector<HTMLElement>(".expertise-intro");
      const detail = section?.querySelector<HTMLElement>(".expertise-detail");
      if (!section || !logo || !intro || !detail || cubes.length !== 6) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const render = (progress: number) => {
          const logoBlurProgress = Math.min(progress * 20, 1);
          const logoOpacityProgress =
            progress >= 0.02 ? Math.min((progress - 0.02) * 100, 1) : 0;
          const cubesOpacityProgress =
            progress >= 0.01 ? Math.min((progress - 0.01) * 100, 1) : 0;
          const introProgress = Math.min(progress * 2.5, 1);
          const detailProgress = Math.max(
            0,
            Math.min((progress - 0.4) * 10, 1),
          );
          const firstPhaseProgress = Math.min(progress * 2, 1);
          const secondPhaseProgress =
            progress >= 0.5 ? (progress - 0.5) * 2 : 0;

          logo.style.filter = `blur(${interpolate(0, 20, logoBlurProgress)}px)`;
          logo.style.opacity = `${1 - logoOpacityProgress}`;

          intro.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.5, introProgress)})`;
          intro.style.filter = `blur(${interpolate(0, 20, introProgress)}px)`;
          intro.style.opacity = `${1 - introProgress}`;

          detail.style.transform = `translate(-50%, -50%) scale(${interpolate(0.75, 1, detailProgress)})`;
          detail.style.filter = `blur(${interpolate(10, 0, detailProgress)}px)`;
          detail.style.opacity = `${detailProgress}`;

          cubes.forEach((cube, index) => {
            const { initial, final } = cubePositions[index];
            const extraRotation =
              index === 1
                ? interpolate(0, 180, secondPhaseProgress)
                : index === 3
                  ? interpolate(0, -180, secondPhaseProgress)
                  : 0;

            cube.style.opacity = `${cubesOpacityProgress}`;
            cube.style.top = `${interpolate(initial[0], final[0], firstPhaseProgress)}%`;
            cube.style.left = `${interpolate(initial[1], final[1], firstPhaseProgress)}%`;
            cube.style.transform = `translate3d(-50%, -50%, ${interpolate(-30000, 0, firstPhaseProgress)}px) rotateX(${interpolate(initial[2], final[2], firstPhaseProgress)}deg) rotateY(${interpolate(initial[3], final[3], firstPhaseProgress) + extraRotation}deg) rotateZ(${interpolate(initial[4], final[4], firstPhaseProgress)}deg)`;
          });
        };

        render(0);
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => render(progress),
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        logo.style.opacity = "0";
        intro.style.opacity = "0";
        detail.style.opacity = "1";
        detail.style.transform = "translate(-50%, -50%) scale(1)";
        cubes.forEach((cube, index) => {
          const { final } = cubePositions[index];
          cube.style.opacity = "1";
          cube.style.top = `${final[0]}%`;
          cube.style.left = `${final[1]}%`;
          cube.style.transform = `translate3d(-50%, -50%, 0) rotateX(${final[2]}deg) rotateY(${final[3]}deg)`;
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative h-svh w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div className="expertise-logo absolute left-1/2 top-1/4 z-20 flex -translate-x-1/2 -translate-y-1/2 gap-3 md:gap-5">
        <div className="flex flex-col justify-end">
          <span className="size-5 origin-bottom-right rotate-42 bg-lime-400 md:size-8" />
          <span className="size-5 bg-white md:size-8" />
        </div>
        <div className="flex flex-col justify-end gap-3 md:gap-5">
          <span className="size-5 bg-white md:size-8" />
          <span className="size-5 bg-lime-400 md:size-8" />
        </div>
        <div className="flex flex-col justify-end">
          <span className="size-5 origin-bottom-left -rotate-42 bg-lime-400 md:size-8" />
          <span className="size-5 bg-white md:size-8" />
        </div>
      </div>

      <div className="absolute inset-0 perspective-[10000px] transform-3d">
        {technologies.map((technology, index) => (
          <TechCube key={technology.name} index={index} />
        ))}
      </div>

      <div className="expertise-intro absolute left-1/2 top-1/2 z-10 w-[88%] text-center md:w-[70%]">
        <h2
          id="expertise-heading"
          className={`${layGrotesk.className} text-[clamp(4rem,4vw,5rem)] leading-none tracking-tight`}
        >
          {isIndonesian
            ? "Saya membangun produk digital untuk generasi yang bergerak di banyak layar."
            : "I build digital products for a generation moving across screens."}
        </h2>
      </div>

      <div className="expertise-detail absolute left-1/2 top-1/2 z-10 w-[76%] text-center opacity-0 md:w-[34%]">
        <h3
          className={`${layGrotesk.className} mb-3 text-xl font-semibold leading-tight md:text-3xl`}
        >
          {isIndonesian
            ? "Peran yang berbeda, satu hasil yang utuh."
            : "Different roles, one coherent outcome."}
        </h3>
        <p
          className={`${layGrotesk.className} text-sm font-light leading-relaxed text-neutral-300 md:text-xl`}
        >
          {isIndonesian
            ? "Frontend, Android, dan creative development dipadukan dengan Next.js, TypeScript, React, Tailwind CSS, Kotlin, dan Compose."
            : "Frontend, Android, and creative development brought together with Next.js, TypeScript, React, Tailwind CSS, Kotlin, and Compose."}
        </p>
      </div>
    </section>
  );
}
