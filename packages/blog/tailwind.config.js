/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/.vitepress/**/*.js",
    "./docs/.vitepress/**/*.vue",
    "./docs/.vitepress/**/*.ts",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      sm: { min: "640px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1535px" },
      "2xl": { min: "1536px" },
      "xl-2xl": { min: "1280px" },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
