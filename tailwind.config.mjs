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
          36: "rgba(255, 255, 255, 0.36)",
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
        fadeInUp: {
          "0%": { transform: "translate3d(0,100px,0)", opacity: 0 },
          "100%": { transform: "translate3d(0,0,0)", opacity: 1 },
        },
        fadeInUpDelay: {
          "0%": { transform: "translate3d(0,100px,0)", opacity: 0 },
          "33%": { transform: "translate3d(0,100px,0)", opacity: 0 },
          "100%": { transform: "translate3d(0,0,0)", opacity: 1 },
        },
        bannerIn: {
          "0%": { transform: "translate3d(0,100%,0)", opacity: 0 },
          "26%": { transform: "translate3d(0,100%,0)", opacity: 0 },
          "30%": { transform: "translate3d(0,0,0)", opacity: 1 },
          "76%": { transform: "translate3d(0,0,0)", opacity: 1 },
          "80%": { transform: "translate3d(0,-100%,0)", opacity: 0 },
          "100%": { transform: "translate3d(0,100,0)", opacity: 0 },
        },
        bannerOut: {
          "0%": { transform: "translate3d(0,0,0)", opacity: 1 },
          "26%": { transform: "translate3d(0,0,0)", opacity: 1 },
          "30%": { transform: "translate3d(0,-100%,0)", opacity: 0 },
          "76%": { transform: "translate3d(0,100%,0)", opacity: 0 },
          "80%": { transform: "translate3d(0,0,0)", opacity: 1 },
          "100%": { transform: "translate3d(0,0,0)", opacity: 1 },
        },
      },
      animation: {
        investors: "investors 70s linear infinite",
        fadeInUp: "fadeInUp 600ms ease-out 100ms",
        fadeInUpDelay: "fadeInUpDelay 900ms ease-out 100ms",
        bannerIn: "bannerIn 9000ms ease-in-out infinite",
        bannerOut: "bannerOut 9000ms ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      const baseCSS = {
        color: "white",
        backgroundColor: "#000",
        fontFamily: "'Manrope', sans-serif",
        fontWeight: "500",
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
