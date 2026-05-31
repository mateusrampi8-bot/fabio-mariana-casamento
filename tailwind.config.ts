import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F6F2",
        champagne: "#D4AF37",
        blush: "#F7D7DD",
        navy: "#10233F",
        linen: "#EFE7DD",
        rose: "#C9707A"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"],
        script: ["var(--font-script)", "cursive"]
      },
      boxShadow: {
        soft: "0 24px 90px rgba(16, 35, 63, 0.12)",
        gold: "0 18px 60px rgba(212, 175, 55, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
