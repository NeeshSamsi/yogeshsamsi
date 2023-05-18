/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

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
      colors: {
        darker: "#362009",
        dark: "#222222",
        light: "#E0B385",
        lighter: "#F5E0CC",
      },
      spacing: {
        "col-wide": "10%",
        "col-main": "20%",
      },
    },
  },
  plugins: [require('tailwind-hamburgers')],
};
