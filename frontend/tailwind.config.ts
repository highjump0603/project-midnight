import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        midnight: {
          950: "#04040D",
          900: "#080818",
          800: "#0D0D2B",
          700: "#111133",
          600: "#1A1A4A",
          500: "#2D2D6B",
        },
        silver: {
          50: "#F8F8FF",
          100: "#E8E8F0",
          200: "#C8C8D8",
          300: "#9898B8",
          400: "#6868A8",
        },
        star: {
          gold: "#FFD700",
          silver: "#C0C0C0",
          blue: "#4FC3F7",
        },
        moon: {
          glow: "#7B7BFF",
          crescent: "#B8B8E8",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      spacing: {
        "section-sm": "4rem",
        "section-md": "8rem",
        "card-pad": "1.5rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-midnight":
          "linear-gradient(135deg, #04040D 0%, #0D0D2B 50%, #04040D 100%)",
        "gradient-star":
          "radial-gradient(ellipse at top, #1A1A4A 0%, #04040D 70%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(123, 123, 255, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(123, 123, 255, 0.7)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      boxShadow: {
        "moon-glow": "0 0 20px rgba(123, 123, 255, 0.4)",
        "star-glow": "0 0 15px rgba(79, 195, 247, 0.5)",
        "gold-glow": "0 0 20px rgba(255, 215, 0, 0.4)",
        card: "0 4px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(184, 184, 232, 0.08)",
        "card-hover":
          "0 8px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(123, 123, 255, 0.25)",
      },
      borderColor: {
        subtle: "rgba(184, 184, 232, 0.12)",
        glow: "rgba(123, 123, 255, 0.3)",
      },
      typography: {
        midnight: {
          css: {
            "--tw-prose-body": "#E8E8F0",
            "--tw-prose-headings": "#F8F8FF",
            "--tw-prose-links": "#4FC3F7",
            "--tw-prose-code": "#B8B8E8",
            "--tw-prose-pre-bg": "#0D0D2B",
            "--tw-prose-hr": "rgba(184, 184, 232, 0.15)",
            "--tw-prose-quotes": "#9898B8",
            "--tw-prose-quote-borders": "#7B7BFF",
            "--tw-prose-bullets": "#9898B8",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
