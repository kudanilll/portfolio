"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Type definitions
interface VelocityScrollProps {
  text: string;
  defaultVelocity?: number;
  className?: string;
}

interface ParallaxTextProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

// Helper untuk wrap nilai dalam rentang tertentu
const wrap = (min: number, max: number, v: number): number => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// Component ParallaxText yang direfactor
const ParallaxText = ({
  children,
  baseVelocity = 100,
  className,
}: ParallaxTextProps): JSX.Element => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Effect untuk menghitung jumlah pengulangan teks yang dibutuhkan
  useEffect(() => {
    const calculateRepetitions = (): void => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 1;
        setRepetitions(Math.max(2, newRepetitions)); // Minimal 2 pengulangan
      }
    };

    calculateRepetitions();

    // Gunakan ResizeObserver daripada event listener untuk performa lebih baik
    const resizeObserver = new ResizeObserver(calculateRepetitions);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [children]);

  // Transform nilai baseX untuk animasi
  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  // Ref untuk arah gerakan
  const directionFactor = useRef<number>(1);

  // Animation frame untuk menggerakkan teks
  useAnimationFrame((_, delta) => {
    // Hitung delta movement
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Perbarui arah berdasarkan velocity scroll
    const currentVelocity = velocityFactor.get();
    if (currentVelocity < 0) {
      directionFactor.current = -1;
    } else if (currentVelocity > 0) {
      directionFactor.current = 1;
    }

    // Tambahkan velocity scroll ke gerakan dasar
    moveBy += directionFactor.current * moveBy * Math.abs(currentVelocity);

    // Perbarui posisi
    baseX.set(baseX.get() + moveBy);
  });

  // Buat array repetisi dengan useMemo untuk menghindari render ulang yang tidak perlu
  const repetitionArray = useMemo(
    () =>
      Array.from({ length: repetitions }).map((_, i) => (
        <span key={i} ref={i === 0 ? textRef : null}>
          {children}{" "}
        </span>
      )),
    [repetitions, children]
  );

  return (
    <div
      className="w-full overflow-hidden whitespace-nowrap"
      ref={containerRef}
    >
      <motion.div
        className={cn("inline-block skew-x-[-50deg]", className)}
        style={{ x }}
      >
        {repetitionArray}
      </motion.div>
    </div>
  );
};

// Component utama VelocityScroll
export default function VelocityScroll({
  text,
  defaultVelocity = 5,
  className,
}: VelocityScrollProps): JSX.Element {
  return (
    <section className="relative w-full font-inter-tight text-white/80 bg-gradient-to-r from-blue-600 to-blue-800 py-4">
      <ParallaxText baseVelocity={defaultVelocity} className={className}>
        {text}
      </ParallaxText>
      <ParallaxText baseVelocity={-defaultVelocity} className={className}>
        {text}
      </ParallaxText>
    </section>
  );
}
