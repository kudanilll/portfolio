"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type GradualSpacingProps = {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
  align?: "left" | "center" | "right";
};

export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  className,
  align = "left", // Default to left alignment
}: GradualSpacingProps) {
  // Split text while preserving newlines
  const textParts = text.split(/(\n)/);

  // Alignment classes mapping
  const alignmentClasses = {
    left: "items-start",
    center: "items-center",
    right: "items-end",
  };

  return (
    <div
      className={cn(
        "flex flex-col space-y-1 font-inter-tight font-semibold uppercase",
        alignmentClasses[align]
      )}
    >
      <AnimatePresence>
        {textParts.map((part, index) => {
          // Skip rendering if part is a newline
          if (part === "\n") return null;

          return (
            <div
              key={index}
              className={cn(
                "flex space-x-1",
                align === "center" && "justify-center",
                align === "right" && "justify-end"
              )}
            >
              {part.split("").map((char, charIndex) => (
                <motion.h1
                  key={`${index}-${charIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate="visible"
                  exit="hidden"
                  transition={{
                    duration,
                    delay: charIndex * delayMultiple,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className={cn("drop-shadow-sm", className)}
                >
                  {char === " " ? <span>&nbsp;</span> : char}
                </motion.h1>
              ))}
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
