/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
      serif: ["var(--font-reckless)", ...defaultTheme.fontFamily.serif],
    },
    extend: {
      screens: {
        // sm: "640px",
        // md: "768px",
        // lg: "1024px",
        // xl: "1280px",
        // "2xl": "1536px",
        "3xl": "1920px",
      },
      colors: {
        darker: "#362009",
        dark: "#222222",
        light: "#E0B385",
        lighter: "#F5E0CC",
      },
      spacing: {
        "col-outer": "6vw",
        "col-inner": "12vw",
      },
      keyframes: {
        nav: {
          from: { "clip-path": "inset(0 0 100% 0)" },
          to: { "clip-path": "inset(0 0 0 0)" },
        },
      },
      animation: {
        "nav-show": "nav 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
        "nav-hide": "nav 1000ms cubic-bezier(0.4, 0, 0.2, 1) 1 reverse",
      },
    },
  },
  plugins: [require("tailwind-hamburgers"), require("@tailwindcss/forms")],
}
