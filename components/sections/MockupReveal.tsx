"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";

// Converts a MotionValue<number> → MotionValue<string> for CSS filter
function useBlurFilter(blurPx: MotionValue<number>) {
  return useTransform(blurPx, (v) => `blur(${v.toFixed(0)}px)`);
}

/**
 * Performance notes:
 * - No useSpring, no exit, only GPU-composited scale + opacity + filter
 * - offset ["start end", "end end"]: tracking starts as section rises from viewport bottom
 * - Overlay (scrim + text) fades in via scroll-driven motion values, no state
 */
export default function MockupReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // ─── Image reveal (full track, 0 → 0.8) ─────────────────────────────────
  const scale   = useTransform(scrollYProgress, [0, 0.8], [0.05, 1]);
  const opacity  = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const blurPx   = useTransform(scrollYProgress, [0, 0.8], [40, 0]);
  const filter   = useBlurFilter(blurPx);

  // ─── Dark scrim: fades in once image is 90% revealed ────────────────────
  // Scrim goes 0 → 0.5 as progress goes 0.75 → 0.95
  const scrimOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 0.52]);

  // ─── Overlay text: staggered entrance after scrim starts ─────────────────
  // Each element shifts from a slight y offset to 0, fading in
  const overlayPhase = useTransform(scrollYProgress, [0.78, 0.98], [0, 1]);

  const labelY   = useTransform(overlayPhase, [0, 1], [28, 0]);
  const labelOp  = useTransform(overlayPhase, [0, 0.4], [0, 1]);

  const titleY   = useTransform(overlayPhase, [0.1, 1], [36, 0]);
  const titleOp  = useTransform(overlayPhase, [0.1, 0.55], [0, 1]);

  const descY    = useTransform(overlayPhase, [0.25, 1], [24, 0]);
  const descOp   = useTransform(overlayPhase, [0.25, 0.7], [0, 1]);

  const ctaY     = useTransform(overlayPhase, [0.45, 1], [20, 0]);
  const ctaOp    = useTransform(overlayPhase, [0.45, 0.9], [0, 1]);

  return (
    <div
      ref={containerRef}
      style={{ height: "300vh", overflow: "clip" }}
      className="relative w-full"
    >
      <div
        className="sticky top-0 h-screen w-full"
        style={{ background: "#EDECEA" }}
      >

        {/* ── Mockup image ─────────────────────────────────────────────── */}
        <motion.div
          style={{
            scale,
            opacity,
            filter,
            willChange: "transform, opacity, filter",
            transformOrigin: "center center",
          }}
          className="absolute inset-0"
        >
          <Image
            src="/mockup-1.png"
            alt="VerdeLab – Product mockup"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* ── Dark scrim for contrast ───────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: scrimOpacity, willChange: "opacity" }}
        />

        {/* ── Portfolio hero overlay ────────────────────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none">

          {/* Label */}
          <motion.div
            style={{ y: labelY, opacity: labelOp, willChange: "transform, opacity" }}
            className="mb-6"
          >
            {/* SectionLabel uses its own teal styles, override for dark bg */}
            <div className="flex items-center gap-3 justify-center">
              <span className="font-sans text-[13.5px] sm:text-label text-teal uppercase tracking-[0.15em] font-medium">
                Portfolio, Caso studio
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            style={{ y: titleY, opacity: titleOp, willChange: "transform, opacity" }}
            className="font-serif italic text-white text-[3rem] sm:text-[4rem] md:text-[5rem] leading-[0.88] mb-6 max-w-3xl"
          >
            CleverFlow
          </motion.h2>

          {/* Description */}
          <motion.p
            style={{ y: descY, opacity: descOp, willChange: "transform, opacity" }}
            className="font-sans text-body-lg text-white/70 max-w-lg leading-relaxed mb-10"
          >
            Automazione dei processi aziendali con workflow Zero-Touch, email, documenti e ERP connessi senza intervento umano.
          </motion.p>

          {/* CTA */}
          <motion.div
            style={{ y: ctaY, opacity: ctaOp, willChange: "transform, opacity" }}
            className="pointer-events-auto"
          >
            <MagneticButton
              href="#cleverflow"
              variant="primary"
              icon="ph:arrow-right"
              iconPosition="right"
            >
              Scopri il progetto
            </MagneticButton>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
