"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const pillars = [
  {
    num: "01",
    title: "AI agentiche dal 2003",
    body: "Lavoriamo sull'elaborazione del linguaggio e sull'intelligenza artificiale applicata da oltre vent'anni, ben prima che diventasse mainstream. Agenti autonomi, non demo.",
    type: "timeline",
    details: ["OMEO 2003", "NLP", "LLM", "Agenti Autonomi", "Orchestrazione"]
  },
  {
    num: "02",
    title: "Software su misura",
    body: "Architetture agentiche, orchestrazione di agenti multipli, prompt engineering avanzato. Combinati con una solida base in sviluppo software, data science e consulenza strategica.",
    type: "blueprint",
    details: ["Agentic AI", "Multi-agent", "Prompt Engineering", "Full Stack Dev"]
  },
  {
    num: "03",
    title: "Risultati misurabili",
    body: "Niente hype, niente sovrastrutture. Ogni progetto nasce da un'analisi accurata e si realizza con efficienza. Il vero vantaggio competitivo si costruisce quando tecnologia e persone lavorano insieme.",
    type: "stats",
    details: {
      value: "25+",
      label: "Anni di esperienza AI",
      desc: "dal progetto OMEO (2003) alle architetture agentiche enterprise"
    }
  },
];

function PillarCard({ p, i }: { p: typeof pillars[0]; i: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-15%" }}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl"
    >
      <div
        className="group relative flex flex-col md:flex-row gap-4 md:gap-8 items-start p-6 md:p-8 rounded-2xl border border-transparent hover:border-border hover:bg-white/70 transition-all duration-300 w-full h-full"
      >
        {/* Radial Accent Gradient Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ clipPath: "circle(0% at 100% 0%)", opacity: 0 }}
          animate={{ 
            clipPath: isHovered ? "circle(150% at 100% 0%)" : "circle(0% at 100% 0%)",
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "radial-gradient(circle at 100% 0%, rgba(20, 184, 166, 0.1) 0%, transparent 70%)",
          }}
        />

        {/* Number */}
        <span
          className="font-serif italic text-5xl text-ink leading-none shrink-0 mt-1 group-hover:text-teal transition-colors duration-300"
          style={{ opacity: 0.18 }}
        >
          {p.num}
        </span>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col">
          <h3 className="font-sans font-semibold text-xl text-ink mb-2 leading-snug flex items-center gap-3 shrink-0">
            {p.title}
            {p.type === "stats" && isHovered && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full uppercase tracking-wider font-bold"
              >
                Impact
              </motion.span>
            )}
          </h3>

          <div className="grid grid-cols-1 grid-rows-1 items-start">
            {/* Normal Body */}
            <motion.div
              animate={{ 
                opacity: !isHovered ? 1 : 0, 
                y: !isHovered ? 0 : -10,
                pointerEvents: !isHovered ? "auto" : "none"
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="col-start-1 row-start-1"
            >
              <p className="font-sans text-sm text-ink-secondary leading-relaxed max-w-xl">
                {p.body}
              </p>
            </motion.div>

            {/* Deep Insight Details */}
            <motion.div
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 10,
                pointerEvents: isHovered ? "auto" : "none"
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="col-start-1 row-start-1"
            >
              {/* NLP Timeline */}
              {p.type === "timeline" && Array.isArray(p.details) && (
                <div className="flex flex-wrap gap-x-5 gap-y-3 items-center">
                  {p.details.map((item, idx) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <span className="text-[10px] font-sans text-teal uppercase tracking-widest font-bold opacity-60">
                        {item}
                      </span>
                      {Array.isArray(p.details) && idx < p.details.length - 1 && (
                        <div className="w-3 h-[1px] bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Backend Blueprint Detail */}
              {p.type === "blueprint" && Array.isArray(p.details) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {p.details.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-teal/40" />
                      <span className="text-[11px] font-sans text-ink-secondary uppercase tracking-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* AI Impact Stats */}
              {p.type === "stats" && typeof p.details === "object" && !Array.isArray(p.details) && (
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-5">
                  <div>
                    <div className="text-3xl font-serif italic text-teal leading-none mb-1">
                      {p.details.value}
                    </div>
                    <div className="text-[9px] font-sans text-ink-secondary uppercase tracking-widest font-bold">
                      {p.details.label}
                    </div>
                  </div>
                  <div className="text-[11px] font-sans text-ink-secondary/70 italic max-w-[180px] leading-snug pb-0.5">
                    {p.details.desc}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0.1, 0.6], [-30, 0]);

  return (
    <section
      ref={ref}
      data-theme="light"
      className="relative py-16 md:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5F4F0 0%, #EDECEA 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">

          {/* Left, sticky identity */}
          <div className="md:col-span-4">
            <SectionLabel>Chi siamo</SectionLabel>
            <motion.h2
              className="font-serif italic text-[3.25rem] md:text-display-md text-ink mt-5 leading-[0.9] md:leading-[0.85]"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Intelligenza
              <br />artificiale.
              <br />Risultati reali.
            </motion.h2>

          </div>

          {/* Right, 3 pillar cards */}
          <div className="md:col-span-8 flex flex-col gap-px">
            {pillars.map((p, i) => (
              <PillarCard key={p.num} p={p} i={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
