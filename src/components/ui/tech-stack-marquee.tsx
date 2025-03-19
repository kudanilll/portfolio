"use client";

import GradualSpacing from "@/components/typography/gradual-spacing";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function TechStackMarquee() {
  return (
    <div className="flex flex-col items-center justify-center">
      <GradualSpacing
        className="text-center text-4xl font-bold -tracking-widest text-neutral-200 md:text-7xl md:leading-[5rem] mt-20"
        text="Tech Stack & Tools"
      />
      <Marquee className="overflow-hidden mt-12">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
          alt="JavaScript"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
          alt="TypeScript"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
          alt="Java"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"
          alt="Kotlin"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
          alt="Flutter"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
          alt="React"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg"
          alt="Android Studio"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
          alt="VS Code"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
      </Marquee>
      <Marquee className="overflow-hidden mt-8" direction="right">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg"
          alt="Xcode"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
          alt="Next.js"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg"
          alt="Dart"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg"
          alt="Arduino"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
          alt="Tailwind CSS"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
          alt="C++"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
          alt="Python"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg"
          alt="Ubuntu"
          width="220"
          height="220"
          className="px-6"
          loading="lazy"
        />
      </Marquee>
    </div>
  );
}
