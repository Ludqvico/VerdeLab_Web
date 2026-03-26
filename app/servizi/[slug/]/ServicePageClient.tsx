"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import InteractiveGrid from "@/components/ui/InteractiveGrid";
import GradientText from "@/components/ui/GradientText";
import { ServiceData, servicesData } from "@/lib/services-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    value: "2003",
    label: "L'anno in cui abbiamo cominciato",
    body: "NLP e AI applicata molto prima che diventassero mainstream. Ogni progetto poggia su oltre vent'anni di competenza reale.",
  },
  {
    value: "100%",
    label: "Su misura, sempre",
    body: "Nessuna soluzione preconfezionata. Ogni architettura viene progettata sul problema specifico del cliente, non adattata da un template.",
  },
  {
    value: "On,Off",
    label: "Cloud e on-premise",
    body: "Lavoriamo con modelli online e in locale. La scelta dipende da sicurezza, latenza e costo, non dalla moda del momento.",
  },
];

/* ─── Service icon map ───────────────────────────────────────────────────── */
const SERVICE_ICONS: Record<string, string> = {
  "agentic-ai": "ph:robot-duotone",
  "prompt-engineering": "ph:chat-dots-duotone",
  "cleverflow": "ph:flow-arrow-duotone",
  "office-automation": "ph:buildings-duotone",
  "data-intelligence": "ph:chart-line-up-duotone",
  "consulenza-formazione": "ph:graduation-cap-duotone",
};

const CAROUSEL_GAP = 20;

