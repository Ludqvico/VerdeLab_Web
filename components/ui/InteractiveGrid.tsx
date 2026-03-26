"use client";

import { useEffect, useRef } from "react";

interface InteractiveGridProps {
  color?: string;
  dotRadius?: number;
  gap?: number;
  hoverRadius?: number;
}

export default function InteractiveGrid({
  color = "#00B4A6",
  dotRadius = 1,
  gap = 32,
  hoverRadius = 160,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      const cols = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gap;
          const y = j * gap;

          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // BASE VISIBILITY & RANDOM PULSE
          // offset uses larger primes for more "random" look
          const offset = (i * 3.1 + j * 7.4); 
          
          // Steady base heartbeat
          const heartbeat = Math.sin(time * 0.5 + offset) * 0.03;
          // Random-ish sharp twinkle peaks
          const twinkle = Math.pow(Math.sin(time * 1.2 + offset * 0.5), 6) * 0.08;
          
          const baseOpacity = 0.18 + heartbeat + twinkle;

          // HOVER GLOW
          let hoverOpacity = 0;
          if (distance < hoverRadius) {
            const ratio = 1 - distance / hoverRadius;
            hoverOpacity = ratio * 0.65; // Intense glow on top of base
          }

          const finalOpacity = Math.min(baseOpacity + hoverOpacity, 0.8);

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = finalOpacity;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, dotRadius, gap, hoverRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
