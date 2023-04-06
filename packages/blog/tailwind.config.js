/** @type {import('tailwindcss').Config} */
module.exports = {
  // - purge:{...}
  // + content:[...]
  content: ['./docs/.vitepress/**/*.js', './docs/.vitepress/**/*.vue', './docs/.vitepress/**/*.ts'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
