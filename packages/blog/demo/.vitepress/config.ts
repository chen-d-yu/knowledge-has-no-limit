import path from "path";
import { getThemeConfig, defineConfig } from "../../src/node";
import packageJSON from "../../package.json";

const blogTheme = getThemeConfig({
  friend: [
    {
      nickname: "粥里有勺糖",
      des: "你的指尖用于改变世界的力量",
      avatar:
        "https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030",
      url: "https://sugarat.top",
    },
    {
      nickname: "Vitepress",
      des: "Vite & Vue Powered Static Site Generator",
      avatar:
        "https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTI2NzY1Ng==674995267656",
      url: "https://vitepress.vuejs.org/",
    },
  ],
  // 文章默认作者
  author: "粥里有勺糖",
  // 评论
  comment: {
    repo: "ATQQ/sugar-blog",
    repoId: "MDEwOlJlcG9zaXRvcnkyNDEyNDUyOTk",
    category: "Announcements",
    categoryId: "DIC_kwDODmEcc84COVc6",
    inputPosition: "top",
  },
  popover: {
    title: "公告",
    body: [
      { type: "text", content: "👇公众号👇---👇 微信 👇" },
      {
        type: "image",
        src: "https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210",
      },
      {
        type: "text",
        content: "欢迎大家私信交流",
      },
      {
        type: "button",
        content: "博客",
        link: "https://sugarat.top",
      },
    ],
    duration: 0,
  },
  search: {
    mode: "pagefind",
    btnPlaceholder: "Search",
    placeholder: "Search Docs",
    emptyText: "No results found",
    heading: "Total: {{searchResult}} search results.",
  },
});
const extraHead: any =
  process.env.NODE_ENV === "production"
    ? [
        [
          "script",
          {
            charset: "UTF-8",
            id: "LA_COLLECT",
            src: "//sdk.51.la/js-sdk-pro.min.js",
          },
        ],
        [
          "script",
          {},
          'LA.init({id:"Jyzk2AcXA3JsYbrG",ck:"Jyzk2AcXA3JsYbrG",hashMode:true})',
        ],
      ]
    : [];

export default defineConfig({
  extends: blogTheme,
  lang: "zh-cmn-Hans",
  title: "@sugarat/theme",
  description: "粥里有勺糖的博客主题，基于 vitepress 实现",
  head: [...extraHead],
  vite: {
    server: {
      host: "0.0.0.0",
    },
    resolve: {
      alias: {
        "@sugarat/theme": path.join(__dirname, "../../src/index.ts"),
      },
    },
  },
  themeConfig: {
    footer: {
      message: `Power By <a target="_blank" href="https://theme.sugarat.top/"> @sugarat/theme@${packageJSON.version} </a>`,
      copyright: "MIT Licensed | Copyright © 粥里有勺糖",
    },
    nav: [
      {
        text: `v${packageJSON.version}`,
        link: "/changelog",
      },
      {
        text: "线上作品",
        items: [
          {
            text: "轻取(文件收集)",
            link: "https://ep2.sugarat.top",
          },
          {
            text: "个人图床",
            link: "https://imgbed.sugarat.top",
          },
          {
            text: "考勤小程序",
            link: "https://hdkq.sugarat.top/",
          },
          {
            text: "时光恋人",
            link: "https://lover.sugarat.top",
          },
          {
            text: "在线简历生成",
            link: "https://resume.sugarat.top/",
          },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/ATQQ/sugar-blog/tree/master/packages/theme",
      },
    ],
    editLink: {
      pattern:
        "https://github.com/ATQQ/sugar-blog/tree/master/packages/theme/demo/:path",
      text: "去 GitHub 上编辑内容",
    },
    lastUpdatedText: "上次更新于",
  },
});
