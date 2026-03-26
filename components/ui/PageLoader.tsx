"use client";

import { useEffect, useRef, useState } from "react";
import { useLoader } from "@/lib/loader-context";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const { setLoaded } = useLoader();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const SIZE = 110;
  const R = 46;
  const STROKE = 3;
  const CIRCUMFERENCE = 2 * Math.PI * R;

  const pathname = usePathname();

  useEffect(() => {
    // Reset state for new page load
    setDone(false);
    setHidden(false);
    setProgress(0);
    setLoaded(false);
    startRef.current = null;
    
    document.body.style.overflow = "hidden";
    const DURATION = 1600;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(() => {
            setHidden(true);
            setLoaded(true);
            document.body.style.overflow = "";
          }, 750);
        }, 200);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, [setLoaded]);

  if (hidden) return null;

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] bg-base flex flex-col items-center justify-center gap-6"
      style={{
        transition: done
          ? "opacity 0.65s cubic-bezier(0.76, 0, 0.24, 1), transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
        opacity: done ? 0 : 1,
        transform: done ? "translateY(-24px)" : "translateY(0)",
        pointerEvents: done ? "none" : "all",
      }}
    >
      {/* Ring + logo */}
      <div style={{ position: "relative", width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
        >
          {/* track */}
          <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="#D8D7D3" strokeWidth={STROKE} />
          {/* progress */}
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={R}
            fill="none" stroke="#00B4A6" strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.04s linear" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: STROKE * 2 + 8,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src="/logo.svg" alt="VerdeLab" width={80} height={80} priority
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Wordmark — design system */}
      <div
        className="flex flex-col items-center gap-1"
        style={{ opacity: done ? 0 : 1, transition: done ? "opacity 0.3s ease" : "none" }}
      >
        <span className="font-sans text-label font-semibold text-ink uppercase tracking-[0.15em]">
          VerdeLab
        </span>
        <span className="font-sans text-label font-medium text-ink-tertiary uppercase tracking-[0.15em]">
          Software House
        </span>
      </div>
    </div>
  );
}
