import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#eeeef1",
          200: "#d9d9df",
          300: "#b6b7c1",
          400: "#8a8c9b",
          500: "#666879",
          600: "#4d4f5e",
          700: "#383a47",
          800: "#23242e",
          900: "#13141b",
          950: "#0a0b10",
        },
        brand: {
          50: "#fff5f2",
          100: "#ffe6df",
          200: "#ffc4b4",
          300: "#ff9a82",
          400: "#ff6f51",
          500: "#f6492b",
          600: "#d83217",
          700: "#b32413",
          800: "#8e1f15",
          900: "#741d16",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
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
