"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const events = [
  {
    year: "2003",
    title: "L'origine di tutto.",
    body: "OMEO nasce in collaborazione con Promete (spin-off INFM-CNR): un sistema di analisi linguistica applicata alla materia medica omeopatica. I Large Language Model non esistevano. NLP era confinato ai laboratori accademici. VerdeLab iniziava già a risolvere i problemi che risolve oggi.",
    accent: false,
    tag: "Fondazione",
    tech: "NLP • Semantic Analysis • Linguistic AI",
    status: "Foundation"
  },
  {
    year: "2021",
    title: "Infrastruttura proprietaria.",
    body: "L'anno delle fondamenta. VerdeLab-MetaEngine, LUIGO (primo chatbot enterprise italiano), motore di ricerca semantico con grafi, API NLP proprietarie, pipeline ML su SQL Server. Il nucleo tecnologico da cui nascono molti sviluppi successivi.",
    accent: false,
    tag: "Costruzione",
    tech: "Semantic Search • Chatbot • ML Pipelines",
    status: "Core Infrastructure"
  },
  {
    year: "Nov 2022",
    title: "Il mondo scopre l'AI.",
    body: "ChatGPT viene rilasciato. Il pubblico rimane stupito. VerdeLab era già lì, con quasi vent'anni di NLP applicato, sistemi in produzione e una visione chiara su dove stava andando il settore.",
    accent: true,
    tag: "Il mondo ci raggiunge",
    tech: "Production Ready • LLM Ops",
    status: "Market Validation"
  },
  {
    year: "2023",
    title: "Generative AI applicata.",
    body: "BlaiseAI, JewelsAI, Tra'ntra. VerdeLab esplora le frontiere dell'AI generativa: piattaforme conversazionali avanzate, cataloghi generativi nel settore orafo, trascrizione e sintesi automatica di contenuti audio e video.",
    accent: false,
    tag: "Espansione",
    tech: "Generative AI • RAG • Knowledge Graph",
    status: "Product Launch"
  },
  {
    year: "2024–2025",
    title: "Architetture agentiche.",
    body: "Agenti su misura per clienti nel metalmeccanico, food e altri comparti produttivi. Refactoring con integrazioni AI di soluzioni consolidate. LLM open source on-premise per chi non vuole dipendere da infrastrutture esterne.",
    accent: false,
    tag: "Evoluzione",
    tech: "Agentic AI • Multi-agent • On-premise LLM",
    status: "Scale Phase"
  },
  {
    year: "Oggi",
    title: "CleverFlow & il futuro.",
    body: "CleverFlow automatizza i processi aziendali con workflow Zero-Touch. TURNI porta l'AI nelle strutture ospedaliere. VerdeLab è il partner di riferimento per architetture agentiche enterprise, l'AI non è una moda, è il nostro mestiere dal 2003.",
    accent: false,
    tag: "Presente",
    tech: "Agentic Architecture • Zero-Touch • Enterprise AI",
    status: "In Produzione"
  },
];

// ─── Total steps: 1 intro + N events ──────────────────────────────────────────
const TOTAL_STEPS = 1 + events.length; 

function stepRange(i: number): [number, number] {
  const sliceSize = 1 / TOTAL_STEPS;
  const start = i * sliceSize;
  const end = start + sliceSize;
  return [start, end];
}

// ─── Single card driven by its step index ─────────────────────────────────────
function StepCard({
  scrollYProgress,
  stepIndex,
  children,
}: {
  scrollYProgress: any;
  stepIndex: number;
  children: React.ReactNode;
}) {
  const [start, end] = stepRange(stepIndex);
  const mid = (start + end) / 2;
  const fadeSize = (end - start) * 0.25;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fadeSize, end - fadeSize, end],
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.96, 1, 0.96]
  );

  const blur = useTransform(
    scrollYProgress,
    [start, start + fadeSize, end - fadeSize, end],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]
  );

  return (
    <motion.div
      style={{ opacity, scale, filter: blur }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      {children}
    </motion.div>
  );
}

