"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Icon } from "@iconify/react";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(6px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  viewport: { once: false, margin: "-10%" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, margin: "-10%" },
  transition: { duration: 0.8, delay, ease: EASE },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, margin: "-10%" },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function Polaris() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0.1, 0.5], [-60, 0]);
  const xRight = useTransform(scrollYProgress, [0.1, 0.5], [60, 0]);

  return (
    <section
      id="polaris"
      ref={ref}
      data-theme="light"
      className="relative py-16 md:py-32 px-6 md:px-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #EAF7F5 0%, #F5F4F0 50%, #EEF0EA 100%)",
      }}
    >
      {/* Decorative large circle */}
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,180,166,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Partnership</SectionLabel>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mt-8 md:mt-12">
          {/* Left, VerdeLab */}
          <motion.div {...fadeLeft(0.1)} className="flex flex-col gap-6">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-4 py-2 w-fit"
              {...fadeUp(0.18)}
            >
              <img src="/logo.svg" alt="VerdeLab" className="w-5 h-5 object-contain" />
              <span className="font-sans text-sm font-semibold text-ink">VerdeLab</span>
              <span className="w-1 h-1 rounded-full bg-teal/40" />
              <span className="font-sans text-label text-ink-tertiary uppercase tracking-widest">Tech</span>
            </motion.div>

            <motion.h2
              className="font-serif text-[3.25rem] md:text-display-md text-ink italic leading-[0.9] md:leading-[0.85]"
              {...fadeUp(0.22)}
            >
              Tecnologia e
              <br />
              creatività.
            </motion.h2>

            <motion.p
              className="font-sans text-body-md text-ink-secondary leading-relaxed max-w-sm"
              {...fadeUp(0.38)}
            >
              VerdeLab porta l&apos;intelligenza tecnica, backend, AI, architetture solide.
              Polaris Creative Studio porta la visione creativa, brand, design, comunicazione.
              Insieme, costruiamo prodotti digitali completi.
            </motion.p>
          </motion.div>

          {/* Right, Polaris */}
          <motion.div
            {...fadeRight(0.2)}
            className="relative flex flex-col items-center text-center lg:items-start lg:text-left gap-8"
          >
            {/* Logo statico */}
            <motion.div
              className="group relative cursor-default lg:cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={() => {
                if (window.innerWidth >= 1024) {
                  window.open("https://www.polariscreative.studio/", "_blank");
                }
              }}
            >
              <div className="absolute inset-0 bg-teal/20 blur-[80px] rounded-full opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <img
                  src="/polaris.svg"
                  alt="Polaris Logo"
                  className="w-full h-full object-contain md:brightness-0 md:group-hover:brightness-100 transition-[filter] duration-500"
                />
              </div>

              {/* Floating "Visita" indicator, Desktop Only */}
              <div className="hidden lg:flex absolute -top-4 -right-4 bg-teal text-white w-20 h-20 rounded-full items-center justify-center text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 rotate-12">
                Visita ↗
              </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 md:gap-1">
                <motion.span
                  className="font-sans text-[11px] text-teal uppercase tracking-[0.3em] font-bold"
                  {...fadeUp(0.3)}
                >
                  Studio Creativo
                </motion.span>
                <motion.a
                  href="https://www.polariscreative.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/polaris-link flex items-center justify-center lg:justify-start gap-3"
                  {...fadeUp(0.38)}
                >
                  <h3 className="font-serif text-[2.25rem] md:text-display-sm text-ink italic leading-[0.85] underline decoration-black decoration-1 md:no-underline underline-offset-8">
                    Polaris Creative Studio
                  </h3>
                  <Icon
                    icon="ph:arrow-up-right-bold"
                    className="md:hidden text-black text-xl"
                  />
                </motion.a>
              </div>

              <motion.p
                className="font-sans text-body-md text-ink-secondary leading-relaxed max-w-sm mx-auto lg:mx-0"
                {...fadeUp(0.46)}
              >
                Il partner strategico di VerdeLab per dare forma e voce alle soluzioni tecnologiche.
                Specializzati in brand identity, UI/UX design e sistemi visivi evoluti.
              </motion.p>

              <motion.div
                className="flex gap-2 flex-wrap justify-center lg:justify-start mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.54 }}
              >
                {["Brand Identity", "UI/UX", "Visual Systems", "Strategy"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="font-sans text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-teal/10 bg-teal/[0.03] text-teal/70"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.56 + i * 0.07, ease: EASE }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Minor Partners ─────────────────────────────────────────── */}
        <motion.div
          className="mt-20 pt-10 border-t border-ink/[0.06]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-tertiary font-semibold">
            Partner Scientifici
          </span>

          <motion.div
            className="mt-6 md:mt-8 grid grid-cols-[auto_1fr] md:grid-cols-[auto_180px_1fr_auto] items-center gap-6 md:gap-10 py-6 md:py-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* Left, planet icon in orbital ring */}
            <div className="relative flex-shrink-0 w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-teal/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal/50" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon icon="ph:planet" className="w-8 h-8 text-ink/40" />
              </div>
            </div>

            {/* Name + badge */}
            <motion.div
              className="flex flex-col gap-1.5"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-teal/60 font-bold">
                CNR · INFM Spin-off
              </span>
              <a
                href="https://www.promete.it"
                target="_blank"
                rel="noopener noreferrer"
                className="group/promete flex items-center gap-2"
              >
                <h3 className="font-serif italic text-[2.25rem] md:text-4xl text-black leading-[0.85] underline decoration-black decoration-1 md:no-underline underline-offset-8">
                  Promete
                </h3>
                <Icon
                  icon="ph:arrow-up-right-bold"
                  className="md:hidden text-black text-xl"
                />
              </a>
            </motion.div>

            {/* Description */}
            <motion.p
              className="hidden md:block font-sans text-sm text-ink-secondary leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.38 }}
            >
              Ricerca industriale, trasferimento tecnologico e R&amp;D applicato,
              partner scientifico di VerdeLab per progetti ad alto contenuto innovativo.
            </motion.p>

            {/* Tags + link */}
            <motion.div
              className="hidden md:flex flex-col items-end gap-3"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
            >
              <div className="flex gap-2 flex-wrap justify-end">
                {["R&D", "Fisica", "Tech Transfer"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="font-sans text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 border border-ink/[0.08] text-ink-tertiary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.48 + i * 0.07 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <a
                href="https://www.promete.it"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative font-sans text-[10px] uppercase tracking-[0.2em] text-teal font-semibold inline-block"
              >
                promete.it ↗
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-teal group-hover/link:w-full transition-all duration-300 ease-out" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
