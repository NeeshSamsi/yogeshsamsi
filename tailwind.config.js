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
    extend: {},
  },
  plugins: [],
}
