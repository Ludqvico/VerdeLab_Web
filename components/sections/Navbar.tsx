"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { useLenis } from "@/lib/lenis";

const navLinks = [
  { label: "Servizi", href: "#services" },
  { label: "CleverFlow", href: "#cleverflow" },
  { label: "Partner", href: "#polaris" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOnDarkSection, setIsOnDarkSection] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  // Scroll threshold
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return () => unsub();
  }, [scrollY]);

  // Theme Detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-theme");
            setIsOnDarkSection(theme === "dark");
          }
        });
      },
      { rootMargin: "0px 0px -99% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("section[data-theme], footer[data-theme]");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  // Standard Theme Logic for the Pill
  const isPillDark = scrolled ? isOnDarkSection : false;
  // Delay for theme changes to sync with pill background entrance/exit
  const themeDelay = scrolled ? 0.3 : 0;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) return;
    e.preventDefault();
    const targetElement = document.querySelector(href) as HTMLElement | null;
    if (!targetElement) return;

    const theme = targetElement.getAttribute("data-theme") || "light";
    setTransitionTheme(theme);

    setTimeout(() => {
      // Sync Lenis to the new position immediately
      if (lenis) {
        lenis.scrollTo(targetElement, { immediate: true });
      }

      // Slightly increase the delay to ensure browser has painted the jump before fading out
      setTimeout(() => {
        setTransitionTheme(null);
      }, 100);
    }, 450);
  };

  return (
    <>
      <AnimatePresence>
        {transitionTheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] pointer-events-auto"
            style={{ backgroundColor: transitionTheme === "dark" ? "#080808" : "#F5F4F0" }}
          />
        )}
      </AnimatePresence>

      <motion.header 
        className="fixed top-0 left-0 right-0 z-[200] px-6 py-4 flex justify-center pointer-events-none"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative w-full max-w-7xl pointer-events-auto flex items-center justify-between">
        
        {/* PILL BACKGROUND LAYER - SEQUENCED FADE */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                backgroundColor: isPillDark ? "rgba(12, 12, 12, 0.80)" : "rgba(255, 255, 255, 0.72)",
                borderColor: isPillDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
                boxShadow: isPillDark ? "0 20px 40px rgba(0,0,0,0.5)" : "0 8px 30px rgba(0,0,0,0.04)"
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.3, duration: 0.3, ease: "linear" }}
              className="absolute inset-0 rounded-full border backdrop-blur-xl"
              style={{ height: "64px", top: "50%", y: "-50%" }}
            />
          )}
        </AnimatePresence>

        {/* NAVBAR CONTENT */}
        <div 
          className="relative z-10 flex items-center justify-between w-full"
          style={{ height: "64px" }} 
        >
          {/* Branding */}
          <motion.a 
            href="/" 
            animate={{ paddingLeft: scrolled ? 16 : 0 }}
            transition={{ 
              delay: scrolled ? 0 : 0.3, 
              duration: 0.3, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="flex items-center gap-3 group outline-none"
            data-cursor="hover"
          >
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
               <img 
                  src="/logo.svg" 
                  alt="VerdeLab" 
                  className="block w-full h-full object-contain" 
                  style={{ minWidth: "32px", minHeight: "32px" }}
                />
            </div>
            <motion.span 
              animate={{ color: isPillDark ? "#FFFFFF" : "#1A1A1A" }}
              transition={{ delay: themeDelay, duration: 0.3 }}
              className="font-sans font-bold text-sm tracking-tight"
            >
              VerdeLab
            </motion.span>
          </motion.a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative group outline-none"
                data-cursor="hover"
              >
                <motion.span 
                  animate={{ color: isPillDark ? "rgba(255,255,255,0.7)" : "rgba(26,26,26,0.6)" }}
                  whileHover={{ color: isPillDark ? "#FFFFFF" : "#1A1A1A" }}
                  transition={{ delay: themeDelay, duration: 0.3 }}
                  className="font-sans text-[13px] font-medium"
                >
                  {link.label}
                </motion.span>
                
                {/* Teal underline — CSS transition, instant hover response */}
                <span
                  className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 group-hover:w-full rounded-full transition-[width] duration-300 ease-out"
                  style={{ backgroundColor: "#00B4A6" }}
                />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <motion.div 
            animate={{ paddingRight: scrolled ? 10 : 0 }}
            transition={{ 
              delay: scrolled ? 0 : 0.3, 
              duration: 0.3, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="flex items-center"
          >
            <MagneticButton 
              href="#contact" 
              onClick={(e: any) => handleNavClick(e, "#contact")}
              variant="secondary" 
              dark={isPillDark}
              themeDelay={themeDelay}
              className=""
              icon="ph:paper-plane-tilt-duotone"
            >
              Contattaci
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </motion.header>
    </>
  );
}
