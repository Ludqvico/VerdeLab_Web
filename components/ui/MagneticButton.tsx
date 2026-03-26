"use client";

import { useRef, ReactNode, MouseEvent, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: string;
  iconPosition?: "left" | "right";
  dark?: boolean;
  themeDelay?: number;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.2, 
  onClick,
  href,
  variant = "primary",
  icon,
  iconPosition = "left",
  dark = false,
  themeDelay = 0,
  ...props
}: MagneticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) * strength;
    const y = (e.clientY - cy) * strength;
    
    // Applying magnetic offset via framer properties or custom state if needed, 
    // but the current structure uses "animate" on the main motion.div.
    // For now, let's keep it simple and just allow the hover state to do its work.
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const base = "relative inline-flex items-center justify-center gap-2.5 rounded-full h-11 font-sans text-sm font-medium tracking-tight select-none cursor-pointer";

  const variants = {
    primary: "text-white",
    secondary: "border", 
    ghost: "bg-transparent text-ink",
  };

  // Blueprint Gradient + Backgrounds
  const blueprintGradient = "radial-gradient(47.21% 81.69% at 50% 100%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)";
  const primaryBg = `${blueprintGradient}, #070707`;
  const primaryHoverBg = `${blueprintGradient}, #004D46`;

  return (
    <a 
      href={href} 
      className="inline-block no-underline overflow-visible"
      style={{ color: "inherit", textDecoration: "none" }}
      onClick={onClick}
    >
      <motion.div
        ref={ref}
        style={{ zIndex: isHovered ? 50 : 1 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(base, variants[variant], className)}
        animate={{ 
          scale: 1,
          backgroundColor: variant === "secondary" 
            ? (dark ? "rgba(255, 255, 255, 0.1)" : "rgb(237, 236, 234)") // bg-surface is #EDECEA
            : undefined,
          borderColor: variant === "secondary"
            ? (dark ? "rgba(255, 255, 255, 0.1)" : "rgb(216, 215, 211)") // border is #D8D7D3
            : undefined,
          color: variant === "secondary"
            ? (dark ? "#FFFFFF" : "#0C0C0C") // ink is #0C0C0C
            : undefined
        }}
        transition={{ 
          type: "spring", 
          stiffness: 450, 
          damping: 25,
          backgroundColor: { delay: themeDelay, duration: 0.3 },
          borderColor: { delay: themeDelay, duration: 0.3 },
          color: { delay: themeDelay, duration: 0.3 }
        }}
        whileTap={{ scale: 1 }} 
        data-cursor="hover"
        {...props}
      >
        {/* Background Layer (Handles clipping/overflow for Primary variant ONLY) */}
        {variant === "primary" && (
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0 z-0"
              initial={false}
              animate={{
                background: isHovered ? primaryHoverBg : primaryBg,
                boxShadow: isHovered 
                  ? "0 4px 12px rgba(0, 0, 0, 0.4)" 
                  : "0 4px 8px 0 rgba(255, 255, 255, 0.18) inset, 0 6px 18px 0 rgba(7, 7, 7, 0.22)",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Content Container (Stable Core) */}
        <div className="relative z-10 flex items-center justify-center gap-2.5 px-8 pointer-events-none origin-center">
          {icon && iconPosition === "left" && (
            <motion.div
              animate={{ 
                color: isHovered && variant !== "primary" 
                  ? "#00B4A6" 
                  : (variant === "primary" || dark ? "#FFFFFF" : "rgba(11, 11, 11, 0.8)"),
              }}
              transition={{ delay: themeDelay, duration: 0.3 }}
            >
              <Icon icon={icon} className="w-4 h-4" />
            </motion.div>
          )}
          
          <span className="whitespace-nowrap">
            {children}
          </span>

          {icon && iconPosition === "right" && (
            <motion.div
              animate={{ 
                color: isHovered && variant !== "primary" 
                  ? "#00B4A6" 
                  : (variant === "primary" || dark ? "#FFFFFF" : "rgba(11, 11, 11, 0.8)"),
              }}
              transition={{ delay: themeDelay, duration: 0.3 }}
            >
              <Icon icon={icon} className="w-4 h-4" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </a>
  );
}
