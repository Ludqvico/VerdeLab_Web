"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";

const services = [
  {
    index: "01",
    slug: "agentic-ai",
    title: "Agentic AI & Orchestrazione",
    description: "Agenti autonomi capaci di agire, decidere e integrarsi nei flussi aziendali esistenti. Architetture multi-agente per automatizzare processi complessi end-to-end.",
    tags: ["Agentic AI", "Multi-agent", "Orchestrazione"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    index: "02",
    slug: "prompt-engineering",
    title: "Prompt Engineering & NLP",
    description: "Prompt engineering avanzato, Natural Language Processing su misura e Generative AI applicata. Dal testo alla semantica, dall'estrazione al ragionamento automatico.",
    tags: ["Prompt Eng.", "NLP", "Generative AI"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    index: "03",
    slug: "cleverflow",
    title: "CleverFlow",
    description: "Automazione dei processi aziendali con workflow Zero-Touch. Collega email, documenti e ERP senza intervento umano, dalla ricezione all'aggiornamento del gestionale.",
    tags: ["Zero-Touch", "ERP Integration", "Workflow AI"],
    highlight: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    index: "04",
    slug: "office-automation",
    title: "Office Automation",
    description: "Gestione intelligente di pratiche, comunicazioni, customer service e processi ripetitivi. L'AI che libera il personale dalle attività a basso valore aggiunto.",
    tags: ["Automazione", "Customer Service", "Process AI"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a10 10 0 0 1-10-10C2 6.48 6.48 2 12 2z" /><path d="M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    ),
  },
  {
    index: "05",
    slug: "data-intelligence",
    title: "Data Intelligence & ML",
    description: "Analisi granulare a supporto di decisioni rapide e informate. Machine learning, pattern recognition e modelli predittivi integrati nei processi produttivi.",
    tags: ["Data Science", "ML", "Analytics"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    index: "06",
    slug: "consulenza-formazione",
    title: "Consulenza & Formazione",
    description: "IT consulting, project management e formazione sui modelli AI. Aiutiamo i team a dialogare con i modelli linguistici e a costruire competenze AI durature.",
    tags: ["IT Consulting", "Formazione AI", "Strategy"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Use MotionValues for tilt to avoid React re-renders on mouse move
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the motion values using springs
  const rotateX = useSpring(y, { stiffness: 280, damping: 28 });
  const rotateY = useSpring(x, { stiffness: 280, damping: 28 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    
    // Set motion values directly (no React state update)
    x.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    y.set(((e.clientY - r.top) / r.height - 0.5) * -10);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      data-cursor="hover"
      style={{ perspective: 900 }}
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-6%" }}
      transition={{
        duration: 0.75,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group"
    >
      {/* Clickable overlay — full card link, moved to top level for reliable single-click */}
      <Link
        href={`/servizi/${service.slug}`}
        className="absolute inset-0 z-30 rounded-2xl"
        aria-label={`Scopri ${service.title}`}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative z-10 h-full rounded-2xl p-7 border transition-colors duration-300 ${
          service.highlight
            ? "border-teal/30 bg-gradient-to-br from-[#EAF7F5] to-[#F5F4F0]"
            : "border-border bg-surface group-hover:border-teal/25 group-hover:bg-white/80"
        }`}
      >
        {/* Top row: index + icon */}
        <div className="flex items-start justify-between mb-7">
          <span
            className="font-serif italic text-[2.5rem] leading-none text-ink opacity-[0.22] group-hover:opacity-[0.12] transition-opacity duration-300"
          >
            {service.index}
          </span>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
              service.highlight
                ? "bg-teal/10 text-teal"
                : "bg-surface-2 text-ink-secondary group-hover:bg-teal/12 group-hover:text-teal"
            }`}
          >
            {service.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-sans font-semibold text-ink text-base mb-3 leading-snug">
          {service.highlight ? <GradientText>{service.title}</GradientText> : service.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-ink-secondary leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className={`font-sans text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full ${
                service.highlight ? "bg-teal/10 text-teal" : "bg-surface-2 text-ink-tertiary"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover arrow */}
        <motion.span
          className="absolute bottom-6 right-6 text-teal text-sm z-20 pointer-events-none"
          initial={{ opacity: 0, x: 6 }}
          animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
          transition={{ duration: 0.18 }}
        >
          →
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 0.4], [30, 0]);

  return (
    <section id="services" ref={ref} data-theme="light" className="relative py-16 md:py-28 px-6 md:px-10" style={{ background: "#F5F4F0" }}>
      <div id="services-anchor" className="absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Servizi</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-serif text-display-lg text-ink mt-4 leading-[0.9] md:leading-[0.85]"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Cosa{" "}
              <span className="italic">
                <GradientText>costruiamo.</GradientText>
              </span>
            </motion.h2>
          </div>
          <motion.p
            className="font-sans text-sm text-ink-secondary max-w-xs leading-relaxed"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Intelligenza artificiale applicata e software su misura, dall&apos;agente autonomo al workflow aziendale zero-touch.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.index} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
