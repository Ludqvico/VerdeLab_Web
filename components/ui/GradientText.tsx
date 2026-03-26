import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: "teal" | "warm";
}

export default function GradientText({ children, className, variant = "teal" }: GradientTextProps) {
  return (
    <span
      className={cn("bg-clip-text text-transparent inline", className)}
      style={{
        backgroundImage:
          variant === "teal"
            ? "linear-gradient(90deg, #00B4A6 0%, #009E91 50%, #007A70 100%)"
            : "linear-gradient(90deg, #0C0C0C 0%, #3a3a3a 100%)",
      }}
    >
      {children}
    </span>
  );
}
