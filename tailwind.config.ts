import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ATTED AI Official Brand Identity Palette
        brand: {
          black: "#111111",      // Deep black
          charcoal: "#1B1B1B",   // Charcoal surface
          charcoalHover: "#262626",
          gold: "#D5AD55",       // Primary gold
          goldLight: "#E8CB83",  // Light gold
          goldDark: "#B8933C",   // Active gold
          offwhite: "#F7F7F5",   // Off-white background
          white: "#FFFFFF",
          textLight: "#171717",  // Main text in light mode
          secondaryText: "#777777", // Secondary text
        },
        background: {
          light: "#F7F7F5",
          dark: "#111111",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1B1B1B",
        },
        surfaceCard: {
          light: "#FFFFFF",
          dark: "#1B1B1B",
        },
        primary: {
          DEFAULT: "#D5AD55", // Primary gold
          hover: "#E8CB83",
          active: "#B8933C",
          text: "#111111",
        },
        secondary: {
          DEFAULT: "#1B1B1B",
          hover: "#262626",
          light: "#F0F0EE",
        },
        text: {
          light: "#171717",
          dark: "#F7F7F5",
        },
        muted: {
          light: "#777777",
          dark: "#A3A3A3",
        },
        border: {
          light: "#E8E8E6",
          dark: "#2A2A2A",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        card: "0 2px 8px -2px rgba(0, 0, 0, 0.04), 0 8px 24px -4px rgba(0, 0, 0, 0.06)",
        "card-dark": "0 2px 10px -2px rgba(0, 0, 0, 0.5), 0 10px 25px -5px rgba(0, 0, 0, 0.4)",
        gold: "0 4px 14px 0 rgba(213, 173, 85, 0.25)",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top, 0px)",
        "safe-bottom": "env(safe-area-inset-bottom, 0px)",
      },
    },
  },
  plugins: [],
};

export default config;
