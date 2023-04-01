import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint' //导入包
import { UserConfig } from 'vite'
import commonjs from 'vite-plugin-commonjs'
import { resolve } from 'path'

const config: UserConfig = {
  optimizeDeps: {
    exclude: ['vue-demi', '@vueuse/shared', '@vueuse/core']
  },
  plugins: [
    commonjs(), // 添加 commonjs 插件
    vue(),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
    extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
}

export default config
