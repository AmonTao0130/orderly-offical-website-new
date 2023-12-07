/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "375px",
      // => @media (min-width: 375px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1440px",
      // => @media (min-width: 1440px) { ... }

      "2xl": "1920px",
      // => @media (min-width: 1920px) { ... }
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "36px",
      "4xl": "40px",
      "5xl": "56px",
      "6xl": "64px",
      "7xl": "72px",
      "8xl": "80px",
    },
    extend: {
      fontFamily: {
        title: "'Articulat CF', sans-serif",
      },
      colors: {
        primary: {
          100: "rgba(255, 255, 255, 1)",
          DEFAULT: "rgba(255, 255, 255, 0.98)",
          85: "rgba(255, 255, 255, 0.85)",
          80: "rgba(255, 255, 255, 0.80)",
          54: "rgba(255, 255, 255, 0.54)",
          50: "rgba(255, 255, 255, 0.50)",
          20: "rgba(255, 255, 255, 0.20)",
          12: "rgba(255, 255, 255, 0.12)",
          8: "rgba(255, 255, 255, 0.08)",
        },
      },
      keyframes: {
        investors: {
          "0%": { transform: "translate3d(50px,0,0)" },
          "100%": { transform: "translate3d(-1894px,0,0)" },
        },
      },
      animation: {
        investors: "investors 70s linear infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      const baseCSS = {
        color: "white",
        backgroundColor: "#000",
        fontFamily: "'Manrope', sans-serif",
        fontWeight: "600",
        margin: 0,
        "::selection": {
          background: "#D196FF",
          color: "#000",
        },
      };
      addBase({
        html: baseCSS,
        body: baseCSS,
      });
    }),
  ],
};
