"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
}

export default function MarqueeText({ text, className, speed = 30, direction = "left" }: MarqueeTextProps) {
  const items = Array(6).fill(text);

  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <motion.div
        className={cn("inline-flex gap-16 py-2", className)}
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-16">
            {item}
            <span className="text-teal text-xl">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
