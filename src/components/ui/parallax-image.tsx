"use client";

import { useRef, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface ParallaxImageProps extends ImageProps {
  speed?: number;
  direction?: "up" | "down";
  className?: string;
}

export default function ParallaxImage({
  speed = 0.2,
  direction = "up",
  className = "",
  ...props
}: ParallaxImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        const offset = rect.top + scrollPosition;
        const scrollValue = (scrollPosition - offset) * speed;

        imageRef.current.style.transform = `translateY(${
          direction === "up" ? scrollValue : -scrollValue
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={imageRef}
      className={`will-change-transform transition-transform duration-100 ease-out ${className}`}
    >
      <Image {...props} />
    </div>
  );
}
