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
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase }) {
      const baseCSS = {
        color: "white",
        backgroundColor: "rgb(51, 51, 51)",
        fontFamily: "system-ui",
        margin: 0,
      };
      addBase({
        html: baseCSS,
        body: baseCSS,
      });
    }),
  ],
};
