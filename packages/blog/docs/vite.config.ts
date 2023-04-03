import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './.vitepress/theme/')
      '@': fileURLToPath(new URL('./.vitepress/', import.meta.url))
    },
    extensions: ['.js', '.json', '.ts'],
    preserveSymlinks: true
  }
})
