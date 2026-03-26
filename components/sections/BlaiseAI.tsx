"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionLabel from "@/components/ui/SectionLabel";

const features = [
  {
    title: "Workflow Zero-Touch",
    description: "Dalla ricezione di email e documenti all'aggiornamento dell'ERP: il flusso si gestisce in autonomia, senza intervento umano.",
    icon: "◈",
  },
  {
    title: "Elaborazione documenti & email",
    description: "Lettura, classificazione e routing intelligente di qualsiasi formato documentale in ingresso. Il contenuto estratto, instradato e processato automaticamente.",
    icon: "▤",
  },
  {
    title: "Integrazione ERP & gestionali",
    description: "Sincronizzazione bidirezionale con i principali sistemi gestionali aziendali. I dati aggiornati dove servono, nel momento in cui servono.",
    icon: "⊞",
  },
  {
    title: "Decisioni agentiche",
    description: "L'agente analizza, interpreta e decide il percorso giusto per ogni documento o richiesta, adattandosi al contesto e alle regole aziendali.",
    icon: "◎",
  },
];

export default function BlaiseAI() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const xLine = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section
      id="cleverflow"
      ref={ref}
      data-theme="dark"
      className="relative overflow-hidden pt-[calc(4rem+1.5px)] md:pt-[calc(8rem+1.5px)] pb-[calc(4rem+1.5px)] md:pb-[calc(8rem+1.5px)] px-6 md:px-10"
      style={{ 
        background: "#0C0C0C",
        marginTop: "-1.5px",
        marginBottom: "-1.5px",
        transform: "translateZ(0)",
        willChange: "transform"
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,180,166,0.10) 0%, transparent 65%)",
          transform: "translateZ(0)"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Progetto in Evidenza</SectionLabel>
        </motion.div>

        {/* Hero text */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mb-12 md:mb-20">
          <div className="md:col-span-7">
            <motion.h2
              className="font-serif italic text-display-xl text-white leading-[0.82] mb-6"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Clever<span style={{ color: "#00B4A6" }}>Flow</span>
            </motion.h2>
            <motion.p
              className="font-sans text-body-lg text-white/60 max-w-lg leading-relaxed"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Software AI-based per l&apos;automazione dei processi aziendali.
              Sviluppato da VerdeLab,{" "}
              <span className="text-white/90">workflow Zero-Touch che collegano email, documenti e ERP senza intervento umano.</span>
            </motion.p>
          </div>

          <motion.div
            className="md:col-span-5 md:pt-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="border-l-2 border-teal pl-6">
              <p className="font-serif italic text-xl text-white/80 leading-relaxed">
                &ldquo;Un&apos;architettura agentica applicata all&apos;operation aziendale, dalla ricezione di un documento al suo aggiornamento nel gestionale, tutto automatico.&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>

        {/* Animated line */}
        <div className="relative h-px bg-white/5 mb-16 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-teal"
            style={{ width: xLine }}
          />
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="bg-[#0C0C0C] p-7 group hover:bg-[#141414] transition-colors duration-300"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-5%" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
            >
              <span className="block text-2xl text-teal mb-5 font-sans">{feat.icon}</span>
              <h3 className="font-sans font-semibold text-white text-sm mb-3 group-hover:text-teal transition-colors duration-200">
                {feat.title}
              </h3>
              <p className="font-sans text-xs text-white/40 leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0 mt-12 md:mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <span className="font-sans text-xs text-white/30 uppercase tracking-[0.12em]">
              In sviluppo attivo, architettura agentica
            </span>
          </div>
          <MagneticButton
            href="https://github.com/VerdeLab"
            variant="secondary"
            className="border-white/20 text-white hover:border-teal hover:text-teal"
            icon="ph:sparkle-duotone"
          >
            Scopri CleverFlow
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
