/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./demo/.vitepress/**/*.{js,ts,vue}', './demo/**/*.md'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [],
  options: {
    safelist: ['html', 'body']
  }
}
