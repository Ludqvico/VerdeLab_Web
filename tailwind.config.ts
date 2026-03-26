import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#F5F4F0",
        surface: "#EDECEA",
        "surface-2": "#E5E4DF",
        ink: "#0C0C0C",
        "ink-secondary": "#6B6B6B",
        "ink-tertiary": "#9A9A9A",
        border: "#D8D7D3",
        teal: {
          DEFAULT: "#00B4A6",
          light: "#E0F7F5",
          dark: "#007A70",
          glow: "rgba(0,180,166,0.12)",
        },
      },
      fontFamily: {
        serif: ["Instrument Serif", "Georgia", "serif"],
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem,10vw,10rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3.25rem,7vw,7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem,4vw,4.5rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.5rem,3vw,3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "label": ["0.75rem", { lineHeight: "1", letterSpacing: "0.1em" }],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "grain": {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "20%": { transform: "translate(2%,3%)" },
          "30%": { transform: "translate(-1%,2%)" },
          "40%": { transform: "translate(3%,-1%)" },
          "50%": { transform: "translate(-3%,1%)" },
          "60%": { transform: "translate(1%,3%)" },
          "70%": { transform: "translate(-2%,-2%)" },
          "80%": { transform: "translate(2%,1%)" },
          "90%": { transform: "translate(-1%,-3%)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        grain: "grain 0.5s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
