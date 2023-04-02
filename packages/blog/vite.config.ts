import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./docs/.vitepress', import.meta.url))
    }
  },
  plugins: []
})
