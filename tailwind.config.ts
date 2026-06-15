import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Surgency Care brand palette (from design doc)
        brand: {
          white: "#FFFFFF",
          blue: "#4E97FD",
          teal: "#0ED3B0",
          orange: "#FF9700",
          dark: "#0E606E",
          black: "#000000",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(14, 96, 110, 0.08)",
        cardhover: "0 12px 40px rgba(14, 96, 110, 0.14)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #0E606E 0%, #0ED3B0 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
