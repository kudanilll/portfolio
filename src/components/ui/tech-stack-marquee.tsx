"use client";

import GradualSpacing from "@/components/typography/gradual-spacing";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function TechStackMarquee() {
  const firstRowItems = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      alt: "JavaScript",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      alt: "TypeScript",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      alt: "Java",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
      alt: "Kotlin",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
      alt: "Flutter",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      alt: "React",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg",
      alt: "Android Studio",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
      alt: "VS Code",
    },
  ];

  const secondRowItems = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg",
      alt: "Xcode",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      alt: "Next.js",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
      alt: "Dart",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
      alt: "Arduino",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      alt: "Tailwind CSS",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
      alt: "C++",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      alt: "Python",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",
      alt: "Ubuntu",
    },
  ];

  function renderImages(items: { src: string; alt: string }[]) {
    const duplicatedItems = [...items, ...items];
    return duplicatedItems.map((item, index) => (
      <div key={`${item.alt}-${index}`}>
        <Image
          src={item.src}
          alt={item.alt}
          width="220"
          height="220"
          className="px-6 hidden md:block"
          loading="lazy"
        />
        <Image
          src={item.src}
          alt={item.alt}
          width="124"
          height="124"
          className="px-2 md:hidden"
          loading="lazy"
        />
      </div>
    ));
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <GradualSpacing
        className="text-center text-4xl font-bold -tracking-widest text-neutral-200 md:text-7xl md:leading-[5rem] mt-20"
        text="Tech Stack & Tools"
      />
      <Marquee className="overflow-hidden mt-12">
        {renderImages(firstRowItems)}
      </Marquee>
      <Marquee className="overflow-hidden mt-8" direction="right">
        {renderImages(secondRowItems)}
      </Marquee>
    </div>
  );
}
