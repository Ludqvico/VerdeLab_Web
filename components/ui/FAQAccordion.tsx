"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item, i) => (
        <motion.div key={i} className="py-5">
          <button
            className="flex items-start justify-between w-full text-left gap-6 group"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            data-cursor="hover"
          >
            <span className="font-sans text-base font-medium text-ink leading-snug group-hover:text-teal transition-colors duration-200">
              {item.question}
            </span>
            <motion.span
              className="shrink-0 text-teal font-light text-xl leading-none mt-0.5"
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              +
            </motion.span>
          </button>

          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pt-4 pb-2 font-sans text-sm text-ink-secondary leading-relaxed pr-10">
                  {item.answer.split(" ").map((word, wIdx, arr) => (
                    <span key={wIdx}>
                      <motion.span
                        initial={{ opacity: 0, filter: "blur(5px)", y: 2 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.05 + wIdx * 0.015,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                      {wIdx !== arr.length - 1 && " "}
                    </span>
                  ))}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
