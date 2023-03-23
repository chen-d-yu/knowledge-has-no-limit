import { defineConfig } from "vitepress";
export default defineConfig({
  title: "左右",
  titleTemplate: false, // 副标题
  description: "A VitePress Site",
  lang: "en-US",
  head: [
    ["link", { rel: "icon", href: "../assets/logo.ico", crossorigin: "" }],
  ],
  //
  srcDir: "./src",
  // 主题配置
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    logo: "../assets/logo.ico",

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],
  },
});
