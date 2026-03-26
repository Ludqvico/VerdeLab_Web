"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedInputFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  className?: string;
  isTextArea?: boolean;
  rows?: number;
}

export default function AnimatedInputField({
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  className,
  isTextArea = false,
  rows = 5,
}: AnimatedInputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const characters = value.split("");

  const Component = isTextArea ? "textarea" : "input";

  return (
    <div className="relative w-full group/animated-input" ref={containerRef}>
      {/* Hidden real input for functionality */}
      <Component
        type={!isTextArea ? type : undefined}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        placeholder={value ? "" : placeholder}
        rows={isTextArea ? rows : undefined}
        className={cn(
          "w-full font-sans text-sm bg-transparent outline-none transition-colors duration-200",
          "text-transparent caret-transparent selection:bg-teal/20 selection:text-transparent", 
          "placeholder:text-transparent",
          isTextArea ? "resize-none" : "",
          className
        )}
        style={{
          WebkitTextFillColor: "transparent",
        }}
      />

      {/* Animated overlay */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none flex flex-wrap content-start font-sans text-sm outline-none bg-transparent border-transparent select-none",
          isTextArea ? "p-4" : "items-center px-4",
          className 
        )}
        style={{ 
          whiteSpace: isTextArea ? "pre-wrap" : "nowrap", 
          overflow: "hidden",
          lineHeight: "1.5",
          backgroundColor: "transparent",
          borderColor: "transparent",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {characters.map((char, index) => (
            <motion.span
              key={`${index}-${char}`}
              layout
              initial={{ opacity: 0, filter: "blur(8px)", x: -2 }}
              animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="inline-block text-ink min-w-[0.25em]"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          
          {/* Custom Animated Cursor */}
          {isFocused && (
            <motion.div
              key="cursor"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                ease: "linear",
                layout: { duration: 0.2, ease: "easeOut" } // Move smoothly
              }}
              className="w-[1.5px] h-[1.25em] bg-teal ml-[0.5px]"
            />
          )}
        </AnimatePresence>
        
        {/* Synthetic Placeholder */}
        {!value && placeholder && !isFocused && (
          <span className="text-ink-tertiary select-none">
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
}
