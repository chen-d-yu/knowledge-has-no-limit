import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    // vue()
  ],
  optimizeDeps: {
    exclude: ['vue-demi', '@vueuse/shared', '@vueuse/core']
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./.vitepress/', import.meta.url))
    },
    extensions: ['.js', '.json', '.ts'],
    preserveSymlinks: true
  }
})
