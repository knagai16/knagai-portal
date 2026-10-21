import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--palette-ink))",
        muted: "rgb(var(--palette-muted))",
        paper: "rgb(var(--palette-paper))",
        surface: "rgb(var(--palette-surface))",
        accent: "rgb(var(--palette-accent))",
        "accent-strong": "rgb(var(--palette-accent-strong))",
        "accent-soft": "rgb(var(--palette-accent-soft))",
      },
      boxShadow: {
        card: "0 18px 50px rgb(var(--palette-ink) / 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
