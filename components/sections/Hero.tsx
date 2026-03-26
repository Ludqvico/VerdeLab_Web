"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Script from "next/script";
import GradientText from "@/components/ui/GradientText";
import MagneticButton from "@/components/ui/MagneticButton";
import InteractiveGrid from "@/components/ui/InteractiveGrid";
import { useLoader } from "@/lib/loader-context";

// Line reveal driven by loader readiness
function LineReveal({
  children,
  delay,
  className,
  loaded,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  loaded: boolean;
}) {
  return (
    <div className="relative inline-block w-full">
      <motion.div
        className={className}
        initial={{ clipPath: "inset(0% 0% 100% 0%)", y: "40%", opacity: 0 }}
        animate={
          loaded
            ? { clipPath: "inset(0% 0% -30% 0%)", y: "0%", opacity: 1 }
            : { clipPath: "inset(0% 0% 100% 0%)", y: "40%", opacity: 0 }
        }
        transition={{ delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { loaded } = useLoader();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      data-theme="light"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-x-hidden px-6 md:px-10 pt-24 md:pt-16"
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0,180,166,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 90% 85%, rgba(0,180,166,0.055) 0%, transparent 55%),
          #F5F4F0
        `,
      }}
    >
      <Script 
        src="https://unpkg.com/@splinetool/viewer@1.12.72/build/spline-viewer.js" 
        type="module"
      />
      
      <InteractiveGrid />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/3 right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,180,166,0.07) 0%, transparent 70%)" }}
        animate={{ y: [0, -18, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-8 w-52 h-52 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,180,166,0.05) 0%, transparent 70%)" }}
        animate={{ y: [0, 14, 0], scale: [1, 0.96, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <motion.div 
        style={{ y, opacity }} 
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center lg:grid lg:grid-cols-[0.9fr,1.1fr] lg:items-center lg:text-left lg:gap-12 overflow-visible"
      >
        {/* Left Column: Content */}
        <div className="flex flex-col justify-center lg:-translate-y-12">
          {/* Label */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-3 mb-10"
            initial={{ opacity: 0, x: -16 }}
            animate={loaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ delay: 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block w-5 h-px bg-teal" />
            <span className="font-sans text-label text-teal uppercase tracking-[0.15em] font-medium">
              Software House, Albinea, Italia
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mb-10 text-center lg:text-left">
            <LineReveal delay={0.18} className="font-serif italic text-[5rem] sm:text-display-xl text-ink leading-[0.82]" loaded={loaded}>
              Backend
            </LineReveal>

            <LineReveal delay={0.32} className="font-serif italic text-[5rem] sm:text-display-xl leading-[0.82]" loaded={loaded}>
              <GradientText>intelligente.</GradientText>
            </LineReveal>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="font-sans text-body-lg text-ink-secondary max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={loaded ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(6px)" }}
            transition={{ delay: 0.62, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Architetture backend scalabili e soluzioni NLP/AI concrete,
            dall&apos;idea al prodotto, dalla semantica al dato.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row w-full sm:w-auto items-center lg:items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={loaded ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(6px)" }}
            transition={{ delay: 0.76, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton href="#services" variant="primary" icon="ph:airplane-tilt-duotone" className="w-full sm:w-auto">
              Esplora i servizi
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary" icon="ph:chat-teardrop-dots-duotone" className="w-full sm:w-auto">
              Parla con noi
            </MagneticButton>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-8 md:gap-10 mt-12 md:mt-16 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            {[
              { value: "20+", label: "anni di esperienza" },
              { value: "NLP", label: "specializzazione core" },
              { value: "AI", label: "soluzioni su misura" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-serif italic text-display-sm text-ink">{stat.value}</span>
                <span className="font-sans text-label text-ink-tertiary uppercase tracking-[0.12em]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: 3D Visualization */}
        <motion.div 
          className="hidden lg:block relative mt-16 lg:mt-0 h-[400px] md:h-[600px] lg:h-[900px] w-full lg:w-[140%] lg:-ml-[20%] overflow-visible"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* @ts-ignore */}
          <spline-viewer 
            url="https://prod.spline.design/x-aBa9bvOsUmv37X/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
