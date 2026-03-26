"use client";

import { createContext, useContext, useEffect, useRef, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import { useLoader } from "./loader-context";

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { loaded } = useLoader();
  const pathname = usePathname();

  // Reset scroll to top on every route change, unless it's a hash link
  useEffect(() => {
    if (!lenis) return;

    // While loading, keep it at top to avoid showing fragments of the wrong section
    if (!loaded) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    
    // Check if there's a hash in the current URL
    const hash = window.location.hash;
    
    if (hash) {
      // Extra delay (350ms) to ensure complex homepage layout (sticky sections, Hero) is stable
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          // Precise offset (0) to align the section start exactly with the navbar's bottom edge
          lenis.scrollTo(target as HTMLElement, { immediate: true, offset: 0 });
        }
      }, 350);
    } else {
      // Normal page change without hash: go to top
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis, loaded]);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenisInstance.destroy();
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
