import { defineConfig } from "vitepress";
import Token from "markdown-it/lib/token";

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

  // 在markdown中使用vue组件配置
  markdown: {
    config: (md) => {
      md.use(require("markdown-it-container"), "vue", {
        validate: (params: string) => params.trim().match(/^vue\s*(.*)$/),
        render: (tokens: Token[], idx: number) => {
          const m = tokens[idx].info.trim().match(/^vue\s*(.*)$/);
          if (tokens[idx].nesting === 1) {
            return `<${m?.[1]}>\n`;
          } else {
            return `</${m?.[1]}>\n`;
          }
        },
      });
    },
  },
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
