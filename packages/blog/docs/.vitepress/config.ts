import { defineConfig } from "vitepress";
export default defineConfig({
  title: "左右",
  titleTemplate: "退堂鼓一级运动员", // 副标题
  description: "A VitePress Site",
  lang: "en-US",
  head: [
    ["link", { rel: "icon", href: "../assets/logo.ico", crossorigin: "" }],
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
