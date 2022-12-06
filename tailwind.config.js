/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  safelist: ["sr-only"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#fafafa",
        gray: {
          900: "#141414",
          800: "#242424",
          600: "#666666",
          500: "#777777",
          100: "#f2f2f2",
        },
        purple: "#926ee8",
        purpleFaded: "rgba(146, 110, 232, 0.7)",
        purpleVeryFaded: "rgba(146, 110, 232, 0.35)",
        pink: "#ffb7b3",
      },
    },
  },
  plugins: [],
}
