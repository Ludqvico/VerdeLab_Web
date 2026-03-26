"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  containerClassName?: string;
}

export default function TextReveal({ text, className, containerClassName }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("relative", containerClassName)}>
      <p className={cn("flex flex-wrap gap-x-[0.3em]", className)}>
        {words.map((word, i) => {
          const wordStart = i / words.length;
          const wordEnd = (i + 1) / words.length;

          return (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[wordStart, wordEnd]}
            />
          );
        })}
      </p>
    </div>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {word}
    </motion.span>
  );
}
