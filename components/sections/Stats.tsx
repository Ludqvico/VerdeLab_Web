"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionLabel from "@/components/ui/SectionLabel";

const stats = [
  { value: 25, suffix: "+", label: "anni di esperienza AI", description: "Attivi nel NLP e AI applicata dal 2003" },
  { value: 100, suffix: "+", label: "soluzioni sviluppate", description: "Agenti, workflow, API e sistemi NLP su misura" },
  { value: 3, suffix: "", label: "prodotti proprietari", description: "CleverFlow, TURNI e soluzioni verticali" },
  { value: 2, suffix: "", label: "partner d'eccellenza", description: "Polaris Creative Studio e Promete CNR" },
];

export default function Stats() {
  return (
    <section
      data-theme="light"
      className="py-16 md:py-24 px-6 md:px-10"
      style={{ background: "#EDECEA" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel className="mb-16">VerdeLab in numeri</SectionLabel>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border overflow-hidden rounded-2xl">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-[#EDECEA] p-8 flex flex-col gap-3"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-serif italic text-display-lg text-ink leading-none">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <div>
                <p className="font-sans font-medium text-sm text-ink mb-1">{stat.label}</p>
                <p className="font-sans text-xs text-ink-tertiary leading-snug">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
