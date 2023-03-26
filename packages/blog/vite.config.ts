import { UserConfig } from "vite";
import { fileURLToPath, URL } from "url";
import commonjs from "vite-plugin-commonjs";
import { resolve } from "path";

const config: UserConfig = {
  optimizeDeps: {
    exclude: ["vue-demi", "@vueuse/shared", "@vueuse/core"],
  },
  plugins: [
    commonjs(), // 添加 commonjs 插件
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
};

export default config;