// ─── Progress dots ─────────────────────────────────────────────────────────────
function ProgressDots({
  scrollYProgress,
}: {
  scrollYProgress: any;
}) {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
        const [start, end] = stepRange(i);
        const mid = (start + end) / 2;
        
        // Progress weight: 1 when active, 0 otherwise
        // Using a smooth transition for the width
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dotWidth = useTransform(
          scrollYProgress,
          [start, mid, end],
          [6, 16, 6]
        );
        
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dotOpacity = useTransform(
          scrollYProgress,
          [start, mid, end],
          [0.35, 1, 0.35]
        );

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dotColor = useTransform(
          scrollYProgress,
          [start, mid, end],
          ["rgba(255,255,255,0.4)", "rgba(0,180,166,1)", "rgba(255,255,255,0.4)"]
        );
        
        return (
          <motion.div
            key={i}
            className="h-1.5 rounded-full"
            style={{ 
              width: dotWidth, 
              opacity: dotOpacity,
              backgroundColor: dotColor,
              boxShadow: i === 0 ? "none" : "0 0 10px rgba(0,180,166,0)" // Placeholder for active glow if needed
            }}
          />
        );
      })}
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      className="relative"
      style={{ height: `${TOTAL_STEPS * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "#080808" }}>

        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] bg-teal/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] bg-white/[0.02] blur-[100px] rounded-full" />
        </div>

        {/* Dynamic Background Year */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {events.map((ev, i) => {
            const [start, end] = stepRange(i + 1);
            const sliceFade = (end - start) * 0.15;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress, 
              [start, start + sliceFade, end - sliceFade, end], 
              [0, 0.22, 0.22, 0] // Slightly increased from 0.15 for better visibility
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [start, end], [20, -20]);
            
            return (
              <motion.span
                key={ev.year}
                style={{ 
                  opacity, 
                  y,
                  WebkitTextStroke: "1px rgba(255,255,255,0.35)", // Subtle stroke for sharpness
                  color: "transparent",
                }}
                className="absolute bottom-12 right-12 font-serif italic text-[12vw] leading-none select-none whitespace-nowrap"
              >
                {ev.year.split(" ").pop()}
              </motion.span>
            );
          })}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />

        {/* ── Step 0: Intro ──────────────────────────────────────── */}
        <StepCard scrollYProgress={scrollYProgress} stepIndex={0}>
          <div className="text-center max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 font-sans text-[10px] text-teal uppercase tracking-[0.25em] mb-8"
            >
              <div className="w-8 h-px bg-teal/40" />
              Pionieri dell&apos;AI
              <div className="w-8 h-px bg-teal/40" />
            </motion.div>
            
            <h2 className="font-serif italic text-[clamp(3.5rem,8vw,8rem)] text-white leading-[0.82] mb-8 tracking-tight">
              Eravamo già <span className="text-teal">qui.</span>
            </h2>
            
            <p className="font-sans text-body-lg text-white/40 max-w-lg mx-auto leading-relaxed">
              Non seguiamo l&apos;onda, l&apos;abbiamo prevista. Lavoriamo sull&apos;intelligenza
              artificiale applicata dal 2003, quando il termine NLP era confinato ai laboratori accademici.
            </p>

            <div className="mt-16 flex flex-col items-center gap-4">
              <div className="w-px h-16 bg-gradient-to-b from-teal to-transparent" />
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30 animate-pulse">
                Evolution scroll
              </span>
            </div>
          </div>
        </StepCard>

        {/* ── Steps 1‥N: Events ──────────────────────────────────── */}
        {events.map((event, i) => (
          <StepCard key={event.year} scrollYProgress={scrollYProgress} stepIndex={i + 1}>
            <div className="relative w-full max-w-2xl px-4 lg:px-0">
              
              <div className="flex items-end justify-between mb-4 px-2">
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] text-teal uppercase tracking-[0.2em] mb-1">
                    Timeline Node
                  </span>
                  <span className="font-sans font-bold text-4xl md:text-5xl text-white tracking-tighter tabular-nums leading-none">
                    {event.year}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-sans text-[10px] text-white/20 mb-1">STP_0{i+1}</span>
                  <div className={`px-3 py-1 rounded-sm border ${event.accent ? "border-teal/40 text-teal bg-teal/5" : "border-white/10 text-white/40"} font-sans text-[9px] uppercase tracking-wider`}>
                    {event.tag}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-teal/40" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-teal/40" />
                
                <div className={`
                  relative backdrop-blur-xl rounded-sm border p-6 sm:p-10 lg:p-12 transition-all duration-500
                  ${event.accent 
                    ? "bg-white/[0.03] border-teal/30 shadow-[inset_0_0_20px_rgba(0,180,166,0.05)]" 
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"}
                `}>
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-white/10" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 border-r border-t border-white/10" />
                  </div>

                  <h3 className={`font-serif italic text-3xl md:text-display-md leading-tight mb-4 md:mb-6 transition-colors duration-500 ${event.accent ? "text-teal" : "text-white"}`}>
                    {event.title}
                  </h3>
                  
                  <p className="font-sans text-sm md:text-body-md text-white/50 leading-relaxed max-w-xl">
                    {event.body}
                  </p>

                  <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="font-sans text-[8px] text-white/20 uppercase tracking-[0.2em] mb-1">Technical Stack</span>
                      <span className={`font-mono text-[10px] ${event.accent ? "text-teal" : "text-white/40"}`}>
                        {event.tech}
                      </span>
                    </div>
                    <div className="flex flex-col sm:text-right">
                      <span className="font-sans text-[8px] text-white/20 uppercase tracking-[0.2em] mb-1">System Status</span>
                      <span className="font-mono text-[10px] text-white/60 flex items-center sm:justify-end gap-2">
                        <span className={`w-1 h-1 rounded-full ${event.accent ? "bg-teal animate-pulse" : "bg-white/30"}`} />
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full border ${event.accent ? "border-teal bg-teal/20" : "border-white/20"} transition-all duration-500`} />
                <div className="w-12 h-px bg-white/10" />
              </div>
            </div>
          </StepCard>
        ))}

        <ProgressDots scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
