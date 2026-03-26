"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { Icon } from "@iconify/react";

type CursorState = "default" | "hover" | "click";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Dot Follower
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Velocity & G-Force Simulation
  const velX = useVelocity(mouseX);
  const velY = useVelocity(mouseY);
  
  // Tilt based on velocity (G-Force)
  const rotateSpring = useSpring(0, { stiffness: 150, damping: 20 });
  const skewSpring = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const unsubscribeX = velX.on("change", (v) => {
      rotateSpring.set(v / 80); // Tilt intensity
    });
    const unsubscribeY = velY.on("change", (v) => {
      skewSpring.set(v / 120);
    });
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [velX, velY, rotateSpring, skewSpring]);

  // Main Follower Springs
  const ringX = useSpring(mouseX, { stiffness: 450, damping: 35, mass: 0.2 });
  const ringY = useSpring(mouseY, { stiffness: 450, damping: 35, mass: 0.2 });

  useEffect(() => {
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const section = el.closest("[data-theme]");
        if (section) {
          const newTheme = section.getAttribute("data-theme") === "dark" ? "dark" : "light";
          setTheme((prevTheme) => (prevTheme !== newTheme ? newTheme : prevTheme));
        }
      }
    };

    const down = () => setCursorState("click");
    const up = () => setCursorState("default");

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    const sel = "a, button, [data-cursor]";
    const enter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      setCursorState("hover");
      setLabel(el.dataset.cursorLabel || "");
    };
    const leave = () => { setCursorState("default"); setLabel(""); };

    const attach = () => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      obs.disconnect();
    };
  }, [mouseX, mouseY, dotX, dotY, isVisible, isTouchDevice]);

  if (isTouchDevice) return null;

  const isHover = cursorState === "hover";
  const isClick = cursorState === "click";
  const isDarkTheme = theme === "dark";

  // Base colors
  const baseColor = isDarkTheme ? "#FFFFFF" : "#0C0C0C";
  const accentColor = "#00B4A6";

  return (
    <>
      <style>{`@media (pointer: fine) { *, *::before, *::after { cursor: none !important; } }`}</style>

      {/* Primary Dot — zero lag */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHover ? accentColor : baseColor,
        }}
        animate={{
          width: isClick ? 4 : isHover ? 0 : 6,
          height: isClick ? 4 : isHover ? 0 : 6,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Main Container — physics driven */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center p-2"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          rotate: rotateSpring,
          skew: skewSpring,
        }}
      >
        <motion.div
          animate={{
            width: isHover && label ? 120 : isHover ? 44 : 28,
            height: isHover && label ? 36 : isHover ? 44 : 28,
            borderRadius: isHover && label ? "9999px" : "100%",
            backgroundColor: isHover && label ? accentColor : isHover ? "rgba(0,180,166,0.15)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 450, damping: 30, mass: 0.8 }}
          style={{
            border: isHover && label ? "none" : `1.5px solid ${isHover ? accentColor : baseColor}`,
            boxShadow: isHover && label ? "0 4px 20px rgba(0,180,166,0.3)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {label && (
            <motion.div
              key={label}
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4"
            >
              <Icon 
                icon={label.toLowerCase() === "linkedin" ? "ph:linkedin-logo-duotone" : "ph:arrow-up-right-bold"} 
                className="text-white text-base"
              />
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white font-bold whitespace-nowrap">
                {label}
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
