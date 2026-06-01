import type { Config } from "tailwindcss";

// Color system — strict semantic ownership:
//   brand (green)    = trust / primary actions that are NOT emergencies
//   alert (red)      = EMERGENCY ONLY (trigger button, live alert, "very strong match")
//   safe (green)     = resolution: found / safe / resolved / verified
//   caution (amber)  = pending / caution / secondary accent
// Site is dark-themed (marketing + demo); values tuned to pop on #0B0E18.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Neutral ink scale — calm, readable, dignified backgrounds & text
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5d9e2",
          300: "#b0b7c6",
          400: "#848fa5",
          500: "#647088",
          600: "#4e5870",
          700: "#3c4458",
          800: "#252b3b",
          900: "#141826",
          950: "#0b0e18",
        },
        // TRUST / PRIMARY — green. Brand chrome, primary CTAs, links.
        brand: {
          50: "#ecfdf3",
          100: "#d1fadf",
          200: "#a6f4c5",
          300: "#6ce9a6",
          400: "#32d583",
          500: "#12b76a",
          600: "#039855",
          700: "#027a48",
          800: "#05603a",
          900: "#054f31",
        },
        // EMERGENCY — red. Reserved for active alert states ONLY.
        alert: {
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#fecdca",
          300: "#fda29b",
          400: "#f97066",
          500: "#f04438",
          600: "#d92d20",
          700: "#b42318",
          800: "#912018",
          900: "#7a271a",
        },
        // RESOLUTION — green. Found / safe / resolved / verified.
        safe: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // CAUTION — amber. Pending / caution / secondary accent.
        caution: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "pulse-ring": "pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.6)", opacity: "0.9" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
