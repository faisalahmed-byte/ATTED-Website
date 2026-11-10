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
        background: {
          light: "#F7F8FC",
          dark: "#0B0F19",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#161F30",
        },
        surfaceCard: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },
        primary: {
          DEFAULT: "#4F46E5", // Indigo 600
          hover: "#4338CA",
          light: "#EEF2FF",
        },
        secondary: {
          DEFAULT: "#7C3AED", // Violet 600
          hover: "#6D28D9",
          light: "#F5F3FF",
        },
        text: {
          light: "#0F172A", // Slate 900
          dark: "#F8FAFC",  // Slate 50
        },
        muted: {
          light: "#64748B", // Slate 500
          dark: "#94A3B8",  // Slate 400
        },
        border: {
          light: "#E2E8F0", // Slate 200
          dark: "#334155",  // Slate 700
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        "xl": "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        "card": "0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 10px 24px -4px rgba(15, 23, 42, 0.08)",
        "card-dark": "0 2px 10px -2px rgba(0, 0, 0, 0.5), 0 10px 25px -5px rgba(0, 0, 0, 0.4)",
        "brand-glow": "0 10px 25px -5px rgba(79, 70, 229, 0.35)",
        "brand-glow-lg": "0 14px 35px -5px rgba(124, 58, 237, 0.45)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        "brand-gradient-hover": "linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)",
        "brand-subtle": "linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)",
      },
      spacing: {
        "18": "4.5rem",
        "safe-top": "env(safe-area-inset-top, 0px)",
        "safe-bottom": "env(safe-area-inset-bottom, 0px)",
      },
      maxWidth: {
        "mobile": "440px",
      },
    },
  },
  plugins: [],
};

export default config;

