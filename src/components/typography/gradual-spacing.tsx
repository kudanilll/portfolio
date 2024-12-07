"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type GradualSpacingProps = {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
};

export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  className,
}: GradualSpacingProps) {
  // Split text dengan mempertahankan newline
  const textParts = text.split(/(\n)/);

  return (
    <div className="flex flex-col space-y-1 font-inter-tight font-semibold uppercase">
      <AnimatePresence>
        {textParts.map((part, index) => {
          // Jika bagian adalah newline, lewati rendering
          if (part === "\n") return null;

          return (
            <div key={index} className="flex space-x-1">
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
