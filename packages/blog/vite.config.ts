import { UserConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
const config: UserConfig = {
  optimizeDeps: {
    exclude: ["vue-demi", "@vueuse/shared", "@vueuse/core"],
  },
  plugins: [
    commonjs(), // 添加 commonjs 插件
  ],
};

export default config;