/* ─── Image slot ─────────────────────────────────────────────────────────── */
function ImageSlot({
  src,
  alt,
  index,
}: {
  src: string | null;
  alt: string;
  index: number;
}) {
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden rounded-2xl bg-surface-2 border border-border"
      initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-8%" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif italic text-Display-sm text-ink/10 select-none">
            0{index + 1}
          </span>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Service Suggestions ────────────────────────────────────────────────── */
function ServiceSuggestions({ currentSlug }: { currentSlug: string }) {
  // Memoize random selection to avoid recalculating on every render, but pick new ones on every page load/mount
  const suggestions = useMemo(() => {
    const others = servicesData.filter((s) => s.slug !== currentSlug);
    return others.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [currentSlug]);

  return (
    <>
      {/* Header: label + heading */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <SectionLabel>Esplora altri servizi</SectionLabel>
          </motion.div>
          <motion.h2
            className="font-serif italic text-display-sm text-ink leading-[1]"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
          >
            Cosa altro
            <br />
            <GradientText>costruiamo.</GradientText>
          </motion.h2>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {suggestions.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            className="group relative h-[320px] rounded-2xl border border-border bg-white/40 backdrop-blur-md p-8 flex flex-col justify-between overflow-hidden hover:border-teal/30 hover:bg-white/60 transition-all duration-500"
          >
            {/* Ambient teal glow */}
            <div
              className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: "radial-gradient(circle, rgba(0,180,166,0.15) 0%, transparent 70%)",
              }}
            />

            {/* Top row: icon + index */}
            <div className="flex items-start justify-between relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center shrink-0 border border-teal/5 group-hover:bg-teal/20 transition-colors duration-500">
                <Icon
                  icon={SERVICE_ICONS[s.slug] ?? "ph:cube-duotone"}
                  className="text-2xl text-teal"
                />
              </div>
              <span className="font-serif italic text-4xl text-ink/5 group-hover:text-ink/10 transition-colors duration-500 select-none">
                0{i + 1}
              </span>
            </div>

            {/* Content */}
            <div className="mt-8 relative z-10">
              <h3 className="font-serif italic text-2xl text-ink leading-[1.1] mb-3 group-hover:text-teal transition-colors duration-300">
                {s.title}
              </h3>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed line-clamp-3">
                {s.tagline}
              </p>
            </div>

            {/* Bottom: tags + arrow icon */}
            <div className="flex items-center justify-between mt-auto pt-6 relative z-10">
              <div className="flex flex-wrap gap-2">
                {s.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="font-sans text-[10px] uppercase tracking-widest text-ink-tertiary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-teal group-hover:text-white group-hover:border-teal transition-all duration-300">
                <Icon icon="ph:arrow-up-right" className="text-sm" />
              </div>
            </div>

            {/* Full-card link overlay */}
            <Link
              href={`/servizi/${s.slug}`}
              className="absolute inset-0 z-20"
              aria-label={`Scopri ${s.title}`}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function ServicePageClient({ service }: { service: ServiceData }) {

  return (
    <>
      {/* ── 1. Hero (light, dot grid) ────────────────────────────────────── */}
      <section
        data-theme="light"
        className="relative overflow-x-hidden pt-32 md:pt-44 pb-20 md:pb-28 px-6 md:px-10"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0,180,166,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 85%, rgba(0,180,166,0.055) 0%, transparent 55%),
            #F5F4F0
          `,
        }}
      >
        <InteractiveGrid />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12"
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 font-sans text-xs text-ink-tertiary hover:text-teal transition-colors duration-200 uppercase tracking-[0.12em]"
            >
              <span>←</span>
              <span>Tutti i servizi</span>
            </Link>
          </motion.div>

          {/* Two-column grid */}
          <div className="grid md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-end">

            {/* Left: title + tagline + tags */}
            <div>
              <motion.h1
                className="font-serif italic text-display-lg leading-[0.85] mb-6 pb-6 bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #00B4A6 0%, #009E91 50%, #007A70 100%)" }}
                initial={{ opacity: 0, filter: "blur(12px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
              >
                {service.title}
              </motion.h1>

              <motion.p
                className="font-sans text-body-lg text-ink-secondary max-w-lg leading-relaxed mb-8"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
              >
                {service.tagline}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              >
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-[10px] uppercase tracking-[0.12em] px-3 py-1 rounded-full border border-border text-ink-tertiary"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: highlights panel */}
            <motion.div
              className="border border-border rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm mt-10 md:mt-0"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              {service.highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  className="flex gap-4 px-6 py-5 border-b border-border last:border-b-0"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.42 + i * 0.1, ease: EASE }}
                >
                  <Icon icon={h.icon} className="text-xl text-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans font-semibold text-sm text-ink mb-1 leading-snug">
                      {h.title}
                    </p>
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                      {h.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. Problem + Approach (light) ───────────────────────────────── */}
      <section
        data-theme="light"
        className="py-16 md:py-24 px-6 md:px-10"
        style={{ background: "#F5F4F0" }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">

          {/* Left: problem */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5"
            >
              <SectionLabel>Il problema</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-serif italic text-display-sm text-ink leading-[1] mb-6"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
            >
              {service.problemHeading}
            </motion.h2>
            <motion.p
              className="font-sans text-sm text-ink-secondary leading-relaxed"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            >
              {service.problem}
            </motion.p>

            {/* Intro pull-quote */}
            <motion.blockquote
              className="border-l-2 border-teal pl-5 mt-8"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              <p className="font-serif italic text-base text-ink/60 leading-relaxed">
                &ldquo;{service.intro}&rdquo;
              </p>
            </motion.blockquote>
          </div>

          {/* Right: approach */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-8"
            >
              <SectionLabel>{service.approachHeading}</SectionLabel>
            </motion.div>

            <div className="flex flex-col gap-px">
              {service.approach.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="group flex gap-5 py-5 border-t border-border first:border-t-0"
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, margin: "-8%" }}
                  transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
                >
                  <span
                    className="font-serif italic text-2xl text-ink leading-none shrink-0 mt-0.5 group-hover:text-teal transition-colors duration-300"
                    style={{ opacity: 0.2 }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-sans font-semibold text-sm text-ink mb-1.5 group-hover:text-teal transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Image grid (light) ────────────────────────────────────────── */}
      <section
        data-theme="light"
        className="pb-16 md:pb-24 px-6 md:px-10"
        style={{ background: "#F5F4F0" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {/* Row 1: wide | narrow */}
            <div className="col-span-2 h-56 md:h-80">
              <ImageSlot src={service.images[0]} alt={`${service.title} immagine 1`} index={0} />
            </div>
            <div className="col-span-1 h-56 md:h-80">
              <ImageSlot src={service.images[1]} alt={`${service.title} immagine 2`} index={1} />
            </div>
            {/* Row 2: narrow | wide */}
            <div className="col-span-1 h-56 md:h-80">
              <ImageSlot src={service.images[2]} alt={`${service.title} immagine 3`} index={2} />
            </div>
            <div className="col-span-2 h-56 md:h-80">
              <ImageSlot src={service.images[3]} alt={`${service.title} immagine 4`} index={3} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Perché VerdeLab (light) ──────────────────────────────────── */}
      <section
        data-theme="light"
        className="py-16 md:py-24 px-6 md:px-10"
        style={{ background: "linear-gradient(180deg, #F5F4F0 0%, #EDECEA 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-4"
              >
                <SectionLabel>Perché VerdeLab</SectionLabel>
              </motion.div>
              <motion.h2
                className="font-serif italic text-display-sm text-ink leading-[1]"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
              >
                Competenza reale,<br />non marketing.
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              <MagneticButton
                href="/#contact"
                variant="primary"
                icon="ph:arrow-right"
                iconPosition="right"
              >
                Parliamo del tuo progetto
              </MagneticButton>
            </motion.div>
          </div>

          {/* 3 pillars */}
          <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                className="bg-base p-8"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, margin: "-8%" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              >
                <div
                  className="font-serif italic text-display-md leading-none mb-4 bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #00B4A6 0%, #009E91 50%, #007A70 100%)" }}
                >
                  {p.value}
                </div>
                <p className="font-sans font-semibold text-sm text-ink mb-2">{p.label}</p>
                <p className="font-sans text-sm text-ink-secondary leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Altri servizi — suggestions grid ─────────────────────────── */}
      <section
        data-theme="light"
        className="relative py-16 md:py-28 px-6 md:px-10 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #EAF7F5 0%, #F5F4F0 50%, #EEF0EA 100%)",
        }}
      >
        {/* Decorative glow — top right */}
        <div
          className="absolute -right-24 -top-24 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,180,166,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Decorative glow — bottom left */}
        <div
          className="absolute -left-16 bottom-0 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,180,166,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <ServiceSuggestions currentSlug={service.slug} />

          {/* Secondary home link */}
          <motion.div
            className="mt-12 md:mt-16 flex justify-center"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-ink-tertiary hover:text-ink transition-colors duration-200"
            >
              <Icon icon="ph:arrow-left" className="text-xs" />
              <span>Torna alla Home</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
