"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { ImageProps } from "next/image";

interface ParallaxImageProps extends Omit<ImageProps, "placeholder"> {
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  containerClassName?: string;
  placeholderColor?: string;
  fill?: boolean;
}

export default function ParallaxImage({
  speed = 0.2,
  direction = "up",
  className = "",
  containerClassName = "",
  placeholderColor = "#111111",
  fill = false,
  ...props
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Gunakan offset yang lebih besar untuk memastikan efek parallax terlihat
  // Ini akan membuat efek parallax mulai lebih awal dan berakhir lebih lambat
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Tingkatkan baseRange untuk efek yang lebih terlihat
  const baseRange = 100 * speed; // Nilai lebih besar untuk efek lebih terlihat

  // Sesuaikan range berdasarkan arah
  const yRange =
    direction === "up" ? [baseRange, -baseRange] : [-baseRange, baseRange];
  const xRange =
    direction === "left" ? [baseRange, -baseRange] : [-baseRange, baseRange];

  // Gunakan transformValue berdasarkan arah
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" || direction === "down" ? yRange : [0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" || direction === "right" ? xRange : [0, 0]
  );

  // Scale untuk efek zoom subtil
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${containerClassName}`}
      style={{
        backgroundColor: placeholderColor,
        width: fill ? "100%" : "auto",
        height: fill ? "100%" : "auto",
      }}
    >
      <motion.div
        className={`w-full h-full ${className}`}
        style={{
          y,
          x,
          scale,
          willChange: "transform",
          position: "relative",
          height: "100%",
        }}
      >
        <Image
          {...props}
          alt={props.alt || ""}
          fill={false}
          className={`object-cover ${className || ""}`}
          sizes={props.sizes || "(max-width: 768px) 100vw, 50vw"}
          priority={props.priority || false}
        />
      </motion.div>
    </div>
  );
}
