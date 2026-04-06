import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F6F3",
        surface: "#FFFFFF",
        ink: "#1C1917",
        muted: "#78716C",
        subtle: "#D6D3D1",
        border: "#E7E5E4",
        faint: "#F5F4F2",
        accent: "#1D4ED8",
        "accent-light": "#EFF6FF",
        // Semantic states only for status badges
        success: {
          DEFAULT: "#15803D",
          bg: "#F0FDF4",
        },
        warn: {
          DEFAULT: "#A16207",
          bg: "#FEFCE8",
        },
        danger: {
          DEFAULT: "#B91C1C",
          bg: "#FEF2F2",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "0.97", letterSpacing: "-0.04em", fontWeight: "600" }],
        h2: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "600" }],
        h3: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" }],
        body: ["1.0625rem", { lineHeight: "1.75", fontWeight: "400" }],
        label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.1em", fontWeight: "600" }],
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        "card-sm": "0 1px 2px 0 rgb(0 0 0 / 0.04)",
        focus: "0 0 0 2px #1D4ED8",
      },
      maxWidth: {
        page: "1280px",
      },
      animation: {
        "fade-in": "fadeIn 180ms ease-out",
        "slide-up": "slideUp 200ms ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
