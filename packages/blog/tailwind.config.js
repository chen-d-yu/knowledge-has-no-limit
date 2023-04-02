/** @type {import('tailwindcss').Config} */
module.exports = {
  // - purge:{...}
  // + content:[...]
  content: ['./docs/.vitepress/**/*.js', './docs/.vitepress/**/*.vue', './docs/.vitepress/**/*.ts'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
